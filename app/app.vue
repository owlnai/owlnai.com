<template>
  <div class="min-h-screen font-sans flex flex-col dark:bg-zinc-950 transition-colors duration-300 px-4 pb-12">
    <NuxtRouteAnnouncer />
    <navigationHeader />

    <main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
  </div>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
