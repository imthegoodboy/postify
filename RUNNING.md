# Running this project on another laptop

These instructions assume you're on Windows and using the default Command Prompt (cmd.exe). They walk through cloning the repository, creating environment variables from `env.example`, installing dependencies, and running the Next.js app locally.

1. Install prerequisites

- Node.js (v18+ recommended) and npm. Download from https://nodejs.org/ and install.
- (Optional) If you prefer pnpm or yarn, install them globally.

2. Clone the repository

Open Command Prompt and run:

```
git clone <repo-url>
cd postify
```

Replace `<repo-url>` with the GitHub clone URL (HTTPS or SSH) and `postify` with the repo folder name if different.

3. Create environment variables

Copy the example env file to a local env file and edit values:

```
copy env.example .env.local
notepad .env.local
```

Fill in the values for:
- MONGODB_URI — your MongoDB connection string
- NEXTAUTH_SECRET — a long random string (can be generated with Node: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- LIGHTHOUSE_API_KEY — your Lighthouse API key (if used)
- STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET — Stripe keys if you use Stripe features
- NEXT_PUBLIC_APP_URL — typically `http://localhost:3000` for local dev

Do NOT commit `.env.local` to git.

4. Install dependencies

From the repository root run:

```
npm install
```

If you use Yarn:

```
yarn
```

Or pnpm:

```
pnpm install
```

5. Run the development server

Start the app in development mode:

```
npm run dev
```

This runs `next dev` (see `package.json`). By default the app will be available at http://localhost:3000.

6. Build and run production locally (optional)

To test the production build locally:

```
npm run build
npm start
```

7. Common troubleshooting

- If you get errors about missing environment variables, open `.env.local` and confirm keys are present.
- If MongoDB connection fails, check `MONGODB_URI` and that your IP is allowed in Atlas or your MongoDB server is reachable.
- If you see port-in-use errors, stop the process using the port or change `NEXT_PUBLIC_APP_URL`/port settings.
- For issues with native modules like `sharp` on Windows, you may need build tools: install windows-build-tools or follow sharp's Windows installation notes.

8. Helpful commands

```
npm run dev      # dev server
npm run build    # build for production
npm start        # start production server
npm run lint     # run linter
```

9. Security reminder

Keep secrets (Stripe keys, DB credentials, NEXTAUTH_SECRET) out of git. Use environment variables, and for production, use your hosting provider's secret management.

--

If you'd like, I can also add a GitHub Actions workflow that runs lint/build or a more detailed troubleshooting section (Windows-specific sharp installation). Tell me which extras you want.
