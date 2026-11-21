<script setup lang="ts">
import type { Entry, EntryWithBody } from '#shared/content'
import { flags } from '~/data/flags'
import { community, milestones, names } from '~/data/site'

const { data: page, error: pageError } = await useAsyncData('about', () => $fetch<EntryWithBody<'pages'>>('/api/site/pages/about'))
assertLoaded(pageError, 'the about page')

useSeoMeta({
  title: 'About',
  description:
    'About Unai Mengual, also known as owlnai. Full-stack developer at MRM in Spain, founder of the web design studio sector9 and of Songbird Labs.',
})
defineOgImage('Site', {
  title: 'Hey! I’m Unai, from Spain.',
  description: 'Full-stack developer at MRM, founder of the web design studio sector9 and of Songbird Labs.',
  label: 'About',
})

// Where each journey step sits, as % across. Left and right alternate, a little uneven so it reads hand-placed.
const lanes = [41, 59, 43, 57, 40, 60, 44, 56]
const laneAt = (index: number) => lanes[index % lanes.length]!
// The last step's path runs straight down, so it "turns" to its own lane
const nextLaneAt = (index: number) => laneAt(index < milestones.length - 1 ? index + 1 : index)

const tilts = { contributions: -2.5, design: 2, here: -1.5 }

// Every trip becomes a stamp on the step for its year (or the latest step before it)
// Oldest first, so each step's stamps read in the order of the trips
const { data: places, error: placesError } = await useAsyncData('journey-places', async () =>
  (await $fetch<Entry<'places'>[]>('/api/site/places')).map(({ title, path, date, country }) => ({ title, path, date, country })).reverse(),
)
assertLoaded(placesError, 'places')

const stampsAt = computed(() => {
  const byStep: Record<number, NonNullable<typeof places.value>> = {}
  for (const place of places.value ?? []) {
    const year = Number(place.date.slice(0, 4))
    const step = milestones.findLastIndex((item) => Number(item.year) <= year)
    if (step !== -1) (byStep[step] ??= []).push(place)
  }
  return byStep
})
</script>

<template>
  <article>
    <PageIntro>
      <template #title>
        Hey! My name is Unai and I’m from&nbsp;Spain<img :src="flags.es!.src" alt="" width="64" height="64" class="hero-flag" />
      </template>
    </PageIntro>

    <div class="about">
      <span class="cross" data-at="tl" />
      <span class="cross" data-at="tr" />

      <!-- An all-access pass on a lanyard: photo, name and where to find me -->
      <ContactTicket id="contact" class="infobox" />

      <div class="about__main">
        <section class="block">
          <ContentBody v-if="page" :body="page.body" class="prose bio" />
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
      </div>
    </div>

    <SectionBlock id="journey" title="Journey">
      <!--
        A path that wanders from step to step. Each step sits in a lane (--lane, % across) with its text on the
        outer side; the curve to the next step runs through the open middle, so it never crosses any text.
        Steps group into chapters, with more room between them. The path fades in from the past, draws itself
        as you scroll, and carries on past "now" to an open dot.
      -->
      <Timeline aria-labelledby="journey-title" class="journey">
        <TimelineItem
          v-for="(item, index) in milestones"
          :key="item.year"
          :status="index === milestones.length - 1 ? 'current' : 'complete'"
          class="journey__step"
          :data-side="laneAt(index) < 50 ? 'left' : 'right'"
          :data-turn="nextLaneAt(index) < laneAt(index) ? 'left' : 'right'"
          :data-before-chapter="milestones[index + 1]?.chapter ? '' : undefined"
          :style="{ '--lane': laneAt(index), '--lane-next': nextLaneAt(index) }"
        >
          <!-- Where the path begins, a solid dot that the open one at the end answers -->
          <p v-if="index === 0" class="journey__origin display">It all started here.</p>
          <h3 v-if="item.chapter" class="journey__chapter display">{{ item.chapter }}</h3>
          <TimelineMarker class="journey__marker" />
          <TimelineConnector class="journey__connector">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M0 0C0 55 100 45 100 100" />
            </svg>
          </TimelineConnector>
          <div class="journey__text">
            <TimelineTime class="journey__year display" :datetime="item.dateTime">{{ item.year }}</TimelineTime>
            <TimelineTitle class="journey__title display">{{ item.title }}</TimelineTitle>
            <TimelineDescription class="journey__desc">{{ item.description }}</TimelineDescription>
          </div>
          <!-- Illustrations and travel stamps, in the open space on the other side of the path -->
          <div v-if="item.widget || stampsAt[index]" class="journey__extra">
            <HoloCard v-if="item.widget" class="journey__widget" :style="{ '--tilt': `${tilts[item.widget]}deg` }">
              <JourneyContributions v-if="item.widget === 'contributions'" />
              <JourneyDesign v-else-if="item.widget === 'design'" />
              <JourneyHere v-else />
            </HoloCard>
            <JourneyStamp
              v-for="(place, n) in stampsAt[index]"
              :key="place.path"
              :place="place"
              :tilt="n % 2 ? 5 : -4"
            />
          </div>
        </TimelineItem>
      </Timeline>
      <!-- Past "now" the path keeps going to an open dot: whatever comes next, which points back to the ticket -->
      <div
        class="journey journey--next"
        :data-side="laneAt(milestones.length - 1) < 50 ? 'left' : 'right'"
        :style="{ '--lane': laneAt(milestones.length - 1) }"
      >
        <span class="journey__open" aria-hidden="true" />
        <a href="#contact" class="journey__next display">What’s next? <span>Say hi</span> ↑</a>
      </div>
    </SectionBlock>
  </article>
</template>

<style scoped>
/* The flag after "Spain", sized to the capitals and kept on the same line as the word */
.hero-flag {
  display: inline-block;
  width: 0.78em;
  height: 0.78em;
  margin-inline-start: 0.22em;
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--line-strong);
  vertical-align: -0.04em;
}

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
}

.about::after {
  content: '';
  position: absolute;
  inset-block: 0;
  right: 19rem;
  width: 1px;
  background: var(--line);
}

.block {
  padding: var(--space-tile) var(--gutter) calc(var(--space-tile) + 0.5rem);
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
  padding: var(--space-row) var(--gutter) calc(var(--space-row) + 0.1rem);
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

/*
 * Journey: a dotted path that wanders between two loose lanes. Each step's dot sits at --lane (% across);
 * its text hangs off the outer side of the dot, and the curve to the next dot runs through the middle.
 */
.journey {
  --rail: 1rem;
  --gap: 1.25rem;
  --dot: 11px;
  --dot-top: 0.8rem;
  --path-color: var(--ink-faint);
  --path: repeating-linear-gradient(to bottom, var(--path-color) 0 4px, transparent 4px 8px);
  /* How far the path runs from its origin down to the first step */
  --lead: 10rem;
  position: relative;
  padding: 18rem var(--gutter) 0;
}

.journey__step {
  --x: calc(var(--lane) * 1%);
  --x-next: calc(var(--lane-next) * 1%);
  /* Lets the widgets size themselves in cqi, i.e. % of the step's width, like the lanes */
  container-type: inline-size;
  position: relative;
  display: grid;
  /* Puts the centre of the dot column exactly at --x */
  grid-template-columns: calc(var(--x) - var(--rail) / 2 - var(--gap)) var(--rail) minmax(0, 1fr);
  column-gap: var(--gap);
  padding-bottom: 5.5rem;
  outline-offset: 6px;
}

/* Steps in the same chapter sit closer; a new chapter gets room for its heading */
.journey__step[data-before-chapter] {
  padding-bottom: 12rem;
}

/* A chapter heading hangs above its first step, on the text side, in the room left before it */
.journey__chapter {
  position: absolute;
  bottom: calc(100% + 3rem);
  left: calc(var(--x) + var(--rail) / 2 + var(--gap));
  max-width: 22rem;
  color: var(--ink);
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  letter-spacing: -0.045em;
  line-height: 1.05;
  text-wrap: balance;
}

.journey__step[data-side='left'] .journey__chapter {
  right: calc(100% - var(--x) + var(--rail) / 2 + var(--gap));
  left: auto;
  text-align: end;
}

.journey__text {
  grid-row: 1;
  grid-column: 1;
  justify-self: end;
  max-width: 22rem;
  text-align: end;
}

.journey__step[data-side='right'] .journey__text {
  grid-column: 3;
  justify-self: start;
  text-align: start;
}

.journey__year {
  display: block;
  margin-bottom: 0.6rem;
  color: var(--ink-faint);
  font-family: var(--font-mono);
  font-size: 2.25rem;
  font-weight: 500;
  font-feature-settings: 'zero';
  letter-spacing: -0.04em;
  line-height: 1;
}

.journey__step[data-current] .journey__year {
  color: var(--ink);
}

.journey__step[data-current] .journey__year::after {
  content: 'Now' / '';
  margin-inline-start: 0.6rem;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  vertical-align: 0.35em;
}

/* The path runs down from where it all started to the first step */
.journey__step:first-child::before {
  content: '';
  position: absolute;
  bottom: calc(100% - var(--dot-top) + 4px);
  left: calc(var(--x) - 0.75px);
  width: 1.5px;
  height: var(--lead);
  background: var(--path);
}

/*
 * The origin: a solid dot at the top of that line, its words beside it on the side away from the first
 * chapter heading. Its box is centred on the dot (translate 50%) so the line meets it like any other step.
 */
.journey__origin {
  position: absolute;
  bottom: calc(100% - var(--dot-top) + 4px + var(--lead) + 4px + var(--dot) / 2);
  left: calc(var(--x) - var(--dot) / 2);
  display: flex;
  gap: calc(var(--rail) / 2 - var(--dot) / 2 + var(--gap));
  align-items: center;
  color: var(--ink-soft);
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.2;
  white-space: nowrap;
  translate: 0 50%;
}

.journey__origin::before {
  content: '';
  flex: none;
  width: var(--dot);
  height: var(--dot);
  border-radius: 50%;
  background: var(--ink-faint);
}

.journey__step[data-side='right'] .journey__origin {
  right: calc(100% - var(--x) - var(--dot) / 2);
  left: auto;
  flex-direction: row-reverse;
}

.journey__marker {
  position: relative;
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  width: var(--dot);
  height: var(--dot);
  margin-top: var(--dot-top);
  border: 1.5px solid var(--ink-faint);
  border-radius: 50%;
  background: var(--paper);
}

.journey__step[data-current] .journey__marker {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-wash);
}

@media (prefers-reduced-motion: no-preference) {
  .journey__step[data-current] .journey__marker::after {
    content: '';
    position: absolute;
    inset: -1.5px;
    border: 1px solid var(--accent);
    border-radius: 50%;
    animation: journey-pulse 2.4s var(--ease-out) infinite;
  }
}

@keyframes journey-pulse {
  from {
    opacity: 0.8;
    scale: 1;
  }
  to {
    opacity: 0;
    scale: 2.6;
  }
}

/*
 * From this step's dot to the next one: a box spanning the two lanes, holding an S-curve that stretches to fit.
 * non-scaling-stroke keeps the line 1px and the dots round however much the box is stretched.
 */
.journey__connector {
  position: absolute;
  top: calc(var(--dot-top) + var(--dot) + 4px);
  bottom: calc(4px - var(--dot-top));
  left: min(var(--x), var(--x-next));
  width: calc(max(var(--x), var(--x-next)) - min(var(--x), var(--x-next)));
  pointer-events: none;
}

.journey__connector svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.journey__step[data-turn='left'] .journey__connector svg {
  scale: -1 1;
}

.journey__connector path {
  fill: none;
  stroke: var(--path-color);
  stroke-dasharray: 4 4;
  stroke-width: 1.5;
  vector-effect: non-scaling-stroke;
}

/* After "now" the path carries straight on, down to the open dot of what's next */
.journey__step[data-current] {
  padding-bottom: 0;
}

.journey__step[data-current] .journey__connector {
  /* Ends just above the open dot: the next block's top padding, plus half its row, less half the dot */
  bottom: calc(var(--dot) / 2 + 4px - var(--next-gap) - var(--next-row) / 2);
  left: calc(var(--x) - 0.75px);
  width: 1.5px;
  background: var(--path);
}

.journey__step[data-current] .journey__connector svg {
  display: none;
}

/* What's next: an open, dashed dot on the same lane, a line pointing back up to the ticket, then the path fades */
.journey--next {
  --x: calc(var(--lane) * 1%);
  display: grid;
  grid-template-columns: calc(var(--x) - var(--rail) / 2 - var(--gap)) var(--rail) minmax(0, 1fr);
  grid-template-rows: var(--next-row);
  align-items: center;
  column-gap: var(--gap);
  padding-top: var(--next-gap);
  padding-bottom: 7rem;
}

.journey,
.journey--next {
  --next-gap: 3.5rem;
  --next-row: 1.75rem;
}

.journey__open {
  position: relative;
  grid-row: 1;
  grid-column: 2;
  justify-self: center;
  width: var(--dot);
  height: var(--dot);
  border: 1.5px dashed var(--ink-faint);
  border-radius: 50%;
}

.journey__open::after {
  content: '';
  position: absolute;
  top: calc(100% + 4px);
  left: calc(50% - 0.75px);
  width: 1.5px;
  height: 4rem;
  background: var(--path);
  mask-image: linear-gradient(#000, transparent);
}

.journey__next {
  grid-row: 1;
  grid-column: 3;
  justify-self: start;
  color: var(--ink-soft);
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: var(--next-row);
  white-space: nowrap;
  transition: color 0.2s;
}

.journey--next[data-side='left'] .journey__next {
  grid-column: 1;
  justify-self: end;
}

.journey__next span {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 0.2s;
}

.journey__next:hover span {
  text-decoration-color: currentColor;
}

/*
 * Where the browser supports scroll-driven animation, the path draws itself downward as you read and each dot
 * fills in once the line reaches it. Without support, or with reduced motion, everything is simply there.
 */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    /*
     * The timeline only sees the top 65% of the screen (a 35% inset at the bottom), so "entering" means crossing
     * a reading line about two thirds down: the line draws as it passes that point, not as it scrolls in.
     */
    .journey__connector {
      animation: journey-draw linear both;
      animation-timeline: view(block 0% 35%);
      animation-range: entry 0% entry 100%;
    }

    .journey__step:not([data-current]) .journey__marker {
      animation: journey-reach linear both;
      animation-timeline: view(block 0% 35%);
      animation-range: entry 0% entry 100%;
    }
  }
}

/*
 * Each step waits for the line: its heading, words, cards and stamps rise in once the drawing reaches its dot,
 * i.e. once the dot crosses the same reading line. The dot publishes that moment as a named timeline the rest
 * of the step can follow. Hidden here means transparent only, so screen readers still read every step, and
 * anything focused by keyboard shows at once.
 */
@supports (animation-timeline: view()) and (timeline-scope: --a) {
  @media (prefers-reduced-motion: no-preference) {
    .journey__step,
    .journey--next {
      timeline-scope: --reach;
    }

    .journey__marker,
    .journey__open {
      view-timeline: --reach block;
      view-timeline-inset: 0% 35%;
    }

    .journey__chapter,
    .journey__text,
    .journey__extra,
    .journey__next {
      animation: journey-appear linear both;
      animation-timeline: --reach;
      /* About a tenth of a screen of scrolling to fade in fully */
      animation-range: entry 0% cover 15%;
    }

    .journey__step:focus-within :is(.journey__chapter, .journey__text, .journey__extra),
    .journey__next:focus {
      animation: none;
    }
  }
}

@keyframes journey-appear {
  from {
    opacity: 0;
    translate: 0 0.75rem;
  }
}

@keyframes journey-draw {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0);
  }
}

@keyframes journey-reach {
  from {
    background: var(--paper);
  }
  to {
    background: var(--ink-faint);
  }
}

.journey__title {
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.3;
}

.journey__desc {
  margin-top: 0.35rem;
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.5;
}

/*
 * Widgets go on the side away from the text, kept clear of the curve: it only runs between this lane and
 * the next, so the space beyond both of them is free.
 */
.journey__extra {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1.25rem 1.5rem;
  grid-row: 1;
  grid-column: 1;
  justify-self: start;
  justify-content: flex-start;
  max-width: calc(min(var(--lane), var(--lane-next)) * 1cqi - var(--gap) * 2);
  padding-top: 0.25rem;
}

.journey__step[data-side='left'] .journey__extra {
  grid-column: 3;
  justify-self: end;
  justify-content: flex-end;
  max-width: calc((100 - max(var(--lane), var(--lane-next))) * 1cqi - var(--gap) * 2);
}

/* The card inside HoloCard, which tilts and carries the foil; :deep because it isn't HoloCard's root */
.journey__extra :deep(.journey__widget) {
  max-width: 100%;
  padding: 1rem;
  border: 1px solid var(--line-strong);
  border-radius: 0.9rem;
  background: var(--raised);
  box-shadow: 0 12px 30px -20px var(--shadow);
  rotate: var(--tilt, 0deg);
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

  /* Stacked above the bio: the card keeps its own shape, centred */
  .infobox {
    position: static;
    width: min(100% - var(--gutter) * 2, 20rem);
    margin: 2rem auto 0.5rem;
  }
}

/* Too narrow for two lanes: the path straightens into a rail along the left, text to its right */
@media (max-width: 40rem) {
  .journey {
    --gap: 1rem;
    --dot-top: 0.4rem;
    --lead: 8rem;
    padding-top: 11rem;
  }

  .journey__origin,
  .journey__step[data-side='right'] .journey__origin {
    right: auto;
    left: calc(var(--x) - var(--dot) / 2);
    flex-direction: row;
    font-size: 1.125rem;
  }

  .journey__step {
    --x: calc(var(--rail) / 2);
    --x-next: var(--x);
    grid-template-columns: var(--rail) minmax(0, 1fr);
    padding-bottom: 3.5rem;
  }

  .journey__step[data-before-chapter] {
    padding-bottom: 8rem;
  }

  .journey__chapter,
  .journey__step[data-side='left'] .journey__chapter {
    right: auto;
    bottom: calc(100% + 2rem);
    left: calc(var(--rail) + var(--gap));
    font-size: 1.75rem;
    text-align: start;
  }

  .journey--next {
    --x: calc(var(--rail) / 2);
    grid-template-columns: var(--rail) minmax(0, 1fr);
    padding-top: var(--next-gap);
    padding-bottom: 5rem;
  }

  .journey__open {
    grid-column: 1;
  }

  .journey__next,
  .journey--next[data-side='left'] .journey__next {
    grid-column: 2;
    justify-self: start;
    font-size: 1.125rem;
  }

  .journey__marker {
    grid-column: 1;
  }

  .journey__text,
  .journey__step[data-side='right'] .journey__text {
    grid-column: 2;
    justify-self: start;
    text-align: start;
  }

  .journey__year {
    margin-bottom: 0.4rem;
    font-size: 1.5rem;
  }

  .journey__connector {
    left: calc(var(--x) - 0.75px);
    width: 1.5px;
    background: var(--path);
  }

  .journey__connector svg {
    display: none;
  }

  /* Widgets and stamps tuck in under the text */
  .journey__extra,
  .journey__step[data-side='left'] .journey__extra {
    grid-row: 2;
    grid-column: 2;
    justify-self: start;
    justify-content: flex-start;
    max-width: none;
    padding-top: 1.75rem;
  }
}
</style>
