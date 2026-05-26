#!/usr/bin/env python3
"""Bootstrap GA4 property access for service accounts using user OAuth.

This is only needed when the GA4 UI refuses service-account emails. It uses a
project-owned OAuth Desktop client secret stored outside the repo.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

import requests
from google_auth_oauthlib.flow import Flow
from google_auth_oauthlib.flow import InstalledAppFlow


PROPERTY_ID = os.environ.get("GA4_PROPERTY_ID", "523184243")
BASE_URL = "https://analyticsadmin.googleapis.com/v1alpha"
SECRET_DIR = Path.home() / ".codex" / ".sandbox-secrets" / "ga4"
CLIENT_SECRET = Path(os.environ.get("GA4_OAUTH_CLIENT_SECRET", SECRET_DIR / "ga4-oauth-client.json"))
TOKEN_FILE = Path(os.environ.get("GA4_OAUTH_TOKEN", SECRET_DIR / "ga4-user-oauth-token.json"))
SCOPES = [
    "https://www.googleapis.com/auth/analytics.manage.users",
    "https://www.googleapis.com/auth/analytics.edit",
    "https://www.googleapis.com/auth/analytics.readonly",
]

BINDINGS = [
    {
        "user": "atd-ga4-codex-readonly@alphatrack-ga4-ops.iam.gserviceaccount.com",
        "roles": ["predefinedRoles/viewer"],
    },
    {
        "user": "atd-ga4-codex-admin@alphatrack-ga4-ops.iam.gserviceaccount.com",
        "roles": ["predefinedRoles/editor"],
    },
]


def get_credentials():
    if not CLIENT_SECRET.exists():
        raise SystemExit(
            "Missing OAuth Desktop client secret.\n"
            f"Expected: {CLIENT_SECRET}\n"
            "Create a Google Auth Platform OAuth Desktop client in project "
            "alphatrack-ga4-ops and save its JSON here."
        )

    flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET), SCOPES)
    credentials = flow.run_local_server(port=0)
    TOKEN_FILE.write_text(credentials.to_json(), encoding="utf-8")
    return credentials


def get_credentials_console():
    if not CLIENT_SECRET.exists():
        raise SystemExit(
            "Missing OAuth Desktop client secret.\n"
            f"Expected: {CLIENT_SECRET}"
        )

    flow = Flow.from_client_secrets_file(
        str(CLIENT_SECRET),
        scopes=SCOPES,
        redirect_uri="urn:ietf:wg:oauth:2.0:oob",
    )
    authorization_url, _ = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="consent",
    )
    print("Open this URL, approve access, then paste the code here:")
    print(authorization_url)
    code = input("Code: ").strip()
    flow.fetch_token(code=code)
    TOKEN_FILE.write_text(flow.credentials.to_json(), encoding="utf-8")
    return flow.credentials


def api_request(method: str, path: str, token: str, body: dict[str, Any] | None = None):
    response = requests.request(
        method,
        f"{BASE_URL}{path}",
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        json=body,
        timeout=30,
    )
    if response.status_code >= 400:
        print(f"{method} {path} failed with HTTP {response.status_code}")
        print(response.text)
        raise SystemExit(1)
    return response.json() if response.text else {}


def main() -> None:
    credentials = get_credentials_console() if os.environ.get("GA4_OAUTH_CONSOLE") else get_credentials()
    parent = f"properties/{PROPERTY_ID}"

    existing = api_request("GET", f"/{parent}/accessBindings", credentials.token)
    existing_users = {
        binding.get("user")
        for binding in existing.get("accessBindings", [])
        if binding.get("user")
    }

    for binding in BINDINGS:
        if binding["user"] in existing_users:
            print(f"Already exists: {binding['user']}")
            continue
        created = api_request(
            "POST",
            f"/{parent}/accessBindings",
            credentials.token,
            binding,
        )
        print(json.dumps(created, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
