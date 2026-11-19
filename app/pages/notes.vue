<script setup lang="ts">
const { data: notes } = await useAsyncData('notes', () => queryCollection('notes').order('stem', 'ASC').all())

useSeoMeta({
  title: 'Notes',
  description: 'Short notes and things Unai Mengual keeps coming back to.',
})
</script>

<template>
  <div>
    <PageIntro title="Notes." />

    <ul class="notes">
      <li v-for="note in notes" :key="note.path" class="note">
        <time v-if="note.date" class="note__date mono" :datetime="note.date">{{ monthYear(note.date) }}</time>
        <ContentRenderer :value="note" class="note__body display" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.notes {
  border-top: 1px solid var(--line);
}

.note {
  display: grid;
  grid-template-columns: calc(var(--label-col) - var(--gutter)) minmax(0, 1fr);
  align-items: baseline;
  gap: var(--gutter);
  padding: 2rem var(--gutter) 2.2rem;
}

.note + .note {
  border-top: 1px solid var(--line);
}

.note__date {
  color: var(--ink-faint);
  font-size: 0.6875rem;
}

.note__body {
  grid-column: 2;
  max-width: 20ch;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-style: italic;
  font-weight: 470;
  letter-spacing: -0.02em;
  line-height: 1.05;
}

@media (max-width: 52rem) {
  .note {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.5rem;
  }

  .note__body {
    grid-column: 1;
  }
}
</style>
