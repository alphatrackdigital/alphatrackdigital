# AI Agent Continuity Protocol

Last updated: 2026-06-29.

## Purpose

This repo is worked on by more than one AI agent across sessions and usage limits. This protocol exists so that when one agent stops mid-task (usage limit, crash, or handoff), another agent can pick up the work safely without re-litigating decisions, duplicating live actions, or exposing sensitive data. It applies to documentation, code, and evidence work in this repository specifically; it does not grant any agent authority to act on live tools without the approvals defined below.

## Agent Roles

- **ChatGPT** - strategy and control layer. Sets direction, reviews proposals, classifies risk, and gives approval for anything live.
- **Codex** - primary repo execution agent. Does the bulk of repo work: code changes, tests, evidence docs, commits.
- **Claude Code** - backup/continuation agent. Picks up when Codex hits a usage limit or stops mid-task: repo review, documentation, code cleanup, and handoff continuation. Operates under the same safety boundaries as Codex.
- **Human/user** - final approval authority for anything that touches live systems: deployment, Notion sync, workflow activation/deactivation, sending campaigns or test messages, registering webhooks, or changing GTM/Ketch/Brevo/GA4/Meta/Google Ads/Microsoft Clarity/Vercel/Netlify/Namecheap/cPanel settings.

Source-of-truth layering:

- GitHub repo docs (`docs/codex-handoffs/`) are the technical source of truth for what was actually done in the repo.
- Notion ATD Agency OS is the business-readable source of truth, updated only after human approval from repo docs.
- Live tools (Brevo, GTM, Ketch, GA4, Meta, Google Ads, Microsoft Clarity, Vercel, Netlify, Namecheap/cPanel) remain the actual configuration source. Repo docs describe live state; they do not control it.

## Mandatory Startup Routine

Before any agent (Codex or Claude Code) does work in this repo, it must:

1. Run `git status --short --branch`.
2. Run `git log --oneline -10`.
3. Read `AGENTS.md` and `CLAUDE.md`.
4. Read the core handoff docs: `docs/codex-handoffs/README.md`, `docs/codex-handoffs/OPEN_ITEMS_FOR_NEXT_AGENT.md`, and this file.
5. Never assume prior chat memory. Treat the working tree as unknown until inspected - a previous agent may have stopped mid-edit.
6. Classify every modified or untracked file found in step 1 before making any further edit: is it a clean doc change, a generated artifact (build output, zip, screenshot, archive), or something unrelated that should be left alone.

## Mandatory Handoff Routine

When an agent finishes a work session (including being cut off by a usage limit), the next agent or the same agent before stopping should:

1. Update the relevant docs in `docs/codex-handoffs/` to reflect current state.
2. Record explicitly: what changed, what was verified, what is blocked, and what was intentionally left undone.
3. Commit only the files in scope for the task. Do not stage unrelated files, generated archives, screenshots, or broad evidence folders.
4. Give a final report containing `git status`, the commit hash if one was made, and the recommended next action.

## Reusable Continuation Prompts

**Codex to Claude Code** (use when Codex hits a usage limit mid-task):

> Take over from Codex on [repo name]. Codex hit its usage limit mid-task. Do not assume the working tree is clean or correct - inspect `git status --short --branch`, `git diff --stat`, and `git log --oneline -12` first, then read `AGENTS.md`, `CLAUDE.md`, and `docs/codex-handoffs/AI_AGENT_CONTINUITY_PROTOCOL.md` before touching anything. Task in progress: [describe task]. Known constraints: [list]. Follow the mandatory startup and handoff routines in the continuity protocol. Do not deploy, touch live services, or expose secrets.

**Claude Code to Codex** (use when handing back to Codex, e.g. for code execution Claude Code should not own):

> Continue from Claude Code on [repo name]. Claude Code completed [summary] and stopped at [point] because [reason - e.g. task requires live tool access, code execution beyond doc scope, or usage handoff]. Start with the mandatory startup routine in `docs/codex-handoffs/AI_AGENT_CONTINUITY_PROTOCOL.md`. Files changed this session: [list]. Files intentionally left untouched: [list]. Recommended next step: [next step].

## Safety Boundaries

These apply to every agent, regardless of which one is active:

- No live tool changes (Brevo, GTM, Ketch, GA4, Meta, Google Ads, Microsoft Clarity, Vercel, Netlify, Namecheap/cPanel) without explicit human approval.
- No deployments without explicit human approval.
- No form submissions, test messages, or campaign sends without explicit human approval.
- No workflow activation, deactivation, or editing without explicit human approval.
- No Notion sync or update without explicit human approval.
- No exposure of secrets, API keys, tokens, cookies, auth headers, webhook secrets, environment variable values, QA emails, contact IDs, CRM IDs, transactional IDs, private contact data, or credentials in any doc, commit, or chat output.
- No copying of raw agent/session transcripts into repo docs or Notion - summarize verified outcomes only.
- No broad staging of evidence folders, screenshots, or generated archives unless explicitly part of the task and confirmed safe.

## Current ATD State (snapshot)

- Stack: Vite + React + TypeScript, not Next.js.
- Vercel testing URL: `https://website-internal-test.vercel.app`. Avoid the stale URL `https://atd-website-test.vercel.app`.
- Brevo lead-flow QA is mostly complete; see `docs/codex-handoffs/OPEN_ITEMS_FOR_NEXT_AGENT.md` for current gaps.
- Tracking Audit Nurture is paused. Active contacts already in that workflow may continue running it - the user declined removing or stopping them.
- GTM container `GTM-MVXWCTZ8` is published as Version 9.
- Microsoft Clarity project `xbn6g2k18j` is GTM-only and gated by the `analytics_storage` consent signal.
- Production-ready commit: `9d5b8eaa175bf0a857a63bfb1bf117b1606b5e79`.
- Deployment packages: `atd-production-dist-ad-consent-fix-9d5b8ea.zip` is the current fallback/reference package. `atd-production-dist-c0f6343.zip` is superseded and must not be used.
- Manual Namecheap/cPanel deployment remains pending.
- Full production six-scenario consent QA remains pending.
- Cookie Policy workaround approval remains pending.
- Meta event rows/deduplication remain unverified.
- Book-a-call CRM/webhook proof remains incomplete.

This snapshot will go stale. Treat `docs/codex-handoffs/OPEN_ITEMS_FOR_NEXT_AGENT.md` and `git log` as the current truth, and update this section only when the underlying facts change.
