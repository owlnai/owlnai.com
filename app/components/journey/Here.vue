<template>
  <!-- A scrap of map: a dotted trail ending at a pin -->
  <div class="here" aria-hidden="true">
    <div class="here__map">
      <svg viewBox="0 0 240 120" width="240" height="120" class="here__trail">
        <path d="M-4 108C40 106 46 72 84 74S130 100 152 80 164 42 174 46" />
      </svg>
      <span class="here__pulse" />
      <svg viewBox="0 0 24 32" width="21" height="28" class="here__pin">
        <path d="M12 0C5.4 0 0 5.2 0 11.6 0 20.3 12 32 12 32s12-11.7 12-20.4C24 5.2 18.6 0 12 0z" />
        <circle cx="12" cy="11.5" r="4.5" />
      </svg>
    </div>
    <p class="here__label mono">You are here</p>
  </div>
</template>

<style scoped>
.here__map {
  position: relative;
  width: 240px;
  max-width: 100%;
  height: 120px;
  overflow: hidden;
  border-radius: 0.5rem;
  background:
    repeating-linear-gradient(to right, var(--line) 0 1px, transparent 1px 20px),
    repeating-linear-gradient(to bottom, var(--line) 0 1px, transparent 1px 20px);
}

.here__trail {
  position: absolute;
  inset: 0;
}

.here__trail path {
  fill: none;
  stroke: var(--ink-faint);
  stroke-dasharray: 3 4;
  stroke-width: 1.25;
}

/* The pin's tip sits at (174, 46) */
.here__pin {
  position: absolute;
  top: calc(46px - 28px);
  left: calc(174px - 10.5px);
}

.here__pin path {
  fill: var(--accent);
}

.here__pin circle {
  fill: var(--raised);
}

.here__pulse {
  position: absolute;
  top: calc(46px - 4px);
  left: calc(174px - 10px);
  width: 20px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.35;
}

@media (prefers-reduced-motion: no-preference) {
  .here__pulse {
    animation: here-pulse 2.4s var(--ease-out) infinite;
  }
}

@keyframes here-pulse {
  from {
    opacity: 0.5;
    scale: 0.6;
  }
  to {
    opacity: 0;
    scale: 2.4;
  }
}

.here__label {
  margin-top: 0.75rem;
  color: var(--ink-faint);
  font-size: 0.625rem;
}
</style>
