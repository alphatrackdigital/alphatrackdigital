# AlphaTrack Digital Backend Functions

This branch contains the backend/API function layer for the AlphaTrack Digital website ecosystem.

Use this branch for Netlify Functions, blog APIs, admin APIs, auth, contact/leads handling, contacts admin functionality, and database-related backend work.

## Branch Role

`backend` is the backend/API branch.

Use it for:

- Blog API
- Blog admin API
- Admin authentication
- Contact form / leads API
- Contacts admin API
- MongoDB models and database connection logic
- Netlify Functions
- Backend CORS and API redirects
- Backend environment variable requirements

Do not use this branch for normal frontend page redesigns.

## Relationship to Other Branches

| Branch | Role |
| --- | --- |
| `main` | Production frontend website branch |
| `backend` | Backend/API functions branch |
| `deploy` | Full-stack safe-keeping and integration reference |

## Netlify Project Role

Current backend/service Netlify project:

```text
alphatra-serv
```

Recommended future rename:

```text
alphatrackdigital-services
```

or:

```text
atd-api
```

This Netlify project should be treated as the backend/API service project, not the public marketing website.

## Tech Stack

Backend/API:

- Netlify Functions
- TypeScript
- Mongoose
- MongoDB
- bcryptjs
- jsonwebtoken

Tooling:

- TypeScript compiler
- Netlify deployment

## Local Setup

Clone the repository:

```sh
git clone https://github.com/alphatrackdigital/alphatrackdigital.git
cd alphatrackdigital
```

Switch to backend branch:

```sh
git checkout backend
git pull origin backend
```

Install dependencies:

```sh
npm install
```

Run type checking:

```sh
npm run type-check
```

## Available Commands

```sh
npm run type-check  # Run TypeScript type checking without emitting files
```

## Key Directories and Files

| Path | Purpose |
| --- | --- |
| `netlify/functions/` | Netlify serverless functions |
| `netlify/functions/auth.ts` | Admin login/auth endpoint |
| `netlify/functions/blog.ts` | Public blog API endpoint |
| `netlify/functions/blog-admin.ts` | Blog admin API endpoint |
| `netlify/functions/leads.ts` | Contact/leads submission endpoint |
| `netlify/functions/contacts-admin.ts` | Contacts admin endpoint |
| `netlify/functions/lib/db.ts` | MongoDB connection helper |
| `netlify/functions/lib/jwt.ts` | JWT signing and verification helper |
| `netlify/functions/lib/http.ts` | Shared HTTP/CORS helpers |
| `netlify/functions/lib/models/` | Database models |
| `netlify.toml` | Backend Netlify function redirects and headers |
| `package.json` | Backend dependencies and scripts |
| `tsconfig.json` | TypeScript config |

## API Route Mapping

The backend `netlify.toml` maps these API routes to functions:

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

Do not commit `.env` files, secrets, API keys, or database credentials.

Required or expected backend variables may include:

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret used for admin JWT signing and verification
- Brevo/contact-form related API keys and list IDs where applicable

Set all sensitive values in Netlify environment variables.

## Safe Backend Workflow

For backend work:

```sh
git checkout backend
git pull origin backend
git checkout -b backend/task-name
```

After editing:

```sh
npm run type-check
git status
git diff
git add .
git commit -m "Describe backend change"
git push origin backend/task-name
```

Open a pull request back into `backend`.

## Codex Rules for Backend Work

When using Codex on this branch:

1. Confirm the current branch is `backend` or a branch created from `backend`.
2. Inspect `netlify/functions`, `netlify.toml`, `package.json`, and related model/helper files before editing.
3. Do not change frontend UI or marketing pages from this branch.
4. Do not change API routes without updating and checking `netlify.toml`.
5. Do not remove CORS/preflight handling unless intentionally replacing it.
6. Do not commit secrets or `.env` files.
7. Run `npm run type-check` after backend changes.
8. List all changed files and explain why they changed.

High-risk files:

- `netlify.toml`
- `netlify/functions/auth.ts`
- `netlify/functions/blog-admin.ts`
- `netlify/functions/contacts-admin.ts`
- `netlify/functions/leads.ts`
- `netlify/functions/lib/db.ts`
- `netlify/functions/lib/jwt.ts`
- `netlify/functions/lib/models/*`

## Frontend Integration Notes

The frontend branch may call backend/API routes such as:

```text
/api/leads
/api/blog
/api/blog/:slug
```

If a backend route changes, update the frontend integration deliberately and test both sides.

## Deployment Notes

This branch is intended for the backend/service Netlify project, not the public website project.

The backend Netlify project should deploy functions from:

```text
netlify/functions
```

Keep backend deployment separate from public website changes unless intentionally merging into the full-stack `deploy` branch.

## Documentation Maintenance

Update this README whenever any of these change:

- API routes
- Function names
- Required environment variables
- Netlify project name
- Database models
- Auth flow
- Blog/contact/admin backend ownership
