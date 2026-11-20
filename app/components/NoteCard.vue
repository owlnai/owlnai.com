<script setup lang="ts">
import type { NotesCollectionItem } from '@nuxt/content'

defineProps<{ note: NotesCollectionItem }>()
</script>

<template>
  <article class="note" :data-kind="note.kind">
    <ContentRenderer :value="note" class="note__body" />
    <p v-if="note.kind === 'code' && note.caption" class="note__caption">{{ note.caption }}</p>
    <p v-if="note.kind === 'quote' && note.author" class="note__source">
      <a v-if="note.url" :href="note.url" class="link">{{ note.author }}</a>
      <template v-else>{{ note.author }}</template>
    </p>
    <p v-else-if="note.url" class="note__source">
      <NuxtLink :to="note.url" class="link">From the post</NuxtLink>
    </p>
  </article>
</template>

<style scoped>
.note {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  height: 100%;
  min-width: 0;
  padding: 2rem var(--gutter) 2.1rem;
}

.note__body {
  min-width: 0;
  font-size: clamp(1.25rem, 2.2vw, 1.625rem);
  font-weight: 550;
  letter-spacing: -0.035em;
  line-height: 1.2;
  text-wrap: balance;
}

.note[data-kind='quote'] .note__body {
  font-style: italic;
  font-weight: 450;
}

.note[data-kind='quote'] .note__body :deep(p)::before {
  content: open-quote;
}

.note[data-kind='quote'] .note__body :deep(p)::after {
  content: close-quote;
}

.note[data-kind='code'] .note__body {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.6;
}

.note__body :deep(pre) {
  margin: 0;
  padding: 0.9rem 1rem;
  overflow-x: auto;
  border: 1px solid var(--line);
  background: var(--sunken);
  font-family: var(--font-mono);
  tab-size: 2;
}

.note__body :deep(code) {
  font-family: var(--font-mono);
}

.note__caption {
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.note__source {
  margin-top: auto;
  color: var(--ink-faint);
  font-size: 0.875rem;
}
</style>
