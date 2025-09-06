<script setup lang="ts">
// Query the about content

definePageMeta({
    title: "About",
    header: "About Me",
})

const { data: page } = await useAsyncData('about', () => queryCollection('content').path('/about').first())

// Set SEO meta
useSeoMeta({
    title: (page.value as any)?.title || 'About - owlnai',
    description: (page.value as any)?.description || 'Learn more about owlnai - Full Stack Developer, Vue.js enthusiast, and content creator based in Spain.',
    ogTitle: (page.value as any)?.title || 'About - owlnai',
    ogDescription: (page.value as any)?.description || 'Learn more about owlnai - Full Stack Developer, Vue.js enthusiast, and content creator based in Spain.',
})
</script>

<template>
    <div class="max-w-2xl mx-auto">
            <NuxtImg alt="owlnai profile" src="/icon.png"
                class="rounded-lg w-48 h-48 mx-12 mb-8 object-cover float-right">
    </NuxtImg>
        <article class="prose">
            <ContentRenderer v-if="page" :value="page" />
        </article>

    </div>
</template>