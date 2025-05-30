<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "About",
    to: "/about",
    active: route.path.startsWith("/about"),
  },
  {
    label: "Now",
    to: "/now",
    active: route.path.startsWith("/now"),
  },
]);
</script>
<template>
  <UApp>

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <UFooter class="">
      <span class="font-serif">Vision. Craft. Scale.</span>
    </UFooter>
  </UApp>
</template>
