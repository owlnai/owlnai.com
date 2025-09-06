// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: [
    '~/assets/css/main.css',
  ],
    site: {
    url: 'https://owlnai.com',
    name: 'Owlnai',
    description: 'Developer, writer, and open source enthusiast.',
    defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
  },
  modules: [
    '@nuxthub/core',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxt/image',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  nitro: {
    experimental: {
      openAPI: true
    }
  },
    app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})