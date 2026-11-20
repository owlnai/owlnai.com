<script setup lang="ts">
// A type specimen, a pen-tool curve and the site's own colours
const swatches = ['var(--ink)', 'var(--ink-soft)', 'var(--line-strong)', 'var(--accent)', 'var(--accent-wash)']
</script>

<template>
  <div class="design" aria-hidden="true">
    <div class="design__top">
      <span class="design__type display">Aa</span>
      <svg class="design__pen" viewBox="0 0 120 64" width="150" height="80">
        <line x1="10" y1="54" x2="42" y2="6" class="design__handle" />
        <line x1="110" y1="10" x2="78" y2="58" class="design__handle" />
        <path d="M10 54C42 6 78 58 110 10" class="design__curve" />
        <circle cx="42" cy="6" r="2.5" class="design__knob" />
        <circle cx="78" cy="58" r="2.5" class="design__knob" />
        <rect x="6.5" y="50.5" width="7" height="7" class="design__anchor" />
        <rect x="106.5" y="6.5" width="7" height="7" class="design__anchor" />
      </svg>
    </div>
    <div class="design__swatches">
      <span v-for="color in swatches" :key="color" :style="{ background: color }" />
    </div>
  </div>
</template>

<style scoped>
.design__top {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.design__type {
  font-size: 3.25rem;
  line-height: 1;
}

.design__pen {
  overflow: visible;
}

.design__handle {
  stroke: var(--ink-faint);
  stroke-width: 1;
}

.design__curve {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.5;
}

.design__knob {
  fill: var(--ink-faint);
}

.design__anchor {
  fill: var(--raised);
  stroke: var(--accent);
  stroke-width: 1.5;
}

.design__swatches {
  display: flex;
  margin-top: 1rem;
}

.design__swatches span {
  width: 1.875rem;
  height: 1.875rem;
  border: 2px solid var(--raised);
  border-radius: 50%;
}

.design__swatches span + span {
  margin-inline-start: -0.4rem;
}
</style>
