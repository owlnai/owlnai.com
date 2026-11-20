import { createError, defineEventHandler, getQuery, getRouterParam } from 'nuxt/server'
import { isSource, listEntries } from '../utils/site-content'

// GET /api/site/blog, /api/site/places, /api/site/notes?body=1. Registered in nuxt.config.ts for dev and
// prerender only: every page that reads it is prerendered, so the Worker never needs it.
export default defineEventHandler(async (event) => {
  const source = getRouterParam(event, 'source') ?? ''
  if (!isSource(source)) throw createError({ status: 404, statusText: 'Unknown content folder' })
  return listEntries(source, { withBody: getQuery(event).body === '1' })
})
