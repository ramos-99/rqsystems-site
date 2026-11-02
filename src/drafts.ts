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
    title: 'We automate repetitive office work.',
    lead: 'We build automation into the software your business already runs, whatever it is. First we find the work your team still does by hand, then we write the code that does it.',
    // "We are <Martim> and <Afonso>" + role: the names are the LinkedIn links.
    we: ['We are ', ' and ', ', Computer Science and Engineering students at Instituto Superior Técnico. You talk directly to us, and we maintain your software after it goes live.'],
    write: 'Write to us',
    copyLabel: 'Copy address',
    copied: 'Address copied.',
    next: 'Our latest work',
    location: 'Lisbon, Portugal',
    language: 'Language',
    home: 'RQ Systems home',
  },
  pt: {
    title: 'Automatizamos o trabalho administrativo.',
    lead: 'Integramos automação no software que a sua empresa já utiliza, seja ele qual for. Primeiro descobrimos o trabalho que a sua equipa ainda faz à mão, depois escrevemos o código que o faz.',
    we: ['Somos o ', ' e o ', ', estudantes de Engenharia Informática e de Computadores no Instituto Superior Técnico. Fala diretamente connosco, e mantemos o seu software depois de o entregarmos.'],
    write: 'Escreva-nos',
    copyLabel: 'Copiar endereço',
    copied: 'Endereço copiado.',
    next: 'O nosso último trabalho',
    location: 'Lisboa, Portugal',
    language: 'Idioma',
    home: 'Página inicial da RQ Systems',
  },
}
