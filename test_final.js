const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

async function finalTest() {
  let apiKey = "";
  try {
    const envPath = path.join(__dirname, ".env");
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/GOOGLE_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {}

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // The REST API showed "models/gemini-flash-latest"
  const modelName = "gemini-flash-latest";
  console.log(`--- Final Test with ${modelName} ---`);
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello, are you working?");
    console.log("[SUCCESS]:", result.response.text());
  } catch (e) {
    console.log(`[FAILED]: ${e.message}`);
  }
}

finalTest();
