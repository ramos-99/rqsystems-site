// The page's metadata, per locale: what the layout puts in <head>. Each
// design keeps its own on-page copy.

export type Lang = 'en' | 'pt'

const en = {
  htmlLang: 'en',
  ogLocale: 'en_GB',
  title: 'RQ Systems',
  ogTitle: 'RQ Systems',
  description:
    'Custom automation built into the software your business already runs, whatever the stack. Made and maintained by two IST students in Lisbon.',
  // What the business is, for search engines (JSON-LD in the layout).
  about: 'Custom automation built into whatever software a small business already runs. Built and maintained by its two founders, Computer Science and Engineering students at Instituto Superior Técnico.',
}

const pt: typeof en = {
  htmlLang: 'pt-PT',
  ogLocale: 'pt_PT',
  title: 'RQ Systems',
  ogTitle: 'RQ Systems',
  description:
    'Automação à medida, integrada no software que a sua empresa já utiliza, seja ele qual for. Feita e mantida por dois estudantes do Técnico, em Lisboa.',
  about: 'Automação à medida, integrada no software que uma PME já utiliza, seja ele qual for. Feita e mantida pelos dois fundadores, estudantes de Engenharia Informática e de Computadores no Instituto Superior Técnico.',
}

export const copy: Record<Lang, typeof en> = { en, pt }
