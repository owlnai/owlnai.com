import {
  siAmd,
  siApple,
  siCloudflare,
  siCoolify,
  siEagle,
  siElgato,
  siIkea,
  siInsta360,
  siNuxt,
  siRazer,
  siRust,
  siSketch,
} from 'simple-icons'

export interface UsesItem {
  name: string
  description?: string
  // An app icon in public/uses/, a brand's own square site icon (shown in a tile), or the SVG path
  // of a brand glyph. None of them shows the first letter.
  icon?: string
  logo?: string
  // The logo sits on a transparent background, so pad it inside the tile instead of filling it.
  logoInset?: boolean
  // A one-colour logo: only its shape is used, painted in the text colour so it works in both themes.
  logoMono?: boolean
  glyph?: string
  // For glyphs not drawn on simple-icons' 24 × 24 grid.
  glyphViewBox?: string
}

export interface UsesGroup {
  id: string
  category: string
  items: UsesItem[]
}

// Bump when the list changes; the page shows it as "Updated <month year>".
export const usesUpdated = '2026-11-20'

export const uses: UsesGroup[] = [
  {
    id: 'development',
    category: 'Development',
    items: [
      { name: 'Zed', description: 'My code editor.', icon: '/uses/zed.png' },
      {
        name: 'Delta',
        description: 'Where I work on code with AI agents, from the people behind Zed.',
        icon: '/uses/delta.png',
      },
      { name: 'Rex', description: 'My terminal: sessions, tabs and panes I can script.', icon: '/uses/rex.png' },
      { name: 'Claude Code', description: 'An AI pair that works in my terminal and my repos.', icon: '/uses/claude.png' },
      { name: 'Dia', description: 'My browser.', icon: '/uses/dia.png' },
      {
        name: 'Polypane',
        description: 'A browser for building sites, every screen size side by side.',
        icon: '/uses/polypane.png',
      },
      { name: '1Password', description: 'Every password and secret, in one vault.', icon: '/uses/1password.png' },
    ],
  },
  {
    id: 'stack',
    category: 'Stack',
    items: [
      { name: 'Nuxt', description: 'What I build for the web with, this site included.', glyph: siNuxt.path },
      { name: 'Rust', description: 'For CLIs and internal tools.', glyph: siRust.path },
      {
        name: 'Hetzner + Coolify',
        description: 'Taught me a lot about hosting, and it’s cooler right?',
        glyph: siCoolify.path,
      },
      { name: 'Cloudflare', description: 'DNS and the edge in front of my sites.', glyph: siCloudflare.path },
    ],
  },
  {
    id: 'design',
    category: 'Design',
    items: [
      { name: 'Sketch', description: 'Trying it side by side with Paper.', glyph: siSketch.path },
      { name: 'Paper', description: 'Trying it side by side with Sketch.', icon: '/uses/paper.png' },
      { name: 'Onlook', description: 'A visual editor that sits between design and code.', icon: '/uses/onlook.png' },
      { name: 'Eagle', description: 'Where my images, references and assets live.', glyph: siEagle.path },
    ],
  },
  {
    id: 'productivity',
    category: 'Productivity',
    items: [
      { name: 'Raycast', description: 'Launcher, shortcuts and everything in between.', icon: '/uses/raycast.png' },
      { name: 'Obsidian', description: 'Notes and knowledge. A second brain.', icon: '/uses/obsidian.png' },
      { name: 'Granola', description: 'Meeting notes that write themselves while I listen.', icon: '/uses/granola.png' },
      { name: 'Mesh', description: 'Keeps track of the people I know.', icon: '/uses/mesh.png' },
      { name: 'Journal', description: 'It already knows what I did during the day :-)', icon: '/uses/journal.png' },
      {
        name: 'Apple Music + myNoise',
        description: 'What plays while I work, and the noise when nothing should.',
        icon: '/uses/music.png',
      },
    ],
  },
  {
    id: 'workstation',
    category: 'Workstation',
    items: [
      { name: 'MacBook Pro M2 Pro', description: 'My main machine. Almost everything happens here.', glyph: siApple.path },
      { name: 'Apple Studio Display', description: '27 inches of 5K.', glyph: siApple.path },
      { name: 'CalDigit TS4', description: 'Thunderbolt dock. One cable into the Mac.', logo: '/uses/caldigit.png' },
      {
        name: 'Lofree Flow 2 Pro',
        description: 'Low-profile mechanical keyboard.',
        logo: '/uses/lofree.png',
        logoInset: true,
      },
      { name: 'Razer Viper V2 Pro', description: 'Wireless mouse.', glyph: siRazer.path },
      { name: 'Magic Trackpad', description: 'Next to the mouse, for gestures.', glyph: siApple.path },
      { name: 'Insta360 Link', description: 'The best webcam ever made for most of us.', glyph: siInsta360.path },
      { name: 'iPhone 18 Pro', description: 'My phone, and sometimes my camera.', glyph: siApple.path },
      {
        name: 'Gaming PC',
        description:
          'Ryzen 9 3900X and RTX 2070 Super. Runs headless; Sunshine streams it to the Mac.',
        glyph: siAmd.path,
      },
      { name: 'Moonlight', description: 'Plays the gaming PC on the Mac.', icon: '/uses/moonlight.png' },
    ],
  },
  {
    id: 'desk',
    category: 'Desk',
    items: [
      {
        name: 'Flexispot E7Q',
        description: 'Standing desk, with Flexispot’s 200 cm bamboo top.',
        logo: '/uses/flexispot.png',
        logoInset: true,
      },
      { name: 'Balolo stand (large)', description: 'Desk shelf.', logo: '/uses/balolo.png' },
      { name: 'IKEA Markus', description: 'My chair.', glyph: siIkea.path },
      {
        name: 'BenQ ScreenBar Halo',
        description: 'Light for the desk, from the top of the display.',
        logo: '/uses/benq.svg',
        logoInset: true,
      },
      {
        name: 'Logitech Litra Glow',
        description: 'Light for my face on calls.',
        logo: '/uses/logitech.png',
        logoInset: true,
      },
    ],
  },
  {
    id: 'audio',
    category: 'Audio',
    items: [
      {
        name: 'Shure SM7B',
        description: 'Microphone, through an Elgato Wave XLR.',
        // The italic S from Shure's 2024 wordmark (Wikimedia Commons, public domain).
        glyph:
          'M 16.86,19.89 c 4.41,0.01 6.85,-3.38 6.87,-6.59 0.01,-1.73 -0.64,-2.9 -2.6,-3.84 C 19.3,8.6 12.61,5.77 9.58,4.49 H 24.02 L 24.57,0.01 H 7.43 c -3.23,0 -5.78,2.82 -5.78,5.92 0,1.79 0.88,3.55 2.96,4.58 l 9.79,4 H 0.66 L 0,19.89 Z',
        glyphViewBox: '0 -2.34 24.57 24.57',
      },
      { name: 'Elgato Wave Arm Pro', description: 'Mic arm.', glyph: siElgato.path },
      {
        name: 'Hifiman Sundara',
        description: 'Planar headphones, driven by a FiiO K11.',
        logo: '/uses/hifiman.webp',
        logoMono: true,
      },
      { name: 'AirPods Pro 2', description: 'For when I’m out.', glyph: siApple.path },
    ],
  },
]
