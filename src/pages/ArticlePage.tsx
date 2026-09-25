import { Link, useParams } from "react-router-dom"
import { articles } from "../articles"
import { phones } from "../site"

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

  return (
    <article className="article">
      <h1>{article.title}</h1>
      {article.byline ? (
        <p className="byline">{article.byline}</p>
      ) : (
        <p className="phone-line">
          للتواصل{" "}
          {phones.map((item) => (
            <a key={item.tel} href={`tel:${item.tel}`}>
              <bdi dir="ltr">{item.display}</bdi>
            </a>
          ))}
        </p>
      )}
      {article.blocks
        ? article.blocks.map((block) => (
            <section key={block.heading ?? block.text}>
              {block.heading && <h2>{block.heading}</h2>}
              {block.text && <p>{block.text}</p>}
            </section>
          ))
        : article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <Link className="btn" to="/contact">
        اتصل بنا
      </Link>
    </article>
  )
}
