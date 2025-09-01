<script setup lang="ts">
// Color mode setup using Nuxt Color Mode module
const colorMode = useColorMode()

// Listen for 'd' key press to toggle dark mode
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'd') {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  }
  
  document.addEventListener('keydown', handleKeyDown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
    <!-- Header -->
    <header class="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <nav class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xl font-bold dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            owlnai
          </NuxtLink>
          <div class="flex items-center gap-6">
            <NuxtLink to="/" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </NuxtLink>
            <button 
              @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
              class="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              :title="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
            >
              <div v-if="colorMode.value === 'dark'" class="i-simple-icons-lightbulb w-4 h-4" />
              <div v-else class="i-simple-icons-moon w-4 h-4" />
            </button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            © 2025 owlnai. Built with Nuxt and ❤️
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink 
              to="https://github.com/owlnai"
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <div class="i-simple-icons-github w-4 h-4" />
            </NuxtLink>
            <NuxtLink 
              to="https://bsky.app/profile/owlnai.com"
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <div class="i-simple-icons-bluesky w-4 h-4" />
            </NuxtLink>
            <span class="text-xs text-gray-400 dark:text-gray-500">Press 'd' for dark mode</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
