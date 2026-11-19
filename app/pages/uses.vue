<script setup lang="ts">
import { uses } from '~/data/site'

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
      <dl class="uses">
        <div v-for="item in group.items" :key="item.name" class="uses__item">
          <dt class="uses__name display">{{ item.name }}</dt>
          <dd class="uses__desc">{{ item.description }}</dd>
        </div>
      </dl>
    </SectionBlock>
  </div>
</template>

<style scoped>
.uses {
  margin: 0;
}

.uses__item {
  display: grid;
  grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
  align-items: baseline;
  gap: 0.25rem 1.5rem;
  padding: 1rem var(--gutter) 1.1rem;
}

.uses__item + .uses__item {
  border-top: 1px solid var(--line);
}

.uses__name {
  font-size: 1.5rem;
  font-weight: 540;
  font-stretch: 76%;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.uses__desc {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.9375rem;
}

@media (max-width: 40rem) {
  .uses__item {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
