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
  <section class="mb-8">
    <h2 class="text-2xl font-semibold mb-4 dark:text-white">{{ title }}</h2>
    <ul class="space-y-4">
      <li v-for="item in items" :key="item.id" class="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
        <NuxtLink 
          :to="item.url" 
          class="text-lg font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {{ item.name }}
        </NuxtLink>
        <p class="text-gray-600 dark:text-gray-400 mt-1">{{ item.description }}</p>
      </li>
    </ul>
    <p v-if="footerText" class="mt-4 text-gray-500 dark:text-gray-400">{{ footerText }}</p>
  </section>
</template>
