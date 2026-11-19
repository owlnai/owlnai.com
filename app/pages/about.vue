<script setup lang="ts">
import { community, facts, milestones, names, person, socials } from '~/data/site'

const { data: page } = await useAsyncData('about', () => queryCollection('content').path('/about').first())

useSeoMeta({
  title: 'About',
  description:
    'About Unai Mengual, also known as owlnai. Tech lead at MRM in Spain, founder of the web design studio sector9 and of Songbird Labs.',
})
</script>

<template>
  <article>
    <PageIntro title="One person, three names." />

    <div class="about">
      <span class="cross" data-at="tl" />
      <span class="cross" data-at="tr" />

      <!-- An infobox, the way a wiki would file a person -->
      <aside class="infobox" aria-label="At a glance">
        <figure class="infobox__portrait">
          <NuxtImg src="/icon.png" :alt="`Portrait of ${person.name}`" width="460" height="460" />
        </figure>
        <p class="infobox__name display">{{ person.name }}</p>
        <dl class="infobox__facts">
          <div v-for="fact in facts" :key="fact.label">
            <dt class="mono">{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
          <div>
            <dt class="mono">Online</dt>
            <dd class="infobox__links">
              <a v-for="social in socials.slice(0, 3)" :key="social.id" :href="social.href" class="link" rel="me">{{
                social.name
              }}</a>
            </dd>
          </div>
        </dl>
      </aside>

      <div class="about__main">
        <section class="block">
          <ContentRenderer v-if="page" :value="page" class="prose bio" />
        </section>

        <section class="block" aria-labelledby="names-title">
          <h2 id="names-title" class="block__title display">Three names</h2>
          <ul class="list">
            <li v-for="name in names" :key="name.name">
              <a :href="name.href" class="entry entry--logo">
                <img :src="name.logo" alt="" width="40" height="40" loading="lazy" class="entry__logo" />
                <span class="entry__title display">{{ name.name }}</span>
                <span class="entry__desc">{{ name.description }}</span>
                <span class="entry__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </section>

        <section class="block" aria-labelledby="community-title">
          <h2 id="community-title" class="block__title display">Community</h2>
          <ul class="list">
            <li v-for="item in community" :key="item.title">
              <component :is="item.href ? 'a' : 'div'" :href="item.href" class="entry">
                <span class="entry__title display">{{ item.title }}</span>
                <span class="entry__desc">{{ item.description }}</span>
                <span v-if="item.href" class="entry__arrow" aria-hidden="true">↗</span>
              </component>
            </li>
          </ul>
        </section>

        <section class="block" aria-labelledby="timeline-title">
          <h2 id="timeline-title" class="block__title display">Timeline</h2>
          <Timeline aria-labelledby="timeline-title" class="timeline">
            <TimelineItem v-for="item in milestones" :key="item.year" class="timeline__item">
              <TimelineMarker class="timeline__marker" />
              <TimelineConnector class="timeline__connector" />
              <TimelineTime class="timeline__time mono" :datetime="item.dateTime">{{ item.year }}</TimelineTime>
              <TimelineTitle class="timeline__title display">{{ item.title }}</TimelineTitle>
              <TimelineDescription class="timeline__desc">{{ item.description }}</TimelineDescription>
            </TimelineItem>
          </Timeline>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
.about {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 19rem;
  border-top: 1px solid var(--line);
}

.about__main {
  grid-column: 1;
  grid-row: 1;
  min-width: 0;
}

.infobox {
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  position: sticky;
  top: 4.5rem;
  margin: var(--gutter);
  border: 1px solid var(--line-strong);
  background: var(--raised);
}

.about::after {
  content: '';
  position: absolute;
  inset-block: 0;
  right: 19rem;
  width: 1px;
  background: var(--line);
}

.infobox__portrait img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-bottom: 1px solid var(--line-strong);
  filter: grayscale(1) contrast(1.04);
  transition: filter 0.4s;
}

.infobox:hover .infobox__portrait img {
  filter: none;
}

.infobox__name {
  padding: 0.9rem 1rem 0.8rem;
  border-bottom: 1px solid var(--line);
  font-size: 1.25rem;
  letter-spacing: -0.035em;
}

.infobox__facts {
  margin: 0;
}

.infobox__facts > div {
  display: grid;
  grid-template-columns: 5.25rem minmax(0, 1fr);
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.6rem 1rem;
}

.infobox__facts > div + div {
  border-top: 1px solid var(--line);
}

.infobox__facts dt {
  color: var(--ink-faint);
  font-size: 0.625rem;
}

.infobox__facts dd {
  margin: 0;
  font-size: 0.9375rem;
}

.infobox__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.75rem;
}

.block {
  padding: 2rem var(--gutter) 2.5rem;
}

.block + .block {
  border-top: 1px solid var(--line);
}

.block__title {
  margin-bottom: 1.25rem;
  font-size: 1.5rem;
  letter-spacing: -0.035em;
}

.bio {
  font-size: 1.125rem;
}

.bio :deep(p:first-child) {
  color: var(--ink);
  font-size: clamp(1.25rem, 2.2vw, 1.625rem);
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.list {
  margin-inline: calc(var(--gutter) * -1);
  border-top: 1px solid var(--line);
}

.list > li {
  border-bottom: 1px solid var(--line);
}

.block:has(.list) {
  padding-bottom: 0;
}

.block:has(.list) .list > li:last-child {
  border-bottom: 0;
}

.entry {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1rem;
  gap: 0.25rem 1rem;
  padding: 1.1rem var(--gutter) 1.2rem;
  transition: background-color 0.2s;
}

.entry--logo {
  grid-template-columns: 2.5rem minmax(0, 1fr) 1rem;
}

a.entry:hover {
  background: var(--sunken);
}

.entry__logo {
  grid-row: span 2;
  align-self: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--line-strong);
  border-radius: 0.5rem;
  object-fit: cover;
}

.entry__title {
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.entry__desc {
  grid-row: 2;
  max-width: 34rem;
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.entry--logo .entry__desc {
  grid-column: 2;
}

.entry__arrow {
  grid-row: 1;
  grid-column: -2;
  color: var(--ink-faint);
  transition:
    translate 0.25s var(--ease-out),
    color 0.2s;
}

a.entry:hover .entry__arrow {
  color: var(--ink);
  translate: 2px -2px;
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
  padding-bottom: 0;
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

@media (max-width: 56rem) {
  .about {
    grid-template-columns: minmax(0, 1fr);
  }

  .about::after {
    display: none;
  }

  .infobox,
  .about__main {
    grid-column: 1;
    grid-row: auto;
  }

  .infobox {
    position: static;
    margin-bottom: 0;
  }

  .infobox__portrait img {
    aspect-ratio: 16 / 10;
    object-position: 50% 22%;
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
