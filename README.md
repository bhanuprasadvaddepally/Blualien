# BLUALIEN — Building what comes next.

Blualien is an AI-native company combining creative direction, storytelling, technology, and AI to build products, creative systems, campaigns, and digital experiences.

## Prerequisites

- **Node.js**: `>=20.0.0` (LTS recommended)
- **npm**: `>=10.0.0`

## Quick Start

```bash
# 1. Install dependencies across workspaces
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start development servers (Client on :5173 + Server on :3000)
npm run dev

# 4. Production build
npm run build

# 5. Start production server (serves client/dist + API endpoints)
npm start

# 6. Run linter and formatting checks
npm run lint
npm run format:check
```

## Repository Structure

```
/client          React 18 + Vite + Tailwind CSS frontend application
  ├── public/    Single home for static assets, favicons, branding, and /media/ files
  └── src/       Frontend components, pages, hooks, styling, and data files
/server          Node.js + Express 5 backend handling API routes, security, and persistence
  ├── lib/       Database helper (SQLite), mail delivery, validation, and sanitization
  └── routes/    Express API route handlers (/api/contact, /api/subscribe)
/legacy          Archived vanilla HTML/CSS/JS site (kept for reference)
```

## Folder Map

- `/client`: React frontend workspace powered by Vite, Tailwind CSS, and Framer Motion.
- `/client/public`: Static assets served directly at root URL (favicons, icons, and media files).
- `/client/src/components`: Reusable UI components (Navbar, Footer, Work carousel, ContactForm, Seo).
- `/client/src/data`: Structured content data files (`work.js`, `services.js`, `analytics.js`).
- `/client/src/pages`: Route views (`Home.jsx`, `Contact.jsx`, `ContentPages.jsx`, `Work.jsx`).
- `/server`: Node.js Express backend service with helmet, CORS, and rate limiting.
- `/server/routes`: API endpoint definitions (`contact.js`, `subscribe.js`).
- `/server/lib`: Backend utilities for database operations, validation, sanitization, and email.
- `/legacy`: Preserved original static site archive.

## Environment Variables

Copy `.env.example` to `.env` and configure appropriate values for your environment. Never commit `.env` to source control.

| Variable | Required | Default | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | No | `3000` | Port for Express server |
| `NODE_ENV` | No | `development` | Set to `production` in live environments |
| `SITE_URL` | Yes (prod) | `http://localhost:5173` | Canonical site origin for CORS |
| `DATABASE_PATH` | No | `server/data/blualien.sqlite` | SQLite database file location |
| `RESEND_API_KEY` | No | `""` | Resend API key for lead notification emails |
| `CONTACT_TO_EMAIL`| No | `""` | Recipient address for contact form submissions |
| `FROM_EMAIL` | No | `""` | Sender email address for outgoing Resend notifications |
| `ANALYTICS_ID` | No | `""` | Plausible analytics domain name |

## Content Editing Guide

All website content and media paths are structured in clean, centralized files:

- **Work / Proof Projects**: Edit `client/src/data/work.js`. Update project titles, categories, summaries, tags, posters, videos, and carousel `media` arrays.
- **Pillars (Products, Studio, Orbit, Labs)**: Edit `client/src/pages/Home.jsx` (`pillars` array) and `client/src/pages/ContentPages.jsx` for dedicated sub-pages.
- **Services (Creative, Growth, Digital)**: Edit `client/src/data/services.js` for studio service offerings and capability lists.
- **Orbit Media (@thegararushil, Alien's Orbit, Beyond 100X)**: Edit `client/src/pages/ContentPages.jsx` under `orbit` content object.
- **Team & Leadership**: Edit `client/src/pages/ContentPages.jsx` under `about` and `people` content objects.
- **Media & Images**: Place images and videos in `client/public/media/` and reference them with leading slash paths (e.g. `/media/your-file.jpg`).

## Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `concurrently ...` | Starts Vite dev server + Express server concurrently |
| `npm run dev:client` | `vite` | Starts client development server only |
| `npm run dev:server` | `node --watch server/index.js` | Starts Express backend server with file watching |
| `npm run build` | `vite build` | Compiles production assets into `client/dist/` |
| `npm start` | `node server/index.js` | Runs Express server in production |
| `npm run lint` | `eslint` | Lints all client and server source code |
| `npm run format` | `prettier --write .` | Formats all files across the repository |
| `npm run format:check` | `prettier --check .` | Checks formatting across the repository |
# Blualienbhanuv
