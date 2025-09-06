<script setup lang="ts">
const { data: page } = await useAsyncData('headline', () => queryCollection('content').path('/headline').first())
</script>

<template>
  <div class="">
    <p class="max-w-xl prose">
      <ContentRenderer v-if="page" :value="page" />
    </p>
  </div>
</template>
