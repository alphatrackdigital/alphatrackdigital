# Open Items For Next Agent

Last updated: 2026-06-17.

## Priority 1: Urgent Blockers

| Item | Next step | Verify before live changes |
| --- | --- | --- |
| Netlify backend deploy blocked | Ask user to approve adding credits/upgrading plan, then deploy only after approval | Current branch, target site `alphatra-serv`, env var names present |
| Latest backend not production-validated | After deploy, verify deployed commit and API endpoints | Safe non-POST checks first |
| Brevo transactional webhook not live | Register only after endpoint returns expected auth behavior | `BREVO_TRANSACTIONAL_WEBHOOK_SECRET` set, endpoint not `404` |
| Brevo Meetings validation pending | Test controlled booking only after deploy approval | Webhook secret and endpoint configured |
| Suppression/blocklist uncertainty | Run controlled QA before live campaign traffic | Lists #13/#14 and workflow exclusions |

## Priority 2: Important Cleanup

- Verify Brevo source lifecycle custom attributes exist and have correct types.
- Verify contact attribute grouping in Brevo UI without deleting or renaming attributes.
- Confirm newsletter internal notification routing uses `marketing@alphatrack.digital` where approved.
- Confirm profile update and unsubscribe pages are acceptable for launch.
- Confirm `GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE=false` and Meta test-event code disabled outside tests.
- Confirm `SERVICE_INTEREST` and `MONTHLY_BUDGET` schema fixes are deployed.
- Update Notion only after reviewing `NOTION_SYNC_SUMMARY.md`.

## Priority 3: Nice-To-Have Improvements

- Add a small launch monitoring dashboard or daily report template.
- Add a nonsecret environment variable inventory page to repo docs.
- Add a clear "production deployment status" section to `README.md`.
- Consider consolidating older Brevo docs once this handoff pack is accepted.
- Add a scripted safe health check for deployed API paths without sending leads.

## Exact Next Steps

1. Read `ATD_MASTER_CODEX_WORKLOG.md`, `BREVO_CURRENT_STATE.md`, and `TECHNICAL_CHANGELOG.md`.
2. Run `git status`.
3. Confirm whether the user wants live connector/UI checks or repo-only work.
4. If live checks are approved, inspect Brevo/Vercel/Netlify read-only first.
5. Do not activate, send, deploy, commit, push, or update Notion without explicit approval.
6. If deploy is approved, verify env variable names only; never print values.
7. After any deploy, run controlled endpoint checks before test submissions.
8. After test submissions, record evidence in repo docs first.
9. Prepare a Notion sync proposal; wait for approval before updating Notion.

## What To Verify Before Any Live Change

- The exact target account/workspace/site.
- The exact workflow/template/list/contact/attribute ID.
- The current active/inactive state.
- The rollback or stop condition.
- Whether the action can send email or mutate contacts.
- Whether any secret value would be exposed in logs or docs.

## Warnings

- Do not use the available Brevo DOI contact-creation tool for inspection; it can send a confirmation email.
- Do not treat Codex transcripts as documentation source text; summarize only safe metadata and verified outcomes.
- Do not rely on repo implementation as production behavior until deployed commit is verified.
- Do not assume the prompt's Next.js note is correct; repo evidence shows Vite React.

## Suggested Prompt For Next Session

```text
Continue the AlphaTrack Digital / ATD MarTech handoff from repo docs under docs/codex-handoffs/. Start by reading ATD_MASTER_CODEX_WORKLOG.md, BREVO_CURRENT_STATE.md, TECHNICAL_CHANGELOG.md, WEBSITE_AND_TRACKING_STATE.md, and OPEN_ITEMS_FOR_NEXT_AGENT.md. Do not make live changes unless I explicitly approve. Verify current git status, then help me decide the next safe step for Netlify deploy unblock, Brevo QA, Meta/GA4 verification, or Notion sync. Never expose secrets or copy raw transcripts.
```
