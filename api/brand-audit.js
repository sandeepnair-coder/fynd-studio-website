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
  const apiKey = process.env.OPENAI_API_KEY || req.headers['x-user-api-key'];
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured. Add OPENAI_API_KEY in Vercel environment variables.' });
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

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: 4000,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ]
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!openaiRes.ok) {
      const errBody = await openaiRes.json().catch(() => ({}));
      console.error('OpenAI API error:', openaiRes.status, JSON.stringify(errBody));
      return res.status(openaiRes.status).json({
        error: errBody.error?.message || `OpenAI API error: ${openaiRes.status}`
      });
    }

    const data = await openaiRes.json();
    const rawText = data.choices[0]?.message?.content || '';

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
      usage: { input_tokens: data.usage?.prompt_tokens || 0, output_tokens: data.usage?.completion_tokens || 0 }
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
  return `You are an expert Indian D2C brand creative strategist and media analyst. You analyse brands and produce a structured creative health check report. You have deep knowledge of India's D2C ecosystem, ad market benchmarks, platform dynamics (Instagram, YouTube, CTV, Q-Commerce), and the competitive landscape across fashion, beauty, FMCG, and consumer electronics.

When given a brand name, category, market segment, and website URLs, you produce a realistic, data-grounded audit. Use your knowledge of the Indian D2C market to generate realistic scores, gaps, and opportunities. Be specific — name real platforms, real festivals, real content formats. Avoid generic advice.

IMPORTANT — For every score and finding, you MUST provide:
1. A confidence level ("high" if you have direct knowledge of this brand, "medium" if inferring from category/segment, "low" if based on general assumptions)
2. A methodology note explaining HOW you arrived at that specific number/finding
3. Source references — cite specific benchmarks, reports, or data points you used

CRITICAL: Return COMPLETE valid JSON with ALL fields filled. No markdown, no backticks. Every field is required. Keep methodology notes concise (1-2 sentences each). Provide at least 3 items in breakdown, 3 alerts, 4+ regions, 3 priorities.

JSON structure:
{
  "brandProfile": [
    {"label": "What They Sell", "value": "<specific products/services from the website — be exact, e.g. 'Premium hardside luggage, cabin trolleys, laptop backpacks, travel accessories'>", "icon": "🛍️"},
    {"label": "Price Range", "value": "<actual price range found on site, e.g. '₹1,499 – ₹12,999'>", "icon": "💰"},
    {"label": "Target Audience", "value": "<inferred from site positioning, e.g. '25-40 year old urban professionals, frequent travelers'>", "icon": "👥"},
    {"label": "Brand Positioning", "value": "<how they position themselves, e.g. 'Premium quality at mid-market prices, durability-focused'>", "icon": "🎯"},
    {"label": "Key Differentiator", "value": "<what makes them unique, e.g. 'Anti-theft features, 10-year warranty, lightweight polycarbonate'>", "icon": "⭐"},
    {"label": "Content Maturity", "value": "<honest assessment: 'Early stage — minimal social presence' or 'Active — regular posts, multiple platforms' or 'Advanced — video content, influencer collabs'>", "icon": "📊"}
  ],
  "savings": "<string like '₹45–72 Lakhs'>",
  "savingsMethodology": "<2-3 sentences explaining assumptions: team size, content volume, cost per asset, AI tool pricing used>",
  "overallGrade": "<A+|A|B+|B|C+|C|D>",
  "topInsight": "<one powerful sentence>",
  "breakdown": [
    {"item": "Product Photoshoots", "trad": "₹15,000/shoot", "ai": "₹2,000/shoot"},
    {"item": "Social Media Creatives", "trad": "₹3,000/post", "ai": "₹500/post"},
    {"item": "Campaign Banners", "trad": "₹8,000/banner", "ai": "₹1,500/banner"},
    {"item": "Video Editing (Reels)", "trad": "₹5,000/reel", "ai": "₹1,200/reel"},
    {"item": "Regional Adaptations", "trad": "₹4,000/variant", "ai": "₹800/variant"},
    {"item": "Lifestyle Lookbooks", "trad": "₹25,000/set", "ai": "₹4,000/set"}
  ],
  "alerts": [
    {"type": "red", "icon": "🔴", "text": "<bold label>: <specific finding about this brand>"},
    {"type": "yellow", "icon": "🟡", "text": "<bold label>: <specific finding about this brand>"},
    {"type": "green", "icon": "🟢", "text": "<bold label>: <specific finding about this brand>"}
  ],
  "regions": [
    {"name": "North India", "score": <0-100>},
    {"name": "South India", "score": <0-100>},
    {"name": "West India", "score": <0-100>},
    {"name": "East India", "score": <0-100>},
    {"name": "Tier-2 Cities", "score": <0-100>},
    {"name": "Tier-3 Cities", "score": <0-100>}
  ],
  "priorities": [
    {"rank": 1, "action": "Launch AI-powered product photoshoot pipeline — replace manual studio shoots with AI-generated lifestyle and catalog imagery", "impact": "60% reduction in per-asset cost, 5× faster turnaround", "timeline": "IMMEDIATE · 7 DAYS"},
    {"rank": 2, "action": "Build regional content engine — create Tamil, Telugu, Bengali, Hindi social content from one master creative using AI translation and adaptation", "impact": "4× regional reach, 40% higher engagement in Tier-2/3 markets", "timeline": "SHORT TERM · 30 DAYS"},
    {"rank": 3, "action": "Implement AI-driven A/B testing system — auto-generate 10+ creative variants per campaign and test across platforms", "impact": "2× conversion rate improvement, data-driven creative decisions", "timeline": "MEDIUM TERM · 90 DAYS"}
  ],
  "competitorBenchmark": {
    "summary": "<2-3 sentences comparing this brand's content output, engagement, and AI adoption vs the top 3 competitors in its category. Name specific competitor brands.>",
    "postsPerMonth": <integer — this brand's estimated monthly post count>,
    "categoryLeaderPosts": <integer — the top competitor's monthly post count>,
    "aiAdoptionPct": <integer — this brand's estimated AI tool usage percentage>,
    "categoryAvgAiPct": <integer — average AI adoption in this category>
  },
  "dataSources": [
    "Instagram Analytics — follower growth, engagement rate, posting frequency benchmarks",
    "RedSeer India D2C Report 2024 — category growth rates, market sizing",
    "Bain & Company India D2C Landscape — competitive benchmarks, unit economics",
    "Meta Business Suite — platform-specific engagement norms by category",
    "SimilarWeb / Google Trends — web traffic patterns, search interest data"
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
    prompt += `\n\n--- BRAND WEBSITE DATA (scraped from actual site) ---\n${siteContent}\n--- END WEBSITE DATA ---\n`;
    prompt += `\nUse the website data above to understand what this brand actually sells, their positioning, categories, and pricing. Ground your analysis in this real data.`;
  } else {
    prompt += `\n\nNote: Website could not be fetched. For brand-specific metrics you cannot verify, mark confidence as "low" and note the limitation.`;
  }

  prompt += `\n\nProduce a realistic, specific creative health check for this Indian D2C brand. Use your knowledge of this brand (if known) or infer from the category and segment. All scores, savings, and findings must be realistic for an Indian D2C brand at this stage. Reference specific Indian platforms, festivals, and content formats. Be critical where appropriate — don't inflate scores. If you don't know specific data, say so in your methodology notes.`;

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
        .substring(0, 2000);

      // Get prices
      const prices = (html.match(/₹[\s]*[\d,]+/g) || []).slice(0, 10);

      results.push(`URL: ${targetUrl}\nTitle: ${title.trim()}\nDescription: ${desc.trim()}\nKeywords: ${keywords.trim()}\nPrices found: ${prices.join(', ') || 'none'}\nPage content: ${stripped}`);
    } catch(e) {
      // Skip failed URLs
    }
  }
  return results.length ? results.join('\n\n') : null;
}
