<script setup lang="ts">
// showError(createError({ statusCode: 503, statusMessage: 'Not Found' }))

// Profile data
const profile = ref({
  name: 'Unai',
  handle: 'owlnai',
  profileImage: 'https://github.com/owlnai.png',
  bio: 'I got my start editing wikis, driven by endless curiosity and a sharp eye for detail. That led me to web development, then UI design, and eventually to a little bit of everything. These days, I work with global brands, share what I know, and sometimes travel the world along the way.'
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
    description: 'Lifestyle and tech content creation.'
  },
  {
    id: 3,
    name: 'Songbird',
    url: 'https://example.com/project-2',
    description: 'A well-thought system that revolutionizes KOYA players and their ENTs.'
  }
])

// Travel data
const travels = ref([
  {
    id: 1,
    name: 'Travel Blog 1',
    url: 'https://example.com/travel-1',
    description: 'Sharing my adventures in the mountains.'
  },
  {
    id: 2,
    name: 'Travel Blog 2',
    url: 'https://example.com/travel-2',
    description: 'Exploring the vibrant streets of the city.'
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

// Social links data
const socialLinks = ref([
  {
    id: 1,
    name: 'GitHub',
    url: 'https://github.com/owlnai',
    icon: 'i-simple-icons-github',
    color: 'neutral',
    variant: 'soft'
  },
  {
    id: 2,
    name: 'Bluesky',
    url: 'https://bsky.app/profile/owlnai.com',
    icon: 'i-simple-icons-bluesky',
    color: 'info',
    variant: 'soft'
  }
])
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
    <ProfileHeader 
      :name="profile.name"
      :handle="profile.handle"
      :profile-image="profile.profileImage"
      :bio="profile.bio"
    />
    
    <div class="mb-8">
      <NuxtLink 
        to="/about"
        class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-4"
      >
        Learn more about me
      </NuxtLink>
    </div>
    
    <ProjectSection 
      title="My projects"
      :items="projects"
      footer-text="More coming soon..."
    />
    
    <ProjectSection 
      title="Knowledge & Writing"
      :items="knowledge"
      footer-text="You can subscribe via your favorite RSS reader too!"
    />
    
    <SocialLinks :social-links="socialLinks" />
    
    <div class="flex items-center justify-between">
      <span class="text-sm text-gray-500 dark:text-gray-400">Last edited in 2025. Work in progress.</span>
      <span class="text-xs text-gray-400 dark:text-gray-500">Press 'd' to toggle dark mode</span>
    </div>
  </div>
</template>