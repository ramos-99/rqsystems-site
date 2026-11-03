// The page's metadata, per locale: what the layout puts in <head>. Each
// design keeps its own on-page copy.

export type Lang = 'en' | 'pt'

const en = {
  htmlLang: 'en',
  ogLocale: 'en_GB',
  title: 'RQ Systems',
  ogTitle: 'RQ Systems',
  description:
    'Automation built into whatever software your business already runs, with AI where it makes a difference. Designed and built by two Master’s students at Instituto Superior Técnico, Lisbon.',
  // What the business is, for search engines (JSON-LD in the layout).
  about: 'Custom automation built into whatever software a small or medium business already runs, with AI where it makes a difference. Designed, built and maintained by its two founders, Master’s students in Computer Science and Engineering at Instituto Superior Técnico.',
}

const pt: typeof en = {
  htmlLang: 'pt-PT',
  ogLocale: 'pt_PT',
  title: 'RQ Systems',
  ogTitle: 'RQ Systems',
  description:
    'Automação integrada no software que a sua empresa já usa, seja ele qual for, com IA onde faz diferença. Feita por dois mestrandos do Instituto Superior Técnico, em Lisboa.',
  about: 'Automação à medida, integrada no software que uma PME já utiliza, seja ele qual for, com IA onde faz diferença. Desenhada, construída e mantida pelos dois fundadores, mestrandos em Engenharia Informática e de Computadores no Instituto Superior Técnico.',
}

export const copy: Record<Lang, typeof en> = { en, pt }
