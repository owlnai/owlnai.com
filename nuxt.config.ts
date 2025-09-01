// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: [
    '~/assets/css/main.css',
  ],
  modules: ['@nuxthub/core', '@nuxt/content', '@unocss/nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  }
})
