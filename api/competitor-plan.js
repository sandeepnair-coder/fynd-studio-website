// api/competitor-plan.js
// Lightweight competitor analysis via Apify instagram-profile-scraper.
//
// Cost: ~1 compute unit per 5 profiles ≈ $0.02–0.05 per run
// (was instagram-scraper per-post which cost $3+)
//
// POST /api/competitor-plan
// Body: { brand, brandHandle?, competitors: ["Name1",...], category, region }

const APIFY_TOKEN = process.env.APIFY_API_KEY;
// Profile scraper: loads profile page + last 12 posts — single request per brand
const ACTOR       = 'apify~instagram-profile-scraper';
const APIFY_BASE  = 'https://api.apify.com/v2';

// ── Known Indian brand → best Instagram handle ──
const KNOWN_HANDLES = {
  'coca-cola':      'cocacola',
  'coca cola':      'cocacola',
  'cocacola':       'cocacola',
  'pepsi':          'pepsiindia',
  'pepsi india':    'pepsiindia',
  'thums up':       'thumsupofficial',
  'thumps up':      'thumsupofficial',
  'thumsup':        'thumsupofficial',
  'thums-up':       'thumsupofficial',
  'sprite':         'sprite',
  'limca':          'limca',
  'sting':          'sting',
  'mountain dew':   'mountaindew',
  'campa':          'campacola',
  'campa cola':     'campacola',
  'frooti':         'frooti',
  'appy fizz':      'appyfizz',
  'real':           'realfruitjuice',
  'maaza':          'maaza',
  'slice':          'sliceindia',
  'parle agro':     'parleagro',
  'red bull':       'redbullindia',
  'monster':        'monsterenergy',
  'bira':           'bira91',
  'bira 91':        'bira91',
  'kingfisher':     'kingfisherbeer',
  'haldirams':      'haldirams',
  'lays':           'lays',
  "lay's":          'lays',
  'doritos':        'doritos',
  'maggi':          'maggi',
  'red tape':       'redtapeindia',
  'redtape':        'redtapeindia',
  'red tape shoes': 'redtapeindia',
  'bata':           'bataindia',
  'bata india':     'bataindia',
  'liberty shoes':  'libertyshoesindia',
  'liberty':        'libertyshoesindia',
  'campus':         'campusshoesindia',
  'campus shoes':   'campusshoesindia',
  'woodland':       'woodlandoriginals',
  'woodland shoes': 'woodlandoriginals',
  'woodland india': 'woodlandoriginals',
  'nike':           'nike',
  'nike india':     'nikeindia',
  'adidas':         'adidas',
  'adidas india':   'adidas_in',
  'puma':           'puma',
  'puma india':     'pumaindia',
  'reebok':         'reebok',
  'skechers':       'skechersindia',
  'new balance':    'newbalance',
  'under armour':   'underarmour',
  'h&m':            'hm',
  'h and m':        'hm',
  'zara':           'zara',
  'myntra':         'myntra',
  'meesho':         'meesho_official',
  'ajio':           'ajio_life',
  'nykaa':          'nykaafashion',
  'westside':       'westsidestores',
  'max fashion':    'maxfashionindia',
  'levi\'s':        'levis',
  'levis':          'levis',
  'wrangler':       'wrangler',
  'lee cooper':     'leecooperindia',
  'mufti':          'muftijeans',
  'peter england':  'peterenglandindia',
  'raymond':        'raymondlimited',
  'allen solly':    'allensollyindia',
  'van heusen':     'vanheusenstyle',
  'arrow':          'arrowfashion',
  'britannia':      'britanniaindia',
  'amul':           'amul_india',
  'mother dairy':   'motherdairy',
  'patanjali':      'patanjali_ayurved',
  'nescafe':        'nescafeindia',
  'tropicana':      'tropicana',
  'paper boat':     'paperboatdrinks',
  'minute maid':    'minutemaid',
  // Chocolates & confectionery
  'luvit':          'luvitchocolates',
  'luv it':         'luvitchocolates',
  'cadbury':        'cadburyindia',
  'cadbury india':  'cadburyindia',
  'kitkat':         'kitkat',
  'kit kat':        'kitkat',
  'dairy milk':     'cadburyindia',
  '5 star':         'cadburyindia',
  'gems':           'cadburyindia',
  'oreo':           'oreoindia',
  'bourbon':        'britanniaindia',
  'good day':       'britanniaindia',
  'munch':          'nestle_india',
  'milkybar':       'nestle_india',
  'nestle':         'nestle_india',
  'ferrero rocher': 'ferrerorocher',
  'toblerone':      'toblerone',
  'snickers':       'snickers',
  'kitkat india':   'kitkatindia',
  // D2C & startup brands
  'mamaearth':      'mamaearth',
  'boat':           'boat.lifestyle',
  'noise':          'gonoise',
  'mcaffeine':      'mcaffeine',
  'plum':           'plumgoodness',
  'pilgrim':        'pilgrimindia',
  'minimalist':     'beminimalist.co',
  'the moms co':    'themomsco',
  'wow skin':       'wowskinscienceindia',
  'sugar cosmetics':'sugarcosmeticsofficial',
  'nykaa cosmetics':'nykaafashion',
  'bewakoof':       'bewakoof',
  'snitch':         'snitch.co.in',
  'urbanic':        'urbanicapp',
  'virgio':         'virgio',
  'clovia':         'clovialingerie',
  'zivame':         'zivame',
  'fastrack':       'fastrack',
  'titan':          'titancompany',
  'tanishq':        'tanishqjewellery',
  'caratlane':      'caratlane',
};

// Returns an ordered list of handle candidates for a brand name.
// Known brands → single verified handle. Unknown brands → 3 variants tried in parallel.
function getHandleCandidates(name) {
  const key = name.toLowerCase().trim().replace(/[^a-z\s]/g, '').trim();
  for (const [k, h] of Object.entries(KNOWN_HANDLES)) {
    if (key === k || key.includes(k) || k.includes(key)) return [h];
  }
  // Unknown brand — derive 3 handle variants to try in one batch
  const base = name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return [
    base,
    base + 'india',
    base + 'official',
    base + 'in',
  ].filter((h, i, a) => h.length >= 3 && a.indexOf(h) === i);
}

// Category engagement-rate benchmark by follower tier
function erBenchmark(followers, category) {
  const cat = (category || '').toLowerCase();
  const base = cat.includes('beverage') || cat.includes('food') ? 2.8
    : cat.includes('fashion') || cat.includes('apparel') ? 3.2
    : cat.includes('beauty') ? 3.8
    : cat.includes('tech') ? 1.9
    : 2.5;
  if (!followers) return `~${base}%`;
  if (followers > 2000000) return `~${(base * 0.75).toFixed(1)}%`;
  if (followers > 500000)  return `~${(base * 0.9).toFixed(1)}%`;
  if (followers > 100000)  return `~${base}%`;
  return `~${(base * 1.3).toFixed(1)}%`;
}

function formatFollowers(n) {
  if (!n) return null;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000)    return `${Math.round(n / 1000)}K`;
  return `${n}`;
}

function determineBadge(name, followers) {
  const n = name.toLowerCase();
  if (n.includes('coca-cola') || n.includes('coca cola') || n.includes('pepsi') || n.includes('thums up')) {
    return { label: 'MARKET LEADER', cls: 'leader' };
  }
  if ((followers || 0) > 500000) return { label: 'CATEGORY LEADER', cls: 'leader' };
  if ((followers || 0) > 100000) return { label: 'CONTENT LEADER',  cls: 'leader' };
  return { label: 'RISING FAST', cls: 'rising' };
}

// Run apify/instagram-profile-scraper — very cheap (profile page only)
async function runApify(usernames) {
  const body = { usernames }; // profile scraper takes just usernames array
  const startRes = await fetch(
    `${APIFY_BASE}/acts/${ACTOR}/runs?token=${APIFY_TOKEN}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  );
  const rawText = await startRes.text();
  console.log('[Apify] Start response status:', startRes.status, '| body preview:', rawText.substring(0, 120));
  if (!startRes.ok) {
    throw new Error(`Apify start failed ${startRes.status}: ${rawText.substring(0, 200)}`);
  }
  let startData;
  try { startData = JSON.parse(rawText); }
  catch(e) { throw new Error(`Apify returned non-JSON (${startRes.status}): ${rawText.substring(0, 200)}`); }
  const runId = startData.data?.id;
  console.log('[Apify] Profile run started:', runId);

  // Poll — profile scraper is fast: typically 30–90 sec for 4 profiles
  const maxMs = 4 * 60 * 1000;
  const start  = Date.now();
  while (Date.now() - start < maxMs) {
    await sleep(5000);
    const st    = await (await fetch(`${APIFY_BASE}/actor-runs/${runId}?token=${APIFY_TOKEN}`)).json();
    const status = st.data?.status;
    console.log('[Apify] Status:', status);
    if (status === 'SUCCEEDED') {
      const dsId = st.data.defaultDatasetId;
      const items = await (await fetch(`${APIFY_BASE}/datasets/${dsId}/items?token=${APIFY_TOKEN}&limit=20`)).json();
      return Array.isArray(items) ? items : [];
    }
    if (['FAILED','ABORTED','TIMED-OUT'].includes(status)) {
      throw new Error('Apify run ended: ' + status);
    }
  }
  throw new Error('Apify polling timed out (4 min)');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Main handler ──
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const { brand, brandHandle, competitors, category } = req.body || {};
  if (!brand || !Array.isArray(competitors) || !competitors.length) {
    return res.status(400).json({ error: 'brand and competitors[] required' });
  }
  if (!APIFY_TOKEN) {
    return res.status(500).json({ error: 'APIFY_API_KEY not configured' });
  }

  // Cap at 4 competitors to control cost
  const topCompetitors = competitors.slice(0, 4);

  // Build candidate handle list — known brands get 1 handle, unknown brands get up to 4 variants
  // brandCandidates: brand name → array of handle candidates (ordered best-first)
  const brandCandidates = {};
  const allHandles = []; // deduplicated list sent to Apify
  topCompetitors.forEach(name => {
    const candidates = brandHandle && name === brand
      ? [brandHandle]
      : getHandleCandidates(name);
    brandCandidates[name] = candidates;
    candidates.forEach(h => { if (!allHandles.includes(h)) allHandles.push(h); });
  });
  // Also cap total handles to keep cost low (~$0.05 max)
  const usernames = allHandles.slice(0, 16);
  console.log('[competitor-plan] Fetching profiles:', usernames);

  // ── Apify call ──
  let profiles = []; // array of instagram-profile-scraper items
  try {
    profiles = await runApify(usernames);
    // Filter valid profiles (have username or followersCount)
    profiles = profiles.filter(p => p.username || p.followersCount != null);
    console.log('[competitor-plan] Got', profiles.length, 'profiles:', profiles.map(p => p.username));
    if (profiles[0]) {
      console.log('[competitor-plan] Profile fields:', Object.keys(profiles[0]).join(', '));
    }
  } catch (err) {
    console.warn('[competitor-plan] Apify failed, using benchmarks:', err.message);
  }

  // Index profiles by username
  const profileByHandle = {};
  profiles.forEach(p => {
    if (p.username) profileByHandle[p.username.toLowerCase()] = p;
  });

  // Log which handles returned real data
  const foundHandles = Object.keys(profileByHandle).filter(h => {
    const p = profileByHandle[h];
    return (p.followersCount || 0) > 0 || (p.postsCount || 0) > 0;
  });
  console.log('[competitor-plan] Handles with real data:', foundHandles);

  // ── Build competitor cards ──
  const cards = topCompetitors.map(name => {
    // Pick the candidate with the most followers (best real match)
    const candidates = brandCandidates[name] || [];
    let profile = null;
    let handle  = candidates[0];
    for (const c of candidates) {
      const p = profileByHandle[c.toLowerCase()];
      if (p && (p.followersCount || 0) > (profile?.followersCount || 0)) {
        profile = p;
        handle  = c;
      }
    }
    const followers  = profile?.followersCount || 0;
    const postsCount = profile?.postsCount || 0;
    const isVerified = profile?.verified || profile?.isVerified || false;
    // Only treat as real data if we got actual follower/post numbers (not an empty shell)
    const hasData    = !!profile && (followers > 0 || postsCount > 0);

    // Engagement rate from latestPosts if available (need ≥3 posts for reliable calc)
    let erVal = erBenchmark(followers, category);
    if (profile?.latestPosts?.length >= 3 && followers > 0) {
      const posts = profile.latestPosts;
      const avgEngagement = posts.reduce((s, p) => s + (p.likesCount || 0) + (p.commentsCount || 0), 0) / posts.length;
      const calcER = (avgEngagement / followers * 100);
      // Cap at 20% — higher values indicate skewed sample (viral post or low follower count)
      if (calcER <= 20) {
        erVal = `${calcER.toFixed(1)}%`;
      }
    }

    // Content mix from latestPosts
    let mixVal = null;
    if (profile?.latestPosts?.length >= 3) {
      const posts = profile.latestPosts;
      const videoCount = posts.filter(p => p.type === 'Video' || p.videoUrl).length;
      const reelsPct   = Math.round(videoCount / posts.length * 100);
      mixVal = `${reelsPct}% Reels / ${100 - reelsPct}% Static`;
    }

    // If no real data found — return a minimal "not found" card, no fake estimates
    if (!hasData) {
      return {
        name,
        notFound:   true,
        confidence: 'not_found',
        badge:      null,
        badgeClass: null,
      };
    }

    const badge = determineBadge(name, followers);
    const fmtFollowers = formatFollowers(followers);

    const gap = followers > 500000
      ? `${fmtFollowers} followers — significantly larger reach`
      : `${fmtFollowers} followers — comparable audience size`;

    const dataSource = `@${handle} · ${fmtFollowers || '?'} followers · ${postsCount} total posts${isVerified ? ' · ✓ Verified' : ''}`;

    return {
      name,
      notFound:       false,
      badge:          badge.label,
      badgeClass:     badge.cls,
      confidence:     'verified',
      desc:           `${fmtFollowers} followers on Instagram${isVerified ? ' · Verified account' : ''}.`,
      followers:      fmtFollowers,
      followersClass: 'good',
      er:             erVal,
      erClass:        'neutral',
      mix:            mixVal || null,
      mixClass:       'neutral',
      gap,
      gapClass:       'bad',
      dataSource,
    };
  });

  return res.status(200).json({
    dataNote: 'Profile data from Apify Instagram profile scraper. Engagement rates are calculated from latest posts where available, otherwise estimated from follower-tier benchmarks.',
    competitors: cards,
    _meta: {
      profilesFetched: profiles.length,
      brandsWithData:  profiles.length,
      scrapedAt:       new Date().toISOString(),
    },
  });
};
