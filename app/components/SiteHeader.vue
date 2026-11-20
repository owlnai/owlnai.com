<script setup lang="ts">
const links = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/places', label: 'Places' },
  { to: '/notes', label: 'Notes' },
  { to: '/uses', label: 'Uses' },
]

const route = useRoute()
const nav = ref<HTMLElement>()
const indicator = ref<{ left: number; width: number } | null>(null)
const animate = ref(false)

const active = computed(
  () => links.find((link) => route.path === link.to || route.path.startsWith(`${link.to}/`))?.to,
)

function measure() {
  const link = nav.value?.querySelector<HTMLElement>('[data-active]')
  indicator.value = link ? { left: link.offsetLeft, width: link.offsetWidth } : null
}

let observer: ResizeObserver | undefined

onMounted(() => {
  measure()
  // Web fonts change the link widths after first paint
  observer = new ResizeObserver(measure)
  if (nav.value) observer.observe(nav.value)
  requestAnimationFrame(() => (animate.value = true))
})

onBeforeUnmount(() => observer?.disconnect())

watch(active, () => nextTick(measure))
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="pill glass mark" aria-label="owlnai, home">
      <img src="/icon.png" alt="" width="28" height="28" class="mark__avatar" />
      owlnai
    </NuxtLink>

    <nav
      ref="nav"
      class="pill glass nav"
      aria-label="Main"
      :data-ready="indicator ? '' : undefined"
      :data-animate="animate ? '' : undefined"
    >
      <span
        v-if="indicator"
        class="nav__indicator"
        aria-hidden="true"
        :style="{ width: `${indicator.width}px`, translate: `${indicator.left}px 0` }"
      />
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav__link"
        :data-active="active === link.to ? '' : undefined"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <CommandPalette />
  </header>
</template>

<style scoped>
/* Three floating pieces: who, where, search. Only the pieces take clicks. */
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem var(--gutter);
  pointer-events: none;
}

.pill {
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  border-radius: 999px;
  pointer-events: auto;
}

.mark {
  justify-self: start;
  gap: 0.55rem;
  padding: 0 0.95rem 0 0.3rem;
  font-size: 1.0625rem;
  font-weight: 650;
  letter-spacing: -0.05em;
}

.mark__avatar {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  object-fit: cover;
}

.nav {
  position: relative;
  isolation: isolate;
  padding: 0.25rem;
}

.nav__link {
  display: inline-flex;
  align-items: center;
  height: 100%;
  padding: 0 0.85rem;
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: color 0.2s;
}

.nav__link:hover,
.nav__link[data-active] {
  color: var(--ink);
}

.nav__link:focus-visible {
  outline-offset: -2px;
}

.nav__indicator {
  position: absolute;
  z-index: -1;
  top: 0.25rem;
  bottom: 0.25rem;
  left: 0;
  border-radius: 999px;
  /* A second, denser lens over the glass marks the current page */
  background: light-dark(rgb(255 255 255 / 0.75), rgb(255 255 255 / 0.14));
  box-shadow:
    inset 0 1px 0 light-dark(rgb(255 255 255), rgb(255 255 255 / 0.22)),
    0 0 0 1px light-dark(rgb(0 0 0 / 0.06), rgb(0 0 0 / 0.3)),
    0 2px 8px -3px light-dark(rgb(0 0 0 / 0.25), rgb(0 0 0 / 0.6));
}

@media (prefers-reduced-motion: no-preference) {
  .nav[data-animate] .nav__indicator {
    transition:
      translate 0.35s var(--ease-out),
      width 0.35s var(--ease-out);
  }
}

/* On a phone the links become a dock at the bottom, within thumb reach */
@media (max-width: 44rem) {
  .header {
    grid-template-columns: 1fr auto;
  }

  .nav {
    position: fixed;
    bottom: max(0.75rem, env(safe-area-inset-bottom));
    left: 50%;
    translate: -50% 0;
    z-index: 10;
  }

  .nav__link {
    padding: 0 0.65rem;
    font-size: 0.8125rem;
  }
}
</style>
