// Lucide (ISC) and Simple Icons (CC0) glyphs from src/icons, inlined.
const icons = import.meta.glob('./icons/**/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export const glyph = (name: string) =>
  icons[`./icons/${name}.svg`]
    .replace(/^[\s\S]*?(?=<svg)/, '')
    .replace(/<title>.*?<\/title>/, '')
    .replace(/\s(class|role)="[^"]*"/g, '')
    .replace('<svg', '<svg aria-hidden="true"')
