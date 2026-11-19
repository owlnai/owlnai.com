<script setup lang="ts">
const preferences = [colorScheme]

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
