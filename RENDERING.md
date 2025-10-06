Render deployment checklist for Postify

This file lists exact steps and commands to deploy this Next.js app to Render and to verify locally.

1) Ensure environment variables
- Add in Render (Service -> Environment -> Environment Variables):
  - MONGODB_URI
  - NEXTAUTH_SECRET
  - NEXT_PUBLIC_APP_URL (e.g. https://postify.onrender.com)
  - LIGHTHOUSE_API_KEY
  - STRIPE_PUBLISHABLE_KEY
  - STRIPE_SECRET_KEY
  - STRIPE_WEBHOOK_SECRET

2) Pin Node.js version (already set)
- `.nvmrc` = 20
- `package.json` engines.node = ">=20 <21"

3) Build command (Render setting)
- Build Command: npm install && npm run build
- Start Command: npm run start

4) Local verification (cmd.exe)
- Clean install and build locally:

```cmd
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm run build
```

- Run production locally (simulate Render):

```cmd
set PORT=10000
npm run start
```

5) Troubleshooting
- If a file lock (EPERM) occurs on Windows: close editors, pause OneDrive, kill node processes, restart machine if necessary.
- If native modules like `sharp` fail to build, install build tools or use the prebuilt binaries documented in the package's README.

6) Healthcheck
- Use the built-in endpoint: https://<your-render-url>/api/health

7) Notes
- We set dynamic pages and fixed SSR-only imports to avoid static-generation errors during build.
- If you want, I'll open a PR to handle `npm audit` vulnerabilities safely (non-breaking upgrades where possible).
