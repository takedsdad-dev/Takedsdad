import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const root = process.cwd()
const dist = path.join(root, "dist")
const templatePath = path.join(dist, "index.html")
const template = fs.readFileSync(templatePath, "utf8")
const serverEntry = pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href
const { render, indexableSeo, notFoundSeo, renderHead } = await import(serverEntry)

function applyTemplate(head, html) {
  if (!template.includes("<!--seo-->") || !template.includes("<!--/seo-->")) {
    throw new Error("index.html is missing SEO markers")
  }
  const withHead = template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `<!--seo-->\n    ${head}\n    <!--/seo-->`)
  if (!withHead.includes("<!--app-html-->")) {
    throw new Error("index.html is missing the app HTML marker")
  }
  return withHead.replace("<!--app-html-->", html)
}

const pages = indexableSeo()
const titles = new Set()
const descriptions = new Set()
const locs = []

for (const page of pages) {
  if (page.robots.includes("noindex")) {
    throw new Error(`Indexable route is marked noindex: ${page.path}`)
  }
  if (titles.has(page.title)) throw new Error(`Duplicate title: ${page.title}`)
  if (descriptions.has(page.description)) throw new Error(`Duplicate description: ${page.path}`)
  titles.add(page.title)
  descriptions.add(page.description)
  if (!page.title.trim() || !page.description.trim()) {
    throw new Error(`Missing title or description for ${page.path}`)
  }
  if (page.jsonLd) {
    const parsed = JSON.parse(JSON.stringify(page.jsonLd))
    if (parsed["@context"] !== "https://schema.org" || !Array.isArray(parsed["@graph"])) {
      throw new Error(`Invalid JSON-LD for ${page.path}`)
    }
  }

  const html = render(page.path)
  const head = renderHead(page)
  if (!html.includes("</p>") || html.length < 2000) {
    throw new Error(`Prerendered HTML has no readable content: ${page.path}`)
  }
  if (head.includes("noindex")) throw new Error(`Prerendered head is noindex: ${page.path}`)

  const file = page.path === "/" ? path.join(dist, "index.html") : path.join(dist, page.path.slice(1), "index.html")
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, applyTemplate(head, html))
  const loc = page.path === "/" ? "https://takedsdad.com/" : `https://takedsdad.com${page.path}`
  if (page.lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(page.lastmod)) {
    throw new Error(`Invalid lastmod for ${page.path}`)
  }
  locs.push({ loc, lastmod: page.lastmod })
}

const missing = notFoundSeo()
if (!missing.robots.includes("noindex")) throw new Error("Not found page is indexable")
// The 404 shell reuses the app's existing not-found view, so no new copy is introduced.
fs.writeFileSync(
  path.join(dist, "404.html"),
  applyTemplate(renderHead(missing), render("/this-page-does-not-exist")),
)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs
  .map(({ loc, lastmod }) => {
    const modified = lastmod ? `<lastmod>${lastmod}</lastmod>` : ""
    return `  <url><loc>${loc}</loc>${modified}</url>`
  })
  .join("\n")}
</urlset>
`
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap)
fs.mkdirSync(path.join(root, "public"), { recursive: true })
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap)

if (!fs.existsSync(path.join(dist, "robots.txt"))) {
  throw new Error("dist/robots.txt is missing")
}
const robots = fs.readFileSync(path.join(dist, "robots.txt"), "utf8")
if (!robots.includes("https://takedsdad.com/sitemap.xml")) {
  throw new Error("robots.txt does not reference the production sitemap")
}
if (/disallow:\s*\/\s*$/im.test(robots)) {
  throw new Error("robots.txt blocks the whole site")
}

if (!fs.existsSync(path.join(dist, "hero-cash.jpg"))) {
  throw new Error("Open Graph image is missing from dist")
}
if (!fs.existsSync(path.join(dist, "hero-hands.png"))) {
  throw new Error("LCP image is missing from dist")
}

console.log(`Prerendered ${locs.length} indexable URLs`)
