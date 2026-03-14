const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

async function listModels() {
  // Try to find API key from .env manually if dotenv fails
  let apiKey = "";
  try {
    const envPath = path.join(__dirname, ".env");
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/GOOGLE_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {}

  if (!apiKey) {
    console.error("GOOGLE_API_KEY not found");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  console.log("--- Testing v1 version ---");
  try {
    const modelV1 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: "v1" });
    const result = await modelV1.generateContent("test");
    console.log("[PASS] v1: gemini-1.5-flash working");
  } catch (e) {
    console.log(`[FAIL] v1: gemini-1.5-flash: ${e.message}`);
  }

  console.log("\n--- Testing v1beta version ---");
  const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash", "gemini-pro"];
  for (const m of models) {
    try {
      const mod = genAI.getGenerativeModel({ model: m });
      await mod.generateContent("test");
      console.log(`[PASS] v1beta: ${m}`);
    } catch (e) {
      console.log(`[FAIL] v1beta: ${m}: ${e.message}`);
    }
  }
}

listModels();
