## Local setup

### 1. Frontend

```bash
npm install
npm run dev
```

The frontend uses `VITE_API_BASE_URL` and contains no private API credentials.

### 2. Backend

Create `server/.env` from `server/.env.example` and set. The backend loads this file automatically on startup:

- `DEAN_EMAIL`
- `DEAN_PASSWORD` (at least 14 characters on first setup)
- `ALLOWED_ORIGINS`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- optional `GROQ_API_KEY`
- optional `GROQ_MODEL` (default: `openai/gpt-oss-20b`)

Start it with:

```bash
npm run server
```

If `/api/auth/login` returns **503**, the backend has not loaded valid `DEAN_EMAIL`/`DEAN_PASSWORD` yet. This is intentionally fail-closed; do not hard-code credentials into the React app. After setting the values in `server/.env`, restart the backend once so it creates `server/data/admin.json` with a password hash.

On first startup the server hashes the Dean password with Node's `scrypt` and stores only the hash in `server/data/admin.json`. The plaintext password is never stored by the application.

## Production checklist

- Use HTTPS.
- Prefer serving the React app and `/api` from the same origin through a reverse proxy.
- Set a strong unique Dean password and rotate any credential that was ever exposed in an older source archive.
- Keep `server/.env`, `server/data/admin.json` and `server/data/audit.json` outside source control.
- Configure Cloudinary upload restrictions as a second layer of defense.
- Back up `server/data/content.json` and audit records.
- Run `npm audit`, `npm run build` and a secret scan in CI.
- Add MFA at the deployment layer or extend the admin authentication flow before opening the CMS to the public internet.


## SGGS T&P Career Copilot

The Copilot is intentionally **not fine-tuned on private website data**. It uses the published CMS snapshot as a small, server-side retrieval context and a strict response contract. This keeps institutional facts current without training the model on credentials or private records.

- Model default: `openai/gpt-oss-20b`
- Server-only Groq API key
- Published CMS facts only
- Strict JSON schema response with a single `answer` field
- Maximum short-answer policy: about 55 words
- Low-temperature generation and hidden reasoning
- Server-side length guard as a final safety net

This structured-output approach is used instead of relying only on prompt wording, so the UI receives one predictable short answer rather than arbitrary headings, tables or long formatted responses. Groq documents strict JSON-schema structured outputs for GPT-OSS 20B.


## Vercel deployment

This repository is prepared for a **single Vercel project**: Vite serves the React application and `api/[[...path]].mjs` exposes the Node API under `/api/*`.

### Vercel settings

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node.js runtime: use the Vercel project default/current Node runtime; no custom `functions.runtime` block is required.

### Vercel environment variables

Set these in **Project → Settings → Environment Variables**:

```text
DEAN_EMAIL=dean@sggs.ac.in
DEAN_PASSWORD=<strong-password-14-or-more-characters>
SESSION_SECRET=<random-secret-at-least-32-characters>

CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>

GROQ_API_KEY=<optional>
GROQ_MODEL=openai/gpt-oss-20b
```

For a single-project deployment, keep:

```text
VITE_API_BASE_URL=/api
```

The frontend API client automatically adds `/api` when an external backend URL is supplied without it, so `https://example-backend.vercel.app` becomes `https://example-backend.vercel.app/api`.

### Production CMS storage

Vercel serverless functions do not provide a durable writable project filesystem. The production build therefore stores only the **editable CMS JSON and audit log** in Upstash Redis. Images and PDFs continue to use Cloudinary. The bundled `server/data/content.json` is used only as the initial seed when the Redis keys do not exist.

Create an Upstash Redis database and copy its REST URL and standard REST token into Vercel Production environment variables:

```text
UPSTASH_REDIS_REST_URL=https://<your-db>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<server-only-token>
```

Never expose the standard Redis token through a `VITE_` variable. The API accesses Redis server-side. The CMS content is stored under `sggs-tnp:content` and the audit history under `sggs-tnp:audit`. If Redis is unavailable locally, the application falls back to the bundled JSON files for development.

Upstash's REST API is designed for serverless environments and supports HTTP `GET`/`SET` operations, which is why no long-lived Redis TCP connection is required.

### Login troubleshooting

A production login request should be:

```text
POST https://<your-domain>/api/auth/login
```

not:

```text
POST https://<your-backend-domain>/auth/login
```

If the browser requests `/auth/login` without `/api`, check `VITE_API_BASE_URL`.

If the request reaches `/api/auth/login` but returns 503, check `DEAN_EMAIL` and `DEAN_PASSWORD` in the Vercel Production environment.

If a separate frontend and backend are used, set the backend `ALLOWED_ORIGINS`/`FRONTEND_URL` to the exact frontend origin.

### Verification

After deployment, check:

```text
https://<your-domain>/api/health
```

It should return JSON showing the API is healthy. Then open:

```text
https://<your-domain>/login
```

and test Dean login.

