"""Import WordPress WXR export into static blog JSON + local images."""

from __future__ import annotations

import json
import re
import ssl
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from html import unescape
from pathlib import Path
from urllib.parse import urljoin, urlparse

import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
XML_CANDIDATES = [
    Path(r"C:\Users\Admin\Downloads\livemediadigital.WordPress.2026-08-24.xml"),
    ROOT / "content" / "wordpress-export.xml",
]
OUT_JSON = ROOT / "lib" / "blog" / "posts.json"
OUT_REDIRECTS = ROOT / "lib" / "wp-legacy-redirects.json"
IMG_DIR = ROOT / "public" / "assets" / "blog"
SITE = "https://livemediadigital.com"

NS = {
    "wp": "http://wordpress.org/export/1.2/",
    "content": "http://purl.org/rss/1.0/modules/content/",
    "excerpt": "http://wordpress.org/export/1.2/excerpt/",
    "dc": "http://purl.org/dc/elements/1.1/",
}

SKIP_SLUGS = {
    "10-tips-to-master-typing-with-typing-master-pro-11-crack",
}

# Old WordPress pages → closest Next.js route (posts are real pages, not listed here)
PAGE_MAP = {
    "/about-us": "/about",
    "/contact": "/contact",
    "/free-consultation": "/consultation",
    "/faqs": "/",
    "/services": "/services/seo",
    "/services/search-engine-optimization": "/services/seo",
    "/services/search-engine-marketing": "/services/sem",
    "/services/web-development": "/services/web-development",
    "/services/social-media-paid-marketing": "/services/social-media-marketing",
    "/miami-content-marketing": "/services/content-marketing",
    "/landing-page-design-services": "/services/web-development",
    "/best-digital-marketing-agency-in-miami": "/service-areas/miami",
    "/google-ads-experts-in-miami": "/services/sem",
    "/website-design-company": "/services/web-development",
    "/miami-ppc-agency": "/services/sem",
    "/digital-marketing-by-industry": "/services",
    "/miami-web-design-agency": "/services/web-development",
    "/lead-generation-in-miami": "/services/sem",
    "/lead-generation-in-Miami": "/services/sem",
    "/seo-consulting-services": "/services/seo",
    "/marketing-for-local-businesses": "/service-areas/miami",
    "/search-engine-optimization-services": "/services/seo",
    "/web-marketing-services": "/services/seo",
    "/technical-seo-agency": "/services/seo",
    "/miami-web-design-company": "/services/web-development",
    "/local-seo-services-in-fort-lauderdale": "/services/seo",
    "/online-marketing-services": "/services/seo",
    "/digital-marketing-services-for-small-businesses": "/services/seo",
    "/seo-agency-in-miami": "/services/seo",
    "/seo-agency-in-Miami": "/services/seo",
    "/doral": "/service-areas/miami",
    "/digital-marketing-services-for-startups": "/services/seo",
    "/orlando-website-design-services": "/services/web-development",
    "/google-marketing-in-Miami": "/services/sem",
    "/google-marketing-in-miami": "/services/sem",
    "/digital-marketing-company-in-miami": "/service-areas/miami",
    "/miami-seo-services": "/services/seo",
    "/miami-seo-firm": "/services/seo",
    "/seo-company-in-miami": "/services/seo",
    "/digital-marketing-for-restaurants": "/industries/restaurants-hospitality",
    "/real-estate-digital-marketing-services": "/industries/real-estate",
    "/digital-marketing-for-doctors": "/industries/medical-wellness",
    "/digital-marketing-for-lawyers": "/industries/law-firms",
    "/digital-marketing-for-construction": "/industries/home-services",
    "/digital-marketing-for-plumbers": "/industries/home-services",
    "/fort-lauderdale-web-design": "/services/web-development",
    "/orlando-seo-services": "/services/seo",
    "/email-marketing-agency-in-miami": "/services/email-marketing",
    "/blog": "/blog",
    "/blog/blog": "/blog",
}

SHORTCODE_RE = re.compile(r"\[/?[a-zA-Z0-9_]+(?:=[^\]]*)?(?:\s[^\]]*)?\]", re.S)
SCRIPT_RE = re.compile(r"<(script|style|iframe|object|embed|form)[^>]*>.*?</\1>", re.I | re.S)
TAG_EVENT_RE = re.compile(r"\son\w+\s*=\s*(\"[^\"]*\"|'[^']*')", re.I)
H1_RE = re.compile(r"<h1[^>]*>.*?</h1>", re.I | re.S)
IMG_RE = re.compile(r"<img\b[^>]*>", re.I)
SRC_RE = re.compile(r"""(?:src|data-src|srcset)=["']([^"']+)["']""", re.I)
HREF_RE = re.compile(r"""href=["']([^"']+)["']""", re.I)
TAGS_RE = re.compile(r"<[^>]+>")
WS_RE = re.compile(r"\n{3,}")
EMPTY_P_RE = re.compile(r"<p>\s*</p>", re.I)

SSL = ssl.create_default_context()


def text(el, tag: str) -> str:
    node = el.find(tag, NS) if ":" in tag else el.find(tag)
    if node is None or node.text is None:
        return ""
    return node.text.strip()


def find_xml() -> Path:
    for path in XML_CANDIDATES:
        if path.exists():
            return path
    raise SystemExit("WordPress XML not found. Place it in Downloads or web/content/wordpress-export.xml")


def local_image_path(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path
    if "/wp-content/uploads/" in path:
        rel = path.split("/wp-content/uploads/", 1)[1]
        return f"/assets/blog/{rel}"
    name = Path(path).name or f"img-{abs(hash(url))}.jpg"
    return f"/assets/blog/external/{name}"


def collect_urls(html: str) -> list[str]:
    urls: list[str] = []
    for match in SRC_RE.finditer(html):
        raw = match.group(1)
        first = raw.split()[0].strip()
        if first.startswith("http"):
            urls.append(first)
    return urls


def download(url: str, dest: Path) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; LMD-blog-import/1.0)"},
    )
    try:
        with urllib.request.urlopen(req, context=SSL, timeout=25) as res:
            dest.write_bytes(res.read())
        return dest.stat().st_size > 0
    except (urllib.error.URLError, TimeoutError, ssl.SSLError, OSError) as exc:
        print(f"  FAIL {url} ({exc})")
        return False


def rewrite_site_url(url: str, post_slugs: set[str]) -> str:
    if not url or url.startswith("mailto:") or url.startswith("tel:") or url.startswith("#"):
        return url
    parsed = urlparse(url)
    host = parsed.netloc.replace("www.", "")
    if host and host != "livemediadigital.com":
        return url
    path = parsed.path or "/"
    if path != "/":
        path = path.rstrip("/") or "/"
    slug = path.lstrip("/")
    if path == "/":
        return "/"
    if slug in post_slugs:
        return f"/{slug}"
    mapped = PAGE_MAP.get(path) or PAGE_MAP.get("/" + slug)
    if mapped:
        return mapped
    if slug.startswith("services/") or slug.startswith("industries/") or slug.startswith("service-areas/"):
        return f"/{slug}"
    return f"/{slug}"


def rewrite_html(html: str, post_slugs: set[str], downloads: dict[str, str]) -> str:
    def href_sub(match: re.Match[str]) -> str:
        return f'href="{rewrite_site_url(match.group(1), post_slugs)}"'

    def src_sub(match: re.Match[str]) -> str:
        original = match.group(1).split()[0]
        local = downloads.get(original)
        if local:
            return match.group(0).replace(match.group(1), local)
        if original.startswith(SITE):
            return match.group(0).replace(original, local_image_path(original))
        return match.group(0)

    html = HREF_RE.sub(href_sub, html)
    html = SRC_RE.sub(src_sub, html)
    return html


BLOCK_RE = re.compile(
    r"</?(?:h[1-6]|p|ul|ol|li|blockquote|figure|div|table|thead|tbody|tr|td|th|section|article|img)[^>]*>",
    re.I,
)
OPEN_PHRASE = re.compile(r"<(h[1-6]|p|li|blockquote|strong|em|a|span)(\s[^>]*)?>", re.I)
CLOSE_PHRASE = re.compile(r"</(h[1-6]|p|li|blockquote|strong|em|a|span)>", re.I)


def wrap_orphan_text(html: str) -> str:
    parts = BLOCK_RE.split(html)
    seps = BLOCK_RE.findall(html)
    out: list[str] = []
    depth = 0
    for i, part in enumerate(parts):
        if depth > 0:
            out.append(part)
        else:
            text = part.strip()
            if text:
                if text.startswith("<"):
                    out.append(text)
                else:
                    for para in re.split(r"\n\s*\n", text):
                        para = re.sub(r"\s+", " ", para).strip()
                        if para:
                            out.append(f"<p>{para}</p>")
        if i < len(seps):
            sep = seps[i]
            name = re.sub(r"[<>/]", " ", sep).split()[0].lower()
            if name in {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote"}:
                if sep.startswith("</"):
                    depth = max(0, depth - 1)
                elif not sep.endswith("/>"):
                    depth += 1
            out.append(sep)
    html = "".join(out)
    html = re.sub(r"<h([1-6])>\s*<p>(.*?)</p>\s*</h\1>", r"<h\1>\2</h\1>", html, flags=re.I | re.S)
    html = re.sub(r"<p>\s*<p>", "<p>", html, flags=re.I)
    html = re.sub(r"</p>\s*</p>", "</p>", html, flags=re.I)
    return html


def clean_html(raw: str, title: str) -> str:
    html = unescape(raw or "")
    html = SHORTCODE_RE.sub("", html)
    html = SCRIPT_RE.sub("", html)
    html = TAG_EVENT_RE.sub("", html)
    html = H1_RE.sub("", html, count=1)
    html = html.replace(f"<h1>{title}</h1>", "")
    html = re.sub(rf"<h2>\s*{re.escape(title)}\s*</h2>", "", html, flags=re.I)
    html = EMPTY_P_RE.sub("", html)
    html = WS_RE.sub("\n\n", html)
    html = re.sub(r"(?:<br\s*/?>\s*){3,}", "<br /><br />", html, flags=re.I)
    html = wrap_orphan_text(html)
    html = html.replace("\ufffd", "")
    return html.strip()


def excerpt_from(html: str, fallback: str) -> str:
    text_only = unescape(TAGS_RE.sub(" ", html))
    text_only = re.sub(r"\s+", " ", text_only).strip()
    source = fallback.strip() or text_only
    source = re.sub(r"\s+", " ", unescape(TAGS_RE.sub(" ", source))).strip()
    if len(source) <= 180:
        return source
    cut = source[:177].rsplit(" ", 1)[0]
    return cut + "…"


def word_count(html: str) -> int:
    text_only = unescape(TAGS_RE.sub(" ", html))
    words = [w for w in re.split(r"\s+", text_only.strip()) if w]
    return len(words)


def main() -> None:
    xml_path = find_xml()
    print("XML", xml_path)
    root = ET.parse(xml_path).getroot()
    channel = root.find("channel")
    items = channel.findall("item") if channel is not None else []

    attachments: dict[str, str] = {}
    for item in items:
        if text(item, "wp:post_type") != "attachment":
            continue
        attachments[text(item, "wp:post_id")] = text(item, "wp:attachment_url")

    raw_posts = []
    for item in items:
        if text(item, "wp:post_type") != "post" or text(item, "wp:status") != "publish":
            continue
        slug = text(item, "wp:post_name")
        if slug in SKIP_SLUGS:
            print("SKIP spam", slug)
            continue
        thumb_id = ""
        for meta in item.findall("wp:postmeta", NS):
            if text(meta, "wp:meta_key") == "_thumbnail_id":
                thumb_id = text(meta, "wp:meta_value")
        raw_posts.append(
            {
                "slug": slug,
                "title": unescape(text(item, "title")),
                "link": text(item, "link"),
                "date": text(item, "wp:post_date")[:10],
                "excerpt": text(item, "excerpt:encoded"),
                "content": text(item, "content:encoded"),
                "thumb": attachments.get(thumb_id, ""),
            }
        )

    post_slugs = {p["slug"] for p in raw_posts}
    print("POSTS", len(raw_posts))

    remote_images: set[str] = set()
    for post in raw_posts:
        if post["thumb"]:
            remote_images.add(post["thumb"])
        remote_images.update(collect_urls(post["content"]))

    downloads: dict[str, str] = {}
    print("IMAGES", len(remote_images))
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {}
        for url in sorted(remote_images):
            local = local_image_path(url)
            dest = ROOT / "public" / local.lstrip("/")
            futures[pool.submit(download, url, dest)] = (url, local)
        for fut in as_completed(futures):
            url, local = futures[fut]
            if fut.result():
                downloads[url] = local
            time.sleep(0.01)

    print("DOWNLOADED", len(downloads), "/", len(remote_images))

    posts = []
    for post in raw_posts:
        html = clean_html(post["content"], post["title"])
        html = rewrite_html(html, post_slugs, downloads)
        image = downloads.get(post["thumb"]) or (local_image_path(post["thumb"]) if post["thumb"] else "")
        posts.append(
            {
                "slug": post["slug"],
                "path": f"/{post['slug']}",
                "title": post["title"],
                "excerpt": excerpt_from(html, post["excerpt"]),
                "date": post["date"],
                "image": image,
                "imageAlt": post["title"],
                "minutes": max(3, round(word_count(html) / 220)),
                "html": html,
            }
        )

    posts.sort(key=lambda p: p["date"], reverse=True)
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding="utf-8")
    print("WROTE", OUT_JSON, "bytes", OUT_JSON.stat().st_size)
    slugs_path = ROOT / "lib" / "blog" / "slugs.json"
    slugs_path.write_text(json.dumps([p["slug"] for p in posts], indent=2) + "\n", encoding="utf-8")

    redirects = []
    seen = set()
    for source, dest in PAGE_MAP.items():
        key = source.rstrip("/") or "/"
        if key in post_slugs or key in seen:
            continue
        if dest == source or dest == key:
            continue
        seen.add(key)
        redirects.append({"source": key, "destination": dest, "permanent": True})
    for extra_src, extra_dest in (
        ("/blogs", "/blog"),
        ("/blogs.html", "/blog"),
        ("/blog.html", "/blog"),
        ("/blog/automate-your-sales-pipeline-fast", "/blog"),
        ("/blog/optimize-workflows-for-growth", "/blog"),
        ("/blog/why-automation-projects-fail", "/blog"),
    ):
        redirects.append({"source": extra_src, "destination": extra_dest, "permanent": True})
    OUT_REDIRECTS.write_text(json.dumps(redirects, indent=2), encoding="utf-8")
    print("WROTE", OUT_REDIRECTS, "redirects", len(redirects))


if __name__ == "__main__":
    main()
