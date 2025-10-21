import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// 🧠 Geração de plano alimentar
app.post("/generateMealPlan", async (req, res) => {
  const prompt = req.body.prompt || "Crie um plano alimentar saudável e brasileiro.";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    res.json({ mealPlan: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🏋️ Geração de treino
app.post("/generateWorkoutPlan", async (req, res) => {
  const prompt = req.body.prompt || "Crie um treino funcional de 5 dias.";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await response.json();
    res.json({ workoutPlan: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;
