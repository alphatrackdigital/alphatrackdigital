# Google Tag Manager MCP Connector

ATD will use the hosted GTM MCP server from `paolobietolini/gtm-mcp-server`.

Hosted MCP URL:

```text
https://mcp.gtmeditor.com
```

Repository:

```text
https://github.com/paolobietolini/gtm-mcp-server
```

## Setup

Use the hosted connector in any MCP client that supports HTTP transport with OAuth 2.1 / PKCE.

### Claude

Claude Web/Desktop:

1. Open Settings.
2. Go to Connectors.
3. Add a custom connector.
4. Use:

```text
https://mcp.gtmeditor.com
```

5. Sign in with the Google account that has access to ATD's GTM account.

Claude Code:

```bash
claude mcp add -t http gtm https://mcp.gtmeditor.com
```

### ChatGPT

1. Open the OpenAI Apps Platform MCP integration flow.
2. Add an MCP integration with:

```text
https://mcp.gtmeditor.com
```

3. Authorize with the Google account that has GTM access.

### Cursor

Use:

```json
{
  "mcpServers": {
    "gtm": {
      "url": "https://mcp.gtmeditor.com/authorize"
    }
  }
}
```

## Access Requirements

The Google account used during OAuth must have access to the relevant ATD Google Tag Manager account/container.

Recommended GTM permissions:

- Read access for audits and inspection.
- Edit access for creating or updating tags, triggers, variables, folders, and templates.
- Approve or Publish access only for users who are allowed to ship live tracking changes.

## Operating Rules

For ATD work, use a workspace-first process:

1. Inspect accounts, containers, workspaces, tags, triggers, and variables.
2. Make changes in a GTM workspace.
3. Create a container version.
4. Review the version summary.
5. Publish only after explicit approval.

Avoid making destructive changes unless the request is explicit and the target resource has been confirmed.

## ATD Website Container

Current production web container:

```text
GTM-MVXWCTZ8
```

The React site installs this container directly in `index.html`:

- Head: standard GTM loader before other runtime scripts.
- Body: standard GTM noscript iframe immediately after `<body>`.

The old Notion task named "Install GTM Container on WordPress" is no longer the deployment source of truth for the
live React site. Treat it as historical context for the same container ID.

## React SPA dataLayer Contract

Because the website is a React single-page app, URL-only Page View triggers can miss client-side route changes.
The app now pushes explicit dataLayer events from `src/components/shared/TrackingEvents.tsx`:

| Event | When it fires | Purpose |
| --- | --- | --- |
| `atd_route_view` | Every React route change | SPA pageview / virtual pageview trigger |
| `generate_lead` | `/book-a-call/thank-you` | Primary conversion: discovery call booked |
| `contact_form_submit` | `/contact-us/thank-you` | Secondary conversion: contact form submitted |

Common parameters:

- `page_path`
- `page_location`
- `page_search` when present
- `page_hash` when present

Recommended GTM alignment:

- Use Custom Event triggers for `generate_lead` and `contact_form_submit` as the canonical conversion triggers.
- Keep URL or History Change triggers as QA fallbacks only, unless a platform tag explicitly requires URL-state detection.
- Use `atd_route_view` for GA4 SPA pageviews if the GA4 config tag has automatic page_view disabled.

## Capabilities

The hosted connector can manage:

- Tags
- Triggers
- Variables
- Folders
- Built-in variables
- Container versions
- Publishing
- Server-side GTM clients and transformations
- Community template imports
- Container audits and tracking-plan style workflows

## Security Note

This hosted connector is operated by a third party. Do not authorize it with a Google account that has broader access than needed. Revoke OAuth access from the Google account security settings if ATD stops using the connector.
