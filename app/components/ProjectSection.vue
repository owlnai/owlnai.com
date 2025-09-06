<script setup lang="ts">
interface ProjectItem {
  id: number
  name: string
  url: string
  description: string
}

defineProps<{
  title: string
  items: ProjectItem[]
  footerText?: string
}>()
</script>

<template>
  <section class="mt-6">
    <h2 class="text-2xl font-semibold mb-4 dark:text-white">{{ title }}</h2>
    <ul class="space-y-4">
      <li v-for="item in items" :key="item.id">
        <NuxtLink 
          :to="item.url" 
          class="text-lg font-medium dark:text-zinc-50 dark:bg-zinc-800 bg-zinc-100 px-2 py-1"
        >
          {{ item.name }}
        </NuxtLink>
        <p class="text-zinc-600 dark:text-zinc-400 mt-1">{{ item.description }}</p>
      </li>
    </ul>
    <p v-if="footerText" class="mt-4 text-zinc-500 dark:text-zinc-400">{{ footerText }}</p>
  </section>
</template>
