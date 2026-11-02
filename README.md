# rqsystems-site

Marketing site for [RQ Systems](https://rqsystems.pt). A single-page landing in English (`/`) and European Portuguese (`/pt/`) in midnight, electric cobalt and acid lime. A fixed colour field blends from midnight through cobalt into day as you scroll.

## Stack

- [Astro 7](https://astro.build) - static pages, no UI framework, no client libraries
- Plain CSS in `src/styles/global.css`; the design system is documented in `DESIGN.md`
- TypeScript throughout

Font: Familjen Grotesk. Hero photo: Brian Kostiuk on Unsplash, graded cobalt and lime.

## Dev

Node >= 22.12.0 required.

```sh
npm install
npm run dev       # localhost:4321
npm run build     # output to ./dist
npm run preview   # serve ./dist locally
```

## Structure

```
src/
  i18n.ts                 # all copy, en + pt-PT
  pages/index.astro       # English
  pages/pt/index.astro    # Portuguese
  components/Page.astro   # the page, rendered per locale
  layouts/Layout.astro    # html shell, meta, hreflang, fonts
  scripts/cues.ts         # scroll -> colour field, ink flip, section ticks, copy button
  styles/global.css
public/                   # static assets (hero/ photo, founders/ portraits)
assets/                   # original photos
```
