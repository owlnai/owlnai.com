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
  max-width: 14ch;
  font-size: clamp(2.5rem, 7vw, 4.75rem);
  letter-spacing: -0.055em;
  text-wrap: balance;
}
</style>
