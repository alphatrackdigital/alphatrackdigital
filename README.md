# AlphaTrack Digital Website

Official frontend website for AlphaTrack Digital — a measurement-first digital growth agency focused on conversion tracking, analytics, paid media, automation, and measurable marketing performance.

## Project Role

`main` is the production frontend website branch.

Use this branch for:

- Public website pages
- Blog frontend
- Landing pages
- Header, footer, navigation, and shared frontend components
- SEO, copy, styling, and responsive design

Backend/API work belongs on the `backend` branch.

## Tech Stack

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- shadcn-ui / Radix UI
- Framer Motion
- Netlify

## Branches

| Branch | Purpose |
| --- | --- |
| `main` | Production frontend website |
| `backend` | Backend/API functions for blog, auth, leads, and admin tools |
| `deploy` | Full-stack safe-keeping and integration reference |

Short-lived branches should use:

```text
feature/*
fix/*
content/*
backend/*
hotfix/*
chore/*
experiment/*
```

## Local Development

```sh
git clone https://github.com/alphatrackdigital/alphatrackdigital.git
cd alphatrackdigital
npm install
npm run dev
```

Local URL:

```text
http://127.0.0.1:8080
```

## Commands

```sh
npm run dev          # Start local dev server
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run unit tests
npm run test:e2e     # Run Playwright tests
npm run preview      # Preview production build
```

## Development Workflow

Do not edit `main` directly.

```sh
git checkout main
git pull origin main
git checkout -b feature/task-name
```

Before pushing changes:

```sh
npm run lint
npm run build
git status
git diff
```

Then commit and open a pull request into `main`. Review the Netlify deploy preview before merging.

## Netlify

Production frontend project:

```text
alphatrackdigital
```

Build command:

```sh
npm run build
```

Publish directory:

```text
dist
```

## Current Product Direction

Primary CTA:

```text
Book A Free Strategy Call
```

The site should feel modern, premium, clean, conversion-focused, and measurement-first.

## High-Risk Files

Edit these only when necessary:

```text
vite.config.ts
netlify.toml
src/App.tsx
src/main.tsx
src/entry-server.tsx
scripts/prerender-homepage.mjs
netlify/functions/*
```

## Additional Documentation

- `docs/playwright-ui-targeting.md` — Playwright locator workflow for Codex and UI QA.
