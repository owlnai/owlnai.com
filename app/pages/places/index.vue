<script setup lang="ts">
const { data: places } = await useAsyncData('places-index', () =>
  queryCollection('places').order('date', 'DESC').all(),
)

useSeoMeta({
  title: 'Places',
  description: 'Places Unai Mengual has visited, with photos and notes from each trip.',
})
</script>

<template>
  <div>
    <PageIntro title="Places." />

    <ul class="places">
      <li v-for="place in places" :key="place.path">
        <PlaceCard :place="place" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.places {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: clip;
  border-top: 1px solid var(--line);
}

.places > li {
  min-width: 0;
  margin: 0 -1px -1px 0;
  border-inline-end: 1px solid var(--line);
  border-block-end: 1px solid var(--line);
}

@media (max-width: 52rem) {
  .places {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 34rem) {
  .places {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
