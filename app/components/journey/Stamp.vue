<script setup lang="ts">
import { flags } from '~/data/flags'

// A place from the Places collection, drawn as a passport stamp that links to its post. Like the contact
// ticket it tilts slightly toward the pointer and catches a holographic sheen.
const props = defineProps<{
  place: { title?: string; path: string; date: string; country?: string }
  tilt?: number
}>()

const flag = computed(() => (props.place.country ? flags[props.place.country] : undefined))
const { card, onMove, onLeave } = useCardTilt({ x: 10, y: 12 })
// NuxtLink's ref is the component; the tilt needs the <a> it renders
const setCard = (link: unknown) => {
  card.value = (link as { $el?: HTMLElement } | null)?.$el
}
</script>

<template>
  <span class="stamp-stage" @pointermove="onMove" @pointerleave="onLeave">
    <NuxtLink :ref="setCard" :to="place.path" class="stamp" :style="{ '--tilt': `${tilt ?? 0}deg` }">
      <img v-if="flag" :src="flag.src" alt="" width="22" height="22" class="stamp__flag" />
      <span class="stamp__name display">{{ place.title }}</span>
      <span class="stamp__date mono">{{ monthYear(place.date) }}</span>
      <ContactFoil style="--foil-rest: 0.04; --foil-lift: 0.4" />
    </NuxtLink>
  </span>
</template>

<style scoped>
.stamp-stage {
  display: inline-block;
  perspective: 700px;
}

.stamp {
  position: relative;
  display: inline-grid;
  justify-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1.15rem 0.7rem;
  border: 1.5px solid currentColor;
  border-radius: 0.5rem;
  outline: 1px dashed currentColor;
  outline-offset: -5px;
  color: var(--ink-faint);
  rotate: var(--tilt);
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition:
    rotate 0.3s var(--ease-out),
    transform 0.5s var(--ease-out),
    color 0.2s;
}

.stamp[data-active] {
  transition:
    rotate 0.3s var(--ease-out),
    transform 0.15s var(--ease-out),
    color 0.2s;
}

.stamp:hover,
.stamp:focus-visible {
  color: var(--ink);
  rotate: 0deg;
}

.stamp:focus-visible {
  outline-style: solid;
  outline-width: 2px;
}

.stamp__flag {
  width: 22px;
  height: 22px;
}

.stamp__name {
  color: var(--ink);
  font-size: 1.125rem;
  line-height: 1;
}

.stamp__date {
  font-size: 0.625rem;
}
</style>
