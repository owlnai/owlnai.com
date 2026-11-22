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
})

// The journey's steps grouped under their chapter headings. Each keeps its index for its stamps and for "now".
const chapters = milestones.reduce<{ title: string; steps: ((typeof milestones)[number] & { index: number })[] }[]>(
  (list, item, index) => {
    if (item.chapter || !list.length) list.push({ title: item.chapter ?? '', steps: [] })
    list.at(-1)!.steps.push({ ...item, index })
    return list
  },
  [],
)
const isNow = (index: number) => index === milestones.length - 1

const tilts = { notepad: 1.5, contributions: -2.5, design: 2, build: -1.5 }

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
          <h2 id="names-title" class="block__title display">What I run</h2>
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
        One line down the left, from a solid dot where it all started to an open one for what's next. Steps group
        under chapter headings; each step's card and stamps sit beside its text, or under it on narrow screens.
        As you scroll, the line fills in down to a reading line near the bottom of the screen, filling each dot
        it passes.
      -->
      <div class="journey">
        <span class="journey__track" aria-hidden="true" />
        <span class="journey__fill" aria-hidden="true" />
        <p class="journey__origin">
          <span class="journey__dot" aria-hidden="true" />
          <span class="display">It all started here.</span>
        </p>
        <template v-for="chapter in chapters" :key="chapter.title">
          <h3 v-if="chapter.title" class="journey__chapter display">{{ chapter.title }}</h3>
          <ol class="journey__steps">
            <li
              v-for="item in chapter.steps"
              :key="item.year"
              class="journey__step"
              :data-current="isNow(item.index) ? '' : undefined"
              :aria-current="isNow(item.index) ? 'step' : undefined"
            >
              <span class="journey__dot" aria-hidden="true" />
              <div class="journey__text">
                <time class="journey__year" :datetime="item.dateTime">{{ item.year }}</time>
                <p class="journey__title display">{{ item.title }}</p>
                <p class="journey__desc">{{ item.description }}</p>
              </div>
              <div v-if="item.widget || stampsAt[item.index]" class="journey__extra">
                <HoloCard v-if="item.widget" class="journey__widget" :style="{ '--tilt': `${tilts[item.widget]}deg` }">
                  <JourneyNotepad v-if="item.widget === 'notepad'" />
                  <JourneyContributions v-else-if="item.widget === 'contributions'" />
                  <JourneyDesign v-else-if="item.widget === 'design'" />
                  <JourneyBuild v-else />
                </HoloCard>
                <JourneyStamp
                  v-for="(place, n) in stampsAt[item.index]"
                  :key="place.path"
                  :place="place"
                  :tilt="n % 2 ? 5 : -4"
                />
              </div>
            </li>
          </ol>
        </template>
        <!-- Past "now" the line carries on to an open dot: whatever comes next, which points back to the ticket -->
        <p class="journey__next">
          <span class="journey__dot" aria-hidden="true" />
          <a href="#contact" class="display">What’s next? <span>Say hi</span> ↑</a>
        </p>
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
  /* No top margin: the lanyard's strap hangs from the border above */
  margin: 0 var(--gutter) var(--gutter);
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

/* A heading over a list sits in a band like one of its rows: the same room above it as below */
.block:has(.list) {
  padding-top: var(--space-row);
  padding-bottom: 0;
}

.block:has(.list) .block__title {
  margin-bottom: var(--space-row);
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
 * Journey: one line down the left, text to its right. Every row is the same grid (the line's column, the
 * text, then the card and stamps), so the dots all sit on the line. The line itself is two spans behind the
 * dots, a light track and a dark fill, running from the origin's dot to the open dot of what's next.
 */
.journey {
  --dot: 11px;
  --rail: 1rem;
  --gap: 1.5rem;
  /* The origin and what's next are a row of fixed height each, so the line can start and end on their dots */
  --end-row: 2rem;
  --pad-top: var(--space-section);
  --pad-bottom: 5rem;
  /* Lets narrow layouts follow the journey's own width rather than the screen's */
  container-type: inline-size;
  position: relative;
  padding: var(--pad-top) var(--gutter) var(--pad-bottom);
}

.journey__track,
.journey__fill {
  position: absolute;
  top: calc(var(--pad-top) + var(--end-row) / 2);
  bottom: calc(var(--pad-bottom) + var(--end-row) / 2);
  left: calc(var(--gutter) + var(--rail) / 2 - 1px);
  width: 2px;
  border-radius: 1px;
}

.journey__track {
  background: var(--ink-faint);
}

/* Shown only where the browser can tie it to scrolling, below */
.journey__fill {
  display: none;
  background: var(--ink);
}

.journey__origin,
.journey__step,
.journey__next {
  --year: 2.25rem;
  display: grid;
  grid-template-columns: var(--rail) minmax(0, 26rem) minmax(0, 1fr);
  column-gap: var(--gap);
}

.journey__origin,
.journey__next {
  height: var(--end-row);
  align-items: center;
  margin: 0;
  color: var(--ink-soft);
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.2;
  white-space: nowrap;
}

.journey__origin > :not(.journey__dot),
.journey__next > a {
  grid-column: 2 / -1;
}

.journey__dot {
  position: relative;
  grid-row: 1;
  grid-column: 1;
  justify-self: center;
  width: var(--dot);
  height: var(--dot);
  border: 1.5px solid var(--ink-faint);
  border-radius: 50%;
  background: var(--paper);
}

/* Where it all started: a solid dot, which the open one at the end answers */
.journey__origin .journey__dot {
  border: 0;
  background: var(--ink-faint);
}

/* What's next: an open dot, a lighter ring with nothing inside */
.journey__next .journey__dot {
  border-color: var(--line-strong);
}

.journey__chapter {
  max-width: 26rem;
  margin: 3rem 0 1.5rem;
  padding-inline-start: calc(var(--rail) + var(--gap));
  color: var(--ink);
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  letter-spacing: -0.045em;
  line-height: 1.05;
  text-wrap: balance;
  box-sizing: content-box;
}

.journey__chapter:first-of-type {
  margin-top: 2.5rem;
}

.journey__steps {
  margin: 0;
  padding: 0;
  list-style: none;
}

.journey__step {
  padding-bottom: 2.5rem;
}

/* Level with the middle of the year */
.journey__step .journey__dot {
  margin-top: calc(var(--year) / 2 - var(--dot) / 2);
}

.journey__step[data-current] .journey__dot {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-wash);
}

@media (prefers-reduced-motion: no-preference) {
  .journey__step[data-current] .journey__dot::after {
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

.journey__text {
  grid-row: 1;
  grid-column: 2;
}

.journey__year {
  display: block;
  margin-bottom: 0.6rem;
  color: var(--ink-faint);
  font-family: var(--font-mono);
  font-size: var(--year);
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
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  vertical-align: 0.35em;
}

.journey__title {
  margin: 0 0 0.45rem;
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.3;
}

.journey__desc {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.55;
}

/* Illustrations and travel stamps, beside the text */
.journey__extra {
  grid-row: 1;
  grid-column: 3;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1.25rem 1.5rem;
  padding-top: 0.25rem;
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

.journey__next a {
  transition: color 0.2s;
}

.journey__next a span {
  color: var(--ink);
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 0.2s;
}

.journey__next a:hover span {
  text-decoration-color: currentColor;
}

/*
 * Scroll progress: where the browser supports scroll-driven animation, the track turns light and a dark fill
 * runs down it to a reading line near the bottom of the screen, filling each dot as it passes. The timelines
 * ignore the bottom of the screen (an inset), so "entering" means crossing that reading line. Over the fill's
 * entry-crossing range it is revealed one pixel per pixel scrolled, so its end stays on the reading line.
 * Without support, or with reduced motion, the line is simply drawn.
 */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .journey {
      --journey-line: min(16%, 8rem);
    }

    .journey__track {
      background: var(--line);
    }

    .journey__fill {
      display: block;
      animation: journey-draw linear both;
      animation-timeline: view(block 0% var(--journey-line));
      animation-range: entry-crossing 0% entry-crossing 100%;
    }

    .journey__step:not([data-current]) .journey__dot {
      animation: journey-reach linear both;
      animation-timeline: view(block 0% var(--journey-line));
      animation-range: entry 0% entry 100%;
    }
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
    border-color: var(--ink-faint);
    background: var(--paper);
  }
  to {
    border-color: var(--ink);
    background: var(--ink);
  }
}

/* Narrow: the card and stamps go under the step's text, and everything gets a little smaller */
@container (max-width: 44rem) {
  .journey > * {
    --gap: 1rem;
  }

  .journey__origin,
  .journey__step,
  .journey__next {
    --year: 1.75rem;
    grid-template-columns: var(--rail) minmax(0, 1fr);
  }

  .journey__origin,
  .journey__next {
    font-size: 1.125rem;
  }

  .journey__chapter {
    font-size: 1.75rem;
  }

  .journey__extra {
    grid-row: 2;
    grid-column: 2;
    padding-top: 1.5rem;
  }
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
    margin: 0 auto 0.5rem;
  }
}
</style>
