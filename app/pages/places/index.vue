<script setup lang="ts">
const { data: places } = await useAsyncData('places-index', () =>
  queryCollection('places').order('date', 'DESC').all(),
)

useSeoMeta({
  title: 'Places',
  description: 'Places Unai Mengual has visited, with photos and notes from each trip.',
})

// The place being pointed at, from either its pin or its card, so both light up together
const active = ref<string | null>(null)
</script>

<template>
  <div>
    <!-- The title and the map share one band: the title on the left, the map filling the rest edge to edge -->
    <div class="head">
      <PageIntro title="Places." class="head__intro" />
      <section class="atlas" aria-label="Map of places">
        <PlacesMap :places="places ?? []" :active="active" :aspect="1.55" @hover="active = $event" />
      </section>
    </div>

    <ul class="places">
      <li
        v-for="place in places"
        :key="place.path"
        @pointerenter="active = place.path"
        @pointerleave="active = null"
        @focusin="active = place.path"
        @focusout="active = null"
      >
        <PlaceCard :place="place" memory :active="active === place.path" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.head {
  display: grid;
  grid-template-columns: minmax(0, 22rem) minmax(0, 1fr);
}

/* The title sits low in the band, level with the lower half of the map, rather than up by the menu */
.head__intro {
  align-self: end;
}

.atlas {
  align-self: stretch;
  display: grid;
  align-items: center;
}

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
  .head {
    grid-template-columns: minmax(0, 1fr);
  }

  .atlas {
    border-top: 1px solid var(--line);
  }

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
