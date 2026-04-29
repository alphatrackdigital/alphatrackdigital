# AlphaTrack Digital Full-Stack Integration Branch

This branch preserves the full-stack AlphaTrack Digital setup: frontend website + backend/API functions.

Use this branch as a safe-keeping and integration reference. Do not use it for normal day-to-day frontend or backend edits unless you intentionally want to update the combined full-stack copy.

## Branch Role

`deploy` is the full-stack safe-keeping branch.

It contains:

- Vite + React frontend
- TypeScript
- Tailwind CSS
- shadcn-ui / Radix UI
- Netlify Functions
- Blog API routes
- Blog admin routes
- Auth function
- Leads/contact form function
- Contacts admin function
- MongoDB/backend dependencies
- Netlify redirects and headers for API + SPA routing

## Relationship to Other Branches

| Branch | Role |
| --- | --- |
| `main` | Production frontend website branch |
| `backend` | Backend/API functions branch |
| `deploy` | Full-stack safe-keeping and integration reference |

## When to Use This Branch

Use `deploy` when you need to:

- Compare how frontend and backend were combined
- Preserve a working full-stack reference
- Recover full-stack files if another branch loses context
- Test an integrated full-stack Netlify build intentionally
- Review frontend/backend integration assumptions

Do not use `deploy` for:

- Normal About Us page edits
- Normal Services page edits
- Header/Footer copy changes
- Design experiments
- Backend-only API fixes that belong on `backend`
- Production frontend changes that belong on `main`

## Tech Stack

Frontend:

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- shadcn-ui / Radix UI
- Framer Motion
- React Helmet Async

Backend/API:

- Netlify Functions
- `@netlify/functions`
- Mongoose
- bcryptjs
- jsonwebtoken
- MongoDB

Testing and tooling:

- ESLint
- Vitest
- Playwright
- Netlify CLI

## Local Development

Clone the repository:

```sh
git clone https://github.com/alphatrackdigital/alphatrackdigital.git
cd alphatrackdigital
```

Switch to this branch:

```sh
git checkout deploy
git pull origin deploy
```

Install dependencies:

```sh
npm install
```

Start local development:

```sh
npm run dev
```

Default Vite URL:

```text
http://127.0.0.1:8080
```

Netlify dev configuration is also present in `netlify.toml`, with Netlify dev intended to proxy through port `8888` while targeting the Vite dev server on port `8080`.

## Available Commands

```sh
npm run dev          # Start Vite dev server
npm run build        # Build frontend, server bundle, and prerender homepage
npm run build:dev    # Development-mode build
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run test:e2e     # Run Playwright tests
npm run test:e2e:ui  # Open Playwright UI mode
npm run preview      # Preview built site locally
```

## Netlify Configuration

This branch includes a full-stack `netlify.toml` setup with:

- Frontend build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Node bundler: `esbuild`
- External Node module handling for `mongoose`
- API redirects to Netlify Functions
- SPA fallback to `/index.html`
- Security headers
- CORS headers for API/function routes
- Cache headers for assets and HTML

Important: SPA fallback must remain last so API routes are not swallowed by React Router.

## API Routes in This Branch

The Netlify config maps these public API routes to functions:

| Route | Function |
| --- | --- |
| `/api/auth/login` | `auth` |
| `/api/blog` | `blog` |
| `/api/blog/:slug` | `blog` |
| `/api/blog/admin` | `blog-admin` |
| `/api/blog/admin/:path` | `blog-admin` |
| `/api/leads` | `leads` |
| `/api/contacts/admin` | `contacts-admin` |
| `/api/contacts/admin/:id` | `contacts-admin` |
| `/api/contacts/admin/read/:id` | `contacts-admin` |

## Environment Variables

Do not commit `.env` files or secrets.

Backend/API functions may require environment variables such as:

- `MONGODB_URI`
- `JWT_SECRET`
- Brevo/contact-form related API keys and list IDs where applicable

Set secrets in Netlify project environment settings, not in GitHub.

## Safe Workflow for Updating This Branch

Only update this branch when intentionally refreshing the full-stack integration copy.

Recommended flow:

```sh
git checkout deploy
git pull origin deploy
git checkout -b chore/update-fullstack-reference
```

After changes:

```sh
npm run lint
npm run build
git status
git diff
git add .
git commit -m "Update full-stack integration reference"
git push origin chore/update-fullstack-reference
```

Open a pull request back into `deploy`.

## Codex Rules for This Branch

When using Codex on `deploy`:

1. Confirm that the work is intentionally full-stack.
2. Inspect frontend and backend files before editing.
3. Do not make broad unrelated UI changes.
4. Do not change API routes without checking `netlify.toml`.
5. Do not edit secrets or commit `.env` files.
6. Run `npm run lint` and `npm run build` after edits.
7. List all changed files and explain why they changed.

High-risk files:

- `netlify.toml`
- `vite.config.ts`
- `src/App.tsx`
- `src/main.tsx`
- `src/entry-server.tsx`
- `scripts/prerender-homepage.mjs`
- `netlify/functions/*`

## Recommended Netlify Project Mapping

Current known Netlify projects:

- `alphatrackdigital` — frontend/live website project, should deploy from `main`.
- `alphatra-serv` — backend/service project, currently related to backend deployment.

Recommended rename for clarity:

```text
alphatra-serv → alphatrackdigital-services
```

Do not connect the public/custom domain to this branch unless the decision is made to move ATD to a single full-stack Netlify project.

## Documentation Maintenance

Update this README whenever the full-stack integration strategy changes, especially if:

- Frontend and backend are merged permanently
- Netlify project ownership changes
- API routes change
- Function names change
- Environment variables change
- `deploy` becomes a true production branch instead of a safe-keeping branch
