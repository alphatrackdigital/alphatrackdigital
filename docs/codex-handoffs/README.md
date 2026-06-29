# Codex Handoffs

This folder contains local handoff documentation for AlphaTrack Digital / ATD MarTech work. It is repo-side source material for future Codex, ChatGPT, Claude, or human review before anything is copied into Notion or used for live operations.

Current release: GTM Version 9 is published and production-ready commit `9d5b8eaa175bf0a857a63bfb1bf117b1606b5e79` is on `main`. The dev guy deploys by pulling `main` and using the existing Namecheap/cPanel workflow. `atd-production-dist-ad-consent-fix-9d5b8ea.zip` is fallback/reference only; `atd-production-dist-c0f6343.zip` is superseded. Production consent QA and the Cookie Policy workaround decision remain pending.

Read first:

1. `ATD_MASTER_CODEX_WORKLOG.md`
2. `OPEN_ITEMS_FOR_NEXT_AGENT.md`
3. `BREVO_CURRENT_STATE.md`
4. `KETCH_CONSENT_READINESS_2026-06-24.md`
5. `KETCH_PREVIEW_QA_2026-06-24.md`
6. `KETCH_REMEDIATION_PREVIEW_QA_2026-06-24.md`
7. `KETCH_GTM_STRICT_PREVIEW_QA_2026-06-24.md`

Future agents should update this folder after major work with what changed, what was verified, blockers, risks, and exact next steps. Keep verified facts separate from unverified notes.

Never include secrets, token values, webhook secrets, API keys, passwords, cookies, auth headers, private transcript text, or credential values. Document environment variables by name and purpose only.

Do not activate Brevo workflows, send campaigns or test messages, deploy, commit, push, merge, publish, or change live services without explicit user approval.
