//call to api
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Groq } from "groq-sdk";

dotenv.config();

const app = express();
const port = 3000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const userCode = req.body.message;

    const prompt = `Only include the LaTeX output that corresponds with the given description. Format the latex code as follows:
                                                                                                $$
                                                                                                [Equation here]
                                                                                                $$: ${userCode}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_completion_tokens: 500,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong with Groq API. " });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
