<script setup lang="ts">
interface SocialLink {
  id: number
  name: string
  url: string
  icon: string
  color?: string
  variant?: string
}

defineProps<{
  socialLinks: SocialLink[]
}>()
</script>

<template>
  <nav class="flex gap-2 mb-4">
    <NuxtLink 
      v-for="link in socialLinks" 
      :key="link.id"
      :to="link.url"
      class="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
    >
      <div :class="link.icon" class="w-4 h-4" />
      {{ link.name }}
    </NuxtLink>
  </nav>
</template>
