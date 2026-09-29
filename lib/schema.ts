import { Schema, Type } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A funny, deadpan, Hinglish comedic roast of the submitted code.",
    },
    issues: {
      type: Type.ARRAY,
      description: "Structured list of code issues identified in the submission.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number of the bug.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Short title summarizing the issue in Hinglish.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "The exact line of code containing the issue.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Hinglish explanation of why this code fails or is bad.",
          },
          expected: {
            type: Type.STRING,
            description: "Hinglish explanation of how it should be fixed.",
          },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete, fixed code snippet with no markdown formatting or backticks.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A short final takeaway / piece of advice for the developer.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
