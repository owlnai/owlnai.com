// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

// Geist upright and italic, latin and latin-ext. The npm provider reads only a package's index.css, which for
// @fontsource-variable/geist has no italics, so these faces point at the package's files directly.
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
const LATIN_EXT = 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'
const geistFaces = (['normal', 'italic'] as const).flatMap((style) =>
  ([['latin', LATIN], ['latin-ext', LATIN_EXT]] as const).map(([subset, unicodeRange]) => ({
    name: 'Geist Variable',
    src: {
      url: new URL(`./node_modules/@fontsource-variable/geist/files/geist-${subset}-wght-${style}.woff2`, import.meta.url).href,
      format: 'woff2',
    },
    weight: [100, 900] as [number, number],
    style,
    unicodeRange,
    global: true,
  })),
)

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  // Self-hosted from the installed @fontsource packages (no network needed) and served from /_fonts/.
  // Importing the @fontsource CSS directly let the Nuxt 5 nightly build point each @font-face at another font's file.
  fonts: {
    defaults: { subsets: ['latin', 'latin-ext'] },
    families: [
      ...geistFaces,
      { name: 'Geist Mono Variable', provider: 'npm', weights: ['100 900'], styles: ['normal'], global: true },
      // The contact ticket on the About page
      { name: 'Bebas Neue', provider: 'npm', weights: [400], styles: ['normal'], global: true },
      { name: 'Space Mono', provider: 'npm', weights: [400, 700], styles: ['normal'], global: true },
    ],
  },
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
    '@nuxt/fonts',
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
  // Share images, rendered by Takumi from app/components/OgImage/ while pages prerender. Zero runtime keeps the
  // renderer out of the Worker, which serves them as static PNGs; prerendered images need no signing secret.
  ogImage: { zeroRuntime: true },
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
