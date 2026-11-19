<script setup lang="ts">
const links = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/uses', label: 'Uses' },
]
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="header__mark display" aria-label="owlnai, home">owlnai</NuxtLink>
    <nav class="header__nav" aria-label="Main">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="header__link mono">
        {{ link.label }}
      </NuxtLink>
    </nav>
    <CommandPalette />
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 3.5rem;
  padding-inline: var(--gutter);
  border-bottom: 1px solid var(--line);
  background: color-mix(in oklab, var(--paper) 86%, transparent);
  backdrop-filter: blur(12px);
}

.header__mark {
  font-size: 1.625rem;
  font-weight: 600;
  letter-spacing: -0.03em;
  padding-bottom: 0.15em;
}

.header__nav {
  display: flex;
  gap: 1.25rem;
  margin-inline-start: auto;
}

.header__link {
  position: relative;
  padding-block: 0.4rem;
  color: var(--ink-faint);
  transition: color 0.2s;
}

.header__link:hover,
.header__link.router-link-active {
  color: var(--ink);
}

.header__link.router-link-active::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  bottom: 0.1rem;
  height: 1px;
  background: currentColor;
}

@media (max-width: 30rem) {
  .header {
    gap: 0.9rem;
  }

  .header__nav {
    gap: 0.9rem;
  }
}
</style>
