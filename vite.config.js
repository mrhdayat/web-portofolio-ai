import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory cache for gallery API responses
const galleryCache = new Map();

export default defineConfig({
  server: {
    fs: {
      allow: ['..']
    }
  },
  // Build optimizations
  build: {
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
        }
      }
    }
  },
  plugins: [
    react(),
    {
      name: 'serve-parent-image-folders',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const decodedUrl = decodeURIComponent(req.url);

          // ── Gallery API with in-memory cache ──
          if (decodedUrl.startsWith('/api/gallery/')) {
            const folderName = decodedUrl.replace('/api/gallery/', '');

            // Return cached response if available
            if (galleryCache.has(folderName)) {
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Cache-Control', 'public, max-age=300');
              res.end(galleryCache.get(folderName));
              return;
            }

            const folderPath = path.resolve(__dirname, '..', folderName);

            if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
              try {
                const files = fs.readdirSync(folderPath)
                  .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
                  .map(f => `/${folderName}/${f}`);

                const payload = JSON.stringify({ folder: folderName, images: files });
                galleryCache.set(folderName, payload);

                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'public, max-age=300');
                res.end(payload);
                return;
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to read directory' }));
                return;
              }
            } else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Folder not found' }));
              return;
            }
          }

          // ── Static image files from parent folders ──
          const isCampaignFolder =
            decodedUrl.startsWith('/skincare') ||
            decodedUrl.startsWith('/baju') ||
            decodedUrl.startsWith('/photoshoot brand') ||
            decodedUrl.startsWith('/ai photoshoot');

          if (isCampaignFolder) {
            const filePath = path.join(__dirname, '..', decodedUrl);

            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              let contentType = 'application/octet-stream';
              if (ext === '.jpeg' || ext === '.jpg') contentType = 'image/jpeg';
              else if (ext === '.png') contentType = 'image/png';
              else if (ext === '.webp') contentType = 'image/webp';
              else if (ext === '.svg') contentType = 'image/svg+xml';

              // Aggressive caching for images — 1 year
              res.setHeader('Content-Type', contentType);
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              res.setHeader('Vary', 'Accept-Encoding');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          }
          next();
        });
      }
    }
  ]
});
