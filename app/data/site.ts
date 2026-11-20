export const person = {
  name: 'Unai Mengual',
  handle: 'owlnai',
  location: 'Spain',
}

// Where trips start from on the Places map. Madrid rather than the exact town: central, and close enough.
export const home = {
  label: 'Home',
  coords: [40.4168, -3.7038] as [number, number],
}

export interface Brand {
  name: string
  href: string
  logo?: string
}

// The day job, the personal brand and the two ventures, as they appear in the hero
export const brands = {
  mrm: {
    name: 'MRM',
    logo: '/mrm.svg',
    href: 'https://www.mrm.com',
  },
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

// My own projects first, then projects by others that I have contributed to
export interface OpenSourceItem {
  id: string
  name: string
  summary: string
  href: string
  avatar?: string
}

export const openSource: OpenSourceItem[] = [
  {
    id: 'rex-git',
    name: 'rex-git',
    summary: 'A Git side pane for Rex',
    href: 'https://github.com/owlnai/rex-git',
  },
  {
    id: 'nuxt-rule',
    name: 'The Nuxt Rule',
    summary: 'If it exists, there’s a Nuxt module of it',
    href: 'https://github.com/owlnai/the-nuxt-rule',
    avatar: 'https://raw.githubusercontent.com/owlnai/the-nuxt-rule/HEAD/public/icon.png',
  },
  {
    id: 'isnuxt3ready',
    name: 'isnuxt3ready',
    summary: 'A compatibility guide for Nuxt 3 modules',
    href: 'https://github.com/owlnai/isnuxt3ready',
  },
  {
    id: 'nuxt',
    name: 'nuxt/nuxt',
    summary: 'The full-stack Vue framework',
    href: 'https://github.com/nuxt/nuxt',
    avatar: 'https://github.com/nuxt.png?size=96',
  },
  {
    id: 'slidev',
    name: 'slidevjs/docs-es',
    summary: 'Slidev docs, in Spanish',
    href: 'https://github.com/slidevjs/docs-es',
    avatar: 'https://github.com/slidevjs.png?size=96',
  },
  {
    id: 'wikioasis',
    name: 'WikiOasis',
    summary: 'A space for anybody to write about anything',
    href: 'https://github.com/WikiOasis',
    avatar: 'https://github.com/WikiOasis.png?size=96',
  },
  {
    id: 'afordin',
    name: 'Afordin',
    summary: 'A Spanish-speaking programming community',
    href: 'https://github.com/Afordin',
    avatar: 'https://github.com/Afordin.png?size=96',
  },
  {
    id: 'taekwondo',
    name: 'Tekwondo-RAM/taekwondo-app',
    summary: 'A taekwondo PWA',
    href: 'https://github.com/Tekwondo-RAM/taekwondo-app',
    avatar: 'https://github.com/Tekwondo-RAM.png?size=96',
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
  // A small illustration beside the step (app/components/journey/). Places add travel stamps on their own.
  widget?: 'contributions' | 'design' | 'here'
}

// The journey so far, oldest first. The last step is where I am now.
// Phases rather than projects: the Community section and GitHub hold the specifics.
export const milestones: Milestone[] = [
  {
    year: 'Before',
    title: 'Curiosity',
    description: 'Editing wikis as a teenager and building my first web pages by hand. Sharing what I knew felt natural.',
  },
  {
    year: '2016',
    dateTime: '2016',
    title: 'Learning in public',
    description: 'Started putting my work out in the open, for anyone to see, use and improve.',
    widget: 'contributions',
  },
  {
    year: '2021',
    dateTime: '2021',
    title: 'Building with others',
    description: 'Helped a community find its way through a big change, and learned the best things are built together.',
  },
  {
    year: '2022',
    dateTime: '2022',
    title: 'Finding design',
    description:
      'Inspired by a creative friend, I went deep into UI design, and made small experiments just to see how far an idea could go.',
    widget: 'design',
  },
  {
    year: '2023',
    dateTime: '2023',
    title: 'Leading and teaching',
    description:
      'Became a tech lead, building for some of the world’s most recognizable brands, and ran workshops to pass on what I had learned.',
  },
  {
    year: '2024',
    dateTime: '2024',
    title: 'People, not platforms',
    description: 'Choosing more carefully where to spend my time, and letting things go once they had done their job.',
  },
  {
    year: '2025',
    dateTime: '2025',
    title: 'A studio of my own',
    description: 'Started a small web design studio.',
  },
  {
    year: '2026',
    dateTime: '2026',
    title: 'Building for creators',
    description: 'Making tools that help creators build their worlds, working in the open again, and meeting the community in person.',
    widget: 'here',
  },
]