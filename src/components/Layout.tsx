import { useState } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { picks } from "../articles"
import { cities, site } from "../site"

const menu = [
  ["abha", "تسديد قروض ابها"],
  ["dammam", "تسديد قروض الدمام"],
  ["riyadh", "تسديد قروض الرياض"],
  ["taif", "تسديد قروض الطائف"],
  ["arar", "تسديد قروض عرعر"],
  ["jeddah", "تسديد قروض جده"],
  ["khamis", "تسديد قروض خميس مشيط"],
  ["makkah", "تسديد قروض مكة"],
  ["jazan", "سداد قروض جازان"],
] as const

export default function Layout() {
  const [open, setOpen] = useState(false)
  function closeMenus() {
    setOpen(false)
  }

  return (
    <div className="page">
      <header className={`topbar${open ? " is-open" : ""}`}>
        <Link className="brand" to="/" onClick={closeMenus}>
          <span className="brand-mark" aria-hidden="true">
            ✓
          </span>
          <span>
            <strong>تأكيد السداد</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>

        <nav className="nav" aria-label="القائمة الرئيسية">
          <div className="nav-row">
            <NavLink to="/" end onClick={closeMenus}>
              الرئيسية
            </NavLink>
            {menu.slice(0, 6).map(([slug, label]) => (
              <NavLink key={slug} to={`/city/${slug}`} onClick={closeMenus}>
                {label}
              </NavLink>
            ))}
          </div>
          <div className="nav-row">
            {menu.slice(6).map(([slug, label]) => (
              <NavLink key={slug} to={`/city/${slug}`} onClick={closeMenus}>
                {label}
              </NavLink>
            ))}
          </div>
        </nav>

        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-label="القائمة"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <section>
            <h2>{site.name}</h2>
            <p>
              نرتب سداد القروض والمتعثرات للموظفين العسكريين والمدنيين في مدن
              المملكة، مع شرح واضح للخطوات قبل البدء.
            </p>
          </section>
          <section>
            <h2>خدماتنا</h2>
            <ul>
              {cities.slice(0, 6).map((city) => (
                <li key={city.slug}>
                  <Link to={`/city/${city.slug}`}>{city.title}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>مختارات</h2>
            <ul>
              {picks.map((item) => (
                <li key={item.slug}>
                  <Link to={`/article/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>روابط سريعة</h2>
            <ul>
              <li>
                <Link to="/about">من نحن</Link>
              </li>
              <li>
                <Link to="/privacy">سياسة الخصوصية</Link>
              </li>
              <li>
                <Link to="/terms">الشروط والأحكام</Link>
              </li>
              <li>
                <Link to="/contact">اتصل بنا</Link>
              </li>
            </ul>
          </section>
        </div>
        <p className="copy">
          © {new Date().getFullYear()} {site.name}. جميع الحقوق محفوظة.
        </p>
      </footer>

      <div className="float-actions">
        <a className="float phone" href={`tel:${site.phone}`} aria-label="اتصل بنا">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
        <a
          className="float whatsapp"
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="تواصل معنا عبر واتساب"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.28 11.28 0 0 0 12.04.72C5.78.72.68 5.81.68 12.07c0 2 .52 3.95 1.52 5.67L.58 23.28l5.68-1.49a11.33 11.33 0 0 0 5.78 1.47h.01c6.26 0 11.36-5.09 11.36-11.35 0-3.03-1.18-5.89-3.34-8.03z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
