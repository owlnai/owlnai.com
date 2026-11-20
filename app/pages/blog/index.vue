<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-index', () => $fetch('/api/site/blog'))

useSeoMeta({
  title: 'Blog',
  description: 'Writing by Unai Mengual on CSS, Nuxt, Vue and the web.',
})

useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Unai Mengual', href: '/rss.xml' }],
})
</script>

<template>
  <div>
    <PageIntro title="Writing.">
      <p class="feed"><a href="/rss.xml" class="link">Subscribe with RSS</a></p>
    </PageIntro>

    <ul class="posts">
      <li v-for="post in posts" :key="post.path">
        <NuxtLink :to="post.path" class="post">
          <time class="post__date mono" :datetime="post.date">{{ monthYear(post.date) }}</time>
          <span class="post__main">
            <span class="post__title display">{{ post.title }}</span>
            <span class="post__desc">{{ post.description }}</span>
          </span>
          <span class="post__arrow" aria-hidden="true">→</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.feed {
  margin-top: 1.5rem;
  color: var(--ink-soft);
}

.posts {
  border-top: 1px solid var(--line);
}

.posts > li + li {
  border-top: 1px solid var(--line);
}

.post {
  display: grid;
  grid-template-columns: calc(var(--label-col) - var(--gutter)) minmax(0, 1fr) 1rem;
  align-items: baseline;
  gap: var(--gutter);
  padding: var(--space-row) var(--gutter) calc(var(--space-row) + 0.2rem);
  transition: background-color 0.2s;
}

.post:hover {
  background: var(--sunken);
}

.post__date {
  color: var(--ink-faint);
  font-size: 0.6875rem;
}

.post__main {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.post__title {
  font-size: clamp(1.5rem, 3vw, 2.125rem);
  letter-spacing: -0.04em;
  line-height: 1.1;
  text-wrap: balance;
}

.post__desc {
  max-width: 36rem;
  color: var(--ink-soft);
}

.post__arrow {
  color: var(--ink-faint);
  transition:
    translate 0.25s var(--ease-out),
    color 0.2s;
}

.post:hover .post__arrow {
  color: var(--ink);
  translate: 3px 0;
}

@media (max-width: 52rem) {
  .post {
    grid-template-columns: minmax(0, 1fr) 1rem;
    gap: 0.5rem 1rem;
  }

  .post__date {
    grid-column: 1 / -1;
  }
}
</style>
