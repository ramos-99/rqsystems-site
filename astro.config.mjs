import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://rqsystems.pt',
  integrations: [sitemap({
    i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt-PT' } },
    // The one-screen variants (src/drafts.ts) stay out until one is chosen.
    filter: (page) => !/\/(type|chip|sort)\/$/.test(page),
  })],
  // Inline the page CSS into the HTML so it isn't a render-blocking request.
  build: { inlineStylesheets: 'always' }
})
