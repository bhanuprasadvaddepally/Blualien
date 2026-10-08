import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Custom Vite Plugin to execute the Vercel serverless function locally during development
const vercelApiPlugin = () => {
  return {
    name: 'vercel-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          try {
            // Load environment variables manually since Vite only loads VITE_* for the client
            const dotenv = await import('dotenv');
            dotenv.config();

            // Import the handler
            const { default: handler } = await import('./api/contact.js');

            // Collect body data
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body);
              } catch (_e) {
                req.body = {};
              }

              // Mock Express res methods used by Vercel
              res.status = (statusCode) => {
                res.statusCode = statusCode;
                return res;
              };
              res.json = (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              };

              await handler(req, res);
            });
          } catch (err) {
            console.error('API Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
          }
          return;
        }
        next();
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiPlugin()],
})
