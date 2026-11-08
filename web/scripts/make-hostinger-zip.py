"""Build a Hostinger upload archive: source only, no node_modules/.next/.env."""
from __future__ import annotations

import json
import shutil
import subprocess
import zipfile
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STAMP = datetime.now().strftime("%Y%m%d_%H%M%S")
OUT = ROOT.parent / f"web_hostinger_{STAMP}.zip"

SKIP_DIRS = {
    ".git",
    ".next",
    "node_modules",
    ".cursor",
    "__pycache__",
    ".tmp-verify",
}
SKIP_FILES = {
    ".env",
    ".env.local",
    ".env.production",
    ".env.development",
    "AGENTS.md",
    "CLAUDE.md",
    "tsconfig.tsbuildinfo",
    "ETS-tracking-failures.pdf",
}
SKIP_SUFFIXES = {".zip", ".pyc"}


def keep(path: Path) -> bool:
    rel_parts = path.relative_to(ROOT).parts
    if any(part in SKIP_DIRS for part in rel_parts):
        return False
    if path.name in SKIP_FILES or path.name.startswith(".env"):
        return False
    if path.suffix.lower() in SKIP_SUFFIXES:
        return False
    return True


def read_env(path: Path) -> dict[str, str]:
    data: dict[str, str] = {}
    if not path.is_file():
        return data
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        data[key.strip()] = value.strip().strip('"')
    return data


def audit() -> None:
    npm = shutil.which("npm")
    if not npm:
        raise SystemExit("npm is not on PATH, so the vulnerability check cannot run.")
    result = subprocess.run(
        [npm, "audit", "--audit-level=low"],
        cwd=ROOT,
        check=False,
    )
    if result.returncode != 0:
        raise SystemExit("npm audit found vulnerabilities. Fix them before exporting.")


def main() -> None:
    audit()
    files = [p for p in ROOT.rglob("*") if p.is_file() and keep(p)]
    env = read_env(ROOT / ".env.local")
    mail = {
        "RESEND_API_KEY": env.get("RESEND_API_KEY", ""),
        "MAIL_TO": env.get("MAIL_TO", "letschat@livemediadigital.com"),
        "MAIL_FROM": env.get("MAIL_FROM", "letschat@livemediadigital.com"),
        "GHL_WEBHOOK_URL": env.get("GHL_WEBHOOK_URL", ""),
    }
    if not mail["RESEND_API_KEY"].startswith("re_"):
        raise SystemExit("Missing RESEND_API_KEY in web/.env.local")
    if not str(mail["GHL_WEBHOOK_URL"]).startswith("https://services.leadconnectorhq.com/hooks/"):
        raise SystemExit("Missing GHL_WEBHOOK_URL in web/.env.local")
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in files:
            zf.write(path, path.relative_to(ROOT).as_posix())
        zf.writestr("resend.config.json", json.dumps(mail, indent=2) + "\n")
    size_mb = OUT.stat().st_size / 1048576
    print(f"archive={OUT}")
    print(f"files={len(files)}")
    print(f"size_mb={round(size_mb, 2)}")
    if size_mb >= 50:
        raise SystemExit("Archive is 50 MB or larger. Hostinger rejects it.")


if __name__ == "__main__":
    main()
