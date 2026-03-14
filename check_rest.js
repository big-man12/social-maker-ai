const https = require("https");
const fs = require("fs");
const path = require("path");

async function diagnose() {
  let apiKey = "";
  try {
    const envPath = path.join(__dirname, ".env");
    const envContent = fs.readFileSync(envPath, "utf8");
    const match = envContent.match(/GOOGLE_API_KEY=(.*)/);
    if (match) apiKey = match[1].trim();
  } catch (e) {}

  if (!apiKey) {
    console.error("API Key not found");
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  console.log("--- Fetching Model List via REST ---");
  https.get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => { data += chunk; });
    res.on("end", () => {
      try {
        const json = JSON.parse(data);
        if (json.error) {
          console.error("API Error:", json.error.message);
        } else {
          console.log("Found Models:");
          json.models.forEach(m => {
            console.log(`- ${m.name} (${m.supportedGenerationMethods.join(", ")})`);
          });
        }
      } catch (e) {
        console.error("Parse Error:", e.message);
        console.log("Raw Response:", data);
      }
    });
  }).on("error", (e) => {
    console.error("Request Error:", e.message);
  });
}

diagnose();
