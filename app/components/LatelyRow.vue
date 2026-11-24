<script setup lang="ts">
// Browsers cache these responses heuristically, so ask them to revalidate each time
const options = { server: false, cache: 'no-cache' } as const
const github = useLazyFetch('/api/github', options)
const bluesky = useLazyFetch('/api/bluesky', options)
// Shared with the header island and kept fresh while the page is open
const { track, playing } = useNowPlaying()

const isLoading = (status: string) => status === 'idle' || status === 'pending'

const repo = computed(() => github.data.value?.latest ?? null)
const post = computed(() => bluesky.data.value?.post ?? null)

const excerpt = computed(() => {
  const text = post.value?.text ?? ''
  return text.length > 96 ? `${text.slice(0, 93).trimEnd()}…` : text
})

const showRepo = computed(() => isLoading(github.status.value) || repo.value)
const showPost = computed(() => isLoading(bluesky.status.value) || post.value)
</script>

<template>
  <section v-if="showRepo || showPost || track" class="lately rail" aria-label="Lately">
    <a v-if="track" :href="track.url" class="lately__cell lately__cell--music">
      <MusicCover :src="track.cover?.large" class="lately__cover" />
      <span class="lately__lead">
        <MusicBars v-if="playing" playing class="lately__bars" />
        {{ playing ? 'Listening to' : 'Last played' }}
      </span>
      <span class="lately__main display">{{ track.name }}</span>
      <span class="lately__tail">
        by {{ track.artist }}<template v-if="!playing && track.playedAt"> · {{ timeAgo(track.playedAt) }}</template>
      </span>
    </a>

    <component :is="repo ? 'a' : 'div'" v-if="showRepo" :href="repo?.url" class="lately__cell">
      <span class="lately__lead">Pushed to</span>
      <span class="lately__main display">{{ repo?.name ?? '…' }}</span>
      <span class="lately__tail">
        <template v-if="repo">{{ timeAgo(repo.pushedAt) }}</template>
      </span>
    </component>

    <component :is="post ? 'a' : 'div'" v-if="showPost" :href="post?.url" class="lately__cell">
      <span class="lately__lead">Posted on Bluesky</span>
      <span class="lately__main lately__main--quote display">{{ post ? excerpt : '…' }}</span>
      <span class="lately__tail">
        <template v-if="post?.createdAt">{{ timeAgo(post.createdAt) }}</template>
      </span>
    </component>
  </section>
</template>

<style scoped>
.lately {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  overflow: clip;
  border-top: 1px solid var(--line);
}

.lately__cell {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 12.5rem;
  margin: 0 -1px -1px 0;
  padding: var(--space-tile) var(--gutter) calc(var(--space-tile) + 0.1rem);
  border-inline-end: 1px solid var(--line);
  border-block-end: 1px solid var(--line);
  transition: background-color 0.2s;
}

a.lately__cell:hover {
  background: var(--sunken);
}

.lately__lead,
.lately__tail {
  color: var(--ink-faint);
  font-size: 0.875rem;
}

.lately__tail {
  margin-top: auto;
  min-height: 1.4em;
}

/* The cover sits in the top corner; the lead and title keep clear of it */
.lately__cell--music {
  position: relative;
}

.lately__cover {
  position: absolute;
  top: var(--space-tile);
  right: var(--gutter);
  width: 4rem;
  border-radius: 0.6rem;
}

.lately__cell--music .lately__lead,
.lately__cell--music .lately__main {
  padding-inline-end: 5rem;
}

.lately__bars {
  margin-inline-end: 0.3rem;
  vertical-align: -0.05em;
}

.lately__main {
  font-size: clamp(1.5rem, 2.8vw, 2.125rem);
  letter-spacing: -0.04em;
  line-height: 1.08;
  overflow-wrap: anywhere;
}

.lately__main--quote {
  font-size: 1.125rem;
  font-weight: 450;
  letter-spacing: -0.015em;
  line-height: 1.3;
}
</style>
