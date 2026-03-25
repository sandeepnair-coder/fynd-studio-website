// api/claude.js
// Vercel Serverless Function — generic LLM proxy (OpenAI GPT-4o)
// Accepts Anthropic-style request format, translates to OpenAI format

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-api-key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY || req.headers['x-user-api-key'];
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured. Add OPENAI_API_KEY in Vercel environment variables.' });
  }

  try {
    const { model, max_tokens, system, messages } = req.body;

    // Build OpenAI messages array — prepend system message
    const openaiMessages = [];
    if (system) {
      openaiMessages.push({ role: 'system', content: system });
    }
    if (messages && messages.length) {
      openaiMessages.push(...messages);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 58000);

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: max_tokens || 2000,
        messages: openaiMessages
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!openaiRes.ok) {
      const errBody = await openaiRes.json().catch(() => ({}));
      console.error('OpenAI proxy error:', openaiRes.status, JSON.stringify(errBody));
      return res.status(openaiRes.status).json(errBody);
    }

    const data = await openaiRes.json();

    // Translate OpenAI response to Anthropic-compatible format
    // so the client-side code doesn't need changes
    const anthropicFormat = {
      content: [{ type: 'text', text: data.choices[0]?.message?.content || '' }],
      model: data.model,
      usage: {
        input_tokens: data.usage?.prompt_tokens || 0,
        output_tokens: data.usage?.completion_tokens || 0
      }
    };

    return res.status(200).json(anthropicFormat);

  } catch (err) {
    console.error('OpenAI proxy error:', err.name, err.message);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Request to OpenAI timed out. Please try again.' });
    }
    return res.status(500).json({ error: err.message });
  }
}
