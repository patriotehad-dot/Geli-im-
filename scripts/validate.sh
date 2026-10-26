#!/usr/bin/env python3
"""Validate the Zombi manifest files in both TOML and YAML formats."""

from __future__ import annotations

import sys
import tomllib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOML_PATH = ROOT / "config" / "system.toml"
YAML_PATH = ROOT / "config" / "system.yaml"

try:
    import yaml
except ImportError:  # pragma: no cover
    yaml = None


def fail(message: str) -> None:
    print(f"[ERROR] {message}")
    raise SystemExit(1)


def ensure_file(path: Path) -> None:
    if not path.exists():
        fail(f"Required file not found: {path}")


def validate_toml(data: dict) -> None:
    required_top = [
        "title",
        "version",
        "status",
        "category",
        "system",
        "identity",
        "state",
        "environment",
        "modules",
        "permissions",
        "security",
        "metadata",
    ]
    for key in required_top:
        if key not in data:
            fail(f"Required TOML key missing: {key}")

    if data.get("title") != "Zombi":
        fail("TOML title must be 'Zombi'.")
    if data.get("status") != "active":
        fail("TOML status must be 'active'.")
    state = data.get("state", {})
    if state.get("current") not in state.get("lifecycle", []):
        fail("TOML state.current must be present in state.lifecycle.")


def validate_yaml(data: dict) -> None:
    required_top = [
        "system",
        "identity",
        "state",
        "environment",
        "modules",
        "permissions",
        "security",
        "metadata",
    ]
    for key in required_top:
        if key not in data:
            fail(f"Required YAML key missing: {key}")

    if data.get("system", {}).get("title") != "Zombi":
        fail("YAML system.title must be 'Zombi'.")
    if data.get("system", {}).get("status") != "active":
        fail("YAML system.status must be 'active'.")
    state = data.get("state", {})
    if state.get("current") not in state.get("lifecycle", []):
        fail("YAML state.current must be present in state.lifecycle.")


def main() -> None:
    ensure_file(TOML_PATH)
    ensure_file(YAML_PATH)

    with TOML_PATH.open("rb") as f:
        toml_data = tomllib.load(f)
    validate_toml(toml_data)

    if yaml is None:
        print("[WARN] PyYAML is not installed; skipping YAML validation.")
        print("[OK] TOML manifest validation passed.")
        return

    with YAML_PATH.open("r", encoding="utf-8") as f:
        yaml_data = yaml.safe_load(f)

    validate_yaml(yaml_data)
    print("[OK] Zombi manifest validation passed for TOML and YAML files.")


if __name__ == "__main__":
    main()
