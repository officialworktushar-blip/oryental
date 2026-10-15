# Oryntal — Content & Technical Audit

**Live site:** https://oryntal.agency.org.in
**Audit date:** 2026-10-16
**Source root:** `C:\Users\off1c\Business-Projects\Oryntal`
**Companion file:** `content/content.json` (verbatim copy, structured by section)

---

## 1. Stack

| Layer | Technology | Evidence |
|---|---|---|
| Framework | React 19.2.4 (function components, hooks, JSX) | `package.json`, `src/App.jsx` |
| Router | `react-router-dom` 7.14.0 — `BrowserRouter`, client-side `<Routes>` | `src/App.jsx:1-22` |
| Bundler / dev server | Vite 8.0.4 + `@vitejs/plugin-react` | `vite.config.js` |
| Language | JavaScript (JSX), `"type": "module"` | `package.json` |
| Styling | Plain CSS, one file per component/page (`.css` co-located), design tokens in `src/styles/globals.css`; no Tailwind/CSS-in-JS | `src/**/**.css` |
| Fonts | Google Fonts: `Cormorant Garamond` (display) + `Outfit` (body) | `index.html:10-12` |
| Backend (self-host) | Express 5 (`server/index.js`) serving `dist/` + `POST /api/contact` | `server/index.js` |
| Backend (serverless) | Vercel function `api/contact.js` (CommonJS via `api/package.json`) | `api/package.json` |
| Mail | nodemailer 9 (SMTP: `smtpout.secureserver.net`, port 465, TLS) | `.env.local`, `server/index.js:90-95` |
| Database / CMS | Supabase (`reviews` table) via `@supabase/supabase-js` | `src/lib/supabase.js` |
| Transactional email (reviews) | `@emailjs/browser` 4.4.1 | `src/components/ReviewForm.jsx` |
| Lint | ESLint 9 flat config (`eslint.config.js`) | `package.json` |
| Hosting | Vercel (`framework: vite`, output `dist`, SPA rewrite excluding `/api`) | `vercel.json` |
| Dev proxy | `/api` → `http://localhost:3001` | `vite.config.js:7-11` |
| Scripts | `dev`, `build`, `lint`, `preview`, `api`, `start` | `package.json` |

### Folder structure

```
oryntal/
├── api/                     # Vercel serverless functions
│   ├── contact.js           # POST /api/contact (nodemailer)
│   └── package.json         # { "type": "commonjs" }
├── content/                 # this audit output
│   ├── AUDIT.md
│   └── content.json
├── dist/                    # build output (committed)
│   ├── assets/index-*.js | index-*.css | oryntal-logo-*.png
│   ├── testimonials/killian-review.mp4 | xing-ming-review.mp4
│   ├── favicon.svg, icons.svg, index.html
├── public/
│   ├── favicon.svg          # UNUSED
│   ├── icons.svg            # UNUSED
│   └── testimonials/killian-review.mp4 (8.6 MB), xing-ming-review.mp4
├── server/
│   └── index.js             # Express: /api/contact + static dist + SPA fallback
├── src/
│   ├── assets/oryntal-logo.png
│   ├── components/  Navbar.jsx, Footer.jsx, ReviewForm.jsx, Icon.jsx, CustomCursor.jsx (+ .css)
│   ├── hooks/       useScrollReveal.js
│   ├── lib/         supabase.js
│   ├── pages/       Home.jsx, About.jsx, Services.jsx, Contact.jsx, Reviews.jsx (+ .css)
│   ├── styles/      globals.css
│   ├── App.jsx, App.css, main.jsx, index.css (orphan)
├── .env / .env.example / .env.local
├── eslint.config.js, index.html, package.json, README.md,
├── vite.config.js, vercel.json, vite_errors.log (empty)
```

---

## 2. Routes

All routes are client-side, wrapped by `<BrowserRouter>` in `src/App.jsx`.

| Path | Component | Linked from |
|---|---|---|
| `/` | `Home` | Navbar, Footer, mobile menu |
| `/about` | `About` | Navbar, Footer |
| `/services` | `Services` | Navbar, Footer, Home CTAs, Contact CTAs |
| `/contact` | `Contact` | Navbar (CTA), Footer, many CTAs |
| `/reviews` | `Reviews` | **NOT LINKED ANYWHERE** (orphan route — must be typed manually) |
| `https://oryntal-portfolio-showcase.vercel.app/` | external (Navbar "Portfolio", Home "Check Portfolio") | Navbar, Home |
| 404 | **NOT FOUND** — no catch-all `<Route path="*">`; unknown paths render blank page shell (Navbar only) |
| SPA rewrite | `vercel.json` rewrites `/((?!api/).*)` → `/index.html` |

---

## 3. Forms & form endpoints

### 3.1 Contact form — `src/pages/Contact.jsx:263`

- **Method/endpoint:** `POST /api/contact` (`Content-Type: application/json`)
- **Local dev:** Vite proxy → `http://localhost:3001` → Express `server/index.js:62`
- **Production:** Vercel serverless `api/contact.js`
- **Payload:** `{ name, email, company, service, message }`
- **Server side:** validates name/email/message + max lengths (120 / 254 / 5000), then nodemailer SMTP send to `CONTACT_RECEIVER_EMAIL`, `replyTo` = submitter email, subject `New contact message from <name>`
- **SMTP env vars:** `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL`
- **Response contract:** `{ ok: true, message }` / `{ ok: false, error, debug? }`
- **Client-side messages:** `Please fill in your name, email, and message.` · `Something went wrong. Please email us directly at support.oryntal@agency.org.in` · success: `Message Sent!`

### 3.2 Review form — `src/components/ReviewForm.jsx` (modal on Home + Reviews)

- **Primary write:** Supabase `insert` into table `reviews` (`name`, `linkedin`, `review`, `rating`)
- **Notification (best-effort):** `emailjs.send(SERVICE_ID, TEMPLATE_ID, {...}, PUBLIC_KEY)` → `to_email: support.oryntal@agency.org.in`, `subject: New Review Submitted`
- **EmailJS config:** `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` — **all commented out in `.env`**, so email notification is silently disabled unless set in Vercel
- **Read path:** `supabase.from('reviews').select('*').order('created_at', desc)` (Home: `.limit(6)`)

### 3.3 No other forms

No newsletter, no signup/login, no search, no chat widget.

---

## 4. Third-party scripts & services

| Service | Purpose | Loaded from | Config |
|---|---|---|---|
| Google Fonts | Cormorant Garamond + Outfit | `fonts.googleapis.com`, `fonts.gstatic.com` | `index.html` |
| Supabase | Reviews CRUD | `*.supabase.co` (client created at runtime) | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (baked into `dist/assets/index-*.js`) |
| EmailJS | Review notification email | `api.emailjs.com` | `VITE_EMAILJS_*` (unset in `.env`) |
| SMTP (GoDaddy/Titan) | Contact form delivery | `smtpout.secureserver.net:465` | `.env.local` / Vercel env |
| Vercel | Hosting + serverless `/api/contact` | — | `vercel.json` |
| Portfolio subdomain | Outbound link | `oryntal-portfolio-showcase.vercel.app` | Navbar/Home |
| LinkedIn / Instagram / X | Outbound social links | — | `Footer.jsx` |

**No third-party JS tags** (no GTM, no chat widget, no heatmaps, no pixel) exist in `index.html` or injected at runtime.

---

## 5. Analytics IDs

| Tool | ID |
|---|---|
| Google Analytics (gtag/G-) | NOT FOUND |
| Google Tag Manager (GTM-) | NOT FOUND |
| Meta/Facebook Pixel | NOT FOUND |
| Microsoft Clarity | NOT FOUND |
| Hotjar / Mixpanel / Plausible / Umami / Segment | NOT FOUND |
| Schema.org / JSON-LD | NOT FOUND |

**There is zero analytics or event tracking in this project.**

---

## 6. Meta tags (current state)

Present: `<html lang="en">`, charset, viewport, `description`, `title`, favicon + shortcut icon, Google Fonts preconnect/stylesheet.

**Missing:** `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`, `twitter:image`, `<link rel="canonical">`, `robots`, `theme-color`, `apple-touch-icon`, JSON-LD (`Organization`/`WebSite`/`FAQPage`), per-route `<title>` (SPA never updates `document.title` — `/about`, `/services`, `/contact`, `/reviews` all keep the home title).

---

## 7. Broken or missing

### Broken
1. **Favicon 404** — `index.html:5-6` point to `/oryntal-logo.png?v=2`, but the file does **not** exist in `public/` or `dist/` (only `src/assets/oryntal-logo.png`, which Vite hashes to `/assets/oryntal-logo-Cqs0Atb9.png`). Both `<link rel="icon">` and `<link rel="shortcut icon">` 404. `public/favicon.svg` exists but is never referenced.
2. **`/reviews` orphan route** — component + CSS shipped, no nav/footer link points to it.
3. **No 404 route** — `<Routes>` has no `path="*"`; any unknown URL renders navbar on an empty page.
4. **Audio testimonial MIME mismatch** — `Contact.jsx:359-361` renders `<audio>` with `<source src="/testimonials/xing-ming-review.mp4" type="audio/mp4">`; it is a video MP4 reused as audio, so native `<audio>` playback is unreliable in several browsers.
5. **Duplicate JSX attribute** — `Footer.jsx:68-69` `target="_blank" target="_blank"` on the Refund Policy link (survives into `dist/assets/index-*.js`).
6. **LinkedIn "social" link points to an admin dashboard** — `Footer.jsx:7` `https://www.linkedin.com/company/108076048/admin/dashboard/` is a private admin URL and 404s for visitors; used for both the footer text link and the social icon.
7. **Supabase anon key committed in build** — visible in `dist/assets/index-CpZbMCBa.js` (and `.env` is committed alongside `.gitignore`). Expected for Supabase anon keys, but there is no RLS/policy verification here; an insert failure surfaces `Submission failed: <message>` to end users.
8. **ESLint fails** (`npm run lint`): 2 errors — `react-hooks/set-state-in-effect` in `Home.jsx:65` and `Reviews.jsx:44`; 1 warning — `react-hooks/exhaustive-deps` in `useScrollReveal.js:29`.
9. **`vite_errors.log` is empty** but present (stale artifact).

### Missing
10. **All Open Graph / Twitter meta + canonical + per-route titles** (section 6).
11. **Analytics of any kind** (section 5).
12. **Alt text / captions for media:**
    - `Contact.jsx:346` `<video>` — no `aria-label`, no `title`, no `<track kind="captions">`.
    - `Contact.jsx:359` `<audio>` — same.
    - Flag emoji badges use `aria-label={org}` on a `<div>` (non-semantic).
    - Images are covered: all 6 `<img>` usages have `alt` (`Oryntal Logo` ×5, `Oryntal` in footer).
13. **Form accessibility** — Contact form inputs have labels; Review form uses `<label>` **without** `htmlFor`/`id` pairs (`ReviewForm.jsx:123,132,151,161`), so labels are not programmatically associated with inputs.
14. **Pricing / packages section — NOT FOUND** (no names, prices, features, billing periods, or package CTAs anywhere in source or `dist`; only the select option `"Full Package"`).
15. **Phone number, street address, office location — NOT FOUND.**
16. **`README.md` is a stub** (`#Oryntal`, 10 bytes) — no setup/run/deploy docs.
17. **Unused files:** `src/index.css` (never imported — `main.jsx` imports `styles/globals.css`), `src/App.css` (comment only), `public/favicon.svg`, `public/icons.svg`.
18. **Unused/odd dependencies:** `@types/react` + `@types/react-dom` are devDependencies in a pure JS project (no TS config); `express`/`nodemailer` are runtime deps but only used by `server/` and `api/` (not by the browser bundle — acceptable but worth splitting). All other deps are imported somewhere: `react`, `react-dom`, `react-router-dom`, `@supabase/supabase-js`, `@emailjs/browser`, `express`, `nodemailer`.
19. **Console errors:** no runtime/browser session was executed during this audit, so live console output is **NOT VERIFIED**. Static analysis predicts: `favicon` 404 network error, and `[Reviews] Fetch error:` (logged by `Home.jsx:60` / `Reviews.jsx:38`) whenever the Supabase query is rejected (missing table/RLS) — which is also the path that renders `No reviews yet. Be the first to share your experience!`.

---

## 8. Key claims marked per section

`content.json` carries a `highlight_candidates` array (max 3 verbatim phrases) on **27 sections**, e.g.:

- `home_hero`: "We Build Intelligence That Scales" · "…outcomes that matter - faster, smarter, and built for the long game." · "EST 2024 | AI/Web Agency | GST Registered"
- `home_stats_strip`: "417+ Projects Delivered" · "98% Client Satisfaction" · "24/7 Support Availability"
- `services_why_us`: "60% faster delivery…" · "SOC2-aligned practices…" · "…real business metrics, not vanity metrics."
- `contact_testimonials`: the three ROI claims ("80% of our support queries", "conversion rate tripled in just 60 days", "LLM drafts 70% of our legal documents").
- `packages_pricing`: `[]` (section does not exist → NOT FOUND)
