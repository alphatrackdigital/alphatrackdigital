# ATD Master Codex Worklog

Last updated: 2026-06-17.

## Executive Summary

This handoff consolidates verified repo, git, GitHub, Notion, and local Codex-session metadata for AlphaTrack Digital / ATD MarTech work. The current repo evidence shows a Vite + React + TypeScript site with Netlify/Vercel-compatible API handlers, not a Next.js project.

Most recent work focused on Brevo lead capture, source lifecycle preservation, Meta event ID/CAPI readiness, GA4/Brevo meeting webhook tracking, CRM fallback, workflow/readiness documentation, and website page/layout refinements. Live-service changes were not made during this documentation pass.

## Scope Of Review

| Area | Status | Verification |
| --- | --- | --- |
| Repo status and structure | Reviewed | `git status`, `rg --files`, repo docs |
| Existing documentation | Reviewed | `docs/*.md`, `README.md`, `AGENTS.md` |
| Git history and branches | Reviewed | `git log`, `git branch -vv --all` |
| Lead handlers and tracking code | Reviewed | `api/`, `netlify/functions/`, `src/lib/`, tests |
| Codex sessions | Metadata reviewed | `C:\Users\Kenny Dabiri\.codex\session_index.jsonl`, session file listing |
| GitHub PRs/issues | Read-only reviewed | GitHub connector |
| Notion tasks/Agency OS | Read-only reviewed | Notion connector |
| Brevo live UI | Not accessed in this pass | Brevo connector exposed only DOI contact creation, a write/send action |
| Vercel/Netlify local config | Reviewed | `.vercel/project.json`, `vercel.json`, `netlify.toml` |

## Sources Reviewed

- Repo docs: `docs/brevo-campaign-ops-readiness.md`, `docs/brevo-crm-handoff.md`, `docs/brevo-website-alignment.md`, `docs/brevo-qa-2026-06-14.md`, `docs/ga4-codex-management.md`, `docs/google-tag-manager-mcp.md`, `docs/infrastructure-brief.md`, `docs/netlify-credit-control.md`.
- Repo code: `api/leads.ts`, `api/brevo-subscribe.ts`, `api/brevo-meeting-webhook.ts`, `netlify/functions/*.mjs`, `src/lib/*.ts`, `src/pages/ContactUs.tsx`, `src/pages/TrackingLandingPage.tsx`, newsletter and exit-popup components.
- Git: current branch `main`, recent commits through `a9cfce7`.
- GitHub: PR #24 and issues #25-#29.
- Notion: `Finalize Brevo CTMA nurture and handoff workflow`, `Brevo Campaign Ops Readiness - 2026-06-15`, `ATD Agency OS Setup - Initial Notion Build`.
- Local Codex state: 30 named session-index records and 56 session JSONL files located under `C:\Users\Kenny Dabiri\.codex\sessions\2026`.

## Timeline

| Date | Workstream | Confirmed notes | Verification |
| --- | --- | --- | --- |
| 2026-04-07 to 2026-05-10 | Website UX/content | Mobile layout, About, Services, Expertise, Results, homepage and service page work occurred across Codex sessions and PRs. | Codex session index, GitHub PRs #7-#23 |
| 2026-04-30 | Exit popup | Exit-intent Brevo popup work introduced and later refined. | Session index, PR #7, code/tests |
| 2026-05-21 | GTM conversion setup | GTM SPA dataLayer contract documented with container `GTM-MVXWCTZ8`. | Session index, `docs/google-tag-manager-mcp.md`, `src/components/shared/TrackingEvents.tsx` |
| 2026-06-10 | Brevo campaign attributes | PR #24 added `LEAD_SOURCE`, `WEBSITE_ROUTE`, `OFFER`, `CONSENT_STATUS`, `CONSENT_TIMESTAMP`; later merged. | GitHub PR #24, Notion task, git log |
| 2026-06-14 | Brevo workflow QA | Workflows #4-#8 reported active and QA-tested; gaps recorded. | `docs/brevo-qa-2026-06-14.md`, Notion task |
| 2026-06-15 | Campaign ops readiness | Templates 19-30 upgraded; segments planned/created; CRM deal reporting fields added. | `docs/brevo-campaign-ops-readiness.md`, Notion page |
| 2026-06-16 | Deploy blocker and form schema fixes | Netlify deploy blocked by account credits; contact form schema fixed for `SERVICE_INTEREST` array and budget categories. | repo docs, Notion page, git commits `5299bcc`, `a9cfce7` |
| 2026-06-16 | Meta readiness | Meta CAPI/event ID work added for Lead/Subscribe dedupe. | Session index, git commits `c64e894`, `de4ee2e`, `b233323`, `d3d2f51` |
| 2026-06-17 | Agency OS | First version of ATD Agency OS created in Notion by ChatGPT; this repo handoff pack prepared locally. | Notion read-only fetch, this docs folder |

## Completed Work

| Item | Current status | Verification |
| --- | --- | --- |
| Website lead capture handlers for contact, audit, newsletter, exit popup, and meetings | Implemented in repo | code, tests, docs |
| Brevo campaign metadata fields | Implemented in repo | PR #24, git log |
| First/latest source lifecycle fields | Implemented in repo | `a9cfce7`, code/docs |
| UTM/click attribution capture | Implemented in repo | `src/lib/attribution.ts`, docs |
| Meta CAPI for lead flows | Implemented in repo | commits `c64e894`, `d3d2f51`, tests |
| Meta browser/server event ID handoff | Implemented in repo | `src/lib/tracking.ts`, tests |
| GA4 Measurement Protocol meeting webhook | Implemented in repo | `api/brevo-meeting-webhook.ts`, docs |
| Brevo CRM fallback for deals/tasks | Implemented in repo | `docs/brevo-crm-handoff.md`, code |
| Brevo templates 19-30 | Reported upgraded in Brevo | Notion/docs |
| Brevo saved segments 1-10 | Reported created/verified | Notion/docs |
| ATD Agency OS first Notion version | Created by ChatGPT | Notion read-only fetch |

## Attempted But Incomplete Work

- Netlify production deploy to `alphatra-serv` is blocked by account credit usage. Verified from repo/Notion docs, not rerun in this pass.
- Brevo transactional webhook endpoint exists in repo but current production endpoint was documented as `404`; do not register it until deployment is unblocked.
- Brevo Meetings production validation against upgraded backend remains pending.
- Profile update and unsubscribe page brand/design review remains pending.
- Suppression/blocklist behavior has unresolved QA gaps from 2026-06-14.
- Live production use of the latest schema fixes depends on deployment.

## Blockers And Failures

| Blocker | Impact | Verification |
| --- | --- | --- |
| Netlify account credit usage exceeded | Blocks backend deploy to `alphatra-serv`; latest fixes may not be live. | repo/Notion docs |
| Brevo visual CRM actions gated by plan | Deals/tasks handled by API fallback instead. | `docs/brevo-crm-handoff.md` |
| Brevo transactional webhook not registered | Transactional event logging not live. | docs/Notion |
| `codex resume --all` access denied | CLI session listing unavailable; used local files/index instead. | command result |
| Prompt conflicts with repo facts | Prompt says Next.js; repo shows Vite React. Prompt mentions partial Automation #3; later docs say #3 deleted and #4-#8 active. | repo, Notion, docs |

## Current Confirmed State

- Repo branch: `main`, tracking `origin/main`, clean before docs were added.
- Site stack: Vite, React, TypeScript, React Router, Tailwind, shadcn/Radix.
- Primary production hosting decision in docs: Namecheap/cPanel for static frontend; `alphatra-serv.netlify.app` used as backend API service for public forms.
- Vercel exists as linked fallback/comparison infrastructure, with local `.vercel/project.json` present.
- `AGENTS.md` exists.
- No live external system was changed in this pass.

## Unverified Items

- Whether the latest `main` changes are deployed to production.
- Current real-time Brevo workflow active/inactive state as of 2026-06-17 after this pass.
- Current Vercel environment variable values or deployment settings.
- Current Brevo contact attribute grouping in the UI.
- Current Meta Events Manager deduplication status.
- Current GA4 DebugView/Realtime status.
- Any private transcript content not summarized in safe metadata.

## Risk Notes

- Do not treat repo implementation as production behavior until deploy target and commit are verified.
- Do not register Brevo webhooks against endpoints that still return `404`.
- Do not rely on suppression until QA confirms test/suppressed contacts do not receive live sends.
- Do not include raw transcripts or credentials in Notion.
- `GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE` must be false outside temporary DebugView checks.

## Recommended Next Actions

1. Resolve Netlify credit/plan blocker and deploy the backend deliberately after approval.
2. Verify deployed commit and endpoints before any Brevo webhook registration.
3. Run controlled QA for Contact Us, Tracking Audit, Newsletter, Exit Popup, and Strategy Call.
4. Verify Brevo first/latest source attributes exist in the UI before production submissions.
5. Confirm Meta browser and server events show matching event IDs.
6. Review unsubscribe/profile pages and sender/domain compliance before campaign traffic.
7. Sync approved summaries into Notion after reviewing `NOTION_SYNC_SUMMARY.md`.

## Do Not Touch Without Approval

- Brevo workflows, templates, senders, domains, contacts, lists, attributes, segments, forms, or CRM records.
- Brevo emails, campaigns, WhatsApp, transactional emails, test emails, or live messages.
- Vercel/Netlify environment variables, domains, deployment settings, secrets, or production deploys.
- GitHub commits, pushes, merges, PR state, or issue updates.
- Notion pages, tasks, databases, or comments.
- GA4/GTM/Meta settings or publish actions.
