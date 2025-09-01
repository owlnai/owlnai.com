<script setup lang="ts">
defineProps<{
  name: string
  handle: string
  profileImage: string
  bio: string
}>()
</script>

<template>
  <div class="mb-8">
    <div class="mb-4">
      <img 
        :src="profileImage" 
        :alt="`${name}'s photo`" 
        class="rounded-full w-24 h-24" 
        width="64"
        height="64" 
      />
    </div>
    <h1 class="text-3xl font-bold mb-4 dark:text-white">
      Hi, I'm {{ name }} or <span class="italic">{{ handle }}</span>
    </h1>
    <p class="max-w-xl mb-4 text-gray-700 dark:text-gray-300">
      {{ bio }}
    </p>
  </div>
</template>
