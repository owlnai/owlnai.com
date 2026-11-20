// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: [
    '~/assets/css/main.css',
    '@fontsource-variable/geist/wght.css',
    '@fontsource-variable/geist/wght-italic.css',
    '@fontsource-variable/geist-mono/wght.css',
  ],
  site: {
    url: 'https://owlnai.com',
    name: 'Unai Mengual',
    description: 'Full-stack developer in Spain. Nuxt, Vue, open source and a soft spot for wikis.',
    defaultLocale: 'en',
  },
  modules: [
    '@nuxthub/core',
    '@nuxt/content',
    '@ui-sdk/vue',
    '@nuxtjs/seo',
    '@nuxt/image',
  ],
  hub: {
    // Build for Cloudflare Workers (the cloudflare_module preset) instead of Pages.
    // wrangler.jsonc at the repo root points `wrangler deploy` at the output in dist/.
    workers: true,
  },
  content: {
    experimental: {
      // node:sqlite, so local dev doesn't depend on a better-sqlite3 binary built for one Node version
      sqliteConnector: 'native',
    },
  },
  runtimeConfig: {
    // Set with NUXT_LASTFM_API_KEY and NUXT_LASTFM_USER
    lastfm: { apiKey: '', user: '' },
  },
  routeRules: {
    // Baked at build time, so Markdown content needs no database at runtime
    '/': { prerender: true },
    '/about': { prerender: true },
    '/uses': { prerender: true },
    '/notes': { prerender: true },
    '/places': { prerender: true },
    '/places/**': { prerender: true },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/rss.xml': { prerender: true },
  },
  nitro: {
    prerender: { crawlLinks: true, routes: ['/rss.xml'] },
    experimental: {
      openAPI: true,
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
