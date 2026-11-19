export const person = {
  name: 'Unai Mengual',
  handle: 'owlnai',
  location: 'Spain',
  timeZone: 'Europe/Madrid',
  languages: ['ENG', 'ESP'],
  motto: ['Curious.', 'Careful.', 'Kind.'],
}

export interface NowItem {
  lead: string
  name: string
  href?: string
  tail: string
}

export const now: NowItem[] = [
  {
    lead: 'Tech lead at',
    name: 'MRM Spain',
    tail: ', building for some of the world’s most recognisable brands.',
  },
  {
    lead: 'Founder of',
    name: 'Songbird Labs',
    href: 'https://github.com/songbirdlabs',
    tail: ', where Roblox players create, innovate and manage.',
  },
  {
    lead: 'Running',
    name: 'section9 studio',
    href: 'https://section9.studio',
    tail: ', a small creative agency for handcrafted web design.',
  },
  {
    lead: 'Back in open source after some time away, starting with',
    name: 'rex-git',
    href: 'https://github.com/owlnai/rex-git',
    tail: '.',
  },
]

export type WorkKind = 'venture' | 'open-source'

export interface WorkItem {
  id: string
  name: string
  year: string
  kind: WorkKind
  description: string
  href: string
}

export const work: WorkItem[] = [
  {
    id: 'songbird',
    name: 'Songbird Labs',
    year: 'Now',
    kind: 'venture',
    description: 'A studio for Roblox players to create, innovate and manage.',
    href: 'https://github.com/songbirdlabs',
  },
  {
    id: 'section9',
    name: 'section9 studio',
    year: 'Now',
    kind: 'venture',
    description: 'Creative agency providing handcrafted solutions and web design.',
    href: 'https://section9.studio',
  },
  {
    id: 'rex-git',
    name: 'rex-git',
    year: '2026',
    kind: 'open-source',
    description: 'A Git side pane for Rex: diffs, staging, Claude-drafted commits and sync.',
    href: 'https://github.com/owlnai/rex-git',
  },
  {
    id: 'lofi',
    name: 'Lofi in Your Desktop',
    year: '2023',
    kind: 'open-source',
    description: 'Lofi Girl in a lightweight Tauri app, for ambient music while you code.',
    href: 'https://github.com/owlnai/lofi-in-your-desktop',
  },
  {
    id: 'sphynx',
    name: 'Sphynx',
    year: '2022',
    kind: 'open-source',
    description: 'A Discord bot that checks every message for phishing links, like fake Nitro.',
    href: 'https://github.com/owlnai/sphynx',
  },
  {
    id: 'nuxt-rule',
    name: 'The Nuxt Rule',
    year: '2022',
    kind: 'open-source',
    description: 'If it exists, there’s a Nuxt module of it. An experiment.',
    href: 'https://github.com/owlnai/the-nuxt-rule',
  },
  {
    id: 'isnuxt3ready',
    name: 'isnuxt3ready',
    year: '2021',
    kind: 'open-source',
    description:
      'A community-built compatibility guide for Nuxt 3 modules. Archived in 2024, once the official modules directory took over.',
    href: 'https://github.com/owlnai/isnuxt3ready',
  },
  {
    id: 'watxt',
    name: 'watxt',
    year: '2019',
    kind: 'open-source',
    description: 'A zero-dependency WhatsApp log parser.',
    href: 'https://github.com/owlnai/watxt',
  },
]

export interface Contribution {
  id: string
  name: string
  avatar: string
  summary: string
  detail: string
  href: string
}

export const contributions: Contribution[] = [
  {
    id: 'nuxt',
    name: 'nuxt/nuxt',
    avatar: 'https://github.com/nuxt.png?size=96',
    summary: 'The full-stack Vue framework',
    detail: 'Contributions to the framework I reach for first, and have built around since Nuxt 2.',
    href: 'https://github.com/nuxt/nuxt',
  },
  {
    id: 'slidev',
    name: 'slidevjs/docs-es',
    avatar: 'https://github.com/slidevjs.png?size=96',
    summary: 'Slidev docs, in Spanish',
    detail: 'The Spanish translation of the Slidev documentation, used in workshops with Spanish-speaking streamers.',
    href: 'https://github.com/slidevjs/docs-es',
  },
  {
    id: 'wikioasis',
    name: 'WikiOasis',
    avatar: 'https://github.com/WikiOasis.png?size=96',
    summary: 'A space for anybody to write about anything',
    detail: 'MediaWiki configuration and the landing page for a wiki farm. Wikis are where I started.',
    href: 'https://github.com/WikiOasis',
  },
  {
    id: 'afordin',
    name: 'Afordin',
    avatar: 'https://github.com/Afordin.png?size=96',
    summary: 'A Spanish-speaking programming community',
    detail: 'Open source projects built together with a Spanish-speaking developer community.',
    href: 'https://github.com/Afordin',
  },
  {
    id: 'taekwondo',
    name: 'Tekwondo-RAM/taekwondo-app',
    avatar: 'https://github.com/Tekwondo-RAM.png?size=96',
    summary: 'A taekwondo PWA',
    detail: 'Contributions to a progressive web app for taekwondo practitioners.',
    href: 'https://github.com/Tekwondo-RAM/taekwondo-app',
  },
]

export interface Social {
  id: string
  name: string
  handle: string
  href: string
}

export const socials: Social[] = [
  { id: 'github', name: 'GitHub', handle: 'owlnai', href: 'https://github.com/owlnai' },
  { id: 'bluesky', name: 'Bluesky', handle: '@owlnai.com', href: 'https://bsky.app/profile/owlnai.com' },
  { id: 'linkedin', name: 'LinkedIn', handle: 'in/owlnai', href: 'https://www.linkedin.com/in/owlnai/' },
  { id: 'twitch', name: 'Twitch', handle: 'owlnai', href: 'https://twitch.tv/owlnai' },
  { id: 'dev', name: 'DEV', handle: 'owlnai', href: 'https://dev.to/owlnai' },
  { id: 'x', name: 'X', handle: '@owln_ai', href: 'https://x.com/owln_ai' },
]

export interface Milestone {
  year: string
  dateTime?: string
  title: string
  description: string
}

export const milestones: Milestone[] = [
  {
    year: '2026',
    dateTime: '2026',
    title: 'Back to open source',
    description: 'A Git pane for Rex in Rust, a Homebrew tap, and a trip to MadVue to meet the community in person.',
  },
  {
    year: '2024',
    dateTime: '2024',
    title: 'People, not platforms',
    description: 'Left Twitter for Bluesky. Archived isnuxt3ready once Nuxt’s own modules directory covered it.',
  },
  {
    year: '2023',
    dateTime: '2023',
    title: 'Writing and workshops',
    description: 'Wrote about future-proof UnoCSS, and shipped Lofi in Your Desktop with Tauri.',
  },
  {
    year: '2022',
    dateTime: '2022',
    title: 'Bots and experiments',
    description: 'Sphynx, a Discord bot against phishing links, and The Nuxt Rule.',
  },
  {
    year: '2021',
    dateTime: '2021',
    title: 'isnuxt3ready',
    description: 'A compatibility guide for Nuxt 3 modules, built with the community while the ecosystem migrated.',
  },
  {
    year: '2016',
    dateTime: '2016',
    title: 'Joined GitHub',
    description: 'First commits in public.',
  },
  {
    year: 'Before',
    title: 'Wikis and Notepad',
    description: 'Editing wikis as a teenager, and building simple websites in HTML with Notepad.',
  },
]

export interface UsesGroup {
  category: string
  items: { name: string; description: string }[]
}

export const uses: UsesGroup[] = [
  {
    category: 'Development',
    items: [
      { name: 'VS Code', description: 'Primary code editor, but slowly moving to Zed.' },
      { name: 'Ghostty', description: 'AMAZING terminal! And without AI shoved-in.' },
      { name: 'GitHub', description: 'Version control and collaboration.' },
      { name: 'Hetzner + Coolify', description: 'Taught me a lot about hosting, and it’s cooler right?' },
      { name: 'Figma', description: 'Design, prototyping, and some graphic work.' },
      { name: 'Eagle', description: 'Image and asset management tool.' },
    ],
  },
  {
    category: 'Productivity',
    items: [
      { name: 'Obsidian', description: 'Knowledge management and note-taking. A second brain.' },
      { name: 'Journal App', description: 'It already knows what I did during the day :-)' },
      { name: 'Raycast', description: 'Launcher and productivity shortcuts.' },
      { name: 'mynoise.net', description: 'Sounds for concentration and relaxation.' },
    ],
  },
  {
    category: 'Hardware',
    items: [
      { name: 'MacBook Pro M2', description: '16-inch, primary development machine.' },
      { name: 'iPad Pro M4', description: 'Design prototypes, second monitor and video editing.' },
      { name: 'Insta360 Link', description: 'The best webcam ever made for most of us.' },
      { name: 'Studio Display', description: '27-inch display for design work.' },
      { name: 'Elgato Wave:3', description: 'USB microphone for high-quality audio.' },
    ],
  },
]