// ══════════════════════════════════════════════════════════
// BATTLE CARD — DYNAMIC AI GENERATION
// Generates real competitor, market, concept & strategy data
// for the analysed brand instead of hardcoded Bewakoof data
// ══════════════════════════════════════════════════════════

var battleCardData = null;
window._battleBrand = null;

// ── DUMMY BATTLE CARD DATA (used when USE_DUMMY_DATA === true in app.js) ──
var DUMMY_BATTLE_DATA = {
  competitors: [
    { name: 'Zara India', desc: 'Global fast-fashion leader with strong India presence', badge: 'Category Leader', badgeClass: 'leader', confidence: 'verified', dataSource: 'Instagram analysis + industry reports',
      posts: '52 posts', postsClass: 'good', er: '3.2%', erClass: 'good', mix: '55% Reels / 30% Static / 15% Carousel', mixClass: 'good', festivals: '12 regional', festivalsClass: 'good', ai: '~40% est.', aiClass: 'good', gap: 'Posting 4× more with 2× higher engagement', gapClass: 'bad' },
    { name: 'H&M India', desc: 'Mass-market fashion with aggressive digital strategy', badge: 'High Spend', badgeClass: 'leader', confidence: 'verified', dataSource: 'Social media analytics platforms',
      posts: '45 posts', postsClass: 'good', er: '2.8%', erClass: 'good', mix: '50% Reels / 35% Static / 15% Stories', mixClass: 'good', festivals: '10 regional', festivalsClass: 'good', ai: '~35% est.', aiClass: 'neutral', gap: 'Stronger festival & regional strategy', gapClass: 'bad' },
    { name: 'Myntra Fashion', desc: 'India\'s largest fashion e-commerce marketplace', badge: 'Market Leader', badgeClass: 'leader', confidence: 'verified', dataSource: 'E-commerce marketplace data',
      posts: '60 posts', postsClass: 'good', er: '2.5%', erClass: 'neutral', mix: '40% Reels / 40% Static / 20% UGC', mixClass: 'good', festivals: '15 regional', festivalsClass: 'good', ai: '~50% est.', aiClass: 'good', gap: 'Industry-leading content volume & AI adoption', gapClass: 'bad' },
    { name: 'AJIO', desc: 'Fast-growing Reliance-backed fashion platform', badge: 'Rising Fast', badgeClass: 'rising', confidence: 'estimated', dataSource: 'Indian fashion industry reports',
      posts: '38 posts', postsClass: 'good', er: '2.1%', erClass: 'neutral', mix: '45% Reels / 40% Static / 15% Carousel', mixClass: 'neutral', festivals: '8 regional', festivalsClass: 'neutral', ai: '~25% est.', aiClass: 'neutral', gap: 'Growing fast with strong regional push', gapClass: 'neutral' }
  ],
  yourBrand: { desc: 'Currently under-indexing on content velocity and AI adoption', confidence: 'estimated',
    posts: '12', er: '1.8%', mix: '70% Static / 20% Reels / 10% Stories', festivals: '3', ai: '~15%', potential: '4× content output at 70% lower cost with AI' },
  markets: [
    { title: 'South India',    desc: 'Tamil Nadu & Karnataka show 3× higher D2C fashion growth. Missing Onam, Pongal campaigns.',      opp: '₹2.5Cr untapped market', confidence: 'estimated' },
    { title: 'East India',     desc: 'Bengal & Odisha emerging D2C hubs. Durga Puja fashion spending up 180% YoY.',                    opp: '₹1.8Cr addressable',     confidence: 'estimated' },
    { title: 'Northeast',      desc: 'Fastest-growing e-commerce region. Zero competition in premium streetwear.',                     opp: '₹80L first-mover advantage', confidence: 'estimated' },
    { title: 'Tier-2 Cities',  desc: 'Jaipur, Lucknow, Indore showing 2.5× fashion app installs. Price-sensitive but brand-aware.',    opp: '₹3.2Cr expansion potential', confidence: 'estimated' }
  ],
  platforms: [
    { rank: 1, title: 'Instagram Reels', desc: 'Algorithm heavily favors Reels — 3× reach vs static. Brand doing only 20% Reels.', opp: '+180% reach potential' },
    { rank: 2, title: 'YouTube Shorts',  desc: 'Untapped channel. Category leaders getting 500K+ views per Short.',                opp: '+2.5× new audience' },
    { rank: 3, title: 'WhatsApp Channels', desc: 'Direct-to-consumer broadcast. 40% higher conversion than email.',                opp: '+35% repeat purchase rate' },
    { rank: 4, title: 'Pinterest India',  desc: 'Fashion discovery platform growing 85% YoY in India. Low competition.',            opp: '+60% consideration lift' }
  ],
  seasonal: [
    { title: 'Onam Collection',    desc: 'Kerala fashion market peaks Aug-Sep. Zero brand presence currently.',  opp: 'Aug 15 – Sep 10 window' },
    { title: 'Durga Puja Drop',    desc: 'Bengal\'s biggest fashion moment. Competitors launch 30+ creatives.',  opp: 'Sep 20 – Oct 5 window' },
    { title: 'Eid Fashion',        desc: 'Pan-India modest fashion moment. 2× higher AOV than regular sales.',  opp: 'Mar – Apr window' },
    { title: 'Summer Streetwear',  desc: 'Gen-Z streetwear demand spikes 200% in April-May. UGC-driven.',       opp: 'Apr 1 – May 30 window' }
  ],
  trends: [
    { tag: 'urgent',   title: 'AI-Generated Lookbooks',    stat: '+320%',  statLabel: 'adoption growth', desc: 'Top D2C brands are shipping AI-generated lookbooks in 48 hours instead of 3-week photoshoots. Cost reduction: 85%.', action: 'Launch first AI lookbook within 2 weeks', source: 'Industry benchmarks 2025' },
    { tag: 'rising',   title: 'Regional Language Reels',    stat: '3.2×',   statLabel: 'higher engagement', desc: 'Hindi + regional language Reels outperform English-only content by 3.2×. South Indian languages showing fastest growth.', action: 'Create Tamil & Telugu content templates', source: 'Social media analytics' },
    { tag: 'emerging', title: 'Shoppable Short Videos',     stat: '+180%',  statLabel: 'conversion lift', desc: 'Instagram & YouTube shoppable videos driving 180% higher conversion than static product posts. Early movers gaining 2× ROAS.', action: 'Integrate product tags in all video content', source: 'E-commerce reports' },
    { tag: 'rising',   title: 'UGC Creator Collaborations', stat: '+85%',   statLabel: 'brand recall', desc: 'Micro-influencer UGC content driving 85% higher brand recall than polished brand content. Cost per engagement 60% lower.', action: 'Launch UGC creator program with 20 creators', source: 'D2C brand benchmarks' }
  ],
  methodology: {
    competitorSelection: 'Selected based on direct competition in youth fashion segment, social media presence, and market positioning similarity',
    metricsApproach: 'Estimated from brand knowledge, social media benchmarks, and Indian D2C category norms',
    limitationsNote: 'Metrics are AI-estimated based on brand knowledge and category benchmarks; actual values may vary'
  },
  dataSources: ['Social media analytics platforms', 'Indian fashion industry reports', 'D2C brand performance benchmarks', 'E-commerce marketplace data']
};

// ── BATTLE CARD LOADER (event-driven, synced with actual API progress) ──
// Exposed so generateBattleCardData can update steps in real time
window._battleLoaderStep = function(stepNum, pct) {
  var prog = document.getElementById('battleLoadingProgress');
  // Mark previous steps done
  for (var i = 1; i < stepNum; i++) {
    var prev = document.getElementById('bstep' + i);
    if (prev) prev.className = 'lstep done';
  }
  // Mark current active
  var cur = document.getElementById('bstep' + stepNum);
  if (cur) cur.className = 'lstep active';
  if (prog) prog.style.width = pct + '%';
};

function launchBattleCardGeneration(brandName, category, segment) {
  var overlay = document.getElementById('battleLoadingOverlay');
  if (!overlay) return;

  // Set brand name in loader
  var brandEl = document.getElementById('battleAnalysingBrand');
  if (brandEl) brandEl.textContent = brandName;

  // Show overlay
  overlay.classList.add('show');
  if (typeof startLoadingDots === 'function') startLoadingDots();

  // Reset progress bar
  var prog = document.getElementById('battleLoadingProgress');
  if (prog) {
    prog.style.animation = 'none';
    prog.offsetHeight;
    prog.style.width = '0%';
    prog.style.transition = 'none';
    prog.offsetHeight;
    prog.style.transition = 'width 0.8s ease';
  }

  // Reset all steps
  [1,2,3,4,5].forEach(function(i) {
    var el = document.getElementById('bstep' + i);
    if (el) el.className = 'lstep';
  });

  // Step 1 immediately active
  window._battleLoaderStep(1, 5);

  // Start actual API generation — steps are driven by generateBattleCardData
  generateBattleCardData(brandName, category, segment).then(function() {
    // Mark all steps done
    window._battleLoaderStep(5, 95);
    var s5 = document.getElementById('bstep5');
    if (s5) s5.className = 'lstep done';
    if (prog) prog.style.width = '100%';

    setTimeout(function() {
      if (typeof stopLoadingDots === 'function') stopLoadingDots();
      overlay.classList.remove('show');
      _doShowPage('battle');
      showToast('success', 'Battle Cards ready!', brandName + ' competitive playbook generated by AI.');
    }, 600);
  }).catch(function(err) {
    if (typeof stopLoadingDots === 'function') stopLoadingDots();
    overlay.classList.remove('show');

    var errorMsg = 'Could not fetch battle card data. Please check your connection and try again.';
    if (err.message && err.message.includes('API key')) {
      errorMsg = 'API key not configured. Please add your ANTHROPIC_API_KEY in Vercel environment variables.';
    } else if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
      errorMsg = 'No network connection. Please check your internet and try again.';
    } else if (err.message && err.message.includes('timed out')) {
      errorMsg = 'AI generation timed out. Please try again.';
    }

    showToast('error', 'Battle Card generation failed', errorMsg, 8000);
  });
}

var BATTLE_ICONS = {
  map: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  location: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  event: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>',
  generic: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',
  star: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" stroke-width="1.5" stroke-linecap="round"><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"/></svg>',
  pitfall: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
};

var BATTLE_CARD_PROMPT = [
  "You are an expert brand strategist. You will receive a brand name, category, and website data.",
  "",
  "YOUR JOB: Deeply analyze THIS SPECIFIC BRAND and produce a battle card that is IMPOSSIBLE to confuse with any other brand's battle card.",
  "",
  "BEFORE writing ANY JSON, think through these questions about the brand:",
  "- What EXACTLY does this brand sell? (not the category — the actual products, SKUs, price points)",
  "- Who are their DIRECT competitors? (brands selling similar products at similar price points in India)",
  "- Which Indian REGIONS matter most for THIS product category? (luggage = airport cities, fashion = metro youth, food = regional tastes)",
  "- Which PLATFORMS work best for THIS product type? (visual products = Instagram/Pinterest, B2B = LinkedIn, tech = YouTube reviews)",
  "- Which FESTIVALS/SEASONS drive purchases in THIS category? (luggage = vacation seasons, fashion = Diwali/wedding, food = harvest festivals)",
  "- What TRENDS are specifically reshaping THIS category right now? (not generic D2C trends — category-specific shifts)",
  "",
  "CRITICAL RULES:",
  "- Every field must be SPECIFIC to this brand and its category. If analyzing a luggage brand, markets should mention travel hubs, not generic 'Tier-2 cities'.",
  "- Platforms should explain WHY that platform matters for THIS category specifically.",
  "- Seasonal campaigns should be relevant to THIS product (not generic Diwali for every brand).",
  "- Trends must be about THIS industry, not generic AI/D2C trends.",
  "- For each trend, ground `title`, `desc`, and `action` in the BRAND WEBSITE DATA (product categories, positioning, and pricing tier). Avoid generic wording when the website data contradicts it.",
  "- Competitors must be REAL brands selling similar products in India.",
  "- Every metric must have a numeric value. Never 'Data unavailable'.",
  "",
  "Respond ONLY with valid JSON. No markdown. No backticks.",
  "",
  "JSON structure:",
  "{",
  "  \"competitors\": [",
  "    {\"name\":\"<REAL competitor brand name>\",\"desc\":\"<what they sell, their positioning vs this brand>\",\"badge\":\"Category Leader|Fast Mover|Rising Fast|Market Leader|High Spend\",",
  "     \"badgeClass\":\"leader|rising\",\"confidence\":\"verified|estimated\",\"dataSource\":\"<how you know this>\",",
  "     \"posts\":\"<estimated monthly posts>\",\"postsClass\":\"good|neutral|bad\",",
  "     \"er\":\"<engagement rate %>\",\"erClass\":\"good|neutral|bad\",",
  "     \"mix\":\"<content format split>\",\"mixClass\":\"good|neutral|bad\",",
  "     \"festivals\":\"<how many regional/festival campaigns they run>\",\"festivalsClass\":\"good|neutral|bad\",",
  "     \"ai\":\"<estimated AI adoption %>\",\"aiClass\":\"good|neutral|bad\",",
  "     \"gap\":\"<specific gap vs the brand being analyzed>\",\"gapClass\":\"bad|neutral\"}",
  "  ],",
  "  \"yourBrand\":{\"desc\":\"<what this brand is and does — from website data>\",\"confidence\":\"verified|estimated\",",
  "    \"posts\":\"<est monthly posts>\",\"er\":\"<est engagement %>\",\"mix\":\"<format split>\",\"festivals\":\"<festival campaigns>\",\"ai\":\"<AI adoption %>\",\"potential\":\"<growth target>\"},",
  "  \"markets\":[",
  "    {\"title\":\"<region/city cluster relevant to THIS product>\",\"desc\":\"<WHY this region matters for THIS brand's category — mention specific cities, buyer behavior, cultural factors>\",\"opp\":\"<revenue opportunity in ₹ Cr>\",\"confidence\":\"verified|estimated\"}",
  "  ],",
  "  \"platforms\":[",
  "    {\"rank\":1,\"title\":\"<platform name>\",\"desc\":\"<WHY this platform matters for THIS specific product category — not generic platform facts>\",\"opp\":\"<specific measurable goal for this brand>\"}",
  "  ],",
  "  \"seasonal\":[",
  "    {\"title\":\"<campaign name relevant to THIS category>\",\"desc\":\"<WHY this season/festival drives sales for THIS product type — connect to buyer behavior>\",\"opp\":\"<timing window>\"}",
  "  ],",
  "  \"trends\":[",
  "    {\"tag\":\"rising|emerging|urgent\",\"title\":\"<trend specific to THIS industry/category>\",\"stat\":\"<real stat like +180% or 3.2x>\",\"statLabel\":\"<what the stat measures>\",",
  "     \"desc\":\"<2 sentences explaining how this trend specifically impacts THIS brand's category>\",\"action\":\"<specific action for THIS brand>\",\"source\":\"<credible source>\"}",
  "  ],",
  "  \"methodology\":{\"competitorSelection\":\"<how you chose these specific competitors>\",\"metricsApproach\":\"<data sources used>\",\"limitationsNote\":\"<honest limitations>\"},",
  "  \"dataSources\":[\"<source 1>\",\"<source 2>\",\"<source 3>\",\"<source 4>\",\"<source 5>\"]",
  "}",
  "",
  "Provide exactly 4 competitors, 4 markets, 4 platforms, 4 seasonal, 4 trends.",
  "EVERY field must be brand-specific and category-specific. If I can copy-paste your output to a different brand and it still makes sense, you have FAILED."
].join("\n");

function escBattle(s) {
  if (!s) return '';
  var d = document.createElement('div');
  d.textContent = String(s);
  return d.innerHTML;
}

async function fetchSiteContent(urls) {
  if (!urls || !urls.length) return null;
  try {
    var res = await fetch('/api/fetch-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: urls.slice(0, 3) })
    });
    if (!res.ok) return null;
    var data = await res.json();
    if (!data.results || !data.results.length) return null;
    var parts = [];
    var productImages = [];
    data.results.forEach(function(r) {
      if (r.status !== 'ok' || !r.content) return;
      var c = r.content;
      var section = 'URL: ' + r.url;
      if (c.title) section += '\nTitle: ' + c.title;
      if (c.description) section += '\nDescription: ' + c.description;
      if (c.categories && c.categories.length) section += '\nCategories: ' + c.categories.join(', ');
      if (c.pricing && c.pricing.length) section += '\nPrices: ' + c.pricing.join(', ');
      if (c.socialLinks && c.socialLinks.length) section += '\nSocial: ' + c.socialLinks.join(', ');
      if (c.features && c.features.length) section += '\nKeywords: ' + c.features.join(', ');
      if (c.rawText) section += '\nContent: ' + c.rawText.substring(0, 2000);
      parts.push(section);
      // Collect product images for PixelBin AI generation
      if (c.productImages && c.productImages.length) {
        productImages = productImages.concat(c.productImages);
      }
    });
    // Store product images globally for concept image generation
    window._battleProductImages = productImages.slice(0, 5);
    return parts.length ? parts.join('\n\n') : null;
  } catch(e) {
    return null;
  }
}

async function generateBattleCardData(brandName, category, segment) {
  // ── DUMMY DATA MODE — skip all API calls ──
  if (typeof USE_DUMMY_DATA !== 'undefined' && USE_DUMMY_DATA) {
    if (window._battleLoaderStep) window._battleLoaderStep(1, 10);
    await new Promise(function(r) { setTimeout(r, 400); });
    if (window._battleLoaderStep) window._battleLoaderStep(2, 30);
    await new Promise(function(r) { setTimeout(r, 400); });
    if (window._battleLoaderStep) window._battleLoaderStep(3, 50);
    await new Promise(function(r) { setTimeout(r, 400); });
    if (window._battleLoaderStep) window._battleLoaderStep(4, 75);
    await new Promise(function(r) { setTimeout(r, 300); });

    battleCardData = JSON.parse(JSON.stringify(DUMMY_BATTLE_DATA));
    window._battleBrand = brandName;
    renderBattleCards(battleCardData, brandName, category);
    return;
  }

  // ── LIVE MODE (original code) ──
  // Use analysis data from Creative Intel if available
  var ad = window.lastAnalysisData;

  // Fetch website content for thorough brand understanding
  var urls = [];
  try {
    var storedUrls = sessionStorage.getItem('fyndBrandUrls');
    if (storedUrls) urls = JSON.parse(storedUrls);
  } catch(e) {}
  urls = Array.isArray(urls) ? urls.filter(function(u) { return !!u; }) : [];

  // Fallback: if session data isn't present (e.g. direct link), try DOM inputs.
  if (!urls.length) {
    urls = Array.from(document.querySelectorAll('.brand-url-input'))
      .map(function(i) { return i.value.trim(); }).filter(Boolean);
  }

  // Step 1: Studying website (loader is already on step 1)
  var siteContent = await fetchSiteContent(urls);

  // Step 2: Website studied, building prompt
  if (window._battleLoaderStep) window._battleLoaderStep(2, 25);

  var userPrompt = 'Brand: ' + brandName + '\nCategory: ' + category + '\nMarket Segment: ' + segment;

  // Include scraped website data for thorough brand understanding
  if (siteContent) {
    userPrompt += '\n\n--- BRAND WEBSITE DATA (scraped from actual site) ---\n' + siteContent + '\n--- END WEBSITE DATA ---';
    userPrompt += '\n\nUse the website data above to understand what this brand actually sells, their positioning, product categories, and pricing. Ground ALL analysis in this real data. Reference specific products and categories from their site.';
  } else if (urls.length) {
    userPrompt += '\n\nWebsite URLs provided but could not be scraped. Use your knowledge of this brand if available.';
  }

  // If we already have brand audit data, pass key insights
  if (ad) {
    userPrompt += '\n\nBrand audit already completed. Key findings:';
    if (ad.scores) {
      var sc = ad.scores;
      userPrompt += '\n- Creative Velocity: ' + sc.velocity + '/100';
      userPrompt += '\n- Stagnation Risk: ' + sc.stagnation;
      userPrompt += '\n- Regional Score: ' + sc.regional + '/100';
      userPrompt += '\n- AI Opportunity: ' + sc.ai + '/100';
      userPrompt += '\n- Platform Score: ' + sc.platform + '/100';
    }
    if (ad.topInsight) userPrompt += '\n- Top Insight: ' + ad.topInsight;
    if (ad.savings) userPrompt += '\n- Est. Savings: ' + ad.savings;
    if (ad.competitorBenchmark && ad.competitorBenchmark.summary) {
      userPrompt += '\n- Competitor Context: ' + ad.competitorBenchmark.summary;
    }
  }

  userPrompt += '\n\nGenerate a complete battle card analysis (WITHOUT the strategy or concepts sections — omit "strategy" and "concepts" keys entirely). All competitors must be REAL brands competing in this exact category in India. Provide estimated values for ALL metrics — use your brand knowledge, social media benchmarks, and Indian D2C category norms. NEVER return "Data unavailable" for any field. Mark confidence as "estimated" where you infer from benchmarks.';

  // Step 3: Calling AI
  if (window._battleLoaderStep) window._battleLoaderStep(3, 40);

  try {
    var rawText = await callClaude(BATTLE_CARD_PROMPT, userPrompt, 5000);
    var cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    // Step 4: AI responded, parsing + rendering
    if (window._battleLoaderStep) window._battleLoaderStep(4, 75);

    battleCardData = JSON.parse(cleaned);
    window._battleBrand = brandName;
    window._battleSiteContent = siteContent; // Store for Ogilvy generation later
    renderBattleCards(battleCardData, brandName, category);

    // In live mode, enrich the Competitor Plan tab with real Apify Instagram data
    enrichCompetitorTabFromApify(battleCardData, brandName, category);
  } catch(err) {
    battleCardData = null;
    window._battleBrand = null;
    throw err;
  }
}

function confBadge(level) {
  if (!level) return '';
  var colors = {
    verified: 'background:var(--muted);color:var(--primary);border:1px solid var(--border)',
    estimated: 'background:var(--muted);color:var(--muted-foreground);border:1px solid var(--border)',
    unverified: 'background:var(--muted);color:var(--destructive);border:1px solid var(--border)'
  };
  var labels = { verified: 'VERIFIED', estimated: 'ESTIMATED', unverified: 'UNVERIFIED' };
  var style = colors[level] || colors.unverified;
  var label = labels[level] || 'UNVERIFIED';
  return ' <span style="font-size:8px;font-weight:600;letter-spacing:0.06em;padding:2px 6px;border-radius:3px;' + style + ';vertical-align:middle;margin-left:4px">' + label + '</span>';
}

function metricVal(value, cardConfidence) {
  var val = escBattle(value);
  if (!val || val === 'Data unavailable' || val === 'N/A' || val === 'undefined') {
    return '<span style="color:var(--muted-foreground);font-style:italic">Data unavailable</span>';
  }
  return val;
}

function renderCompetitorTabLoading(data, brandName) {
  var compGrid = document.querySelector('#tab-competitor .comp-grid');
  if (!compGrid) return;

  var competitorNames = (data.competitors || []).map(function(c) { return c.name; });
  var namesList = competitorNames.length ? competitorNames.join(', ') : 'competitors';

  compGrid.innerHTML =
    '<div style="grid-column:1/-1;padding:60px 40px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px">' +
      '<div style="position:relative;width:48px;height:48px">' +
        '<div style="position:absolute;inset:0;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 1s linear infinite"></div>' +
        '<div style="position:absolute;inset:6px;border:3px solid var(--border);border-bottom-color:var(--signal, #10b981);border-radius:50%;animation:spin 1.5s linear infinite reverse"></div>' +
      '</div>' +
      '<div style="font-size:16px;font-weight:600;color:var(--foreground)">Fetching Live Competitor Data</div>' +
      '<div style="font-size:13px;color:var(--muted-foreground);max-width:400px;line-height:1.6">' +
        'Scraping real Instagram profiles for <strong>' + escBattle(namesList) + '</strong> via Apify. This takes 1–2 minutes for verified data.' +
      '</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;width:260px;text-align:left;margin-top:8px">' +
        '<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted-foreground)">' +
          '<div style="width:6px;height:6px;border-radius:50%;background:var(--primary);animation:lstep-pulse 1.2s ease-in-out infinite"></div>' +
          'Looking up Instagram handles' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted-foreground);opacity:0.4">' +
          '<div style="width:6px;height:6px;border-radius:50%;background:var(--border)"></div>' +
          'Scraping follower counts & engagement' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted-foreground);opacity:0.4">' +
          '<div style="width:6px;height:6px;border-radius:50%;background:var(--border)"></div>' +
          'Calculating content mix & posting frequency' +
        '</div>' +
        '<div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted-foreground);opacity:0.4">' +
          '<div style="width:6px;height:6px;border-radius:50%;background:var(--border)"></div>' +
          'Building competitor cards with verified data' +
        '</div>' +
      '</div>' +
    '</div>';
}

function renderCompetitorTab(data, brandName) {
  var compGrid = document.querySelector('#tab-competitor .comp-grid');
  if (!compGrid || !data.competitors) return;
  var html = '';

  // Methodology banner
  if (data.methodology) {
    html += '<div style="grid-column:1/-1;padding:16px 20px;background:var(--muted);border:1px solid var(--border);border-radius:8px;margin-bottom:8px;font-size:12px;color:var(--muted-foreground);display:flex;align-items:flex-start;gap:10px">' +
      '<span style="font-size:16px;flex-shrink:0">&#9432;</span><div>' +
      '<strong style="color:var(--foreground)">Data Transparency</strong><br>' +
      (data.methodology.metricsApproach ? '<span style="color:var(--muted-foreground)">' + escBattle(data.methodology.metricsApproach) + '</span><br>' : '') +
      (data.methodology.limitationsNote ? '<span style="color:var(--muted-foreground)">&#9888; ' + escBattle(data.methodology.limitationsNote) + '</span>' : '') +
      '</div></div>';
  }

  data.competitors.forEach(function(c) {
    if (c.notFound || c.confidence === 'not_found') {
      // Minimal "not found" card — no fake metrics
      html += '<div class="comp-card comp-card--not-found">' +
        '<div class="comp-header"><div class="comp-name">' + escBattle(c.name) + '</div></div>' +
        '<div style="display:flex;align-items:center;gap:10px;padding:24px 0;color:var(--muted-foreground)">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="11" y1="16" x2="11.01" y2="16"/></svg>' +
        '<span style="font-size:13px">Instagram profile not found — no data available</span>' +
        '</div>' +
        '</div>';
      return;
    }
    html += '<div class="comp-card">' +
      '<div class="comp-header"><div><div class="comp-name">' + escBattle(c.name) + confBadge(c.confidence) + '</div>' +
      '<div style="font-size:12px;color:var(--muted-foreground);margin-top:8px">' + escBattle(c.desc) + '</div></div>' +
      '<div class="comp-badge ' + escBattle(c.badgeClass) + '">' + escBattle(c.badge) + '</div></div>' +
      '<div class="comp-metric"><span class="key">Followers</span><span class="val ' + escBattle(c.followersClass || 'neutral') + '">' + escBattle(c.followers || '—') + '</span></div>' +
      '<div class="comp-metric"><span class="key">Avg. Engagement Rate</span><span class="val ' + escBattle(c.erClass || '') + '">' + metricVal(c.er) + '</span></div>' +
      (c.mix ? '<div class="comp-metric"><span class="key">Content Mix</span><span class="val ' + escBattle(c.mixClass || '') + '">' + metricVal(c.mix) + '</span></div>' : '') +
      '<div class="comp-metric"><span class="key">Your Gap</span><span class="val ' + escBattle(c.gapClass || '') + '">' + escBattle(c.gap) + '</span></div>';
    if (c.dataSource) {
      html += '<div style="margin-top:8px;padding:8px 12px;background:var(--muted);border-radius:4px;font-size:10px;color:var(--muted-foreground);line-height:1.5">&#128218; ' + escBattle(c.dataSource) + '</div>';
    }
    html += '</div>';
  });

  if (data.yourBrand) {
    var yb = data.yourBrand;
    html += '<div class="comp-card">' +
      '<div class="comp-header"><div><div class="comp-name" style="color:var(--primary)">' + escBattle(brandName) + ' (Your Brand)' + confBadge(yb.confidence) + '</div>' +
      '<div style="font-size:13px;color:var(--muted-foreground);margin-top:6px;line-height:1.5">' + escBattle(yb.desc) + '</div></div>' +
      '<div class="comp-badge lagging">Needs Acceleration</div></div>' +
      '<div class="comp-metric"><span class="key">Followers</span><span class="val neutral">' + escBattle(yb.followers || '—') + '</span></div>' +
      '<div class="comp-metric"><span class="key">Avg. Engagement Rate</span><span class="val neutral">' + metricVal(yb.er) + '</span></div>' +
      '<div class="comp-metric"><span class="key">Content Mix</span><span class="val neutral">' + metricVal(yb.mix) + '</span></div>' +
      '<div class="comp-metric"><span class="key">Fynd Studio Potential</span><span class="val good">' + escBattle(yb.potential || '3× growth possible with AI creative acceleration') + '</span></div>' +
    '</div>';
  }
  compGrid.innerHTML = html;
}

function renderMarketTab(data, brandName) {
  var marketTab = document.getElementById('tab-market');
  if (!marketTab || !data.markets) return;

  var mHtml = '<div class="market-capture-grid">';

  // Regional Markets
  mHtml += '<div class="mc-card"><div class="mc-label">' + BATTLE_ICONS.map + ' Untapped Regional Markets</div>';
  (data.markets || []).forEach(function(m) {
    mHtml += '<div class="mc-item"><div class="mc-icon mc-icon-region">' + BATTLE_ICONS.location + '</div>' +
      '<div class="mc-text"><div class="mc-title">' + escBattle(m.title) + confBadge(m.confidence) + '</div>' +
      '<div class="mc-sub">' + escBattle(m.desc) + '</div>' +
      '<div class="mc-opp">' + escBattle(m.opp) + '</div>' +
      (m.source ? '<a href="https://www.google.com/search?q=' + encodeURIComponent(m.source) + '" target="_blank" rel="noopener" style="display:block;font-size:9px;color:var(--muted-foreground);margin-top:4px;text-decoration:none;cursor:pointer" onmouseover="this.style.color=\'var(--primary)\'" onmouseout="this.style.color=\'var(--muted-foreground)\'">&#128218; ' + escBattle(m.source) + ' &#8599;</a>' : '') +
      '</div></div>';
  });
  mHtml += '</div>';

  // Platform Priorities
  mHtml += '<div class="mc-card"><div class="mc-label">' + BATTLE_ICONS.phone + ' Platform Priority Ranking</div>';
  (data.platforms || []).forEach(function(p, i) {
    mHtml += '<div class="mc-item"><div class="mc-icon">' + p.rank + '</div>' +
      '<div class="mc-text"><div class="mc-title">' + escBattle(p.title) + '</div>' +
      '<div class="mc-sub">' + escBattle(p.desc) + '</div>' +
      '<div class="mc-opp">' + escBattle(p.opp) + '</div></div></div>';
  });
  mHtml += '</div>';

  // Seasonal Campaigns
  mHtml += '<div class="mc-card"><div class="mc-label">' + BATTLE_ICONS.calendar + ' Seasonal Campaign Calendar</div>';
  (data.seasonal || []).forEach(function(s) {
    mHtml += '<div class="mc-item"><div class="mc-icon mc-icon-event">' + BATTLE_ICONS.event + '</div>' +
      '<div class="mc-text"><div class="mc-title">' + escBattle(s.title) + '</div>' +
      '<div class="mc-sub">' + escBattle(s.desc) + '</div>' +
      '<div class="mc-opp">' + escBattle(s.opp) + '</div></div></div>';
  });
  mHtml += '</div></div>';

  // Micro-trends
  if (data.trends && data.trends.length) {
    mHtml += '<div style="margin-top:24px;background:var(--card);border:1px solid var(--border);border-radius:12px;overflow:hidden">';
    mHtml += '<div style="padding:24px 24px 0;background:var(--muted);border-bottom:1px solid var(--border)">';
    mHtml += '<div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--primary);font-weight:600;margin-bottom:8px">Emerging Micro-Trends</div>';
    mHtml += '<div style="font-size:16px;color:var(--muted-foreground);margin-bottom:24px">Category-specific signals for ' + escBattle(brandName) + '. Act within 60 days or pay 3\u00d7 more to enter later.</div></div>';
    mHtml += '<div class="micro-trend-grid" style="padding:24px;background:var(--card)">';
    var tagHtml = {
      rising: '<div class="mt-tag rising">\u2191 Rising Fast</div>',
      emerging: '<div class="mt-tag emerging">\u25c6 Emerging</div>',
      urgent: '<div class="mt-tag urgent"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;border:2px solid var(--primary);flex-shrink:0"></span> Act Now</div>'
    };
    data.trends.forEach(function(t) {
      var statDisplay = (t.stat === 'Data unavailable' || !t.stat)
        ? '<span style="color:var(--muted-foreground);font-style:italic">Data unavailable</span>'
        : escBattle(t.stat);
      mHtml += '<div class="mt-card">' + (tagHtml[t.tag] || tagHtml.emerging) +
        '<div class="mt-title">' + escBattle(t.title) + '</div>' +
        '<div class="mt-stat">' + statDisplay + confBadge(t.statConfidence) + '</div>' +
        '<div style="font-size:11px;color:var(--muted-foreground);margin-bottom:8px">' + escBattle(t.statLabel) + '</div>' +
        '<div class="spark-chart">' +
          '<div class="spark-bar" style="height:20%"></div><div class="spark-bar" style="height:35%"></div>' +
          '<div class="spark-bar" style="height:50%"></div><div class="spark-bar" style="height:65%"></div>' +
          '<div class="spark-bar" style="height:75%"></div><div class="spark-bar" style="height:85%"></div>' +
          '<div class="spark-bar" style="height:93%"></div><div class="spark-bar peak" style="height:100%"></div>' +
        '</div>' +
        '<div class="mt-desc">' + escBattle(t.desc) + '</div>' +
        '<div class="mt-action">\u2192 <span>' + escBattle(t.action) + '</span></div>' +
        (t.source ? '<a href="https://www.google.com/search?q=' + encodeURIComponent(t.source) + '" target="_blank" rel="noopener" style="display:block;font-size:9px;color:var(--muted-foreground);margin-top:8px;text-decoration:none;cursor:pointer" onmouseover="this.style.color=\'var(--primary)\'" onmouseout="this.style.color=\'var(--muted-foreground)\'">&#128218; ' + escBattle(t.source) + ' &#8599;</a>' : '') +
        '</div>';
    });
    mHtml += '</div></div>';
  }
  marketTab.innerHTML = mHtml;
}

// ── AI CONCEPTS — Multi-Format Visual Generation ──
// Generates 3 distinct visual types: Lifestyle Photo, Product Photoshoot, Digital Banner

var VISUAL_TYPES = [
  {
    key: 'lifestyle',
    label: 'Lifestyle Photo',
    badgeClass: 'lifestyle',
    aspectClass: 'landscape',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    fallbackGrad: 'linear-gradient(135deg,#09090b,#404040)'
  },
  {
    key: 'product',
    label: 'Product Photoshoot',
    badgeClass: 'product',
    aspectClass: 'square',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
    fallbackGrad: 'linear-gradient(135deg,#09090b,#525252)'
  },
  {
    key: 'social',
    label: 'Social Post',
    badgeClass: 'social',
    aspectClass: 'portrait',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    fallbackGrad: 'linear-gradient(135deg,#09090b,#404040)'
  }
];

// ═══ UNIVERSAL PRODUCT-INTELLIGENT CAMPAIGN PROMPT ═══
// Works for ANY product category: footwear, beverages, electronics, cosmetics, vehicles, etc.
// Forces product classification BEFORE any creative generation.
var CONCEPTS_PROMPT = [
  "You are a commercial creative director working across ALL product categories.",
  "You will receive: brand name, product category, and website data.",
  "Your job: UNDERSTAND the product first, then generate a campaign concept with 3 visual assets.",
  "",
  "STEP 1 — PRODUCT UNDERSTANDING (mandatory):",
  "Analyze the product deeply. The productContext object is REQUIRED.",
  "- type: specific product (e.g. 'lightweight mesh running sneaker', 'cold-pressed juice 250ml', 'wireless earbuds', 'anti-aging serum dropper bottle')",
  "- category: footwear | beverage | electronics | cosmetics | apparel | luggage | home-goods | automobile | food | personal-care",
  "- useCase: athletic | casual-daily | professional | cooking | skincare | commuting | entertainment | outdoor | travel",
  "- appropriateScenes: 4 SPECIFIC environments where this product naturally appears",
  "- inappropriateScenes: 4 environments that would look forced for this product",
  "- sourceAngle: typical product photo angle (side-profile | front-facing | 3/4-view | top-down)",
  "- positioning: premium | mass-market | luxury | functional | aspirational",
  "",
  "STEP 2 — SCENE RULES FOR LIFESTYLE:",
  "The scene MUST match the product's actual use context:",
  "  Footwear: running→trail/park, casual→sidewalk/café, formal→office/dinner. NEVER indoors on carpet.",
  "  Beverages: energy→gym/sports, juice→kitchen/picnic, premium→executive/spa. NEVER formal office.",
  "  Electronics: headphones→commute/desk, phone→café/street. NEVER swimming pool.",
  "  Cosmetics: skincare→bathroom/vanity, makeup→mirror/prep. NEVER gym.",
  "  NEVER force festive/cultural themes unless the product genuinely fits.",
  "  When uncertain, choose SAFE and NEUTRAL over bold and wrong.",
  "",
  "STEP 3 — PRODUCT PHOTOSHOOT RULES:",
  "- Preserve the SAME viewing angle as the source image",
  "- Do NOT rotate, flip, or reveal unseen surfaces",
  "- Enhance ONLY with: lighting, backdrop, shadows, reflections",
  "- Do NOT invent structural details not visible in the source",
  "",
  "STEP 4 — SOCIAL POST RULES:",
  "The social post is a 3:4 portrait format designed for Instagram/social media:",
  "- Product naturally integrated into an aspirational lifestyle scene",
  "- The product must be the hero — prominent, well-lit, clearly visible",
  "- Scene should feel like a premium brand's Instagram post",
  "- Aspirational but realistic — commercially usable",
  "- Clean composition suitable for social media feed",
  "- NO text, NO typography, NO brand name, NO watermarks in the image",
  "",
  "STEP 5 — COLOR RULE:",
  "For lifestyle and product shots: NEVER specify the product color.",
  "Write: 'the exact product matching the reference image in color, shape, and design'.",
  "For banner: describe the product generally since OpenAI generates the complete banner.",
  "",
  "OUTPUT FORMAT — valid JSON only, no markdown, no backticks:",
  "{",
  "  \"productContext\": {",
  "    \"type\": \"<specific product>\",",
  "    \"category\": \"<broad category>\",",
  "    \"useCase\": \"<primary use context>\",",
  "    \"appropriateScenes\": [\"scene1\", \"scene2\", \"scene3\", \"scene4\"],",
  "    \"inappropriateScenes\": [\"scene1\", \"scene2\", \"scene3\", \"scene4\"],",
  "    \"sourceAngle\": \"<viewing angle>\",",
  "    \"positioning\": \"<market positioning>\"",
  "  },",
  "  \"campaign\": {",
  "    \"title\": \"Campaign Name\",",
  "    \"subtitle\": \"BRAND x THEME\",",
  "    \"desc\": \"2-3 sentence campaign description\",",
  "    \"tags\": [\"tag1\", \"tag2\", \"tag3\"]",
  "  },",
  "  \"visuals\": [",
  "    {",
  "      \"type\": \"lifestyle\",",
  "      \"title\": \"Short title\",",
  "      \"desc\": \"1-sentence description\",",
  "      \"imagePrompt\": \"<Realistic scene from appropriateScenes. Person naturally using the exact product from the reference image. Describe environment, lighting, mood. Product clearly visible. Photorealistic, 16:9. No text, no logos.>\"",
  "    },",
  "    {",
  "      \"type\": \"product\",",
  "      \"title\": \"Short title\",",
  "      \"desc\": \"1-sentence description\",",
  "      \"imagePrompt\": \"<Studio shot. Exact product from reference at same angle. Describe surface, lighting, background. Do NOT show unseen surfaces. 1:1 square. No text.>\"",
  "    },",
  "    {",
  "      \"type\": \"social\",",
  "      \"title\": \"Short title\",",
  "      \"desc\": \"1-sentence description\",",
  "      \"imagePrompt\": \"<Premium social media post for [BRAND]. The [product type] from the reference image is the hero, naturally placed in an aspirational lifestyle scene. Product clearly visible and prominent. Beautiful composition suitable for Instagram feed. 3:4 portrait format. Photorealistic, premium lighting. No text, no logos, no watermarks.>\"",
  "    }",
  "  ]",
  "}",
  "",
  "RULES:",
  "- productContext is REQUIRED before any prompts.",
  "- Lifestyle scene from appropriateScenes only.",
  "- Product shot preserves source angle exactly.",
  "- Social post must feel like a premium brand Instagram post — product-first, aspirational.",
  "- For all three types: never specify product color — defer to reference image.",
  "- When uncertain, choose safe and neutral."
].join("\n");

window._conceptsGenerated = false;
window._conceptUploadedFiles = [];
window._conceptLogoFile = null;

var BRAND_CATEGORIES = [
  'Fashion & Apparel',
  'Beauty & Personal Care',
  'Food & Beverages',
  'Health & Wellness',
  'Home & Living',
  'Electronics & Gadgets',
  'Jewellery & Accessories',
  'Footwear',
  'Luggage & Travel',
  'Bags & Backpacks',
  'Kids & Baby',
  'Sports & Fitness',
  'Automobile & Mobility',
  'Pet Care',
  'Stationery & Gifting'
];

function renderConceptsPlaceholder(brandName) {
  var conceptsTab = document.getElementById('tab-concepts');
  if (!conceptsTab) return;

  // Category for visual generation should come from Creative Intel (brandContext.category),
  // not a user dropdown.
  var defaultCategory = (brandContext.category && BRAND_CATEGORIES.indexOf(brandContext.category) !== -1)
    ? brandContext.category
    : BRAND_CATEGORIES[0];
  brandContext.category = defaultCategory;

  var slots = '';
  for (var i = 0; i < 5; i++) {
    slots +=
      '<div class="cu-slot" id="cuSlot' + i + '" onclick="document.getElementById(\'cuFile' + i + '\').click()">' +
        '<input type="file" id="cuFile' + i + '" accept="image/*" style="display:none" onchange="handleProductImageSelect(' + i + ',this)">' +
        '<div class="cu-slot-empty" id="cuEmpty' + i + '">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
          '<span>' + (i === 0 ? 'Required' : 'Optional') + '</span>' +
        '</div>' +
        '<div class="cu-slot-preview" id="cuPreview' + i + '" style="display:none">' +
          '<img id="cuImg' + i + '">' +
          '<button class="cu-remove" onclick="event.stopPropagation();removeProductImage(' + i + ')" title="Remove">&times;</button>' +
        '</div>' +
      '</div>';
  }

  conceptsTab.innerHTML =
    '<style>' +
      '.cu-form{background:var(--card);border:1px solid var(--border);border-radius:var(--card-radius);padding:40px;max-width:720px;margin:0 auto}' +
      '.cu-title{font-family:var(--font-heading);font-size:24px;font-weight:500;color:var(--foreground);margin-bottom:4px}' +
      '.cu-sub{font-size:14px;color:var(--muted-foreground);margin-bottom:32px;line-height:1.6}' +
      '.cu-field{margin-bottom:28px}' +
      '.cu-label{font-family:var(--font-ui);font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:var(--muted-foreground);margin-bottom:12px;display:flex;align-items:center;gap:6px}' +
      '.cu-label .cu-req{color:var(--destructive,#c13515);font-size:10px}' +
      '.cu-grid{display:flex;gap:12px;flex-wrap:wrap}' +
      '.cu-slot{width:120px;height:120px;border:2px dashed var(--border);border-radius:var(--card-radius);cursor:pointer;position:relative;overflow:hidden;transition:border-color 0.2s,background 0.2s;background:var(--background)}' +
      '.cu-slot:hover{border-color:var(--muted-foreground);background:var(--hover,rgba(0,0,0,0.02))}' +
      '.cu-slot.filled{border-style:solid;border-color:var(--border)}' +
      '.cu-slot-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:6px;color:var(--muted-foreground)}' +
      '.cu-slot-empty span{font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:0.04em}' +
      '.cu-slot-preview{position:absolute;inset:0}' +
      '.cu-slot-preview img{width:100%;height:100%;object-fit:cover}' +
      '.cu-remove{position:absolute;top:4px;right:4px;width:22px;height:22px;border-radius:50%;background:rgba(0,0,0,0.7);color:white;border:none;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;transition:background 0.15s}' +
      '.cu-remove:hover{background:rgba(0,0,0,0.9)}' +
      '.cu-logo-slot{width:80px;height:80px}' +
      '.cu-select{width:100%;max-width:320px;padding:10px 14px;border:1px solid var(--input,var(--border));border-radius:var(--input-radius,8px);background:var(--background);color:var(--foreground);font-family:var(--font-ui);font-size:14px;outline:none;transition:border-color 0.2s}' +
      '.cu-select:focus{border-color:var(--ring,var(--primary))}' +
      '.cu-generate{display:inline-flex;align-items:center;gap:8px;background:var(--primary);color:var(--primary-foreground);border:none;padding:12px 32px;border-radius:var(--btn-radius,250px);font-family:var(--font-ui);font-size:14px;font-weight:600;cursor:pointer;transition:opacity 0.15s;margin-top:8px}' +
      '.cu-generate:hover:not(:disabled){opacity:0.9}' +
      '.cu-generate:disabled{opacity:0.4;cursor:not-allowed}' +
      '.cu-hint{font-size:11px;color:var(--muted-foreground);margin-top:6px}' +
      '.cu-count{font-family:var(--font-ui);font-size:11px;font-weight:600;color:var(--muted-foreground);margin-left:auto}' +
    '</style>' +
    '<div id="conceptsGenerateView">' +
      '<div class="cu-form">' +
        '<div class="cu-title">AI Campaign Visuals</div>' +
        '<div class="cu-sub">Upload your product images and we\'ll generate three campaign assets — a <strong style="color:var(--foreground)">Lifestyle Photo</strong>, <strong style="color:var(--foreground)">Product Photoshoot</strong>, and <strong style="color:var(--foreground)">Digital Banner</strong>.</div>' +

        '<div class="cu-field">' +
          '<div class="cu-label">Product Images <span class="cu-req">*</span> <span class="cu-count" id="cuCount">0 / 5</span></div>' +
          '<div class="cu-grid">' + slots + '</div>' +
          '<div class="cu-hint">Upload at least 1 product image (max 5). These will be used as visual reference for AI generation.</div>' +
        '</div>' +

        '<div class="cu-field">' +
          '<div class="cu-label">Brand Logo <span style="font-size:10px;font-weight:400;text-transform:none;letter-spacing:0">(optional)</span></div>' +
          '<div class="cu-grid">' +
            '<div class="cu-slot cu-logo-slot" id="cuLogoSlot" onclick="document.getElementById(\'cuLogoFile\').click()">' +
              '<input type="file" id="cuLogoFile" accept="image/*" style="display:none" onchange="handleLogoSelect(this)">' +
              '<div class="cu-slot-empty" id="cuLogoEmpty">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>' +
                '<span>Logo</span>' +
              '</div>' +
              '<div class="cu-slot-preview" id="cuLogoPreview" style="display:none">' +
                '<img id="cuLogoImg">' +
                '<button class="cu-remove" onclick="event.stopPropagation();removeLogo()" title="Remove">&times;</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="cu-field">' +
          '<div class="cu-label">Brand Category</div>' +
          '<div class="cu-hint" style="margin-top:-2px" id="cuCategoryLabel">' + escBattle(defaultCategory) + '</div>' +
          '<input type="hidden" id="cuCategory" value="' + escBattle(defaultCategory) + '" />' +
        '</div>' +

        '<button class="cu-generate" id="cuGenerateBtn" disabled onclick="uploadAndLaunchConcepts()">' +
          'Generate AI Visuals' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div id="conceptsContent" style="display:none"></div>';
}

function handleProductImageSelect(index, input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 10 * 1024 * 1024) {
    showToast('error', 'File too large', 'Max 10MB per image.');
    input.value = '';
    return;
  }
  window._conceptUploadedFiles[index] = file;
  // Store first product image as data URL for banner compositing
  if (!window._productImageDataUrls) window._productImageDataUrls = [];
  var reader2 = new FileReader();
  reader2.onload = function(e) { window._productImageDataUrls[index] = e.target.result; };
  reader2.readAsDataURL(file);

  var slot = document.getElementById('cuSlot' + index);
  var empty = document.getElementById('cuEmpty' + index);
  var preview = document.getElementById('cuPreview' + index);
  var img = document.getElementById('cuImg' + index);
  img.src = URL.createObjectURL(file);
  empty.style.display = 'none';
  preview.style.display = 'block';
  slot.classList.add('filled');
  validateConceptForm();
}

function removeProductImage(index) {
  window._conceptUploadedFiles[index] = null;
  var input = document.getElementById('cuFile' + index);
  if (input) input.value = '';
  var slot = document.getElementById('cuSlot' + index);
  var empty = document.getElementById('cuEmpty' + index);
  var preview = document.getElementById('cuPreview' + index);
  var img = document.getElementById('cuImg' + index);
  if (img && img.src) URL.revokeObjectURL(img.src);
  if (img) img.src = '';
  if (empty) empty.style.display = '';
  if (preview) preview.style.display = 'none';
  if (slot) slot.classList.remove('filled');
  validateConceptForm();
}

function handleLogoSelect(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 10 * 1024 * 1024) {
    showToast('error', 'File too large', 'Max 10MB.');
    input.value = '';
    return;
  }
  window._conceptLogoFile = file;
  // Store logo as data URL for banner compositing
  var reader = new FileReader();
  reader.onload = function(e) { window._conceptLogoDataUrl = e.target.result; };
  reader.readAsDataURL(file);

  var slot = document.getElementById('cuLogoSlot');
  var empty = document.getElementById('cuLogoEmpty');
  var preview = document.getElementById('cuLogoPreview');
  var img = document.getElementById('cuLogoImg');
  img.src = URL.createObjectURL(file);
  empty.style.display = 'none';
  preview.style.display = 'block';
  slot.classList.add('filled');
}

function removeLogo() {
  window._conceptLogoFile = null;
  var input = document.getElementById('cuLogoFile');
  if (input) input.value = '';
  var slot = document.getElementById('cuLogoSlot');
  var empty = document.getElementById('cuLogoEmpty');
  var preview = document.getElementById('cuLogoPreview');
  var img = document.getElementById('cuLogoImg');
  if (img && img.src) URL.revokeObjectURL(img.src);
  if (img) img.src = '';
  if (empty) empty.style.display = '';
  if (preview) preview.style.display = 'none';
  if (slot) slot.classList.remove('filled');
}

function validateConceptForm() {
  var hasImage = window._conceptUploadedFiles.some(function(f) { return f != null; });
  var category = document.getElementById('cuCategory');
  var hasCategory = category && category.value;
  var btn = document.getElementById('cuGenerateBtn');
  if (btn) btn.disabled = !(hasImage && hasCategory);
  var count = window._conceptUploadedFiles.filter(function(f) { return f != null; }).length;
  var countEl = document.getElementById('cuCount');
  if (countEl) countEl.textContent = count + ' / 5';
}

async function uploadAndLaunchConcepts() {
  var files = window._conceptUploadedFiles.filter(function(f) { return f != null; });
  if (files.length === 0) {
    showToast('error', 'No images', 'Upload at least 1 product image.');
    return;
  }
  var category = document.getElementById('cuCategory');
  if (!category || !category.value) {
    showToast('error', 'Category required', 'Select a brand category.');
    return;
  }

  // Set brand context category
  brandContext.category = category.value;

  // Demo mode — skip upload, use placeholders
  if (typeof USE_DUMMY_DATA !== 'undefined' && USE_DUMMY_DATA) {
    window._battleProductImages = files.map(function(f) {
      return URL.createObjectURL(f);
    });
    launchConceptsGeneration();
    return;
  }

  // Live mode — upload images to server, get URLs
  var btn = document.getElementById('cuGenerateBtn');
  var generateView = document.getElementById('conceptsGenerateView');

  // Show full-screen generating state over the form
  if (generateView) {
    generateView.innerHTML =
      '<div style="padding:80px 40px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:400px">' +
        '<div style="position:relative;width:56px;height:56px;margin-bottom:32px">' +
          '<div style="position:absolute;inset:0;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 1s linear infinite"></div>' +
          '<div style="position:absolute;inset:6px;border:3px solid var(--border);border-bottom-color:var(--signal, #10b981);border-radius:50%;animation:spin 1.5s linear infinite reverse"></div>' +
        '</div>' +
        '<div style="font-size:20px;font-weight:600;color:var(--foreground);margin-bottom:8px">Generating Campaign Visuals</div>' +
        '<div style="font-size:14px;color:var(--muted-foreground);margin-bottom:32px">for ' + escBattle(brandContext.name || 'your brand') + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:12px;width:280px;text-align:left">' +
          '<div class="gen-step active" id="genStep1" style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--foreground);transition:opacity 0.3s">' +
            '<div style="width:8px;height:8px;border-radius:50%;background:var(--primary);animation:lstep-pulse 1.2s ease-in-out infinite;flex-shrink:0"></div>' +
            'Uploading product images<span class="ldots" style="letter-spacing:2px;margin-left:2px;min-width:18px"></span>' +
          '</div>' +
          '<div class="gen-step" id="genStep2" style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted-foreground);opacity:0.4;transition:opacity 0.3s">' +
            '<div style="width:8px;height:8px;border-radius:50%;background:var(--border);flex-shrink:0"></div>' +
            'Creating lifestyle photo' +
          '</div>' +
          '<div class="gen-step" id="genStep3" style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted-foreground);opacity:0.4;transition:opacity 0.3s">' +
            '<div style="width:8px;height:8px;border-radius:50%;background:var(--border);flex-shrink:0"></div>' +
            'Generating product photoshoot' +
          '</div>' +
          '<div class="gen-step" id="genStep4" style="display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted-foreground);opacity:0.4;transition:opacity 0.3s">' +
            '<div style="width:8px;height:8px;border-radius:50%;background:var(--border);flex-shrink:0"></div>' +
            'Designing digital banner' +
          '</div>' +
        '</div>' +
        '<div style="font-size:11px;color:var(--muted-foreground);margin-top:32px;opacity:0.6">This typically takes 30–60 seconds</div>' +
      '</div>';
  }

  // Animate dots on active step
  var _genDotsTimer = setInterval(function() {
    var active = document.querySelector('.gen-step.active .ldots');
    if (!active) return;
    var dots = (active.textContent.length % 3) + 1;
    active.textContent = '.'.repeat(dots);
  }, 400);

  function advanceGenStep(stepNum) {
    for (var i = 1; i <= 4; i++) {
      var el = document.getElementById('genStep' + i);
      if (!el) continue;
      if (i < stepNum) {
        el.className = 'gen-step done';
        el.style.opacity = '0.6';
        el.style.color = 'var(--muted-foreground)';
        el.querySelector('div').style.background = 'var(--primary)';
        var ld = el.querySelector('.ldots');
        if (ld) ld.remove();
      } else if (i === stepNum) {
        el.className = 'gen-step active';
        el.style.opacity = '1';
        el.style.color = 'var(--foreground)';
        el.querySelector('div').style.background = 'var(--primary)';
        el.querySelector('div').style.animation = 'lstep-pulse 1.2s ease-in-out infinite';
        if (!el.querySelector('.ldots')) {
          var span = document.createElement('span');
          span.className = 'ldots';
          span.style.cssText = 'letter-spacing:2px;margin-left:2px;min-width:18px';
          el.appendChild(span);
        }
      }
    }
  }

  try {
    var formData = new FormData();
    files.forEach(function(f, i) {
      formData.append('product_' + i, f);
    });
    if (window._conceptLogoFile) {
      formData.append('logo', window._conceptLogoFile);
    }

    var res = await fetch('/api/upload-temp', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      var errData = await res.json().catch(function() { return {}; });
      throw new Error(errData.error || 'Upload failed');
    }

    var data = await res.json();
    if (!data.urls || !data.urls.length) {
      throw new Error('No URLs returned from upload');
    }

    // Store uploaded URLs as reference images for FAL
    // URLs are now full FAL storage URLs (not local /uploads/ paths)
    window._battleProductImages = data.urls;

    advanceGenStep(2);
    window._advanceGenStep = advanceGenStep;
    window._clearGenDots = function() { clearInterval(_genDotsTimer); };
    launchConceptsGeneration();

  } catch(err) {
    clearInterval(_genDotsTimer);
    showToast('error', 'Upload failed', err.message);
    // Reload the form view
    location.reload();
  }
}

async function launchConceptsGeneration() {
  var brandName = window._battleBrand || brandContext.name;
  var category = brandContext.category || 'D2C / E-Commerce';
  var segment = brandContext.segment || 'Premium Mid-Market';

  var generateView = document.getElementById('conceptsGenerateView');
  var contentView = document.getElementById('conceptsContent');

  // If contentView was destroyed (e.g. innerHTML replacement), recreate it
  if (!contentView) {
    var parent = generateView ? generateView.parentElement : document.getElementById('tab-concepts');
    if (parent) {
      contentView = document.createElement('div');
      contentView.id = 'conceptsContent';
      contentView.style.display = 'none';
      parent.appendChild(contentView);
    }
  }
  if (!contentView) return;

  // Show a loading spinner while OpenAI generates the concept
  if (generateView) generateView.style.display = 'none';
  contentView.style.display = 'block';
  contentView.innerHTML =
    '<div style="padding:80px 40px;text-align:center">' +
      '<div class="spinner" style="display:inline-block;width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:24px"></div>' +
      '<div style="font-size:16px;color:var(--muted-foreground)">Generating campaign visuals for ' + escBattle(brandName) + '...</div>' +
      '<div style="font-size:12px;color:var(--muted-foreground);margin-top:8px">Creating lifestyle photo, product shot & banner \u2014 this takes 30-60 seconds</div>' +
    '</div>';

  // Build prompt with brand context
  // The selected category from the upload form is the most reliable signal for product type
  var selectedCategory = document.getElementById('cuCategory');
  var uploadCategory = selectedCategory ? selectedCategory.value : category;

  var userPrompt = 'Brand: ' + brandName + '\nCategory: ' + (uploadCategory || category) + '\nMarket Segment: ' + segment;

  // CRITICAL: Tell OpenAI exactly what product was uploaded
  var catLabel = uploadCategory || category;
  userPrompt += '\n\n═══ UPLOADED PRODUCT (this overrides everything) ═══';
  userPrompt += '\nThe user uploaded a product image in the category: "' + catLabel + '".';
  userPrompt += '\nALL three visuals MUST feature ONLY this product type. No exceptions.';
  userPrompt += '\n';
  userPrompt += '\nCategory → product mapping (use this to determine what the uploaded product is):';
  userPrompt += '\n  "Food & Beverages" → a food/drink item (bottle, can, packet, snack). NOT clothing.';
  userPrompt += '\n  "Footwear" → a shoe, sneaker, sandal, slipper. NOT a bag or shirt.';
  userPrompt += '\n  "Luggage & Travel" → a suitcase, trolley, travel bag. NOT a vase or home decor.';
  userPrompt += '\n  "Bags & Backpacks" → a bag, backpack, handbag, purse. NOT luggage or clothing.';
  userPrompt += '\n  "Fashion & Apparel" → clothing (shirt, dress, kurta, jacket). NOT accessories.';
  userPrompt += '\n  "Beauty & Personal Care" → skincare, makeup, grooming product. NOT clothing.';
  userPrompt += '\n  "Electronics & Gadgets" → phone, headphone, smartwatch, speaker. NOT furniture.';
  userPrompt += '\n  "Home & Living" → furniture, decor, kitchenware, home textile. NOT luggage.';
  userPrompt += '\n  "Sports & Fitness" → equipment, activewear, gym gear. NOT casual fashion.';
  userPrompt += '\n  "Automobile & Mobility" → vehicle, scooter, bike, car accessory.';
  userPrompt += '\n';
  userPrompt += '\nThe uploaded product is a "' + catLabel + '" item. Use the mapping above to determine what it is.';
  userPrompt += '\nDo NOT feature any other product type even if the brand website shows multiple categories.';
  userPrompt += '\nThe reference image is the source of truth for product appearance.';

  var siteContent = window._battleSiteContent;
  if (siteContent) {
    userPrompt += '\n\n--- BRAND WEBSITE DATA (for brand understanding only) ---\n' + siteContent + '\n--- END ---';
    userPrompt += '\nUse the website data to understand the brand\'s positioning and tone. But the UPLOADED PRODUCT IMAGE determines what product to feature — NOT the website catalog.';
  }

  // Pass brand intel from Creative Intel audit (if available)
  var auditData = window.lastAnalysisData;
  if (auditData) {
    userPrompt += '\n\n═══ BRAND INTELLIGENCE (from Creative Intel audit) ═══';
    if (auditData.brandProfile && Array.isArray(auditData.brandProfile)) {
      auditData.brandProfile.forEach(function(item) {
        if (item.label && item.value) {
          userPrompt += '\n' + item.label + ': ' + item.value;
        }
      });
    }
    if (auditData.topInsight) {
      userPrompt += '\nKey Insight: ' + auditData.topInsight;
    }
    if (auditData.overallGrade) {
      userPrompt += '\nBrand Grade: ' + auditData.overallGrade;
    }
    userPrompt += '\nUse this brand intelligence to make the campaign contextually relevant — match the brand\'s positioning, audience, and tone.';
  }

  userPrompt += '\n\nGenerate a campaign concept with three visual assets. Every visual MUST feature the uploaded ' + (uploadCategory || category) + ' product. Never substitute with a different product type.';

  try {
    var rawText = await callClaude(CONCEPTS_PROMPT, userPrompt, 3000);
    var cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    var conceptsData = JSON.parse(cleaned);

    if (!conceptsData.campaign || !conceptsData.visuals || !conceptsData.visuals.length) {
      throw new Error('No campaign visuals returned');
    }

    // Store in battleCardData
    if (!battleCardData) battleCardData = {};
    battleCardData.concepts = conceptsData;
    // Store campaign title for banner compositing
    if (conceptsData.campaign && conceptsData.campaign.title) {
      window._battleCampaignTitle = conceptsData.campaign.title;
    }

    // Clear generating state and switch to content view
    if (typeof window._clearGenDots === 'function') window._clearGenDots();
    var _genView = document.getElementById('conceptsGenerateView');
    if (_genView) _genView.style.display = 'none';
    contentView.style.display = 'block';

    // Render multi-format visual cards
    renderConceptCards(conceptsData, brandName);
    window._conceptsGenerated = true;
    showToast('success', 'Visuals ready!', 'AI campaign visuals generated. Creating images...');

  } catch(err) {
    if (typeof window._clearGenDots === 'function') window._clearGenDots();
    var _genView2 = document.getElementById('conceptsGenerateView');
    if (_genView2) _genView2.style.display = 'none';
    contentView.style.display = 'block';
    contentView.innerHTML =
      '<div style="padding:40px;text-align:center;color:var(--primary)">' +
        '<div style="font-size:16px;margin-bottom:16px">Visual generation failed</div>' +
        '<div style="font-size:13px;color:var(--muted-foreground);margin-bottom:24px">' + escBattle(err.message) + '</div>' +
        '<button class="btn-primary" onclick="launchConceptsGeneration()" style="background:var(--primary);color:var(--primary-foreground);border:none;padding:10px 24px;border-radius:var(--radius-sm);font-family:\'Inter\',system-ui,sans-serif;font-size:13px;font-weight:500;cursor:pointer">Retry</button>' +
      '</div>';
  }
}

function renderConceptCards(conceptsData, brandName) {
  var contentView = document.getElementById('conceptsContent');
  if (!contentView) return;

  var campaign = conceptsData.campaign;
  var visuals = conceptsData.visuals;

  // Campaign header
  var cHtml = '<div style="margin-bottom:24px">' +
    '<div style="font-family:\'Inter\',system-ui,sans-serif;font-size:20px;font-weight:700;color:var(--foreground);margin-bottom:6px">' + escBattle(campaign.title) + '</div>' +
    '<div style="font-size:11px;color:var(--primary);letter-spacing:0.06em;text-transform:uppercase;font-weight:600;margin-bottom:10px">' + escBattle(campaign.subtitle) + '</div>' +
    '<div style="font-size:14px;color:var(--muted-foreground);line-height:1.6;margin-bottom:12px">' + escBattle(campaign.desc) + '</div>' +
    '<div style="display:flex;gap:6px;flex-wrap:wrap">';
  (campaign.tags || []).forEach(function(tag) {
    cHtml += '<span class="ctag">' + escBattle(tag) + '</span>';
  });
  cHtml += '</div></div>';

  // Three visual cards
  cHtml += '<div class="ai-concepts-container">';

  visuals.forEach(function(visual, i) {
    var vType = VISUAL_TYPES.find(function(vt) { return vt.key === visual.type; }) || VISUAL_TYPES[i % 3];

    cHtml += '<div class="ai-concept-card">' +
      '<div class="ai-concept-header">' +
        '<div class="ai-concept-label">' + vType.icon + ' ' + escBattle(vType.label) + '</div>' +
        '<span class="ai-concept-type-badge ' + vType.badgeClass + '">' + vType.key.toUpperCase() + '</span>' +
      '</div>' +
      '<div class="ai-concept-image-wrapper ' + vType.aspectClass + '" id="conceptPreview' + i + '">' +
        '<div class="concept-spinner-wrap">' +
          '<div class="spinner" style="display:inline-block;width:28px;height:28px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite"></div>' +
          '<div class="spinner-label">Generating ' + escBattle(vType.label).toLowerCase() + '...</div>' +
        '</div>' +
      '</div>' +
      '<div class="ai-concept-details">' +
        '<div class="ai-concept-title">' + escBattle(visual.title) + '</div>' +
        '<div class="ai-concept-desc">' + escBattle(visual.desc) + '</div>' +
      '</div>' +
    '</div>';
  });
  cHtml += '</div>';

  // Regenerate button
  cHtml += '<div style="text-align:center;margin-top:24px">' +
    '<button onclick="launchConceptsGeneration()" class="btn-ghost btn-concept-regenerate" style="font-size:12px;padding:8px 20px;letter-spacing:0.04em">Regenerate Visuals</button>' +
  '</div>';

  contentView.innerHTML = cHtml;

  // Re-init scroll reveal
  document.querySelectorAll('#tab-concepts .ai-concept-card').forEach(function(el) {
    el.classList.add('reveal', 'visible');
  });

  // Generate images via PixelBin AI for each visual
  generateConceptImages(visuals, brandName);
}

// ═══ TYPE-SPECIFIC PROMPT BUILDERS ═══
// Each media type has distinct priorities and guardrails.
// Lifestyle + Product → FAL nano-banana-pro (image-to-image with reference)
// Banner → OpenAI image generation (complete ad creative with text)

// LIFESTYLE: Priority = contextual realism
function buildLifestylePrompt(visual, brandName) {
  var parts = [];
  parts.push('CRITICAL: Do NOT render any text, words, letters, logos, watermarks. Pure visual scene only.');

  if (window._battleProductImages && window._battleProductImages.length > 0) {
    parts.push('A reference product image is provided. The product in the scene MUST match the reference image exactly in color, shape, material, and design. Do NOT change the product color.');
  }

  if (visual.imagePrompt) {
    parts.push(visual.imagePrompt);
  } else {
    parts.push('Lifestyle editorial photography for ' + brandName + '. A person naturally using the exact product from the reference image in a realistic, aspirational setting. Photorealistic, 16:9, warm natural lighting.');
  }

  parts.push('Wide-angle cinematic composition, 16:9, shallow depth of field, editorial quality. Product clearly visible and central.');
  return parts.join(' ');
}

// PRODUCT: Priority = geometry fidelity
function buildProductPrompt(visual, brandName) {
  var parts = [];
  parts.push('CRITICAL: Do NOT render any text, words, letters, logos, or watermarks.');

  if (window._battleProductImages && window._battleProductImages.length > 0) {
    parts.push('ABSOLUTE RULE: A reference product image is provided. Preserve the EXACT same viewing angle, color, shape, material, and design. Do NOT rotate. Do NOT show unseen surfaces. ONLY enhance with lighting, backdrop, shadows, reflections. Output = same product in a premium studio, NOT a redesigned product.');
  }

  if (visual.imagePrompt) {
    parts.push(visual.imagePrompt);
  } else {
    parts.push('Premium studio product photography. Same viewing angle as reference. Dark gradient background. Three-point lighting. Subtle shadow and reflection. 1:1 square. High-end e-commerce hero shot.');
  }

  parts.push('Sharp focus, dramatic lighting, 1:1 square. Product identical to reference image.');
  return parts.join(' ');
}

// SOCIAL POST: Priority = aspirational Instagram-style product hero shot (3:4 portrait)
// Uses FAL nano-banana-pro with reference image, same as lifestyle/product
function buildSocialPrompt(visual, brandName) {
  var parts = [];
  parts.push('CRITICAL: Do NOT render any text, words, letters, logos, watermarks. Pure visual scene only.');

  if (window._battleProductImages && window._battleProductImages.length > 0) {
    parts.push('A reference product image is provided. The product MUST match the reference image exactly in color, shape, material, and design. Do NOT change the product color.');
  }

  if (visual.imagePrompt) {
    parts.push(visual.imagePrompt);
  } else {
    parts.push('Premium social media post for ' + brandName + '. The exact product from the reference image is the hero element, naturally placed in an aspirational lifestyle scene. Product clearly visible and prominent. Beautiful composition for Instagram feed. Photorealistic, premium lighting.');
  }

  parts.push('3:4 portrait format. Shallow depth of field. The product is the central focus. Aspirational but commercially usable. No text, no logos.');
  return parts.join(' ');
}

async function generateConceptImages(visuals, brandName) {
  // Run sequentially to avoid PixelBin queue overload (concurrent requests cause timeouts)
  for (var i = 0; i < visuals.length; i++) {
    var vType = VISUAL_TYPES.find(function(vt) { return vt.key === visuals[i].type; }) || VISUAL_TYPES[i % 3];
    await generateSingleConceptImage(visuals[i], brandName, i, vType);
  }
}

async function generateSingleConceptImage(visual, brandName, index, vType) {
  var wrapperEl = document.getElementById('conceptPreview' + index);
  if (!wrapperEl) return;

  try {
    // ═══ ALL 3 TYPES: FAL nano-banana-pro ═══
    // Lifestyle: i2i, landscape 16:9
    // Product: i2i, square 1:1
    // Social: i2i, portrait 3:4
    var prompt;
    if (visual.type === 'product') {
      prompt = buildProductPrompt(visual, brandName);
    } else if (visual.type === 'social') {
      prompt = buildSocialPrompt(visual, brandName);
    } else {
      prompt = buildLifestylePrompt(visual, brandName);
    }

    var imageSizeMap = { lifestyle: 'landscape_16_9', product: 'square', social: 'portrait_4_3' };
    var body = {
      prompt: prompt,
      image_size: imageSizeMap[visual.type] || 'landscape_16_9',
      asset_type: visual.type
    };

    // Pass reference image for FAL i2i generation
    if (window._battleProductImages && window._battleProductImages.length > 0) {
      var imgIdx = index % window._battleProductImages.length;
      body.reference_image = window._battleProductImages[imgIdx];
      console.log('[concept ' + index + '] FAL i2i (' + visual.type + '):', body.reference_image.substring(0, 80));
    }

    // Try up to 2 attempts — auto-retry once on failure
    var imageUrl = null;
    for (var attempt = 1; attempt <= 2; attempt++) {
      try {
        var res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          var errData = await res.json().catch(function() { return {}; });
          console.warn('[concept ' + index + '] FAL attempt ' + attempt + ' failed:', errData.error || res.status);
          if (attempt < 2) continue; // retry
          break;
        }

        var data = await res.json();
        if (!data.image_url) {
          console.warn('[concept ' + index + '] No image_url in attempt ' + attempt);
          if (attempt < 2) continue;
          break;
        }

        // Verify the image actually loads
        var verified = data.image_url.startsWith('data:') ? true : await verifyImageLoads(data.image_url);
        if (!verified) {
          console.warn('[concept ' + index + '] Image failed to load in attempt ' + attempt);
          if (attempt < 2) continue;
          break;
        }

        imageUrl = data.image_url;
        break; // success
      } catch (retryErr) {
        console.warn('[concept ' + index + '] Attempt ' + attempt + ' exception:', retryErr.message);
        if (attempt < 2) continue;
      }
    }

    if (!imageUrl) {
      console.error('[concept ' + index + '] All attempts failed');
      showFallbackConcept(wrapperEl, visual, vType);
      return;
    }

    // Render the generated image
    wrapperEl.innerHTML =
      '<img class="ai-concept-image" src="' + imageUrl + '" ' +
        'alt="' + escBattle(brandName) + ' ' + escBattle(vType.label) + '">' +
      '<div class="ai-concept-badge">AI GENERATED</div>';
    console.log('[concept ' + index + '] Image loaded successfully');

  } catch(err) {
    console.error('[concept ' + index + '] Exception:', err.message);
    showFallbackConcept(wrapperEl, visual, vType);
  }
}

// ═══ BANNER COMPOSITING V2 — Professional marketing layout ═══
// Composites: AI-generated gradient background + actual product image + actual logo + text
// This ensures the banner uses the REAL uploaded product (exact color) and REAL logo.
function compositeBannerV2(bgUrl, logoDataUrl, brandName, headline, subtext) {
  return new Promise(function(resolve, reject) {
    var W = 1200, H = 480;
    var canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');

    // Collect all assets to load in parallel
    var assets = {};
    var toLoad = 1; // background is required
    var loaded = 0;

    var bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    assets.bg = bgImg;

    var prodDataUrls = window._productImageDataUrls || [];
    if (prodDataUrls[0]) {
      toLoad++;
      assets.prod = new Image();
    }
    if (logoDataUrl) {
      toLoad++;
      assets.logo = new Image();
    }

    function onLoad() {
      loaded++;
      if (loaded >= toLoad) compose();
    }

    function compose() {
      // ── 1. BACKGROUND: AI-generated gradient/bokeh ──
      ctx.drawImage(assets.bg, 0, 0, W, H);

      // ── 2. DARK GRADIENT OVERLAY: left side for text readability ──
      var grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, 'rgba(10,10,10,0.92)');
      grad.addColorStop(0.4, 'rgba(10,10,10,0.75)');
      grad.addColorStop(0.6, 'rgba(10,10,10,0.3)');
      grad.addColorStop(1, 'rgba(10,10,10,0.05)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // ── 3. PRODUCT IMAGE: right side, large, with drop shadow ──
      var prod = assets.prod;
      if (prod && prod.naturalWidth > 0) {
        var maxPH = H * 0.75;
        var maxPW = W * 0.38;
        var pScale = Math.min(maxPW / prod.naturalWidth, maxPH / prod.naturalHeight);
        var pw = prod.naturalWidth * pScale;
        var ph = prod.naturalHeight * pScale;
        var px = W - pw - 50;
        var py = (H - ph) / 2;

        // Professional drop shadow
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;
        ctx.drawImage(prod, px, py, pw, ph);

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
      }

      // ── 4. TEXT LAYOUT: left side ──
      var tx = 56; // left margin
      var ty = H * 0.25; // start at 25% from top

      // Logo (if available) — top-left, small
      var logo = assets.logo;
      if (logo && logo.naturalWidth > 0) {
        var logoMaxW = 100;
        var logoMaxH = 36;
        var lScale = Math.min(logoMaxW / logo.naturalWidth, logoMaxH / logo.naturalHeight);
        var lw = logo.naturalWidth * lScale;
        var lh = logo.naturalHeight * lScale;
        ctx.drawImage(logo, tx, ty - 8, lw, lh);
        ty += lh + 20; // push text below logo
      }

      // Brand name — large bold uppercase
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 44px Inter, system-ui, sans-serif';
      ctx.fillText(brandName.toUpperCase(), tx, ty);
      ty += 14;

      // Campaign headline — medium weight
      ctx.font = '400 20px Inter, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      // Word-wrap headline if too long
      var words = (headline || '').split(' ');
      var line = '';
      var lineH = 28;
      for (var wi = 0; wi < words.length; wi++) {
        var test = line + (line ? ' ' : '') + words[wi];
        if (ctx.measureText(test).width > W * 0.4) {
          ty += lineH;
          ctx.fillText(line, tx, ty);
          line = words[wi];
        } else {
          line = test;
        }
      }
      if (line) { ty += lineH; ctx.fillText(line, tx, ty); }

      // Subtext — lighter
      if (subtext) {
        ty += 24;
        ctx.font = '300 14px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(subtext, tx, ty);
      }

      // Divider line
      ty += 20;
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + 160, ty);
      ctx.stroke();

      // CTA
      ty += 24;
      ctx.font = '600 12px Inter, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.letterSpacing = '0.08em';
      ctx.fillText('SHOP NOW  \u2192', tx, ty);

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    }

    // Start loading assets
    bgImg.onload = onLoad;
    bgImg.onerror = function() { reject(new Error('Failed to load banner background')); };
    bgImg.src = bgUrl;

    if (assets.prod) {
      assets.prod.onload = onLoad;
      assets.prod.onerror = onLoad; // proceed without product if it fails
      assets.prod.src = prodDataUrls[0];
    }
    if (assets.logo) {
      assets.logo.onload = onLoad;
      assets.logo.onerror = onLoad; // proceed without logo if it fails
      assets.logo.src = logoDataUrl;
    }
  });
}

// Preload an image and verify it actually renders (not broken/blocked)
function verifyImageLoads(url) {
  return new Promise(function(resolve) {
    var img = new Image();
    var timeout = setTimeout(function() { resolve(false); }, 15000);
    img.onload = function() {
      clearTimeout(timeout);
      // Check it's a real image (not a 1x1 pixel or empty)
      resolve(img.naturalWidth > 10 && img.naturalHeight > 10);
    };
    img.onerror = function() {
      clearTimeout(timeout);
      resolve(false);
    };
    img.src = url;
  });
}

function showFallbackConcept(wrapperEl, visual, vType) {
  var label = vType ? vType.label : 'Visual';
  wrapperEl.innerHTML =
    '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 16px;background:var(--muted);border-radius:8px;min-height:180px;text-align:center">' +
      '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" stroke-width="1.5" stroke-linecap="round" style="margin-bottom:12px;opacity:0.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>' +
      '<div style="font-size:13px;color:var(--muted-foreground);margin-bottom:8px">' + escBattle(label) + ' generation failed</div>' +
      '<button onclick="launchConceptsGeneration()" style="font-size:11px;padding:6px 16px;background:var(--primary);color:var(--primary-foreground);border:none;border-radius:6px;cursor:pointer;font-family:Inter,system-ui,sans-serif">Retry</button>' +
    '</div>';
}

// ── OGILVY STRATEGY — Separate generation, triggered after email unlock ──
var OGILVY_PROMPT = [
  "You are an expert Indian ad strategist trained in the Piyush Pandey–Ogilvy India method.",
  "Generate a complete campaign strategy for the given brand.",
  "",
  "Respond ONLY with valid JSON. No markdown. No backticks.",
  "",
  "JSON structure:",
  "{",
  "  \"categoryLabel\":\"Category\",\"slogan\":\"Brand slogan\",",
  "  \"sloganTranslation\":\"English translation if non-English, else empty\",",
  "  \"sloganExplain\":\"2-3 sentences on why this slogan works\",",
  "  \"productTruth\":\"1 sentence — what the brand actually delivers\",",
  "  \"humanEmotion\":\"1 sentence — the feeling the brand taps into\",",
  "  \"themes\":[{\"name\":\"Theme Name\",\"sub\":\"Subtitle\",\"desc\":\"3-4 sentences\"}],",
  "  \"stories\":[{\"themeTag\":\"Theme 01\",\"title\":\"Story Title\",",
  "    \"acts\":[{\"label\":\"Act 1 . 0-7s\",\"desc\":\"Scene\"},{\"label\":\"Act 2 . 8-22s\",\"desc\":\"Scene\"},{\"label\":\"Act 3 . 23-30s\",\"desc\":\"Scene\"}]}],",
  "  \"pitfalls\":[\"<strong>Title.</strong> Explanation.\"]",
  "}",
  "",
  "Counts: 3 themes, 2 stories, 3 pitfalls.",
  "All India-specific. Ground everything in the brand's actual products."
].join("\n");

window._ogilviGenerated = false;

async function generateOgilvyStrategy() {
  var brandName = window._battleBrand || brandContext.name;
  var category = brandContext.category || 'D2C / E-Commerce';
  var segment = brandContext.segment || 'Premium Mid-Market';

  // Show loading state in strategy content area
  var stratContent = document.getElementById('strategyContent');
  if (stratContent) {
    stratContent.innerHTML = '<div style="padding:80px 40px;text-align:center">' +
      '<div class="spinner" style="display:inline-block;width:32px;height:32px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite;margin-bottom:24px"></div>' +
      '<div style="font-size:16px;color:var(--muted-foreground)">Generating Ogilvy campaign strategy for ' + escBattle(brandName) + '...</div>' +
      '<div style="font-size:12px;color:var(--muted-foreground);margin-top:8px">This takes 15-30 seconds</div></div>';
    stratContent.style.display = 'block';
  }

  var userPrompt = 'Brand: ' + brandName + '\nCategory: ' + category + '\nMarket Segment: ' + segment;

  // Include website content if available
  var siteContent = window._battleSiteContent;
  if (siteContent) {
    userPrompt += '\n\n--- BRAND WEBSITE DATA ---\n' + siteContent + '\n--- END ---';
    userPrompt += '\nGround the strategy in the brand\'s actual products, positioning, and pricing from the website data above.';
  }

  // Include battle card insights if available
  if (battleCardData) {
    if (battleCardData.competitors) {
      userPrompt += '\n\nKey competitors: ' + battleCardData.competitors.map(function(c) { return c.name; }).join(', ');
    }
    if (battleCardData.trends) {
      userPrompt += '\nTrending: ' + battleCardData.trends.map(function(t) { return t.title; }).join(', ');
    }
  }

  userPrompt += '\n\nGenerate a complete Ogilvy-style campaign strategy. The slogan must be memorable and culturally relevant to India.';

  try {
    var strategyData;
    if (typeof USE_DUMMY_DATA !== 'undefined' && USE_DUMMY_DATA) {
      // Dummy strategy — no API call
      await new Promise(function(r) { setTimeout(r, 800); });
      strategyData = {
        slogan: 'Be The Exception.',
        sloganTranslation: 'Apna Style, Apna Rule.',
        sloganExplain: 'Positions the brand as the choice for those who refuse to blend in — turning everyday rebellion into a badge of honour.',
        productTruth: 'Streetwear that doesn\'t apologise for standing out.',
        humanEmotion: 'The thrill of being unapologetically yourself.',
        categoryLabel: 'Youth Fashion & Streetwear',
        themes: [
          { name: 'The Outsider\'s Uniform', sub: 'Streetwear as identity', desc: 'Every outsider eventually becomes the trendsetter. This theme celebrates those who dress for themselves, not for validation.' },
          { name: 'Festival Remix', sub: 'Tradition meets rebellion', desc: 'Take traditional Indian festival moments and remix them through a Gen-Z streetwear lens. Diwali in oversized hoodies. Holi in graphic tees.' },
          { name: 'City After Dark', sub: 'Urban nightlife fashion', desc: 'The city transforms after sunset. So does your wardrobe. Capture the energy of India\'s late-night culture.' }
        ],
        stories: [
          { themeTag: 'The Outsider\'s Uniform', title: 'The Interview', acts: [
            { act: 1, text: 'A young woman walks into a corporate office for an interview. Everyone is in formal wear.' },
            { act: 2, text: 'She hesitates at the door, looks down at her graphic tee and sneakers. The receptionist gives a disapproving look.' },
            { act: 3, text: 'She walks in anyway, confident. The CEO — wearing the same brand — smiles. Slogan fades in.' }
          ]},
          { themeTag: 'Festival Remix', title: 'Diwali Drop', acts: [
            { act: 1, text: 'A family gathers for Diwali. Everyone is in traditional kurtas. A college-age son arrives late.' },
            { act: 2, text: 'Grandmother frowns at his oversized hoodie. Awkward silence. He starts helping with rangoli — his hoodie sleeves pushed up.' },
            { act: 3, text: 'Grandmother smiles, adjusts his hoodie collar proudly. The hoodie has a subtle diya print. Brand logo appears.' }
          ]}
        ]
      };
    } else {
      var rawText = await callClaude(OGILVY_PROMPT, userPrompt, 4000);
      var cleaned = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      strategyData = JSON.parse(cleaned);
    }

    // Merge into battleCardData for rendering
    if (!battleCardData) battleCardData = {};
    battleCardData.strategy = strategyData;

    renderStrategyTab(battleCardData, brandName, category);
    window._ogilviGenerated = true;
    showToast('success', 'Strategy ready!', 'Ogilvy-style campaign strategy generated for ' + brandName + '.');
  } catch(err) {
    if (stratContent) {
      stratContent.innerHTML = '<div style="padding:40px;text-align:center;color:var(--primary)">' +
        '<div style="font-size:16px;margin-bottom:16px">Strategy generation failed</div>' +
        '<div style="font-size:13px;color:var(--muted-foreground);margin-bottom:24px">' + escBattle(err.message) + '</div>' +
        '<button class="btn-primary" onclick="generateOgilvyStrategy()">Retry</button></div>';
    }
  }
}

function renderStrategyTab(data, brandName, category) {
  var stratContent = document.getElementById('strategyContent');
  if (!stratContent || !data.strategy) return;

  var s = data.strategy;
  var sHtml = '<div class="ogilvy-container">';

  // Header
  sHtml += '<div style="margin-bottom:32px">' +
    '<div style="font-size:8px;letter-spacing:0.14em;text-transform:uppercase;color:var(--primary);font-weight:700;margin-bottom:8px">Ogilvy India Formula \u00b7 ' + escBattle(brandName) + ' \u00b7 ' + escBattle(s.categoryLabel || category) + '</div>' +
    '<div style="font-family:\'Inter\',sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.01em;margin-bottom:8px">AI Campaign Strategy</div>' +
    '<div style="font-size:16px;color:var(--muted-foreground);line-height:1.6">Applies the Piyush Pandey\u2013Ogilvy India method \u2014 ONE product truth, a two-level slogan, 3-act story plots, and campaign themes built to run for 10+ years.</div></div>';

  // Slogan
  sHtml += '<div class="strategy-block"><div class="strategy-block-title">The Slogan</div>' +
    '<div class="slogan-box"><div class="slogan-text">\u201c' + escBattle(s.slogan) + '\u201d</div>';
  if (s.sloganTranslation) {
    sHtml += '<div class="slogan-translation" style="color:var(--primary)">\u201c' + escBattle(s.sloganTranslation) + '\u201d</div>';
  }
  sHtml += '<div class="slogan-explain">' + escBattle(s.sloganExplain) + '</div></div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px">' +
      '<div style="background:var(--muted);border:1px solid var(--border);border-radius:8px;padding:24px">' +
        '<div style="font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted-foreground);margin-bottom:8px">Product Truth</div>' +
        '<div style="font-size:16px;font-weight:500;color:var(--foreground)">' + escBattle(s.productTruth) + '</div></div>' +
      '<div style="background:var(--muted);border:1px solid var(--border);border-radius:8px;padding:24px">' +
        '<div style="font-size:8px;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted-foreground);margin-bottom:8px">Human Emotion</div>' +
        '<div style="font-size:16px;font-weight:500;color:var(--primary)">' + escBattle(s.humanEmotion) + '</div></div>' +
    '</div></div>';

  // Three-Act Formula
  sHtml += '<div class="strategy-block" style="margin-top:8px">' +
    '<div class="strategy-block-title">The Three-Act Formula</div>' +
    '<p style="font-size:16px;color:var(--muted-foreground);margin-bottom:24px;line-height:1.6">The product is never the hero. The <em style="color:var(--foreground)">situation</em> is the hero. The product is the punchline.</p>' +
    '<table class="three-act-table"><thead><tr><th>Act</th><th>Duration</th><th>Purpose &amp; Approach</th><th>Brain Chemistry</th></tr></thead><tbody>' +
      '<tr><td><strong>01</strong></td><td>0\u20137s</td><td>Set up a recognisable social situation. No brand. No product. Just a truth that makes the viewer say \u201cthat\u2019s me.\u201d</td><td>Pattern recognition \u00b7 Dopamine trigger</td></tr>' +
      '<tr><td><strong>02</strong></td><td>8\u201322s</td><td>Escalate the tension. The character faces a choice between conformity and self-expression. Stakes feel real.</td><td>Cortisol + empathy \u00b7 Leaning forward</td></tr>' +
      '<tr><td><strong>03</strong></td><td>23\u201330s</td><td>Character chooses freedom. The ' + escBattle(brandName) + ' product appears naturally \u2014 worn, used, chosen. Slogan fades in. Relief + aspiration.</td><td>Oxytocin + brand encoding</td></tr>' +
    '</tbody></table></div>';

  // Campaign Themes
  if (s.themes && s.themes.length) {
    sHtml += '<div class="strategy-block" style="margin-top:8px"><div class="strategy-block-title">Campaign Themes</div>' +
      '<p style="font-size:16px;color:var(--muted-foreground);margin-bottom:8px;line-height:1.6">Each theme is a well from which dozens of stories can be drawn over 10+ years.</p>' +
      '<div class="themes-grid">';
    s.themes.forEach(function(t, i) {
      sHtml += '<div class="theme-card"><div class="theme-num">0' + (i + 1) + '</div>' +
        '<div class="theme-name">' + escBattle(t.name) + '</div>' +
        '<div class="theme-sub">' + escBattle(t.sub) + '</div>' +
        '<div class="theme-desc">' + escBattle(t.desc) + '</div></div>';
    });
    sHtml += '</div></div>';
  }

  // Story Plots
  if (s.stories && s.stories.length) {
    sHtml += '<div class="strategy-block" style="margin-top:8px"><div class="strategy-block-title">Story Plots</div>' +
      '<p style="font-size:16px;color:var(--muted-foreground);margin-bottom:16px;line-height:1.6">Filmable three-act plots. Product appears only in Act 3 \u2014 maximum 3\u20135 seconds of brand visibility.</p>' +
      '<div class="story-plots">';
    s.stories.forEach(function(story) {
      sHtml += '<div class="story-card"><div class="story-theme-tag">' + escBattle(story.themeTag) + '</div>' +
        '<div class="story-title">' + escBattle(story.title) + '</div><div class="story-acts">';
      (story.acts || []).forEach(function(a) {
        sHtml += '<div class="story-act"><div class="act-label">' + escBattle(a.label) + '</div>' +
          '<div class="act-desc">' + escBattle(a.desc) + '</div></div>';
      });
      sHtml += '</div></div>';
    });
    sHtml += '</div></div>';
  }

  // Pitfalls
  if (s.pitfalls && s.pitfalls.length) {
    sHtml += '<div class="strategy-block" style="margin-top:8px"><div class="strategy-block-title">Common Pitfalls to Avoid</div><div class="pitfalls-grid">';
    s.pitfalls.forEach(function(p) {
      sHtml += '<div class="pitfall-card"><div class="pitfall-icon">' + BATTLE_ICONS.pitfall + '</div><div class="pitfall-text">' + p + '</div></div>';
    });
    sHtml += '</div></div>';
  }

  // CTA buttons
  sHtml += '<div style="margin-top:24px;display:flex;gap:16px;flex-wrap:wrap">' +
    '<button class="btn-primary" onclick="openModal(\'strategistModal\')">Connect with a Creative Strategist \u2192</button>' +
    '<button class="btn-ghost" onclick="openModal(\'pdfModal\')">Download Full Strategy PDF</button></div>';
  sHtml += '</div>';

  stratContent.innerHTML = sHtml;
}

function renderBattleCards(data, brandName, category) {
  // In live mode, show loading state for competitor tab — wait for Apify real data
  if (typeof USE_DUMMY_DATA === 'undefined' || !USE_DUMMY_DATA) {
    renderCompetitorTabLoading(data, brandName);
  } else {
    renderCompetitorTab(data, brandName);
  }
  renderMarketTab(data, brandName);
  renderConceptsPlaceholder(brandName);
  // AI Concepts and Strategy tabs are generated on-demand when user clicks Generate

  // ── Update Hero Preview ──
  var hcpLabel = document.querySelector('.hcp-label');
  if (hcpLabel) {
    hcpLabel.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Live Battle Card Preview \u00b7 ' + escBattle(brandName);
  }

  // Update hero snapshot with real brand profile data
  var ad = window.lastAnalysisData;
  var heroContent = document.getElementById('heroSnapshotContent');
  if (heroContent && ad) {
    var snapHtml = '';
    // Show key brand profile items
    if (ad.brandProfile && Array.isArray(ad.brandProfile)) {
      snapHtml += '<div style="display:flex;flex-direction:column;gap:12px;padding:4px 0">';
      ad.brandProfile.slice(0, 4).forEach(function(item) {
        snapHtml += '<div style="display:flex;gap:8px;align-items:flex-start">' +
          '<span style="font-size:14px;flex-shrink:0">' + (item.icon || '•') + '</span>' +
          '<div><div style="font-size:11px;color:var(--muted-foreground);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:2px">' + escBattle(item.label) + '</div>' +
          '<div style="font-size:13px;color:var(--foreground);line-height:1.5">' + escBattle(item.value) + '</div></div>' +
        '</div>';
      });
      snapHtml += '</div>';
    }
    // Show savings if available
    if (ad.savings) {
      snapHtml += '<div style="margin-top:12px;padding:12px 16px;background:var(--muted);border-radius:8px;display:flex;justify-content:space-between;align-items:center">' +
        '<span style="font-size:12px;color:var(--muted-foreground)">Est. Annual Savings</span>' +
        '<span style="font-size:16px;font-weight:700;color:var(--foreground)">' + escBattle(ad.savings) + '</span>' +
      '</div>';
    }
    heroContent.innerHTML = snapHtml || '<div style="padding:16px 0;font-size:13px;color:var(--muted-foreground)">No analysis data available.</div>';
  }

  // Update playbook header
  var ptEl = document.getElementById('playbookTitle');
  if (ptEl) ptEl.textContent = brandName + ' \u00b7 March 2026';

  var playbookRoot = document.getElementById('playbook');
  if (playbookRoot) {
    playbookRoot.querySelectorAll('span').forEach(function(span) {
      // Update brand name span
      if (span.style && span.style.fontWeight === '700' && span.style.color) {
        span.textContent = brandName;
      }
      // Update category span
      if (span.textContent && span.textContent.indexOf('Fashion & Apparel') !== -1) {
        span.textContent = '\u00b7 ' + category + ' \u00b7 March 2026';
      }
    });
  }

  // ── Data Sources & Methodology Footer ──
  var battleSourcesEl = document.getElementById('battleSourcesSection');
  if (battleSourcesEl) {
    var srcHtml = '<div style="padding:24px">';
    if (data.methodology) {
      srcHtml += '<div style="margin-bottom:24px">';
      srcHtml += '<div style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted-foreground);margin-bottom:12px;text-transform:uppercase">Methodology</div>';
      if (data.methodology.competitorSelection) srcHtml += '<div style="font-size:12px;color:var(--muted-foreground);margin-bottom:8px;line-height:1.5"><strong style="color:var(--foreground)">Competitor Selection:</strong> ' + escBattle(data.methodology.competitorSelection) + '</div>';
      if (data.methodology.metricsApproach) srcHtml += '<div style="font-size:12px;color:var(--muted-foreground);margin-bottom:12px;line-height:1.5"><strong style="color:var(--foreground)">Metrics Approach:</strong> ' + escBattle(data.methodology.metricsApproach) + '</div>';
      if (data.methodology.limitationsNote) srcHtml += '<div style="font-size:12px;color:var(--muted-foreground);padding:12px;background:var(--muted);border:1px solid var(--border);border-radius:6px">&#9888; ' + escBattle(data.methodology.limitationsNote) + '</div>';
      srcHtml += '</div>';
    }
    if (data.dataSources && data.dataSources.length) {
      srcHtml += '<div style="padding-top:24px;border-top:1px solid var(--border)">';
      srcHtml += '<div style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted-foreground);margin-bottom:12px">Data Sources</div>';
      srcHtml += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
      data.dataSources.forEach(function(s) {
        var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(s);
        srcHtml += '<a href="' + searchUrl + '" target="_blank" rel="noopener" style="font-size:12px;padding:6px 12px;border-radius:6px;background:var(--muted);border:1px solid var(--border);color:var(--muted-foreground);text-decoration:none;transition:border-color 0.2s;cursor:pointer" onmouseover="this.style.borderColor=\'var(--primary)\'" onmouseout="this.style.borderColor=\'var(--border)\'">&#128218; ' + escBattle(s) + ' <span style="font-size:9px;opacity:0.5">&#8599;</span></a>';
      });
      srcHtml += '</div>';
      srcHtml += '<div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border);display:flex;gap:20px;font-size:11px;color:var(--muted-foreground)">' +
        '<span style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:var(--primary);display:inline-block"></span> Verified</span>' +
        '<span style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:var(--muted-foreground);display:inline-block"></span> Estimated</span>' +
        '<span style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:var(--destructive);display:inline-block"></span> Unverified / Unavailable</span>' +
      '</div>';
      srcHtml += '</div>';
    }
    srcHtml += '</div>';
    battleSourcesEl.innerHTML = srcHtml;
    battleSourcesEl.style.display = 'block';
  }

  // Re-init scroll reveal for dynamically added elements
  document.querySelectorAll('#page-battle .comp-card, #page-battle .concept-card, #page-battle .ai-concept-card, #page-battle .mc-card, #page-battle .strategy-block, #page-battle .mt-card').forEach(function(el) {
    el.classList.add('reveal', 'visible');
  });
}

// ── Apify live competitor enrichment ──
// Called after renderBattleCards in live mode.
// Shows a loading badge on the Competitor Plan tab, hits /api/competitor-plan,
// then re-renders the competitor tab with Apify-backed real metrics.
async function enrichCompetitorTabFromApify(data, brandName, category) {
  if (typeof USE_DUMMY_DATA !== 'undefined' && USE_DUMMY_DATA) return;
  if (!data || !data.competitors || !data.competitors.length) return;

  // Tab button loading state
  var tabBtn = document.querySelector('.btab[onclick*="competitor"]');
  if (tabBtn) {
    tabBtn.dataset.origText = tabBtn.textContent;
    tabBtn.innerHTML = 'Competitor Plan <span style="font-size:10px;opacity:0.6;margin-left:4px">· Live…</span>';
  }

  try {
    var competitorNames = data.competitors.map(function(c) { return c.name; });
    var res = await fetch('/api/competitor-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand:       brandName,
        competitors: competitorNames,
        category:    category || '',
        region:      'India',
      }),
    });

    if (!res.ok) {
      var err = await res.json().catch(function() { return {}; });
      throw new Error(err.error || 'competitor-plan API error ' + res.status);
    }

    var apifyData = await res.json();
    console.log('[Apify] Competitor enrichment complete:', apifyData._meta);

    // Merge Apify data into battleCardData and re-render competitor tab
    if (apifyData.competitors && apifyData.competitors.length) {
      var merged = Object.assign({}, data, {
        competitors: apifyData.competitors,
        yourBrand:   apifyData.yourBrand || data.yourBrand,
        methodology: apifyData.methodology || data.methodology,
      });
      renderCompetitorTab(merged, brandName);

      // Re-run scroll reveal on new cards
      document.querySelectorAll('#tab-competitor .comp-card').forEach(function(el) {
        el.classList.add('reveal', 'visible');
      });
    }

    // Update tab label
    if (tabBtn) {
      tabBtn.innerHTML = 'Competitor Plan <span style="font-size:10px;color:var(--good);margin-left:4px">· Live ✓</span>';
    }

    // Show meta toast
    var scraped = apifyData._meta?.totalPostsScraped || 0;
    var brands  = apifyData._meta?.brandsWithRealData || 0;
    if (typeof showToast === 'function') {
      showToast('success', 'Competitor Data Updated',
        'Apify scraped ' + scraped + ' posts across ' + brands + ' brand' + (brands !== 1 ? 's' : '') + '.');
    }

  } catch (err) {
    console.warn('[Apify] Competitor enrichment failed:', err.message);
    // Fall back to OpenAI-estimated competitor data
    renderCompetitorTab(data, brandName);
    if (tabBtn) {
      tabBtn.innerHTML = 'Competitor Plan <span style="font-size:10px;color:var(--muted-foreground);margin-left:4px">· Estimated</span>';
    }
    if (typeof showToast === 'function') {
      showToast('warning', 'Live data unavailable', 'Showing AI-estimated competitor data. Instagram scraping failed: ' + err.message, 5000);
    }
  }
}
