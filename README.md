# 🌸 Bloom — Private Period & Cycle Tracker

A beautiful, private period and cycle tracker built with React, TypeScript, and Tailwind CSS.

## Features

- **Cycle Ring Visualization** — See your current cycle day and phase at a glance with a colorful ring chart
- **4 Phase Tracking** — Menstrual, Follicular, Ovulation, and Luteal phases with personalized tips
- **Daily Logging** — Track flow level, moods, symptoms, and notes
- **Calendar View** — Monthly overview with phase-colored cells and log indicators
- **Insights Dashboard** — See your most common moods and symptoms over time
- **Period Countdown** — Know exactly how many days until your next period
- **Private by Design** — Your cycle entries are stored locally in your browser. We do not send your cycle data to our backend.

## Getting Started

### For Users
Simply visit the published URL to start using Bloom. No account needed — just enter your name and cycle details in the setup wizard.

### For Developers

```bash
# Install dependencies (requires Node 18+ and pnpm)
pnpm install

# Start dev server
pnpm dev

# Type-check
pnpm check

# Build for production
pnpm build

# Start production server
pnpm start
```

## Tech Stack

- **React 19** + TypeScript
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Wouter** for routing
- **localStorage** for data persistence
- **Express** production server (serves the built frontend)

## Privacy

Bloom stores cycle entries, moods, symptoms, and notes exclusively in your browser's localStorage. Your personal cycle data is never sent to our servers. The app does load external resources (Google Fonts for typography). Analytics are entirely optional: they only activate when the `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` environment variables are set at build time. Anyone deploying their own instance controls which analytics service (if any) is used, and no cycle data is included in analytics events.

## Design

Built with a **Botanical Wellness** aesthetic featuring:
- Warm parchment tones and nature-inspired phase colors
- DM Serif Display + Nunito typography
- Organic shapes and gentle bloom animations
- Mobile-first responsive design

---

## Deployment

### Requirements

- **Node.js** 18 or later
- **pnpm** (package manager — install with `npm install -g pnpm`)

### Build & Run

```bash
# 1. Install dependencies
pnpm install

# 2. Build frontend + bundle server
pnpm build

# 3. Start the production server
pnpm start
```

The build produces:
- **`dist/public/`** — compiled frontend (HTML, JS, CSS)
- **`dist/index.js`** — bundled Express server

The Express server at `dist/index.js` serves the frontend from `dist/public/` and handles SPA client-side routing by returning `index.html` for all routes.

### Environment Variables (all optional)

| Variable | Description |
|---|---|
| `PORT` | Port for the production server (default: `3000`) |
| `VITE_ANALYTICS_ENDPOINT` | Base URL of a self-hosted Umami analytics instance |
| `VITE_ANALYTICS_WEBSITE_ID` | Website ID for Umami analytics |

`VITE_*` variables must be set **at build time** (`pnpm build`). Analytics only loads when both analytics variables are present.

### Health Check

The server exposes `GET /health` → `200 { "status": "ok" }` for uptime monitoring.

### Troubleshooting: Wrong Page Showing at Custom Domain

If a placeholder or wrong page appears at your custom domain after deployment, check:

1. **Wrong build/start command** — Bloom uses an Express Node.js server, not static hosting. The start command must be `node dist/index.js` (or `pnpm start`). Pointing a static host at `dist/public/` directly also works but requires SPA fallback to `index.html`.
2. **Wrong publish directory** — The built frontend is in `dist/public/`, not `dist/` or `public/`.
3. **Custom domain not pointing to the right service** — Verify your DNS or host's custom domain binding targets the correct deployed service.
4. **Old build cached** — Re-run `pnpm build` after any configuration changes, and hard-refresh the browser.

---

Made with 🌸 for you
