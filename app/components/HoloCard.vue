<script setup lang="ts">
/*
 * Wraps a card in the contact ticket's effects: a slight 3D tilt toward the pointer and a holographic foil
 * that follows it. Class and style land on the card itself (the element that tilts), so give it its own
 * border, background and radius there. The outer box only listens and sets the perspective.
 */
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{ glow?: boolean; x?: number; y?: number }>(), { x: 7, y: 9 })

const { card, onMove, onLeave } = useCardTilt({ x: props.x, y: props.y })
</script>

<template>
  <div class="holo" @pointermove="onMove" @pointerleave="onLeave">
    <div ref="card" class="holo__card" v-bind="$attrs">
      <slot />
      <ContactFoil :glow="glow" />
    </div>
  </div>
</template>

<style scoped>
.holo {
  perspective: 900px;
}

.holo__card {
  --foil-rest: 0.06;
  --foil-lift: 0.36;
  position: relative;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.5s var(--ease-out);
}

.holo__card[data-active] {
  transition-duration: 0.15s;
}
</style>
