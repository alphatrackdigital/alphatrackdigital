# Codex Project Rules

These rules apply to Codex work in this repository. They are intended to preserve usage while keeping implementation quality high.

## Usage Discipline

- Keep routine responses concise. Summarize only what changed, what was skipped, and any blocker.
- Avoid broad repo scans unless the task requires them. Prefer targeted `rg` searches and focused file reads.
- Avoid repeated status summaries, long explanations, and large command-output recaps unless requested.
- Batch related file reads, edits, and checks instead of using many small tool calls.
- Do not update Notion, browser screenshots, external services, or project documentation after every small change unless requested or the change affects launch/readiness state.
- Do not browse the web unless the user asks for current information, the information is likely stale, or official docs are needed for a technical decision.

## Testing And Validation

- Do not run tests after every small UI, copy, spacing, or styling change.
- For UI-only changes, inspect the diff and report that tests were intentionally skipped.
- Run targeted tests when changing form behavior, API payloads, tracking, authentication, schema mappings, data persistence, or business logic.
- Run full tests/build only before commit, deploy, or when the user explicitly asks.
- If skipping tests creates meaningful risk, say so clearly and name the targeted validation that should be run later.

## Tooling

- Use `rg`/`rg --files` for search before slower alternatives.
- Prefer `apply_patch` for manual edits.
- Use browser automation only for meaningful visual or interaction verification, not for every small CSS tweak.
- Use external connectors such as Notion, Netlify, GitHub, and Brevo only when the current task needs live state or an explicit update.
- When commands are needed, prefer targeted commands over noisy full-suite commands.

## Project-Specific Notes

- Brevo/contact-form work must preserve attribute schema alignment:
  - `SERVICE_INTEREST` is a Brevo multiple-choice attribute and should be sent as an array.
  - `MONTHLY_BUDGET` should use Brevo category values `1`-`4`.
  - Keep consent, attribution, source, route, and offer fields explicit.
- Netlify deploys may be blocked by account credit/plan state. Do not assume deploy success; verify before registering webhooks or marking production QA complete.
- Preserve existing user or generated changes. Do not revert unrelated work.

