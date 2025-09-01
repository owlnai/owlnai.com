<script setup lang="ts">
useSeoMeta({
    title: 'About - Unai Mengual',
    description: 'Learn more about Unai Mengual (owlnai) - Full Stack Developer, Vue.js enthusiast, and digital nomad based in Spain.',
    ogTitle: 'About - Unai Mengual',
    ogDescription: 'Learn more about Unai Mengual (owlnai) - Full Stack Developer, Vue.js enthusiast, and digital nomad based in Spain.',
})

// About content data
const aboutData = ref({
    name: 'Unai Mengual',
    handle: 'owlnai',
    profileImage: 'https://github.com/owlnai.png',
    bio: `Hey! I'm owlnai but you can call me Unai. My nickname originates from "owl" and "Unai". Quite simple, right?

Day to day, I'm a Full Stack Developer @ MRM Spain and an aspiring content creator. In my free time, I listen to k-pop read Haruki Murakami novels or travel somewhere new!

My journey into tech wasn't conventional. It started when I was 10 years old building simple websites with HTML on Notepad. Shortly after, I discovered wikis and I found myself drawn to it, spending countless hours. This passion naturally led me into web development, where I discovered that code could make these wiki pages come alive and provide tools to the community.

From there, I ventured into UI design, inspired by a extremely creative friend who passed away. I learned that great design should be recognizable and atemporal, it should be an interface between user needs and the system, and above all, accessible.

These days, I do a little bit of everything. At MRM, I work for some of the world's most recognizable brands. Each project brings its own challenges and learning opportunities, and I'm really excited about the impact I can make. I also do freelance and content creation as a side gig.

I believe everyone should be kind, that's why I believe in giving back to the community. Whether it's through open-source contributions, mentoring aspiring developers, or simply sharing knowledge.

I like making new friends, so if you want to say hi, collaborate on something, or just chat, feel free to reach out!`,

    expertise: [

    ],

    uses: [
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
                { name: 'Insta 360 Link', description: 'The best webcam ever made for most of us.' },
                { name: 'Studio Display', description: '27-inch 4K display for design work' },
                { name: 'Elgato Wave:3', description: 'USB microphone for high-quality audio' },
                { name: 'Insta 360 Link', description: 'The best webcam ever made for most of us.' }
            ]
        }
    ],

    projects: [
        {
            name: 'isnuxt3ready',
            description: 'A community-built compatibility guide for Nuxt 3 modules',
            tech: 'Vue.js',
            stars: '104',
            url: 'https://github.com/owlnai/isnuxt3ready'
        },
        {
            name: 'Slidev Docs ES',
            description: 'Spanish translation for Slidev documentation',
            tech: 'Vue.js',
            stars: '10',
            url: 'https://github.com/slidevjs/docs-es'
        },
        {
            name: 'Lofi in Your Desktop',
            description: 'Listen to Lofi girl in your desktop',
            tech: 'HTML',
            stars: '5',
            url: 'https://github.com/owlnai/lofi-in-your-desktop'
        }
    ],

    achievements: [
        'Arctic Code Vault Contributor',
        'Pull Shark x2',
        'Public Sponsor',
        'Quickdraw',
        'Pair Extraordinaire',
        'YOLO',
        'Starstruck'
    ],

    currentFocus: [
        'Building amazing stuff at MRM Spain',
        'Returning to open source and content creation.',
        'Doing a talk soon!',
        'Traveling and experiencing different cultures'
    ]
})
</script>

<template>
    <div class="max-w-4xl mx-auto p-6 min-h-screen transition-colors duration-300 dark:bg-gray-900 dark:text-white">
        <!-- Header Section -->
        <div class="mb-12">
      <h1
      class="text-4xl font-bold mb-4 dark:text-white"
      >About</h1>
            <!-- Bio -->
            <div class="max-w-4xl mx-auto">
                <div v-for="paragraph in aboutData.bio.split('\n\n')" :key="paragraph" class="mb-6">
                    <p class="text-lg leading-8 text-gray-700 dark:text-gray-300 font-normal tracking-wide">
                        {{ paragraph }}
                    </p>
                </div>
            </div>
        </div>
     <!-- Notable Projects Section -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-6 dark:text-white">Notable Projects</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div v-for="project in aboutData.projects" :key="project.name"
                    class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                    <div class="flex items-start justify-between mb-3">
                        <h3 class="font-semibold text-lg dark:text-white">
                            <NuxtLink :to="project.url"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                {{ project.name }}
                            </NuxtLink>
                        </h3>
                        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <div class="i-simple-icons-github w-3 h-3 mr-1" />
                            {{ project.stars }}
                        </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-3">{{ project.description }}</p>
                    <span
                        class="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                        {{ project.tech }}
                    </span>
                </div>
            </div>
        </section>

        <!-- Current Focus Section -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-6 dark:text-white">What I'm focused on</h2>
            <ul class="space-y-3">
                <li v-for="focus in aboutData.currentFocus" :key="focus" class="flex items-start">
                    <span class="text-green-500 mr-3 mt-1">→</span>
                    <span class="text-gray-700 dark:text-gray-300">{{ focus }}</span>
                </li>
            </ul>
        </section>

        <!-- Uses Section -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-6 dark:text-white">What I Use</h2>
            <div class="space-y-8">
                <div v-for="category in aboutData.uses" :key="category.category">
                    <h3 class="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">{{ category.category }}</h3>
                    <div class="grid md:grid-cols-2 gap-4">
                        <div v-for="item in category.items" :key="item.name"
                            class="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div class="flex-1">
                                <h4 class="font-medium text-gray-900 dark:text-white">{{ item.name }}</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

   

        <!-- GitHub Achievements -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-6 dark:text-white">GitHub Achievements</h2>
            <div class="flex flex-wrap gap-2">
                <span v-for="achievement in aboutData.achievements" :key="achievement"
                    class="px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-lg">
                    🏆 {{ achievement }}
                </span>
            </div>
        </section>

        <!-- Contact Section -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-6 dark:text-white">Let's connect</h2>
            <p class="text-gray-700 dark:text-gray-300 mb-6">
                I'm always open to interesting conversations, collaboration opportunities, or just a friendly chat about
                technology, design, or travel.
            </p>
            <div class="flex flex-wrap gap-4">
                <NuxtLink to="https://github.com/owlnai"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                    <div class="i-simple-icons-github w-4 h-4" />
                    GitHub
                </NuxtLink>
                <NuxtLink to="https://linkedin.com/in/owlnai"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <div class="i-simple-icons-linkedin w-4 h-4" />
                    LinkedIn
                </NuxtLink>
                <NuxtLink to="https://bsky.app/profile/owlnai.com"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                    <div class="i-simple-icons-bluesky w-4 h-4" />
                    Bluesky
                </NuxtLink>
            </div>
        </section>

        <!-- Footer Quote -->
        <div class="text-center py-8 border-t border-gray-200 dark:border-gray-700">
            <p class="text-lg italic text-gray-600 dark:text-gray-400">
                "Life is either a daring adventure or nothing at all."
            </p>
        </div>
    </div>
</template>
