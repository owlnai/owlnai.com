<script setup lang="ts">
import { places } from '~/data/places'
import type { WorkKind } from '~/data/site'
import { contributions, now, person, socials, work } from '~/data/site'

const { data: headline } = await useAsyncData('headline', () => queryCollection('content').path('/headline').first())
const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all(),
)
const { data: notes } = await useAsyncData('home-notes', () => queryCollection('notes').order('stem', 'ASC').all())

const filter = ref<'all' | WorkKind>('all')
const filters: { value: 'all' | WorkKind; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'venture', label: 'Ventures' },
  { value: 'open-source', label: 'Open source' },
]
const shownWork = computed(() => work.filter((item) => filter.value === 'all' || item.kind === filter.value))

useSeoMeta({
  title: 'Unai Mengual',
  titleTemplate: '%s · owlnai',
  description: 'Tech lead and full-stack developer in Spain. Nuxt, Vue, open source and a soft spot for wikis.',
})
</script>

<template>
  <div>
    <section class="hero">
      <h1 class="visually-hidden">{{ person.name }}</h1>
      <div class="hero__frame">
        <span class="cross" data-at="tl" />
        <span class="cross" data-at="br" />
        <p class="hero__motto display">
          <span v-for="(word, i) in person.motto" :key="word" class="hero__word" :style="{ '--i': i }">{{ word }}</span>
        </p>
      </div>
    </section>

    <section class="intro" aria-label="Introduction">
      <span class="cross" data-at="tl" />
      <span class="cross" data-at="tr" />
      <figure class="intro__portrait">
        <NuxtImg src="/icon.png" :alt="`Portrait of ${person.name}`" width="320" height="320" sizes="160px" />
      </figure>
      <div class="intro__copy">
        <ContentRenderer v-if="headline" :value="headline" class="intro__lede" />
        <p class="intro__facts mono">
          <span><span class="intro__dot" aria-hidden="true" /><LocalTime :time-zone="person.timeZone" /> in {{ person.location }}</span>
          <span>{{ person.languages.join(' / ') }}</span>
          <NuxtLink to="/about" class="link">More about me</NuxtLink>
        </p>
      </div>
    </section>

    <LatelyRow />

    <SectionBlock id="now" title="Now">
      <ul class="now">
        <li v-for="item in now" :key="item.name" class="now__item">
          {{ item.lead }}
          <a v-if="item.href" :href="item.href" class="now__name link">{{ item.name }}</a
          ><strong v-else class="now__name">{{ item.name }}</strong
          >{{ item.tail }}
        </li>
      </ul>
    </SectionBlock>

    <SectionBlock id="work" title="Selected work">
      <div class="filter">
        <SegmentedControl v-model:value="filter" aria-label="Filter work">
          <SegmentedControlIndicator />
          <SegmentedControlItem v-for="option in filters" :key="option.value" :value="option.value">
            {{ option.label }}
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
      <ul class="rows">
        <li v-for="item in shownWork" :key="item.id">
          <a :href="item.href" class="row">
            <span class="row__lead mono">{{ item.year }}</span>
            <span class="row__main">
              <span class="row__title display">{{ item.name }}</span>
              <span class="row__desc">{{ item.description }}</span>
            </span>
            <span class="row__arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </SectionBlock>

    <SectionBlock id="open-source" title="Open source">
      <ul class="orgs">
        <li v-for="item in contributions" :key="item.id" class="orgs__item">
          <HoverCard>
            <HoverCardTrigger :href="item.href" class="orgs__link">
              <img :src="item.avatar" alt="" width="28" height="28" loading="lazy" class="orgs__avatar" />
              <span class="orgs__name">{{ item.name }}</span>
              <span class="orgs__summary">{{ item.summary }}</span>
            </HoverCardTrigger>
            <HoverCardContent side="top" align="start" :side-offset="8">
              <p class="orgs__card-body">{{ item.detail }}</p>
            </HoverCardContent>
          </HoverCard>
        </li>
      </ul>
    </SectionBlock>

    <SectionBlock v-if="posts?.length" id="writing" title="Writing">
      <template #aside>
        <NuxtLink to="/blog" class="link">All posts</NuxtLink>
      </template>
      <ul class="rows">
        <li v-for="post in posts" :key="post.path">
          <NuxtLink :to="post.path" class="row">
            <time class="row__lead mono" :datetime="post.date">{{ monthYear(post.date) }}</time>
            <span class="row__main">
              <span class="row__title display">{{ post.title }}</span>
            </span>
            <span class="row__arrow" aria-hidden="true">→</span>
          </NuxtLink>
        </li>
      </ul>
    </SectionBlock>

    <SectionBlock v-if="notes?.length" id="notes" title="Notes">
      <template #aside>
        <NuxtLink to="/notes" class="link">All notes</NuxtLink>
      </template>
      <ul class="notes">
        <li v-for="note in notes" :key="note.path" class="notes__item display">
          <ContentRenderer :value="note" />
        </li>
      </ul>
    </SectionBlock>

    <SectionBlock id="places" title="Places">
      <ul class="places">
        <li v-for="place in places" :key="place.code">
          <Tooltip toggleable type="label">
            <TooltipTrigger class="places__flag">
              <img :src="place.flag" alt="" width="48" height="48" loading="lazy" />
            </TooltipTrigger>
            <TooltipContent side="top" :side-offset="8">
              {{ place.country }}<template v-if="place.note"> · {{ place.note }}</template>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </SectionBlock>

    <SectionBlock id="elsewhere" title="Elsewhere">
      <ul class="social">
        <li v-for="social in socials" :key="social.id">
          <a :href="social.href" class="social__link" rel="me">
            <span class="mono social__name">{{ social.name }}</span>
            <span class="social__handle">{{ social.handle }}</span>
            <span class="social__arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </SectionBlock>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  justify-items: center;
  padding: clamp(4rem, 12vw, 8.5rem) var(--gutter);
  background-image: radial-gradient(var(--line) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: center;
}

.hero__frame {
  --cross-size: 25px;
  position: relative;
  padding: clamp(1.5rem, 5vw, 3.25rem) clamp(1.25rem, 5.5vw, 3.5rem) clamp(1.75rem, 5.6vw, 3.75rem);
  border: 1px solid var(--line-strong);
  background: var(--paper);
}

.hero__motto {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 0.22em;
  font-size: clamp(2.75rem, 9.6vw, 6.75rem);
  text-align: center;
}

@media (prefers-reduced-motion: no-preference) {
  .hero__word {
    animation: rise 0.7s var(--ease-out) both;
    animation-delay: calc(var(--i) * 90ms + 80ms);
  }

  @keyframes rise {
    from {
      opacity: 0;
      translate: 0 0.18em;
    }
  }
}

.intro {
  position: relative;
  display: grid;
  grid-template-columns: var(--label-col) minmax(0, 1fr);
  border-top: 1px solid var(--line);
}

.intro__portrait {
  padding: 2rem var(--gutter);
}

.intro__portrait img {
  width: 100%;
  max-width: 10rem;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border: 1px solid var(--line-strong);
  filter: grayscale(1) contrast(1.04);
  transition: filter 0.4s;
}

.intro__portrait:hover img {
  filter: none;
}

.intro__copy {
  padding: 2rem var(--gutter) 2.25rem;
  border-inline-start: 1px solid var(--line);
}

.intro__lede {
  max-width: 44rem;
  font-family: var(--font-display);
  font-stretch: 82%;
  font-weight: 420;
  font-size: clamp(1.375rem, 2.6vw, 1.875rem);
  line-height: 1.28;
  letter-spacing: -0.012em;
  text-wrap: pretty;
}

.intro__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 1.75rem;
  color: var(--ink-faint);
}

.intro__facts .link {
  color: var(--ink);
}

.intro__dot {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  margin-inline-end: 0.5rem;
  border-radius: 50%;
  background: var(--accent);
  vertical-align: 0.08em;
}

.now__item {
  padding: 1.1rem var(--gutter);
  color: var(--ink-soft);
  font-size: 1.0625rem;
  text-wrap: pretty;
}

.now__item + .now__item {
  border-top: 1px solid var(--line);
}

.now__name {
  color: var(--ink);
  font-weight: 550;
}

.filter {
  padding: 0.9rem var(--gutter);
  border-bottom: 1px solid var(--line);
}

.rows > li + li {
  border-top: 1px solid var(--line);
}

.row {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr) 1rem;
  align-items: baseline;
  gap: 1rem;
  padding: 1.15rem var(--gutter) 1.25rem;
  transition: background-color 0.2s;
}

.row:hover {
  background: var(--sunken);
}

.row__lead {
  color: var(--ink-faint);
  font-size: 0.6875rem;
}

.row__main {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.row__title {
  font-size: 1.625rem;
  font-weight: 540;
  font-stretch: 76%;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.row__desc {
  max-width: 34rem;
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.row__arrow {
  color: var(--ink-faint);
  transition:
    translate 0.25s var(--ease-out),
    color 0.2s;
}

.row:hover .row__arrow {
  color: var(--ink);
  translate: 2px -2px;
}

.orgs,
.social,
.notes {
  display: grid;
  overflow: clip;
}

.orgs {
  grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
}

.orgs > li,
.social > li,
.notes > li {
  margin: 0 -1px -1px 0;
  border-inline-end: 1px solid var(--line);
  border-block-end: 1px solid var(--line);
}

.orgs__link {
  display: grid;
  grid-template-columns: 1.75rem minmax(0, 1fr);
  gap: 0.1rem 0.75rem;
  align-items: center;
  height: 100%;
  padding: 1.1rem var(--gutter);
  transition: background-color 0.2s;
}

.orgs__link:hover,
.orgs__link[data-open] {
  background: var(--sunken);
}

.orgs__avatar {
  grid-row: span 2;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 4px;
  border: 1px solid var(--line);
  background: var(--raised);
}

.orgs__name {
  font-weight: 550;
  overflow-wrap: anywhere;
}

.orgs__summary {
  grid-column: 2;
  color: var(--ink-faint);
  font-size: 0.875rem;
}

.orgs__card-body {
  font-size: 0.9375rem;
  line-height: 1.5;
}

.notes {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.notes__item {
  padding: 1.6rem var(--gutter) 1.8rem;
  font-size: clamp(1.625rem, 3.2vw, 2.25rem);
  font-style: italic;
  font-weight: 470;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.places {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  padding: 1.5rem var(--gutter) 1.7rem;
}

.places__flag {
  display: block;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  cursor: default;
}

.places__flag img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  filter: grayscale(1) contrast(1.05);
  box-shadow: 0 0 0 1px var(--line-strong);
  transition: filter 0.3s;
}

.places__flag:hover img,
.places__flag:focus-visible img,
.places__flag[aria-expanded='true'] img {
  filter: none;
}

.social {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.social__link {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.25rem 0.75rem;
  padding: 1.1rem var(--gutter) 1.2rem;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.social__name {
  grid-column: 1 / -1;
  color: var(--ink-faint);
  font-size: 0.6875rem;
  transition: color 0.2s;
}

.social__handle {
  font-size: 1.0625rem;
  font-weight: 500;
}

.social__arrow {
  color: var(--ink-faint);
  transition: translate 0.25s var(--ease-out);
}

.social__link:hover {
  background: var(--ink);
  color: var(--paper);
}

.social__link:hover .social__name,
.social__link:hover .social__arrow {
  color: inherit;
}

.social__link:hover .social__arrow {
  translate: 2px -2px;
}

@media (max-width: 52rem) {
  .intro {
    grid-template-columns: minmax(0, 1fr);
  }

  .intro__portrait {
    padding-bottom: 0;
  }

  .intro__portrait img {
    max-width: 6rem;
  }

  .intro__copy {
    border-inline-start: 0;
    padding-top: 1.5rem;
  }

  .social {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .row {
    grid-template-columns: minmax(0, 1fr) 1rem;
    gap: 0.4rem 1rem;
  }

  .row__lead {
    grid-column: 1 / -1;
  }
}

@media (max-width: 34rem) {
  .notes {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
