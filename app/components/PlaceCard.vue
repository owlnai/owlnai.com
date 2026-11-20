<script setup lang="ts">
import type { PlacesCollectionItem } from '@nuxt/content'
import { flags } from '~/data/flags'

const props = defineProps<{ place: PlacesCollectionItem }>()

const flag = computed(() => (props.place.country ? flags[props.place.country] : undefined))
</script>

<template>
  <NuxtLink :to="place.path" class="place">
    <span class="place__cover" :data-empty="place.cover ? undefined : ''">
      <img v-if="place.cover" :src="place.cover" alt="" loading="lazy" />
    </span>
    <span class="place__text">
      <span class="place__title display">
        <img v-if="flag" :src="flag.src" :alt="flag.name" width="20" height="20" class="place__flag" />
        {{ place.title }}
      </span>
      <time class="place__date mono" :datetime="place.date">{{ monthYear(place.date) }}</time>
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

.place:hover {
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
  filter: grayscale(1) contrast(1.04);
  transition:
    filter 0.4s,
    scale 0.6s var(--ease-out);
}

.place:hover .place__cover img {
  filter: none;
  scale: 1.03;
}

.place__text {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem var(--gutter) 1.5rem;
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
</style>
