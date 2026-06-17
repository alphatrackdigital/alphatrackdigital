# Notion Sync Summary

Last updated: 2026-06-17.

Do not update Notion from this file without user approval. This is a review-ready sync proposal only.

## Project Updates To Add

- Repo handoff pack created under `docs/codex-handoffs/`.
- Current repo evidence shows Vite React, not Next.js.
- Latest confirmed repo work includes Brevo first/latest source lifecycle fields, Meta event ID/CAPI readiness, Brevo schema fixes, and source attribution.
- Netlify backend deploy remains the main external blocker.
- Brevo transactional webhook should not be registered until deployed endpoint is verified.
- Brevo live state needs read-only UI verification before any activation or campaign operations.

## SOPs To Create Or Update

| SOP | Change |
| --- | --- |
| Brevo CRM and List Routing SOP | Add first/latest source lifecycle fields and deployment dependency warning |
| Brevo Workflow QA SOP | Add suppression/blocklist retest requirements and "no activation without approval" rule |
| Website Lead Capture QA SOP | Add Contact Us, Tracking Audit, Newsletter, Exit Popup, and Brevo Meetings retest checklist |
| Meta/GA4 Conversion QA SOP | Add browser/server event ID matching checks |
| Agent Handoff SOP | Link repo handoff docs and require secret redaction |

## Evidence Records To Create Or Update

- Git commit evidence for `a9cfce7`, `d3d2f51`, `c64e894`, `5299bcc`, `53e4490`, and `03470e5`.
- GitHub PR #24 evidence.
- GitHub issues #25-#29 as open launch/readiness tasks.
- Repo docs evidence: `brevo-campaign-ops-readiness.md`, `brevo-crm-handoff.md`, `brevo-website-alignment.md`, `brevo-qa-2026-06-14.md`.
- Netlify deploy blocker evidence from existing docs/Notion.
- ATD Agency OS initial build handoff evidence.

## Case-Study Notes To Add

- ATD internal MarTech setup demonstrates a multi-flow lead capture system: Contact Us, Strategy Call, Tracking Audit, Newsletter, Exit Popup.
- Implementation includes attribution capture, source lifecycle preservation, consent mapping, Brevo list segmentation, Meta CAPI/event dedupe, and GA4 Measurement Protocol for meetings.
- The case study should clearly separate "implemented in repo" from "verified live in production".
- The blocker narrative is useful: backend deploy readiness exists, but production validation is blocked by Netlify account credits.

## Decisions To Log

- Production frontend remains Namecheap/cPanel static hosting unless changed deliberately.
- `alphatra-serv.netlify.app` is the backend API service for public forms.
- Brevo visual CRM actions are plan-gated; API fallback is used.
- Do not use `admin@alphatrack.digital` as sender.
- SMS remains deferred.
- Raw transcripts and secrets must stay out of Notion.

## Open Tasks To Create Or Update

1. Resolve Netlify account credit/plan blocker and deploy backend after approval.
2. Verify deployed backend commit and API endpoints.
3. Register Brevo transactional webhook only after endpoint verification.
4. Run controlled QA for five lead flows.
5. Verify Brevo contact attribute grouping and source lifecycle attributes.
6. Confirm Meta Events Manager deduplication for Lead/Subscribe events.
7. Confirm GA4 DebugView/Realtime and turn off debug mode after testing.
8. Review Brevo unsubscribe/profile pages and sender/domain compliance.
9. Build first-week launch monitoring report.
10. Review and approve this repo handoff pack before copying summaries into Notion.

## Items To Keep Only In Repo Docs

- Detailed file-level changelog.
- Local session IDs and filesystem paths.
- Environment variable inventories beyond high-level business purpose.
- Any operational troubleshooting that mentions local machine paths.

## Items Requiring Approval Before Notion Update

- Any creation/update of Agency OS pages, tasks, evidence records, SOPs, or comments.
- Any link to GitHub issues/PRs if the user wants private/internal cleanup first.
- Any statement that a Brevo workflow is live-ready.
- Any deployment or live QA claim.

## Hard Warning

Do not copy raw transcripts, secrets, token values, cookies, API keys, webhook secrets, auth headers, credential values, or secret URLs into Notion. Use business-readable summaries and safe proof links only.
