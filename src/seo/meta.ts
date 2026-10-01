import { articles, type Article } from "../articles.ts"
import { cities, services, site, type City } from "../site.ts"

export const SITE_ORIGIN = "https://takedsdad.com"
export const OG_IMAGE_PATH = "/hero-cash.jpg"
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 674
// Alt text reused verbatim from the existing homepage image markup.
export const OG_IMAGE_ALT = "يد تحمل أوراقًا نقدية من الريال السعودي"

export const HERO_IMAGE_PATH = "/hero-hands.png"
const HERO_IMAGE_WIDTH = 953
const HERO_IMAGE_HEIGHT = 726
const HERO_IMAGE_ALT = "يدان تعدّان أوراقًا نقدية من فئة خمسمئة ريال"

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`

const INDEXABLE = "index, follow, max-image-preview:large"

// Titles and descriptions below are the website's own existing wording:
// the original index.html tags, visible page headings, nav labels, and the
// summary fields already stored in site.ts and articles.ts.
const HOME_TITLE = "تاكد سداد | تسديد قروض ومتعثرات"
const HOME_DESCRIPTION =
  "تاكد سداد لخدمات تسديد القروض والمتعثرات وإعادة الجدولة في مدن المملكة."

export type Crumb = { label: string; to?: string }

export type SeoState = {
  title: string
  description: string
  path: string
  robots: string
  ogType: "website" | "article"
  lastmod?: string
  jsonLd?: JsonLd
}

type JsonLd = {
  "@context": "https://schema.org"
  "@graph": Record<string, unknown>[]
}

export function absoluteUrl(path: string) {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    alternateName: ["تأكيد السداد", site.nameEn],
    url: `${SITE_ORIGIN}/`,
    email: site.email,
    telephone: ["+966500009560", "+966507772926"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+966500009560",
        contactType: "customer service",
        availableLanguage: ["Arabic"],
        areaServed: "SA",
      },
      {
        "@type": "ContactPoint",
        telephone: "+966507772926",
        contactType: "customer service",
        availableLanguage: ["Arabic"],
        areaServed: "SA",
      },
    ],
    areaServed: { "@type": "Country", name: "Saudi Arabia" },
    address: { "@type": "PostalAddress", addressCountry: "SA" },
    description: HOME_DESCRIPTION,
  }
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: site.name,
    url: `${SITE_ORIGIN}/`,
    inLanguage: "ar",
    publisher: { "@id": ORGANIZATION_ID },
  }
}

function webPageNode(input: {
  title: string
  description: string
  path: string
  type?: string | string[]
}) {
  const url = absoluteUrl(input.path)
  return {
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    inLanguage: "ar",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
  }
}

function breadcrumbNode(path: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.to ?? path),
    })),
  }
}

function graph(...nodes: Record<string, unknown>[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode(), ...nodes],
  }
}

function pageSeo(
  path: string,
  title: string,
  description: string,
  crumbLabel: string,
  extra: Record<string, unknown>[] = [],
  ogType: SeoState["ogType"] = "website",
  options?: {
    pageType?: string | string[]
    pageExtra?: Record<string, unknown>
    lastmod?: string
  },
): SeoState {
  const crumbs: Crumb[] = [{ label: site.name, to: "/" }, { label: crumbLabel }]
  const page = {
    ...webPageNode({ title, description, path, type: options?.pageType }),
    breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` },
    ...options?.pageExtra,
  }
  return {
    title,
    description,
    path,
    robots: INDEXABLE,
    ogType,
    lastmod: options?.lastmod,
    jsonLd: graph(page, breadcrumbNode(path, crumbs), ...extra),
  }
}

export function homeSeo(): SeoState {
  const path = "/"
  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path,
    robots: INDEXABLE,
    ogType: "website",
    jsonLd: graph({
      ...webPageNode({ title: HOME_TITLE, description: HOME_DESCRIPTION, path }),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}${HERO_IMAGE_PATH}`,
        width: HERO_IMAGE_WIDTH,
        height: HERO_IMAGE_HEIGHT,
        caption: HERO_IMAGE_ALT,
      },
    }),
  }
}

export function servicesSeo(): SeoState {
  return pageSeo(
    "/services",
    `خدماتنا | ${site.name}`,
    "نراجع القرض، البطاقة، أو إيقاف الخدمات، ثم نوضح المسار: سداد، تسوية، أو إعادة جدولة. لا نبدأ إلا بعد موافقتك على الخطوات.",
    "خدماتنا",
    [
      {
        "@type": "ItemList",
        name: `خدماتنا | ${site.name}`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.text,
            url: absoluteUrl("/services"),
            provider: { "@id": ORGANIZATION_ID },
            areaServed: { "@type": "Country", name: "Saudi Arabia" },
          },
        })),
      },
    ],
  )
}

export function aboutSeo(): SeoState {
  return pageSeo(
    "/about",
    `من نحن | ${site.name}`,
    "تقدم مؤسسة تأكيد السداد لتسديد قروض خدمات تسديد القروض و تسديد المتعثرات المالية في المملكة العربية السعودية، بما في ذلك سداد الديون المتراكمة ومتعثرات الفيزا والسمه والبطاقات الائتمانية.",
    "من نحن",
  )
}

export function contactSeo(): SeoState {
  return pageSeo(
    "/contact",
    `اتصل بنا | ${site.name}`,
    "يسعدنا تلقي رسائلكم في حالة وجود أي إستفسارات أو شكاوي، قم بملء الإستمارة التالية وسيقوم أحد المختصين بالرد بأقرب وقت.",
    "اتصل بنا",
    [],
    "website",
    { pageType: "ContactPage" },
  )
}

export function privacySeo(): SeoState {
  return pageSeo(
    "/privacy",
    "سياسة الخصوصية لموقع تأكيد السداد لتسديد القروض",
    "نحن نولي أهمية كبيرة لحماية خصوصية زوارنا ونرغب في توضيح كيفية تعاملنا مع المعلومات على موقعنا.",
    "سياسة الخصوصية",
  )
}

export function termsSeo(): SeoState {
  return pageSeo(
    "/terms",
    "شروط وأحكام موقع تأكيد السداد لتسديد القروض",
    "يُقدم هذا الموقع منصة تواصلية تربط بين المقترضين والمستثمرين بهدف تسهيل عملية تسديد القروض. ونهدف إلى توفير بيئة آمنة وموثوقة لجميع مستخدمينا.",
    "الشروط والأحكام",
  )
}

export function citySeo(city: City): SeoState {
  const path = `/city/${city.slug}`
  return pageSeo(
    path,
    `${city.title} | ${site.name}`,
    city.summary,
    city.title,
    [
      {
        "@type": "Service",
        name: city.title,
        description: city.summary,
        url: absoluteUrl(path),
        provider: { "@id": ORGANIZATION_ID },
        areaServed: {
          "@type": "City",
          name: city.name,
          containedInPlace: { "@type": "Country", name: "Saudi Arabia" },
        },
      },
    ],
  )
}

const arabicMonths: Record<string, string> = {
  يناير: "01",
  فبراير: "02",
  مارس: "03",
  أبريل: "04",
  مايو: "05",
  يونيو: "06",
  يوليو: "07",
  أغسطس: "08",
  سبتمبر: "09",
  أكتوبر: "10",
  نوفمبر: "11",
  ديسمبر: "12",
}

function isoDateFromArabic(display?: string) {
  if (!display) return undefined
  const match = display.trim().match(/^(\S+)\s+(\d{1,2}),\s+(\d{4})$/)
  if (!match) return undefined
  const month = arabicMonths[match[1]]
  if (!month) return undefined
  return `${match[3]}-${month}-${match[2].padStart(2, "0")}`
}

export function articleSeo(article: Article): SeoState {
  const path = `/article/${article.slug}`
  const url = absoluteUrl(path)
  const title = `${article.title} | ${site.name}`
  const datePublished = isoDateFromArabic(article.date)
  const articleNode: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    inLanguage: "ar",
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
  }
  if (datePublished) articleNode.datePublished = datePublished
  return pageSeo(path, title, article.excerpt, article.title, [articleNode], "article", {
    lastmod: datePublished,
    pageExtra: { mainEntity: { "@id": `${url}#article` } },
  })
}

export function notFoundSeo(): SeoState {
  return {
    title: `الصفحة غير موجودة | ${site.name}`,
    description: HOME_DESCRIPTION,
    path: "/404",
    robots: "noindex, nofollow",
    ogType: "website",
  }
}

export function indexableSeo(): SeoState[] {
  return [
    homeSeo(),
    servicesSeo(),
    aboutSeo(),
    contactSeo(),
    privacySeo(),
    termsSeo(),
    ...cities.map((city) => citySeo(city)),
    ...articles.map((article) => articleSeo(article)),
  ]
}
