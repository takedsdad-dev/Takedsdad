import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Root element #root was not found")

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

const hasServerMarkup = Array.from(rootElement.childNodes).some((node) => {
  if (node.nodeType === Node.ELEMENT_NODE) return true
  return node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim())
})

if (hasServerMarkup) hydrateRoot(rootElement, app)
else createRoot(rootElement).render(app)
