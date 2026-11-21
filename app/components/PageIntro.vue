<script setup lang="ts">
// The title is plain text, or the `title` slot when it needs more than text (an icon, say)
defineProps<{ title?: string }>()
</script>

<template>
  <header class="page-intro">
    <h1 class="page-intro__title display">
      <slot name="title">{{ title }}</slot>
    </h1>
    <slot />
  </header>
</template>

<style scoped>
.page-intro {
  padding: clamp(3.5rem, 10vw, 7rem) var(--gutter) clamp(3rem, 8vw, 5.5rem);
}

.page-intro__title {
  /* 14ch in Geist, written in em: a ch is the width of the font's "0", which is narrower in the fallback
     shown until Geist loads, so the title wrapped differently and the page jumped when the font arrived */
  max-width: 9.56em;
  font-size: clamp(2.5rem, 7vw, 4.75rem);
  letter-spacing: -0.055em;
  text-wrap: balance;
}
</style>
