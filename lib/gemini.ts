import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { RoastRequest, RoastResult } from "@/types/roast";
import { buildUserPrompt, ROAST_SYSTEM_INSTRUCTION } from "./prompt";
import { roastResponseSchema } from "./schema";

function getFriendlyErrorMessage(status: number | undefined, message: string): string {
  if (status === 403 || message.includes("API_KEY_INVALID")) {
    return "Invalid Gemini API key. Please check your GEMINI_API_KEY in .env.local.";
  }
  if (status === 429 || message.includes("RESOURCE_EXHAUSTED")) {
    return "Gemini API rate limit exceeded. Please wait a moment before roasting again.";
  }
  if (status === 503 || message.includes("UNAVAILABLE")) {
    return "Gemini service is temporarily unavailable. Please retry in a few seconds.";
  }
  if (status === 404) {
    return `Gemini model '${AI.model}' was not found. Check AI.model in config/app.config.ts.`;
  }
  return `Gemini API error (${status || "unknown"}): ${message}`;
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const userPrompt = buildUserPrompt(request);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: userPrompt,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim().length === 0) {
        throw new Error("Received an empty response from Gemini AI.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        throw new Error("Failed to parse Gemini response as JSON.");
      }

      return {
        roast: parsed.roast ?? "Code roast unavailable.",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.code;
      const is503 = status === 503 || err?.message?.includes("UNAVAILABLE");

      if (is503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      const friendlyMsg = getFriendlyErrorMessage(status, err?.message || String(err));
      throw new Error(friendlyMsg);
    }
  }

  throw new Error(
    `Failed to analyze code after ${AI.maxAttempts} attempts. ${
      lastError instanceof Error ? lastError.message : ""
    }`
  );
}
