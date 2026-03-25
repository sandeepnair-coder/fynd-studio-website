// ═══════════════════════════════════════════════════
// ANIMATED LOADING DOTS — cycles "." ".." "..." on active loading steps
// ═══════════════════════════════════════════════════
var _loadingDotsTimer = null;
function startLoadingDots() {
  stopLoadingDots();
  var dotCount = 0;
  _loadingDotsTimer = setInterval(function() {
    dotCount = (dotCount % 3) + 1;
    var dots = '.'.repeat(dotCount);
    document.querySelectorAll('.lstep.active').forEach(function(el) {
      var span = el.querySelector('.ldots');
      if (!span) {
        span = document.createElement('span');
        span.className = 'ldots';
        span.style.cssText = 'letter-spacing:2px;margin-left:2px;display:inline;min-width:18px;text-align:left';
        el.appendChild(span);
      }
      span.textContent = dots;
    });
  }, 400);
}
function stopLoadingDots() {
  if (_loadingDotsTimer) { clearInterval(_loadingDotsTimer); _loadingDotsTimer = null; }
  document.querySelectorAll('.ldots').forEach(function(el) { el.remove(); });
}

// ═══════════════════════════════════════════════════
// API MODE — controlled by nav toggle switch
// ═══════════════════════════════════════════════════
var USE_DUMMY_DATA = (function() {
  var stored = localStorage.getItem('fynd_api_mode');
  return stored === null ? true : stored !== 'live';
})();

function toggleApiMode(isLive) {
  USE_DUMMY_DATA = !isLive;
  localStorage.setItem('fynd_api_mode', isLive ? 'live' : 'demo');
  var label = document.getElementById('apiToggleLabel');
  if (label) {
    label.textContent = isLive ? 'Live' : 'Demo';
    label.classList.toggle('live', isLive);
  }
}

// Restore toggle state on page load
document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById('apiToggle');
  var label = document.getElementById('apiToggleLabel');
  if (toggle) {
    var isLive = !USE_DUMMY_DATA;
    toggle.checked = isLive;
    if (label) {
      label.textContent = isLive ? 'Live' : 'Demo';
      label.classList.toggle('live', isLive);
    }
  }
});

var DUMMY_ANALYSIS_DATA = {
  scores: { velocity: 34, stagnation: 'HIGH', regional: 62, ai: 18, platform: 41 },
  overallGrade: 'C+',
  topInsight: 'Creative output is 4× below category leaders — high stagnation risk with untapped regional and AI potential.',
  savings: '₹62L',
  breakdown: [
    { item: 'Campaign Shoots', trad: '₹18L', ai: '₹3.5L' },
    { item: 'Social Creatives', trad: '₹12L', ai: '₹2L' },
    { item: 'Festival Campaigns', trad: '₹25L', ai: '₹8L' },
    { item: 'Video Content', trad: '₹15L', ai: '₹4L' }
  ],
  savingsMethodology: 'Based on Indian D2C category averages for brands with ₹50-200Cr annual revenue. Traditional costs from agency rate cards; AI costs from Fynd Studio production benchmarks.',
  scoreMethodology: {
    velocity:   { confidence: 'HIGH',   method: 'Instagram post frequency analysis vs category avg (45 posts/mo)', benchmark: 'Top 10 D2C fashion brands in India' },
    stagnation: { confidence: 'MEDIUM', method: 'Creative format diversity + refresh rate over 90 days',           benchmark: 'Industry standard: 30% new formats/quarter' },
    regional:   { confidence: 'MEDIUM', method: 'Regional language content ratio + geo-targeted campaigns',        benchmark: 'Category leaders: 40%+ regional content' },
    ai:         { confidence: 'HIGH',   method: 'AI tool adoption assessment across creative workflow',            benchmark: 'Industry average: 35% AI adoption' },
    platform:   { confidence: 'MEDIUM', method: 'Platform-specific content optimization score',                    benchmark: 'Best-in-class: 80%+ platform optimization' }
  },
  alerts: [
    { type: 'red',    icon: '●', text: '<strong>Content Velocity:</strong> Posting 4× less than category leaders. Algorithm visibility dropping.' },
    { type: 'yellow', icon: '●', text: '<strong>Festival Gap:</strong> Missing Onam, Pongal & Eid campaigns for South & West India.' },
    { type: 'blue',   icon: '●', text: '<strong>AI Strategy Ready:</strong> AI can generate full 3-act campaign strategy in seconds.' }
  ],
  regions: [
    { name: 'North India',  score: 78 },
    { name: 'West India',   score: 65 },
    { name: 'South India',  score: 38 },
    { name: 'East India',   score: 22 },
    { name: 'Northeast',    score: 12 }
  ],
  priorities: [
    { rank: 1, action: 'Launch regional festival campaigns for South & East India',      impact: '+₹8L estimated monthly reach uplift',    timeline: 'IMMEDIATE · 2 WEEKS' },
    { rank: 2, action: 'Adopt AI-powered creative generation for social content',         impact: '4× content velocity at 70% lower cost',  timeline: 'SHORT TERM · 30 DAYS' },
    { rank: 3, action: 'Diversify creative formats — add Reels, carousels, UGC',          impact: '+45% engagement rate improvement',        timeline: 'MEDIUM TERM · 60 DAYS' }
  ],
  competitorBenchmark: {
    summary: 'Brand is significantly behind category leaders in content velocity and AI adoption. Competitors post 4× more frequently with 60% higher engagement rates.',
    postsPerMonth: 12,
    categoryLeaderPosts: 48,
    aiAdoptionPct: 15,
    categoryAvgAiPct: 38
  },
  dataSources: [
    'Social media analytics platforms',
    'Indian fashion industry reports',
    'D2C brand performance benchmarks',
    'E-commerce marketplace data'
  ],
  analysisDisclaimer: 'Metrics are AI-estimated based on brand knowledge and category benchmarks; actual values may vary.'
};

// ── MOBILE NAV TOGGLE ──
function toggleMobileNav() {
  document.querySelector('.nav-links').classList.toggle('nav-open');
}
// Close mobile nav when a link is clicked
document.addEventListener('click', function(e) {
  if (e.target.closest('.nav-links button:not(.nav-cta)') || e.target.closest('.nav-links .nav-cta')) {
    document.querySelector('.nav-links').classList.remove('nav-open');
  }
});

// ── THEME TOGGLE (dark/light mode) ──
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
// Apply saved theme on load (default to dark)
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    // light mode - don't add dark class
  } else {
    document.documentElement.classList.add('dark');
  }
})();

// Hero rotation removed — static text

// ── BRAND CONTEXT ──
var brandContext = {
  name: sessionStorage.getItem('fyndBrandName') || 'Your Brand',
  category: sessionStorage.getItem('fyndBrandCategory') || 'D2C / E-Commerce',
  segment: sessionStorage.getItem('fyndBrandSegment') || 'Premium Mid-Market'
};

function saveBrandContext(name, category, segment) {
  brandContext.name = name || 'Your Brand';
  brandContext.category = category || 'D2C / E-Commerce';
  brandContext.segment = segment || 'Premium Mid-Market';
  try {
    sessionStorage.setItem('fyndBrandName', brandContext.name);
    sessionStorage.setItem('fyndBrandCategory', brandContext.category);
    sessionStorage.setItem('fyndBrandSegment', brandContext.segment);
  } catch(e) {}
}

function personalizeBattleCards() {
  var bn = brandContext.name;
  var cat = brandContext.category;
  if (bn === 'Your Brand') return;

  // Update header areas
  var el;
  if(el=document.getElementById('playbookTitle')) el.textContent = bn + ' · March 2026';
  
  // Update "Viewing report for" label
  document.querySelectorAll('.playbook-header span').forEach(function(s) {
    if (s.textContent.includes('Bewakoof') && !s.textContent.includes('Fashion')) {
      s.textContent = bn;
    }
    if (s.textContent.includes('Fashion & Apparel')) {
      s.textContent = '· ' + cat + ' · March 2026';
    }
  });

  // Update battle hero preview
  var hcpLabel = document.querySelector('.hcp-label');
  if (hcpLabel) hcpLabel.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Live Battle Card Preview · ' + bn;

  // Safe deep replacement: walk ALL text nodes in battle page
  // This is DOM-safe — doesn't destroy/re-create elements
  var battlePage = document.getElementById('page-battle');
  if (!battlePage) return;

  var walker = document.createTreeWalker(battlePage, NodeFilter.SHOW_TEXT, null, false);
  var node, nodesToFix = [];
  while (node = walker.nextNode()) {
    if (node.nodeValue && node.nodeValue.indexOf('Bewakoof') !== -1 
        && node.parentElement.tagName !== 'SCRIPT' 
        && node.parentElement.tagName !== 'INPUT'
        && node.parentElement.tagName !== 'TEXTAREA') {
      nodesToFix.push(node);
    }
  }
  // Apply replacements after walking (safe — no DOM mutation during walk)
  nodesToFix.forEach(function(n) {
    n.nodeValue = n.nodeValue.replace(/Bewakoof/g, bn);
  });

  // Update category label if not default
  if (cat && cat !== 'D2C / E-Commerce') {
    var catShort = cat.split('/')[0].trim().split('·')[0].trim();
    var ogilbyLabel = battlePage.querySelector('[style*="Ogilvy India Formula"]');
    if (ogilbyLabel && ogilbyLabel.textContent.indexOf('Fashion & Apparel') !== -1) {
      ogilbyLabel.textContent = ogilbyLabel.textContent.replace('Fashion & Apparel', catShort);
    }
  }
}

// ── PAGE NAV ──
function showPage(id) {
  // Intercept battle card navigation — require analysis first, then generate with loader
  if (id === 'battle') {
    var bn = brandContext.name;
    if (USE_DUMMY_DATA && (!bn || bn === 'Your Brand')) {
      // In dummy mode, auto-set brand context so battle cards work without analysis
      saveBrandContext('Bewakoof', 'Fashion & Apparel', 'Youth Streetwear');
      bn = 'Bewakoof';
    }
    if (!bn || bn === 'Your Brand') {
      showToast('info', 'Run analysis first', 'Please analyse a brand on the Creative Intel page before viewing Battle Cards.', 5000);
      showPage('intel');
      return;
    }
    // If battle card data already generated for this brand, just show the page
    if (battleCardData && window._battleBrand === bn) {
      _doShowPage('battle');
      return;
    }
    // Otherwise trigger generation with loader
    launchBattleCardGeneration(bn, brandContext.category, brandContext.segment);
    return;
  }
  // Intercept campaign proposal navigation — require analysis first, then generate
  if (id === 'proposal') {
    var pbn = brandContext.name;
    if (USE_DUMMY_DATA && (!pbn || pbn === 'Your Brand')) {
      saveBrandContext('Bewakoof', 'Fashion & Apparel', 'Youth Streetwear');
      pbn = 'Bewakoof';
    }
    if (!pbn || pbn === 'Your Brand') {
      showToast('info', 'Run analysis first', 'Please analyse a brand on the Creative Intel page before generating a Campaign Proposal.', 5000);
      showPage('intel');
      return;
    }
    if (campaignProposalData && window._proposalBrand === pbn) {
      _doShowPage('proposal');
      return;
    }
    launchProposalGeneration(pbn, brandContext.category, brandContext.segment);
    return;
  }
  _doShowPage(id);
}

function _doShowPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  window.scrollTo(0,0);
  // Nav active state
  document.querySelectorAll('.nav-links button:not(.nav-cta)').forEach(function(btn) {
    btn.classList.remove('nav-active');
    if ((id === 'home' && btn.textContent.trim() === 'Home') ||
        (id === 'intel' && btn.textContent.trim() === 'Creative Intel') ||
        (id === 'battle' && btn.textContent.trim() === 'Battle Cards') ||
        (id === 'proposal' && btn.textContent.trim() === 'Campaign Proposal')) {
      btn.classList.add('nav-active');
    }
  });
  if (id === 'battle') { personalizeBattleCards(); }
  if (id === 'intel' && USE_DUMMY_DATA) {
    var brandName = 'Bewakoof';
    saveBrandContext(brandName, 'Fashion & Apparel', 'Youth Streetwear');
    var data = JSON.parse(JSON.stringify(DUMMY_ANALYSIS_DATA));
    renderResults(brandName, 'Fashion & Apparel', 'Youth Streetwear', data);
    document.getElementById('resultsSection').classList.add('visible');
    var analyzeBtn = document.getElementById('analyzeBtn');
    var analyzeBtnText = document.getElementById('btnText');
    if (analyzeBtn) analyzeBtn.classList.add('done');
    if (analyzeBtnText) analyzeBtnText.textContent = 'Re-analyse Brand';
  }
}

// ── BATTLE TABS ──
function switchBattleTab(id, el) {
  document.querySelectorAll('.btab').forEach(t => t.classList.remove('active'));
  if(el) el.classList.add('active');
  document.querySelectorAll('.btab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-'+id).classList.add('active');
  if(id === 'roi') { setTimeout(roiCalc, 60); }
  // Re-personalize when switching tabs to catch any remaining placeholders
  setTimeout(personalizeBattleCards, 100);
}

// ── TOAST SYSTEM ──
function showToast(type, title, msg, duration=4000) {
  const icons = { success:'<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', error:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>', info:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-icon">${icons[type]||'ℹ'}</div><div class="toast-body"><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>`;
  container.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// ── MODAL SYSTEM ──
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
  // Reset success views
  const modal = document.getElementById(id);
  modal.querySelectorAll('[id$="SuccessView"]').forEach(v => v.style.display='none');
  modal.querySelectorAll('[id$="FormView"]').forEach(v => v.style.display='');
}
// close on backdrop click
document.querySelectorAll('.modal-backdrop').forEach(b => {
  b.addEventListener('click', e => { if(e.target===b) closeModal(b.id); });
});

function submitDemo() {
  const name = document.getElementById('demoName').value.trim();
  const email = document.getElementById('demoEmail').value.trim();
  if(!name || !email) { showToast('error','Missing info','Please fill in your name and email.'); return; }
  document.getElementById('demoFormView').style.display='none';
  document.getElementById('demoSuccessView').style.display='block';
  showToast('success','Booking confirmed!',`We'll see you soon, ${name}.`);
}
function submitPDF() {
  const email = document.getElementById('pdfEmail').value.trim();
  if(!email) { showToast('error','Email required','Please enter your work email.'); return; }
  document.getElementById('pdfFormView').style.display='none';
  document.getElementById('pdfSuccessView').style.display='block';
  showToast('success','PDF sent!','Check your inbox in 2 minutes.');
}
function submitStrategist() {
  const brand = document.getElementById('stratBrand').value.trim();
  if(!brand) { showToast('error','Brand required','Please enter your brand name.'); return; }
  document.getElementById('stratFormView').style.display='none';
  document.getElementById('stratSuccessView').style.display='block';
  showToast('success','Request received!','A strategist will reach out within 24 hours.');
}

// ── STRATEGY GATE ──
function unlockStrategy() {
  var email = document.getElementById('strategyEmail');
  if (!email) return;
  var val = email.value.trim();
  if (!val || !val.includes('@') || !val.includes('.')) {
    showToast('error', 'Email required', 'Please enter a valid work email to unlock the strategy.');
    return;
  }
  var gate = document.getElementById('strategyGate');
  if (gate) gate.style.display = 'none';

  // Generate Ogilvy strategy on-demand (only after email)
  if (!window._ogilviGenerated) {
    generateOgilvyStrategy();
  } else {
    var content = document.getElementById('strategyContent');
    if (content) content.style.display = 'block';
    showToast('success', 'Strategy unlocked!', 'Full AI campaign strategy is now available.');
  }
}

function getApiHeaders() {
  return { 'Content-Type': 'application/json' };
}

// ── CACHE HELPERS — avoid repeat API calls for same brand ──
function getCacheKey(prefix, brandName) {
  return 'fynd_' + prefix + '_' + brandName.toLowerCase().replace(/\s+/g, '_');
}
function getCache(prefix, brandName, maxAgeMs) {
  try {
    var key = getCacheKey(prefix, brandName);
    var raw = localStorage.getItem(key);
    if (!raw) return null;
    var cached = JSON.parse(raw);
    if (Date.now() - cached._ts > (maxAgeMs || 3600000)) { // default 1hr
      localStorage.removeItem(key);
      return null;
    }
    return cached.data;
  } catch(e) { return null; }
}
function setCache(prefix, brandName, data) {
  try {
    var key = getCacheKey(prefix, brandName);
    localStorage.setItem(key, JSON.stringify({ _ts: Date.now(), data: data }));
  } catch(e) { /* quota exceeded — ignore */ }
}

// ── CLAUDE API — DUAL MODE (brand-audit endpoint + fallback) ──
async function callBrandAudit(brandName, category, segment, urls) {
  // Check cache first — same brand within 1 hour = skip API
  var cached = getCache('audit', brandName);
  if (cached) { console.log('[cache] Using cached audit for', brandName); return cached; }

  // Primary: dedicated brand-audit serverless function
  // Website content will be fetched server-side in brand-audit.js
  const res = await fetch('/api/brand-audit', {
    method: 'POST',
    headers: getApiHeaders(),
    body: JSON.stringify({ brandName, category, segment, urls })
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error || 'API error ' + res.status);
  }
  const result = await res.json();
  if (result.success && result.data) {
    setCache('audit', brandName, result.data);
    return result.data;
  }
  throw new Error('Unexpected API response format');
}

async function callClaude(systemPrompt, userPrompt, maxTokens) {
  // Generic Claude proxy (for Battle Cards etc.)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 65000); // 65s client timeout
  let res;
  try {
    res = await fetch('/api/claude', {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens || 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      }),
      signal: controller.signal
    });
  } catch(e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') throw new Error('Request timed out — the AI response was too large. Try again.');
    throw e;
  }
  clearTimeout(timeout);
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error?.message || 'API error ' + res.status);
  }
  const data = await res.json();
  const raw = data.content.map(i => i.text || '').join('');
  return raw.replace(/```json[\s\S]*?```|```[\s\S]*?```/g, m => m.replace(/```json|```/g, '')).trim();
}

async function runAnalysis() {
  const brandName = document.getElementById('brandName').value.trim() || 'Your Brand';
  const category  = document.getElementById('brandCategory').value || 'D2C / E-Commerce';
  const segment   = document.getElementById('brandSegment').value  || 'Premium Mid-Market';
  const urls      = Array.from(document.querySelectorAll('.brand-url-input'))
                        .map(i => i.value.trim()).filter(Boolean);

  // Save brand context for Battle Cards personalization
  saveBrandContext(brandName, category, segment);

  // ── UI: Loading state ──
  const btn = document.getElementById('analyzeBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  if (btn) { btn.disabled = true; btn.classList.remove('done'); }
  if (btnText) btnText.textContent = 'Analysing...';
  if (btnSpinner) btnSpinner.style.display = 'inline-block';

  document.getElementById('analysingBrand').textContent = brandName;
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('show');
  startLoadingDots();

  // Animate loading steps
  const prog = document.getElementById('loadingProgress');
  prog.style.animation = 'none'; prog.offsetHeight;
  prog.style.animation = 'load 4.5s ease-in-out forwards';
  [1,2,3,4,5].forEach(i => document.getElementById('step'+i).className = 'lstep');
  document.getElementById('step1').className = 'lstep active';
  const stepTimings = [[2,800],[3,1800],[4,2800],[5,3800]];
  stepTimings.forEach(([s,d]) => setTimeout(() => {
    document.getElementById('step'+(s-1)).className = 'lstep done';
    document.getElementById('step'+s).className = 'lstep active';
  }, d));

  let data;

  try {
    if (USE_DUMMY_DATA) {
      // ── Dummy data mode — no API call ──
      await new Promise(r => setTimeout(r, 1500)); // simulate brief loading
      data = JSON.parse(JSON.stringify(DUMMY_ANALYSIS_DATA));
      showToast('success', 'Analysis complete! (dummy data)', `${brandName} loaded with sample data.`);
    } else {
      // ── Live API call ──
      data = await callBrandAudit(brandName, category, segment, urls);
      showToast('success', 'AI Analysis complete!', `${brandName} creative health check generated by Claude.`);
    }
  } catch(err) {
    // ── No fallback — show error and stop ──
    stopLoadingDots();
    overlay.classList.remove('show');
    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'Analyse My Brand';
    if (btnSpinner) btnSpinner.style.display = 'none';

    let errorMsg = 'Could not fetch data: ' + err.message + '.';
    if (err.message.includes('API key not configured') || err.message.includes('ANTHROPIC_API_KEY')) {
      errorMsg = 'API key not configured. Check that ANTHROPIC_API_KEY is set in .env.local and restart vercel dev.';
    } else if (err.message.includes('401') || err.message.includes('invalid') || err.message.includes('authentication')) {
      errorMsg = 'Invalid API key. Please check your Anthropic API key at console.anthropic.com and update it in Vercel env vars.';
    } else if (err.message.includes('429') || err.message.includes('rate') || err.message.includes('credit') || err.message.includes('billing')) {
      errorMsg = 'Rate limited or insufficient credits. Check your Anthropic billing at console.anthropic.com/settings/billing.';
    } else if (err.message.includes('529') || err.message.includes('overloaded')) {
      errorMsg = 'Anthropic API is overloaded. Please try again in a few minutes.';
    } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
      errorMsg = 'No network connection detected. Please check your internet and try again.';
    } else if (err.message.includes('timed out')) {
      errorMsg = 'AI analysis timed out. Please try again — the server may be under heavy load.';
    }

    showToast('error', 'Analysis Failed', errorMsg, 8000);
    showAnalysisError(brandName, errorMsg);
    return;
  }

  // ── UI: Complete loading ──
  setTimeout(() => {
    stopLoadingDots();
    document.getElementById('step5').className = 'lstep done';
    overlay.classList.remove('show');
    renderResults(brandName, category, segment, data);


    // Reset button to secondary "Re-analyse" state
    if (btn) { btn.disabled = false; btn.classList.add('done'); }
    if (btnText) btnText.textContent = 'Re-analyse Brand';
    if (btnSpinner) btnSpinner.style.display = 'none';
  }, 4000);
}

function showAnalysisError(brandName, errorMsg) {
  document.getElementById('resultsSection').classList.add('visible');
  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });

  // Clear all result containers and show error state
  document.getElementById('brandAvatar').textContent = '!';
  document.getElementById('resultBrandName').textContent = brandName;
  document.getElementById('resultBrandMeta').textContent = 'Analysis failed · ' + new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'});
  document.getElementById('overallGrade').textContent = '—';
  document.getElementById('topInsight').textContent = errorMsg;
  document.getElementById('savingsAmount').textContent = '—';
  document.getElementById('savingsBreakdown').innerHTML = '';
  document.getElementById('transparencyBar').style.display = 'none';
  document.getElementById('sourcesSection').style.display = 'none';
  document.getElementById('savingsMethodologyWrap').style.display = 'none';
  ['velocity','stagnation','regional','ai','platform'].forEach(function(k) {
    var c = document.getElementById('conf-'+k); if(c) c.innerHTML = '';
    var m = document.getElementById('meth-'+k); if(m) { m.innerHTML = ''; m.classList.remove('open'); }
  });
  document.getElementById('alertList').innerHTML =
    '<div class="alert-item red" style="justify-content:center;text-align:center;padding:32px">' +
      '<div style="font-size:14px;color:var(--muted-foreground);line-height:1.7">' +
        '<strong style="font-size:16px;display:block;margin-bottom:12px">Could not fetch real-time data</strong>' +
        errorMsg + '<br><br>' +
        '<button class="btn-primary" onclick="runAnalysis()" style="margin-top:8px">Retry Analysis</button>' +
      '</div>' +
    '</div>';
  document.getElementById('regionalGrid').innerHTML = '';
  var prioEl = document.getElementById('priorityActions');
  if (prioEl) prioEl.innerHTML = '';
  var benchEl = document.getElementById('competitorBenchmark');
  if (benchEl) benchEl.innerHTML = '';

  // Reset scores to zero
  ['velocity','stagnation','regional','ai','platform'].forEach(function(id) {
    var ve = document.getElementById('score-' + id);
    var be = document.getElementById('bar-' + id);
    var de = document.getElementById('delta-' + id);
    if (ve) { ve.textContent = '—'; ve.className = 'dash-card-title tabnum'; }
    if (be) { be.style.width = '0%'; be.className = 'score-fill'; }
    if (de) de.textContent = 'No data available';
  });

  // Reset battle card data so user can't navigate to stale cards
  battleCardData = null;
  window._battleBrand = null;
}

function toggleMethod(id) {
  var el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function animVal(el, target) {
  let c = 0;
  const step = target / 60;
  const t = setInterval(() => {
    c = Math.min(target, c + step);
    el.textContent = Math.round(c);
    if (c >= target) clearInterval(t);
  }, 16);
}

function renderResults(brandName, category, segment, data) {
  // Store for battle card hero preview
  window.lastAnalysisData = data;
  // Avatar + header
  document.getElementById('brandAvatar').textContent    = brandName.charAt(0).toUpperCase();
  document.getElementById('resultBrandName').textContent = brandName;
  document.getElementById('resultBrandMeta').textContent = [category, segment, 'Analysed: ' + new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'})].filter(Boolean).join(' · ');

  // Scores — handle both old flat format and new nested format
  const sc = data.scores || data;
  // Defensive: parse to number, default to 0 if NaN/undefined
  function safeNum(v, fallback) { var n = parseInt(v, 10); return isNaN(n) ? (fallback || 0) : n; }
  var velVal = safeNum(sc.velocity, 35);
  var regVal = safeNum(sc.regional, 50);
  var aiVal  = safeNum(sc.ai, 20);
  var platVal = safeNum(sc.platform, 40);
  const stagNum = (sc.stagnation === 'HIGH' || sc.stagnation === 82) ? 82
                : (sc.stagnation === 'MEDIUM' || sc.stagnation === 55) ? 55 : 28;

  [
    { id:'velocity',   val: velVal,         color: velVal   < 50 ? 'danger' : 'warn',  delta: `↓ ${100-velVal}% below category leader` },
    { id:'stagnation', val: stagNum,        color: 'warn',                               delta: `${sc.stagnation || 'MEDIUM'} RISK — Creative fatigue detected` },
    { id:'regional',   val: regVal,         color: regVal   < 50 ? 'warn'   : 'good',  delta: `↑ Opportunity in South & East India` },
    { id:'ai',         val: aiVal,          color: 'danger',                             delta: `High AI adoption potential identified` },
    { id:'platform',   val: platVal,        color: platVal  < 40 ? 'danger' : 'good',  delta: `+${100-platVal}% headroom vs category leaders` },
  ].forEach(s => {
    const ve = document.getElementById('score-'+s.id);
    const be = document.getElementById('bar-'+s.id);
    const de = document.getElementById('delta-'+s.id);
    if (!ve || !be || !de) return;
    ve.className = 'dash-card-title tabnum ' + s.color;
    be.className = 'score-fill ' + s.color;
    animVal(ve, s.val);
    setTimeout(() => be.style.width = s.val + '%', 200);
    de.textContent = s.delta;
  });

  // Confidence badges + methodology panels
  if (data.scoreMethodology) {
    ['velocity','stagnation','regional','ai','platform'].forEach(key => {
      var m = data.scoreMethodology[key];
      if (!m) return;
      var confEl = document.getElementById('conf-' + key);
      var methEl = document.getElementById('meth-' + key);
      if (confEl) {
        var confLevel = (m.confidence || '').toString().toUpperCase();
        var levelClass = confLevel === 'HIGH' ? 'high' : confLevel === 'MEDIUM' ? 'medium' : confLevel === 'LOW' ? 'low' : '';
        confEl.innerHTML = '<span class="dash-outline-badge' + (levelClass ? ' ' + levelClass : '') + '">' + confLevel + '</span>';
      }
      if (methEl) {
        methEl.innerHTML = '<strong>Method:</strong> ' + m.method + '<br><strong>Benchmark:</strong> ' + m.benchmark;
      }
    });
  }

  // Transparency bar
  var tBar = document.getElementById('transparencyBar');
  if (tBar) {
    tBar.style.display = 'flex';
    if (data.analysisDisclaimer) {
      document.getElementById('transparencyText').textContent = data.analysisDisclaimer;
    }
  }

  // Top insight badge
  const insightEl = document.getElementById('topInsight');
  if (insightEl && data.topInsight) insightEl.textContent = data.topInsight;

  // Overall grade
  const gradeEl = document.getElementById('overallGrade');
  if (gradeEl && data.overallGrade) gradeEl.textContent = data.overallGrade;

  // Savings
  document.getElementById('savingsAmount').textContent = data.savings || 'Assessment pending';
  var breakdownHtml = '';
  if (data.breakdown && Array.isArray(data.breakdown) && data.breakdown.length) {
    breakdownHtml = data.breakdown.map(b =>
      `<div class="sb-row"><span class="sb-item">${b.item || ''}</span><div class="sb-vals"><span class="sb-trad">${b.trad || '—'}</span><span class="sb-ai">${b.ai || '—'}</span></div></div>`
    ).join('');
  } else {
    breakdownHtml = '<div style="color:var(--muted-foreground);font-size:13px;padding:8px 0">Cost breakdown not available for this analysis.</div>';
  }
  document.getElementById('savingsBreakdown').innerHTML = breakdownHtml;

  // Savings methodology
  if (data.savingsMethodology) {
    var smWrap = document.getElementById('savingsMethodologyWrap');
    var smPanel = document.getElementById('savings-methodology');
    if (smWrap && smPanel) {
      smWrap.style.display = 'block';
      smPanel.innerHTML = '<strong>Assumptions:</strong> ' + data.savingsMethodology;
    }
  }

  // Data sources section
  if (data.dataSources && data.dataSources.length) {
    var srcSection = document.getElementById('sourcesSection');
    var srcList = document.getElementById('sourcesList');
    if (srcSection && srcList) {
      srcSection.style.display = 'block';
      srcList.innerHTML = data.dataSources.map(function(s) {
        var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(s);
        return '<a href="' + searchUrl + '" target="_blank" rel="noopener" class="source-pill"><span class="source-dot" style="background:var(--primary)"></span>' + s + ' <span style="font-size:8px;opacity:0.5">&#8599;</span></a>';
      }).join('');
    }
  }

  // Disclaimer
  if (data.analysisDisclaimer) {
    var discEl = document.getElementById('disclaimerText');
    if (discEl) {
      discEl.innerHTML = '&#9888; <strong>Disclaimer:</strong> ' + data.analysisDisclaimer;
    }
  }

  // Alerts — handle both string text and bold-tagged text
  if (data.alerts && Array.isArray(data.alerts) && data.alerts.length) {
    document.getElementById('alertList').innerHTML = data.alerts.map(a =>
      `<div class="alert-item ${a.type || 'yellow'}"><div class="alert-icon">${a.icon || '⚠'}</div><div class="alert-text">${a.text || ''}</div></div>`
    ).join('');
  }

  // Regions
  if (data.regions && Array.isArray(data.regions) && data.regions.length) {
    document.getElementById('regionalGrid').innerHTML = data.regions.map(r =>
      `<div class="region-item"><div class="region-name">${r.name || ''}</div><div class="region-bar-track"><div class="region-bar-fill" style="width:${safeNum(r.score)}%"></div></div><div class="region-score">${safeNum(r.score)}</div></div>`
    ).join('');
  }

  // Priority actions
  const prioEl = document.getElementById('priorityActions');
  if (prioEl && data.priorities) {
    prioEl.innerHTML = data.priorities.map(p =>
      `<div class="priority-item">
        <div class="priority-rank">${p.rank}</div>
        <div class="priority-body">
          <div class="priority-action">${p.action}</div>
          <div class="priority-meta" style="color:var(--primary);font-weight:500">→ ${p.impact}</div>
          <div class="priority-meta" style="text-transform:uppercase;letter-spacing:0.04em">${p.timeline}</div>
        </div>
      </div>`
    ).join('');
  }

  // Competitor benchmark
  const benchEl = document.getElementById('competitorBenchmark');
  if (benchEl && data.competitorBenchmark) {
    const cb = data.competitorBenchmark;
    benchEl.innerHTML = `
      <div style="font-size:13px;color:var(--muted-foreground);line-height:1.7;margin-bottom:var(--spacing--24,24px);padding-bottom:var(--spacing--24,24px);border-bottom:1px solid var(--border)">${cb.summary}</div>
      <div class="benchmark-grid">
        <div class="benchmark-stat">
          <div class="benchmark-stat-label">Your Posts / Month</div>
          <div class="benchmark-stat-value">${cb.postsPerMonth}</div>
        </div>
        <div class="benchmark-stat">
          <div class="benchmark-stat-label">Category Leader</div>
          <div class="benchmark-stat-value" style="color:var(--primary)">${cb.categoryLeaderPosts}</div>
        </div>
        <div class="benchmark-stat">
          <div class="benchmark-stat-label">Your AI Adoption</div>
          <div class="benchmark-stat-value">${cb.aiAdoptionPct}%</div>
        </div>
        <div class="benchmark-stat">
          <div class="benchmark-stat-label">Category Avg AI</div>
          <div class="benchmark-stat-value" style="color:var(--primary)">${cb.categoryAvgAiPct}%</div>
        </div>
      </div>`;
  }

  document.getElementById('resultsSection').classList.add('visible');
  document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
  showToast('success', 'Analysis complete!', `${brandName}'s creative health check is ready.`);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('page-intel').classList.contains('active') && document.activeElement.tagName === 'INPUT') runAnalysis();
});

// ── MULTI-URL ──
function addUrl() {
  const list = document.getElementById('urlList');
  if(!list) return;
  const row = document.createElement('div');
  row.className = 'url-row';
  row.innerHTML = `<input type="url" class="brand-url-input" placeholder="https://instagram.com/yourbrand"><button class="url-remove-btn" onclick="removeUrl(this)" title="Remove"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`;
  list.appendChild(row);
  // show remove buttons if more than 1
  updateRemoveBtns();
  row.querySelector('input').focus();
}

function removeUrl(btn) {
  btn.closest('.url-row').remove();
  updateRemoveBtns();
}

function updateRemoveBtns() {
  const rows = document.querySelectorAll('.url-row');
  rows.forEach(r => {
    const btn = r.querySelector('.url-remove-btn');
    if(btn) btn.style.display = rows.length > 1 ? 'flex' : 'none';
  });
}

// ══════════════════════════════════════════════
// ROI CALCULATOR — global function, zero wiring
// Called directly via oninput on each slider
// ══════════════════════════════════════════════
function roiCalc() {
  var AI_MID = { video:150000, photo:35000, festival:300000, reels:37500 };
  var AI_RNG = { video:[100000,200000], photo:[10000,60000], festival:[300000,300000], reels:[25000,50000] };
  var TR_MID = { video:1850000, photo:1150000, festival:900000, reels:600000 };
  var TR_RNG = { video:[1200000,2500000], photo:[800000,1500000], festival:[600000,1200000], reels:[400000,800000] };

  function fmt(n) {
    if (n >= 10000000) return '\u20b9' + (n/10000000).toFixed(1) + ' Cr';
    if (n >= 100000)   return '\u20b9' + (n/100000).toFixed(1) + 'L';
    if (n >= 1000)     return '\u20b9' + Math.round(n/1000) + 'K';
    return '\u20b9' + n;
  }
  function fR(lo, hi) { return lo===hi ? fmt(lo) : fmt(lo)+'\u2013'+fmt(hi); }
  function g(id) { return document.getElementById(id); }
  function st(id,v) { var e=g(id); if(e) e.textContent=v; }
  function sv(id,d) { var e=g(id); return e?(parseInt(e.value)||d):d; }
  function isOn(id) { var e=g(id); return e ? e.checked : false; }

  var cats = ['video','photo','festival','reels'];
  var qty = {
    video:    isOn('r2-chk-video')    ? sv('r2-slider-video', 1)    : 0,
    photo:    isOn('r2-chk-photo')    ? sv('r2-slider-photo', 1)    : 0,
    festival: isOn('r2-chk-festival') ? sv('r2-slider-festival', 1) : 0,
    reels:    isOn('r2-chk-reels')    ? sv('r2-slider-reels', 1)    : 0
  };

  // Dim/undim cards
  cats.forEach(function(k) {
    var card = g('roi-card-'+k);
    if (card) {
      if (qty[k] > 0) { card.classList.remove('dimmed'); }
      else { card.classList.add('dimmed'); }
    }
  });

  // Quantity labels
  st('r2-lbl-video',    sv('r2-slider-video',1));
  st('r2-lbl-photo',    sv('r2-slider-photo',1));
  st('r2-lbl-festival', sv('r2-slider-festival',1));
  st('r2-lbl-reels',    sv('r2-slider-reels',1));

  // Per-row prices
  cats.forEach(function(k) {
    var q = Math.max(1, qty[k]);
    st('r2-trad-'+k, fR(TR_RNG[k][0]*q, TR_RNG[k][1]*q));
    if (k === 'festival') { st('r2-ai-'+k, '\u20b9'+q*3+'L'); }
    else { st('r2-ai-'+k, fR(AI_RNG[k][0]*q, AI_RNG[k][1]*q)); }
  });

  // Totals
  var tTrad = 0, tAI = 0;
  cats.forEach(function(k) { tTrad += TR_MID[k]*qty[k]; tAI += AI_MID[k]*qty[k]; });
  var saved = tTrad - tAI;
  var pct = tTrad > 0 ? Math.round(saved/tTrad*100) : 0;

  st('r2-ai-total',     tAI > 0 ? fmt(tAI)+'/mo' : '\u20b90');
  st('r2-trad-total',   tTrad > 0 ? fmt(tTrad)+'/mo' : '\u20b90');
  st('r2-savings-hero', saved > 0 ? fmt(saved)+'/mo' : '\u20b90');
  st('r2-badge',        tTrad > 0 ? '\u2193 '+pct+'%' : '\u2013');

  var pieces = qty.video + qty.photo*50 + qty.festival*8 + qty.reels*10;
  st('r2-pieces',  pieces > 0 ? '~'+pieces.toLocaleString('en-IN') : '0');
  st('r2-revenue', saved > 0 ? '+'+fmt(Math.round(saved*0.48)) : '\u20b90');
}

// Run once on page load to initialise the right panel
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', roiCalc);
} else {
  roiCalc();
}

// ── SCROLL REVEAL ──
(function initReveal() {
  function setup() {
    document.querySelectorAll('.section, .feature-card, .cs-card, .tech-card, .page-card, .d2c-stat-card, .mc-card, .comp-card, .concept-card, .ai-concept-card, .strategy-block').forEach(function(el) {
      el.classList.add('reveal');
    });
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();

