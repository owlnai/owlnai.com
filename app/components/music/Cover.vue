<script setup lang="ts">
// An album cover over a little record. The record shows while the cover loads (Last.fm can take
// seconds to make a size it hasn't served before), when Last.fm has none, or when it won't load.
// Decorative: the track's name is always beside it.
const props = defineProps<{ src?: string | null }>()

const img = useTemplateRef<HTMLImageElement>('img')
const loaded = ref(false)
const failed = ref(false)

// An image the browser already has can finish loading before Vue listens for `load`
function checkComplete() {
  if (img.value?.complete && img.value.naturalWidth > 0) loaded.value = true
}

watch(
  () => props.src,
  () => {
    loaded.value = false
    failed.value = false
    nextTick(checkComplete)
  },
)
onMounted(checkComplete)
</script>

<template>
  <span class="cover">
    <span class="cover__record" aria-hidden="true" />
    <img
      v-if="src && !failed"
      ref="img"
      :key="src"
      :src="src"
      alt=""
      class="cover__img"
      :data-loaded="loaded ? '' : undefined"
      @load="loaded = true"
      @error="failed = true"
    />
  </span>
</template>

<style scoped>
.cover {
  position: relative;
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
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
}

.cover__img[data-loaded] {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .cover__img {
    transition: opacity 0.35s var(--ease-out);
  }
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
