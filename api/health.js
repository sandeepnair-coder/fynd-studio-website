// api/health.js — Health check endpoint (tests OpenAI API connection)

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-api-key');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.OPENAI_API_KEY || (req.headers && req.headers['x-user-api-key']);
  const hasApiKey = !!apiKey;

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'ok', hasApiKey, timestamp: new Date().toISOString(), runtime: process.version });
  }

  if (req.method === 'POST') {
    const diagnostics = {
      status: 'running',
      hasApiKey,
      keyPrefix: apiKey ? apiKey.substring(0, 10) + '...' : null,
      timestamp: new Date().toISOString(),
      runtime: process.version,
      tests: {}
    };

    if (!apiKey) {
      diagnostics.status = 'fail';
      diagnostics.tests.apiKey = { pass: false, error: 'No OPENAI_API_KEY found' };
      return res.status(200).json(diagnostics);
    }

    diagnostics.tests.apiKey = { pass: true, detail: 'Key present (' + apiKey.substring(0, 10) + '...)' };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 5,
          messages: [{ role: 'user', content: 'Reply ok' }]
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (openaiRes.ok) {
        const data = await openaiRes.json();
        diagnostics.tests.openaiApi = { pass: true, detail: 'Connected successfully', model: data.model };
        diagnostics.status = 'pass';
      } else {
        const errBody = await openaiRes.json().catch(() => ({}));
        diagnostics.tests.openaiApi = {
          pass: false,
          httpStatus: openaiRes.status,
          error: errBody.error?.message || 'HTTP ' + openaiRes.status,
          detail: openaiRes.status === 401 ? 'Invalid API key — check at platform.openai.com/api-keys'
                : openaiRes.status === 429 ? 'Rate limited — check billing at platform.openai.com/settings/organization/billing'
                : 'Unexpected error from OpenAI'
        };
        diagnostics.status = 'fail';
      }
    } catch (err) {
      diagnostics.tests.openaiApi = {
        pass: false,
        error: err.name === 'AbortError' ? 'Connection timed out (15s)' : err.message,
        detail: err.name === 'AbortError' ? 'Could not reach api.openai.com' : 'Network error'
      };
      diagnostics.status = 'fail';
    }

    // PixelBin test (keep existing)
    const pbToken = process.env.PIXELBIN_API_TOKEN;
    if (pbToken) {
      try {
        const pbRes = await fetch('https://api.pixelbin.io/service/platform/transformation/v1.0/predictions', {
          method: 'OPTIONS',
          headers: { 'X-Ebg-Api-Token': pbToken }
        });
        diagnostics.tests.pixelbin = { pass: pbRes.status < 500, detail: 'HTTP ' + pbRes.status };
      } catch (e) {
        diagnostics.tests.pixelbin = { pass: false, error: e.message };
      }
    }

    return res.status(200).json(diagnostics);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
