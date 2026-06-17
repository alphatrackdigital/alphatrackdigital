# AlphaTrack Digital - Project Memory

Vite + React + TypeScript marketing site (shadcn-ui/Radix, Tailwind, React Router, SSR prerender for homepage). See [README.md](README.md) for branch roles, hosting, and staging URLs. Do not duplicate that here.

## Usage discipline

- Do not run repo-wide searches or exploration agents for things a single targeted `Grep`/`Glob` can answer.
- Do not re-summarize a change after every small edit. Report once when the task is done.
- Skip browser/Playwright checks for copy, spacing, or styling tweaks. Reserve them for actual interaction or visual verification.
- Do not call external connectors (Brevo, Notion, Netlify, GA4/GTM, GitHub beyond local `git`) unless the task needs live state or the user asked for an update. Read-only lookups for genuinely current info are fine.
- Batch related reads and edits instead of many small round-trips.

## Validation - match effort to risk

- Pure UI/copy/style changes: inspect the diff, skip tests, say so.
- Anything touching form behavior, API payloads, tracking/pixels, auth, schema mappings, persistence, or other business logic: run the narrowest relevant check (`npm run test -- <file>`, a targeted `npm run lint`, or a manual call) before calling it done.
- Before commit, PR, or deploy: run `npm run lint` and `npm run build` (full client+server+prerender). Do not skip this gate even if individual edits were small.
- If you intentionally skip validation, name the risk and what should be run later instead of staying silent about it.

## Brevo / contact-form schema rules

These are data-contract constraints with Brevo, not style preferences. Getting them wrong silently corrupts contact records:

- `SERVICE_INTEREST` is a Brevo **multiple-choice** attribute. Always send it as an array, never a single string.
- `MONTHLY_BUDGET` uses Brevo category values `1`-`4`. Do not send raw currency strings or other ranges.
- Keep consent, attribution (UTMs/gclid/fbclid/landing page/referrer), `source`, `route`, and offer fields explicit in payloads. Do not drop or infer them silently.
- Relevant files: [src/pages/ContactUs.tsx](src/pages/ContactUs.tsx), [api/brevo-subscribe.ts](api/brevo-subscribe.ts), [api/brevo-meeting-webhook.ts](api/brevo-meeting-webhook.ts).

## Editing care

- Do not revert or clobber unrelated user/generated changes that happen to sit near your edit.
- Treat `vite.config.ts`, `netlify.toml`, `src/App.tsx`, `src/main.tsx`, `src/entry-server.tsx`, `scripts/prerender-homepage.mjs`, and `netlify/functions/*` as high-risk. Edit only when the task requires it, and validate with a build afterward.
- Netlify deploys can be blocked by account/plan state. Do not assume a deploy succeeded; verify before registering webhooks or declaring production QA complete.
