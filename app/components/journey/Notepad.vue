<script setup lang="ts">
// A first web page, typed by hand in a plain text editor. Not any real app's UI.
const lines = ['<html>', '  <body>', '    <h1>My first page</h1>', '    <marquee>Welcome!</marquee>', '  </body>', '</html>']
</script>

<template>
  <div class="notepad" aria-hidden="true">
    <div class="notepad__bar">
      <span class="notepad__title">index.html - Notepad</span>
      <span class="notepad__controls">
        <svg viewBox="0 0 10 10" width="9" height="9"><path d="M1 8h8" /></svg>
        <svg viewBox="0 0 10 10" width="9" height="9"><rect x="1.5" y="1.5" width="7" height="7" /></svg>
        <svg viewBox="0 0 10 10" width="9" height="9"><path d="M1.5 1.5l7 7M8.5 1.5l-7 7" /></svg>
      </span>
    </div>
    <div class="notepad__menu">
      <span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>
    </div>
    <div class="notepad__text mono">
      <!-- On one line: whitespace around {{ line }} would show, since the line keeps its spaces -->
      <!-- prettier-ignore -->
      <div v-for="(line, index) in lines" :key="index" class="notepad__line">{{ line }}<span v-if="index === lines.length - 1" class="notepad__caret" /></div>
    </div>
  </div>
</template>

<style scoped>
.notepad {
  width: 15rem;
  max-width: 100%;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  border-radius: 0.4rem;
  background: var(--paper);
}

.notepad__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.35rem 0.55rem;
  border-bottom: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 0.625rem;
}

.notepad__controls {
  display: flex;
  gap: 0.6rem;
}

.notepad__controls svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
}

.notepad__menu {
  display: flex;
  gap: 0.6rem;
  padding: 0.25rem 0.55rem;
  border-bottom: 1px solid var(--line);
  color: var(--ink-faint);
  font-size: 0.5625rem;
}

/* The site's .mono is an uppercase label style; code stays as typed */
.notepad__text {
  padding: 0.55rem 0.65rem 0.7rem;
  color: var(--ink);
  font-size: 0.625rem;
  line-height: 1.6;
  letter-spacing: 0;
  text-transform: none;
}

/* Keeps each line's leading spaces, the way they were typed */
.notepad__line {
  white-space: pre;
}

.notepad__caret {
  display: inline-block;
  width: 1px;
  height: 1.1em;
  margin-inline-start: 1px;
  background: var(--ink);
  vertical-align: -0.2em;
}

@media (prefers-reduced-motion: no-preference) {
  .notepad__caret {
    animation: notepad-blink 1.1s steps(1) infinite;
  }
}

@keyframes notepad-blink {
  50% {
    opacity: 0;
  }
}
</style>
