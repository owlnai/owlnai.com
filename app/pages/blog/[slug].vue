<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryCollection('blog').path(`/blog/${route.params.slug}`).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({ title: post.value.title, description: post.value.description })

if (post.value.canonical) {
  useHead({ link: [{ rel: 'canonical', href: post.value.canonical }] })
}
</script>

<template>
  <article v-if="post">
    <PageIntro :title="post.title">
      <p class="meta mono">
        <time :datetime="post.date">{{ longDate(post.date) }}</time>
      </p>
    </PageIntro>

    <div class="body">
      <span class="cross" data-at="tl" />
      <span class="cross" data-at="tr" />
      <div class="body__aside">
        <NuxtLink to="/blog" class="link">All posts</NuxtLink>
      </div>
      <div class="body__copy">
        <ContentRenderer :value="post" class="prose" />
        <p v-if="post.canonical" class="origin">
          First published on <a :href="post.canonical" class="link">DEV</a>.
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.meta {
  margin-top: 1.5rem;
  color: var(--ink-faint);
}

article :deep(.page-intro__title) {
  max-width: 18ch;
  font-size: clamp(2.25rem, 5.6vw, 3.75rem);
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

.origin {
  max-width: 38rem;
  margin-top: 3rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  color: var(--ink-faint);
  font-size: 0.875rem;
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
