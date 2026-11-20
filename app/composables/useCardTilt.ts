/*
 * Tilts a card toward the pointer. Bind onMove/onLeave on a wrapper that doesn't move (so the tilt doesn't feed
 * back into itself) and `card` on the element that tilts. It sets, on that element:
 *   --rx / --ry  rotation in deg, --mx / --my  pointer position 0–100, --active  0 or 1, and [data-active].
 * Touch and reduced motion leave the card at rest.
 */
export function useCardTilt({ x = 16, y = 22 } = {}) {
  const card = ref<HTMLElement>()
  let frame = 0

  function onMove(event: PointerEvent) {
    const el = card.value
    if (!el || event.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect()
    const px = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width))
    const py = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height))
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${((0.5 - py) * x).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${((px - 0.5) * y).toFixed(2)}deg`)
      el.style.setProperty('--mx', (px * 100).toFixed(1))
      el.style.setProperty('--my', (py * 100).toFixed(1))
      el.style.setProperty('--active', '1')
      el.dataset.active = ''
    })
  }

  function onLeave() {
    const el = card.value
    if (!el) return
    cancelAnimationFrame(frame)
    for (const name of ['--rx', '--ry', '--mx', '--my', '--active']) el.style.removeProperty(name)
    delete el.dataset.active
  }

  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return { card, onMove, onLeave }
}
