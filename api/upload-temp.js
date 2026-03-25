// api/upload-temp.js
// Uploads product images directly to FAL storage (works on Vercel serverless)
// Returns FAL storage URLs instead of local file paths

const Busboy = require('busboy');
const crypto = require('crypto');

const FAL_UPLOAD_URL = 'https://rest.alpha.fal.ai/storage/upload/initiate';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 6; // 5 products + 1 logo

module.exports = function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  const falKey = process.env.FAL_API_KEY;
  if (!falKey) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'FAL_API_KEY not configured' }));
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Content-Type must be multipart/form-data' }));
  }

  const fileBuffers = []; // collect { buffer, contentType, ext }
  let finished = false;

  try {
    const bb = Busboy({
      headers: req.headers,
      limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES }
    });

    bb.on('file', (fieldname, stream, info) => {
      const ext = (info.filename || '.jpg').split('.').pop().toLowerCase() || 'jpg';
      const allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
      if (!allowed.includes(ext)) {
        stream.resume();
        return;
      }

      const chunks = [];
      const mime = info.mimeType || 'image/jpeg';

      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (buffer.length > 0) {
          fileBuffers.push({ buffer, contentType: mime, ext });
        }
      });
    });

    bb.on('close', async () => {
      if (finished) return;
      finished = true;

      if (fileBuffers.length === 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'No valid files uploaded' }));
      }

      try {
        // Upload all files to FAL storage in parallel
        const uploadPromises = fileBuffers.map((file, i) => uploadToFal(falKey, file, i));
        const urls = await Promise.all(uploadPromises);
        console.log('[upload-temp] Uploaded', urls.length, 'files to FAL storage');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ urls }));
      } catch (err) {
        console.error('[upload-temp] FAL upload error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Upload to storage failed: ' + err.message }));
      }
    });

    bb.on('error', (err) => {
      if (finished) return;
      finished = true;
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Upload failed: ' + err.message }));
    });

    req.pipe(bb);

  } catch (err) {
    if (!finished) {
      finished = true;
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Upload error: ' + err.message }));
    }
  }
};

async function uploadToFal(apiKey, file, index) {
  const { buffer, contentType, ext } = file;
  const fileName = `product_${index}_${crypto.randomUUID().substring(0, 8)}.${ext}`;

  // Step 1: Initiate upload on FAL storage
  const initRes = await fetch(FAL_UPLOAD_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_name: fileName,
      content_type: contentType.split(';')[0],
    }),
  });

  if (!initRes.ok) {
    const errBody = await initRes.text().catch(() => '');
    throw new Error(`FAL init failed: ${initRes.status} ${errBody.substring(0, 100)}`);
  }

  const { file_url, upload_url } = await initRes.json();

  // Step 2: PUT the image bytes to the presigned URL
  const uploadRes = await fetch(upload_url, {
    method: 'PUT',
    headers: { 'Content-Type': contentType.split(';')[0] },
    body: buffer,
  });

  if (!uploadRes.ok) {
    throw new Error(`FAL PUT failed: ${uploadRes.status}`);
  }

  return file_url;
}
