// api/image-proxy.js
// Proxies PixelBin delivery images to avoid ORB/CORS blocking in the browser
// Only allows proxying from delivery.pixelbin.io for security

module.exports = async function handler(req, res) {
  const imageUrl = req.query ? req.query.url : null;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Security: only proxy from PixelBin delivery domain
  if (!imageUrl.startsWith('https://delivery.pixelbin.io/')) {
    return res.status(403).json({ error: 'Only PixelBin delivery URLs allowed' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(imageUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream error ' + response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/png';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const buffer = Buffer.from(await response.arrayBuffer());
    res.status(200).end(buffer);
  } catch (err) {
    console.error('Image proxy error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
