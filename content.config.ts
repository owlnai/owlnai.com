import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

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
    // Short snippets: a thought, a quote worth keeping, or a piece of code
    notes: defineCollection({
      source: 'notes/*.md',
      type: 'page',
      schema: z.object({
        kind: z.enum(['note', 'quote', 'code']).default('note'),
        caption: z.string().optional(),
        author: z.string().optional(),
        url: z.string().optional(),
        date: z.string().optional(),
      }),
    }),
    // Travel posts. Photos live in public/places/<slug>/
    places: defineCollection({
      source: 'places/*.md',
      type: 'page',
      schema: z.object({
        date: z.string(),
        country: z.string().optional(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        // [latitude, longitude], used to pin the place on the map
        coords: z.tuple([z.number(), z.number()]).optional(),
      }),
    }),
  },
})
