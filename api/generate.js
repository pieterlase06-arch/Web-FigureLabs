export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.VITE_HF_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'VITE_HF_API_KEY is not configured in Vercel Environment Variables' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
      let errorText = "Gagal menghubungkan ke AI.";
      try {
        const json = await response.json();
        errorText = json.error || errorText;
      } catch (e) {
        errorText = await response.text();
      }
      return new Response(JSON.stringify({ error: "API Error", message: errorText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Stream the image directly back to the client
    return new Response(response.body, {
      status: 200,
      headers: { 'Content-Type': 'image/jpeg' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error", message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
