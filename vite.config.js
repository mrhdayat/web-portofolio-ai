import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    fs: {
      // Allow Vite to read files one level up
      allow: ['..']
    }
  },
  plugins: [
    react(),
    {
      name: 'serve-parent-image-folders',
      configureServer(server) {
        // Dynamic JSON API to list all images inside a specific campaign folder
        server.middlewares.use((req, res, next) => {
          const decodedUrl = decodeURIComponent(req.url);
          
          if (decodedUrl.startsWith('/api/gallery/')) {
            const folderName = decodedUrl.replace('/api/gallery/', '');
            const folderPath = path.resolve(__dirname, '..', folderName);
            
            if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
              try {
                const files = fs.readdirSync(folderPath)
                  .filter(f => /\.(png|jpe?g|webp)$/i.test(f))
                  // Build a clean URL path relative to the portfolio root
                  .map(f => `/${folderName}/${f}`);
                  
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ folder: folderName, images: files }));
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
          
          // Fallback static files serving from parent folders dynamically
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
              
              res.setHeader('Content-Type', contentType);
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
