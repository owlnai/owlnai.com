<script setup lang="ts">
import type { Place } from '#shared/content'
import { home } from '~/data/site'
import { worldDots } from '~/data/world-dots'

// A dotted map framed around the places visited: land as a grid of dots, a holographic pin for each place
// and an arc to it from home. Pins are links. Hovering a pin or its card (via `active`) lights up both.
const props = withDefaults(
  defineProps<{ places: Place[]; active?: string | null; aspect?: number }>(),
  { active: null, aspect: 2 },
)
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

// Land left off the map, as [lng, lat] outlines: Greenland, whose bulk sat at the top of the frame and
// drew the eye away from the places. The outline runs between it and Iceland and Canada's islands.
const hidden: [number, number][][] = [
  [
    [-73.8, 77.8], [-60, 82.5], [-30, 84.5], [-8, 82], [-16, 75], [-20, 70], [-25, 68.5],
    [-40, 64], [-43, 59], [-50, 61], [-54, 66], [-57, 72], [-62, 75.5], [-74, 76.3],
  ],
]

// Even-odd ray cast: is the point inside the outline?
const inside = ([x, y]: [number, number], ring: [number, number][]) => {
  let hit = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]!
    const [xj, yj] = ring[j]!
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

// Land as one path: each run of neighbouring dots is a single line, dashed into dots by a zero-length
// dash every CELL with round caps. Far smaller than a segment per dot.
const land = worldDots.rows
  .map((row, r) => {
    const y = r * CELL + CELL / 2
    const shift = r % 2 ? CELL / 2 : 0
    const lat = worldDots.top - r * worldDots.step
    const lng = (c: number) => c * worldDots.step - 180 + (r % 2 ? worldDots.step / 2 : 0)
    const lit = (c: number) =>
      (parseInt(row[c >> 2]!, 16) >> (3 - (c & 3))) & 1 && !hidden.some((ring) => inside([lng(c), lat], ring))
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

// The frame: everything visited plus home, with room around it, at a fixed aspect (2:1 unless told otherwise). It never zooms in closer
// than MIN_SPAN degrees across, so a few nearby trips still show the land around them, and it grows as
// the places spread out, up to the whole world.
const MIN_SPAN = 90 * scale
const view = computed(() => {
  const ASPECT = props.aspect
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

// The lights running along the arcs redraw the map on every frame, so they only run while it is on screen
const root = ref<HTMLElement>()
const onScreen = ref(true)
let observer: IntersectionObserver | undefined

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => (onScreen.value = entry?.isIntersecting ?? true))
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="root"
    class="map"
    :data-active="active ? '' : undefined"
    :data-paused="onScreen ? undefined : ''"
    :style="{ aspectRatio: `${aspect}` }"
  >
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
      <g
        v-for="(arc, i) in arcs"
        :key="arc.path"
        class="map__arc"
        :data-on="active === arc.path ? '' : undefined"
        :style="{ '--delay': `${i * 0.9}s` }"
      >
        <path :d="arc.d" class="map__route" :stroke="`url(#${gradient})`" />
        <!-- A light running from home to the place: a bright head with a tail that fades behind it -->
        <path
          v-for="len in [0.3, 0.14, 0.05]"
          :key="len"
          :d="arc.d"
          pathLength="1"
          class="map__glint"
          :stroke="`url(#${gradient})`"
          :style="{ '--len': len }"
        />
      </g>
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
/* Colours come from the --holo-* tokens in main.css */
.map {
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
  transition: opacity 0.25s;
}

.map__route,
.map__glint {
  fill: none;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
}

.map__route {
  stroke-width: 1.5;
  opacity: 0.55;
  transition:
    opacity 0.25s,
    stroke-width 0.25s;
}

/* Three stacked dashes share a leading edge: the shortest is the bright head, the longer ones the tail.
   Each is one dash of length --len on a path of length 1, slid from before the start to past the end. */
.map__glint {
  --len: 0.1;

  stroke-width: 2.5;
  stroke-dasharray: calc(var(--len) * 1px) 2px;
  stroke-dashoffset: calc(var(--len) * 1px - var(--head));
  opacity: calc(0.25 + (0.3 - var(--len)) * 3);
  animation: glint 2.8s var(--delay, 0s) cubic-bezier(0.45, 0, 0.3, 1) infinite;
}

/* Where the head is along the route, 0 at home to past the end. Registered so it can be animated. */
@property --head {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

@keyframes glint {
  0% {
    --head: 0px;
  }
  /* Arrive, then rest out of sight before the next run */
  70%,
  100% {
    --head: 1.35px;
  }
}

/* While one place is active, its route brightens and the others step back */
.map[data-active] .map__arc {
  opacity: 0.25;
}

.map[data-active] .map__arc[data-on] {
  opacity: 1;
}

.map__arc[data-on] .map__route {
  stroke-width: 2.5;
  opacity: 1;
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

/* A small holographic disc whose colours turn, with a white glint like the ticket's foil. The colours are a
   layer of their own that rotates, which the browser can do without repainting; turning the gradient's start
   angle instead repainted the disc on every frame. The glint sits still on top. */
.map__dot {
  position: relative;
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
  box-shadow:
    0 0 0 2px var(--paper),
    0 0 0 2.5px var(--line-strong);
  transition: scale 0.3s var(--ease-out);
}

.map__dot::before,
.map__dot::after {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  content: '';
}

.map__dot::before {
  background: conic-gradient(var(--holo-1), var(--holo-2), var(--holo-3), var(--holo-4), var(--holo-5), var(--holo-1));
  animation: turn 4s linear infinite;
}

.map__dot::after {
  background: radial-gradient(circle at 35% 30%, rgb(255 255 255 / 0.85), transparent 45%);
}

.map__pin[data-on] .map__dot {
  scale: 1.4;
}

/* A ring the size of the disc that swells and fades. Invisible when it is not animating. */
.map__pin::after {
  position: absolute;
  inset: 0.4375rem;
  border-radius: 50%;
  background: conic-gradient(var(--holo-1), var(--holo-2), var(--holo-3), var(--holo-4), var(--holo-5), var(--holo-1));
  content: '';
  opacity: 0;
  animation: pulse 2.4s var(--ease-out) infinite;
  pointer-events: none;
}

.map__pin[data-on]::after {
  inset: 0.3125rem;
}

.map[data-paused] .map__glint,
.map[data-paused] .map__dot::before,
.map[data-paused] .map__pin::after {
  animation-play-state: paused;
}

@keyframes turn {
  to {
    rotate: 1turn;
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
  /* Above the pin's swelling ring */
  z-index: 1;
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
  .map__glint {
    display: none;
  }

  .map__dot::before,
  .map__pin::after {
    animation: none;
  }
}
</style>
