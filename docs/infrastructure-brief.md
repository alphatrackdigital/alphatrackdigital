# AlphaTrack Digital — Infrastructure Brief
*For internal team review. Last updated: May 21, 2026.*

---

## The Problem We're Solving

AlphaTrack Digital's website is a **React SPA** (single-page app) built with Vite + TypeScript. The current production decision is to keep the live website on the existing Namecheap/cPanel LiteSpeed hosting.

The site has three infrastructure concerns:

1. **Hosting** — serve the static React files fast and reliably
2. **Serverless functions** — run the contact/audit form backend (already coded in `api/leads.ts`) so leads go to Brevo
3. **CMS** — let non-developers publish and edit blog posts without touching code

Current production hosting handles static files, but it does not run the Node/serverless functions in this repository. Brevo API submission routes therefore need a separate API deployment, PHP equivalent, or a future hosting migration before they can be treated as live production backend routes.

---

## What's Already Built

- `api/leads.ts` — a fully-written serverless function that validates submissions, applies rate limiting, and sends contacts to Brevo
- `src/lib/leads.ts` — the frontend helper that calls the API
- Contact form and Tracking Audit form — both wired up and ready

**Current decision:** keep the public website on Namecheap/cPanel. Do not assume Netlify or Vercel is production unless this decision is changed explicitly.

---

## Option Comparison

### Option A — Vercel Pro *(Recommended)*

| | |
|---|---|
| **Cost** | $20/month |
| **What it gives you** | Hosting + serverless functions, all in one place |
| **Setup effort** | Low — the codebase is already structured for Vercel |
| **Blog CMS** | Pair with Sanity (free tier) |
| **Commercial use** | Yes, explicitly allowed |
| **Risk** | Low |

**Why it's the cleanest choice:** Deploy once, everything works. The `api/` folder pattern the codebase uses is native to Vercel. No hacks, no workarounds. $20/month is a standard business expense — less than most SaaS tools the team already pays for.

---

### Option B — Vercel Hobby *(Use with caution)*

| | |
|---|---|
| **Cost** | Free |
| **What it gives you** | Same as Pro — hosting + serverless functions |
| **Setup effort** | Same as Pro |
| **Blog CMS** | Pair with Sanity (free) |
| **Commercial use** | **Not permitted per Vercel's Terms of Service** |
| **Risk** | Account suspension without warning |

**The honest take:** Hobby is for personal and open-source projects. Vercel's ToS explicitly excludes commercial use. AlphaTrack is a business generating revenue — using Hobby could result in the site going down with no notice. Fine for short-term testing, **not safe as a long-term production setup.**

---

### Option C — Netlify Free *(Solid backup)*

| | |
|---|---|
| **Cost** | Free (125k function invocations/month included) |
| **What it gives you** | Hosting + serverless functions (Netlify Functions) |
| **Setup effort** | Slightly more — requires minor code adjustment to `api/leads.ts` |
| **Blog CMS** | Pair with Sanity (free) |
| **Commercial use** | Yes, permitted on free tier |
| **Risk** | Low |

**What needs to change:** Netlify uses a different function format than Vercel. The `api/leads.ts` handler would need to be adapted from Vercel's style to Netlify's — roughly 30 minutes of work. Everything else stays the same.

**When to choose this:** If $20/month isn't justified yet, Netlify Free is the responsible alternative. The free tier is ample for ATD's current traffic.

---

### Option D — WordPress *(Current platform — not recommended for this setup)*

| | |
|---|---|
| **Cost** | Already paying (Namecheap shared hosting) |
| **What it gives you** | PHP-based site builder / CMS |
| **What it cannot do** | Run Node.js (required for the contact form backend) |
| **Blog CMS** | Yes — WordPress is excellent as a content editor |
| **Commercial use** | Yes |
| **Risk** | Architectural mismatch with the React codebase |

**The core problem:** WordPress and this React SPA are two different technologies that don't naturally work together.

WordPress runs on PHP and generates HTML pages server-side. The ATD site is a React app that runs in the browser. They live in different worlds. To use WordPress for blog content, you'd have to set up **WordPress as a "headless" CMS** — meaning WordPress handles content only, and the React site fetches posts via WordPress's REST API.

**What that headless setup looks like in practice:**
- You'd need to maintain a separate WordPress install (and keep it updated, secure, plugin-patched)
- Blog posts return raw HTML from WordPress, not structured data — this means limited control over how content looks in the React app
- Still doesn't solve the serverless function problem (Namecheap still can't run Node.js)
- You'd be paying for two platforms: Namecheap (WordPress) + somewhere else for functions

**Where WordPress makes sense:** WordPress is excellent when the whole site is built in WordPress — themes, plugins, the full stack. Using it as a headless content source for a React SPA is a legitimate pattern, but it adds maintenance overhead without clear benefits over a purpose-built headless CMS.

**The comparison that matters:**

| | WordPress Headless | Sanity (recommended) |
|---|---|---|
| Setup complexity | High (maintain WP install + plugins + security) | Low (managed cloud, no server) |
| Content structure | Returns raw HTML blobs | Returns clean structured JSON |
| Free tier | Requires paid hosting | 500k API calls/month free |
| Updates & security | Your responsibility | Handled by Sanity |
| Learning curve | Familiar to WP users | New interface, but simpler |

---

## Blog CMS: Sanity

Regardless of which hosting option you choose (A, B, or C), Sanity is the recommended CMS for managing blog content.

- **Free tier:** 500,000 API calls/month — well beyond what ATD needs
- **Interface:** Clean, fast editor that non-developers can use confidently
- **Integration:** The React site fetches posts from Sanity's API — no plugin conflicts, no PHP
- **Migration:** A developer sets it up once; the team publishes forever after

---

## Recommendation

> **Keep Namecheap/cPanel LiteSpeed as the current production website host.** Use the repository build output for the public frontend. Treat Netlify/Vercel as future migration options only.

This keeps the live website aligned with the current production setup. It does not, by itself, run the Node/serverless Brevo submission code.

If serverless API routes become a production requirement, choose one path deliberately: deploy a separate API runtime, port the Brevo submission handlers to the production host's supported backend runtime, or migrate hosting to Netlify/Vercel and update DNS/deploy docs at the same time.

---

## Action Items (Technical)

1. Keep frontend publishing pointed at the current Namecheap/cPanel production host.
2. If API routes are deployed separately, set these environment variables on that API runtime:
   - `BREVO_API_KEY`
   - `BREVO_CONTACT_LIST_ID=8`
   - `BREVO_AUDIT_LIST_ID=11`
   - `BREVO_NEWSLETTER_LIST_ID=9`
   - `BREVO_LIST_ID=10`
3. Keep the live route map aligned with the React app:
   - `/service/conversion-tracking`
   - `/offer/tracking-audit`
   - `/privacy-policy`
   - `/cookie-policy`
   - `/terms-of-service`
4. Set up Sanity project, create blog schema, migrate existing blog posts when CMS work resumes.
5. Update site to fetch blog posts from Sanity API when CMS work resumes.

Current note: the Brevo API routes are unlocked only after a runtime capable of executing them is available.
