<script setup lang="ts">
import { socials } from '~/data/site'

// The command palette itself. CommandPalette.vue owns the header button and loads this file on demand,
// so the dialog, the command list and the fuzzy search stay out of the code every page starts with.
interface PaletteCommand {
  value: string
  label: string
  hint: string
  keywords?: string[]
  run: () => void
}

const open = defineModel<boolean>('open', { default: false })
const router = useRouter()

const groups: { label: string; items: PaletteCommand[] }[] = [
  {
    label: 'Go to',
    items: [
      { value: 'index', label: 'Index', hint: '/', keywords: ['home'], run: () => router.push('/') },
      { value: 'about', label: 'About', hint: '/about', keywords: ['bio', 'timeline'], run: () => router.push('/about') },
      { value: 'blog', label: 'Blog', hint: '/blog', keywords: ['writing', 'articles', 'posts'], run: () => router.push('/blog') },
      { value: 'places', label: 'Places', hint: '/places', keywords: ['travel', 'trips', 'photos'], run: () => router.push('/places') },
      { value: 'notes', label: 'Notes', hint: '/notes', keywords: ['snippets', 'quotes', 'code'], run: () => router.push('/notes') },
      { value: 'uses', label: 'Uses', hint: '/uses', keywords: ['setup', 'tools', 'gear'], run: () => router.push('/uses') },
      { value: 'open-source', label: 'Open source', hint: '/#open-source', keywords: ['projects', 'contributions'], run: () => router.push('/#open-source') },
      { value: 'rss', label: 'RSS feed', hint: '/rss.xml', keywords: ['subscribe'], run: () => window.open('/rss.xml', '_blank', 'noopener') },
    ],
  },
  {
    label: 'Elsewhere',
    items: socials.map((social) => ({
      value: `social-${social.id}`,
      label: social.name,
      hint: social.handle,
      run: () => window.open(social.href, '_blank', 'noopener'),
    })),
  },
  {
    label: 'Theme',
    items: [
      { value: 'theme-light', label: 'Light', hint: 'Theme', run: () => colorScheme.set('light') },
      { value: 'theme-dark', label: 'Dark', hint: 'Theme', run: () => colorScheme.set('dark') },
      { value: 'theme-system', label: 'System', hint: 'Theme', keywords: ['auto'], run: () => colorScheme.set('system') },
    ],
  },
]

const commands = new Map(groups.flatMap((group) => group.items.map((item) => [item.value, item] as const)))

function onAction(value: string) {
  open.value = false
  commands.get(value)?.run()
}

// The shortcut that opens the palette also closes it. An open dialog pauses the page's shortcuts, the
// header button's among them, so the palette listens for it itself.
function onKeydown(event: KeyboardEvent) {
  const mod = document.documentElement.hasAttribute('data-apple') ? event.metaKey : event.ctrlKey
  if (!mod || event.key.toLowerCase() !== 'k') return
  event.preventDefault()
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogBackdrop />
    <DialogContent class="palette">
      <span class="cross" data-at="tl" />
      <span class="cross" data-at="br" />
      <DialogTitle class="visually-hidden">Command palette</DialogTitle>
      <Command class="palette__command" @action="onAction" @keydown="onKeydown">
        <div class="palette__search">
          <svg class="palette__icon" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <CommandInput class="palette__input" aria-label="Search commands" placeholder="Search pages, links and settings" />
        </div>
        <CommandEmpty class="palette__empty">Nothing matches that.</CommandEmpty>
        <CommandList class="palette__list">
          <CommandGroup v-for="group in groups" :key="group.label" class="palette__group">
            <CommandGroupLabel class="palette__group-label mono">{{ group.label }}</CommandGroupLabel>
            <CommandItem
              v-for="item in group.items"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :keywords="item.keywords"
              class="palette__item"
            >
              <CommandItemText>{{ item.label }}</CommandItemText>
              <span class="palette__hint mono">{{ item.hint }}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.palette__command {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.palette__search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--line);
  color: var(--ink-faint);
}

.palette__icon {
  width: 0.875rem;
  height: 0.875rem;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
}

.palette__input {
  flex: 1;
  min-width: 0;
  height: 3.25rem;
  border: 0;
  outline: 0;
  background: none;
  color: var(--ink);
  font: inherit;
  font-size: 1rem;
}

.palette__input::placeholder {
  color: var(--ink-faint);
}

.palette__empty {
  padding: 2rem 1rem;
  color: var(--ink-faint);
  text-align: center;
}

.palette__empty:not([data-empty]) {
  display: none;
}

.palette__command:has(.palette__empty[data-empty]) .palette__list {
  display: none;
}

.palette__list {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.5rem;
}

.palette__group:not([hidden]) ~ .palette__group:not([hidden]) {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--line);
}

.palette__group-label {
  padding: 0.4rem 0.5rem;
  color: var(--ink-faint);
  font-size: 0.6875rem;
}

.palette__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.5rem;
  cursor: default;
  scroll-margin: 0.5rem;
}

.palette__item[data-highlighted] {
  background: var(--ink);
  color: var(--paper);
}

.palette__hint {
  color: var(--ink-faint);
  font-size: 0.6875rem;
  text-transform: none;
}

.palette__item[data-highlighted] .palette__hint {
  color: inherit;
  opacity: 0.7;
}

.palette__item :deep(mark) {
  background: none;
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}
</style>
