<script setup lang="ts">
import { person } from '~/data/site'

// Read once when the page renders and carried to the client in the payload, so hydration
// never sees a different year (a page prerendered on 31 December and opened on 1 January)
const year = useState('footer-year', () => new Date().getFullYear())
</script>

<template>
  <footer class="footer">
    <span class="cross" data-at="tl" />
    <span class="cross" data-at="tr" />
    <p class="footer__sign display">Be kind.</p>
    <div class="footer__row">
      <p class="footer__note">© {{ year }} {{ person.name }}</p>
      <ThemeSwitch />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: clamp(2.5rem, 7vw, 4.5rem) var(--gutter) 2rem;
  border-top: 1px solid var(--line);
}

.footer__sign {
  font-size: clamp(2.75rem, 9.5vw, 6rem);
  font-style: italic;
  font-weight: 500;
  letter-spacing: -0.06em;
  color: var(--ink);
}

.footer__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  margin-top: clamp(2rem, 5vw, 3.5rem);
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
}

.footer__note {
  color: var(--ink-faint);
  font-size: 0.875rem;
}
</style>
