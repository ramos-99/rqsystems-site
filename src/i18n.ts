// All page copy, per locale. English is the source of truth; Portuguese (pt-PT)
// is a faithful translation of it. [[double brackets]] mark the phrase a
// step lights in lime; they are presentation only, never shown.

export type Lang = 'en' | 'pt'

export const paths: Record<Lang, string> = { en: '/', pt: '/pt/' }

const en = {
  htmlLang: 'en',
  ogLocale: 'en',
  title: 'RQ Systems',
  ogTitle: 'RQ Systems — Your operations, automated.',
  description:
    'Custom automation software for SMEs in Portugal, by two engineers from Técnico. We map your processes, then integrate the tools you already use.',
  twitterDescription: 'RQ Systems builds custom automation for businesses.',
  nav: { contact: 'Contact us', language: 'Language', home: 'RQ Systems home' },
  hero: {
    title: ['Your operations,', 'automated.'],
    leadBefore: 'Built by ',
    leadLink: 'two engineers',
    leadAfter:
      " from Técnico. We find what's still manual in your operations and build tailored software to automate it.",
    contact: 'Contact us',
    build: 'How we work',
    work: 'Featured work',
    note: 'We work with whatever software you already use.',
  },
  build: {
    title: 'How we automate your operations',
    lead: "You don't need to know what to automate. Finding it is step one.",
    steps: [
      {
        line: 'We follow the work, [[click by click]].',
        body: 'Every email filed, every attachment saved, every number retyped between tools. We map it all and show which steps software can take over.',
        tags: ['process mapping', 'requirements analysis', 'bottleneck analysis'],
      },
      {
        line: 'Then we [[engineer]] the manual steps out.',
        body: 'Automations, pipelines and integrations coded for your workflow and built into the tools you already use. No migration, no new platform.',
        tags: ['API integrations', 'Outlook add-ins', 'data pipelines', 'PDF generation'],
      },
      {
        line: 'You keep the engineers [[who built it]].',
        body: 'No account managers in between. When your process changes, you talk to us directly and we update the code.',
        tags: ['maintenance', 'iteration', 'no hand-off'],
      },
    ],
  },
  work: {
    title: 'Featured work',
    caseTitle: ['Outlook to Dropbox', 'Automation'],
    body: [
      'Our client was manually organising project emails, invoices, and contracts into complex folder structures.',
      'We built a custom Outlook add-in that bundles the .eml, a generated PDF, and all attachments, archiving the full set to the correct Dropbox folder in one click, without ever leaving the inbox.',
    ],
    stats: [
      { value: '3', label: 'Files / email' },
      { value: '1', label: 'Click to archive' },
    ],
  },
  founders: {
    title: 'Founders',
    body: 'Martim Ramos and Afonso Quintas — Computer Science and Engineering students from Instituto Superior Técnico, Lisbon. We build software that replaces the manual work costing your team hours every week.',
  },
  contact: {
    cta: "If your team is spending hours on work that software could handle, let's talk.",
    location: 'Lisbon, Portugal',
    nav: { build: 'How we work', work: 'Featured work' },
    footer: 'Footer',
    copy: 'Copy',
    copied: 'Copied',
  },
}

const pt: typeof en = {
  htmlLang: 'pt-PT',
  ogLocale: 'pt_PT',
  title: 'RQ Systems',
  ogTitle: 'RQ Systems — As suas operações, automatizadas.',
  description:
    'Automação de processos e software à medida para PME, por dois engenheiros do Técnico. Mapeamos o trabalho manual e integramos as ferramentas que já utiliza.',
  twitterDescription: 'A RQ Systems desenvolve automação à medida para empresas.',
  nav: { contact: 'Fale connosco', language: 'Idioma', home: 'Página inicial da RQ Systems' },
  hero: {
    title: ['As suas operações,', 'automatizadas.'],
    leadBefore: 'Feito por ',
    leadLink: 'dois engenheiros',
    leadAfter:
      ' do Técnico. Encontramos o que ainda é manual nas suas operações e desenvolvemos software à medida para o automatizar.',
    contact: 'Fale connosco',
    build: 'Como trabalhamos',
    work: 'Trabalho em destaque',
    note: 'Trabalhamos com o software que já utiliza.',
  },
  build: {
    title: 'Como automatizamos as suas operações',
    lead: 'Não precisa de saber o que automatizar. Descobri-lo é o primeiro passo.',
    steps: [
      {
        line: 'Seguimos o trabalho, [[clique a clique]].',
        body: 'Cada email arquivado, cada anexo guardado, cada número copiado de uma ferramenta para outra. Mapeamos tudo e mostramos que passos o software pode assumir.',
        tags: ['mapeamento de processos', 'levantamento de requisitos', 'análise de estrangulamentos'],
      },
      {
        line: 'Depois, eliminamos os passos manuais com [[código à medida]].',
        body: 'Automações, pipelines e integrações programadas para o seu fluxo de trabalho, dentro das ferramentas que já utiliza. Sem migrações, sem plataformas novas.',
        tags: ['integrações por API', 'suplementos para Outlook', 'pipelines de dados', 'geração de PDF'],
      },
      {
        line: 'Os engenheiros que o construíram [[continuam consigo]].',
        body: 'Sem gestores de conta pelo meio. Quando o seu processo muda, fala diretamente connosco e nós atualizamos o código.',
        tags: ['manutenção', 'iteração', 'sem intermediários'],
      },
    ],
  },
  work: {
    title: 'Trabalho em destaque',
    caseTitle: ['Automação de Outlook', 'para Dropbox'],
    body: [
      'O nosso cliente organizava manualmente emails de projeto, faturas e contratos em estruturas de pastas complexas.',
      'Desenvolvemos um suplemento personalizado para o Outlook que agrupa o .eml, um PDF gerado e todos os anexos, arquivando o conjunto completo na pasta certa do Dropbox com um clique, sem nunca sair da caixa de entrada.',
    ],
    stats: [
      { value: '3', label: 'Ficheiros / email' },
      { value: '1', label: 'Clique para arquivar' },
    ],
  },
  founders: {
    title: 'Fundadores',
    body: 'Martim Ramos e Afonso Quintas — estudantes de Engenharia Informática e de Computadores no Instituto Superior Técnico, em Lisboa. Desenvolvemos software que substitui o trabalho manual que custa horas à sua equipa todas as semanas.',
  },
  contact: {
    cta: 'Se a sua equipa passa horas em trabalho que o software podia fazer, vamos conversar.',
    location: 'Lisboa, Portugal',
    nav: { build: 'Como trabalhamos', work: 'Trabalho em destaque' },
    footer: 'Rodapé',
    copy: 'Copiar',
    copied: 'Copiado',
  },
}

export const copy: Record<Lang, typeof en> = { en, pt }
