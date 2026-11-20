import { createError, defineEventHandler, getRouterParam } from 'nuxt/server'
import { getEntry, isSource } from '../utils/site-content'

// GET /api/site/blog/<slug>: one document with its body. `pages` lives at the root, so
// /api/site/pages/about reads /about. Registered in nuxt.config.ts for dev and prerender only.
export default defineEventHandler(async (event) => {
  const source = getRouterParam(event, 'source') ?? ''
  const slug = getRouterParam(event, 'slug') ?? ''
  if (!isSource(source)) throw createError({ status: 404, statusText: 'Unknown content folder' })
  const entry = await getEntry(source, source === 'pages' ? `/${slug}` : `/${source}/${slug}`)
  if (!entry) throw createError({ status: 404, statusText: 'Not found' })
  return entry
})
