# AlphaTrack Digital Website

This repository powers the AlphaTrack Digital (ATD) website and supporting deployment workflow.

AlphaTrack Digital is a measurement-first digital growth agency. The website should communicate ATD as a serious, data-driven partner for conversion tracking, analytics, paid media, marketing automation, and measurable growth systems.

## Current Production Role

This branch, `main`, is the primary frontend website branch.

Use `main` for:

- Homepage development
- About Us page
- Services page
- Individual service pages
- Contact page UI
- Header, footer, navigation, and shared frontend components
- SEO pages and public landing pages
- Frontend copy, styling, responsiveness, and brand alignment

Do not use `main` for backend/API experiments.

## Live and Connected Environments

Current Netlify projects:

- `alphatrackdigital` — public/live frontend website project. This should deploy from `main`.
- `alphatra-serv` — backend/service project. Recommended future rename: `alphatrackdigital-services` or `atd-api`.

Important: the public/custom domain should point to the frontend production project, not the backend service project.

## Branch Strategy

The repository currently uses three important long-term branches:

| Branch | Purpose | Use for |
| --- | --- | --- |
| `main` | Production frontend website | Public website pages, UI, copy, SEO, frontend components |
| `backend` | Backend/API functions | Blog API, blog admin, auth, contact/leads functions, contacts admin, database/API logic |
| `deploy` | Full-stack safe-keeping / integration branch | Preserved combined frontend + backend reference. Do not use for normal day-to-day edits. |

Recommended short-lived branch naming:

| Prefix | Use for | Example |
| --- | --- | --- |
| `feature/` | New frontend features or sections | `feature/about-us-redesign` |
| `fix/` | Frontend bug fixes | `fix/mobile-header-overflow` |
| `content/` | Copy and content-only updates | `content/services-copy-refresh` |
| `backend/` | Backend/API changes branched from `backend` | `backend/blog-admin-auth` |
| `hotfix/` | Urgent production fixes | `hotfix/contact-form-error` |
| `chore/` | Setup, dependency, config, or maintenance work | `chore/update-readme` |
| `experiment/` | Temporary design or UX exploration | `experiment/homepage-hero-v2` |

## Tech Stack

Frontend:

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- shadcn-ui / Radix UI
- Framer Motion
- Lucide React icons
- React Helmet Async for SEO

Testing and QA:

- ESLint
- Vitest
- Playwright

Deployment:

- Netlify
- Netlify Functions where required

## Local Development

Clone the repository:

```sh
git clone https://github.com/alphatrackdigital/alphatrackdigital.git
cd alphatrackdigital
```

Install dependencies:

```sh
npm install
```

Start the local dev server:

```sh
npm run dev
```

Default local URL:

```text
http://127.0.0.1:8080
```

## Available Commands

```sh
npm run dev          # Start local Vite dev server
npm run build        # Production build with homepage prerendering
npm run build:dev    # Development-mode build
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run test:e2e     # Run Playwright tests
npm run test:e2e:ui  # Open Playwright UI mode
npm run preview      # Preview production build locally
```

## Important Routes

Current public routes include:

- `/`
- `/about-us`
- `/service`
- `/service/conversion-tracking`
- `/service/marketing-automation`
- `/service/paid-media`
- `/service/:slug`
- `/blog`
- `/blog/:slug`
- `/contact-us`
- `/offer/tracking-audit`
- `/privacy-policy`
- `/terms-of-service`

Note: the services index route is currently singular: `/service`, not `/services`.

## Key Project Files

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Router and app shell |
| `src/pages/` | Page-level components |
| `src/components/` | Shared UI and layout components |
| `src/components/layout/Header.tsx` | Main navigation and persistent CTA |
| `src/config/cta.ts` | Shared CTA labels and destinations |
| `src/data/services.ts` | Core and supporting services data |
| `src/data/companyProfile.ts` | Company profile, CTMA framework, sectors, engagement models |
| `src/lib/routePrefetch.ts` | Lazy route imports and route prefetch map |
| `src/lib/leads.ts` | Frontend lead submission helper |
| `src/index.css` | Global design tokens, gradients, utilities, and base styles |
| `tailwind.config.ts` | Tailwind theme and ATD color tokens |
| `vite.config.ts` | Vite config and local leads proxy |
| `netlify.toml` | Netlify build, function, redirect, and header configuration |
| `scripts/prerender-homepage.mjs` | Homepage prerender build step |

## Current Product Direction

Primary CTA direction:

```text
Get a free growth audit
```

The CTA should not be reverted to “Book a call” or “Book A Free Strategy Call” unless intentionally requested.

Design and brand direction:

- Measurement-first
- Premium and modern
- Clean, structured, and conversion-focused
- Strong text contrast
- Spacious layouts
- Data, tracking, analytics, upward movement, and measurable growth as recurring visual themes
- Avoid generic agency clichés and cluttered visual treatments
- Avoid making the design yellow-heavy

## Safe Development Workflow

For frontend website work:

```sh
git checkout main
git pull origin main
git checkout -b feature/task-name
npm install
npm run dev
```

After changes:

```sh
npm run lint
npm run build
git status
git diff
git add .
git commit -m "Describe the change"
git push origin feature/task-name
```

Then open a pull request into `main`, review the Netlify deploy preview, and merge only after checks pass.

## Codex Development Rules

When using Codex in VS Code:

1. Do not edit `main` directly.
2. Create a short-lived branch for each task.
3. Inspect the relevant files before editing.
4. Make targeted changes only.
5. Avoid broad rewrites unless the task explicitly requires it.
6. Run `npm run lint` and `npm run build` after edits.
7. List all changed files and explain why they changed.
8. Preserve existing routes unless a route change is part of the task.
9. Do not change backend/API functions from a frontend branch.
10. Do not commit secrets, API keys, tokens, or `.env` files.

High-risk files. Edit only when necessary:

- `vite.config.ts`
- `netlify.toml`
- `src/App.tsx`
- `src/main.tsx`
- `src/entry-server.tsx`
- `scripts/prerender-homepage.mjs`
- `netlify/functions/*`

## Backend/API Notes

Backend/API work belongs on the `backend` branch unless intentionally syncing into the full-stack `deploy` branch.

Backend-related functionality includes:

- Blog API
- Blog admin
- Auth
- Leads/contact form functions
- Contacts admin
- MongoDB/database logic
- Netlify function redirects

For backend work, switch to `backend` first:

```sh
git checkout backend
git pull origin backend
git checkout -b backend/task-name
```

## Playwright UI Targeting

This repo includes a Playwright setup for visually picking UI targets and reusing locators in Codex prompts.

```sh
npm run playwright:install
npm run test:e2e
```

Full guide:

```text
docs/playwright-ui-targeting.md
```

Example Codex prompt:

```text
Use Playwright on http://127.0.0.1:8080/about-us.
Inspect this target:
page.getByRole('heading', { name: 'AlphaTrack Digital' })
Explain the spacing issue first, then propose a minimal fix.
```

## Deployment Notes

The production frontend Netlify project should build with:

```sh
npm run build
```

and publish:

```text
dist
```

The Netlify SPA fallback must remain after API redirects so React Router routes work correctly.

## Documentation Maintenance

Update this README whenever any of the following changes:

- Branch strategy
- Netlify project names
- Build commands
- Deployment workflow
- Primary CTA direction
- Routing structure
- Backend/API ownership
- Major development workflow decisions
