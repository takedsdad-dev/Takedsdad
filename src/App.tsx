import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ArticlePage from "./pages/ArticlePage"
import CityPage from "./pages/CityPage"
import Home from "./pages/Home"
import {
  AboutPage,
  ContactPage,
  PrivacyPage,
  ServicesPage,
  TermsPage,
} from "./pages/SimplePages"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="city/:slug" element={<CityPage />} />
          <Route path="article/:slug" element={<ArticlePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
