<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  $fetch(`/api/site/blog/${route.params.slug}`).catch(() => null),
)

if (!post.value) {
  throw createError({ status: 404, statusText: 'Post not found', fatal: true })
}

// The list is newest first, so the post before this one is the newer post
const { data: neighbours } = await useAsyncData(`blog-${route.params.slug}-neighbours`, async () => {
  const posts = await $fetch('/api/site/blog')
  const index = posts.findIndex((item) => item.path === route.path)
  const pick = (item?: (typeof posts)[number]) => (item ? { title: item.title, path: item.path } : null)
  return { newer: pick(posts[index - 1]), older: pick(posts[index + 1]) }
})
const newer = computed(() => neighbours.value?.newer ?? null)
const older = computed(() => neighbours.value?.older ?? null)

const sections = computed(() => post.value?.body.toc ?? [])

const copy = ref<HTMLElement>()
const activeId = ref<string>()
let observer: IntersectionObserver | undefined

onMounted(() => {
  const headings = [...(copy.value?.querySelectorAll<HTMLElement>('h2[id], h3[id]') ?? [])]
  const visible = new Set<string>()
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id)
        else visible.delete(entry.target.id)
      }
      const first = headings.find((heading) => visible.has(heading.id))
      if (first) activeId.value = first.id
    },
    { rootMargin: '-72px 0px -55% 0px' },
  )
  headings.forEach((heading) => observer?.observe(heading))
})

onBeforeUnmount(() => observer?.disconnect())

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogType: 'article',
  articlePublishedTime: post.value.date,
  articleAuthor: ['Unai Mengual'],
})
defineOgImage('Site', {
  title: post.value.title,
  description: post.value.description,
  label: 'Blog',
  date: longDate(post.value.date),
})

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
        <div class="body__sticky">
          <NuxtLink to="/blog" class="link">All posts</NuxtLink>

          <nav v-if="sections.length" class="toc" aria-labelledby="toc-title">
            <h2 id="toc-title" class="toc__title mono">On this page</h2>
            <ol class="toc__list">
              <li v-for="section in sections" :key="section.id">
                <a
                  :href="`#${section.id}`"
                  class="toc__link"
                  :aria-current="activeId === section.id ? 'location' : undefined"
                  >{{ section.text }}</a
                >
                <ol v-if="section.children?.length" class="toc__list toc__list--nested">
                  <li v-for="child in section.children" :key="child.id">
                    <a
                      :href="`#${child.id}`"
                      class="toc__link"
                      :aria-current="activeId === child.id ? 'location' : undefined"
                      >{{ child.text }}</a
                    >
                  </li>
                </ol>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div ref="copy" class="body__copy">
        <ContentBody :body="post.body" class="prose" />
        <p v-if="post.canonical" class="origin">
          First published on <a :href="post.canonical" class="link">DEV</a>.
        </p>
      </div>
    </div>

    <nav v-if="newer || older" class="pager" aria-label="More posts">
      <NuxtLink v-if="older" :to="older.path" class="pager__link">
        <span class="pager__dir">Older</span>
        <span class="pager__title display">{{ older.title }}</span>
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="newer" :to="newer.path" class="pager__link pager__link--next">
        <span class="pager__dir">Newer</span>
        <span class="pager__title display">{{ newer.title }}</span>
      </NuxtLink>
    </nav>
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

.body__sticky {
  position: sticky;
  top: 5rem;
}

.toc {
  margin-top: 2rem;
}

.toc__title {
  margin-bottom: 0.75rem;
  color: var(--ink);
  font-size: 0.6875rem;
  font-weight: 500;
}

.toc__list {
  display: grid;
  gap: 0.15rem;
  border-inline-start: 1px solid var(--line);
}

.toc__list--nested {
  margin-inline-start: 0.75rem;
  border-inline-start: 0;
}

.toc__link {
  display: block;
  margin-inline-start: -1px;
  padding: 0.2rem 0 0.2rem 0.75rem;
  border-inline-start: 1px solid transparent;
  line-height: 1.35;
  transition:
    color 0.2s,
    border-color 0.2s;
}

.toc__list--nested .toc__link {
  border-inline-start: 0;
  margin-inline-start: 0;
}

.toc__link:hover,
.toc__link[aria-current] {
  color: var(--ink);
}

.toc__list:not(.toc__list--nested) > li > .toc__link[aria-current] {
  border-inline-start-color: var(--ink);
}

.body__copy {
  min-width: 0;
  padding: 2rem var(--gutter) 3.5rem;
  border-inline-start: 1px solid var(--line);
}

.body__copy :deep(:is(h2, h3)) {
  scroll-margin-top: 5rem;
}

.origin {
  max-width: 38rem;
  margin-top: 3rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  color: var(--ink-faint);
  font-size: 0.875rem;
}

.pager {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);
}

.pager__link {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: var(--space-row) var(--gutter) calc(var(--space-row) + 0.25rem);
  transition: background-color 0.2s;
}

.pager__link:hover {
  background: var(--sunken);
}

.pager__link--next {
  grid-column: 2;
  align-items: flex-end;
  border-inline-start: 1px solid var(--line);
  text-align: end;
}

.pager__dir {
  color: var(--ink-faint);
  font-size: 0.875rem;
}

.pager__title {
  font-size: 1.375rem;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

@media (max-width: 52rem) {
  .body {
    grid-template-columns: minmax(0, 1fr);
  }

  .body__aside {
    padding-bottom: 0;
  }

  .body__sticky {
    position: static;
  }

  .body__copy {
    border-inline-start: 0;
  }
}

@media (max-width: 34rem) {
  .pager {
    grid-template-columns: minmax(0, 1fr);
  }

  .pager__link--next {
    grid-column: 1;
    border-inline-start: 0;
    border-top: 1px solid var(--line);
  }
}
</style>
