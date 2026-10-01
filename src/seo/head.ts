import { site } from "../site.ts"
import {
  HERO_IMAGE_PATH,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_ORIGIN,
  absoluteUrl,
  type SeoState,
} from "./meta.ts"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function jsonLdMarkup(jsonLd: SeoState["jsonLd"]) {
  if (!jsonLd) return ""
  const json = JSON.stringify(jsonLd).replaceAll("<", "\\u003c")
  JSON.parse(json)
  return `<script type="application/ld+json" id="seo-jsonld">${json}</script>`
}

function preloadHref(path: string) {
  if (path === "/") return HERO_IMAGE_PATH
  if (path === "/about") return OG_IMAGE_PATH
  return ""
}

function imageMimeType(href: string) {
  if (href.endsWith(".png")) return "image/png"
  if (href.endsWith(".webp")) return "image/webp"
  return "image/jpeg"
}

function lcpPreload(path: string) {
  const href = preloadHref(path)
  if (!href) return ""
  return `<link rel="preload" as="image" href="${href}" type="${imageMimeType(href)}" fetchpriority="high" data-seo-preload="true" />`
}

function openGraphUrl(seo: SeoState) {
  if (!seo.robots.includes("noindex")) return absoluteUrl(seo.path)
  if (typeof window === "undefined") return ""
  const path = window.location.pathname
  const normalized = path.length > 1 ? path.replace(/\/+$/, "") : path || "/"
  return `${SITE_ORIGIN}${normalized}`
}

export function renderHead(seo: SeoState) {
  const canonical = seo.robots.includes("noindex") ? "" : absoluteUrl(seo.path)
  const shareUrl = openGraphUrl(seo)
  const image = `${SITE_ORIGIN}${OG_IMAGE_PATH}`
  const tags = [
    lcpPreload(seo.path),
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
    `<meta name="author" content="${escapeHtml(site.name)}" />`,
    canonical ? `<link rel="canonical" href="${canonical}" />` : "",
    canonical ? `<link rel="alternate" hreflang="ar" href="${canonical}" />` : "",
    canonical ? `<link rel="alternate" hreflang="x-default" href="${canonical}" />` : "",
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    shareUrl ? `<meta property="og:url" content="${shareUrl}" />` : "",
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:locale" content="ar_SA" />`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(OG_IMAGE_ALT)}" />`,
    jsonLdMarkup(seo.jsonLd),
  ]
  return tags.filter(Boolean).join("\n    ")
}

function syncLcpPreload(path: string) {
  const href = preloadHref(path)
  const existing = document.head.querySelector('link[data-seo-preload]')
  if (!href) {
    existing?.remove()
    return
  }
  const link = existing ?? document.createElement("link")
  link.setAttribute("rel", "preload")
  link.setAttribute("as", "image")
  link.setAttribute("href", href)
  link.setAttribute("type", imageMimeType(href))
  link.setAttribute("fetchpriority", "high")
  link.setAttribute("data-seo-preload", "true")
  if (!existing) document.head.appendChild(link)
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}="${CSS.escape(key)}"]`
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute("content", content)
}

function upsertLink(rel: string, href: string | null, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let element = document.head.querySelector(selector)
  if (!href) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement("link")
    element.setAttribute("rel", rel)
    if (hreflang) element.setAttribute("hreflang", hreflang)
    document.head.appendChild(element)
  }
  element.setAttribute("href", href)
}

export function applyHead(seo: SeoState) {
  document.title = seo.title
  upsertMeta("name", "description", seo.description)
  upsertMeta("name", "robots", seo.robots)
  upsertMeta("name", "author", site.name)
  const canonical = seo.robots.includes("noindex") ? null : absoluteUrl(seo.path)
  upsertLink("canonical", canonical)
  upsertLink("alternate", canonical, "ar")
  upsertLink("alternate", canonical, "x-default")
  const shareUrl = openGraphUrl(seo)
  upsertMeta("property", "og:title", seo.title)
  upsertMeta("property", "og:description", seo.description)
  if (shareUrl) upsertMeta("property", "og:url", shareUrl)
  syncLcpPreload(seo.path)
  upsertMeta("property", "og:type", seo.ogType)
  upsertMeta("property", "og:locale", "ar_SA")
  upsertMeta("property", "og:site_name", site.name)
  upsertMeta("property", "og:image", `${SITE_ORIGIN}${OG_IMAGE_PATH}`)
  upsertMeta("property", "og:image:alt", OG_IMAGE_ALT)
  upsertMeta("property", "og:image:width", String(OG_IMAGE_WIDTH))
  upsertMeta("property", "og:image:height", String(OG_IMAGE_HEIGHT))
  upsertMeta("property", "og:image:type", "image/jpeg")
  upsertMeta("name", "twitter:card", "summary_large_image")
  upsertMeta("name", "twitter:title", seo.title)
  upsertMeta("name", "twitter:description", seo.description)
  upsertMeta("name", "twitter:image", `${SITE_ORIGIN}${OG_IMAGE_PATH}`)
  upsertMeta("name", "twitter:image:alt", OG_IMAGE_ALT)

  const existing = document.getElementById("seo-jsonld")
  if (!seo.jsonLd) {
    existing?.remove()
    return
  }
  const script = existing ?? document.createElement("script")
  script.id = "seo-jsonld"
  script.setAttribute("type", "application/ld+json")
  script.textContent = JSON.stringify(seo.jsonLd)
  if (!existing) document.head.appendChild(script)
}
