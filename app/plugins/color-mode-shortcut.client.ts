export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'd') {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  }

  if (import.meta.client) {
    document.addEventListener('keydown', handleKeyDown)
    
    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeyDown)
    })
  }
})
