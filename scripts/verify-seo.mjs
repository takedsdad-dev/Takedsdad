import fs from "node:fs"
import path from "node:path"

const dist = "dist"
const robots = fs.readFileSync(path.join(dist, "robots.txt"), "utf8")
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8")
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const home = fs.readFileSync(path.join(dist, "index.html"), "utf8")
const city = fs.readFileSync(path.join(dist, "city", "riyadh", "index.html"), "utf8")
const article = fs.readFileSync(path.join(dist, "article", "military-new-loan", "index.html"), "utf8")
const missing = fs.readFileSync(path.join(dist, "404.html"), "utf8")

function titleOf(html) {
  return html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""
}
function canonicalOf(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? ""
}
function robotsOf(html) {
  return html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? ""
}
function h1Count(html) {
  return [...html.matchAll(/<h1[\s>]/g)].length
}

const pages = []
for (const loc of locs) {
  const url = new URL(loc)
  const file = url.pathname === "/" ? path.join(dist, "index.html") : path.join(dist, url.pathname.slice(1), "index.html")
  const html = fs.readFileSync(file, "utf8")
  const jsonMatch = html.match(/<script type="application\/ld\+json" id="seo-jsonld">([\s\S]*?)<\/script>/)
  if (!jsonMatch) throw new Error(`Missing JSON-LD at ${loc}`)
  const json = JSON.parse(jsonMatch[1])
  if (json["@context"] !== "https://schema.org") throw new Error(`Bad JSON-LD context at ${loc}`)
  if (!JSON.stringify(json["@graph"]).includes("Organization")) throw new Error(`Organization schema missing at ${loc}`)
  const canonicalCount = [...html.matchAll(/rel="canonical"/g)].length
  if (canonicalCount !== 1) throw new Error(`Expected one canonical at ${loc}`)
  if (!html.includes('lang="ar"') || !html.includes('dir="rtl"')) throw new Error(`lang/dir missing at ${loc}`)
  const inlineScripts = [...html.matchAll(/<script(?![^>]*type="application\/ld\+json")([^>]*)>/g)]
  if (inlineScripts.some((match) => !match[1].includes("src="))) {
    throw new Error(`Unexpected inline script at ${loc}`)
  }
  pages.push({
    loc,
    title: titleOf(html),
    canonical: canonicalOf(html),
    robots: robotsOf(html),
    h1: h1Count(html),
  })
}

const titles = new Set(pages.map((page) => page.title))
if (titles.size !== pages.length) throw new Error("Duplicate titles in built HTML")
if (pages.some((page) => page.robots.includes("noindex"))) throw new Error("Indexable page is noindex")
if (pages.some((page) => page.canonical !== page.loc)) throw new Error("Canonical does not match sitemap URL")
// City pages use the site's existing .banner paragraph instead of an H1, so 0 is valid here.
if (pages.some((page) => page.h1 > 1)) {
  console.log(pages.filter((page) => page.h1 > 1))
  throw new Error("Expected at most one H1")
}
if (!robots.includes("Sitemap: https://takedsdad.com/sitemap.xml")) throw new Error("robots sitemap missing")
if (!/Allow:\s*\//.test(robots)) throw new Error("robots does not allow crawling")
if (/^\s*disallow:\s*\/\s*$/im.test(robots)) throw new Error("robots blocks the site")
if (missing.includes('rel="canonical"')) throw new Error("404 has a canonical")
if (missing.includes('property="og:url"')) throw new Error("404 Open Graph URL points at another page")
if (!missing.includes("noindex")) throw new Error("404 is indexable")
if (!missing.includes("الصفحة غير موجودة")) throw new Error("404 does not use the site's not-found view")
if (!home.includes('lang="ar"') || !home.includes('dir="rtl"')) throw new Error("html lang or dir is wrong")
if (!/charset="?UTF-8"?/i.test(home)) throw new Error("charset missing")
if (!home.includes('name="viewport"')) throw new Error("viewport missing")
if (!home.includes('rel="preload" as="image" href="/hero-hands.png"')) throw new Error("homepage LCP preload missing")
if (!home.includes('property="og:image:type" content="image/jpeg"')) throw new Error("og:image:type missing")
if (!home.includes('name="twitter:image:alt"')) throw new Error("twitter:image:alt missing")
const hero = home.match(/<img[^>]*src="\/hero-hands\.png"[^>]*>/)
if (!hero || hero[0].includes('loading="lazy"')) throw new Error("homepage LCP image is missing or lazy-loaded")
const about = fs.readFileSync(path.join(dist, "about", "index.html"), "utf8")
if (!about.includes('rel="preload" as="image" href="/hero-cash.jpg"')) throw new Error("about LCP preload missing")
if (!sitemap.includes("<loc>https://takedsdad.com/article/stop-services</loc><lastmod>2024-10-21</lastmod>")) {
  throw new Error("dated article lastmod missing")
}
if (!sitemap.includes("<loc>https://takedsdad.com/article/military-new-loan</loc><lastmod>2024-10-23</lastmod>")) {
  throw new Error("military article lastmod missing")
}
if (!sitemap.includes("<loc>https://takedsdad.com/article/muhayil</loc><lastmod>2024-10-25</lastmod>")) {
  throw new Error("muhayil lastmod missing")
}
if (sitemap.includes("<loc>https://takedsdad.com/</loc><lastmod>")) throw new Error("homepage lastmod was invented")
// Spot checks use the website's original copy to prove prerendering did not alter visible text.
if (!home.includes("مكتب تأكيد السداد لتسديد قروض ومتعثرات سمة")) throw new Error("Homepage body missing")
if (!home.includes("إستخراج قرض جديد")) throw new Error("Homepage new-loan section missing")
if (!city.includes("تسديد قروض الرياض")) throw new Error("Riyadh page missing")
if (!article.includes("سداد متعثرات سمه")) throw new Error("Article body missing")
if (!article.includes('"datePublished":"2024-10-23"')) throw new Error("article datePublished does not match the visible date")
if (!fs.existsSync(path.join(dist, "hero-hands.png"))) throw new Error("Hero image missing")
if (!fs.existsSync(path.join(dist, "hero-cash.jpg"))) throw new Error("OG image missing")

console.log(`Verified ${pages.length} pages`)
console.log(pages.map((page) => page.title).join("\n"))
