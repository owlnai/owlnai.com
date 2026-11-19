<script setup lang="ts">
const props = defineProps<{ timeZone: string }>()

const time = ref('')
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  time.value = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: props.timeZone,
  }).format(new Date())
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 15_000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <span>{{ time || '––:––' }}</span>
</template>
