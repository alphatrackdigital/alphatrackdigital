# AlphaTrack Digital Full-Stack Reference

This branch preserves the combined frontend + backend setup for AlphaTrack Digital.

It is a safe-keeping and integration reference branch, not the normal day-to-day development branch.

## Branch Role

`deploy` contains:

- Frontend website
- Netlify Functions
- Blog API
- Blog admin
- Auth
- Leads/contact function
- Contacts admin
- Full Netlify routing setup

## Related Branches

| Branch | Purpose |
| --- | --- |
| `main` | Production frontend website |
| `backend` | Backend/API functions |
| `deploy` | Full-stack reference and safe-keeping branch |

## When to Use This Branch

Use `deploy` when you need to:

- Compare frontend/backend integration
- Preserve or recover full-stack setup
- Test a full-stack Netlify build intentionally

Do not use it for normal frontend page edits or backend-only fixes.

## Setup

```sh
git clone https://github.com/alphatrackdigital/alphatrackdigital.git
cd alphatrackdigital
git checkout deploy
npm install
npm run dev
```

## Build

```sh
npm run lint
npm run build
```

## Netlify Note

Do not connect the public domain to this branch unless ATD intentionally moves to a single full-stack Netlify deployment.
