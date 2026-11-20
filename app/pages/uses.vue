<script setup lang="ts">
import { uses, usesUpdated } from '~/data/uses'

useSeoMeta({
  title: 'Uses',
  description: 'The software and hardware Unai Mengual uses day to day.',
})
defineOgImage('Site', { title: 'Uses.', description: 'The software and hardware I use day to day.', label: 'Uses' })
</script>

<template>
  <div>
    <PageIntro title="The tools I reach for.">
      <p class="updated">Updated <time :datetime="usesUpdated">{{ monthYear(usesUpdated) }}</time></p>
    </PageIntro>

    <SectionBlock
      v-for="group in uses"
      :id="group.id"
      :key="group.id"
      :title="group.category"
    >
      <ul class="tools">
        <li v-for="item in group.items" :key="item.name" class="tool">
          <span class="tool__logo" :data-kind="item.icon ? 'icon' : 'tile'">
            <img v-if="item.icon" :src="item.icon" alt="" width="48" height="48" loading="lazy" />
            <span
              v-else-if="item.logo && item.logoMono"
              class="tool__mono"
              :style="{ '--mark': `url(${item.logo})` }"
              aria-hidden="true"
            />
            <img
              v-else-if="item.logo"
              class="tool__mark"
              :data-inset="item.logoInset ? '' : undefined"
              :src="item.logo"
              alt=""
              width="48"
              height="48"
              loading="lazy"
            />
            <svg v-else-if="item.glyph" :viewBox="item.glyphViewBox ?? '0 0 24 24'" aria-hidden="true">
              <path :d="item.glyph" />
            </svg>
            <span v-else aria-hidden="true">{{ item.name.charAt(0) }}</span>
          </span>
          <span class="tool__name display" :data-solo="item.description ? undefined : ''">{{ item.name }}</span>
          <span v-if="item.description" class="tool__desc">{{ item.description }}</span>
        </li>
      </ul>
    </SectionBlock>
  </div>
</template>

<style scoped>
.updated {
  margin-top: 1.5rem;
  color: var(--ink-soft);
}

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
  padding: var(--space-row) var(--gutter) calc(var(--space-row) + 0.15rem);
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

/* A brand's site icon fills the tile, or sits padded inside it when it has no background */
.tool__logo[data-kind='tile'] {
  overflow: clip;
}

.tool__mark {
  object-fit: cover;
}

.tool__mark[data-inset] {
  padding: 0.5rem;
  object-fit: contain;
}

.tool__mono {
  width: 100%;
  height: 100%;
  background: var(--ink);
  mask: var(--mark) center / calc(100% - 0.75rem) auto no-repeat;
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

/* A tool with no description centres its name against the logo */
.tool__name[data-solo] {
  grid-row: span 2;
  align-self: center;
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
