# Running this project locally and on Render

This repository is a Next.js app that uses server-side features (API routes, NextAuth, Stripe webhooks, MongoDB). The recommended hosting option is a Node web service (Render, Vercel, Railway, etc.).

This guide covers:
- Running locally on Windows (cmd.exe)
- Deploying as a Web Service on Render (recommended)
- Notes on static export vs server deployment

---

## 1) Prerequisites

- Node.js v18+ and npm
- Git
- A MongoDB instance (Atlas recommended) if you plan to use the database
- (Optional) Stripe account and API keys if you plan to use Stripe features

## 2) Clone and prepare the repo

Open Command Prompt (cmd.exe) and run:

```cmd
git clone <repo-url>
cd postify
```

Replace `<repo-url>` with your GitHub repository URL.

## 3) Create environment variables

Copy `env.example` to a local env file and edit it:

```cmd
copy env.example .env.local
notepad .env.local
```

Important variables to set:
- MONGODB_URI — MongoDB connection string
- NEXTAUTH_SECRET — a long random string (generate with Node: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- NEXT_PUBLIC_APP_URL — local: `http://localhost:3000`
- LIGHTHOUSE_API_KEY — if using Lighthouse features
- STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET — if using Stripe

Do NOT commit `.env.local` to the repository.

## 4) Install dependencies

```cmd
npm install
```

If you prefer Yarn or pnpm, use those instead.

## 5) Run in development

```cmd
npm run dev
```

Open http://localhost:3000 to view the app.

## 6) Build & run production locally

This project includes two start scripts:
- `npm run start` — uses the PORT environment variable (good for Render)
- `npm run start:local` — starts locally without requiring $PORT

Build and run:

```cmd
npm run build
npm run start:local
```

Or to emulate Render's runtime where Render sets `PORT`:

```cmd
set PORT=10000
npm run start
```

Then open http://localhost:10000.

---

## Deploying to Render (Web Service - recommended)

Why choose Render: it supports Node web services, environment variables, automatic builds from GitHub and is straightforward for Next.js apps with API routes.

High-level steps:
1. Push your repo to GitHub.
2. Go to https://dashboard.render.com and create a new "Web Service".
3. Connect your GitHub repo and choose the branch to deploy.
4. Set the following build and start commands:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
5. Add environment variables in the Render dashboard (these match `env.example`):
   - MONGODB_URI
   - NEXTAUTH_SECRET
   - NEXT_PUBLIC_APP_URL (set to your Render URL, e.g. `https://postify.onrender.com`)
   - LIGHTHOUSE_API_KEY
   - STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
6. (Optional) Add health checks: the repo includes `/api/health` which returns 200 JSON.

Notes for Render:
- `render.yaml` is included to help with IAC; you can edit it or set settings in the Render UI.
- Render injects a `PORT` env var. `npm run start` uses this to listen on the correct port.
- If you get build errors for native modules (e.g., `sharp`), pin Node.js version (we added an `.nvmrc` with `18`) or set `engines` in `package.json`.
- Ensure your MongoDB Atlas allows connections from Render or configure network access appropriately.

### Stripe webhooks
If you use Stripe webhooks, configure the webhook endpoint in Stripe to point at `https://<your-render-url>/api/stripe/webhook`. Add the webhook secret to the `STRIPE_WEBHOOK_SECRET` env var in Render.

---

## Static export vs server (short)

- Static export (`next export`) creates a purely static site. It cannot handle API routes, SSR, or NextAuth. Only use this if you remove server-side features.
- For this project (NextAuth, API routes, webhooks, DB), deploy as a Web Service.

---

## Helpful commands summary

```cmd
npm run dev
npm run build
npm run start      # for Render (uses $PORT)
npm run start:local # run Next.js start locally
npm run lint
```

## Extras I can add
- `engines` in `package.json` or an `.nvmrc` (already added `.nvmrc` with Node 18)
- A health-check route (added at `/api/health`)
- A GitHub Actions workflow or Render cron jobs

If you want any of the extras, tell me which and I'll add them.
