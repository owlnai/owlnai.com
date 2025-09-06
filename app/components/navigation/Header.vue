<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()

const links: { name: string; path: string; text: string | undefined }[] = []
const router = useRouter()
router.getRoutes().sort((a, b) => a.path.localeCompare(b.path)).forEach((route) => {
    links.push({ name: route.name?.toString() || route.path, path: route.path, text: route.meta.name })
}) 
</script>
<template>
    <header>
        <div class="max-w-2xl mx-auto py-4 mt-32 mb-4 text-white">
            <nav class="flex flex-col-reverse sm:flex-row sm:items-end justify-between">
                <h1 class="text-4xl font-bold">
                    {{  route.meta.header }}
                </h1>
                <ul class="flex self-end sm:self-auto flex-col text-2xl font-bold capitalize">
                    <li v-for="link in links" :key="link.name" class="relative">
                        <NuxtLink :to="link.path">
                        <div class="size-1 absolute -left-10" v-if="route.path === link.path">👉</div>
                            {{ link.name }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>