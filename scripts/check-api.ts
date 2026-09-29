import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function runCheck() {
  console.log(`🔍 Testing Gemini API with model: ${AI.model}...`);
  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n✅ API Call Successful!");
    console.log("-----------------------------------------");
    console.log("🔥 Roast:\n", result.roast);
    console.log("\n🐛 Issues Found:", result.issues.length);
    result.issues.forEach((issue, idx) => {
      console.log(`  ${idx + 1}. [Line ${issue.line}] [${issue.severity}] ${issue.title}`);
    });
    console.log("\n💡 Takeaway:\n", result.takeaway);
    console.log("-----------------------------------------");
  } catch (error: any) {
    console.error("\n❌ API Call Failed!");
    console.error(error?.message || error);
    process.exit(1);
  }
}

runCheck();
