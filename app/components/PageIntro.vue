<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <header class="page-intro">
    <h1 class="page-intro__title display">{{ title }}</h1>
    <slot />
  </header>
</template>

<style scoped>
.page-intro {
  padding: clamp(3rem, 9vw, 6rem) var(--gutter) clamp(2.5rem, 7vw, 4.5rem);
}

.page-intro__title {
  max-width: 14ch;
  font-size: clamp(2.75rem, 8.5vw, 5.75rem);
  text-wrap: balance;
}
</style>
