// api/generate-banner.js
// Banner generation via OpenAI image API (gpt-image-1 / dall-e-3)
// Generates complete marketing banners with text, layout, and product integration

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    // Use DALL-E 3 for banner generation — handles text and layout natively
    // Request b64_json to avoid CORS issues with temporary Azure blob URLs
    const openaiRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1792x1024',
        quality: 'standard',
        style: 'natural',
        response_format: 'b64_json'
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!openaiRes.ok) {
      const errBody = await openaiRes.json().catch(() => ({}));
      console.error('[Banner] OpenAI error:', openaiRes.status, JSON.stringify(errBody));
      return res.status(openaiRes.status).json({
        error: errBody.error?.message || 'OpenAI image generation failed: ' + openaiRes.status
      });
    }

    const data = await openaiRes.json();
    const b64 = data.data?.[0]?.b64_json;

    if (!b64) {
      return res.status(500).json({ error: 'No image data returned from OpenAI' });
    }

    // Return as data URL that the browser can render directly
    const imageUrl = 'data:image/png;base64,' + b64;
    console.log('[Banner] Generated successfully (base64, ' + Math.round(b64.length / 1024) + 'KB)');
    return res.status(200).json({ image_url: imageUrl, width: 1792, height: 1024 });

  } catch (err) {
    console.error('[Banner] error:', err.name, err.message);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Banner generation timed out' });
    }
    return res.status(500).json({ error: err.message });
  }
};
