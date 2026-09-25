import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
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

const aboutValues = [
  {
    title: "رؤيتنا",
    text: "أن نكون المعيار الذي يُحتذى به في مجال التمويل المصرفي كوننا نؤمن بإمكانية السمو بهذا القطاع بالإخلاص والتميز.",
  },
  {
    title: "مهمتنا",
    text: "خلق مفهوم للجودة يُمكن عملائنا من العيش في بيئة مستقرة وأن يشعروا بها وينتموا إليها من خلال تقديم خدمة مميزة لا تُنسى.",
  },
  {
    title: "رسالتنا",
    text: "المشاركة في إحداث تغيير حقيقي ومساعدة عملائنا على تطوير حياتهم ورفاهيتهم والارتقاء بها لأقصى درجة ممكنة.",
  },
]

export function AboutPage() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="about-eyebrow">لننجح سوياً</p>
          <h1>
            سدد قروضك
            <br />
            ومتعثراتك المالية
          </h1>
          <p>
            تقدم مؤسسة تأكيد السداد لتسديد قروض خدمات <strong>تسديد القروض</strong>{" "}
            و تسديد <strong>المتعثرات المالية في المملكة العربية السعودية</strong>،
            بما في ذلك <strong>سداد الديون المتراكمة</strong> ومتعثرات الفيزا و
            <strong>السمه</strong> والبطاقات الائتمانية. تقدم المؤسسة أفضل الحلول
            المالية بأقل نسبة ربح، ويساعد الأفراد والشركات على تحسين وضعهم المالي
            وتحقيق النجاح.
          </p>
          <Link className="btn" to="/contact">
            تواصل معنا الآن
          </Link>
        </div>
        <div className="about-hero-art">
          <img src="/hero-cash.jpg" alt="أوراق نقدية من فئة خمسمئة ريال" />
        </div>
      </section>

      <section className="about-mission">
        <p className="about-eyebrow">مهمتنا</p>
        <h2>
          ملتزمون بمساعدة عملاؤنا في التغلب على أي تحدٍ وتحقيق نتائج مذهلة.
        </h2>
        <p>
          تأكيد السداد لتسديد قروض، حيث تجد فريق متكامل من المختصين الموثوقين
          بخبرتهم في التمويل المصرفي وتسديد القروض، بشغف لا يفنى وطموح لا ينضب
          ليأخذوا بيدك خطوة بخطوة إلى مستقبل مشرق.
        </p>
        <p>
          نحن قادرون على فهم متطلبات العميل، وتقديم الإقتراحات بما يتماشى مع رؤية
          العميل من خلال بناء وتنفيذ حلول عالية الجودة.
        </p>

        <div className="about-values">
          {aboutValues.map((item, index) => (
            <article className="about-value" key={item.title}>
              <span className="about-value-num">{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <p className="about-eyebrow">طريق النجاح</p>
        <h2>
          مستعد للوصول إلى آفاق جديدة؟
          <br />
          دعنا نصل إلى هناك، معاً
        </h2>
        <Link className="btn" to="/contact">
          اتصل بنا
        </Link>
      </section>
    </div>
  )
}

export function PrivacyPage() {
  return (
    <section className="article terms">
      <h1>سياسة الخصوصية لموقع تأكيد السداد لتسديد القروض</h1>
      <p>
        أهلاً بك في موقع “تأكيد السداد لتسديد القروض”. نحن نولي أهمية كبيرة
        لحماية خصوصية زوارنا ونرغب في توضيح كيفية تعاملنا مع المعلومات على
        موقعنا.
      </p>

      <h3>1. جمع المعلومات</h3>
      <p>
        نؤكد أننا لا نقوم بجمع أي بيانات شخصية من الزوار أثناء تصفحهم للموقع.
        لا نستخدم ملفات تعريف الارتباط أو أي تقنيات تتبع لجمع معلومات شخصية.
      </p>

      <h3>2. الدفع والمعاملات المالية</h3>
      <p>
        يُرجى مراعاة أننا لا نُجري أي عمليات دفع أو معاملات مالية عبر موقعنا.
        نحن لا نُطلب ولا نُقبل أي معلومات مالية من الزوار.
      </p>

      <h3>3. ملفات تعريف الارتباط</h3>
      <p>
        لا نستخدم ملفات تعريف الارتباط على موقعنا. يُفضل للزوار مراجعة إعدادات
        متصفحهم لفهم كيفية التحكم في ملفات تعريف الارتباط.
      </p>

      <h3>4. الروابط الخارجية</h3>
      <p>
        قد يحتوي موقعنا على روابط لمواقع خارجية. يرجى مراجعة سياسات الخصوصية
        الخاصة بهذه المواقع، حيث لا نتحكم في محتواها أو سياساتها.
      </p>

      <h3>5. تغييرات في سياسة الخصوصية</h3>
      <p>
        نحتفظ بحق تحديث أو تعديل سياسة الخصوصية عند الضرورة، وسيتم نشر أي
        تغييرات هنا. يُنصح بمتابعة هذه الصفحة بشكل دوري للاطلاع على التحديثات.
      </p>

      <h3>6. تواصل معنا</h3>
      <p>
        إذا كان لديكم أي استفسارات أو أسئلة حول سياسة الخصوصية، يرجى التواصل
        معنا عبر وسائل الاتصال المتاحة على الموقع من خلال{" "}
        <Link to="/contact">الضغط هنا</Link>
      </p>

      <p className="terms-thanks">
        شكرًا لزيارتكم لموقع تأكيد السداد لتسديد القروض. نأمل أن يكون تجربتكم
        مريحة وخالية من أي قلق بشأن خصوصيتكم.
      </p>
    </section>
  )
}

const terms = [
  {
    title: "1. تعريفات:",
    items: [
      "الموقع: موقع تأكيد السداد لتسديد القروض.",
      "المستخدم: أي شخص يستخدم الموقع.",
      "المقترض: الشخص الذي يسعى للحصول على تمويل من خلال الموقع.",
      "المستثمر: الشخص الذي يقدم تمويلًا من خلال الموقع.",
      "القرض: أي مبلغ من المال يتم تقديمه من قبل المستثمر إلى المقترض.",
    ],
  },
  {
    title: "2. استخدام الموقع:",
    items: [
      "يُمكن للمستخدمين تصفح الموقع مجانًا دون الحاجة إلى التسجيل.",
      "لإنشاء حساب على الموقع، يجب على المستخدمين تقديم معلومات صحيحة وصادقة.",
      "يُمكن للمقترضين نشر طلبات التمويل على الموقع، مع تحديد المبلغ المطلوب وشروط القرض.",
      "يُمكن للمستثمرين تصفح طلبات التمويل وتقديم عروض التمويل للمقترضين.",
      "يتحمل كل من المقترض والمستثمر مسؤولية مراجعة شروط وأحكام القرض بعناية قبل الموافقة عليه.",
    ],
  },
  {
    title: "3. الرسوم والعمولات:",
    items: [
      "لا يفرض الموقع أي رسوم على المستخدمين لإنشاء حساب أو تصفح الموقع.",
      "قد يتم فرض رسوم على بعض الخدمات الإضافية التي يقدمها الموقع.",
      "يتحمل المقترض مسؤولية دفع عمولة الموقع عند الحصول على تمويل من خلال الموقع.",
    ],
  },
  {
    title: "4. الخصوصية والأمان:",
    items: [
      "يحترم الموقع خصوصية جميع مستخدميه ويحافظ على سرية معلوماتهم الشخصية.",
      "يُمكن للمستخدمين مراجعة سياسة الخصوصية لفهم كيفية استخدام الموقع لمعلوماتهم الشخصية.",
      "يُتخذ الموقع جميع الإجراءات اللازمة لحماية أمن معلومات المستخدمين.",
    ],
  },
  {
    title: "5. المسؤولية:",
    items: [
      "لا يتحمل الموقع أي مسؤولية عن أي ضرر أو خسارة قد تنشأ عن استخدام الموقع.",
      "يتحمل كل من المقترض والمستثمر مسؤولية مخاطر التعاملات المالية التي تتم من خلال الموقع.",
      "يُنصح جميع المستخدمين بقراءة الشروط والأحكام بعناية قبل استخدام الموقع.",
    ],
  },
  {
    title: "6. التعديلات:",
    items: [
      "يُمكن للموقع تعديل هذه الشروط والأحكام في أي وقت دون إشعار مسبق.",
      "يُنصح جميع المستخدمين بمراجعة هذه الشروط والأحكام بشكل دوري.",
    ],
  },
  {
    title: "7. حل النزاعات:",
    items: [
      "يتم حل أي نزاع قد ينشأ بين المستخدمين والموقع من خلال التحكيم.",
      "يخضع جميع المستخدمين لقوانين دولة مصر العربية.",
    ],
  },
  {
    title: "8. الاتصال بنا:",
    items: ["يُمكن للمستخدمين الاتصال بنا من خلال الموقع أو البريد الإلكتروني."],
  },
  {
    title: "9. شروط إضافية:",
    items: ["قد تُطبق شروط إضافية على بعض الخدمات أو الميزات التي يقدمها الموقع."],
  },
]

export function TermsPage() {
  return (
    <section className="article terms">
      <h1>شروط وأحكام موقع تأكيد السداد لتسديد القروض</h1>
      <h2>مقدمة:</h2>
      <p>
        مرحبًا بك في موقع تأكيد السداد لتسديد القروض! يُقدم هذا الموقع منصة
        تواصلية تربط بين المقترضين والمستثمرين بهدف تسهيل عملية تسديد القروض.
        ونهدف إلى توفير بيئة آمنة وموثوقة لجميع مستخدمينا.
      </p>
      <h2>الشروط والأحكام:</h2>
      {terms.map((section) => (
        <div key={section.title}>
          <h3>{section.title}</h3>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <p className="terms-thanks">نشكرك على استخدام موقع تأكيد السداد لتسديد القروض!</p>
    </section>
  )
}

export function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = [
      `الاسم: ${data.get("name")}`,
      `الجوال: ${data.get("phone")}`,
      `البريد: ${data.get("email") || "-"}`,
      "",
      String(data.get("message")),
    ].join("\n")
    const subject = String(data.get("subject") || "استفسار من الموقع")
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="contact-page">
      <div className="contact-intro">
        <h1>لديك إستفسار؟ تواصل معنا الآن</h1>
        <p>
          يسعدنا تلقي رسائلكم في حالة وجود أي إستفسارات أو شكاوي، قم بملء
          الإستمارة التالية وسيقوم أحد المختصين بالرد بأقرب وقت.
        </p>
      </div>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="contact-form-row">
            <input name="name" placeholder="الاسم" required />
            <input name="phone" placeholder="رقم الجوال" required inputMode="tel" />
          </div>
          <div className="contact-form-row">
            <input name="email" type="email" placeholder="البريد الإلكتروني" />
            <input name="subject" placeholder="الموضوع" />
          </div>
          <textarea name="message" placeholder="رسالتك" required rows={6} />
          <button className="btn" type="submit">
            إرسال الآن
          </button>
          {sent && <p className="notice">تم فتح تطبيق البريد لإرسال رسالتك.</p>}
        </form>

        <aside className="contact-info">
          <div>
            <h2>العنوان:</h2>
            <p>المملكة العربية السعودية</p>
          </div>
          <div>
            <h2>الهاتف:</h2>
            {phones.map((item) => (
              <p key={item.tel}>
                <a href={`tel:${item.tel}`}>
                  <bdi dir="ltr">{item.tel}</bdi>
                </a>
              </p>
            ))}
          </div>
          <div>
            <h2>واتساب:</h2>
            {phones.map((item) => (
              <p key={item.tel}>
                <a href={`https://wa.me/${item.whatsapp}`} target="_blank" rel="noreferrer">
                  <bdi dir="ltr">{item.tel}</bdi>
                </a>
              </p>
            ))}
          </div>
          <div>
            <h2>الإيميل:</h2>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
