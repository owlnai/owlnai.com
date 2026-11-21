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
    <div class="footer__row">
      <p class="footer__note">© {{ year }} {{ person.name }}</p>
      <ThemeSwitch />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding: 1.5rem var(--gutter) 2rem;
  border-top: 1px solid var(--line);
}

.footer__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.footer__note {
  color: var(--ink-faint);
  font-size: 0.875rem;
}
</style>
