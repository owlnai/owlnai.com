<script setup lang="ts">
const { data: notes } = await useAsyncData('notes', () => $fetch('/api/site/notes', { query: { body: '1' } }))

useSeoMeta({
  title: 'Notes',
  description: 'Short snippets Unai Mengual keeps: thoughts, quotes and pieces of code.',
})
defineOgImage('Site', { title: 'Notes.', description: 'Thoughts, quotes and pieces of code worth keeping.', label: 'Notes' })
</script>

<template>
  <div>
    <PageIntro title="Notes." />

    <ul class="notes">
      <li v-for="note in notes" :key="note.path">
        <NoteCard :note="note" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.notes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: clip;
  border-top: 1px solid var(--line);
}

.notes > li {
  min-width: 0;
  margin: 0 -1px -1px 0;
  border-inline-end: 1px solid var(--line);
  border-block-end: 1px solid var(--line);
}

@media (max-width: 60rem) {
  .notes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 34rem) {
  .notes {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
