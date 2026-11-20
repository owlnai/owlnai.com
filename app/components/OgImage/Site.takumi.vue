<script setup lang="ts">
// The share card for every page: the site's dark paper, hairline frame and holographic accent, in Geist.
// With `image` (a place's cover photo) the photo fills the card and the text sits on a dark fade.
const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    // Small mono label above the title, such as "Blog" or "Place"
    label?: string
    // Already formatted, such as "11 May 2023"
    date?: string
    // A path under public/, such as /places/krakow/cover.jpg
    image?: string
  }>(),
  { description: '', label: '', date: '', image: '' },
)

const paper = '#0c0c0d'
const ink = '#f1f1ee'
const inkSoft = '#b4b4b0'
const inkFaint = '#8b8b87'
const line = '#242427'
const holo = 'linear-gradient(90deg, hsl(320 85% 76%), hsl(265 85% 80%), hsl(195 85% 72%), hsl(150 70% 70%), hsl(50 90% 72%))'

// Short titles fill one line; longer ones step down so two lines still leave room for the description
const titleSize = computed(() => (props.title.length > 30 ? 60 : props.title.length > 16 ? 72 : 96))
const meta = computed(() => [props.label, props.date].filter(Boolean).join('  ·  '))
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
      padding: '40px',
    }"
  >
    <img
      v-if="image"
      :src="image"
      :style="{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }"
    />
    <div
      v-if="image"
      :style="{
        position: 'absolute',
        inset: 0,
        // Darker at the top for the label, clearest just above the title, darkest behind the text below
        backgroundImage:
          'linear-gradient(180deg, rgba(12,12,13,0.6) 0%, rgba(12,12,13,0.3) 22%, rgba(12,12,13,0.55) 45%, rgba(12,12,13,0.94) 100%)',
      }"
    />

    <!-- Hairline frame, like the site's bordered columns -->
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        position: 'relative',
        border: `1px solid ${image ? 'rgba(241,241,238,0.25)' : line}`,
        padding: '40px 56px',
      }"
    >
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
        <div
          :style="{
            display: 'flex',
            fontFamily: 'Geist Mono Variable',
            fontSize: '24px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: image ? ink : inkFaint,
          }"
        >
          {{ meta }}
        </div>
        <div :style="{ display: 'flex', width: '160px', height: '6px', borderRadius: '3px', backgroundImage: holo }" />
      </div>

      <div :style="{ display: 'flex', flexDirection: 'column', gap: '18px' }">
        <div
          :style="{
            display: 'flex',
            fontSize: `${titleSize}px`,
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 1.02,
            textWrap: 'balance',
          }"
        >
          {{ title }}
        </div>
        <div
          v-if="description"
          :style="{ display: 'flex', fontSize: '26px', lineHeight: 1.4, color: image ? '#e2e2de' : inkSoft, maxWidth: '900px', lineClamp: 2 }"
        >
          {{ description }}
        </div>
      </div>

      <div :style="{ display: 'flex', alignItems: 'center', gap: '18px' }">
        <!-- A 112px copy of icon.png: the build inlines this image into the server bundle -->
        <img src="/og/avatar.png" :style="{ width: '56px', height: '56px', borderRadius: '9999px' }" />
        <div :style="{ display: 'flex', flexDirection: 'column' }">
          <div :style="{ display: 'flex', fontSize: '26px', fontWeight: 600 }">Unai Mengual</div>
          <div :style="{ display: 'flex', fontFamily: 'Geist Mono Variable', fontSize: '20px', color: image ? '#d0d0cc' : inkFaint }">
            owlnai.com
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
