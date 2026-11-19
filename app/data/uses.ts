import { siApple, siCoolify, siEagle, siElgato, siInsta360, siSketch } from 'simple-icons'

export interface UsesItem {
  name: string
  description: string
  // An app icon in public/uses/, or the SVG path of a brand glyph. Neither shows the first letter.
  icon?: string
  glyph?: string
}

export interface UsesGroup {
  category: string
  items: UsesItem[]
}

export const uses: UsesGroup[] = [
  {
    category: 'Development',
    items: [
      { name: 'Rex', description: 'My terminal: sessions, tabs and panes I can script.', icon: '/uses/rex.png' },
      { name: 'Claude Code', description: 'An AI pair that works in my terminal and my repos.', icon: '/uses/claude.png' },
      {
        name: 'Hetzner + Coolify',
        description: 'Taught me a lot about hosting, and it’s cooler right?',
        glyph: siCoolify.path,
      },
    ],
  },
  {
    category: 'Design',
    items: [
      { name: 'Sketch', description: 'Interface design, native to the Mac.', glyph: siSketch.path },
      { name: 'Paper', description: 'A new canvas for design work.', icon: '/uses/paper.png' },
      { name: 'Onlook', description: 'A visual editor that sits between design and code.', icon: '/uses/onlook.png' },
      { name: 'Eagle', description: 'Image and asset management tool.', glyph: siEagle.path },
    ],
  },
  {
    category: 'Productivity',
    items: [
      { name: 'Raycast', description: 'Launcher and productivity shortcuts.', icon: '/uses/raycast.png' },
      {
        name: 'Obsidian',
        description: 'Knowledge management and note-taking. A second brain.',
        icon: '/uses/obsidian.png',
      },
      { name: 'Granola', description: 'Meeting notes that write themselves while I listen.', icon: '/uses/granola.png' },
      { name: 'Mesh', description: 'Keeps track of the people I know.', icon: '/uses/mesh.png' },
      { name: 'Journal App', description: 'It already knows what I did during the day :-)', icon: '/uses/journal.png' },
      { name: 'Apple Music', description: 'What plays while I work.', icon: '/uses/music.png' },
      { name: 'mynoise.net', description: 'Sounds for concentration and relaxation.' },
    ],
  },
  {
    category: 'Hardware',
    items: [
      { name: 'MacBook Pro M2', description: '16-inch, primary development machine.', glyph: siApple.path },
      { name: 'Studio Display', description: '27-inch display for design work.', glyph: siApple.path },
      { name: 'Insta360 Link', description: 'The best webcam ever made for most of us.', glyph: siInsta360.path },
      { name: 'Elgato Wave:3', description: 'USB microphone for high-quality audio.', glyph: siElgato.path },
    ],
  },
]
