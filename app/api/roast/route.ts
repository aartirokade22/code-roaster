import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel, RoastRequest } from "@/types/roast";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  // 1. Validate Code Presence
  if (!code.trim()) {
    return NextResponse.json(
      { error: "No code provided. Please paste some code to roast." },
      { status: 400 }
    );
  }

  // 2. Validate Code Length
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum length of ${LIMITS.maxCodeLength.toLocaleString()} characters (current: ${code.length.toLocaleString()}).`,
      },
      { status: 400 }
    );
  }

  // 3. Validate Error Message Length
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 4. Validate / Fallback Language and Roast Level
  const validLanguages = LANGUAGES.map((l) => l.id);
  const validRoastLevels = ROAST_LEVELS.map((r) => r.id);

  const language: LanguageId = validLanguages.includes(body.language)
    ? body.language
    : DEFAULTS.language;

  const roastLevel: RoastLevel = validRoastLevels.includes(body.roastLevel)
    ? body.roastLevel
    : DEFAULTS.roastLevel;

  const roastPayload: RoastRequest = {
    language,
    roastLevel,
    code,
    errorMessage: errorMessage || undefined,
  };

  try {
    const result = await analyzeCode(roastPayload);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Roast API Handler Error:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred during code roast analysis." },
      { status: 500 }
    );
  }
}
