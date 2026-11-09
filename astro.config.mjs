import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://rqsystems.pt',
  integrations: [sitemap({
    i18n: { defaultLocale: 'pt', locales: { pt: 'pt-PT', en: 'en' } },
  })],
  // Inline the page CSS into the HTML so it isn't a render-blocking request.
  build: { inlineStylesheets: 'always' }
})
