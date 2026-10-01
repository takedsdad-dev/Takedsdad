import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ArticlePage from "./pages/ArticlePage"
import CityPage from "./pages/CityPage"
import Home from "./pages/Home"
import NotFoundPage from "./pages/NotFound"
import {
  AboutPage,
  ContactPage,
  PrivacyPage,
  ServicesPage,
  TermsPage,
} from "./pages/SimplePages"

export function AppRoutes() {
  return (
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
