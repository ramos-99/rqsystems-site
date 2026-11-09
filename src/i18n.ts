// The page's metadata, per locale: what the layout puts in <head>. Each
// design keeps its own on-page copy.

export type Lang = 'en' | 'pt'

const en = {
  htmlLang: 'en',
  ogLocale: 'en_GB',
  title: 'Business process automation for SMEs | RQ Systems',
  ogTitle: 'Business process automation for SMEs | RQ Systems',
  description:
    'Custom process automation for SMEs, built into the software a business already uses. Artificial intelligence to read invoices and documents. Lisbon.',
  // What the business is, for search engines (JSON-LD in the layout).
  knowsAbout: ['Business process automation', 'Software integration', 'Document processing'],
  jobTitle: 'Co-founder',
  about: 'Custom automation inside the software a small or medium business already uses, with artificial intelligence to read documents where it is useful. Built and maintained by its two founders, Master’s students in Computer Science and Engineering at Instituto Superior Técnico.',
}

const pt: typeof en = {
  htmlLang: 'pt-PT',
  ogLocale: 'pt_PT',
  title: 'Automação de processos para PME | RQ Systems',
  ogTitle: 'Automação de processos para PME | RQ Systems',
  description:
    'Automação de processos à medida para PME, integrada no software que a empresa já utiliza. Inteligência artificial para ler faturas e documentos. Lisboa.',
  knowsAbout: ['Automação de processos', 'Integração de software', 'Processamento de documentos'],
  jobTitle: 'Cofundador',
  about: 'Automação à medida, dentro do software que uma PME já usa, com inteligência artificial para leitura de documentos quando se justifica. Desenvolvida e mantida pelos dois fundadores, mestrandos em Engenharia Informática e de Computadores no Instituto Superior Técnico.',
}

export const copy: Record<Lang, typeof en> = { en, pt }
