<script setup lang="ts">
defineProps<{ id: string; title: string }>()
</script>

<template>
  <section :id="id" class="section" :aria-labelledby="`${id}-title`">
    <span class="cross" data-at="tl" />
    <span class="cross" data-at="tr" />
    <header class="section__head">
      <h2 :id="`${id}-title`" class="section__title mono">{{ title }}</h2>
      <div v-if="$slots.aside" class="section__aside">
        <slot name="aside" />
      </div>
    </header>
    <div class="section__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  display: grid;
  grid-template-columns: var(--label-col) minmax(0, 1fr);
  border-top: 1px solid var(--line);
}

.section__head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: var(--space-section) var(--gutter);
}

.section__title {
  font-weight: 500;
  color: var(--ink);
}

.section__aside {
  color: var(--ink-faint);
  font-size: 0.875rem;
  line-height: 1.5;
}

.section__body {
  min-width: 0;
  border-inline-start: 1px solid var(--line);
}

@media (max-width: 52rem) {
  .section {
    grid-template-columns: minmax(0, 1fr);
  }

  .section__head {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--space-section);
    padding-bottom: 1.75rem;
  }

  .section__body {
    border-inline-start: 0;
  }
}
</style>
