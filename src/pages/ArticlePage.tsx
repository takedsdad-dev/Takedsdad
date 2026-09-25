import { Link, useParams } from "react-router-dom"
import { articles } from "../articles"
import { site } from "../site"

function ContactButton() {
  return (
    <a
      className="btn article-cta"
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noreferrer"
    >
      تواصل معنا الان
    </a>
  )
}

export default function ArticlePage() {
  const { slug } = useParams()
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    return (
      <section className="article">
        <h1>المقال غير موجود</h1>
        <Link to="/city/jazan">العودة إلى سداد قروض جازان</Link>
      </section>
    )
  }

  const related = (article.related ?? [])
    .map((relatedSlug) => articles.find((item) => item.slug === relatedSlug))
    .filter((item) => item !== undefined)

  return (
    <>
      <article className="article rich-article">
        <h1>{article.title}</h1>
        {article.date && (
          <p className="article-meta">
            بواسطة {site.name} / {article.date}
          </p>
        )}

        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        {article.sections && (
          <>
            {!article.hideCta && !article.sections[0]?.heading && <ContactButton />}
            {article.sections.map((section, index) => (
              <div className="article-section" key={index}>
                {section.heading && (
                  <h2>
                    {section.heading}
                    {!section.noPhone && (
                      <>
                        {" "}
                        <a href={`tel:${site.phone}`}>
                          <bdi dir="ltr">{site.phone}</bdi>
                        </a>
                      </>
                    )}
                  </h2>
                )}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.highlights?.map((line) => (
                  <p className="article-highlight" key={line}>
                    <strong>{line}</strong>{" "}
                    <a href={`tel:${site.phone}`}>
                      <bdi dir="ltr">{site.phone}</bdi>
                    </a>
                  </p>
                ))}
                {!article.hideCta && <ContactButton />}
              </div>
            ))}
          </>
        )}

        {article.cityLinks && (
          <nav className="article-cities" aria-label="مدن الخدمة">
            {article.cityLinks.map((city) => (
              <Link key={city.to} to={city.to}>
                {city.label}
              </Link>
            ))}
          </nav>
        )}

        {article.features && (
          <div className="article-features">
            {article.features.map((group, index) => (
              <ul key={index}>
                {group.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="article related-articles">
          <h2>ذات صلة</h2>
          <div className="related-list">
            {related.map((item) => (
              <Link className="related-card" key={item.slug} to={`/article/${item.slug}`}>
                <h3>{item.title}</h3>
                <span>بواسطة {site.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
