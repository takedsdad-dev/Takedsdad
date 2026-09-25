import { Link } from "react-router-dom"
import { banks, cities, highlights, services } from "../site"

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">مكتب حل السداد لتسديد قروض ومتعثرات سمة</p>
          <h1>سداد القروض والمتعثرات</h1>
          <p>
            حل السداد لتسديد قروض في المملكة العربية السعودية نقدم خدمات تسديد
            القروض للعملاء المتعثرين في السداد، وذلك وفقًا لأحكام الشريعة
            الإسلامية، دون فوائد أو أرباح باهظة، مما يساعد العملاء على فك
            قروضهم وتحسين وضعهم المالي.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/services">
              عرض الخدمات
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <img src="/hero-cash.jpg" alt="أوراق نقدية من فئة خمسمئة ريال" />
        </div>
        <div className="banks">
          <h2>بنوك نتعامل معها</h2>
          <ul>
            {banks.map((bank) => (
              <li key={bank}>{bank}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="split">
        <div className="panel media-panel">
          <p>تمويل أوضح</p>
          <strong>أقساط تناسب الراتب</strong>
        </div>
        <div>
          <h2>استخراج تمويل جديد</h2>
          <p>
            بعد ترتيب الالتزامات القديمة، نجهز ملف الطلب: تعريف الراتب، كشف
            الحساب، وحالة السجل الائتماني. الهدف أن يصل الطلب للجهة الممولة
            وهو مكتمل.
          </p>
          <p>
            نخدم الأفراد الذين يريدون إغلاق قرض قائم، أو نقل الالتزام، أو طلب
            تمويل بعد رفع التعثر.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>خدمات تسديد القروض</h2>
        <p className="lead">
          سداد القروض البنكية، متابعة التعثر في سمة، البطاقات الائتمانية،
          وإيقاف الخدمات، مع إعادة الجدولة عندما تكون أنسب من السداد دفعة واحدة.
        </p>
        <div className="cards">
          {services.map((service) => (
            <article className="card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>المدن</h2>
        <div className="city-list">
          {cities.map((city) => (
            <article className="city-card" key={city.slug}>
              <div className="city-visual">{city.name}</div>
              <div className="city-body">
                <h3>{city.title}</h3>
                <p>{city.summary}</p>
                <Link to={`/city/${city.slug}`}>قراءة المزيد</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section features">
        <h2>ما يميز الخدمة</h2>
        <p>
          نرتب القرض القديم في مدن المملكة بعمولة تُشرح قبل البدء، وخطوات
          يمكن متابعتها في نفس اليوم عندما يكتمل الملف.
        </p>
        <ul>
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  )
}
