# Evidence Review Queue

Last updated: 2026-06-18.

This queue prioritizes evidence review without copying files, opening live tools, or updating Notion. Use it alongside `EVIDENCE_ARCHIVE_INVENTORY.md`.

## Priority 1 Evidence To Review Before Live QA

| Evidence | Why it matters | Next action |
| --- | --- | --- |
| `src/test/api-endpoints.test.ts` and `src/lib/apiEndpoints.ts` | Confirms Vercel-like testing hosts use same-origin API paths. | Rerun targeted tests if code changes; verify active Vercel test URL separately. |
| `test-results/brevo-browser-qa-20260615003058/*.png` | Historical form success screenshots for Contact, Tracking Audit, Newsletter, Exit Popup. | Human-review content; then retest same flows on current Vercel setup. |
| `test-results/brevo-browser-qa-book-call-20260615003058/book-a-call-page.png` | Historical Book A Free Strategy Call page evidence. | Human-review and retest on current Vercel setup. |
| `docs/brevo-qa-2026-06-14.md` | Records workflow QA passes and known failures. | Use as retest checklist; do not treat as current launch proof. |
| `docs/brevo-website-alignment.md` | Maps lead flows and attributes. | Verify against Vercel test submissions before live work. |
| `docs/codex-handoffs/WEBSITE_AND_TRACKING_STATE.md` | Current website/tracking state summary. | Keep updated with Vercel testing and future Netlify target context. |

## Priority 2 Evidence To Review Before Case-Study Drafting

| Evidence | Why it matters | Next action |
| --- | --- | --- |
| Root service-page review screenshots | Show visual evolution of paid media/conversion tracking pages. | Select only current/final screenshots; replace with fresh Vercel captures if needed. |
| Root `tmp-*.png` screenshot groups | Historical page iteration evidence. | Avoid bulk use; choose a small set after visual review. |
| `.tmp-audit/*.png` visual captures | May contain useful before/after page evidence. | Review for current relevance and privacy before reuse. |
| Homepage proof tests | Internal support for proof metrics rendering. | Pair with source-approved case-study claims before public use. |
| Public website visual assets | Useful for case-study visuals but not proof by themselves. | Use only with editorial approval and source context. |

## Priority 3 Evidence For Later Cleanup

| Evidence | Issue | Suggested action |
| --- | --- | --- |
| `.tmp-audit/pdfextract/` and `.tmp-audit/pdf-tools/` | Generated tooling/dependencies, not evidence. | Consider cleanup only after user approval. |
| `.playwright-mcp/*.log` and `.playwright-mcp/*.yml` | Browser automation logs can be large and sensitive. | Keep out of Notion; archive or clean only with approval. |
| Root `tmp-*.png` images | Many historical screenshots clutter root. | Later move curated safe files into a controlled evidence folder if approved. |
| `test-results/.last-run.json` | Test runner state, not narrative evidence. | Keep internal only. |

## Evidence Needing Screenshots Added

- Current Vercel development/testing homepage, Contact Us, Tracking Audit, Newsletter, Exit Popup, and Book A Free Strategy Call screens.
- Current Vercel form submission success states after safe controlled test submissions.
- Current Meta Events Manager browser/server deduplication view after approved test events.
- Current GA4 DebugView/Realtime event views after approved test events.
- Current Brevo attribute grouping/source lifecycle UI after explicit read-only UI approval.
- Future Netlify deployed frontend and backend endpoint proof after paid plan purchase and approved deployment.

## Evidence Needing Live Retest

- Contact Us form submission on the active Vercel testing setup.
- Tracking Audit form submission on the active Vercel testing setup.
- Newsletter subscription behavior on the active Vercel testing setup.
- Exit popup submission on the active Vercel testing setup.
- Brevo Meetings booking webhook behavior after the active server target is confirmed.
- Meta CAPI/browser deduplication for `Lead` and `Subscribe`.
- GA4 Measurement Protocol meeting event behavior.
- Brevo workflow suppression for test and sales-converted contacts.

## Evidence To Keep Out Of Notion

- `test-results/brevo-playwright-storage-state.json`
- `test-results/brevo-account-audit-2026-06-15.json` until reviewed/redacted
- `test-results/brevo-playwright-current.png`
- `brevo-contacts-before-filter.png`
- `.playwright-mcp/*`
- Raw Codex session JSONL files
- Local credential paths, browser storage state, auth/session files, and raw logs

## Evidence That Can Later Support The ATD Internal Case Study

- Sanitized Vercel testing screenshots showing the five lead flows.
- Sanitized before/after website page screenshots from curated root or `.tmp-audit` assets.
- Repo docs proving source lifecycle, consent mapping, and tracking implementation.
- Git commits proving Meta CAPI/event ID and Brevo source lifecycle work.
- Historical Brevo QA docs with explicit caveats.
- Future Netlify live deployment proof after paid plan purchase and approved launch.

## Future Evidence Handling Rules

1. Future agents should not re-scan the entire repo, all Codex sessions, or all evidence folders unless the user explicitly asks.
2. Future agents should first read:
   - `docs/codex-handoffs/EVIDENCE_ARCHIVE_INVENTORY.md`
   - `docs/codex-handoffs/EVIDENCE_REVIEW_QUEUE.md`
   - `docs/codex-handoffs/OPEN_ITEMS_FOR_NEXT_AGENT.md`
3. Future agents should only add new evidence that is newly created, newly verified, newly uploaded by the user, newly linked from GitHub/Notion, or directly relevant to the current task.
4. Do not duplicate existing screenshots, PDFs, Looms, QA notes, or evidence files.
5. Before adding any new evidence file, check whether an inventory record already exists.
6. If an evidence file already exists, update its status or notes instead of creating a duplicate.
7. Prefer linking or referencing large files instead of copying them into the repo.
8. Only copy small, safe, non-sensitive evidence files into the repo when they are clearly useful for QA, case-study proof, or future handoff.
9. Never copy files that may contain secrets, contact data, API keys, tokens, auth headers, cookies, email lists, private customer details, or credential values.
10. If unsure whether a file is safe, mark it as `Sensitive Review Required` and do not copy it.
11. Store evidence files only in a clearly named future folder if needed, such as `docs/codex-handoffs/evidence/`.
12. Use consistent file names: `YYYY-MM-DD_area_platform_short-description.ext`. Example: `2026-06-17_brevo_attribute-grouping-ui.png`.
13. Each copied evidence file must have a matching row in `EVIDENCE_ARCHIVE_INVENTORY.md`.
14. Each evidence record should state what it proves, where it came from, whether it is verified, whether it is safe for Notion, whether it is safe for client-facing case studies, and the next action.

## Usage and Limit Control Rules

1. Avoid broad searches unless necessary.
2. Do not repeatedly re-read large files or long session transcripts.
3. Start with existing handoff docs before inspecting old sessions.
4. Use targeted searches for specific terms instead of scanning everything.
5. Stop and ask the user before doing high-token work such as reviewing all Codex sessions again, opening many screenshots, summarizing large transcripts, scanning the whole repo repeatedly, or generating large evidence reports.
6. When working on mobile or low-usage conditions, prioritize the current blocker, latest changed files, existing handoff docs, and user-provided evidence.
7. Keep outputs concise unless the user asks for a full report.
8. For future sessions, add an `Evidence Update Log` section instead of rebuilding the entire archive.
9. Future evidence updates should follow this lightweight flow: read inventory, check if evidence already exists, add or update only relevant records, summarize changes, and ask before commit/push.
10. If the task risks heavy usage, pause and ask: "Should I do a quick targeted evidence update or a full evidence archive scan?"

## Evidence Update Log

| Date | Update | Files changed |
| --- | --- | --- |
| 2026-06-18 | Initial evidence review queue created. No screenshots or evidence files were copied. | `EVIDENCE_REVIEW_QUEUE.md` |
