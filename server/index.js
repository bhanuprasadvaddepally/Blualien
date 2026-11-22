import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import contactRouter from './routes/contact.js';
import subscribeRouter from './routes/subscribe.js';

const app = express();
const serverDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(serverDirectory, '../client/dist');
const siteUrl = (process.env.SITE_URL || 'http://localhost:5173').replace(/\/$/, '');
const allowedOrigins = new Set([siteUrl]);

if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.add('http://localhost:5173');
  allowedOrigins.add('http://127.0.0.1:5173');
}

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error('Origin is not allowed by CORS.'));
    },
  }),
);
app.use(express.json({ limit: '16kb' }));

function createFormLimiter() {
  return rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
      ok: false,
      errors: { form: 'Too many requests. Please try again in a minute.' },
    },
  });
}

function analyticsSnippet() {
  const analyticsId = process.env.ANALYTICS_ID?.trim();
  if (process.env.NODE_ENV !== 'production' || !analyticsId) return '';
  if (!/^[a-z0-9.-]+$/i.test(analyticsId)) {
    console.warn('ANALYTICS_ID must be a Plausible domain name; analytics is disabled.');
    return '';
  }

  return `<script defer data-domain="${analyticsId}" src="https://plausible.io/js/script.js"></script>\n    <script>window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}</script>`;
}

function sendIndex(_req, res, next) {
  try {
    const html = fs
      .readFileSync(path.join(distDirectory, 'index.html'), 'utf8')
      .replace('<!-- ANALYTICS -->', analyticsSnippet());
    return res.type('html').send(html);
  } catch (error) {
    return next(error);
  }
}

app.get('/api/health', (_req, res) => res.status(200).json({ ok: true }));
app.use('/api/contact', createFormLimiter(), contactRouter);
// Note: /api/subscribe route remains active for backwards compatibility.
app.use('/api/subscribe', createFormLimiter(), subscribeRouter);
app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, errors: { form: 'API route not found.' } });
});

app.use(express.static(distDirectory, { index: false, maxAge: '1h' }));
app.use((req, res) => {
  if (req.method === 'GET' || req.method === 'HEAD')
    return sendIndex(req, res, () => {
      res.status(500).json({ ok: false, errors: { form: 'The site is not available.' } });
    });
  return res.status(404).json({ ok: false, errors: { form: 'Not found.' } });
});

app.use((error, _req, res, _next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, errors: { form: 'Invalid request body.' } });
  }

  if (error.message === 'Origin is not allowed by CORS.') {
    return res
      .status(403)
      .json({ ok: false, errors: { form: 'Origin is not allowed.' } });
  }

  console.error('Unhandled server error:', error);
  return res
    .status(500)
    .json({ ok: false, errors: { form: 'Something went wrong. Please try again.' } });
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`BLUALIEN server listening on port ${port}`);
});

export default app;
