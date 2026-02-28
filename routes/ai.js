import express from "express";
import OpenAI from "openai";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("AI route working");
});

router.post("/generate-content", async (req, res) => {
  try {
    console.log("POST route hit");

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

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a marketing expert." },
        { role: "user", content: prompt },
      ],
    });

    res.json({
      content: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;