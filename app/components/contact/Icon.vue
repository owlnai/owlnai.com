<script setup lang="ts">
import { siBluesky, siDevdotto, siGithub, siTwitch, siX } from 'simple-icons'

// A social network's glyph on simple-icons' 24 × 24 grid, in the text colour.
// LinkedIn asked simple-icons to drop its logo, so it gets the letters instead.
const props = withDefaults(defineProps<{ id: string; size?: number }>(), { size: 16 })

const glyphs: Record<string, string> = {
  github: siGithub.path,
  bluesky: siBluesky.path,
  twitch: siTwitch.path,
  dev: siDevdotto.path,
  x: siX.path,
}

const path = computed(() => glyphs[props.id])
</script>

<template>
  <svg v-if="path" class="icon" viewBox="0 0 24 24" :width="size" :height="size" aria-hidden="true">
    <path :d="path" />
  </svg>
  <span v-else class="icon icon--text" :style="{ fontSize: `${size * 0.8}px` }" aria-hidden="true">in</span>
</template>

<style scoped>
.icon {
  flex: none;
  fill: currentColor;
}

.icon--text {
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}
</style>
