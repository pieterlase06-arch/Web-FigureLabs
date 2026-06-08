import { Buffer } from 'node:buffer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.VITE_HF_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'VITE_HF_API_KEY is not configured in Vercel Environment Variables' });
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      let errorData = "Gagal menghubungkan ke AI.";
      try {
        const json = await response.json();
        errorData = json.error || errorData;
      } catch (e) {
        errorData = await response.text();
      }
      return res.status(response.status).json({ error: errorData });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);

  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message, stack: error.stack });
  }
}
