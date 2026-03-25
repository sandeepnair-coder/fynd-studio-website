// api/generate-image.js
// Image generation via FAL.ai Nano Banana Pro model
// Text-to-image: fal-ai/nano-banana-pro
// Image-to-image (edit): fal-ai/nano-banana-pro/edit (when reference_image provided)
// Reference images are uploaded to FAL storage regardless of source:
//   - http(s):// URLs → downloaded from web
//   - /uploads/... paths → read from local tmp/uploads/ dir
// Auth: Key {FAL_API_KEY}

const fs = require('fs');
const path = require('path');

const FAL_T2I_MODEL = 'fal-ai/nano-banana-pro';
const FAL_I2I_MODEL = 'fal-ai/nano-banana-pro/edit';
const FAL_UPLOAD_URL = 'https://rest.alpha.fal.ai/storage/upload/initiate';
const UPLOAD_DIR = path.join(__dirname, '..', 'tmp', 'uploads');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt, image_size, reference_image } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });

  const falKey = process.env.FAL_API_KEY;
  if (!falKey) {
    return res.status(500).json({ error: 'FAL_API_KEY not configured' });
  }

  const dims = mapDimensions(image_size);

  try {
    let falImageUrl = null;

    // If a reference image is provided, upload it to FAL storage
    // Supports: http(s):// URLs (downloaded) and /uploads/... (read from local disk)
    if (reference_image && typeof reference_image === 'string') {
      const isRemote = reference_image.startsWith('http');
      const isLocal = reference_image.startsWith('/uploads/');
      if (isRemote || isLocal) {
        try {
          falImageUrl = await uploadToFalStorage(falKey, reference_image);
          console.log('[FAL] Reference image uploaded to FAL storage:', falImageUrl.substring(0, 100));
        } catch (uploadErr) {
          console.warn('[FAL] Failed to upload reference image, falling back to text-to-image:', uploadErr.message);
          falImageUrl = null;
        }
      } else {
        console.warn('[FAL] Unrecognised reference_image format, skipping:', reference_image.substring(0, 60));
      }
    }

    const imageUrl = await generateViaFal(falKey, prompt, image_size || 'landscape_16_9', falImageUrl);

    // Verify the image is reachable
    const verified = await verifyUrl(imageUrl);
    if (!verified) {
      return res.status(500).json({ error: 'Generated image URL not reachable' });
    }

    return res.status(200).json({ image_url: imageUrl, width: dims.w, height: dims.h });
  } catch (err) {
    console.error('[FAL] error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};

// Get image bytes and content-type from either a remote URL or a local /uploads/ path
async function uploadToFalStorage(apiKey, source) {
  let buffer, contentType;

  if (source.startsWith('/uploads/')) {
    // Local file — read directly from disk
    const fileName = path.basename(source);
    const localPath = path.join(UPLOAD_DIR, fileName);
    console.log('[FAL] Reading local reference image from disk:', localPath);
    if (!fs.existsSync(localPath)) {
      throw new Error(`Local upload not found: ${localPath}`);
    }
    buffer = fs.readFileSync(localPath);
    const ext = path.extname(fileName).toLowerCase();
    const extToMime = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };
    contentType = extToMime[ext] || 'image/jpeg';
    console.log(`[FAL] Loaded local file: ${buffer.length} bytes (${contentType})`);
  } else {
    // Remote URL — download it
    console.log('[FAL] Downloading reference image from URL:', source.substring(0, 80));
    const downloadRes = await fetchWithTimeout(source, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
    }, 15000);

    if (!downloadRes.ok) {
      throw new Error(`Download failed: ${downloadRes.status}`);
    }

    contentType = downloadRes.headers.get('content-type') || 'image/jpeg';
    buffer = Buffer.from(await downloadRes.arrayBuffer());
    console.log(`[FAL] Downloaded ${buffer.length} bytes (${contentType})`);
  }

  // Determine file extension from content type
  const extMap = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/jpg': 'jpg' };
  const ext = extMap[contentType.split(';')[0]] || 'jpg';

  // Step 2: Initiate upload on FAL storage
  const initRes = await fetchWithTimeout(FAL_UPLOAD_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_name: `product_ref.${ext}`,
      content_type: contentType.split(';')[0],
    }),
  }, 10000);

  if (!initRes.ok) {
    const errBody = await initRes.text().catch(() => '');
    throw new Error(`FAL upload init failed: ${initRes.status} ${errBody.substring(0, 100)}`);
  }

  const { file_url, upload_url } = await initRes.json();

  // Step 3: PUT the image bytes to the presigned URL
  const uploadRes = await fetchWithTimeout(upload_url, {
    method: 'PUT',
    headers: { 'Content-Type': contentType.split(';')[0] },
    body: buffer,
  }, 15000);

  if (!uploadRes.ok) {
    throw new Error(`FAL upload PUT failed: ${uploadRes.status}`);
  }

  return file_url;
}

function mapDimensions(imageSize) {
  const map = {
    'landscape_16_9': { w: 1024, h: 576 },
    'landscape_4_3':  { w: 1024, h: 768 },
    'square':         { w: 768,  h: 768 },
    'square_hd':      { w: 1024, h: 1024 },
    'banner_ratio':   { w: 1200, h: 480 },
    'portrait_4_3':   { w: 768,  h: 1024 },
    'portrait_16_9':  { w: 576,  h: 1024 },
  };
  return map[imageSize] || { w: 1024, h: 576 };
}

// Map old image_size names to nano-banana-pro aspect_ratio values
function mapAspectRatio(imageSize) {
  const map = {
    'landscape_16_9': '16:9',
    'landscape_4_3':  '4:3',
    'square':         '1:1',
    'square_hd':      '1:1',
    'banner_ratio':   '21:9',
    'portrait_4_3':   '3:4',
    'portrait_16_9':  '9:16',
  };
  return map[imageSize] || '16:9';
}

async function generateViaFal(apiKey, prompt, imageSize, referenceImageUrl) {
  const isI2I = !!referenceImageUrl;
  const model = isI2I ? FAL_I2I_MODEL : FAL_T2I_MODEL;
  const queueUrl = `https://queue.fal.run/${model}`;

  const aspectRatio = mapAspectRatio(imageSize);
  console.log(`[FAL] model: ${model}, mode: ${isI2I ? 'edit (image-to-image)' : 'text-to-image'}, aspect: ${aspectRatio}`);
  if (isI2I) {
    console.log('[FAL] reference image_urls:', [referenceImageUrl]);
  }

  // Build request body — nano-banana-pro uses aspect_ratio (not image_size)
  // Edit model uses image_urls array (not image_url)
  const body = {
    prompt: prompt,
    num_images: 1,
    aspect_ratio: aspectRatio,
    output_format: 'jpeg',
    safety_tolerance: 4,
  };

  if (isI2I) {
    body.image_urls = [referenceImageUrl];
  }

  // Step 1: Submit to queue
  console.log('[FAL] submitting to queue...');
  const submitRes = await fetchWithTimeout(queueUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }, 20000);

  if (!submitRes.ok) {
    const errBody = await submitRes.text().catch(() => '');
    throw new Error(`FAL submit ${submitRes.status}: ${errBody.substring(0, 200)}`);
  }

  const job = await submitRes.json();
  const requestId = job.request_id;
  console.log('[FAL] job queued:', requestId);

  if (!requestId) throw new Error('No request_id returned from FAL');

  // Step 2: Poll for completion — use URLs from submit response
  const statusUrl = job.status_url || `${queueUrl}/requests/${requestId}/status`;
  const resultUrl = job.response_url || `${queueUrl}/requests/${requestId}`;
  console.log('[FAL] status URL:', statusUrl);
  const maxTime = 120000;
  const interval = 3000;
  const startTime = Date.now();

  for (let attempt = 1; attempt <= 40; attempt++) {
    if (Date.now() - startTime > maxTime) throw new Error('FAL timed out (120s)');

    await sleep(interval);

    const statusRes = await fetchWithTimeout(statusUrl, {
      headers: { 'Authorization': `Key ${apiKey}` },
    }, 10000);

    if (!statusRes.ok) {
      const errBody = await statusRes.text().catch(() => '');
      throw new Error(`FAL status ${statusRes.status}: ${errBody.substring(0, 200)}`);
    }

    const statusData = await statusRes.json();
    console.log(`[FAL] poll #${attempt}, status: ${statusData.status}`);

    if (statusData.status === 'COMPLETED') {
      const resultRes = await fetchWithTimeout(resultUrl, {
        headers: { 'Authorization': `Key ${apiKey}` },
      }, 10000);

      if (!resultRes.ok) {
        const errBody = await resultRes.text().catch(() => '');
        throw new Error(`FAL result ${resultRes.status}: ${errBody.substring(0, 300)}`);
      }

      const result = await resultRes.json();

      if (result.images && result.images.length > 0) {
        console.log('[FAL] image generated:', result.images[0].url.substring(0, 80));
        return result.images[0].url;
      }
      throw new Error('FAL COMPLETED but no images in response');
    }

    if (statusData.status === 'FAILED') {
      throw new Error('FAL generation FAILED: ' + JSON.stringify(statusData.error || ''));
    }
  }

  throw new Error('FAL did not complete in time');
}

async function verifyUrl(url) {
  try {
    const res = await fetchWithTimeout(url, { method: 'HEAD' }, 8000);
    return res.ok;
  } catch (e) {
    return false;
  }
}

function fetchWithTimeout(url, opts, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { ...opts, signal: ctrl.signal }).finally(() => clearTimeout(timer));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
