# MIGRATION MAP — Blualien Website

## Audit Summary

### Previous Stack (in `/src` and root)

- React 18 + Vite (no Tailwind)
- Custom CSS with dark theme (#030303 background, blue #2100BF brand)
- BrowserRouter, inline CSS utilities (hand-rolled flex/grid/gap classes)
- Vercel serverless `/api/contact.js` endpoint (Resend only, no DB)
- Lucide React icons, Inter font
- No Tailwind, no Framer Motion, no Helmet, no analytics

### New Stack (in `/client` + `/server`)

- React 18 + Vite + Tailwind CSS 3 + Framer Motion
- Electric Ink design system: paper #F6F5F1, ink #0E1030, indigo #3B3BF5, lime #C6F432
- Bricolage Grotesque (headings) + Inter (body) via Google Fonts
- Node.js + Express backend with SQLite (better-sqlite3), Resend email, Zod validation
- react-helmet-async for per-page SEO
- Plausible analytics (or GA4 via ANALYTICS_ID)
- Code-split routes via React.lazy

### Hero Background Choice

**Solid paper (#F6F5F1)** background — chosen because:

1. Maximum contrast with ink text (WCAG AAA at 15.4:1)
2. Fastest possible load (no image, no gradient)
3. The restrained geometric element is a large indigo outlined "BLUALIEN" wordmark (desktop) and a small indigo square (mobile), both CSS-only — zero extra bytes, flat, no glow/gradient

---

## Section → Component Map

| Old file/section                     | New location                                                             | Notes                                    |
| ------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------- |
| `src/pages/Home.jsx` → Hero          | `client/src/pages/Home.jsx` → `Hero()`                                   | Completely redesigned per spec           |
| `src/pages/Home.jsx` → Ecosystem     | `client/src/pages/Home.jsx` → `Ecosystem()`                              | Same content, restyled with Electric Ink |
| `src/pages/Home.jsx` → Studio        | `client/src/pages/Home.jsx` → `Studio()`                                 | Same content, restyled                   |
| `src/pages/Home.jsx` → How We Work   | `client/src/pages/Home.jsx` → `Process()`                                | Same 5 steps, flat cards (no gradient)   |
| `src/components/WorkGrid.jsx`        | `client/src/components/Work.jsx`                                         | Same data/images, flat styling           |
| `src/data/workData.js`               | `client/src/data/work.js`                                                | Identical data, unchanged                |
| `src/pages/Home.jsx` → Build With Us | `client/src/pages/Home.jsx` → `BuildWithUs()`                            | Same 4 cards, restyled                   |
| `src/components/Navbar.jsx`          | `client/src/components/Navbar.jsx`                                       | Focus trap, Escape close, aria           |
| `src/components/Footer.jsx`          | `client/src/components/Footer.jsx`                                       | Added NewsletterForm                     |
| `src/pages/Contact.jsx`              | `client/src/pages/Contact.jsx` + `client/src/components/ContactForm.jsx` | Zod validation, honeypot, aria-live      |
| `src/pages/About.jsx`                | `client/src/pages/ContentPages.jsx` → `About()`                          | Same copy                                |
| `src/pages/Products.jsx`             | `client/src/pages/ContentPages.jsx` → `Products()`                       | Same copy                                |
| `src/pages/Studio.jsx`               | `client/src/pages/ContentPages.jsx` → `Studio()`                         | Same copy                                |
| `src/pages/Orbit.jsx`                | `client/src/pages/ContentPages.jsx` → `Orbit()`                          | Same copy                                |
| `src/pages/Labs.jsx`                 | `client/src/pages/ContentPages.jsx` → `Labs()`                           | Same copy                                |
| `src/pages/People.jsx`               | `client/src/pages/ContentPages.jsx` → `People()`                         | Same copy                                |
| `src/pages/Careers.jsx`              | `client/src/pages/ContentPages.jsx` → `Careers()`                        | Same copy                                |
| `src/pages/Journal.jsx`              | `client/src/pages/ContentPages.jsx` → `Journal()`                        | Same copy                                |
| `src/pages/Work.jsx`                 | `client/src/pages/Work.jsx`                                              | Same case studies                        |
| (none)                               | `client/src/pages/ContentPages.jsx` → `NotFound()`                       | New 404 page                             |

## New backend files

| File                         | Purpose                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `server/index.js`            | Express app: helmet, cors, rate-limit, static serve, SPA fallback, analytics injection |
| `server/routes/contact.js`   | POST /api/contact — Zod, honeypot, DB store, email                                     |
| `server/routes/subscribe.js` | POST /api/subscribe — Zod, honeypot, DB dedupe                                         |
| `server/lib/db.js`           | SQLite via better-sqlite3, swappable module                                            |
| `server/lib/mail.js`         | Resend email, graceful skip if env vars missing                                        |
| `server/lib/validation.js`   | Shared Zod schemas                                                                     |
| `server/lib/sanitize.js`     | Text/email sanitization, honeypot check                                                |

## New shared/util files

| File                                       | Purpose                                                       |
| ------------------------------------------ | ------------------------------------------------------------- |
| `client/src/lib/api.js`                    | Fetch wrapper for /api endpoints                              |
| `client/src/lib/validators.js`             | Client-side Zod schemas (mirror server)                       |
| `client/src/lib/analytics.js`              | Plausible trackEvent wrapper                                  |
| `client/src/components/Reveal.jsx`         | Framer Motion scroll reveal (respects prefers-reduced-motion) |
| `client/src/components/Seo.jsx`            | react-helmet-async wrapper                                    |
| `client/src/components/ui/Button.jsx`      | Reusable button/link with variants                            |
| `client/src/components/ui/Section.jsx`     | Consistent section wrapper                                    |
| `client/src/components/NewsletterForm.jsx` | Newsletter signup in footer                                   |

## Assets (all preserved, paths unchanged)

All work images/videos remain in `client/public/media/` with identical filenames.
Logo: removed (navbar now uses text wordmark "BLUALIEN" per Electric Ink spec).
Favicon: `client/public/favicon.png`
OG image: `client/public/og-image.png` (1200×630)

## Legacy

The old `/src` folder, root `index.html`, and root `vite.config.js` are archived to `/legacy/` for reference.
