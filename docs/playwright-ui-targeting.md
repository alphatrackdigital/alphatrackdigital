# Playwright UI Targeting Workflow

This repo is set up so you can pick a UI element visually, paste the locator into chat, and let Codex use it through Playwright.

## Quick start

1. Run the app locally with `npm run dev`.
2. Open the Playwright tools in VS Code.
3. Use the locator picker or recorder against the local site.
4. Paste the copied locator into chat with the route you care about.

The workspace enables `playwright.pickLocatorCopyToClipboard`, so picked locators are copied automatically.

## Useful commands

- `npm run test:e2e`: run Playwright end-to-end tests
- `npm run test:e2e:ui`: open Playwright UI mode
- `npm run playwright:codegen`: launch Playwright codegen against `http://127.0.0.1:8080`
- `npm run playwright:install`: install the Chromium browser used by Playwright

## What to paste into chat

The best prompt includes:

- the route or full URL
- the locator you copied from Playwright
- the action you want

Examples:

```text
Use Playwright MCP on http://127.0.0.1:8080/about-us and inspect this target:
page.getByRole('heading', { name: 'About Us' })
Tell me why its spacing feels off on mobile.
```

```text
Use Playwright MCP on / and compare this CTA with the section above it:
page.getByRole('link', { name: 'Get a Free Growth Audit' }).first()
```

```text
Use Playwright MCP on /about-us and update the styling around this element:
getByTestId('team-section')
```

## Prompting tips

- Paste the locator exactly as Playwright gives it to you.
- Mention the route even if the locator looks unique.
- If you want a fix, say whether you want analysis only or code changes too.
- If the target only exists after interaction, mention the interaction first.

Example:

```text
Use Playwright MCP on /.
Open the Services menu in the header.
Then inspect this locator:
page.getByTestId('desktop-services-menu')
Tell me why the menu feels cramped and then fix it.
```
