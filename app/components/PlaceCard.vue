<script setup lang="ts">
import type { PlacesCollectionItem } from '@nuxt/content'
import { flags } from '~/data/flags'

// `memory` adds the post's one-line description under the title; `active` shows the hover state when the
// place is highlighted from elsewhere, like its pin on the map.
const props = defineProps<{ place: PlacesCollectionItem; memory?: boolean; active?: boolean }>()

const flag = computed(() => (props.place.country ? flags[props.place.country] : undefined))
</script>

<template>
  <NuxtLink :to="place.path" class="place" :data-active="active ? '' : undefined">
    <span class="place__cover" :data-empty="place.cover ? undefined : ''">
      <img v-if="place.cover" :src="place.cover" alt="" loading="lazy" />
    </span>
    <span class="place__text">
      <span class="place__title display">
        <img v-if="flag" :src="flag.src" :alt="flag.name" width="20" height="20" class="place__flag" />
        {{ place.title }}
      </span>
      <time class="place__date mono" :datetime="place.date">{{ monthYear(place.date) }}</time>
      <span v-if="memory && place.description" class="place__memory">{{ place.description }}</span>
    </span>
  </NuxtLink>
</template>

<style scoped>
.place {
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: background-color 0.2s;
}

.place:hover,
.place[data-active] {
  background: var(--sunken);
}

.place__cover {
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: var(--sunken);
}

/* A post without photos yet shows a hatched frame instead of a broken image */
.place__cover[data-empty] {
  background-image: repeating-linear-gradient(
    135deg,
    transparent 0 11px,
    var(--line) 11px 12px
  );
}

.place__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: scale 0.6s var(--ease-out);
}

.place:hover .place__cover img,
.place[data-active] .place__cover img {
  scale: 1.03;
}

.place__text {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.6rem 1rem;
  padding: var(--space-row) var(--gutter) calc(var(--space-row) + 0.1rem);
}

.place__title {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.375rem;
  letter-spacing: -0.03em;
}

.place__flag {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--line-strong);
}

.place__date {
  color: var(--ink-faint);
  font-size: 0.6875rem;
  white-space: nowrap;
}

.place__memory {
  flex-basis: 100%;
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.5;
  text-wrap: pretty;
}
</style>
