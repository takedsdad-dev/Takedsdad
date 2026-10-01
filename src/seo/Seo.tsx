import { useEffect } from "react"
import { applyHead } from "./head.ts"
import type { SeoState } from "./meta.ts"

export default function Seo(props: SeoState) {
  const signature = JSON.stringify([
    props.title,
    props.description,
    props.path,
    props.robots,
    props.ogType,
    props.lastmod ?? "",
    props.jsonLd ?? null,
  ])

  useEffect(() => {
    applyHead(props)
  }, [signature])

  return null
}
