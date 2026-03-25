// server.js — Standalone Express server (no Vercel needed)
// Serves static files from /public and all /api routes

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Load .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) return;
    const key = line.substring(0, eqIdx).trim();
    let val = line.substring(eqIdx + 1).trim();
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  });
}

// Import API handlers (Vercel-style: (req, res) => ...)
const claudeHandler = require('./api/claude.js');
const brandAuditHandler = require('./api/brand-audit.js');
const healthHandler = require('./api/health.js');
const fetchSiteHandler = require('./api/fetch-site.js');
const generateImageHandler = require('./api/generate-image.js');
const imageProxyHandler = require('./api/image-proxy.js');
const uploadTempHandler = require('./api/upload-temp.js');
const competitorPlanHandler = require('./api/competitor-plan.js');

const PORT = process.env.PORT || 3000;

// MIME types for static files
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

// Route map for API handlers
const API_ROUTES = {
  '/api/claude': claudeHandler,
  '/api/brand-audit': brandAuditHandler,
  '/api/health': healthHandler,
  '/api/fetch-site': fetchSiteHandler,
  '/api/generate-image': generateImageHandler,
  '/api/image-proxy': imageProxyHandler,
  '/api/upload-temp': uploadTempHandler,
  '/api/competitor-plan': competitorPlanHandler,
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = parsedUrl.pathname;

  // API routes
  if (pathname.startsWith('/api/')) {
    const handler = API_ROUTES[pathname];
    if (handler) {
      // Parse body for POST requests
      if (req.method === 'POST') {
        const ct = req.headers['content-type'] || '';
        // Multipart requests: let handler consume the raw stream (e.g. busboy)
        if (ct.includes('multipart/form-data')) {
          req.body = {};
          wrapResponse(res);
          try {
            await handler(req, res);
          } catch (err) {
            console.error('API handler error:', err);
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          }
          return;
        }
        // JSON body
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch (e) {
            req.body = {};
          }
          wrapResponse(res);
          try {
            await handler(req, res);
          } catch (err) {
            console.error('API handler error:', err);
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: err.message }));
            }
          }
        });
        return;
      }
      // GET/OPTIONS
      req.body = {};
      req.query = Object.fromEntries(parsedUrl.searchParams.entries());
      wrapResponse(res);
      try {
        await handler(req, res);
      } catch (err) {
        console.error('API handler error:', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      }
      return;
    }

    // Unknown API route
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API route not found' }));
    return;
  }

  // Serve uploaded temp files
  if (pathname.startsWith('/uploads/')) {
    const uploadPath = path.join(__dirname, 'tmp', pathname);
    if (fs.existsSync(uploadPath) && !fs.statSync(uploadPath).isDirectory()) {
      const ext = path.extname(uploadPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(fs.readFileSync(uploadPath));
      return;
    }
  }

  // Static file serving from /public and /assets
  let filePath;
  if (pathname.startsWith('/assets/')) {
    filePath = path.join(__dirname, pathname);
  } else {
    filePath = path.join(__dirname, 'public', pathname === '/' ? 'index.html' : pathname);
  }

  // If path doesn't have extension, try adding .html
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  try {
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      // SPA fallback — serve index.html
      filePath = path.join(__dirname, 'public', 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Wrap Node.js http.ServerResponse to match Vercel's res.status().json() API
function wrapResponse(res) {
  res.status = function (code) {
    res.statusCode = code;
    return res;
  };
  res.json = function (data) {
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
    }
    res.end(JSON.stringify(data));
    return res;
  };
  return res;
}

server.listen(PORT, () => {
  console.log(`\n  Fynd Studio running at http://localhost:${PORT}\n`);
  console.log(`  API keys loaded: ANTHROPIC_API_KEY=${process.env.ANTHROPIC_API_KEY ? 'YES' : 'NO'}, PIXELBIN_API_TOKEN=${process.env.PIXELBIN_API_TOKEN ? 'YES' : 'NO'}, FAL_API_KEY=${process.env.FAL_API_KEY ? 'YES' : 'NO'}, APIFY_API_KEY=${process.env.APIFY_API_KEY ? 'YES' : 'NO'}\n`);
});
