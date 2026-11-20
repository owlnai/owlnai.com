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
    '@nuxt/content',
    '@ui-sdk/vue',
    '@nuxtjs/seo',
    '@nuxt/image',
  ],
  // Every sitemap URL is known at build time, so write sitemap.xml as a file instead of a Worker route
  sitemap: { zeroRuntime: true },
  // No OG image renderer is installed; this also stops the module copying its fonts into the build
  ogImage: { enabled: false },
  // Bundled with @nuxtjs/seo v6. It registers a service worker and polls for new builds,
  // and its store of old assets lives in node_modules/.cache, which Workers Builds does not keep
  skewProtection: false,
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
    // Build for Cloudflare Workers. wrangler.jsonc at the repo root points `wrangler deploy` at dist/.
    preset: 'cloudflare_module',
    output: { dir: 'dist' },
    // about.html rather than about/index.html, so Workers serves /about without redirecting to /about/
    prerender: { crawlLinks: true, autoSubfolderIndex: false, routes: ['/rss.xml'] },
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
