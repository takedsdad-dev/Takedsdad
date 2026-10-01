import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router"
import { AppRoutes } from "./App.tsx"
import { renderHead } from "./seo/head.ts"
import { indexableSeo, notFoundSeo } from "./seo/meta.ts"

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
}

export { indexableSeo, notFoundSeo, renderHead }
