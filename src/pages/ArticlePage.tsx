import { Link, useParams } from "react-router-dom"
import { articles } from "../articles"

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
      {article.paragraphs && article.paragraphs.length > 0 ? (
        article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
      ) : null}
    </article>
  )
}
