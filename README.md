# AlphaTrack Digital Backend Functions

Backend/API function layer for the AlphaTrack Digital website ecosystem.

This branch contains Netlify Functions for blog APIs, admin APIs, auth, lead/contact handling, and database-related backend work.

## Branch Role

`backend` is for backend/API work only.

Use it for:

- Blog API and blog admin
- Admin authentication
- Contact/leads function
- Contacts admin
- MongoDB models and database helpers
- Netlify function redirects

Frontend website work belongs on `main`.

## Tech Stack

- Netlify Functions
- TypeScript
- Mongoose
- MongoDB
- bcryptjs
- jsonwebtoken

## Local Setup

```sh
git clone https://github.com/alphatrackdigital/alphatrackdigital.git
cd alphatrackdigital
git checkout backend
npm install
npm run type-check
```

## Key Files

| Path | Purpose |
| --- | --- |
| `netlify/functions/` | Serverless functions |
| `netlify/functions/auth.ts` | Admin auth |
| `netlify/functions/blog.ts` | Blog API |
| `netlify/functions/blog-admin.ts` | Blog admin API |
| `netlify/functions/leads.ts` | Leads/contact submissions |
| `netlify/functions/contacts-admin.ts` | Contacts admin API |
| `netlify/functions/lib/db.ts` | MongoDB connection |
| `netlify/functions/lib/jwt.ts` | JWT helpers |
| `netlify.toml` | Function routing and headers |

## Environment Variables

Do not commit secrets.

Expected variables may include:

```text
MONGODB_URI
JWT_SECRET
```

Additional third-party API keys should be stored in Netlify environment variables.

## Workflow

```sh
git checkout backend
git pull origin backend
git checkout -b backend/task-name
npm run type-check
```

Open a pull request back into `backend`.

## Netlify

Current backend project:

```text
alphatra-serv
```

Recommended future name:

```text
alphatrackdigital-services
```

This project should be treated as the backend/API service, not the public marketing website.
