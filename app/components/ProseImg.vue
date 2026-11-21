<script setup lang="ts">
// An image in Markdown. Local photos (under public/) go through @nuxt/image, which writes resized copies
// while the page prerenders; the server adds width and height so the page keeps their space before they load.
defineProps<{ src: string; alt?: string; width?: number; height?: number }>()
</script>

<template>
  <NuxtImg
    v-if="src.startsWith('/')"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    sizes="sm:100vw md:50vw xl:640px"
    loading="lazy"
    decoding="async"
  />
  <img v-else :src="src" :alt="alt" loading="lazy" decoding="async" />
</template>
