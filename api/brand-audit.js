// api/brand-audit.js
// Vercel Serverless Function — proxies requests to Anthropic Claude API
// API key is stored as ANTHROPIC_API_KEY in Vercel environment variables

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-api-key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Use server env key first, fall back to user-provided key from header
  const apiKey = process.env.ANTHROPIC_API_KEY || req.headers['x-user-api-key'];
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured. Click the gear icon in the nav bar to add your Anthropic API key.' });
  }

  try {
    const { brandName, category, segment, urls, systemPrompt, userPrompt } = req.body;

    if (!brandName && !userPrompt) {
      return res.status(400).json({ error: 'Missing required fields: brandName or userPrompt' });
    }

    // Fetch website content if URLs provided
    let siteContent = '';
    if (urls && urls.length) {
      try {
        const siteData = await fetchBrandSite(urls.slice(0, 2));
        if (siteData) siteContent = siteData;
      } catch(e) {
        console.warn('Website fetch failed:', e.message);
      }
    }

    // Build the prompt if not provided directly
    const system = systemPrompt || buildSystemPrompt();
    const user = userPrompt || buildUserPrompt(brandName, category, segment, urls, siteContent);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000); // 55s safety margin

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2500,
        system: system,
        messages: [{ role: 'user', content: user }]
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.json().catch(() => ({}));
      console.error('Anthropic API error:', anthropicRes.status, JSON.stringify(errBody));
      return res.status(anthropicRes.status).json({
        error: errBody.error?.message || `Anthropic API error: ${anthropicRes.status}`
      });
    }

    const data = await anthropicRes.json();
    const rawText = data.content.map(c => c.text || '').join('');

    // Try to parse as JSON (strip markdown fences if present)
    let parsed;
    try {
      const cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      // Return raw text if not valid JSON
      parsed = { raw: rawText };
    }

    return res.status(200).json({
      success: true,
      data: parsed,
      model: data.model,
      usage: data.usage
    });

  } catch (err) {
    console.error('Serverless function error:', err.name, err.message);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Request to Anthropic API timed out. Please try again.' });
    }
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

function buildSystemPrompt() {
  return `You are an Indian D2C brand strategist. Produce a creative health check as JSON only.

Rules: Be specific to Indian market. Provide confidence (high/medium/low) and brief methodology for each score. No markdown, no backticks.

JSON structure:
{
  "scores": {
    "velocity": <0-100>,
    "stagnation": <"LOW"|"MEDIUM"|"HIGH">,
    "regional": <0-100>,
    "ai": <0-100>,
    "platform": <0-100>
  },
  "scoreMethodology": {
    "velocity": {"confidence": "<high|medium|low>", "method": "<1-2 sentences: how you calculated this score>", "benchmark": "<what you compared against>"},
    "stagnation": {"confidence": "<high|medium|low>", "method": "<1-2 sentences>", "benchmark": "<comparison>"},
    "regional": {"confidence": "<high|medium|low>", "method": "<1-2 sentences>", "benchmark": "<comparison>"},
    "ai": {"confidence": "<high|medium|low>", "method": "<1-2 sentences>", "benchmark": "<comparison>"},
    "platform": {"confidence": "<high|medium|low>", "method": "<1-2 sentences>", "benchmark": "<comparison>"}
  },
  "savings": "<string like '₹45–72 Lakhs'>",
  "savingsMethodology": "<2-3 sentences explaining assumptions: team size, content volume, cost per asset, AI tool pricing used>",
  "overallGrade": "<A+|A|B+|B|C+|C|D>",
  "topInsight": "<one powerful sentence>",
  "breakdown": [
    {"item": "<string>", "trad": "<string>", "ai": "<string>"}
  ],
  "alerts": [
    {"type": "<red|yellow|green>", "icon": "<html>", "text": "<html string>"}
  ],
  "regions": [
    {"name": "<string>", "score": <0-100>}
  ],
  "priorities": [
    {"rank": <1-3>, "action": "<string>", "impact": "<string>", "timeline": "<string>"}
  ],
  "competitorBenchmark": {
    "summary": "<string>",
    "postsPerMonth": <integer>,
    "categoryLeaderPosts": <integer>,
    "aiAdoptionPct": <integer>,
    "categoryAvgAiPct": <integer>
  },
  "dataSources": [
    "<string — each source/report/benchmark cited, e.g. 'RedSeer India D2C Report 2024', 'Meta Business Suite category benchmarks', 'Bain India D2C Landscape 2024'>",
    "<string>",
    "<string>",
    "<string>"
  ],
  "analysisDisclaimer": "<1-2 sentences: honest statement about data limitations — e.g. 'Scores are estimated from public signals and category benchmarks. For verified metrics, connect your analytics accounts.'>"
}`;
}

function buildUserPrompt(brandName, category, segment, urls, siteContent) {
  let prompt = `Brand: ${brandName || 'Unknown'}
Category: ${category || 'D2C / E-Commerce'}
Market Segment: ${segment || 'Premium Mid-Market'}
Website/Social URLs: ${urls && urls.length ? urls.join(', ') : 'not provided'}`;

  if (siteContent) {
    prompt += `\n\nSite data:\n${siteContent}\n`;
  } else {
    prompt += `\n\nNo site data available — mark confidence "low" where needed.`;
  }

  prompt += `\n\nProduce a realistic creative health check. Be India-specific. Don't inflate scores.`;

  return prompt;
}

async function fetchBrandSite(urls) {
  const results = [];
  for (const url of urls) {
    try {
      let targetUrl = url.trim();
      if (!targetUrl.startsWith('http')) targetUrl = 'https://' + targetUrl;

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FyndStudio/1.0; Brand Analyzer)',
          'Accept': 'text/html'
        },
        signal: controller.signal,
        redirect: 'follow'
      });

      clearTimeout(timeout);
      if (!response.ok) continue;

      const html = await response.text();

      // Extract key content
      const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
      const desc = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i) || [])[1] || '';
      const keywords = (html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([\s\S]*?)["']/i) || [])[1] || '';

      // Get clean text
      const stripped = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 1000);

      // Get prices
      const prices = (html.match(/₹[\s]*[\d,]+/g) || []).slice(0, 10);

      results.push(`URL: ${targetUrl}\nTitle: ${title.trim()}\nDescription: ${desc.trim()}\nKeywords: ${keywords.trim()}\nPrices found: ${prices.join(', ') || 'none'}\nPage content: ${stripped}`);
    } catch(e) {
      // Skip failed URLs
    }
  }
  return results.length ? results.join('\n\n') : null;
}
