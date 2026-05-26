# GA4 Management In Codex

This project uses a local, official Google Analytics MCP server for GA4 account inspection and reporting.
It avoids hosted third-party OAuth brokers and keeps Google credentials on this machine.

## Current Setup

- MCP server: official Google Analytics MCP (`analytics-mcp`)
- Codex config: `C:\Users\Kenny Dabiri\.codex\config.toml`
- Google Cloud project: `alphatrack-ga4-ops`
- GA4 property: `523184243`
- Read-only credential path: `C:\Users\Kenny Dabiri\.codex\.sandbox-secrets\ga4\ga4-readonly-service-account.json`
- Write credential path: `C:\Users\Kenny Dabiri\.codex\.sandbox-secrets\ga4\ga4-admin-write-service-account.json`
- Default mode: enabled in Codex config. Restart Codex to load the MCP server.

The official Google Analytics MCP is read-only. It can inspect accounts, properties, reports, realtime
reports, Google Ads links, and custom dimensions/metrics. It cannot edit GA4 configuration or mark key
events.

The local Admin API helper at `scripts/ga4_admin.py` covers controlled write actions. It is dry-run by
default and requires `--apply` for changes.

Created service accounts:

- `atd-ga4-codex-readonly@alphatrack-ga4-ops.iam.gserviceaccount.com` with GA4 Viewer.
- `atd-ga4-codex-admin@alphatrack-ga4-ops.iam.gserviceaccount.com` with GA4 Editor.

Enabled Google Cloud APIs:

- Google Analytics Admin API
- Google Analytics Data API

## Enable Read-Only GA4 Access

1. In Google Cloud, create or choose a project for analytics operations.
2. Enable these APIs:
   - Google Analytics Admin API
   - Google Analytics Data API
3. Create a dedicated service account, for example:
   - `atd-ga4-codex-readonly`
4. Add the service account email to the GA4 account or property with the minimum read role needed.
   - Start with Viewer or Analyst.
   - Do not grant Editor unless we are explicitly wiring Admin API write scripts.
5. Create a JSON key for that service account.
6. Save it locally as:
   - `C:\Users\Kenny Dabiri\.codex\.sandbox-secrets\ga4\ga4-readonly-service-account.json`
7. In `C:\Users\Kenny Dabiri\.codex\config.toml`, change:
   - `enabled = false`
   - to `enabled = true`
   under `[mcp_servers.analytics-mcp]`.
8. Restart Codex so the MCP server is loaded.

## Operating Model

- Use GTM MCP for tag setup and GTM workspace changes.
- Use GA4 MCP for account/property/report verification.
- Use GA4 UI for sensitive admin writes unless we intentionally add a small Admin API script.
- Use separate credentials for read-only and write-capable access.
- Do not commit Google credential files to the repo.

## Write Access Policy

Direct GA4 write automation should be separate from the read-only MCP setup.

If we later need Codex to mark key events, create custom dimensions, or edit GA4 admin settings, use:

- A second service account credential.
- Narrow GA4 permissions.
- A local script that performs one explicit action at a time.
- User approval before running any write operation.

## Enable Write-Capable GA4 Access

1. Create a second service account, for example:
   - `atd-ga4-codex-admin`
2. Add the service account email to the GA4 property with Editor access.
3. Create a JSON key for that service account.
4. Save it locally as:
   - `C:\Users\Kenny Dabiri\.codex\.sandbox-secrets\ga4\ga4-admin-write-service-account.json`
5. Confirm Python dependencies are available:
   - `python -m pip install --user google-auth requests`

Useful commands:

```powershell
python scripts\ga4_admin.py list-key-events
python scripts\ga4_admin.py create-key-event generate_lead
python scripts\ga4_admin.py create-key-event generate_lead --apply
python scripts\ga4_admin.py list-access-bindings
python scripts\ga4_admin.py create-access-binding atd-ga4-codex-readonly@alphatrack-ga4-ops.iam.gserviceaccount.com --role predefinedRoles/viewer
python scripts\ga4_admin.py create-access-binding atd-ga4-codex-admin@alphatrack-ga4-ops.iam.gserviceaccount.com --role predefinedRoles/editor
python scripts\ga4_admin.py list-custom-dimensions
python scripts\ga4_admin.py create-custom-dimension form_id "Form ID"
python scripts\ga4_admin.py create-custom-dimension form_id "Form ID" --apply
```

If the GA4 UI rejects service-account emails with "This email doesn't match a Google Account", grant
those service accounts through the Admin API `accessBindings` endpoint using a project-owned OAuth
Desktop client and a user-authenticated credential with GA4 Administrator access. A service account
cannot bootstrap its own initial access.

Bootstrap path:

1. In Google Cloud project `alphatrack-ga4-ops`, configure Google Auth Platform / OAuth consent.
2. Add `alphatrackdigital@gmail.com` as a test user if the app is in testing mode.
3. Create an OAuth client of type Desktop app.
4. Save the downloaded client JSON outside the repo as:
   - `C:\Users\Kenny Dabiri\.codex\.sandbox-secrets\ga4\ga4-oauth-client.json`
5. Run:
   - `python scripts\ga4_bootstrap_access.py`

The default property ID is `523184243`, inferred from the GA4 URL for the AlphaTrack Digital property.
Override it with `--property` or `GA4_PROPERTY_ID` if needed.

## Useful GA4 Events For This Project

Primary conversion/key-event candidates:

- `generate_lead`
- `contact_form_submit`
- `tracking_audit_submit`
- `newsletter_subscribe`
- `exit_popup_success`
- `meeting_booking_redirect`

Diagnostic booking-funnel events:

- `booking_cta_click`
- `booking_widget_loaded`
- `booking_scheduler_open`
