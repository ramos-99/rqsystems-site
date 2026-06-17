import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://rqsystems.pt',
  integrations: [react(), sitemap()],
  // Inline the page CSS into the HTML so it isn't a render-blocking request.
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()]
  }
})
