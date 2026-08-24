from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(r"D:\Cursor\LMD")
OUT = Path(r"D:\Cursor\LMD\web\lib\pages.json")


def text(html: str, pat: str, flags=0) -> str:
    m = re.search(pat, html, flags)
    return re.sub(r"\s+", " ", m.group(1)).strip() if m else ""


def clean(s: str) -> str:
    s = s.replace("&amp;", "&").replace("&nbsp;", " ")
    s = re.sub(r"<[^>]+>", "", s)
    return re.sub(r"\s+", " ", s).strip()


def href_to_path(href: str) -> str:
    href = href.replace("../", "")
    href = href.replace("index.html", "/")
    href = href.replace(".html", "")
    if href.startswith("#"):
        return f"/{href}"
    if not href.startswith("/"):
        href = "/" + href
    if href == "/":
        return "/"
    return href.rstrip("/") or "/"


def extract_cards(block: str) -> list[dict]:
    cards = []
    for m in re.finditer(r'<a href="([^"]+)" class="related-card">(.*?)</a>', block, re.S):
        inner = m.group(2)
        cards.append(
            {
                "href": href_to_path(m.group(1)),
                "tag": clean(text(inner, r'class="related-tag">(.*?)</span>')),
                "title": clean(text(inner, r"<strong>(.*?)</strong>")),
                "copy": clean(text(inner, r"<span>(?!Learn)(.*?)</span>", re.S)),
            }
        )
    return cards


def extract_page(path: Path, group: str) -> dict:
    html = path.read_text(encoding="utf-8", errors="replace")
    slug = path.stem
    main = text(html, r"<main>(.*?)</main>", re.S)
    crumbs = []
    crumb_html = text(main, r'class="breadcrumb">(.*?)</p>', re.S)
    for cm in re.finditer(r'<a href="([^"]+)">(.*?)</a>', crumb_html):
        crumbs.append({"href": href_to_path(cm.group(1)), "label": clean(cm.group(2))})
    last = clean(re.sub(r"<a.*?</a>|<span>/</span>", "", crumb_html))
    if last:
        crumbs.append({"href": "", "label": last})

    sections = []
    for sm in re.finditer(r'<section class="detail-section[^"]*">(.*?)</section>', main, re.S):
        block = sm.group(1)
        heading = clean(text(block, r"<h2>(.*?)</h2>", re.S))
        sub = clean(text(block, r'class="section-sub[^"]*">(.*?)</p>', re.S))
        items = [clean(i) for i in re.findall(r"<li>(.*?)</li>", block, re.S)]
        paras = [clean(p) for p in re.findall(r'<div class="detail-copy[^"]*">.*?<p>(.*?)</p>', block, re.S)]
        if not paras:
            paras = [clean(p) for p in re.findall(r'<div class="detail-copy[^"]*".*?>\s*(?:<p>(.*?)</p>\s*)+', block, re.S)]
            paras = [clean(p) for p in re.findall(r"<p>(.*?)</p>", text(block, r'class="detail-copy[^"]*"[^>]*>(.*?)</div>', re.S), re.S)]
        cards = extract_cards(block)
        if heading or items or paras or cards:
            sections.append(
                {
                    "heading": heading,
                    "sub": sub,
                    "items": items,
                    "paras": paras,
                    "cards": cards,
                }
            )

    cta = text(main, r'class="cta-final".*?<h2>(.*?)</h2>', re.S)
    cta_sub = text(main, r'class="cta-final".*?class="section-sub">(.*?)</p>', re.S)

    return {
        "group": group,
        "slug": slug,
        "title": clean(text(html, r"<title>(.*?)</title>", re.S)),
        "description": text(html, r'<meta name="description" content="([^"]*)"'),
        "h1": clean(text(main, r"<h1>(.*?)</h1>", re.S)),
        "eyebrow": clean(text(main, r'class="eyebrow[^"]*">(.*?)</p>', re.S)),
        "heroSub": clean(text(main, r'class="section-sub center">(.*?)</p>', re.S)),
        "crumbs": crumbs,
        "sections": sections,
        "cta": clean(cta),
        "ctaSub": clean(cta_sub),
    }


def main() -> None:
    pages: list[dict] = []
    mapping = {
        "services": ROOT / "services",
        "industries": ROOT / "industries",
        "service-areas": ROOT / "service-areas",
        "case-studies": ROOT / "case-studies",
        "blog": ROOT / "blog",
    }
    for group, folder in mapping.items():
        for path in sorted(folder.glob("*.html")):
            pages.append(extract_page(path, group))
    OUT.write_text(json.dumps(pages, indent=2), encoding="utf-8")
    print(f"wrote {len(pages)} pages to {OUT}")


if __name__ == "__main__":
    main()
