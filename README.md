# rqsystems-site

Marketing site for [RQ Systems](https://rqsystems.pt). Single-page landing with a hero, how-we-work section, a featured case study, and a contact/founders footer.

## Stack

- [Astro 6](https://astro.build) - page shell and static build
- [React 19](https://react.dev) - interactive sections (client:only / client:visible)
- [Tailwind CSS 4](https://tailwindcss.com) - utility styles via Vite plugin
- [Three.js](https://threejs.org) via `@react-three/fiber` and `@react-three/drei` - 3D displacement sphere in the hero
- TypeScript throughout

Fonts: Gloock (serif headings), Inter, Outfit, Geist Sans/Mono.

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
  pages/index.astro       # page entry, static sections
  layouts/Layout.astro    # html shell, global fonts
  components/
    DisplacementSphere.tsx  # Three.js hero object
    HowWeWork.tsx
    CaseStudy.tsx
    Footer.tsx
  styles/global.css
public/                   # static assets
```
