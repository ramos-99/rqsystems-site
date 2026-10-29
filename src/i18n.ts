// All page copy, per locale. English is the source of truth; Portuguese (pt-PT)
// is a faithful translation of it. [[double brackets]] mark the phrase a
// step lights in lime; they are presentation only, never shown.

export type Lang = 'en' | 'pt'

export const paths: Record<Lang, string> = { en: '/', pt: '/pt/' }

const en = {
  htmlLang: 'en',
  ogLocale: 'en',
  title: 'RQ Systems',
  ogTitle: 'RQ Systems: custom automation for SMEs',
  description:
    'Custom automation software for SMEs in Portugal, by two engineers from Técnico. We map your processes, then integrate the tools you already use.',
  twitterDescription: 'RQ Systems builds custom automation for businesses.',
  nav: { contact: 'Contact us', language: 'Language', home: 'RQ Systems home' },
  hero: {
    title: ['We automate', 'the manual work.'],
    leadBefore: "We're ",
    leadLink: 'two engineers',
    leadAfter:
      ' from Técnico. We look for the work your team still does by hand, then write the software that takes it over.',
    contact: 'Contact us',
    build: 'How we work',
    work: 'Featured work',
    note: 'We work with whatever software you already use.',
  },
  build: {
    title: "How we automate your company's processes",
    lead: "You don't need to know what to automate. Working that out is our first job.",
    steps: [
      {
        line: 'We follow the work, [[click by click]].',
        body: 'We note each email your team files, each attachment they save and each number they copy from one tool to another, then show you which of those steps software can do.',
        tags: ['process mapping', 'requirements analysis', 'bottleneck analysis'],
      },
      {
        line: 'Then we [[engineer]] the manual steps out.',
        body: 'We write the automations, data pipelines and integrations ourselves, inside the tools you already use, so nobody has to move to a new platform.',
        tags: ['API integrations', 'Outlook add-ins', 'data pipelines', 'PDF generation'],
      },
      {
        line: 'You keep the engineers [[who built it]].',
        body: 'There are no account managers. When your process changes, you tell us and we update the code.',
        tags: ['maintenance', 'iteration', 'no hand-off'],
      },
    ],
  },
  work: {
    title: 'Featured work',
    caseTitle: ['Outlook to Dropbox', 'Automation'],
    body: [
      'Our client sorted project emails, invoices and contracts into a deep folder structure by hand.',
      'We built them an Outlook add-in. One click files the .eml, a generated PDF and every attachment in the right Dropbox folder, straight from the inbox.',
    ],
    stats: [
      { value: '3', label: 'Files / email' },
      { value: '1', label: 'Click to archive' },
    ],
  },
  founders: {
    title: 'Founders',
    body: 'Martim Ramos and Afonso Quintas study Computer Science and Engineering at Instituto Superior Técnico in Lisbon. We are the two people who write and maintain your software.',
  },
  contact: {
    cta: "Tell us which task takes up your team's week, and we'll tell you whether software can do it.",
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
  ogTitle: 'RQ Systems: automação à medida para PME',
  description:
    'Automação de processos e software à medida para PME, por dois engenheiros do Técnico. Mapeamos o trabalho manual e integramos as ferramentas que já utiliza.',
  twitterDescription: 'A RQ Systems desenvolve automação à medida para empresas.',
  nav: { contact: 'Fale connosco', language: 'Idioma', home: 'Página inicial da RQ Systems' },
  hero: {
    title: ['Automatizamos', 'o trabalho manual.'],
    leadBefore: 'Somos ',
    leadLink: 'dois engenheiros',
    leadAfter:
      ' do Técnico. Procuramos o trabalho que a sua equipa ainda faz à mão e escrevemos o software que passa a fazê-lo.',
    contact: 'Fale connosco',
    build: 'Como trabalhamos',
    work: 'Trabalho em destaque',
    note: 'Trabalhamos com o software que já utiliza.',
  },
  build: {
    title: 'Como automatizamos os processos da sua empresa',
    lead: 'Não precisa de saber o que automatizar. Descobrir isso é o nosso primeiro trabalho.',
    steps: [
      {
        line: 'Seguimos o trabalho, [[clique a clique]].',
        body: 'Registamos cada e-mail que a sua equipa arquiva, cada anexo que guarda e cada número que copia de uma ferramenta para outra. Depois mostramos-lhe quais desses passos o software pode fazer.',
        tags: ['mapeamento de processos', 'levantamento de requisitos', 'pontos de estrangulamento'],
      },
      {
        line: 'Depois, eliminamos os passos manuais com [[código à medida]].',
        body: 'Escrevemos nós as automações, os pipelines de dados e as integrações, dentro das ferramentas que já utiliza. Ninguém tem de mudar de plataforma.',
        tags: ['integrações por API', 'suplementos para Outlook', 'pipelines de dados', 'geração de PDF'],
      },
      {
        line: 'Os engenheiros que o construíram [[continuam consigo]].',
        body: 'Não há gestores de conta. Quando o seu processo muda, diz-nos e nós atualizamos o código.',
        tags: ['manutenção', 'iteração', 'sem intermediários'],
      },
    ],
  },
  work: {
    title: 'Trabalho em destaque',
    caseTitle: ['Automação de Outlook', 'para Dropbox'],
    body: [
      'O nosso cliente arrumava à mão e-mails de projeto, faturas e contratos numa estrutura de pastas com muitos níveis.',
      'Desenvolvemos-lhe um suplemento para o Outlook. Com um clique, o .eml, um PDF gerado e todos os anexos ficam na pasta certa do Dropbox, a partir da própria caixa de entrada.',
    ],
    stats: [
      { value: '3', label: 'Ficheiros / e-mail' },
      { value: '1', label: 'Clique para arquivar' },
    ],
  },
  founders: {
    title: 'Fundadores',
    body: 'Martim Ramos e Afonso Quintas estudam Engenharia Informática e de Computadores no Instituto Superior Técnico, em Lisboa. Somos nós os dois que escrevemos e mantemos o seu software.',
  },
  contact: {
    cta: 'Diga-nos que tarefa ocupa a semana da sua equipa e nós dizemos-lhe se o software a pode fazer.',
    location: 'Lisboa, Portugal',
    nav: { build: 'Como trabalhamos', work: 'Trabalho em destaque' },
    footer: 'Rodapé',
    copy: 'Copiar',
    copied: 'Copiado',
  },
}

export const copy: Record<Lang, typeof en> = { en, pt }
