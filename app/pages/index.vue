<script setup lang="ts">
import { brands, openSource, person, socials } from '~/data/site'

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

// Fetched in the browser so the prerendered page still shows current counts
const { data: stars } = useLazyFetch('/api/stars', { server: false, cache: 'no-cache', default: () => ({}) })
const starCount = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

useSeoMeta({
  title: 'Unai Mengual',
  titleTemplate: '%s · owlnai',
  description:
    'Unai Mengual, owlnai online. Full-stack developer in Spain, founder of the web design studio sector9 and of Songbird Labs, Roblox tools that empower creators.',
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero__text">
        <p class="hero__statement">
          I'm a full-stack developer at
          <a :href="brands.mrm.href" class="chip"
            ><img :src="brands.mrm.logo" alt="" class="chip__logo" />{{ brands.mrm.name }}</a
          >. I build for the web as
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
        <h1 class="hero__name display">{{ person.name }}</h1>
      </div>
    </section>

    <SectionBlock id="about" title="About">
      <template #aside>
        <NuxtLink to="/about" class="link">More about me</NuxtLink>
      </template>
      <ContentRenderer v-if="headline" :value="headline" class="lede" />
    </SectionBlock>

    <LatelyRow />

    <SectionBlock id="open-source" title="Open source">
      <ul class="orgs">
        <li v-for="item in openSource" :key="item.id">
          <a :href="item.href" class="orgs__link">
            <span class="orgs__avatar">
              <img v-if="item.avatar" :src="item.avatar" alt="" width="28" height="28" loading="lazy" />
              <span v-else aria-hidden="true">{{ item.name.charAt(0) }}</span>
            </span>
            <span class="orgs__name">{{ item.name }}</span>
            <span
              v-if="stars[item.id]"
              class="orgs__stars mono"
              :aria-label="`${stars[item.id]} GitHub stars`"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
                />
              </svg>
              {{ starCount.format(stars[item.id]!) }}
            </span>
            <span class="orgs__summary">{{ item.summary }}</span>
          </a>
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
  min-height: min(36rem, calc(100svh - 3.5rem));
}

.hero__text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5rem;
  padding: clamp(3.25rem, 7.5vw, 6rem) var(--gutter) clamp(2rem, 4vw, 3rem);
}

.hero__statement {
  max-width: 38rem;
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
  margin-inline: 0.2em 0.35em;
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

@media (prefers-reduced-motion: no-preference) {
  .hero__statement,
  .hero__name {
    animation: rise 0.8s var(--ease-out) both;
  }

  .hero__name {
    animation-delay: 80ms;
  }

  @keyframes rise {
    from {
      opacity: 0;
      translate: 0 0.75rem;
    }
  }
}

.lede {
  max-width: 46rem;
  padding: var(--space-section) var(--gutter) calc(var(--space-section) + 0.25rem);
  font-size: clamp(1.25rem, 2.2vw, 1.625rem);
  line-height: 1.35;
  letter-spacing: -0.02em;
  text-wrap: pretty;
}

.orgs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16.5rem, 1fr));
  overflow: clip;
}

.orgs > li {
  min-width: 0;
  margin: 0 -1px -1px 0;
  border-inline-end: 1px solid var(--line);
  border-block-end: 1px solid var(--line);
}

.orgs__link {
  display: grid;
  grid-template-columns: 1.75rem minmax(0, 1fr) auto;
  /* Rows hug the top, so icons, names and summaries line up across tiles of different heights */
  align-content: start;
  gap: 0.35rem 0.75rem;
  align-items: center;
  height: 100%;
  padding: var(--space-row) var(--gutter);
  transition: background-color 0.2s;
}

.orgs__link:hover {
  background: var(--sunken);
}

/* Level with the name; the summary runs on underneath it */
.orgs__avatar {
  grid-row: 1;
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--raised);
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  text-transform: lowercase;
}

.orgs__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.orgs__name {
  font-weight: 550;
  overflow-wrap: anywhere;
}

.orgs__stars {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--ink-faint);
  font-size: 0.75rem;
  white-space: nowrap;
}

.orgs__stars svg {
  width: 0.8rem;
  height: 0.8rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linejoin: round;
}

.orgs__summary {
  grid-column: 2 / -1;
  color: var(--ink-faint);
  font-size: 0.875rem;
}

.rows > li + li {
  border-top: 1px solid var(--line);
}

.row {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr) 1rem;
  align-items: baseline;
  gap: 1rem;
  padding: var(--space-row) var(--gutter) calc(var(--space-row) + 0.15rem);
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
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.15;
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

.cards {
  display: grid;
  overflow: clip;
}

.cards > li {
  min-width: 0;
  margin: 0 -1px -1px 0;
  border-inline-end: 1px solid var(--line);
  border-block-end: 1px solid var(--line);
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
  padding: var(--space-row) var(--gutter) calc(var(--space-row) + 0.1rem);
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
    min-height: 0;
  }

  .hero__text {
    gap: 4rem;
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
}

@media (max-width: 34rem) {
  .cards--notes,
  .cards--places {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
