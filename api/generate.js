import https from 'https';

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
    return res.status(500).json({ error: 'API key is missing on the server. Please add VITE_HF_API_KEY in Vercel.' });
  }

  const data = JSON.stringify({ inputs: prompt });

  const options = {
    hostname: 'router.huggingface.co',
    port: 443,
    path: '/hf-inference/models/black-forest-labs/FLUX.1-schnell',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
    },
    timeout: 55000 // 55 seconds timeout to fit within Vercel's 60s limit
  };

  return new Promise((resolve) => {
    const request = https.request(options, (response) => {
      // If Hugging Face returns an error status (like 401, 403, 404, 500)
      if (response.statusCode >= 400) {
        let body = '';
        response.on('data', chunk => body += chunk);
        response.on('end', () => {
          let errorMsg = body;
          try {
            const parsed = JSON.parse(body);
            errorMsg = parsed.error || body;
          } catch(e) {}
          res.status(response.statusCode).json({ error: 'API Error', message: errorMsg });
          resolve();
        });
        return;
      }

      // If success, pipe the image stream directly to the client
      res.setHeader('Content-Type', 'image/jpeg');
      response.pipe(res);
      response.on('end', resolve);
    });

    request.on('error', (e) => {
      res.status(500).json({ error: 'Internal Server Error', message: e.message });
      resolve();
    });

    request.on('timeout', () => {
      request.destroy();
      res.status(504).json({ error: 'Gateway Timeout', message: 'Proses rendering gambar memakan waktu terlalu lama (>55 detik).' });
      resolve();
    });

    request.write(data);
    request.end();
  });
}
