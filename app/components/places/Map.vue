<script setup lang="ts">
import type { PlacesCollectionItem } from '@nuxt/content'
import { home } from '~/data/site'
import { worldDots } from '~/data/world-dots'

// A dotted map framed around the places visited: land as a grid of dots, a holographic pin for each place
// and an arc to it from home. Pins are links. Hovering a pin or its card (via `active`) lights up both.
const props = defineProps<{ places: PlacesCollectionItem[]; active?: string | null }>()
const emit = defineEmits<{ hover: [path: string | null] }>()

// Each cell of the land mask is CELL units wide in the SVG
const CELL = 10
const scale = CELL / worldDots.step
const worldWidth = worldDots.cols * CELL
const worldHeight = worldDots.rows.length * CELL

const project = ([lat, lng]: [number, number]) => ({
  x: (lng + 180) * scale + CELL / 2,
  y: (worldDots.top - lat) * scale + CELL / 2,
})

// Land as one path: each run of neighbouring dots is a single line, dashed into dots by a zero-length
// dash every CELL with round caps. Far smaller than a segment per dot.
const land = worldDots.rows
  .map((row, r) => {
    const y = r * CELL + CELL / 2
    const shift = r % 2 ? CELL / 2 : 0
    const lit = (c: number) => (parseInt(row[c >> 2]!, 16) >> (3 - (c & 3))) & 1
    let d = ''
    let start = -1
    for (let c = 0; c <= worldDots.cols; c++) {
      const on = c < worldDots.cols && lit(c)
      if (on && start < 0) start = c
      if (!on && start >= 0) {
        d += `M${start * CELL + CELL / 2 + shift} ${y}h${(c - 1 - start) * CELL + 0.01}`
        start = -1
      }
    }
    return d
  })
  .join('')

const origin = project(home.coords)

const pins = computed(() =>
  props.places
    .filter((place) => place.coords)
    .map((place) => ({ ...project(place.coords as [number, number]), title: place.title, path: place.path, date: place.date })),
)

// The frame: everything visited plus home, with room around it, at a fixed 2:1. It never zooms in closer
// than MIN_SPAN degrees across, so a few nearby trips still show the land around them, and it grows as
// the places spread out, up to the whole world.
const ASPECT = 2
const MIN_SPAN = 90 * scale
const view = computed(() => {
  const points = [origin, ...pins.value]
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
  let w = Math.max(MIN_SPAN, (x1 - x0) * 1.6, (y1 - y0) * 1.6 * ASPECT)
  w = Math.min(w, worldWidth)
  const h = Math.min(w / ASPECT, worldHeight)
  w = h * ASPECT
  const clamp = (v: number, size: number, max: number) => Math.min(Math.max(v, 0), max - size)
  // Sit the places a little below centre, since the arcs rise above them
  const x = clamp((x0 + x1) / 2 - w / 2, w, worldWidth)
  const y = clamp((y0 + y1) / 2 - h * 0.55, h, worldHeight)
  return { x, y, w, h, zoom: worldWidth / w }
})

// Dots get relatively smaller as the map zooms in, so they stay a fine grain rather than turning into blobs
const dot = computed(() => CELL * Math.min(0.64, 1 / Math.sqrt(view.value.zoom)))

const at = (p: { x: number; y: number }) => ({
  left: `${((p.x - view.value.x) / view.value.w) * 100}%`,
  top: `${((p.y - view.value.y) / view.value.h) * 100}%`,
})

// One arc from home to each place, bowing upward, more for longer trips
const arcs = computed(() =>
  pins.value.map((to) => {
    const lift = Math.hypot(to.x - origin.x, to.y - origin.y) * 0.4
    return {
      path: to.path,
      d: `M${origin.x} ${origin.y}Q${(origin.x + to.x) / 2} ${Math.min(origin.y, to.y) - lift} ${to.x} ${to.y}`,
    }
  }),
)

// The holo gradient runs across the frame, so arcs pick up different colours depending on where they go
const gradient = useId()
</script>

<template>
  <div class="map" :data-active="active ? '' : undefined" :style="{ aspectRatio: `${ASPECT}` }">
    <svg :viewBox="`${view.x} ${view.y} ${view.w} ${view.h}`" class="map__svg" aria-hidden="true">
      <defs>
        <linearGradient
          :id="gradient"
          gradientUnits="userSpaceOnUse"
          :x1="view.x + view.w * 0.2"
          y1="0"
          :x2="view.x + view.w * 0.8"
          y2="0"
        >
          <stop offset="0" style="stop-color: var(--holo-1)" />
          <stop offset="0.25" style="stop-color: var(--holo-2)" />
          <stop offset="0.5" style="stop-color: var(--holo-3)" />
          <stop offset="0.75" style="stop-color: var(--holo-4)" />
          <stop offset="1" style="stop-color: var(--holo-5)" />
        </linearGradient>
      </defs>
      <path :d="land" class="map__land" :style="{ strokeDasharray: `0 ${CELL}`, strokeWidth: dot }" />
      <path
        v-for="arc in arcs"
        :key="arc.path"
        :d="arc.d"
        class="map__arc"
        :data-on="active === arc.path ? '' : undefined"
        :stroke="`url(#${gradient})`"
      />
    </svg>

    <span class="map__home" :style="at(origin)">
      <span class="map__home-dot" />
      <span class="map__home-label">{{ home.label }}</span>
    </span>

    <NuxtLink
      v-for="pin in pins"
      :key="pin.path"
      :to="pin.path"
      class="map__pin"
      :data-on="active === pin.path ? '' : undefined"
      :style="at(pin)"
      @pointerenter="emit('hover', pin.path)"
      @pointerleave="emit('hover', null)"
      @focus="emit('hover', pin.path)"
      @blur="emit('hover', null)"
    >
      <span class="map__dot" />
      <span class="map__label">
        {{ pin.title }}
        <span class="map__date">{{ monthYear(pin.date) }}</span>
      </span>
    </NuxtLink>
  </div>
</template>

<style scoped>
/* The ticket's holographic colours, a little deeper on light backgrounds so they still read */
.map {
  --holo-1: light-dark(hsl(320 75% 62%), hsl(320 85% 76%));
  --holo-2: light-dark(hsl(265 70% 64%), hsl(265 85% 80%));
  --holo-3: light-dark(hsl(195 80% 50%), hsl(195 85% 72%));
  --holo-4: light-dark(hsl(150 60% 45%), hsl(150 70% 70%));
  --holo-5: light-dark(hsl(45 90% 50%), hsl(50 90% 72%));

  position: relative;
  width: 100%;
  overflow: hidden;
}

.map__svg {
  display: block;
  width: 100%;
  height: 100%;
}

.map__land {
  fill: none;
  stroke: var(--mark);
  stroke-linecap: round;
}

.map__arc {
  fill: none;
  stroke-width: 1.75;
  stroke-dasharray: 4 5;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  animation: march 1.6s linear infinite;
  transition:
    opacity 0.25s,
    stroke-width 0.25s;
}

/* While one place is active, its arc goes solid and the others step back */
.map[data-active] .map__arc {
  opacity: 0.25;
}

.map[data-active] .map__arc[data-on] {
  opacity: 1;
  stroke-width: 2.5;
  stroke-dasharray: none;
}

@keyframes march {
  to {
    stroke-dashoffset: -18;
  }
}

/* Home: a plain ink dot with its name always showing, the quiet end of every arc */
.map__home {
  position: absolute;
  display: grid;
  place-items: center;
  translate: -50% -50%;
  pointer-events: none;
}

.map__home-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--ink);
  box-shadow: 0 0 0 2px var(--paper);
}

.map__home-label {
  position: absolute;
  top: calc(100% + 0.35rem);
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  white-space: nowrap;
}

.map__pin {
  position: absolute;
  display: grid;
  place-items: center;
  width: 1.5rem;
  height: 1.5rem;
  translate: -50% -50%;
  border-radius: 50%;
}

/* A small holographic disc whose colours turn, with a white glint like the ticket's foil */
.map__dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.85), transparent 45%),
    conic-gradient(from var(--turn, 0deg), var(--holo-1), var(--holo-2), var(--holo-3), var(--holo-4), var(--holo-5), var(--holo-1));
  box-shadow:
    0 0 0 2px var(--paper),
    0 0 0 2.5px var(--line-strong);
  animation: turn 4s linear infinite;
  transition: scale 0.3s var(--ease-out);
}

.map__pin[data-on] .map__dot {
  scale: 1.4;
}

.map__dot::after {
  position: absolute;
  inset: 0.4375rem;
  border-radius: 50%;
  background: conic-gradient(var(--holo-1), var(--holo-2), var(--holo-3), var(--holo-4), var(--holo-5), var(--holo-1));
  content: '';
  animation: pulse 2.4s var(--ease-out) infinite;
  pointer-events: none;
}

@property --turn {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes turn {
  to {
    --turn: 360deg;
  }
}

@keyframes pulse {
  from {
    opacity: 0.55;
    scale: 1;
  }
  to {
    opacity: 0;
    scale: 3;
  }
}

.map__label {
  position: absolute;
  bottom: calc(100% + 0.15rem);
  left: 50%;
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: var(--raised);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  white-space: nowrap;
  opacity: 0;
  translate: -50% 0.25rem;
  pointer-events: none;
  transition:
    opacity 0.2s,
    translate 0.3s var(--ease-out);
}

.map__date {
  color: var(--ink-faint);
  font-size: 0.625rem;
}

.map__pin[data-on] {
  z-index: 1;
}

.map__pin[data-on] .map__label {
  opacity: 1;
  translate: -50% 0;
}

.map__pin:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .map__arc,
  .map__dot,
  .map__dot::after {
    animation: none;
  }
}
</style>
