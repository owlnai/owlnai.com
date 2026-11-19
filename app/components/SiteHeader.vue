<script setup lang="ts">
const links = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/places', label: 'Places' },
  { to: '/notes', label: 'Notes' },
  { to: '/uses', label: 'Uses' },
]
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="header__mark" aria-label="owlnai, home">owlnai</NuxtLink>
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
  flex-wrap: wrap;
  align-items: center;
  min-height: 3.5rem;
  padding-inline: var(--gutter);
  border-bottom: 1px solid var(--line);
  background: color-mix(in oklab, var(--paper) 86%, transparent);
  backdrop-filter: blur(12px);
}

.header__mark {
  font-size: 1.125rem;
  font-weight: 650;
  letter-spacing: -0.05em;
}

/* Links spread evenly between the wordmark and search */
.header__nav {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
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

@media (max-width: 44rem) {
  .header {
    justify-content: space-between;
  }

  .header__mark {
    line-height: 3.5rem;
  }

  .header__nav {
    order: 3;
    flex-basis: 100%;
    justify-content: space-between;
    margin-inline: calc(var(--gutter) * -1);
    padding: 0.35rem var(--gutter);
    border-top: 1px solid var(--line);
  }
}
</style>
