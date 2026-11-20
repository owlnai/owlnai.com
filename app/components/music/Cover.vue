<script setup lang="ts">
// An album cover, or a little record when Last.fm has none or its image won't load.
// Decorative: the track's name is always beside it.
const props = defineProps<{ src?: string | null }>()

const failed = ref(false)
watch(
  () => props.src,
  () => (failed.value = false),
)
</script>

<template>
  <span class="cover">
    <img v-if="src && !failed" :src="src" alt="" loading="lazy" class="cover__img" @error="failed = true" />
    <span v-else class="cover__record" aria-hidden="true" />
  </span>
</template>

<style scoped>
.cover {
  display: grid;
  flex: none;
  place-items: center;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: 22%;
  background: var(--sunken);
  box-shadow: inset 0 0 0 1px var(--line);
}

.cover__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Vinyl: a dark disc with faint grooves and a holo label */
.cover__record {
  width: 78%;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(circle, var(--paper) 0 6%, transparent 6.5%),
    radial-gradient(circle, transparent 0 26%, light-dark(#1b1b1d, #050506) 27%),
    conic-gradient(var(--holo-1), var(--holo-3), var(--holo-5), var(--holo-1)),
    light-dark(#1b1b1d, #050506);
  box-shadow: inset 0 0 0 2px light-dark(rgb(255 255 255 / 0.06), rgb(255 255 255 / 0.05));
}
</style>
