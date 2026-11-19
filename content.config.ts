import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      source: '*.md',
      type: 'page',
    }),
    blog: defineCollection({
      source: 'blog/*.md',
      type: 'page',
      schema: z.object({
        date: z.string(),
        canonical: z.string().optional(),
      }),
    }),
    notes: defineCollection({
      source: 'notes/*.md',
      type: 'page',
      schema: z.object({
        date: z.string().optional(),
      }),
    }),
  },
})
