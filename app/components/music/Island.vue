<script setup lang="ts">
/*
 * What I'm listening to, growing out of the owlnai pill only while a track is actually playing.
 * Closed, it's a cover and bouncing bars. On a desktop it widens to the song and artist on hover or focus;
 * on a phone, where the header has no room, a tap drops the same details down in a small card.
 * The button toggles it open either way, and Escape or a tap elsewhere closes it.
 */
const { track, playing } = useNowPlaying()
const open = ref(false)
const root = ref<HTMLElement>()

watch(playing, (on) => {
  if (!on) open.value = false
})

function onPointerDown(event: PointerEvent) {
  if (open.value && !root.value?.contains(event.target as Node)) open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKeydown)
})

const label = computed(() => (track.value ? `Listening to ${track.value.name} by ${track.value.artist}` : ''))
</script>

<template>
  <div
    ref="root"
    class="island"
    :data-live="playing ? '' : undefined"
    :data-open="open ? '' : undefined"
    :inert="!playing"
  >
    <div class="island__inner">
      <button type="button" class="island__toggle" :aria-label="label" :aria-expanded="open" @click="open = !open">
        <MusicCover :src="track?.cover?.small" class="island__cover" />
        <MusicBars :playing="playing" />
      </button>
      <!-- Desktop: the details open inline, inside the pill -->
      <div class="island__more">
        <a v-if="track" :href="track.url" class="island__track">
          <span class="island__name">{{ track.name }}</span>
          <span class="island__artist">{{ track.artist }}</span>
        </a>
      </div>
    </div>
    <!-- Phone: the same details in a card under the pill -->
    <a v-if="track" :href="track.url" class="island__card">
      <MusicCover :src="track.cover?.large" class="island__card-cover" />
      <span class="island__card-text">
        <span class="island__card-lead"><MusicBars :playing="playing" /> Listening to</span>
        <span class="island__name">{{ track.name }}</span>
        <span class="island__artist">{{ track.artist }}</span>
      </span>
    </a>
  </div>
</template>

<style scoped>
/* Closed to nothing until a track plays, then the grid column eases open to the island's own width */
.island {
  display: grid;
  grid-template-columns: 0fr;
  align-self: stretch;
  transition: grid-template-columns 0.5s var(--ease-out);
}

.island[data-live] {
  grid-template-columns: 1fr;
}

.island__inner {
  display: flex;
  align-items: center;
  min-width: 0;
  overflow: hidden;
  /* The seam between the name and the island, clipped away with it when closed */
  box-shadow: inset 1px 0 var(--line);
}

.island__toggle {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  padding: 0 0.85rem 0 0.6rem;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 0.9375rem;
  cursor: pointer;
}

.island__toggle:focus-visible {
  outline-offset: -3px;
}

.island__cover {
  width: 1.5rem;
  border-radius: 0.35rem;
}

/* The details: a second column inside the pill, also easing open from nothing */
.island__more {
  display: grid;
  grid-template-columns: 0fr;
  transition: grid-template-columns 0.45s var(--ease-out);
}

.island[data-open] .island__more,
.island:focus-within .island__more {
  grid-template-columns: 1fr;
}

@media (hover: hover) {
  .island:hover .island__more {
    grid-template-columns: 1fr;
  }
}

.island__track {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  max-width: 14rem;
  overflow: hidden;
  padding-inline-end: 1rem;
  line-height: 1.15;
  white-space: nowrap;
}

.island__name,
.island__artist {
  overflow: hidden;
  text-overflow: ellipsis;
}

.island__name {
  color: var(--ink);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.island__artist {
  color: var(--ink-faint);
  font-size: 0.75rem;
}

.island__track:hover .island__name {
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 0.2em;
}

.island__card {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .island,
  .island__more {
    transition: none;
  }
}

/* On a phone the header holds just the pill and search, so the details drop down instead */
@media (max-width: 44rem) {
  .island__more {
    display: none;
  }

  .island__card {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    display: flex;
    gap: 0.85rem;
    align-items: center;
    width: min(20rem, calc(100vw - var(--gutter) * 2));
    padding: 0.6rem 1rem 0.6rem 0.6rem;
    border: 1px solid var(--line-strong);
    border-radius: 1.1rem;
    background: var(--raised);
    box-shadow: 0 16px 40px -18px var(--shadow);
    opacity: 0;
    translate: 0 -0.35rem;
    pointer-events: none;
    transition:
      opacity 0.2s,
      translate 0.3s var(--ease-out);
  }

  .island[data-open] .island__card {
    opacity: 1;
    translate: 0 0;
    pointer-events: auto;
  }

  /* Hidden from everyone while closed, so keyboard and screen readers don't land in an invisible card */
  .island:not([data-open]) .island__card {
    visibility: hidden;
    transition:
      opacity 0.2s,
      translate 0.3s var(--ease-out),
      visibility 0s 0.3s;
  }

  .island__card-cover {
    width: 3.25rem;
    border-radius: 0.6rem;
  }

  .island__card-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    line-height: 1.25;
  }

  .island__card-lead {
    display: inline-flex;
    gap: 0.4rem;
    align-items: center;
    margin-bottom: 0.15rem;
    color: var(--ink-faint);
    font-family: var(--font-mono);
    font-size: 0.6875rem;
  }

  .island__card .island__name {
    font-size: 0.9375rem;
    white-space: nowrap;
  }

  .island__card .island__artist {
    font-size: 0.8125rem;
    white-space: nowrap;
  }
}
</style>
