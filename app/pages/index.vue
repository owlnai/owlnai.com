<script setup lang="ts">
// showError(createError({ statusCode: 503, statusMessage: 'Not Found' }))
definePageMeta({
  header: 'Hi, I\'m Unai',
})
// Projects data
const projects = ref([
  {
    id: 1,
    name: 'sector9.studio',
    url: 'https://example.com/project-1',
    description: 'Creative agency providing handcrafted solutions and web design.'
  },
  {
    id: 2,
    name: '[REDACTED]',
    url: 'https://example.com/project-1',
    description: 'Lifestyle and tech content creation via multiple channels.'
  },
  {
    id: 3,
    name: 'Songbird',
    url: 'https://example.com/project-2',
    description: 'The KOYA revolution for Roblox players. Create, innovate and manage.'
  }
])
// Knowledge & Content data
const knowledge = ref([
  {
    id: 1,
    name: 'Digital Garden',
    url: 'https://garden.owlnai.com', // Replace with your actual URL
    description: 'My interconnected knowledge base where ideas grow and evolve over time.'
  },
  {
    id: 2,
    name: 'Owl\'s Nest',
    url: 'https://blog.owlnai.com', // Replace with your actual URL
    description: 'Thoughts on technology, design, and other topics.'
  },
  {
    id: 3,
    name: 'Travel Journal',
    url: 'https://travels.owlnai.com', // Replace with your actual URL
    description: 'Stories and reflections from my journeys around the world.'
  }
])
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <ProfileHeader />
    <div class="grid md:grid-cols-2 justify-between sm:gap-12">
    <ProjectSection 
      title="My projects"
      :items="projects"
      footer-text="More coming soon..."
    />
    <ProjectSection 
      title="Knowledge & Writing"
      :items="knowledge"
      footer-text="Subscribe via your favorite RSS reader too!"
    />
    </div>
  </div>
</template>