<script setup lang="ts">
// glow: the card underneath is always dark, so the foil can glow (color-dodge) whatever the site theme
defineProps<{ glow?: boolean }>()
</script>

<template>
  <!--
    Holographic foil and glare for a card using useCardTilt. Drop it inside a positioned element; it reads
    --mx / --my / --active from there. Rest strength and lift on hover can be tuned with --foil-rest / --foil-lift.
  -->
  <span class="foil" :class="{ 'foil--glow': glow }" aria-hidden="true" v-bind="$attrs" />
  <span class="glare" aria-hidden="true" />
</template>

<style scoped>
.foil,
.glare {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  pointer-events: none;
  transition: opacity 0.3s;
}

/* Rainbow bands that slide with the pointer, over fine diagonal lines, brightest where the light is */
.foil {
  background:
    repeating-linear-gradient(55deg, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 4px),
    linear-gradient(
      115deg,
      transparent 22%,
      hsl(320 90% 72% / 0.55) 34%,
      hsl(265 90% 74% / 0.55) 42%,
      hsl(195 90% 66% / 0.55) 50%,
      hsl(150 80% 62% / 0.55) 58%,
      hsl(50 95% 66% / 0.55) 66%,
      transparent 78%
    );
  background-position:
    0 0,
    calc(var(--mx, 30) * 1%) calc(var(--my, 20) * 1%);
  background-size:
    auto,
    250% 250%;
  mask-image: radial-gradient(circle at calc(var(--mx, 30) * 1%) calc(var(--my, 20) * 1%), #000, transparent 75%);
  opacity: calc(var(--foil-rest, 0.22) + var(--active, 0) * var(--foil-lift, 0.38));
}

.glare {
  background: radial-gradient(
    circle at calc(var(--mx, 30) * 1%) calc(var(--my, 20) * 1%),
    rgb(255 255 255 / 0.28),
    transparent 55%
  );
  mix-blend-mode: soft-light;
  opacity: var(--active, 0);
}

/* On dark cards the foil can glow; color-dodge would just turn white on a light one */
:global([data-color-scheme='dark'] .foil) {
  mix-blend-mode: color-dodge;
  opacity: calc(var(--foil-rest, 0.22) * 2 + var(--active, 0) * var(--foil-lift, 0.38) * 1.2);
}

@media (prefers-color-scheme: dark) {
  :global([data-color-scheme='system'] .foil) {
    mix-blend-mode: color-dodge;
    opacity: calc(var(--foil-rest, 0.22) * 2 + var(--active, 0) * var(--foil-lift, 0.38) * 1.2);
  }
}

.foil--glow {
  mix-blend-mode: color-dodge;
  opacity: calc(var(--foil-rest, 0.22) * 2 + var(--active, 0) * var(--foil-lift, 0.38) * 1.2);
}
</style>
