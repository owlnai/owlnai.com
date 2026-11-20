<script setup lang="ts">
/*
 * A badge hanging from a lanyard. The slot is the badge itself; this draws the printed strap and makes it
 * swing like a pendulum from the top of the strap:
 *   - a mouse arriving gives it one small push, then it settles quickly so its links are easy to click
 *   - dragging it sideways (mouse or touch) swings it, and letting go flings it
 * It sets --mx / --my as it swings so a ContactFoil inside catches the light. Reduced motion keeps it still.
 */

const root = ref<HTMLElement>()
const swing = ref<HTMLElement>()

let angle = 0
let velocity = 0
let frame = 0
let dragging = false
let grabOffset = 0
let hovering = false

const maxAngle = 40
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

function apply() {
  const el = swing.value
  if (!el) return
  el.style.setProperty('--angle', `${angle.toFixed(2)}deg`)
  el.style.setProperty('--mx', (50 - angle * 2.5).toFixed(1))
  el.style.setProperty('--my', (30 + Math.abs(angle)).toFixed(1))
}

// A damped spring pulling the badge back to hanging straight down. Under the pointer it settles much faster,
// so the links stay still enough to click.
function step() {
  velocity += -angle * 0.045
  velocity *= hovering ? 0.82 : 0.95
  angle = Math.max(-maxAngle, Math.min(maxAngle, angle + velocity))
  apply()
  if (Math.abs(angle) < 0.02 && Math.abs(velocity) < 0.02) {
    angle = 0
    velocity = 0
    apply()
    frame = 0
    return
  }
  frame = requestAnimationFrame(step)
}

function settle() {
  if (!frame) frame = requestAnimationFrame(step)
}

// Angle of the pointer around the top of the strap; the badge's bottom follows it
function angleTo(event: PointerEvent) {
  const box = root.value!.getBoundingClientRect()
  const dx = event.clientX - (box.left + box.width / 2)
  const dy = Math.max(1, event.clientY - box.top)
  return Math.max(-maxAngle, Math.min(maxAngle, (-Math.atan2(dx, dy) * 180) / Math.PI))
}

function onDown(event: PointerEvent) {
  if (reduced() || (event.target as HTMLElement).closest('a, button')) return
  dragging = true
  // Keep the badge where it is under the pointer, rather than snapping it to point at it
  grabOffset = angleTo(event) - angle
  swing.value?.setPointerCapture(event.pointerId)
  swing.value!.dataset.dragging = ''
  cancelAnimationFrame(frame)
  frame = 0
}

function onMove(event: PointerEvent) {
  if (!dragging || reduced()) return
  const next = Math.max(-maxAngle, Math.min(maxAngle, angleTo(event) - grabOffset))
  velocity = next - angle
  angle = next
  apply()
}

// A mouse arriving gives it one small push the way it came in; after that it calms down under the pointer
function onEnter(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  hovering = true
  if (reduced() || dragging) return
  velocity += Math.max(-0.35, Math.min(0.35, -event.movementX * 0.05))
  settle()
}

function onUp(event: PointerEvent) {
  if (!dragging) return
  dragging = false
  swing.value?.releasePointerCapture(event.pointerId)
  delete swing.value!.dataset.dragging
  settle()
}

function onLeave() {
  hovering = false
}

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <div ref="root" class="lanyard">
    <div
      ref="swing"
      class="lanyard__swing"
      @pointerenter="onEnter"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
      @pointerleave="onLeave"
    >
      <span class="lanyard__strap" aria-hidden="true">
        <span class="lanyard__print">owlnai · owlnai · owlnai</span>
      </span>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lanyard {
  --strap-length: 3.75rem;
  padding-top: var(--strap-length);
}

.lanyard__swing {
  position: relative;
  transform-origin: 50% calc(var(--strap-length) * -1);
  rotate: var(--angle, 0deg);
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
}

.lanyard__swing[data-dragging] {
  cursor: grabbing;
}

.lanyard__swing :deep(img) {
  -webkit-user-drag: none;
}

/* The strap runs from the top of the box down behind the top of the badge */
.lanyard__strap {
  position: absolute;
  bottom: calc(100% - 1rem);
  left: 50%;
  width: 1.15rem;
  height: calc(var(--strap-length) + 1rem);
  overflow: hidden;
  translate: -50% 0;
  border-radius: 2px;
  background: #141416;
}

.lanyard__print {
  display: block;
  margin: 0.2rem auto 0;
  color: #f1f1ee;
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  white-space: nowrap;
  writing-mode: vertical-rl;
}
</style>
