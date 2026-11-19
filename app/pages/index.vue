<script setup lang="ts">
import { brands, contributions, now, person, socials, work } from '~/data/site'

const { data: headline } = await useAsyncData('headline', () => queryCollection('content').path('/headline').first())
const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all(),
)
const { data: notes } = await useAsyncData('home-notes', () =>
  queryCollection('notes').order('stem', 'ASC').limit(4).all(),
)
const { data: places } = await useAsyncData('home-places', () =>
  queryCollection('places').order('date', 'DESC').limit(3).all(),
)

useSeoMeta({
  title: 'Unai Mengual',
  titleTemplate: '%s · owlnai',
  description:
    'Unai Mengual, owlnai online. Tech lead in Spain, founder of the web design studio sector9 and of Songbird Labs, Roblox tools that empower creators.',
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero__text">
        <p class="hero__statement">
          I build for the web as
          <NuxtLink :to="brands.owlnai.href" class="chip"
            ><img :src="brands.owlnai.logo" alt="" class="chip__logo chip__logo--round" />{{ brands.owlnai.name }}</NuxtLink
          >, design it at
          <a :href="brands.sector9.href" class="chip"
            ><img :src="brands.sector9.logo" alt="" class="chip__logo" />{{ brands.sector9.name }}</a
          >, and make Roblox tools that empower creators at
          <a :href="brands.songbird.href" class="chip"
            ><img :src="brands.songbird.logo" alt="" class="chip__logo" />{{ brands.songbird.name }}</a
          >.
        </p>
        <div>
          <h1 class="hero__name display">{{ person.name }}</h1>
          <p class="hero__facts mono">
            <span><span class="hero__dot" aria-hidden="true" /><LocalTime :time-zone="person.timeZone" /> in {{ person.location }}</span>
            <span>{{ person.languages.join(' / ') }}</span>
          </p>
        </div>
      </div>
      <figure class="hero__portrait">
        <span class="cross" data-at="tl" />
        <span class="cross" data-at="br" />
        <NuxtImg src="/icon.png" :alt="`Portrait of ${person.name}`" width="460" height="460" />
      </figure>
    </section>

    <SectionBlock id="about" title="About">
      <template #aside>
        <NuxtLink to="/about" class="link">More about me</NuxtLink>
      </template>
      <ContentRenderer v-if="headline" :value="headline" class="lede" />
    </SectionBlock>

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

    <SectionBlock id="work" title="Work">
      <ul class="rows">
        <li v-for="item in work" :key="item.id">
          <a :href="item.href" class="row row--logo">
            <span class="row__logo">
              <img v-if="item.logo" :src="item.logo" alt="" width="40" height="40" loading="lazy" />
              <span v-else aria-hidden="true">{{ item.name.charAt(0) }}</span>
            </span>
            <span class="row__main">
              <span class="row__title display">{{ item.name }}</span>
              <span class="row__desc">{{ item.description }}</span>
            </span>
            <span class="row__lead mono">{{ item.year }}</span>
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

    <SectionBlock v-if="places?.length" id="places" title="Places">
      <template #aside>
        <NuxtLink to="/places" class="link">All places</NuxtLink>
      </template>
      <ul class="cards cards--places">
        <li v-for="place in places" :key="place.path">
          <PlaceCard :place="place" />
        </li>
      </ul>
    </SectionBlock>

    <SectionBlock v-if="notes?.length" id="notes" title="Notes">
      <template #aside>
        <NuxtLink to="/notes" class="link">All notes</NuxtLink>
      </template>
      <ul class="cards cards--notes">
        <li v-for="note in notes" :key="note.path">
          <NoteCard :note="note" />
        </li>
      </ul>
    </SectionBlock>

    <SectionBlock id="elsewhere" title="Elsewhere">
      <ul class="cards cards--social">
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
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  min-height: min(42rem, calc(100svh - 3.5rem));
}

.hero__text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  padding: clamp(1.5rem, 3.5vw, 2.5rem) var(--gutter) clamp(1.5rem, 3vw, 2.25rem);
}

.hero__statement {
  max-width: 31rem;
  color: var(--ink-soft);
  font-size: clamp(1.125rem, 1.9vw, 1.5rem);
  font-weight: 450;
  letter-spacing: -0.02em;
  line-height: 1.4;
  text-wrap: pretty;
}

.chip {
  color: var(--ink);
  font-weight: 600;
  white-space: nowrap;
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  transition: text-decoration-color 0.2s;
}

.chip:hover {
  text-decoration-color: currentColor;
}

.chip__logo {
  display: inline-block;
  width: 1.15em;
  height: 1.15em;
  margin-inline-end: 0.3em;
  border-radius: 0.25em;
  box-shadow: 0 0 0 1px var(--line-strong);
  object-fit: cover;
  vertical-align: -0.22em;
}

.chip__logo--round {
  border-radius: 50%;
}

.hero__name {
  font-size: clamp(3.5rem, 11.5vw, 8.75rem);
  letter-spacing: -0.07em;
  line-height: 0.86;
}

.hero__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 1.5rem;
  color: var(--ink-faint);
}

.hero__dot {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  margin-inline-end: 0.5rem;
  border-radius: 50%;
  background: var(--accent);
  vertical-align: 0.08em;
}

@media (prefers-reduced-motion: no-preference) {
  .hero__statement,
  .hero__name,
  .hero__facts {
    animation: rise 0.8s var(--ease-out) both;
  }

  .hero__name {
    animation-delay: 80ms;
  }

  .hero__facts {
    animation-delay: 160ms;
  }

  @keyframes rise {
    from {
      opacity: 0;
      translate: 0 0.75rem;
    }
  }
}

.hero__portrait {
  --cross-size: 25px;
  position: relative;
  margin: var(--gutter);
}

.hero__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.04);
  transition: filter 0.4s;
}

.hero__portrait:hover img {
  filter: none;
}

.lede {
  max-width: 46rem;
  padding: 2rem var(--gutter) 2.25rem;
  font-size: clamp(1.25rem, 2.2vw, 1.625rem);
  line-height: 1.35;
  letter-spacing: -0.02em;
  text-wrap: pretty;
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

.row--logo {
  grid-template-columns: 2.5rem minmax(0, 1fr) auto 1rem;
  align-items: center;
}

.row:hover {
  background: var(--sunken);
}

.row__logo {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  overflow: hidden;
  border: 1px solid var(--line-strong);
  border-radius: 0.5rem;
  background: var(--raised);
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 1rem;
  text-transform: lowercase;
}

.row__logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.15;
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
.cards {
  display: grid;
  overflow: clip;
}

.orgs {
  grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
}

.orgs > li,
.cards > li {
  min-width: 0;
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

.cards--places,
.cards--social {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cards--notes {
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
  .hero {
    grid-template-columns: minmax(0, 1fr);
    min-height: 0;
  }

  .hero__text {
    gap: 2.5rem;
  }

  .hero__portrait {
    aspect-ratio: 1;
    margin-top: 0;
  }

  .cards--places,
  .cards--social {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .row {
    grid-template-columns: minmax(0, 1fr) 1rem;
    gap: 0.4rem 1rem;
  }

  .row__lead {
    grid-column: 1 / -1;
  }

  .row--logo {
    grid-template-columns: 2.5rem minmax(0, 1fr) 1rem;
    align-items: start;
    gap: 0.4rem 0.9rem;
  }

  .row--logo .row__lead {
    grid-column: 2;
    grid-row: 2;
  }

  .row--logo .row__logo {
    grid-row: span 2;
  }
}

@media (max-width: 34rem) {
  .cards--notes,
  .cards--places {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
