<script setup lang="ts">
// A block on a baseplate with a move gizmo, and the tool switch of a 3D building app. Not any real app's UI.
const tools = ['Select', 'Move', 'Scale', 'Rotate']
const active = 'Move'

// Baseplate grid lines, parallel to its two edges (the plate is a 2:1 diamond around 120,92). Each family
// starts at the midline between two opposite edges and steps along those edges by t.
const grid = [-0.5, 0, 0.5].flatMap((t) => [
  // Down-right lines, from the upper-left edge to the lower-right edge
  { x1: 80 + 40 * t, y1: 72 - 20 * t, x2: 160 + 40 * t, y2: 112 - 20 * t },
  // Down-left lines, from the upper-right edge to the lower-left edge
  { x1: 160 + 40 * t, y1: 72 + 20 * t, x2: 80 + 40 * t, y2: 112 + 20 * t },
])

// The move gizmo, from the centre of the block's top face: up, and along the plate's two 2:1 directions.
// Each arrow is drawn twice, a wide outline in the card's colour first, so it stands clear of the block's edges.
const axes = [
  { axis: 'y', x2: 120, y2: 24, head: '120,14 115,24 125,24' },
  { axis: 'x', x2: 161.1, y2: 80.6, head: '170.1,85 158.9,85.1 163.3,76.1' },
  { axis: 'z', x2: 78.9, y2: 80.6, head: '69.9,85 81.1,85.1 76.7,76.1' },
]
</script>

<template>
  <div class="build" aria-hidden="true">
    <svg viewBox="0 0 240 136" width="240" height="136" class="build__scene">
      <path d="M40 92 120 52 200 92 120 132Z" class="build__plate" />
      <line v-for="(line, index) in grid" :key="index" v-bind="line" class="build__grid" />

      <path d="M92 60 120 74 120 106 92 92Z" class="build__face" data-face="left" />
      <path d="M120 74 148 60 148 92 120 106Z" class="build__face" data-face="right" />
      <path d="M92 60 120 46 148 60 120 74Z" class="build__face" data-face="top" />

      <g v-for="layer in ['outline', 'arrow']" :key="layer" class="build__gizmo" :data-layer="layer">
        <g v-for="arrow in axes" :key="arrow.axis" :data-axis="arrow.axis">
          <line x1="120" y1="60" :x2="arrow.x2" :y2="arrow.y2" />
          <polygon :points="arrow.head" />
        </g>
      </g>
      <rect x="116.5" y="56.5" width="7" height="7" class="build__origin" />
    </svg>

    <div class="build__tools mono">
      <span v-for="tool in tools" :key="tool" :data-active="tool === active ? '' : undefined">{{ tool }}</span>
    </div>
  </div>
</template>

<style scoped>
.build__scene {
  display: block;
  max-width: 100%;
  height: auto;
  overflow: visible;
}

.build__plate {
  fill: color-mix(in oklab, var(--accent) 8%, var(--raised));
  stroke: var(--line-strong);
  stroke-width: 1;
}

.build__grid {
  stroke: var(--line-strong);
  stroke-width: 1;
  stroke-dasharray: 2 3;
}

.build__face {
  stroke: var(--ink);
  stroke-width: 1.25;
  stroke-linejoin: round;
}

.build__face[data-face='top'] {
  fill: var(--raised);
}

.build__face[data-face='left'] {
  fill: color-mix(in oklab, var(--ink) 8%, var(--raised));
}

.build__face[data-face='right'] {
  fill: color-mix(in oklab, var(--ink) 18%, var(--raised));
}

.build__gizmo line,
.build__gizmo polygon {
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.build__gizmo[data-layer='outline'] :is(line, polygon) {
  fill: var(--raised);
  stroke: var(--raised);
  stroke-width: 5;
}

.build__gizmo[data-layer='arrow'] [data-axis='y'] {
  stroke: var(--accent);
  fill: var(--accent);
}

.build__gizmo[data-layer='arrow'] [data-axis='x'] {
  stroke: var(--ink);
  fill: var(--ink);
}

.build__gizmo[data-layer='arrow'] [data-axis='z'] {
  stroke: var(--ink-soft);
  fill: var(--ink-soft);
}

.build__origin {
  fill: var(--raised);
  stroke: var(--ink);
  stroke-width: 1.5;
}

/* The same pill switch as the theme switch in the footer */
.build__tools {
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding: 0.2rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--ink-soft);
  font-size: 0.5625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.build__tools span {
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
}

.build__tools [data-active] {
  background: var(--ink);
  color: var(--paper);
}
</style>
