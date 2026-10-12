import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
// The bundled build (dist/server.cjs, run by `npm start`) always serves dist/,
// even when the host doesn't set NODE_ENV.
const isProduction = process.env.NODE_ENV === 'production' || path.extname(process.argv[1] ?? '') === '.cjs';

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

async function startServer() {
  if (!isProduction) {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      // Requests for files (e.g. /assets/resume.pdf) that don't exist should 404,
      // not silently render the homepage. Only extension-less routes get the SPA.
      if (path.extname(req.path)) {
        res.status(404).send('Not found');
        return;
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio server running:`);
    console.log(`   ➜ Local: http://localhost:${PORT}\n`);
  });
}

startServer();
