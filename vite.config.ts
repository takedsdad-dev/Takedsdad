import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  publicDir: isSsrBuild ? false : "public",
  build: {
    rollupOptions: isSsrBuild
      ? undefined
      : {
          output: {
            // Keep the React/Router runtime in its own long-lived chunk so content
            // deploys do not invalidate it in browser and CDN caches.
            manualChunks(id) {
              if (!id.includes("node_modules")) return undefined
              if (/node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return "react"
              if (/node_modules[\\/]react-router/.test(id)) return "router"
              return undefined
            },
          },
        },
  },
}))
