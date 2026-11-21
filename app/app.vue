<script setup lang="ts">
const preferences = [colorScheme]

// The image for the small share card (`?card=small`, see server/middleware/share-card.ts): my photo, unless a
// page sets its own under the same key
useHead({
  meta: [{ key: 'small-card-image', name: 'small-card-image', content: new URL('/icon.png', useSiteConfig().url).href }],
})

useShortcut(
  'd',
  () => {
    const { resolved } = colorScheme.get()
    colorScheme.set(resolved === 'dark' ? 'light' : 'dark')
  },
  { description: 'Toggle dark mode' },
)
</script>

<template>
  <Preferences :preferences="preferences">
    <div class="site">
      <a class="skip mono" href="#main">Skip to content</a>
      <NuxtRouteAnnouncer />
      <SiteHeader />
      <main id="main">
        <NuxtPage />
      </main>
      <SiteFooter />
    </div>
  </Preferences>
</template>
