import { Link } from "react-router-dom"
import Seo from "../seo/Seo.tsx"
import { notFoundSeo } from "../seo/meta.ts"

export default function NotFoundPage() {
  return (
    <section className="article">
      <Seo {...notFoundSeo()} />
      <h1>الصفحة غير موجودة</h1>
      <Link to="/">العودة للرئيسية</Link>
    </section>
  )
}
