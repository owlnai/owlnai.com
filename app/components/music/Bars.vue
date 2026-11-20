<script setup lang="ts">
// Three little equaliser bars in the holo colours. They bounce while a track is playing and rest otherwise.
// Sized in em, so they follow the text around them.
defineProps<{ playing?: boolean }>()
</script>

<template>
  <span class="bars" :data-playing="playing ? '' : undefined" aria-hidden="true">
    <span class="bars__bar" />
    <span class="bars__bar" />
    <span class="bars__bar" />
  </span>
</template>

<style scoped>
.bars {
  display: inline-flex;
  flex: none;
  align-items: flex-end;
  gap: 0.14em;
  width: 0.95em;
  height: 0.85em;
}

.bars__bar {
  flex: 1;
  height: 100%;
  border-radius: 1px;
  background: linear-gradient(to top, var(--holo-3), var(--holo-1));
  transform-origin: bottom;
  scale: 1 0.4;
}

.bars__bar:nth-child(2) {
  background: linear-gradient(to top, var(--holo-4), var(--holo-2));
  scale: 1 0.75;
}

.bars__bar:nth-child(3) {
  background: linear-gradient(to top, var(--holo-5), var(--holo-1));
  scale: 1 0.55;
}

@media (prefers-reduced-motion: no-preference) {
  .bars[data-playing] .bars__bar {
    animation: bounce 0.9s ease-in-out infinite alternate;
  }

  .bars[data-playing] .bars__bar:nth-child(2) {
    animation-duration: 0.65s;
    animation-delay: -0.3s;
  }

  .bars[data-playing] .bars__bar:nth-child(3) {
    animation-duration: 1.1s;
    animation-delay: -0.6s;
  }
}

@keyframes bounce {
  from {
    scale: 1 0.2;
  }
  to {
    scale: 1 1;
  }
}
</style>
