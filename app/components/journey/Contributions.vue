<script setup lang="ts">
// An illustration of a contribution graph that fills in over time, not real data.
const weeks = 18
const days = 7

// Integer hash, so the server and every browser draw the same squares
function noise(n: number) {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b)
  x ^= x >>> 13
  x = Math.imul(x, 0xc2b2ae35)
  x ^= x >>> 16
  return (x >>> 0) / 4294967296
}

const cells = Array.from({ length: weeks * days }, (_, index) => {
  const growth = Math.floor(index / days) / (weeks - 1)
  const value = noise(index + 1) * 0.75 + growth * 0.8 - 0.35
  return Math.max(0, Math.min(4, Math.floor(value * 5)))
})
</script>

<template>
  <div class="contrib" aria-hidden="true">
    <div class="contrib__grid">
      <span v-for="(level, index) in cells" :key="index" :data-level="level" />
    </div>
    <div class="contrib__legend mono">
      Less
      <span v-for="level in 5" :key="level" :data-level="level - 1" />
      More
    </div>
  </div>
</template>

<style scoped>
.contrib__grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 10px);
  grid-auto-columns: 10px;
  gap: 3px;
}

.contrib [data-level] {
  width: 10px;
  height: 10px;
  border-radius: 2.5px;
  background: var(--line);
}

.contrib [data-level='1'] {
  background: color-mix(in oklab, var(--accent) 30%, var(--line));
}

.contrib [data-level='2'] {
  background: color-mix(in oklab, var(--accent) 55%, var(--line));
}

.contrib [data-level='3'] {
  background: color-mix(in oklab, var(--accent) 80%, var(--line));
}

.contrib [data-level='4'] {
  background: var(--accent);
}

.contrib__legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3px;
  margin-top: 0.75rem;
  color: var(--ink-faint);
  font-size: 0.625rem;
}

.contrib__legend span:first-of-type {
  margin-inline-start: 0.35rem;
}

.contrib__legend span:last-of-type {
  margin-inline-end: 0.35rem;
}
</style>
