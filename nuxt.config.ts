// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

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
    'vite-hub/nuxt',
    '@ui-sdk/vue',
    '@nuxtjs/seo',
    '@nuxt/image',
  ],
  // ViteHub sets Nitro's cloudflare-module preset and writes .output/server/wrangler.json with the bindings
  vitehub: {
    // The Worker name; without it ViteHub takes the package.json name and would deploy a new Worker
    name: 'owlnai-com',
    host: 'cloudflare',
    // Nitro's cache in Workers KV (binding CACHE), shared by every Worker instance.
    // The all-zero id is a placeholder: ViteHub leaves it out of the generated wrangler.json, so Wrangler
    // creates the namespace on the first deploy. Put the real id here after that.
    cache: { driver: 'cloudflare', namespaceId: '00000000000000000000000000000000' },
  },
  // Every sitemap URL is known at build time, so write sitemap.xml as a file instead of a Worker route
  sitemap: { zeroRuntime: true },
  // No OG image renderer is installed; this also stops the module copying its fonts into the build
  ogImage: { enabled: false },
  // Bundled with @nuxtjs/seo v6. It registers a service worker and polls for new builds,
  // and its store of old assets lives in node_modules/.cache, which Workers Builds does not keep
  skewProtection: false,
  $development: {
    nitro: {
      // Nitro 3's dev server runs server code as ES modules and cannot load the CommonJS build of `yaml`,
      // which ViteHub Content and AI Ready import. Its ES module build has the same API.
      alias: { yaml: fileURLToPath(new URL('./node_modules/yaml/browser/index.js', import.meta.url)) },
    },
  },
  runtimeConfig: {
    // Set with NUXT_LASTFM_API_KEY and NUXT_LASTFM_USER
    lastfm: { apiKey: '', user: '' },
  },
  routeRules: {
    // Baked at build time; client-side navigation then reads each page's prerendered payload
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
    // Content routes run in dev and while prerendering, never in the deployed Worker: every page that reads
    // them is prerendered, and leaving them out keeps Comark, Shiki and the Content runtime out of the bundle
    handlers: [
      { route: '/api/site/:source', method: 'get', handler: '~~/server/content-routes/list.ts', env: ['dev', 'prerender'] },
      { route: '/api/site/:source/**:slug', method: 'get', handler: '~~/server/content-routes/entry.ts', env: ['dev', 'prerender'] },
      { route: '/rss.xml', method: 'get', handler: '~~/server/content-routes/rss.ts', env: ['dev', 'prerender'] },
    ],
    // about.html rather than about/index.html, so Workers serves /about without redirecting to /about/
    prerender: { crawlLinks: true, autoSubfolderIndex: false, routes: ['/rss.xml'] },
    experimental: {
      openAPI: true,
    },
  },
  hooks: {
    'nitro:init'(nitro) {
      if (nitro.options.dev) return
      // ViteHub 0.3 always adds a draft-preview plugin that imports server/content.ts, which would bundle
      // Comark and its UI preset (about 2 MB gzipped) into the Worker. Previews are for editable collections,
      // which this site does not have, and every content page is prerendered.
      nitro.options.plugins = nitro.options.plugins.filter((plugin) => !plugin.endsWith('.vitehub/content/preview.mjs'))
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
