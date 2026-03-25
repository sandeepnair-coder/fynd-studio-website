const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const UPLOAD_DIR = path.join(__dirname, '..', 'tmp', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 6; // 5 products + 1 logo
const FILE_TTL_MS = 60 * 60 * 1000; // 1 hour

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function cleanOldFiles() {
  try {
    const now = Date.now();
    const files = fs.readdirSync(UPLOAD_DIR);
    for (const file of files) {
      const filePath = path.join(UPLOAD_DIR, file);
      const stat = fs.statSync(filePath);
      if (now - stat.mtimeMs > FILE_TTL_MS) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (e) {
    // ignore cleanup errors
  }
}

module.exports = function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  // Clean old files on each upload
  cleanOldFiles();

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('multipart/form-data')) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Content-Type must be multipart/form-data' }));
  }

  const writePromises = [];
  let finished = false;

  try {
    const bb = Busboy({
      headers: req.headers,
      limits: { fileSize: MAX_FILE_SIZE, files: MAX_FILES }
    });

    bb.on('file', (fieldname, stream, info) => {
      const ext = path.extname(info.filename || '.jpg').toLowerCase() || '.jpg';
      const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
      if (!allowed.includes(ext)) {
        stream.resume(); // drain and skip
        return;
      }

      const uuid = crypto.randomUUID();
      const safeName = uuid + ext;
      const filePath = path.join(UPLOAD_DIR, safeName);
      const writeStream = fs.createWriteStream(filePath);

      // Track each file write as a promise so bb.on('close') can wait for all of them
      const p = new Promise((resolve, reject) => {
        writeStream.on('close', () => resolve('/uploads/' + safeName));
        writeStream.on('error', (err) => {
          try { fs.unlinkSync(filePath); } catch (e) {}
          reject(err);
        });
        stream.on('error', (err) => {
          writeStream.destroy();
          try { fs.unlinkSync(filePath); } catch (e) {}
          reject(err);
        });
      });
      writePromises.push(p);

      stream.pipe(writeStream);
    });

    bb.on('close', async () => {
      if (finished) return;
      finished = true;
      try {
        // Wait for all file writes to complete before responding
        const urls = await Promise.all(writePromises);
        console.log('[upload-temp] saved', urls.length, 'files:', urls);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ urls }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File write failed: ' + err.message }));
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
