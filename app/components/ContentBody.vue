<script setup lang="ts">
import { MarkdownDocument } from '@comark/vue'
import type { ContentBody } from '#shared/content'
import ProseImg from './ProseImg.vue'

// The body of a Markdown document. The server parsed it with Comark (highlighting, heading links,
// table of contents), so the browser gets plain nodes and no Markdown parser.
const props = defineProps<{ body: ContentBody }>()

const components = { img: ProseImg }

const document = computed(
  () => ({ frontmatter: {}, meta: {}, nodes: props.body.nodes }) as InstanceType<typeof MarkdownDocument>['$props']['value'],
)
</script>

<!-- MarkdownDocument is the root, so a class such as `prose` lands on Comark's own wrapper and
     `.prose > * + *` reaches the paragraphs -->
<template>
  <MarkdownDocument :value="document" :components="components" />
</template>
