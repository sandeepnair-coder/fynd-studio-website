// ══════════════════════════════════════════════════════════
// CAMPAIGN PROPOSAL — AI-POWERED BRAND STRATEGY GENERATOR
// Generates a premium single-page campaign proposal
// for the analysed brand
// ══════════════════════════════════════════════════════════

var campaignProposalData = null;
window._proposalBrand = null;

// ── DUMMY CAMPAIGN PROPOSAL DATA ──
var DUMMY_PROPOSAL_DATA = {
  brandName: 'Bewakoof',
  heroSubheading: 'Where streetwear meets storytelling.',
  heroOpportunity: 'Your brand has the audience. We\'ll build the creative engine to turn attention into revenue — powered by AI.',
  positioningLine: 'From meme brand to culture brand.',

  snapshot: {
    what: 'India\'s #1 youth D2C fashion brand. Graphic tees, pop-culture merch, irreverent voice.',
    sells: 'Casual wear at ₹299–₹999. Tees, joggers, accessories for Gen-Z.',
    audience: '18–28 year olds. Metro + Tier-2. Digitally native, meme-literate.',
    distinctive: 'Genuine cultural fluency — speaks internet language like no other Indian D2C brand.',
    vibe: 'Bold, loud, meme-first. Bright colors, playful type. High-volume but creatively repetitive.'
  },

  opportunity: 'Competitors are closing in. Your audience is growing up. The meme playbook is hitting diminishing returns. Time to evolve from viral novelty to lasting cultural brand.',

  insights: [
    {
      title: 'Memes ≠ Sales',
      explanation: 'Tons of laughs, very few "where do I buy this?" — entertainment isn\'t converting.'
    },
    {
      title: '40% Revenue, 5% Content',
      explanation: 'South & East India drive half the revenue, but almost zero regional content exists.'
    },
    {
      title: 'No Lifestyle Story',
      explanation: 'White backgrounds only. No styling, no context. Selling clothes, not a way of living.'
    }
  ],

  transformation: {
    from: 'Meme templates on repeat. One format, one language, one vibe.',
    to: 'Cultural content engine — regional, multi-format, commercially sharp.',
    explanation: 'Same voice. Higher ambition. AI handles the volume so costs don\'t inflate.'
  },

  campaign: {
    name: 'WEAR THE CULTURE',
    meaning: 'Bewakoof doesn\'t follow culture — it wears it. Every piece is a statement about what India\'s youth stand for.',
    fit: 'Elevates from meme references to real cultural expression — music, street art, regional identity.',
    scale: 'Wear the Drop. Wear the Festival. Wear the Region. One platform, endless chapters.'
  },

  solutions: [
    {
      name: 'AI Lookbook Engine',
      gap: 'Products on white backgrounds. No lifestyle, no context.',
      approach: '50+ AI lifestyle scenes per collection — campuses, festivals, cafes. Weekly refresh, localized.',
      whyWins: '3-week shoots become 48-hour drops. 85% lower cost, 10× more variety.'
    },
    {
      name: 'Regional Reels Factory',
      gap: '40% revenue from South/East, nearly zero regional content.',
      approach: '30+ localized Reels/month in Tamil, Telugu, Bengali, Kannada.',
      whyWins: '3.2× higher engagement. First-mover in regional youth fashion.'
    },
    {
      name: 'Shoppable Content System',
      gap: 'High engagement, low purchase intent.',
      approach: '40% entertainment, 30% styling, 20% shoppable, 10% UGC. All AI-assisted.',
      whyWins: '180% projected lift in social revenue within 90 days.'
    }
  ],

  variants: [
    { title: 'South India', desc: 'Onam & Pongal content in Tamil & Telugu.' },
    { title: 'East India', desc: 'Durga Puja drops in Bengali.' },
    { title: 'College Campuses', desc: 'Campus lookbooks & fest content.' },
    { title: 'Music & Nightlife', desc: 'Concert merch & festival outfits.' },
    { title: 'Tier-2 Cities', desc: 'Affordable style for Jaipur, Lucknow, Indore.' },
    { title: 'Drop Culture', desc: 'Limited-edition countdowns & unboxing.' }
  ],

  impact: [
    { statement: '10× faster — weekly lookbooks instead of monthly shoots.' },
    { statement: 'Regional coverage 5% → 40% — unlocking ₹2.5Cr+ in new markets.' },
    { statement: '180% projected lift in social-attributed revenue.' }
  ],

  cta: {
    heading: 'Let\'s Build This Together',
    description: 'First AI campaign in 48 hours. No retainer, no minimum.',
    primaryCta: 'Book a Strategy Call',
    secondaryCta: 'Download Proposal'
  },

  // Section images — dummy placeholders, will be replaced by AI-generated images later
  sectionImages: {
    hero:           'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',
    snapshot: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop'
    ],
    opportunity:    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    insights: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop'
    ],
    transformFrom:  'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=300&fit=crop',
    transformTo:    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=300&fit=crop',
    campaign:       'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=600&fit=crop',
    solutions: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=800&fit=crop'
    ],
    impact:         'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=300&fit=crop'
  }
};

// ── PROPOSAL LOADER ──
window._proposalLoaderStep = function(stepNum, pct) {
  var prog = document.getElementById('proposalLoadingProgress');
  for (var i = 1; i < stepNum; i++) {
    var prev = document.getElementById('pstep' + i);
    if (prev) prev.className = 'lstep done';
  }
  var cur = document.getElementById('pstep' + stepNum);
  if (cur) cur.className = 'lstep active';
  if (prog) prog.style.width = pct + '%';
};

function launchProposalGeneration(brandName, category, segment) {
  var overlay = document.getElementById('proposalLoadingOverlay');
  if (!overlay) return;

  var brandEl = document.getElementById('proposalAnalysingBrand');
  if (brandEl) brandEl.textContent = brandName;

  overlay.classList.add('show');
  if (typeof startLoadingDots === 'function') startLoadingDots();

  var prog = document.getElementById('proposalLoadingProgress');
  if (prog) {
    prog.style.animation = 'none';
    prog.offsetHeight;
    prog.style.width = '0%';
    prog.style.transition = 'none';
    prog.offsetHeight;
    prog.style.transition = 'width 0.8s ease';
  }

  [1,2,3,4,5].forEach(function(i) {
    var el = document.getElementById('pstep' + i);
    if (el) el.className = 'lstep';
  });

  window._proposalLoaderStep(1, 5);

  generateProposalData(brandName, category, segment).then(function(data) {
    campaignProposalData = data;
    window._proposalBrand = brandName;
    renderProposal(data, brandName, category);

    window._proposalLoaderStep(5, 100);
    setTimeout(function() {
      if (typeof stopLoadingDots === 'function') stopLoadingDots();
      overlay.classList.remove('show');
      _doShowPage('proposal');
    }, 600);
  }).catch(function(err) {
    console.error('Proposal generation failed:', err);
    if (typeof stopLoadingDots === 'function') stopLoadingDots();
    overlay.classList.remove('show');
    showToast('error', 'Generation Failed', 'Could not generate campaign proposal. Please try again.');
  });
}

// ── GENERATE PROPOSAL DATA ──
async function generateProposalData(brandName, category, segment) {
  if (USE_DUMMY_DATA) {
    // Simulate progressive loading
    await new Promise(r => setTimeout(r, 400));
    window._proposalLoaderStep(2, 25);
    await new Promise(r => setTimeout(r, 400));
    window._proposalLoaderStep(3, 50);
    await new Promise(r => setTimeout(r, 400));
    window._proposalLoaderStep(4, 75);
    await new Promise(r => setTimeout(r, 400));

    var data = JSON.parse(JSON.stringify(DUMMY_PROPOSAL_DATA));
    data.brandName = brandName;
    return data;
  }

  // LIVE MODE — call Claude API
  window._proposalLoaderStep(1, 10);

  // Fetch website content
  var siteContent = '';
  try {
    var siteRes = await fetch('/api/fetch-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://www.' + brandName.toLowerCase().replace(/\s+/g, '') + '.com' })
    });
    if (siteRes.ok) {
      var siteData = await siteRes.json();
      siteContent = siteData.content || '';
    }
  } catch(e) { console.warn('Could not fetch site:', e); }

  window._proposalLoaderStep(2, 30);

  var prompt = CAMPAIGN_PROPOSAL_PROMPT
    .replace(/{BRAND_NAME}/g, brandName)
    .replace(/{CATEGORY}/g, category || 'Not specified')
    .replace(/{SEGMENT}/g, segment || 'Not specified')
    .replace(/{SITE_CONTENT}/g, siteContent.substring(0, 1500));

  window._proposalLoaderStep(3, 50);

  var res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 2500,
      system: 'You are a senior brand strategist and creative director. Return ONLY valid JSON — no markdown, no explanation.'
    })
  });

  window._proposalLoaderStep(4, 75);

  if (!res.ok) throw new Error('Claude API failed');
  var result = await res.json();
  var text = (result.content || result.text || '').trim();

  // Extract JSON
  var jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in response');
  return JSON.parse(jsonMatch[0]);
}

var CAMPAIGN_PROPOSAL_PROMPT = `You are a senior brand strategist crafting a premium campaign proposal for {BRAND_NAME}.

Brand Category: {CATEGORY}
Brand Segment: {SEGMENT}
Website Content: {SITE_CONTENT}

Generate a campaign proposal as JSON with this EXACT structure:
{
  "brandName": "{BRAND_NAME}",
  "heroSubheading": "A sharp, strategic tagline for the proposal",
  "heroOpportunity": "One compelling paragraph about the campaign opportunity",
  "positioningLine": "One concise line framing the proposal",
  "snapshot": {
    "what": "What the brand is",
    "sells": "What it sells and price positioning",
    "audience": "Target audience description",
    "distinctive": "What makes it distinctive",
    "vibe": "Brand visual language and tone"
  },
  "opportunity": "A persuasive paragraph about why now is the moment for this brand",
  "insights": [
    { "title": "Insight title", "explanation": "Brief, sharp explanation" },
    { "title": "Insight title", "explanation": "Brief, sharp explanation" },
    { "title": "Insight title", "explanation": "Brief, sharp explanation" }
  ],
  "transformation": {
    "from": "Current state description",
    "to": "Desired future state description",
    "explanation": "How the brand can evolve"
  },
  "campaign": {
    "name": "CAMPAIGN PLATFORM NAME",
    "meaning": "What it means",
    "fit": "Why it fits the brand",
    "scale": "How it scales across formats"
  },
  "solutions": [
    {
      "name": "Solution name",
      "gap": "What is currently missing",
      "approach": "What we would create",
      "whyWins": "Why this is effective"
    },
    {
      "name": "Solution name",
      "gap": "What is currently missing",
      "approach": "What we would create",
      "whyWins": "Why this is effective"
    },
    {
      "name": "Solution name",
      "gap": "What is currently missing",
      "approach": "What we would create",
      "whyWins": "Why this is effective"
    }
  ],
  "variants": [
    { "title": "Variant name", "desc": "Description of variant" },
    { "title": "Variant name", "desc": "Description of variant" },
    { "title": "Variant name", "desc": "Description of variant" },
    { "title": "Variant name", "desc": "Description of variant" },
    { "title": "Variant name", "desc": "Description of variant" },
    { "title": "Variant name", "desc": "Description of variant" }
  ],
  "impact": [
    { "statement": "Concise impact statement with specific metrics" },
    { "statement": "Concise impact statement with specific metrics" },
    { "statement": "Concise impact statement with specific metrics" }
  ],
  "cta": {
    "heading": "CTA heading",
    "description": "CTA description",
    "primaryCta": "Primary button text",
    "secondaryCta": "Secondary button text"
  }
}

Make it brand-specific, strategically sharp, and commercially persuasive. Return ONLY valid JSON.`;

// ── SAFE HTML ESCAPING ──
function escProposal(str) {
  if (!str) return '';
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── RENDER PROPOSAL ──
function renderProposal(data, brandName, category) {
  var imgs = data.sectionImages || {};

  // S0: Hero
  var titleEl = document.getElementById('proposalBrandTitle');
  if (titleEl) titleEl.textContent = escProposal(data.brandName || brandName);
  var subEl = document.getElementById('proposalHeroSub');
  if (subEl) subEl.textContent = data.heroOpportunity || '';
  if (imgs.hero) { var heroBg = document.getElementById('propHeroBg'); if (heroBg) heroBg.src = imgs.hero; }

  // S1: Brand Snapshot — 3-col image cards (Fynd pattern)
  var snapImgs = Array.isArray(imgs.snapshot) ? imgs.snapshot : [
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=400&fit=crop'
  ];
  var snapEl = document.getElementById('proposalSnapshotContent');
  if (snapEl && data.snapshot) {
    var cards = [
      { label: 'What It Is', val: data.snapshot.what, img: snapImgs[0], wide: false },
      { label: 'What It Sells', val: data.snapshot.sells, img: snapImgs[1], wide: false },
      { label: 'Who It Serves', val: data.snapshot.audience, img: snapImgs[2], wide: false },
      { label: 'What Makes It Different', val: data.snapshot.distinctive, img: snapImgs[3], wide: true },
      { label: 'Brand Vibe', val: data.snapshot.vibe, img: snapImgs[4], wide: false }
    ];
    snapEl.innerHTML = '<div class="prop-s1-grid">' + cards.map(function(c) {
      var wideClass = c.wide ? ' prop-s1-card--wide' : '';
      return '<div class="prop-s1-card' + wideClass + '">' +
        '<img src="' + c.img + '" alt="" class="prop-s1-card-img">' +
        '<div class="prop-s1-card-body">' +
          '<div class="prop-s1-card-label">' + c.label + '</div>' +
          '<div class="prop-s1-card-val">' + escProposal(c.val) + '</div>' +
        '</div>' +
      '</div>';
    }).join('') + '</div>';
  }

  // S2: Opportunity — editorial with float image
  var oppEl = document.getElementById('proposalOpportunityContent');
  if (oppEl) {
    var oppImg = imgs.opportunity ? '<img src="' + imgs.opportunity + '" alt="" class="prop-s2-img">' : '';
    oppEl.innerHTML = oppImg + '<p class="prop-s2-text">' + escProposal(data.opportunity) + '</p>';
    if (data.positioningLine) {
      oppEl.innerHTML += '<div class="prop-s2-quote">' + escProposal(data.positioningLine) + '</div>';
    }
  }

  // S3: Key Insights — image-dominant cards (Fynd pattern)
  var insGrid = document.getElementById('proposalInsightsGrid');
  if (insGrid && data.insights) {
    var insImgs = Array.isArray(imgs.insights) ? imgs.insights : [];
    insGrid.innerHTML = '<div class="prop-s3-grid">' + data.insights.map(function(ins, i) {
      var imgSrc = insImgs[i] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop';
      return '<div class="prop-s3-card">' +
        '<img src="' + imgSrc + '" alt="" class="prop-s3-img">' +
        '<div class="prop-s3-card-body">' +
          '<div class="prop-s3-num">0' + (i+1) + '</div>' +
          '<div class="prop-s3-insight-title">' + escProposal(ins.title) + '</div>' +
          '<div class="prop-s3-insight-desc">' + escProposal(ins.explanation) + '</div>' +
        '</div>' +
      '</div>';
    }).join('') + '</div>';
  }

  // S4: Transformation — dark before/after panels with images
  var transEl = document.getElementById('proposalTransformationContent');
  if (transEl && data.transformation) {
    var fromImg = imgs.transformFrom || 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=300&fit=crop';
    var toImg = imgs.transformTo || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=300&fit=crop';
    transEl.innerHTML =
      '<div class="prop-s4-panels">' +
        '<div class="prop-s4-panel prop-s4-panel--from">' +
          '<img src="' + fromImg + '" alt="" class="prop-s4-panel-img">' +
          '<div class="prop-s4-panel-body"><div class="prop-s4-panel-label">From</div><div class="prop-s4-panel-text">' + escProposal(data.transformation.from) + '</div></div>' +
        '</div>' +
        '<div class="prop-s4-arrow"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>' +
        '<div class="prop-s4-panel prop-s4-panel--to">' +
          '<img src="' + toImg + '" alt="" class="prop-s4-panel-img">' +
          '<div class="prop-s4-panel-body"><div class="prop-s4-panel-label">To</div><div class="prop-s4-panel-text">' + escProposal(data.transformation.to) + '</div></div>' +
        '</div>' +
      '</div>' +
      '<p class="prop-s4-explanation">' + escProposal(data.transformation.explanation) + '</p>';
  }

  // S5: Campaign Platform — name on hero image + detail cards
  var campNameEl = document.getElementById('proposalCampaignName');
  if (campNameEl && data.campaign) campNameEl.textContent = escProposal(data.campaign.name);
  if (imgs.campaign) { var campImg = document.querySelector('.prop-s5-hero-img'); if (campImg) campImg.src = imgs.campaign; }
  var campEl = document.getElementById('proposalCampaignContent');
  if (campEl && data.campaign) {
    campEl.innerHTML =
      '<div class="prop-s5-details">' +
        '<div class="prop-s5-detail"><div class="prop-s5-detail-label">What It Means</div><p>' + escProposal(data.campaign.meaning) + '</p></div>' +
        '<div class="prop-s5-detail"><div class="prop-s5-detail-label">Why It Fits</div><p>' + escProposal(data.campaign.fit) + '</p></div>' +
        '<div class="prop-s5-detail"><div class="prop-s5-detail-label">How It Scales</div><p>' + escProposal(data.campaign.scale) + '</p></div>' +
      '</div>';
  }

  // S6: Solutions — horizontal image+content cards
  var solGrid = document.getElementById('proposalSolutionsGrid');
  if (solGrid && data.solutions) {
    var solImgs = Array.isArray(imgs.solutions) ? imgs.solutions : [];
    solGrid.innerHTML = data.solutions.map(function(sol, i) {
      var imgSrc = solImgs[i] || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=800&fit=crop';
      return '<div class="prop-s6-card">' +
        '<img src="' + imgSrc + '" alt="" class="prop-s6-card-img">' +
        '<div class="prop-s6-card-body">' +
          '<div class="prop-s6-card-num">Solution ' + (i+1) + '</div>' +
          '<div class="prop-s6-card-name">' + escProposal(sol.name) + '</div>' +
          '<div class="prop-s6-section"><div class="prop-s6-section-label">The Gap</div><p>' + escProposal(sol.gap) + '</p></div>' +
          '<div class="prop-s6-section"><div class="prop-s6-section-label">Our Approach</div><p>' + escProposal(sol.approach) + '</p></div>' +
          '<div class="prop-s6-section prop-s6-section--win"><div class="prop-s6-section-label">Why It Wins</div><p>' + escProposal(sol.whyWins) + '</p></div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  // S7: Variants — color-coded bento grid
  var varGrid = document.getElementById('proposalVariantsGrid');
  var varColors = ['blue', 'green', 'gold', 'lavender', 'peach', 'red'];
  if (varGrid && data.variants) {
    varGrid.innerHTML = '<div class="prop-s7-bento">' + data.variants.map(function(v, i) {
      var colorClass = 'prop-s7-card--' + (varColors[i] || 'blue');
      return '<div class="prop-s7-card ' + colorClass + '">' +
        '<div class="prop-s7-card-title">' + escProposal(v.title) + '</div>' +
        '<div class="prop-s7-card-desc">' + escProposal(v.desc) + '</div>' +
      '</div>';
    }).join('') + '</div>';
  }

  // S8: Impact — numbered stat cards
  var impGrid = document.getElementById('proposalImpactGrid');
  if (impGrid && data.impact) {
    impGrid.innerHTML = '<div class="prop-s8-cards">' + data.impact.map(function(imp, i) {
      return '<div class="prop-s8-card">' +
        '<div class="prop-s8-num">0' + (i+1) + '</div>' +
        '<div class="prop-s8-text">' + escProposal(imp.statement) + '</div>' +
      '</div>';
    }).join('') + '</div>';
  }
  // Trailing image is optional; only update if present in markup.
  if (imgs.impact) { var impImg = document.getElementById('propImgImpact'); if (impImg) impImg.src = imgs.impact; }

  // S9: CTA
  if (data.cta) {
    var ctaTitle = document.getElementById('proposalCtaTitle');
    var ctaDesc = document.getElementById('proposalCtaDesc');
    if (ctaTitle) ctaTitle.textContent = data.cta.heading || 'Ready to Transform Your Brand?';
    if (ctaDesc) ctaDesc.textContent = data.cta.description || '';
  }
}
