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
    { title: 'Bangalore-Chennai Metro',    desc: 'Combined 8.2M Gen-Z population with 34% of India\'s online streetwear spend. Bangalore alone has 2.4× higher avg. fashion AOV than national average. Both cities index high on graphic tee + sneaker search volume.',      opp: '₹3.8Cr (₹420Cr category × 0.9% addressable)', confidence: 'estimated', source: 'Redseer D2C Fashion Report 2024 + Google Trends' },
    { title: 'Delhi-NCR Student Cluster',     desc: 'DU + JNU + Amity campuses = 800K+ students. Streetwear search volume +210% YoY in Noida-Gurgaon belt. Competitors Bewakoof and The Souled Store each spend ₹15L/month on campus activations here.',                    opp: '₹5.2Cr (₹1200Cr youth fashion × 0.43%)',     confidence: 'estimated', source: 'SimilarWeb + campus marketing data' },
    { title: 'Pune-Hyderabad IT Corridor',      desc: 'IT professionals aged 22-28 have 3.2× higher discretionary spend on casual fashion. Weekend streetwear culture is strong — 68% of purchases happen Thu-Sun. Zero brand-specific targeting from competitors.',                     opp: '₹2.1Cr addressable in 12 months', confidence: 'estimated', source: 'Flipkart Fashion Trends Q3 2024' },
    { title: 'Jaipur-Lucknow-Indore Tier-2',  desc: 'Fashion app installs up 2.5× in these cities. Average order value ₹680 (lower than metros) but repeat rate is 1.8× higher. Price-sensitive but highly brand-loyal once acquired. Free delivery threshold is the key conversion lever.',    opp: '₹4.1Cr (highest repeat-rate cluster)', confidence: 'estimated', source: 'Bain-Flipkart India E-commerce Report 2024' }
  ],
  platforms: [
    { rank: 1, title: 'Instagram Reels', desc: 'Competitors average 4.2% engagement on product Reels vs 1.1% on static posts. Brand currently at 20% Reels mix — category leaders are at 65%. Algorithm gives 3× organic reach to Reels in fashion discovery feed.', opp: '+45K monthly Reels reach in 18-24 demo at ₹0.8 CPE' },
    { rank: 2, title: 'YouTube Shorts',  desc: 'Untapped channel — zero brand presence vs Bewakoof\'s 500K avg. views per Short. YouTube\'s fashion discovery audience skews male 18-25, matching brand demo. Shoppable Shorts launched in India Q2 2024.',                opp: 'First 50 Shorts in 90 days → projected 2.5M total views' },
    { rank: 3, title: 'Snapchat Spotlight', desc: 'India\'s fastest-growing social platform for 16-22 age group (+180% DAU YoY). Streetwear brands see 5.2× higher save rate vs Instagram. Zero competitor presence — true first-mover window.',                opp: '30K followers in 60 days at ₹0.3 cost per follower' },
    { rank: 4, title: 'WhatsApp Channels',  desc: 'Direct broadcast to existing customers. Fashion brands report 40% higher conversion vs email, 28% higher AOV. Ideal for flash drops and limited editions that drive urgency.',            opp: '+35% repeat purchase rate within opted-in base' }
  ],
  seasonal: [
    { title: 'Pre-Diwali Fashion Rush',    desc: 'Oct 1-20: 42% of annual casual wear purchases happen in this 3-week window. Google search volume for "trendy t-shirts" +380% vs baseline. Flipkart Big Billion Days typically falls here — brands that pre-seed content see 2.8× higher BBD conversion.',  opp: 'Sep 25 – Oct 20 (start content by Sep 10)' },
    { title: 'Back to College Drop',    desc: 'Jul 1-25: 2.3M students start new academic year. First purchase is usually casual wear — 78% of students buy 3+ outfits. Hostel move-in creates social media moments. Competitors launch campus ambassador programs here.',  opp: 'Jun 15 – Jul 25 (campus seeding by Jun 1)' },
    { title: 'IPL Season Collection',        desc: 'Mar 22 – May 26: Cricket creates peak male fashion engagement. Fan merchandise + streetwear crossover drives +120% higher social engagement. Brands that run IPL-themed content see 3.1× higher story views.',  opp: 'Mar 15 – May 30 (content bank by Mar 1)' },
    { title: 'New Year Refresh',  desc: 'Dec 26 – Jan 15: Post-Christmas wardrobe refresh. Gift card redemptions peak. "New year new style" search +240%. End-of-season + new arrivals creates a unique overlap window. Competitors typically go dark — low CPM opportunity.',       opp: 'Dec 20 – Jan 15 (lowest CPM of the year)' }
  ],
  trends: [
    { tag: 'urgent',   title: 'AI Virtual Try-On for Apparel',    stat: '2.8×',  statLabel: 'conversion lift (Myntra 2024 data)', desc: 'Myntra reports 2.8× higher conversion when virtual try-on is available for casual wear. Amazon Fashion launched AR try-on for t-shirts in India Q4 2024. This brand has zero try-on capability — every competitor will have it by Q2 2025.', action: 'Integrate Fynd Studio AI try-on for top 20 SKUs within 30 days. Expected +18% conversion uplift.', source: 'Myntra Fashion Report 2024 + Amazon India press release' },
    { tag: 'rising',   title: 'Vernacular Content Drives 3× Sales',    stat: '3.2×',   statLabel: 'higher purchase intent (Hindi vs English)', desc: 'Hindi + regional language Reels drive 3.2× higher purchase intent than English-only content for mass-market fashion. Tamil Nadu shows the fastest growth in vernacular fashion search. Brand\'s content is 100% English — missing 68% of the addressable audience.', action: 'Produce Hindi + Tamil content for top 10 products. Test Reels with Hindi voiceover for 30 days.', source: 'ShareChat-Kantar India Digital Report 2024' },
    { tag: 'emerging', title: 'Resale-Ready Fashion Positioning',     stat: '+240%',  statLabel: 'resale search growth YoY (India)', desc: 'Indian consumers increasingly factor resale value into purchase decisions. Brands positioning as "resale-friendly" see 24% higher willingness-to-pay. ThriftFlip and Relove report 240% growth in branded casual wear resale. This is a positioning opportunity, not a channel.', action: 'Add "Resale Value Rating" to product pages. Partner with 1 resale platform for authentication.', source: 'Bain India Luxury & Fashion Report 2024 + ThriftFlip growth data' },
    { tag: 'rising',   title: 'Micro-Creator Armies (50-500 followers)',   stat: '4.6×',   statLabel: 'higher trust score vs macro-influencers', desc: 'Nano-influencers (500-5K followers) in fashion generate 4.6× higher trust scores than macro influencers. Cost per authentic UGC post is ₹200-500 vs ₹25K+ for macro. Bewakoof runs 200+ nano-creators/month. This brand appears to have zero creator program.', action: 'Recruit 50 campus nano-creators at ₹300/post. Target 200 UGC posts/month within 60 days.', source: 'Kofluence India Influencer Marketing Report 2024' }
  ],
  methodology: {
    competitorSelection: 'Selected based on direct product overlap (graphic tees, streetwear), price parity (₹499-1499 range), same target demo (18-25 male, metro + tier-2), and social media presence in India',
    metricsApproach: 'Cross-referenced SimilarWeb traffic estimates, Instagram public profile analytics, Flipkart/Myntra category data, and Redseer/Bain India D2C reports',
    limitationsNote: 'Engagement rates and posting frequency are estimated from public profile sampling (last 30 posts). Market sizing uses top-down TAM with conservative addressable share assumptions. Actual figures may vary ±25%.'
  },
  dataSources: ['Redseer India D2C Fashion Report 2024', 'Bain-Flipkart India E-commerce Report 2024', 'SimilarWeb traffic analytics', 'Instagram public profile analysis (last 30 posts)', 'Google Trends India — fashion category keywords']
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
  "You are a senior brand strategist and market researcher with deep expertise in Indian consumer markets.",
  "You will receive a brand name, category, website data, and possibly brand audit data.",
  "",
  "YOUR JOB: Produce a battle card that is so specific to THIS brand that it would be IMPOSSIBLE to reuse for any other brand. Every insight must be actionable and grounded in real market data.",
  "",
  "═══ RESEARCH METHODOLOGY ═══",
  "Before generating ANY data, mentally research these questions:",
  "",
  "1. BRAND DEEP-DIVE:",
  "   - What are this brand's TOP 5 products by likely revenue? (from website data)",
  "   - What is the price band? (₹500-1000? ₹1000-3000? ₹3000+?)",
  "   - Who is the primary buyer persona? (age, gender, income, city tier, lifestyle)",
  "   - What is their current content strategy? (from social links in website data)",
  "   - Where do they sell? (own website, Amazon, Flipkart, Myntra, offline?)",
  "",
  "2. COMPETITOR RESEARCH (find REAL competitors):",
  "   - Who sells the same products at ±30% of this brand's price?",
  "   - Who targets the same buyer persona in India?",
  "   - Who is winning on social media in this exact niche?",
  "   - Include 1 category leader, 1 direct rival, 1 fast-rising disruptor, 1 from adjacent category",
  "",
  "3. MARKET INTELLIGENCE (India-specific):",
  "   - Which SPECIFIC cities/clusters have the highest demand for THIS product?",
  "   - Use real Indian market data: tier-1 vs tier-2 penetration, regional spending patterns",
  "   - Reference real data points: e-commerce growth rates, app install data, Google Trends for product keywords",
  "   - Mention SPECIFIC cities (not just 'South India' — say 'Bangalore + Chennai metro cluster')",
  "   - Include addressable market size with calculation basis",
  "",
  "4. PLATFORM STRATEGY (data-backed):",
  "   - Rank by THIS brand's specific content type and buyer demo",
  "   - Include platform-specific metrics: avg. reach per post type, cost per engagement, conversion rates",
  "   - Reference what competitors are doing on each platform",
  "   - If a platform is NOT relevant (e.g., LinkedIn for mass-market footwear), SAY WHY and rank it lower",
  "",
  "5. SEASONAL CALENDAR (revenue-linked):",
  "   - Identify the 4 HIGHEST revenue moments for THIS specific product category in India",
  "   - Each must include: what buyer behavior changes, how much spending increases, and WHY",
  "   - Include at least 1 non-obvious opportunity (not just Diwali/Holi — find category-specific moments)",
  "   - Reference real shopping data: Flipkart Big Billion Days impact on this category, Amazon Great Indian Festival, etc.",
  "",
  "6. TREND ANALYSIS (must be current and specific):",
  "   - Each trend must be about THIS SPECIFIC industry/category — NOT generic D2C/AI trends",
  "   - Stats must be plausible and sourced (industry reports, platform data, market research firms)",
  "   - The 'action' must be something THIS brand can do in the next 30-60 days",
  "   - Include at least 1 consumer behavior shift (not just technology trends)",
  "   - Include at least 1 trend that represents a THREAT if not acted on",
  "",
  "═══ DATA QUALITY RULES ═══",
  "- NEVER use generic descriptions that could apply to any brand. Test: read your output and ask 'could this be about a different brand?' If yes, rewrite.",
  "- NEVER use placeholder phrases like 'emerging D2C hub', 'growing market', 'rising fast' without specific data",
  "- Every market opportunity MUST include a basis for the ₹ figure (e.g., '₹180Cr footwear category × 12% online share × 8% addressable')",
  "- Every trend stat MUST cite a credible source type (Redseer, Bain-Flipkart, Statista, SimilarWeb, platform analytics)",
  "- Platform 'opp' must be a SPECIFIC metric goal (e.g., '+45K monthly Reels reach targeting 18-24 male' — not generic '+180% reach')",
  "- Seasonal 'desc' must explain the BUYER BEHAVIOR (e.g., 'College students buy 2.3 pairs of shoes in July for new academic year' — not 'Back to college shopping')",
  "- Competitor 'gap' must be a specific, actionable insight (e.g., 'Publishes 3× more video content targeting same demo on Reels' — not 'Posting more content')",
  "",
  "═══ ANTI-PATTERNS (you will FAIL if you do these) ═══",
  "- Generic regions: 'South India is growing' → FAIL. Say 'Bangalore-Chennai metro cluster: 34% of India's online footwear spend'",
  "- Generic platforms: 'Instagram has high engagement' → FAIL. Say 'Instagram Reels: 78% of <brand category> discovery happens here. Competitors average 4.2% ER on product Reels vs 1.1% on static.'",
  "- Generic trends: 'AI-generated content is growing' → FAIL. Say 'AI Virtual Try-On for footwear: Myntra reports 2.8× higher conversion when try-on is available. <brand> has zero try-on capability.'",
  "- Generic seasonals: 'Diwali shopping' → FAIL. Say 'Pre-Diwali Footwear Rush (Oct 1-20): 42% of annual sneaker sales happen in this 3-week window. Search volume for <category> +380% vs baseline.'",
  "",
  "Respond ONLY with valid JSON. No markdown. No backticks.",
  "",
  "JSON structure:",
  "{",
  "  \"competitors\": [",
  "    {\"name\":\"<REAL competitor — must be a real brand selling in India>\",",
  "     \"desc\":\"<2 sentences: what they sell, their positioning vs THIS brand, WHY they are a threat>\",",
  "     \"badge\":\"Category Leader|Fast Mover|Rising Fast|Market Leader|High Spend\",",
  "     \"badgeClass\":\"leader|rising\",\"confidence\":\"verified|estimated\",",
  "     \"dataSource\":\"<specific source: e.g., 'Instagram @handle analysis, SimilarWeb traffic data'>\",",
  "     \"posts\":\"<monthly posts with format — e.g., '48 (32 Reels, 12 Static, 4 Carousel)'>\",\"postsClass\":\"good|neutral|bad\",",
  "     \"er\":\"<engagement rate with context — e.g., '3.2% (industry avg: 1.8%)'>\",\"erClass\":\"good|neutral|bad\",",
  "     \"mix\":\"<content format split with context>\",\"mixClass\":\"good|neutral|bad\",",
  "     \"festivals\":\"<specific festivals they activate on>\",\"festivalsClass\":\"good|neutral|bad\",",
  "     \"ai\":\"<AI usage with specifics — e.g., '~35% (AI lookbooks + virtual try-on)'>\",\"aiClass\":\"good|neutral|bad\",",
  "     \"gap\":\"<SPECIFIC actionable gap — what are they doing that THIS brand isn't?>\",\"gapClass\":\"bad|neutral\"}",
  "  ],",
  "  \"yourBrand\":{\"desc\":\"<what THIS brand is from website data — products, positioning, price range>\",\"confidence\":\"verified|estimated\",",
  "    \"posts\":\"<est monthly posts>\",\"er\":\"<est engagement %>\",\"mix\":\"<format split>\",\"festivals\":\"<festival campaigns>\",\"ai\":\"<AI adoption %>\",",
  "    \"potential\":\"<specific growth target with rationale — e.g., '4× content output + 35% lower CPA by shifting to 70% video format'>\"},",
  "  \"markets\":[",
  "    {\"title\":\"<SPECIFIC city cluster — e.g., 'Bangalore-Chennai Metro Cluster'>\",",
  "     \"desc\":\"<3 sentences: specific cities, population/spending data, buyer behavior unique to this cluster, WHY this brand's products fit here. Reference real data points.>\",",
  "     \"opp\":\"<₹ opportunity with calculation basis — e.g., '₹12Cr (₹850Cr market × 1.4% addressable share)'>\",",
  "     \"confidence\":\"verified|estimated\",",
  "     \"source\":\"<data source — e.g., 'Redseer 2024 footwear report + Google Trends search volume'>\"}",
  "  ],",
  "  \"platforms\":[",
  "    {\"rank\":1,\"title\":\"<platform name>\",",
  "     \"desc\":\"<2-3 sentences: WHY this platform for THIS brand's product + buyer demo. Include platform-specific data. Reference what competitors do here.>\",",
  "     \"opp\":\"<specific measurable 90-day goal — e.g., '+45K monthly Reels reach in 18-24M demo at ₹0.8 CPE'>\"}",
  "  ],",
  "  \"seasonal\":[",
  "    {\"title\":\"<specific campaign name tied to THIS category>\",",
  "     \"desc\":\"<2-3 sentences: WHAT buyer behavior changes, HOW MUCH spending increases, WHY this matters for THIS product specifically. Include real shopping data.>\",",
  "     \"opp\":\"<timing window with preparation lead time — e.g., 'Sep 15 – Oct 10 (start content production by Aug 25)'>\"}",
  "  ],",
  "  \"trends\":[",
  "    {\"tag\":\"rising|emerging|urgent\",",
  "     \"title\":\"<specific trend in THIS category — not generic D2C/AI trends>\",",
  "     \"stat\":\"<real stat with source context — e.g., '+280%' or '2.8×'>\",",
  "     \"statLabel\":\"<precisely what the stat measures — e.g., 'conversion lift with virtual try-on (Myntra 2024)'>\",",
  "     \"desc\":\"<2-3 sentences: how this trend specifically impacts THIS brand. Reference the brand's current state vs where the market is going. Include competitive pressure.>\",",
  "     \"action\":\"<specific 30-60 day action for THIS brand — what to build/launch/test, expected impact>\",",
  "     \"source\":\"<credible named source — e.g., 'Bain-Flipkart India E-commerce Report 2024, Redseer D2C Pulse Q3 2024'>\"}",
  "  ],",
  "  \"methodology\":{",
  "    \"competitorSelection\":\"<why these 4 competitors and not others>\",",
  "    \"metricsApproach\":\"<specific data sources and estimation methods used>\",",
  "    \"limitationsNote\":\"<honest limitations — what data was estimated vs verified>\"},",
  "  \"dataSources\":[\"<named source 1>\",\"<named source 2>\",\"<named source 3>\",\"<named source 4>\",\"<named source 5>\"]",
  "}",
  "",
  "Provide exactly 4 competitors, 4 markets, 4 platforms, 4 seasonal, 4 trends.",
  "QUALITY CHECK before responding:",
  "1. Read each market — does it mention SPECIFIC cities and real data? If not, rewrite.",
  "2. Read each platform — does the 'opp' have a specific metric with a number? If not, rewrite.",
  "3. Read each seasonal — does it explain WHY buying behavior changes? If not, rewrite.",
  "4. Read each trend — is it about THIS SPECIFIC category (not generic AI/D2C)? If not, rewrite.",
  "5. Read each competitor gap — can the brand ACT on it this month? If not, make it actionable."
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

  // If we already have brand audit data, pass full intelligence
  if (ad) {
    userPrompt += '\n\n═══ BRAND AUDIT INTELLIGENCE (from Creative Intel analysis) ═══';
    // Brand profile cards
    if (ad.brandProfile && Array.isArray(ad.brandProfile)) {
      ad.brandProfile.forEach(function(item) {
        if (item.label && item.value) {
          userPrompt += '\n• ' + item.label + ': ' + item.value;
        }
      });
    }
    if (ad.scores) {
      var sc = ad.scores;
      userPrompt += '\n\nCreative Health Scores:';
      userPrompt += '\n• Creative Velocity: ' + sc.velocity + '/100';
      userPrompt += '\n• Stagnation Risk: ' + sc.stagnation;
      userPrompt += '\n• Regional Score: ' + sc.regional + '/100 (use this to identify weak regions)';
      userPrompt += '\n• AI Opportunity: ' + sc.ai + '/100';
      userPrompt += '\n• Platform Score: ' + sc.platform + '/100 (use this to rank platforms)';
    }
    if (ad.topInsight) userPrompt += '\n• Key Insight: ' + ad.topInsight;
    if (ad.savings) userPrompt += '\n• Est. Annual AI Savings: ' + ad.savings;
    if (ad.competitorBenchmark) {
      var cb = ad.competitorBenchmark;
      userPrompt += '\n\nCompetitive Benchmark:';
      if (cb.summary) userPrompt += '\n• Position: ' + cb.summary;
      if (cb.postsPerMonth) userPrompt += '\n• Brand Posts/Month: ' + cb.postsPerMonth;
      if (cb.categoryLeaderPosts) userPrompt += '\n• Category Leader Posts/Month: ' + cb.categoryLeaderPosts;
      if (cb.aiAdoptionPct) userPrompt += '\n• Brand AI Adoption: ' + cb.aiAdoptionPct + '%';
      if (cb.categoryAvgAiPct) userPrompt += '\n• Category Avg AI Adoption: ' + cb.categoryAvgAiPct + '%';
    }
    // Alerts — red/yellow/green findings
    if (ad.alerts && Array.isArray(ad.alerts) && ad.alerts.length) {
      userPrompt += '\n\nBrand Alerts (critical findings):';
      ad.alerts.forEach(function(a) {
        var txt = typeof a === 'string' ? a : (a.text || a.message || JSON.stringify(a));
        userPrompt += '\n• ' + txt;
      });
    }
    // Regional scores
    if (ad.regions && Array.isArray(ad.regions) && ad.regions.length) {
      userPrompt += '\n\nRegional Penetration Scores:';
      ad.regions.forEach(function(r) {
        userPrompt += '\n• ' + (r.name || r.region) + ': ' + (r.score || r.value) + '/100';
      });
      userPrompt += '\nUse these scores to identify weak regions as market opportunities.';
    }
    // Priorities
    if (ad.priorities && Array.isArray(ad.priorities) && ad.priorities.length) {
      userPrompt += '\n\nAction Priorities:';
      ad.priorities.forEach(function(p) {
        var txt = typeof p === 'string' ? p : (p.title || p.text || JSON.stringify(p));
        userPrompt += '\n• ' + txt;
      });
    }
    // Cost breakdown
    if (ad.breakdown && Array.isArray(ad.breakdown) && ad.breakdown.length) {
      userPrompt += '\n\nCost Per Asset (Traditional vs AI):';
      ad.breakdown.forEach(function(b) {
        userPrompt += '\n• ' + (b.item || b.label) + ': Traditional ' + (b.trad || b.traditional) + ' → AI ' + (b.ai || b.aiCost);
      });
    }
  }

  userPrompt += '\n\n═══ GENERATION INSTRUCTIONS ═══';
  userPrompt += '\nGenerate a complete battle card analysis (WITHOUT strategy or concepts sections).';
  userPrompt += '\n\nQUALITY REQUIREMENTS:';
  userPrompt += '\n1. All competitors must be REAL brands you can verify exist and compete in this category in India.';
  userPrompt += '\n2. Market opportunities must cite SPECIFIC cities (not just regions) with addressable market calculations.';
  userPrompt += '\n3. Platform rankings must include specific metrics and competitor benchmarks on each platform.';
  userPrompt += '\n4. Seasonal campaigns must explain the buyer behavior shift (WHY people buy more of THIS product at THIS time).';
  userPrompt += '\n5. Trends must be category-specific with named sources — NOT generic "AI is growing" or "D2C is rising".';
  userPrompt += '\n6. Every metric must have a numeric value. NEVER return "Data unavailable".';
  userPrompt += '\n7. If the brand audit shows a low regional score, identify those regions as market OPPORTUNITIES.';
  userPrompt += '\n8. If the brand audit shows a low platform score, explain which platforms need work and WHY.';
  userPrompt += '\n9. Mark confidence as "estimated" where you infer from benchmarks — be honest about uncertainty.';

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

// ═══ BRAND-INTELLIGENT USE CASE PROMPT ═══
// Derives three specific use cases from brand intelligence (Creative Intel + Battle Card data).
// Each use case is grounded in what the brand does, who they sell to, and their market context.
var CONCEPTS_PROMPT = [
  "You are a commercial creative director who creates brand-specific campaign visuals.",
  "You receive: brand name, category, BRAND INTELLIGENCE (what the brand does, target audience, positioning, competitors, seasonal moments, trends), and an uploaded product image reference.",
  "",
  "YOUR JOB: Read the brand intelligence, then derive THREE SPECIFIC USE CASES for this brand's product. Each use case must be impossible to confuse with another brand's use case.",
  "",
  "═══ STEP 1: UNDERSTAND THE BRAND (mandatory) ═══",
  "Read ALL brand intelligence provided. Extract:",
  "- What EXACTLY the brand sells (products, price range, SKUs)",
  "- WHO their customers are (age, lifestyle, aspirations, demographics)",
  "- HOW the brand positions itself (premium, mass-market, aspirational, functional, luxury)",
  "- WHAT competitors are doing (content gaps, opportunities)",
  "- WHICH seasonal moments or trends matter for this brand RIGHT NOW",
  "",
  "═══ STEP 2: DERIVE THREE USE CASES FROM BRAND INTELLIGENCE ═══",
  "Each use case MUST be derived from the brand data — not generic.",
  "",
  "USE CASE 1 — LIFESTYLE SHOOT:",
  "- Create a SPECIFIC real-world scenario where THIS brand's target customer naturally uses THIS product",
  "- The scenario MUST reflect the brand's positioning and target audience from the intelligence data",
  "- Premium brand → upscale setting (lounge, boutique hotel, art gallery)",
  "- Youth/streetwear → urban campus, street market, festival, rooftop",
  "- Wellness/health → morning routine, yoga studio, nature trail, clean kitchen",
  "- Mass-market → everyday moments (commute, family dinner, weekend outing)",
  "- Reference the brand's actual customer demographic in the scene",
  "",
  "USE CASE 2 — PRODUCT PHOTOSHOOT:",
  "- Create a studio/catalog context that matches HOW this brand sells and its price tier",
  "- Premium/luxury → dark gradient, dramatic three-point lighting, reflective surface",
  "- Mass-market → clean bright white, even lighting, minimal shadow",
  "- Artisanal/handmade → textured natural surface (wood, linen, stone)",
  "- Tech/gadgets → matte dark surface, colored accent lighting, geometric props",
  "- The photoshoot style must match where this product is sold (e-commerce hero, catalog, retail display)",
  "- ABSOLUTE RULE: Preserve the EXACT viewing angle of the uploaded product. Do NOT rotate, flip, or reveal unseen surfaces. ONLY enhance with lighting, backdrop, shadows, reflections.",
  "",
  "USE CASE 3 — SOCIAL MEDIA POST:",
  "- Create a SPECIFIC Instagram/social campaign moment tied to the brand's ACTUAL marketing context",
  "- If SEASONAL CAMPAIGNS were identified in the brand intelligence, use the most relevant upcoming one",
  "- If TRENDS were identified, tie the post to the most urgent or rising trend",
  "- If neither is available, create a moment based on the brand's target audience behavior on social media",
  "- The post must feel like it belongs on THIS brand's actual Instagram feed — not a generic brand",
  "- Product must be the hero — prominent, well-lit, clearly visible in an aspirational scene",
  "",
  "═══ STEP 3: SCENE RULES ═══",
  "The scene MUST match the product's actual use context:",
  "  Footwear: running→trail/park, casual→sidewalk/café, formal→office/dinner. NEVER indoors on carpet.",
  "  Beverages: energy→gym/sports, juice→kitchen/picnic, premium→executive/spa. NEVER formal office.",
  "  Electronics: headphones→commute/desk, phone→café/street. NEVER swimming pool.",
  "  Cosmetics: skincare→bathroom/vanity, makeup→mirror/prep. NEVER gym.",
  "  Fashion: streetwear→urban/campus, ethnic→festive/cultural, formal→office/dinner.",
  "  Luggage: travel→airport/hotel lobby, daily→commute/office. NEVER bedroom.",
  "  NEVER force festive/cultural themes unless the brand intelligence specifically mentions seasonal campaigns.",
  "  When uncertain, choose SAFE and NEUTRAL over bold and wrong.",
  "",
  "═══ STEP 4: PRODUCT FIDELITY RULES (CRITICAL — read carefully) ═══",
  "The imagePrompt must NEVER describe the product's physical appearance.",
  "DO NOT mention: color, material, texture, shape, sole, stitching, mesh, laces, buttons, pattern, fabric, or any physical product detail.",
  "The reference image IS the product. Any text description of the product will CONFLICT with the reference image and cause FAL to generate a WRONG product.",
  "",
  "WRONG: 'A person wearing a green mesh running shoe with yellow sole on a park trail'",
  "RIGHT: 'A person wearing the exact product from the reference image, walking on a sunlit park trail'",
  "",
  "WRONG: 'Studio shot of a black leather sneaker with white rubber outsole on dark surface'",
  "RIGHT: 'Studio shot of the exact product from the reference image on a dark matte surface, three-point lighting'",
  "",
  "In ALL imagePrompts, refer to the product ONLY as:",
  "- 'the exact product from the reference image'",
  "- 'the product shown in the reference image'",
  "- 'the uploaded product'",
  "NEVER describe what the product looks like. NEVER guess colors, materials, or features.",
  "",
  "- The uploaded product image is the absolute source of truth for appearance",
  "- ALL three visuals: NO text, NO logos, NO watermarks, NO typography",
  "",
  "OUTPUT FORMAT — valid JSON only, no markdown, no backticks:",
  "{",
  "  \"productContext\": {",
  "    \"type\": \"<specific product inferred from brand intelligence + category>\",",
  "    \"category\": \"<broad category>\",",
  "    \"useCase\": \"<primary use context>\",",
  "    \"appropriateScenes\": [\"scene1\", \"scene2\", \"scene3\", \"scene4\"],",
  "    \"sourceAngle\": \"<viewing angle of uploaded product>\",",
  "    \"positioning\": \"<from brand intelligence: premium | mass-market | luxury | functional | aspirational>\"",
  "  },",
  "  \"campaign\": {",
  "    \"title\": \"Campaign Name — tied to brand positioning and intelligence\",",
  "    \"subtitle\": \"BRAND x THEME\",",
  "    \"desc\": \"2-3 sentences explaining why these three use cases matter for THIS brand specifically, referencing the brand intelligence\",",
  "    \"tags\": [\"tag1\", \"tag2\", \"tag3\"]",
  "  },",
  "  \"visuals\": [",
  "    {",
  "      \"type\": \"lifestyle\",",
  "      \"title\": \"<Specific use case title — e.g. 'Airport Lounge Moment' or 'Campus Street Style' or 'Morning Wellness Ritual'>\",",
  "      \"useCase\": \"<2 sentences: WHY this scenario fits this brand's customer + WHICH brand intelligence data point informed this choice>\",",
  "      \"desc\": \"<1-sentence visual description>\",",
  "      \"imagePrompt\": \"<SCENE-ONLY prompt — NEVER describe the product. Example: 'A young college student walking on a sunlit urban campus, naturally wearing the exact product from the reference image. Warm golden hour light, shallow depth of field, candid editorial photography. The product is clearly visible and central. 16:9. No text, no logos.' Describe ONLY the person, environment, lighting, mood. Refer to the product ONLY as 'the exact product from the reference image'. DO NOT mention product color, material, shape, or any physical feature.>\"",
  "    },",
  "    {",
  "      \"type\": \"product\",",
  "      \"title\": \"<Specific use case title>\",",
  "      \"useCase\": \"<2 sentences: WHY this photoshoot style matches the brand's price tier>\",",
  "      \"desc\": \"<1-sentence visual description>\",",
  "      \"imagePrompt\": \"<SCENE-ONLY prompt — NEVER describe the product. Example: 'Professional studio photograph. The exact product from the reference image placed on a dark matte surface. Three-point lighting with soft key light. Subtle shadow and reflection. Clean gradient background. Same viewing angle as the reference image. 1:1 square. No text.' Describe ONLY the surface, lighting, background. Refer to product ONLY as 'the exact product from the reference image'. DO NOT mention product color, material, shape, sole, stitching, or any physical feature.>\"",
  "    },",
  "    {",
  "      \"type\": \"social\",",
  "      \"title\": \"<Specific use case title>\",",
  "      \"useCase\": \"<2 sentences: WHICH seasonal campaign or trend this ties to>\",",
  "      \"desc\": \"<1-sentence visual description>\",",
  "      \"imagePrompt\": \"<SCENE-ONLY prompt — NEVER describe the product. Example: 'Premium Instagram photograph. The exact product from the reference image as the hero element, placed in a vibrant seasonal setting with warm autumn tones and soft natural light. Shallow depth of field. Product is prominent and clearly visible. 3:4 portrait. No text, no logos.' Describe ONLY the scene, mood, setting, lighting. Refer to product ONLY as 'the exact product from the reference image'. DO NOT mention product color, material, or features.>\"",
  "    }",
  "  ]",
  "}",
  "",
  "CRITICAL RULES:",
  "- You MUST read and use the brand intelligence to derive each use case. Generic use cases = FAILURE.",
  "- Each visual's useCase field MUST explain the specific connection to brand data (audience, positioning, seasonal campaign, or trend).",
  "- If I can copy-paste your output to a different brand and it still makes sense, you have FAILED.",
  "- productContext is REQUIRED before any prompts.",
  "- Lifestyle scene must come from the brand's actual customer context — not a generic aspirational scene.",
  "- Product shot style must match the brand's price tier and sales channel.",
  "- Social post must tie to a specific marketing moment (seasonal campaign, trend, or audience behavior from the intelligence data).",
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
        '<div class="cu-sub">Upload your product images and we\'ll generate three brand-specific use cases — a <strong style="color:var(--foreground)">Lifestyle Shoot</strong>, <strong style="color:var(--foreground)">Product Photoshoot</strong>, and <strong style="color:var(--foreground)">Social Media Post</strong> — all derived from your brand analysis.</div>' +

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
            'Creating social media post' +
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
      '<div style="font-size:12px;color:var(--muted-foreground);margin-top:8px">Creating lifestyle shoot, product photoshoot & social media post \u2014 this takes 30-60 seconds</div>' +
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

  // ═══ PASS ALL BRAND INTELLIGENCE — Creative Intel audit + Battle Card data ═══
  // This is the core data the AI uses to derive brand-specific use cases.
  var auditData = window.lastAnalysisData;
  var bcData = battleCardData;

  userPrompt += '\n\n═══════════════════════════════════════════════════════';
  userPrompt += '\n  BRAND INTELLIGENCE — USE THIS TO DERIVE USE CASES';
  userPrompt += '\n═══════════════════════════════════════════════════════';

  // 1. Brand Profile (from Creative Intel audit)
  if (auditData) {
    userPrompt += '\n\n── BRAND PROFILE (from Creative Intel audit) ──';
    if (auditData.brandProfile && Array.isArray(auditData.brandProfile)) {
      auditData.brandProfile.forEach(function(item) {
        if (item.label && item.value) {
          userPrompt += '\n• ' + item.label + ': ' + item.value;
        }
      });
    }
    if (auditData.overallGrade) {
      userPrompt += '\n• Creative Health Grade: ' + auditData.overallGrade;
    }
    if (auditData.topInsight) {
      userPrompt += '\n• Key Insight: ' + auditData.topInsight;
    }
    if (auditData.savings) {
      userPrompt += '\n• Estimated AI Savings: ' + auditData.savings;
    }
    if (auditData.competitorBenchmark && auditData.competitorBenchmark.summary) {
      userPrompt += '\n• Competitive Position: ' + auditData.competitorBenchmark.summary;
    }
    // Alerts (red/yellow/green findings)
    if (auditData.alerts && Array.isArray(auditData.alerts) && auditData.alerts.length) {
      userPrompt += '\n• Brand Alerts:';
      auditData.alerts.forEach(function(a) {
        var alertText = typeof a === 'string' ? a : (a.text || a.message || JSON.stringify(a));
        userPrompt += '\n  - ' + alertText;
      });
    }
    // Priorities (action items)
    if (auditData.priorities && Array.isArray(auditData.priorities) && auditData.priorities.length) {
      userPrompt += '\n• Action Priorities:';
      auditData.priorities.forEach(function(p) {
        var prioText = typeof p === 'string' ? p : (p.title || p.text || JSON.stringify(p));
        userPrompt += '\n  - ' + prioText;
      });
    }
  }

  // 2. Battle Card — Competitor Intelligence
  if (bcData && bcData.competitors && bcData.competitors.length) {
    userPrompt += '\n\n── COMPETITOR LANDSCAPE (from Battle Card analysis) ──';
    bcData.competitors.forEach(function(c) {
      userPrompt += '\n• ' + c.name + ': ' + (c.desc || '') + ' | Gap: ' + (c.gap || 'N/A');
    });
    if (bcData.yourBrand) {
      userPrompt += '\n• Your Brand Status: ' + (bcData.yourBrand.desc || '') + ' | Potential: ' + (bcData.yourBrand.potential || '');
    }
  }

  // 3. Battle Card — Seasonal Campaigns (CRITICAL for social media use case)
  if (bcData && bcData.seasonal && bcData.seasonal.length) {
    userPrompt += '\n\n── SEASONAL CAMPAIGNS (use for social media post use case) ──';
    bcData.seasonal.forEach(function(s) {
      userPrompt += '\n• ' + s.title + ': ' + s.desc + ' | Window: ' + (s.opp || '');
    });
    userPrompt += '\nPick the most relevant seasonal moment for the social media post use case.';
  }

  // 4. Battle Card — Emerging Trends (CRITICAL for social media use case)
  if (bcData && bcData.trends && bcData.trends.length) {
    userPrompt += '\n\n── EMERGING TRENDS (use for social media post use case) ──';
    bcData.trends.forEach(function(t) {
      userPrompt += '\n• [' + (t.tag || 'trend').toUpperCase() + '] ' + t.title + ': ' + (t.stat || '') + ' ' + (t.statLabel || '') + ' — ' + (t.desc || '');
    });
    userPrompt += '\nIf no seasonal campaign is a better fit, tie the social post to the most urgent or rising trend.';
  }

  // 5. Battle Card — Market Opportunities
  if (bcData && bcData.markets && bcData.markets.length) {
    userPrompt += '\n\n── MARKET OPPORTUNITIES ──';
    bcData.markets.forEach(function(m) {
      userPrompt += '\n• ' + m.title + ': ' + m.desc + ' | Opportunity: ' + (m.opp || '');
    });
  }

  // 6. Battle Card — Platform Priorities
  if (bcData && bcData.platforms && bcData.platforms.length) {
    userPrompt += '\n\n── PLATFORM PRIORITIES ──';
    bcData.platforms.forEach(function(p) {
      userPrompt += '\n• #' + p.rank + ' ' + p.title + ': ' + p.desc;
    });
  }

  userPrompt += '\n\n═══════════════════════════════════════════════════════';
  userPrompt += '\n  END BRAND INTELLIGENCE';
  userPrompt += '\n═══════════════════════════════════════════════════════';

  userPrompt += '\n\nUsing the brand intelligence above, generate THREE USE CASES with campaign visuals:';
  userPrompt += '\n1. LIFESTYLE SHOOT — a scenario derived from the brand\'s target audience and positioning';
  userPrompt += '\n2. PRODUCT PHOTOSHOOT — a studio style that matches the brand\'s price tier and sales channel';
  userPrompt += '\n3. SOCIAL MEDIA POST — tied to a specific seasonal campaign or trend from the intelligence data';
  userPrompt += '\n\nEvery visual MUST feature the uploaded ' + (uploadCategory || category) + ' product. The uploaded product image is the ONLY product to feature. Never substitute with a different product type.';
  userPrompt += '\nEach useCase field must cite the specific brand data point that informed the choice.';

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
        (visual.useCase ? '<div class="ai-concept-usecase" style="font-size:12px;color:var(--primary);line-height:1.5;margin-bottom:6px;padding:8px 10px;background:color-mix(in srgb, var(--primary) 6%, transparent);border-radius:6px;border-left:2px solid var(--primary)">' + escBattle(visual.useCase) + '</div>' : '') +
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
// ALL 3 types → FAL nano-banana-pro (image-to-image with reference)
// CRITICAL: prompts must NEVER describe the product — only the scene/environment.
// The reference image IS the product. Text descriptions of product details conflict with it.

// Strip product-describing words from GPT-4o imagePrompts as a safety net.
// These cause FAL to invent product details instead of using the reference image.
function sanitizeImagePrompt(prompt) {
  // Replace specific product color/material/feature descriptions with generic reference
  return prompt
    .replace(/\b(green|blue|red|black|white|yellow|orange|pink|purple|brown|grey|gray|beige|navy|olive|maroon|teal|gold|silver)\s+(mesh|leather|suede|canvas|rubber|nylon|fabric|knit|textile|foam|sole|outsole|midsole|upper|lace|strap|buckle|zipper|button|stitch|panel|overlay|tongue|heel|toe|collar|eyelet|pull.?tab|logo|swoosh|stripe)\b/gi, 'the exact product from the reference image')
    .replace(/\bwith\s+(a\s+)?(thick|thin|chunky|flat|curved|textured|smooth|ribbed|padded|cushioned|ventilated)\s+(sole|outsole|midsole|heel|strap|band|cuff|collar)\b/gi, '')
    .replace(/\b(mesh|leather|suede|canvas|knit|woven|synthetic|rubber|foam|gel|neoprene|patent|faux)\s+(upper|body|exterior|surface|finish|construction|material)\b/gi, 'the product from the reference image');
}

// LIFESTYLE: Priority = contextual realism — must look like a real photograph
function buildLifestylePrompt(visual, brandName) {
  var parts = [];
  parts.push('CRITICAL: Do NOT render any text, words, letters, logos, watermarks. Pure visual scene only.');
  parts.push('This MUST look like a real photograph taken by a professional photographer — NOT an AI-generated image. Real skin textures, natural imperfections, genuine fabric folds, real-world lighting with natural shadows.');

  if (window._battleProductImages && window._battleProductImages.length > 0) {
    parts.push('A reference product image is provided. The product in the scene MUST be identical to the reference image. Do NOT add, change, or invent any product details — no extra colors, no extra materials, no extra features. The reference image is the ONLY source of truth for the product.');
  }

  if (visual.imagePrompt) {
    parts.push(sanitizeImagePrompt(visual.imagePrompt));
  } else {
    parts.push('Lifestyle editorial photography for ' + brandName + '. A person naturally using the exact product from the reference image in a realistic setting. Shot on professional camera, natural ambient lighting, real environment.');
  }

  parts.push('Wide-angle cinematic composition, 16:9, shallow depth of field, editorial quality. Product clearly visible and central. Real photograph aesthetic — film grain, natural color grading, genuine textures. Do NOT add any details to the product that are not in the reference image.');
  return parts.join(' ');
}

// PRODUCT: Priority = geometry fidelity — real studio photograph
function buildProductPrompt(visual, brandName) {
  var parts = [];
  parts.push('CRITICAL: Do NOT render any text, words, letters, logos, or watermarks.');
  parts.push('This MUST look like a real product photograph taken in a professional photography studio — NOT a 3D render or AI art. Real surface textures, real material reflections, genuine shadows from actual studio lights.');

  if (window._battleProductImages && window._battleProductImages.length > 0) {
    parts.push('ABSOLUTE RULE: A reference product image is provided. The product must be PIXEL-IDENTICAL to the reference — same viewing angle, same colors, same materials, same design. Do NOT add, change, or invent ANY product detail. Do NOT rotate or show unseen surfaces. ONLY change the environment: lighting, backdrop, shadows, reflections.');
  }

  if (visual.imagePrompt) {
    parts.push(sanitizeImagePrompt(visual.imagePrompt));
  } else {
    parts.push('Premium studio product photography. Same viewing angle as reference. Clean background. Professional three-point lighting setup. Natural shadow and subtle reflection on surface. 1:1 square. High-end e-commerce hero shot.');
  }

  parts.push('Sharp focus, professional studio lighting, 1:1 square. Product identical to reference image. Do NOT add any features, colors, or materials not visible in the reference image.');
  return parts.join(' ');
}

// SOCIAL POST: Priority = aspirational Instagram-style product hero shot (3:4 portrait)
// Uses FAL nano-banana-pro with reference image, same as lifestyle/product
function buildSocialPrompt(visual, brandName) {
  var parts = [];
  parts.push('CRITICAL: Do NOT render any text, words, letters, logos, watermarks. Pure visual scene only.');
  parts.push('This MUST look like a real photograph taken for a brand Instagram account — NOT an AI-generated image. Real textures, natural lighting, genuine environment, authentic materials.');

  if (window._battleProductImages && window._battleProductImages.length > 0) {
    parts.push('A reference product image is provided. The product MUST be identical to the reference image. Do NOT add, change, or invent any product details — no extra colors, no extra materials, no extra features. The reference image is the ONLY source of truth for the product appearance.');
  }

  if (visual.imagePrompt) {
    parts.push(sanitizeImagePrompt(visual.imagePrompt));
  } else {
    parts.push('Premium social media photograph for ' + brandName + '. The exact product from the reference image is the hero, naturally placed in a real-world aspirational scene. Product clearly visible and prominent. Beautiful composition suitable for Instagram feed. Professional photography, natural lighting.');
  }

  parts.push('3:4 portrait format. Shallow depth of field. The product is the central focus. Real photograph aesthetic — natural color grading, genuine textures, film-quality look. No text, no logos. Do NOT add any features to the product not visible in the reference image.');
  return parts.join(' ');
}

async function generateConceptImages(visuals, brandName) {
  // Run sequentially to avoid FAL queue overload (concurrent requests cause timeouts)
  for (var i = 0; i < visuals.length; i++) {
    var vType = VISUAL_TYPES.find(function(vt) { return vt.key === visuals[i].type; }) || VISUAL_TYPES[i % 3];
    await generateSingleConceptImage(visuals[i], brandName, i, vType);
    // Brief pause between requests to let FAL queue breathe
    if (i < visuals.length - 1) {
      await new Promise(function(r) { setTimeout(r, 1500); });
    }
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

    // Try up to 3 attempts — auto-retry on failure (3rd image often hits rate limits)
    var imageUrl = null;
    for (var attempt = 1; attempt <= 3; attempt++) {
      try {
        var res = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          var errData = await res.json().catch(function() { return {}; });
          console.warn('[concept ' + index + '] FAL attempt ' + attempt + ' failed:', errData.error || res.status);
          if (attempt < 3) { await new Promise(function(r) { setTimeout(r, 2000); }); continue; }
          break;
        }

        var data = await res.json();
        if (!data.image_url) {
          console.warn('[concept ' + index + '] No image_url in attempt ' + attempt);
          if (attempt < 3) { await new Promise(function(r) { setTimeout(r, 2000); }); continue; }
          break;
        }

        // Trust the server — FAL returned COMPLETED so the image exists.
        // Skip client-side verification which causes false failures due to CORS/CDN timing.
        imageUrl = data.image_url;
        break; // success
      } catch (retryErr) {
        console.warn('[concept ' + index + '] Attempt ' + attempt + ' exception:', retryErr.message);
        if (attempt < 3) { await new Promise(function(r) { setTimeout(r, 2000); }); continue; }
      }
    }

    if (!imageUrl) {
      console.error('[concept ' + index + '] All attempts failed');
      showFallbackConcept(wrapperEl, visual, vType);
      return;
    }

    // Render the generated image with fallback via image proxy on error
    var proxyUrl = '/api/image-proxy?url=' + encodeURIComponent(imageUrl);
    wrapperEl.innerHTML =
      '<img class="ai-concept-image" src="' + imageUrl + '" ' +
        'alt="' + escBattle(brandName) + ' ' + escBattle(vType.label) + '" ' +
        'onerror="if(!this.dataset.retried){this.dataset.retried=\'1\';this.src=\'' + proxyUrl + '\'}">' +
      '<div class="ai-concept-badge">AI GENERATED</div>';
    console.log('[concept ' + index + '] Image rendered (' + visual.type + '):', imageUrl.substring(0, 80));

  } catch(err) {
    console.error('[concept ' + index + '] Exception:', err.message);
    showFallbackConcept(wrapperEl, visual, vType);
  }
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
        var actLabel = a.label != null ? a.label : ('Act ' + (a.act != null ? a.act : ''));
        var actDesc = a.desc != null ? a.desc : (a.text || '');
        sHtml += '<div class="story-act"><div class="act-label">' + escBattle(actLabel) + '</div>' +
          '<div class="act-desc">' + escBattle(actDesc) + '</div></div>';
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
    '<button class="btn-ghost" onclick="downloadPlaybookPdf()">Download Full Strategy PDF</button></div>';
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

// ══════════════════════════════════════════════════════════
// BATTLE PLAYBOOK PDF — built from battleCardData.strategy (jsPDF)
// ══════════════════════════════════════════════════════════

function pdfSafeFileName(name) {
  return String(name || 'Fynd-Brand').replace(/[^a-z0-9\-]+/gi, '-').replace(/^-|-$/g, '') || 'Fynd-Brand';
}

function pdfWriteLines(doc, text, margin, maxW, startY, lineH, pageH) {
  var y = startY;
  var lines = doc.splitTextToSize(String(text || ''), maxW);
  for (var i = 0; i < lines.length; i++) {
    if (y + lineH > pageH - 12) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines[i], margin, y);
    y += lineH;
  }
  return y;
}

function downloadPlaybookPdf() {
  if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
    if (typeof showToast === 'function') {
      showToast('error', 'PDF unavailable', 'Could not load the PDF engine. Please refresh the page.');
    }
    return;
  }
  if (!battleCardData || !battleCardData.strategy) {
    if (typeof showToast === 'function') {
      showToast('info', 'Strategy required', 'Open Battle Cards, go to the Strategy tab, and generate your campaign strategy. Then download again.');
    }
    return;
  }

  var JsPDF = window.jspdf.jsPDF;
  var s = battleCardData.strategy;
  var brandName = window._battleBrand || (typeof brandContext !== 'undefined' && brandContext.name) || 'Brand';
  var category = (typeof brandContext !== 'undefined' && brandContext.category) || 'Category';
  var catLabel = s.categoryLabel || category;

  var doc = new JsPDF({ unit: 'mm', format: 'a4' });
  var pageW = doc.internal.pageSize.getWidth();
  var pageH = doc.internal.pageSize.getHeight();
  var margin = 14;
  var maxW = pageW - 2 * margin;
  var y = margin;
  var lineH = 5;
  var smallH = 4.5;

  function newPage() {
    doc.addPage();
    y = margin;
  }

  function heading(text, size) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(size || 14);
    if (y + 6 > pageH - 15) newPage();
    y += 4;
    doc.text(String(text), margin, y);
    y += size > 12 ? 14 : 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('AI Campaign Strategy', margin, y);
  y += 12;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60);
  y = pdfWriteLines(doc, 'Ogilvy India Formula · ' + brandName + ' · ' + catLabel, margin, maxW, y, smallH, pageH);
  doc.setTextColor(0);
  y = pdfWriteLines(doc, 'Generated ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), margin, maxW, y, smallH, pageH);
  y += 6;

  heading('The Slogan', 14);
  doc.setFont('helvetica', 'italic');
  y = pdfWriteLines(doc, '"' + (s.slogan || '') + '"', margin, maxW, y, lineH, pageH);
  doc.setFont('helvetica', 'normal');
  if (s.sloganTranslation) {
    y = pdfWriteLines(doc, '"' + s.sloganTranslation + '"', margin, maxW, y, lineH, pageH);
  }
  y = pdfWriteLines(doc, s.sloganExplain || '', margin, maxW, y, lineH, pageH);
  y += 4;

  heading('Product truth & human emotion', 12);
  y = pdfWriteLines(doc, 'Product truth: ' + (s.productTruth || ''), margin, maxW, y, lineH, pageH);
  y = pdfWriteLines(doc, 'Human emotion: ' + (s.humanEmotion || ''), margin, maxW, y, lineH, pageH);
  y += 4;

  heading('The three-act formula', 12);
  y = pdfWriteLines(doc, 'The product is never the hero. The situation is the hero. The product is the punchline.', margin, maxW, y, lineH, pageH);
  y = pdfWriteLines(doc, 'Act 1 (0–7s): Set up a recognisable social situation. No brand. No product.', margin, maxW, y, lineH, pageH);
  y = pdfWriteLines(doc, 'Act 2 (8–22s): Escalate tension. The character faces a choice between conformity and self-expression.', margin, maxW, y, lineH, pageH);
  y = pdfWriteLines(doc, 'Act 3 (23–30s): Character chooses freedom. The ' + brandName + ' product appears naturally — slogan fades in.', margin, maxW, y, lineH, pageH);
  y += 4;

  if (s.themes && s.themes.length) {
    heading('Campaign themes', 12);
    s.themes.forEach(function(t, i) {
      y = pdfWriteLines(doc, (i + 1) + '. ' + (t.name || '') + ' — ' + (t.sub || ''), margin, maxW, y, lineH, pageH);
      y = pdfWriteLines(doc, t.desc || '', margin, maxW, y, smallH, pageH);
      y += 2;
    });
    y += 2;
  }

  if (s.stories && s.stories.length) {
    heading('Story plots', 12);
    s.stories.forEach(function(story) {
      y = pdfWriteLines(doc, (story.themeTag || '') + ': ' + (story.title || ''), margin, maxW, y, lineH, pageH);
      (story.acts || []).forEach(function(a) {
        var actLabel = a.label != null ? a.label : ('Act ' + (a.act != null ? a.act : ''));
        var actDesc = a.desc != null ? a.desc : (a.text || '');
        y = pdfWriteLines(doc, '  • ' + actLabel + ': ' + actDesc, margin, maxW, y, smallH, pageH);
      });
      y += 3;
    });
  }

  if (s.pitfalls && s.pitfalls.length) {
    heading('Common pitfalls to avoid', 12);
    s.pitfalls.forEach(function(p) {
      y = pdfWriteLines(doc, '• ' + String(p), margin, maxW, y, lineH, pageH);
    });
  }

  // Footer on last page
  if (y + 12 > pageH - 10) newPage();
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text('Fynd Studio — AI-Powered Creative Intelligence', margin, pageH - 10);
  doc.setTextColor(0);

  doc.save(pdfSafeFileName(brandName) + '-Campaign-Strategy.pdf');
  if (typeof showToast === 'function') {
    showToast('success', 'PDF ready', 'Your campaign strategy PDF has been downloaded.');
  }
}
