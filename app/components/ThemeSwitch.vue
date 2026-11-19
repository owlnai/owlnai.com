<script setup lang="ts">
type Scheme = 'system' | 'light' | 'dark'

const state = usePreference(colorScheme)

const options: { value: Scheme; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

function choose(value: string | null) {
  if (value) colorScheme.set(value as Scheme)
}
</script>

<template>
  <SegmentedControl aria-label="Theme" :value="state.value" @value-change="choose">
    <SegmentedControlIndicator />
    <SegmentedControlItem v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </SegmentedControlItem>
  </SegmentedControl>
</template>
