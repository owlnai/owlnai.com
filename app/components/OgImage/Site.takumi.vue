<script setup lang="ts">
// The share card for every page, drawn like the homepage hero: the title large above a rule, the column edges with
// a cross where they meet the rule, and the contact ticket's foil in the empty corner. The description is left out:
// link previews already show it as text next to the card.
// With `image` (a place's cover photo) the photo fills the card instead of the foil, under a dark fade.
const props = withDefaults(
  defineProps<{
    title: string
    // Already formatted, such as "11 May 2023"
    date?: string
    // A path under public/, such as /places/krakow/cover.jpg
    image?: string
  }>(),
  { date: '', image: '' },
)

const paper = '#0c0c0d'
const ink = '#f1f1ee'
// Over a photo the soft text and the lines are lighter so they still read on the fade
const c = props.image
  ? { soft: '#e2e2de', faint: '#d0d0cc', line: 'rgba(241,241,238,0.22)', mark: 'rgba(241,241,238,0.6)' }
  : { soft: '#b4b4b0', faint: '#8b8b87', line: '#242427', mark: '#66666b' }

// Short titles fill one line; longer ones step down so two lines still fit above the rule
const titleSize = computed(() => (props.title.length > 34 ? 68 : props.title.length > 18 ? 96 : 148))

// The column edges and the rule, in card pixels (1200 × 600)
const EDGES = [40, 1160]
const RULE = 486
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative',
      backgroundColor: paper,
      color: ink,
      fontFamily: 'Geist Variable',
    }"
  >
    <img v-if="image" :src="image" :style="{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }" />
    <div
      v-if="image"
      :style="{
        position: 'absolute',
        inset: 0,
        // Clearest in the middle, darkest behind the title and the footer
        backgroundImage: 'linear-gradient(180deg, rgba(12,12,13,0.7) 0%, rgba(12,12,13,0.25) 35%, rgba(12,12,13,0.8) 75%, rgba(12,12,13,0.95) 100%)',
      }"
    />

    <!-- Fine 55° lines lit by a faint violet-to-cyan band, fading out from the top-right corner: the ticket's foil, drawn
         as a 1200 × 600 transparent image -->
    <img v-if="!image" src="/og/foil.png" :style="{ position: 'absolute', inset: 0, width: '1200px', height: '600px' }" />

    <div v-for="x in EDGES" :key="`edge-${x}`" :style="{ position: 'absolute', left: `${x}px`, top: 0, width: '1px', height: '600px', backgroundColor: c.line }" />
    <div :style="{ position: 'absolute', left: 0, top: `${RULE}px`, width: '1200px', height: '1px', backgroundColor: c.line }" />
    <template v-for="x in EDGES" :key="`cross-${x}`">
      <div :style="{ position: 'absolute', left: `${x - 9}px`, top: `${RULE}px`, width: '19px', height: '1px', backgroundColor: c.mark }" />
      <div :style="{ position: 'absolute', left: `${x}px`, top: `${RULE - 9}px`, width: '1px', height: '19px', backgroundColor: c.mark }" />
    </template>

    <div
      :style="{
        position: 'absolute',
        left: '78px',
        bottom: `${600 - RULE + 22}px`,
        width: '1040px',
        display: 'flex',
        fontSize: `${titleSize}px`,
        fontWeight: 600,
        letterSpacing: '-0.06em',
        lineHeight: 0.92,
        textWrap: 'balance',
      }"
    >
      {{ title }}
    </div>

    <div
      :style="{
        position: 'absolute',
        left: '84px',
        right: '84px',
        top: `${RULE + 1}px`,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Geist Mono Variable',
        fontSize: '20px',
        color: c.faint,
      }"
    >
      <div :style="{ display: 'flex', alignItems: 'center', gap: '14px' }">
        <!-- A 112px copy of icon.png: the build inlines this image into the server bundle -->
        <img src="/og/avatar.png" :style="{ width: '36px', height: '36px', borderRadius: '9999px' }" />
        <div :style="{ display: 'flex' }">owlnai.com</div>
      </div>
      <div v-if="date" :style="{ display: 'flex' }">{{ date }}</div>
    </div>
  </div>
</template>
