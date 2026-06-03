# Netlify Credit Control Workflow

Use this workflow while AlphaTrack Digital is on Netlify Free/Credit Starter.

## Project Roles

| Netlify project | Production branch | Purpose |
| --- | --- | --- |
| `alphatrackdigital` | `main` | Primary frontend test/staging deployment for the AlphaTrack website. The public domain is not currently pointed here. |
| `alphatra-serv` | `backend` | Live backend/API service used by the public Namecheap/cPanel website for form submissions. |

Vercel is fallback/comparison infrastructure only. Do not use both Netlify and Vercel for routine frontend review, because that creates extra deploys and environment drift without adding much confidence.

## Credit Rules

- Successful production deploys consume credits.
- Deploy Previews and branch deploys should be used for testing and review.
- Failed deploys and rollbacks should not be treated as release workflow.
- Runtime usage can still consume credits through functions, bandwidth, image transformations, AI inference, and similar services.

## Repo Safeguards

`netlify.toml` uses `scripts/netlify-ignore-build.mjs` as the Netlify ignore command.

The ignore command skips builds when:

- the latest commit message contains `[skip ci]`, `[skip netlify]`, or `[no deploy]`;
- the branch name starts with `debug/`, `debug-`, `local/`, `local-`, `wip/`, `wip-`, `experiment/`, or `experiment-`;
- only documentation, GitHub metadata, editor settings, or image reference files changed;
- Netlify reports a production-context build from a non-production branch.

## Recommended Release Flow

Use `alphatrackdigital` on Netlify as the normal frontend test ground.

1. Work locally on a feature branch.
2. Run `npm run test` and `npm run build` before pushing.
3. Open a pull request and use the Deploy Preview for final browser checks.
4. Merge to `main` only when the change is ready for production.
5. Batch small fixes into one production release when practical.

Use Vercel only when Netlify is unavailable, when comparing platform behavior, or when evaluating a future migration.

## Backend Release Flow

Use this for `alphatra-serv`, because the live public website posts forms to:

```text
https://alphatra-serv.netlify.app/api/leads
https://alphatra-serv.netlify.app/api/brevo-subscribe
```

1. Validate the `backend` branch locally before triggering Netlify:
   - `npm install --no-package-lock`
   - `npm run type-check`
   - `npx netlify-cli build --offline`
2. Confirm required environment variables are present on `alphatra-serv`.
3. Trigger one production deploy from `backend`.
4. Verify the deployed commit matches `origin/backend`.
5. Check `/api/leads` and `/api/brevo-subscribe` with safe non-POST requests first; only submit real test leads when necessary.

## When To Use Skip Tokens

Use `[skip netlify]` or `[skip ci]` in a commit message when pushing a change that does not need any Netlify deploy.

Examples:

```text
docs: update Netlify setup notes [skip netlify]
chore: clean local screenshots [skip ci]
```

For pull requests, add `[skip netlify]` or `[skip ci]` to the PR title if no Deploy Preview is needed.

## Netlify Dashboard Settings

Set these in Netlify after linking the project:

- `alphatrackdigital` production branch: `main`
- `alphatrackdigital` branch deploys: only selected branches, currently `main` and `staging`
- `alphatra-serv` production branch: `backend`
- `alphatra-serv` branch deploys: only selected branches, currently `backend`
- Deploy Previews: enabled for pull requests, but use skip tokens for docs-only or admin-only PRs
- Auto publishing: keep enabled only when `main` is disciplined; lock deploys temporarily during risky migration work
- Build status: stop builds temporarily during heavy Git cleanup or large non-release commit sequences

## Production Release Budget

With 300 credits and 15 credits per successful production deploy, plan for no more than 20 successful production deploys in a billing period before accounting for runtime usage.
