import express from "express";
import OpenAI from "openai";

const router = express.Router();

router.get("/test", (req, res) => {
  const hasKey = !!process.env.OPENAI_API_KEY;
  res.json({ 
    message: "AI route working",
    hasApiKey: hasKey,
    keyLength: process.env.OPENAI_API_KEY?.length || 0
  });
});

router.post("/generate-content", async (req, res) => {
  try {
    console.log("POST route hit");
    console.log("Request body:", req.body);

    // Create OpenAI instance HERE (not at top)
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { businessName, category, targetAudience, brandTone, goals } = req.body;

    const prompt = `
    Create marketing content for:
    Business Name: ${businessName}
    Category: ${category}
    Target Audience: ${targetAudience}
    Brand Tone: ${brandTone}
    Goals: ${goals}
    `;

    console.log("Calling OpenAI...");
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a marketing expert." },
        { role: "user", content: prompt },
      ],
    });

    console.log("OpenAI response received");
    res.json({
      content: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("FULL ERROR:", error);
    console.error("Error message:", error.message);
    console.error("Error status:", error.status);
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || "No additional details"
    });
  }
});

export default router;
