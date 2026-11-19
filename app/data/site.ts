export const person = {
  name: 'Unai Mengual',
  handle: 'owlnai',
  location: 'Spain',
}

export interface Brand {
  name: string
  logo: string
  href: string
}

// The personal brand and the two ventures, as they appear in the hero
export const brands = {
  owlnai: { name: 'owlnai', logo: '/icon.png', href: '/about' },
  sector9: {
    name: 'sector9',
    logo: 'https://github.com/section9-studio.png?size=96',
    href: 'https://section9.studio',
  },
  songbird: {
    name: 'Songbird Labs',
    logo: 'https://github.com/songbirdlabs.png?size=96',
    href: 'https://github.com/songbirdlabs',
  },
} satisfies Record<string, Brand>

// The same three, described for the About page
export const names = [
  {
    ...brands.owlnai,
    href: 'https://github.com/owlnai',
    description: 'My own name online: open source, writing and workshops.',
  },
  { ...brands.sector9, description: 'My web design studio.' },
  { ...brands.songbird, description: 'Roblox tools that empower creators.' },
]

export interface CommunityItem {
  title: string
  description: string
  href?: string
}

export const community: CommunityItem[] = [
  {
    title: 'isnuxt3ready',
    description:
      'A community-built compatibility guide for Nuxt 3 modules that helped developers track ecosystem readiness.',
    href: 'https://github.com/owlnai/isnuxt3ready',
  },
  {
    title: 'Workshops',
    description: 'Nuxt, UnoCSS and accessibility workshops, with popular Spanish developer Twitch streamers.',
    href: 'https://github.com/slidevjs/docs-es',
  },
  {
    title: 'Mentoring',
    description:
      'Mentoring aspiring developers and contributing across the Vue.js ecosystem, with a focus on developer experience.',
  },
]

export const facts = [
  { label: 'Based in', value: 'Spain' },
  { label: 'Role', value: 'Tech lead at MRM' },
  { label: 'Studio', value: 'sector9' },
  { label: 'Building', value: 'Songbird Labs' },
  { label: 'Speaks', value: 'English, Spanish' },
]

export interface WorkItem {
  id: string
  name: string
  year: string
  description: string
  href: string
  logo?: string
}

export const work: WorkItem[] = [
  {
    id: 'mrm',
    name: 'MRM',
    year: 'Now',
    description: 'Tech lead, building for some of the world’s most recognizable brands.',
    href: 'https://www.mrm.com',
  },
  {
    id: 'sector9',
    name: 'sector9',
    year: 'Now',
    description: 'My web design studio.',
    href: brands.sector9.href,
    logo: brands.sector9.logo,
  },
  {
    id: 'songbird',
    name: 'Songbird Labs',
    year: 'Now',
    description: 'Roblox tools that empower creators.',
    href: brands.songbird.href,
    logo: brands.songbird.logo,
  },
  {
    id: 'rex-git',
    name: 'rex-git',
    year: '2026',
    description: 'A Git side pane for Rex: diffs, staging, Claude-drafted commits and sync.',
    href: 'https://github.com/owlnai/rex-git',
  },
  {
    id: 'nuxt-rule',
    name: 'The Nuxt Rule',
    year: '2022',
    description: 'If it exists, there’s a Nuxt module of it. An experiment.',
    href: 'https://github.com/owlnai/the-nuxt-rule',
    logo: 'https://raw.githubusercontent.com/owlnai/the-nuxt-rule/HEAD/public/icon.png',
  },
  {
    id: 'isnuxt3ready',
    name: 'isnuxt3ready',
    year: '2021',
    description:
      'A community-built compatibility guide for Nuxt 3 modules. Archived in 2024, once the official modules directory took over.',
    href: 'https://github.com/owlnai/isnuxt3ready',
  },
]

// Projects by other people that I have sent patches to. Kept small on purpose.
export interface Contribution {
  id: string
  name: string
  avatar: string
  href: string
}

export const contributions: Contribution[] = [
  { id: 'nuxt', name: 'Nuxt', avatar: 'https://github.com/nuxt.png?size=96', href: 'https://github.com/nuxt/nuxt' },
  {
    id: 'slidev',
    name: 'Slidev docs (Spanish)',
    avatar: 'https://github.com/slidevjs.png?size=96',
    href: 'https://github.com/slidevjs/docs-es',
  },
  {
    id: 'wikioasis',
    name: 'WikiOasis',
    avatar: 'https://github.com/WikiOasis.png?size=96',
    href: 'https://github.com/WikiOasis',
  },
  { id: 'afordin', name: 'Afordin', avatar: 'https://github.com/Afordin.png?size=96', href: 'https://github.com/Afordin' },
  {
    id: 'taekwondo',
    name: 'taekwondo-app',
    avatar: 'https://github.com/Tekwondo-RAM.png?size=96',
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
    description: 'Wrote about future-proof UnoCSS, and ran Nuxt, UnoCSS and accessibility workshops.',
  },
  {
    year: '2022',
    dateTime: '2022',
    title: 'The Nuxt Rule',
    description: 'An experiment: if it exists, there’s a Nuxt module of it.',
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