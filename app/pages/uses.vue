<script setup lang="ts">
definePageMeta({
    title: "Uses",
    header: "My Setup & Tools",
})
const  uses = [
        {
            category: 'Development',
            items: [
                { name: 'VS Code', description: 'Primary code editor, but slowly moving to Zed.' },
                { name: 'Ghostty', description: 'AMAZING terminal! And without AI shoved-in.' },
                { name: 'GitHub', description: 'Version control and collaboration' },
                { name: 'Hetzner + Coolify', description: 'Taught me a lot about hosting, and it\'s cooler right?' },
                { name: 'Figma', description: 'Design, prototyping, and some graphic work' },
                { name: 'Eagle', description: 'Image and asset management tool' }
            ]
        },
        {
            category: 'Productivity',
            items: [
                { name: 'Obsidian', description: 'Knowledge management and note-taking. A second brain.' },
                { name: 'Journal App', description: 'It already knows what I did during the day :-)' },
                { name: 'Raycast', description: 'Launcher and productivity shortcuts' },
                { name: 'mynoise.net', description: 'Sounds for concentration and relaxation' }
            ]
        },
        {
            category: 'Hardware',
            items: [
                { name: 'MacBook Pro M2', description: '16-inch, primary development machine' },
                { name: 'iPad Pro M4', description: 'Design prototypes, second monitor and video editing.' },
                { name: 'Insta360 Link', description: 'The best webcam ever made for most of us.' },
                { name: 'Studio Display', description: '27-inch 4K display for design work' },
                { name: 'Elgato Wave:3', description: 'USB microphone for high-quality audio' }
            ]
        }
    ]
</script>
<template>
      <div class="max-w-2xl mx-auto">

        <!-- Uses Section -->
        <section class="mb-12">
    
            <div class="space-y-8">
                <div v-for="category in uses" :key="category.category">
                    <h3 class="text-lg font-medium mb-4 text-zinc-900 dark:text-zinc-100">{{ category.category }}</h3>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div v-for="item in category.items" :key="item.name"
                            class="flex items-start space-x-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                            <div class="flex-1">
                                <h4 class="font-medium text-zinc-900 dark:text-white">{{ item.name }}</h4>
                                <p class="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</div>
    </template>