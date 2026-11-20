<script setup lang="ts">
import { flags } from '~/data/flags'

const route = useRoute()
const { data: place } = await useAsyncData(`place-${route.params.slug}`, () =>
  queryCollection('places').path(`/places/${route.params.slug}`).first(),
)

if (!place.value) {
  throw createError({ status: 404, statusText: 'Place not found', fatal: true })
}

const flag = computed(() => (place.value?.country ? flags[place.value.country] : undefined))

useSeoMeta({
  title: place.value.title,
  description: place.value.description,
  ogImage: place.value.cover,
})
</script>

<template>
  <article v-if="place">
    <PageIntro :title="place.title">
      <p class="meta mono">
        <span v-if="flag" class="meta__country">
          <img :src="flag.src" alt="" width="16" height="16" class="meta__flag" />{{ flag.name }}
        </span>
        <time :datetime="place.date">{{ longDate(place.date) }}</time>
      </p>
    </PageIntro>

    <figure v-if="place.cover" class="cover">
      <img :src="place.cover" :alt="place.coverAlt ?? `${place.title}, cover photo`" />
    </figure>

    <div class="body">
      <span class="cross" data-at="tl" />
      <span class="cross" data-at="tr" />
      <div class="body__aside">
        <NuxtLink to="/places" class="link">All places</NuxtLink>
      </div>
      <div class="body__copy">
        <ContentRenderer :value="place" class="prose prose--photos" />
      </div>
    </div>
  </article>
</template>

<style scoped>
.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.5rem;
  margin-top: 1.5rem;
  color: var(--ink-faint);
}

.meta__country {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.meta__flag {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--line-strong);
}

.cover {
  border-top: 1px solid var(--line);
}

.cover img {
  width: 100%;
  max-height: 80svh;
  object-fit: cover;
}

.body {
  position: relative;
  display: grid;
  grid-template-columns: var(--label-col) minmax(0, 1fr);
  border-top: 1px solid var(--line);
}

.body__aside {
  padding: 2rem var(--gutter);
  color: var(--ink-faint);
  font-size: 0.875rem;
}

.body__copy {
  min-width: 0;
  padding: 2rem var(--gutter) 3.5rem;
  border-inline-start: 1px solid var(--line);
}

@media (max-width: 52rem) {
  .body {
    grid-template-columns: minmax(0, 1fr);
  }

  .body__aside {
    padding-bottom: 0;
  }

  .body__copy {
    border-inline-start: 0;
  }
}
</style>
