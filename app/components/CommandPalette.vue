<script setup lang="ts">
// The search button in the header. The palette itself (PaletteDialog.vue: dialog, command list, fuzzy search)
// is a separate chunk, so pages don't start with it. It is fetched once the browser is idle, or sooner on the
// first sign of interest, and mounted the first time it opens.
const open = ref(false)
const mounted = ref(false)
const { ariaKeyshortcuts } = useShortcutHint('mod+k')

const warm = () => preloadComponents('LazyPaletteDialog')

function toggle() {
  mounted.value = true
  open.value = !open.value
}

useShortcut('mod+k', toggle, { description: 'Search pages, links and settings' })

// Closing hands focus back to this button, also when the shortcut opened the palette from somewhere else
const button = ref<HTMLButtonElement>()
watch(open, async (isOpen) => {
  if (isOpen) return
  await nextTick()
  if (document.activeElement === document.body) button.value?.focus()
})

onMounted(() => {
  const idle = window.requestIdleCallback ?? ((run: () => void) => setTimeout(run, 2000))
  idle(warm, { timeout: 5000 })
})

// ⌘K on Apple devices, Ctrl+K elsewhere. The server can't know which, so both are in the HTML and this
// script picks one before the first paint; rendering one and swapping it after hydration made the header jump.
useHead({
  script: [
    {
      key: 'apple-keys',
      tagPosition: 'head',
      innerHTML: `if(/Mac|iPhone|iPad|iPod/.test(navigator.platform||navigator.userAgent))document.documentElement.setAttribute('data-apple','')`,
    },
  ],
})
</script>

<template>
  <button
    ref="button"
    type="button"
    class="trigger glass"
    aria-label="Search"
    aria-haspopup="dialog"
    :aria-expanded="open"
    :aria-keyshortcuts="ariaKeyshortcuts"
    @click="toggle"
    @pointerenter="warm"
    @focus="warm"
  >
    <svg class="trigger__icon" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" />
    </svg>
    <span class="trigger__label">Search</span>
    <span class="trigger__keys" aria-hidden="true" translate="no">
      <span data-keys="apple">⌘K</span>
      <span data-keys="other">Ctrl+K</span>
    </span>
  </button>
  <LazyPaletteDialog v-if="mounted" v-model:open="open" />
</template>

<style scoped>
.trigger {
  display: inline-flex;
  align-items: center;
  justify-self: end;
  gap: 0.5rem;
  height: 2.5rem;
  padding: 0 0.95rem;
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  cursor: default;
  pointer-events: auto;
  transition: color 0.2s;
}

.trigger:hover {
  color: var(--ink);
}

.trigger__icon {
  width: 0.875rem;
  height: 0.875rem;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
}

.trigger__keys {
  font-size: 0.75rem;
  color: var(--ink-faint);
}

.trigger__keys [data-keys='apple'],
:root[data-apple] .trigger__keys [data-keys='other'] {
  display: none;
}

:root[data-apple] .trigger__keys [data-keys='apple'] {
  display: inline;
}

@media (max-width: 30rem) {
  .trigger__label,
  .trigger__keys {
    display: none;
  }

  .trigger {
    width: 2.5rem;
    justify-content: center;
    padding: 0;
  }
}
</style>
