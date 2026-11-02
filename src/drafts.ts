import type { Lang } from './i18n'

// The one-screen variants, side by side until one is chosen.
export const drafts = [
  { id: 'type', name: 'Type' },
  { id: 'chip', name: 'Chip' },
  { id: 'sort', name: 'Sort' },
] as const
export type Draft = (typeof drafts)[number]['id']
export const draftPaths = (id: Draft): Record<Lang, string> => ({ en: `/${id}/`, pt: `/pt/${id}/` })

export const email = 'contact@rqsystems.pt'

// The copy every variant shares, so only the idea changes between them.
export const shared = {
  en: {
    title: 'We automate repetitive office work.',
    lead: 'Custom software that runs inside the tools your team already uses, built by two engineering students at Instituto Superior Técnico in Lisbon.',
    location: 'Lisbon, Portugal',
    language: 'Language',
    home: 'RQ Systems home',
    variants: 'Variants',
  },
  pt: {
    title: 'Automatizamos o trabalho administrativo.',
    lead: 'Software à medida, dentro das ferramentas que a sua equipa já utiliza, feito por dois estudantes de engenharia do Instituto Superior Técnico, em Lisboa.',
    location: 'Lisboa, Portugal',
    language: 'Idioma',
    home: 'Página inicial da RQ Systems',
    variants: 'Variantes',
  },
}
