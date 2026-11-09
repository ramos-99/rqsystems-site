import type { Lang } from './i18n'

// The one design: Type, in the light theme.
export const drafts = [
  { id: 'type', name: 'Type', paths: { en: '/en/', pt: '/' }, index: true, theme: 'light' },
] as const
export type Draft = (typeof drafts)[number]['id']
export const design = (id: Draft) => drafts.find((d) => d.id === id)!

export const email = 'contact@rqsystems.pt'

export const founders = [
  { name: 'Martim Ramos', first: 'Martim', href: 'https://www.linkedin.com/in/martim-c-ramos/', photo: '/founders/martim-ramos.webp' },
  { name: 'Afonso Quintas', first: 'Afonso', href: 'https://www.linkedin.com/in/afonsoquintas/', photo: '/founders/afonso-quintas.webp' },
]

// The copy both designs share. The promise is the stack: we build
// automation into whatever software a business already runs.
export const shared = {
  en: {
    title: 'We automate repetitive business processes.',
    lead: 'Custom automation, built into the software a business already uses. Where it is useful, artificial intelligence reads invoices, emails and other documents.',
    crew: 'Master’s students in Computer Science and Engineering at Instituto Superior Técnico. We handle every project ourselves, from first contact to ongoing support.',
    write: 'Contact',
    copyLabel: 'Copy address',
    copied: 'Address copied.',
    next: 'What we do',
    location: 'Lisbon, Portugal',
    language: 'Language',
    home: 'RQ Systems home',
  },
  pt: {
    title: 'Automatizamos os processos repetitivos das empresas.',
    lead: 'Automação à medida, integrada no software que a empresa já utiliza. Quando se justifica, a inteligência artificial lê faturas, e‑mails e outros documentos.',
    crew: 'Mestrandos em Engenharia Informática e de Computadores no Instituto Superior Técnico. Acompanhamos cada projeto diretamente, do primeiro contacto ao suporte.',
    write: 'Contacto',
    copyLabel: 'Copiar endereço',
    copied: 'Endereço copiado.',
    next: 'O que fazemos',
    location: 'Lisboa, Portugal',
    language: 'Idioma',
    home: 'Página inicial da RQ Systems',
  },
}
