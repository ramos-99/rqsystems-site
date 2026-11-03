import type { Lang } from './i18n'

// The one design: Type, in the light theme.
export const drafts = [
  { id: 'type', name: 'Type', paths: { en: '/', pt: '/pt/' }, index: true, theme: 'light' },
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
    title: 'We automate the repetitive work in your business.',
    lead: 'We connect to the software you already use, whatever it is, and automate what is still done by hand, with AI where it makes a difference.',
    role: 'Master’s student in Computer Science and Engineering',
    crew: 'Both at Instituto Superior Técnico. You talk directly to us, from the first email to support after launch.',
    write: 'Write to us',
    copyLabel: 'Copy address',
    copied: 'Address copied.',
    next: 'What we do',
    location: 'Lisbon, Portugal',
    language: 'Language',
    home: 'RQ Systems home',
  },
  pt: {
    title: 'Automatizamos o trabalho repetitivo da sua empresa.',
    lead: 'Ligamo-nos ao software que já usa, seja ele qual for, e automatizamos o que hoje é feito à mão, com IA onde faz diferença.',
    role: 'Mestrando em Engenharia Informática e de Computadores',
    crew: 'Ambos no Instituto Superior Técnico. Fala diretamente connosco, do primeiro e-mail à manutenção.',
    write: 'Escreva-nos',
    copyLabel: 'Copiar endereço',
    copied: 'Endereço copiado.',
    next: 'O que fazemos',
    location: 'Lisboa, Portugal',
    language: 'Idioma',
    home: 'Página inicial da RQ Systems',
  },
}
