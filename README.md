# BLUALIEN — Building what comes next.

BLUALIEN is an AI-native company that builds products, creative systems, technology and media. This repository contains the company website.

## Stack

| Layer           | Technology                                                                      |
| --------------- | ------------------------------------------------------------------------------- |
| Frontend        | React 18, Vite, Tailwind CSS 3, Framer Motion, React Router, react-helmet-async |
| Backend         | Node.js (LTS), Express 5                                                        |
| Validation      | Zod (shared client + server schemas)                                            |
| Email           | Resend (controlled by env vars; skips gracefully if unconfigured)               |
| Database        | SQLite via better-sqlite3 (swappable — all access in `server/lib/db.js`)        |
| Analytics       | Plausible (cookie-free, production only, via `ANALYTICS_ID` env var)            |
| Tooling         | ESLint, Prettier, JavaScript (no TypeScript)                                    |
| Package manager | npm (workspaces)                                                                |

## Project structure

```
/client            Vite + React + Tailwind frontend
  src/
    components/    Navbar, Footer, Work, ContactForm, NewsletterForm, Reveal, Seo, ui/
    pages/         Home, Contact, Work, ContentPages (Products, Studio, Orbit, etc.), NotFound
    data/          work.js (work/proof section data)
    lib/           api.js, validators.js, analytics.js
  public/          favicon, og-image, robots.txt, sitemap.xml, media/
/server            Express backend
  index.js         Main server (helmet, cors, rate-limit, SPA fallback, analytics)
  routes/          contact.js, subscribe.js
  lib/             db.js, mail.js, validation.js, sanitize.js
/legacy            Archived old /src code (for reference until verified)
```

## Setup

```bash
# Clone and install
git clone <repo-url> && cd blualien3
npm install

# Create .env from the example
cp .env.example .env
# Edit .env with your values (see Environment Variables below)

# Development (runs client on :5173, server on :3000, with proxy)
npm run dev

# Production build
npm run build
npm start          # starts Express on PORT (default 3000), serving client/dist + /api
```

## Environment Variables

Copy `.env.example` and fill in values:

| Variable           | Required   | Description                                             |
| ------------------ | ---------- | ------------------------------------------------------- |
| `PORT`             | No         | Server port (default: 3000)                             |
| `NODE_ENV`         | No         | `development` or `production`                           |
| `SITE_URL`         | Yes (prod) | Full URL, e.g. `https://blualien.com`                   |
| `DATABASE_PATH`    | No         | SQLite path (default: `server/data/blualien.sqlite`)    |
| `RESEND_API_KEY`   | No         | Resend API key; leads are stored in DB even without it  |
| `CONTACT_TO_EMAIL` | No         | Where contact form notifications are sent               |
| `FROM_EMAIL`       | No         | Sender address for Resend                               |
| `ANALYTICS_ID`     | No         | Plausible domain name; leave blank to disable analytics |

## Scripts

| Command              | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `npm run dev`        | Starts client (Vite HMR) + server (--watch) concurrently |
| `npm run dev:client` | Client dev server only                                   |
| `npm run dev:server` | Server with file watching only                           |
| `npm run build`      | Builds the client for production                         |
| `npm start`          | Starts production server                                 |
| `npm run lint`       | Runs ESLint on client + server                           |
| `npm run format`     | Runs Prettier on the whole project                       |

## API Routes

| Method | Path             | Description                           |
| ------ | ---------------- | ------------------------------------- |
| GET    | `/api/health`    | Health check (returns `{ ok: true }`) |
| POST   | `/api/contact`   | Contact form submission               |
| POST   | `/api/subscribe` | Newsletter signup                     |

Both POST routes are rate-limited to 5 requests/minute per IP, validate with Zod, check a honeypot field, sanitize input, and store in SQLite.

## Design System: Electric Ink

| Token  | Value     | Usage                                 |
| ------ | --------- | ------------------------------------- |
| paper  | `#F6F5F1` | Base background (~60%)                |
| ink    | `#0E1030` | Dark text, dark sections (~30%)       |
| indigo | `#3B3BF5` | Primary brand accent                  |
| lime   | `#C6F432` | Accent, buttons/highlights (~10% max) |

**Rules**: Flat solid colors only. No gradients, glows, blur, glassmorphism, or neon shadows. 1px ink borders instead of shadows. `0.25rem` border-radius everywhere. Fonts: Bricolage Grotesque (headings), Inter (body).

## Deployment (Render)

The included `render.yaml` configures a single web service:

- **Build**: `npm ci && npm run build`
- **Start**: `npm start`
- **Health check**: `/api/health`

> **Note**: The Render free tier sleeps after 15 minutes of inactivity. For production, use an always-on paid instance or set up a keep-alive ping to `/api/health`. Connect the custom domain `blualien.com` in the Render dashboard.

## Assumptions

1. **Hero background**: Solid paper (#F6F5F1) — maximizes contrast and load speed.
2. **Hero graphic element**: Large indigo outlined "BLUALIEN" wordmark (desktop) and a small indigo square (mobile), both CSS-only.
3. **Logo**: Text wordmark "BLUALIEN" in Bricolage Grotesque (no image logo in nav for the new design).
4. **Border radius**: 0.25rem (4px) everywhere — sharp but slightly softened.
5. **Newsletter**: Placed in the footer, as that's the most common non-intrusive placement.
6. **Contact page**: `/contact` is a separate page (linked from hero "Start a project" button). The hero button scrolls to the Contact section when on the home page.
7. **Privacy/Terms pages**: Not present in the original site, not added (would be empty placeholder content).
8. **Work/proof section**: Content, images, copy, and structure carried over exactly from the original. Only visual styling changed to match Electric Ink tokens.
9. **OG image**: A placeholder `og-image.png` exists in `/client/public/`. Replace with a proper branded 1200×630 image.
10. **Plausible vs GA4**: Using Plausible (cookie-free, no banner needed). The `ANALYTICS_ID` should be a Plausible domain name. GA4 would require a cookie consent banner.
