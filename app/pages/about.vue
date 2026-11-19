<script setup lang="ts">
import { milestones, person } from '~/data/site'

const { data: page } = await useAsyncData('about', () => queryCollection('content').path('/about').first())

useSeoMeta({
  title: 'About',
  description:
    'About Unai Mengual, also known as owlnai: tech lead, full-stack developer and open source contributor based in Spain.',
})
</script>

<template>
  <div>
    <PageIntro title="Wikis first, then everything else." />

    <SectionBlock id="story" title="Story">
      <template #aside>
        <figure class="portrait">
          <NuxtImg src="/icon.png" :alt="`Portrait of ${person.name}`" width="320" height="320" sizes="160px" />
        </figure>
      </template>
      <article class="story">
        <ContentRenderer v-if="page" :value="page" class="prose" />
      </article>
    </SectionBlock>

    <SectionBlock id="timeline" title="Timeline">
      <Timeline aria-label="Timeline" class="timeline">
        <TimelineItem v-for="item in milestones" :key="item.year" class="timeline__item">
          <TimelineMarker class="timeline__marker" />
          <TimelineConnector class="timeline__connector" />
          <TimelineTime class="timeline__time mono" :datetime="item.dateTime">{{ item.year }}</TimelineTime>
          <TimelineTitle class="timeline__title display">{{ item.title }}</TimelineTitle>
          <TimelineDescription class="timeline__desc">{{ item.description }}</TimelineDescription>
        </TimelineItem>
      </Timeline>
    </SectionBlock>
  </div>
</template>

<style scoped>
.portrait img {
  width: 100%;
  max-width: 10rem;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid var(--line-strong);
  filter: grayscale(1) contrast(1.04);
  transition: filter 0.4s;
}

.portrait:hover img {
  filter: none;
}

.story {
  padding: 2rem var(--gutter) 2.5rem;
}

.timeline {
  padding: 2rem var(--gutter) 1.5rem;
}

.timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 4rem 1rem minmax(0, 1fr);
  column-gap: 1rem;
  padding-bottom: 1.75rem;
  outline-offset: 6px;
}

.timeline__time {
  grid-column: 1;
  grid-row: 1;
  padding-top: 0.5rem;
  color: var(--ink-faint);
  font-size: 0.6875rem;
}

.timeline__marker {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  width: 9px;
  height: 9px;
  margin-top: 0.65rem;
  border: 1px solid var(--ink);
  background: var(--paper);
  rotate: 45deg;
}

.timeline__item:first-child .timeline__marker {
  background: var(--accent);
  border-color: var(--accent);
}

.timeline__connector {
  position: absolute;
  top: 1.6rem;
  bottom: -0.4rem;
  left: calc(4rem + 1rem + 0.5rem);
  width: 1px;
  background: var(--line-strong);
}

.timeline__item:last-child {
  padding-bottom: 0.5rem;
}

.timeline__item:last-child .timeline__connector {
  display: none;
}

.timeline__title {
  grid-column: 3;
  grid-row: 1;
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.3;
}

.timeline__desc {
  grid-column: 3;
  max-width: 34rem;
  margin-top: 0.35rem;
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.5;
}

@media (max-width: 52rem) {
  .portrait img {
    max-width: 4rem;
  }
}

@media (max-width: 30rem) {
  .timeline__item {
    grid-template-columns: 3rem 1rem minmax(0, 1fr);
    column-gap: 0.75rem;
  }

  .timeline__connector {
    left: calc(3rem + 0.75rem + 0.5rem);
  }
}
</style>
