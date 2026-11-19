<script setup lang="ts">
import { uses } from '~/data/uses'

useSeoMeta({
  title: 'Uses',
  description: 'The software and hardware Unai Mengual uses day to day.',
})
</script>

<template>
  <div>
    <PageIntro title="The tools on my desk." />

    <SectionBlock
      v-for="group in uses"
      :id="group.category.toLowerCase()"
      :key="group.category"
      :title="group.category"
    >
      <ul class="tools">
        <li v-for="item in group.items" :key="item.name" class="tool">
          <span class="tool__logo" :data-kind="item.icon ? 'icon' : 'tile'">
            <img v-if="item.icon" :src="item.icon" alt="" width="48" height="48" loading="lazy" />
            <svg v-else-if="item.glyph" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="item.glyph" />
            </svg>
            <span v-else aria-hidden="true">{{ item.name.charAt(0) }}</span>
          </span>
          <span class="tool__name display">{{ item.name }}</span>
          <span class="tool__desc">{{ item.description }}</span>
        </li>
      </ul>
    </SectionBlock>
  </div>
</template>

<style scoped>
.tools {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: clip;
}

.tool {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  align-content: start;
  gap: 0.2rem 1rem;
  min-width: 0;
  margin: 0 -1px -1px 0;
  padding: 1.25rem var(--gutter) 1.4rem;
  border-inline-end: 1px solid var(--line);
  border-block-end: 1px solid var(--line);
}

.tool__logo {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
}

/* App icons bring their own shape; glyphs and letters sit in a tile */
.tool__logo[data-kind='tile'] {
  border: 1px solid var(--line-strong);
  border-radius: 0.7rem;
  background: var(--raised);
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 1.125rem;
  text-transform: lowercase;
}

.tool__logo img {
  width: 100%;
  height: 100%;
}

.tool__logo svg {
  width: 1.375rem;
  height: 1.375rem;
  fill: var(--ink);
}

.tool__name {
  align-self: end;
  font-size: 1.125rem;
  letter-spacing: -0.03em;
  line-height: 1.25;
}

.tool__desc {
  grid-column: 2;
  color: var(--ink-soft);
  font-size: 0.9375rem;
  line-height: 1.45;
}

@media (max-width: 64rem) {
  .tools {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 34rem) {
  .tools {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
