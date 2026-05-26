#!/usr/bin/env python3
"""Small GA4 Admin API helper for controlled Codex operations.

Writes are dry-run by default. Add --apply to perform a mutation.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path
from typing import Any

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account


BASE_URL = "https://analyticsadmin.googleapis.com/v1alpha"
READ_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"
EDIT_SCOPE = "https://www.googleapis.com/auth/analytics.edit"
MANAGE_USERS_SCOPE = "https://www.googleapis.com/auth/analytics.manage.users"
DEFAULT_PROPERTY_ID = "523184243"
DEFAULT_CREDENTIALS = (
    Path.home()
    / ".codex"
    / ".sandbox-secrets"
    / "ga4"
    / "ga4-admin-write-service-account.json"
)


def credential_path() -> Path:
    configured = os.environ.get("GA4_ADMIN_CREDENTIALS") or os.environ.get(
        "GOOGLE_APPLICATION_CREDENTIALS"
    )
    return Path(configured).expanduser() if configured else DEFAULT_CREDENTIALS


def access_token(scope: str) -> str:
    path = credential_path()
    if not path.exists():
        raise SystemExit(
            "Missing GA4 service-account credential file.\n"
            f"Expected: {path}\n"
            "Set GA4_ADMIN_CREDENTIALS to another JSON key path if needed."
        )

    credentials = service_account.Credentials.from_service_account_file(
        str(path),
        scopes=[scope],
    )
    credentials.refresh(Request())
    return credentials.token


def property_name(property_id: str) -> str:
    return property_id if property_id.startswith("properties/") else f"properties/{property_id}"


def request_json(
    method: str,
    path: str,
    *,
    scope: str,
    body: dict[str, Any] | None = None,
    apply: bool = True,
) -> dict[str, Any]:
    url = f"{BASE_URL}{path}"

    if not apply:
        print("DRY RUN")
        print(f"{method} {url}")
        if body is not None:
            print(json.dumps(body, indent=2, sort_keys=True))
        return {}

    response = requests.request(
        method,
        url,
        headers={
            "Authorization": f"Bearer {access_token(scope)}",
            "Content-Type": "application/json",
        },
        json=body,
        timeout=30,
    )
    if response.status_code >= 400:
        print(f"{method} {url} failed with HTTP {response.status_code}", file=sys.stderr)
        print(response.text, file=sys.stderr)
        raise SystemExit(1)

    if not response.text:
        return {}
    return response.json()


def print_json(value: dict[str, Any]) -> None:
    print(json.dumps(value, indent=2, sort_keys=True))


def list_key_events(args: argparse.Namespace) -> None:
    parent = property_name(args.property)
    print_json(
        request_json(
            "GET",
            f"/{parent}/keyEvents",
            scope=READ_SCOPE,
        )
    )


def create_key_event(args: argparse.Namespace) -> None:
    parent = property_name(args.property)
    body: dict[str, Any] = {
        "eventName": args.event_name,
        "countingMethod": args.counting_method,
    }
    if args.default_value is not None:
        body["defaultValue"] = {
            "numericValue": args.default_value,
            "currencyCode": args.currency,
        }

    result = request_json(
        "POST",
        f"/{parent}/keyEvents",
        scope=EDIT_SCOPE,
        body=body,
        apply=args.apply,
    )
    if result:
        print_json(result)


def delete_key_event(args: argparse.Namespace) -> None:
    name = args.name
    if not name.startswith("properties/"):
        raise SystemExit("Use the full resource name, e.g. properties/123/keyEvents/456.")

    result = request_json(
        "DELETE",
        f"/{name}",
        scope=EDIT_SCOPE,
        apply=args.apply,
    )
    if result:
        print_json(result)


def list_access_bindings(args: argparse.Namespace) -> None:
    parent = property_name(args.property)
    print_json(
        request_json(
            "GET",
            f"/{parent}/accessBindings",
            scope=MANAGE_USERS_SCOPE,
        )
    )


def create_access_binding(args: argparse.Namespace) -> None:
    parent = property_name(args.property)
    body = {
        "user": args.email,
        "roles": args.role,
    }
    result = request_json(
        "POST",
        f"/{parent}/accessBindings",
        scope=MANAGE_USERS_SCOPE,
        body=body,
        apply=args.apply,
    )
    if result:
        print_json(result)


def list_custom_dimensions(args: argparse.Namespace) -> None:
    parent = property_name(args.property)
    print_json(
        request_json(
            "GET",
            f"/{parent}/customDimensions",
            scope=READ_SCOPE,
        )
    )


def create_custom_dimension(args: argparse.Namespace) -> None:
    parent = property_name(args.property)
    body = {
        "parameterName": args.parameter_name,
        "displayName": args.display_name,
        "description": args.description or "",
        "scope": args.scope,
    }
    result = request_json(
        "POST",
        f"/{parent}/customDimensions",
        scope=EDIT_SCOPE,
        body=body,
        apply=args.apply,
    )
    if result:
        print_json(result)


def list_custom_metrics(args: argparse.Namespace) -> None:
    parent = property_name(args.property)
    print_json(
        request_json(
            "GET",
            f"/{parent}/customMetrics",
            scope=READ_SCOPE,
        )
    )


def create_custom_metric(args: argparse.Namespace) -> None:
    parent = property_name(args.property)
    body = {
        "parameterName": args.parameter_name,
        "displayName": args.display_name,
        "description": args.description or "",
        "measurementUnit": args.measurement_unit,
        "scope": "EVENT",
    }
    result = request_json(
        "POST",
        f"/{parent}/customMetrics",
        scope=EDIT_SCOPE,
        body=body,
        apply=args.apply,
    )
    if result:
        print_json(result)


def add_common_write_flags(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Perform the write. Without this flag, the command only prints the request.",
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Controlled GA4 Admin API helper.")
    parser.add_argument(
        "--property",
        default=os.environ.get("GA4_PROPERTY_ID", DEFAULT_PROPERTY_ID),
        help=f"GA4 property ID. Defaults to {DEFAULT_PROPERTY_ID}.",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    list_keys = subparsers.add_parser("list-key-events")
    list_keys.set_defaults(func=list_key_events)

    create_key = subparsers.add_parser("create-key-event")
    create_key.add_argument("event_name")
    create_key.add_argument(
        "--counting-method",
        choices=["ONCE_PER_EVENT", "ONCE_PER_SESSION"],
        default="ONCE_PER_EVENT",
    )
    create_key.add_argument("--default-value", type=float)
    create_key.add_argument("--currency", default="USD")
    add_common_write_flags(create_key)
    create_key.set_defaults(func=create_key_event)

    delete_key = subparsers.add_parser("delete-key-event")
    delete_key.add_argument("name")
    add_common_write_flags(delete_key)
    delete_key.set_defaults(func=delete_key_event)

    list_bindings = subparsers.add_parser("list-access-bindings")
    list_bindings.set_defaults(func=list_access_bindings)

    create_binding = subparsers.add_parser("create-access-binding")
    create_binding.add_argument("email")
    create_binding.add_argument(
        "--role",
        action="append",
        required=True,
        choices=[
            "predefinedRoles/viewer",
            "predefinedRoles/analyst",
            "predefinedRoles/editor",
            "predefinedRoles/admin",
            "predefinedRoles/no-cost-data",
            "predefinedRoles/no-revenue-data",
        ],
        help="Role to grant. Repeat this flag to grant multiple roles.",
    )
    add_common_write_flags(create_binding)
    create_binding.set_defaults(func=create_access_binding)

    list_dims = subparsers.add_parser("list-custom-dimensions")
    list_dims.set_defaults(func=list_custom_dimensions)

    create_dim = subparsers.add_parser("create-custom-dimension")
    create_dim.add_argument("parameter_name")
    create_dim.add_argument("display_name")
    create_dim.add_argument("--description")
    create_dim.add_argument("--scope", choices=["EVENT", "USER", "ITEM"], default="EVENT")
    add_common_write_flags(create_dim)
    create_dim.set_defaults(func=create_custom_dimension)

    list_metrics = subparsers.add_parser("list-custom-metrics")
    list_metrics.set_defaults(func=list_custom_metrics)

    create_metric = subparsers.add_parser("create-custom-metric")
    create_metric.add_argument("parameter_name")
    create_metric.add_argument("display_name")
    create_metric.add_argument("--description")
    create_metric.add_argument(
        "--measurement-unit",
        default="STANDARD",
        help="GA4 MeasurementUnit enum, for example STANDARD, CURRENCY, SECONDS.",
    )
    add_common_write_flags(create_metric)
    create_metric.set_defaults(func=create_custom_metric)

    return parser


def main() -> None:
    args = build_parser().parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
