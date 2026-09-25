import { useState, type FormEvent } from "react"
import { phones, services, site } from "../site"

export function ServicesPage() {
  return (
    <section className="article">
      <h1>خدماتنا</h1>
      <p>
        نراجع القرض، البطاقة، أو إيقاف الخدمات، ثم نوضح المسار: سداد، تسوية، أو
        إعادة جدولة. لا نبدأ إلا بعد موافقتك على الخطوات.
      </p>
      <div className="cards">
        {services.map((service) => (
          <article className="card" key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <section className="article">
      <h1>من نحن</h1>
      <p>
        {site.name} فريق متابعة لسداد القروض والمتعثرات. نعمل مع العملاء في
        مدن المملكة لترتيب الالتزامات البنكية وشرح أثر كل خطوة على السجل
        الائتماني.
      </p>
      <p>
        نشرح العمولة والمدة المتوقعة قبل البدء، ونبقيك على اطلاع بحالة الملف
        حتى الإغلاق أو إعادة الجدولة.
      </p>
    </section>
  )
}

export function PrivacyPage() {
  return (
    <section className="article">
      <h1>سياسة الخصوصية</h1>
      <p>
        نستخدم الاسم ورقم الجوال وتفاصيل الالتزام فقط لمتابعة طلب السداد. لا
        نبيع هذه البيانات، ولا نشاركها إلا مع الجهة اللازمة لإتمام التسوية وبعد
        موافقتك.
      </p>
      <p>يمكنك طلب تصحيح بياناتك أو حذفها بالتواصل عبر صفحة اتصل بنا.</p>
    </section>
  )
}

export function TermsPage() {
  return (
    <section className="article">
      <h1>الشروط والأحكام</h1>
      <p>
        الخدمة استشارة ومتابعة للسداد وإعادة الجدولة. الموافقة النهائية على أي
        تمويل أو تسوية تصدر من البنك أو جهة التمويل، لا من {site.name}.
      </p>
      <p>
        أي رسوم تُذكر كتابيًا قبل التنفيذ. استمرارك في الطلب يعني موافقتك على
        هذه الشروط.
      </p>
    </section>
  )
}

export function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="article">
      <h1>اتصل بنا</h1>
      {phones.map((item) => (
        <p key={item.tel}>
          هاتف:{" "}
          <a href={`tel:${item.tel}`}>
            <bdi dir="ltr">{item.display}</bdi>
          </a>
          {" · "}
          واتساب:{" "}
          <a href={`https://wa.me/${item.whatsapp}`} target="_blank" rel="noreferrer">
            <bdi dir="ltr">{item.display}</bdi>
          </a>
        </p>
      ))}
      <p>
        البريد: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <form className="form" onSubmit={onSubmit}>
        <label>
          الاسم
          <input name="name" required />
        </label>
        <label>
          الجوال
          <input name="phone" required inputMode="tel" />
        </label>
        <label>
          الرسالة
          <textarea name="message" required rows={4} />
        </label>
        <button className="btn" type="submit">
          إرسال
        </button>
        {sent && <p className="notice">تم استلام رسالتك. سنعاود الاتصال بك.</p>}
      </form>
    </section>
  )
}
