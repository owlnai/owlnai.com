import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      source: '**/*.md',
      type: 'page'
    })
  }
})
