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

    </div>
  )
}
