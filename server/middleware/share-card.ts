import { defineEventHandler } from 'nuxt/server'
import { wantsSmallCard, withSmallCard } from '../utils/share-card'

interface Assets {
  fetch: (request: Request) => Promise<Response>
}

// In the deployed Worker, page requests reach this before the static files (`run_worker_first` in
// wrangler.jsonc), so a link with `?card=small` gets its prerendered page with the small share card. Every other
// request gets its static file as before, and a path with no file carries on to the Worker's 404 page. In dev
// and while prerendering there is no ASSETS binding and this does nothing.
export default defineEventHandler(async (event) => {
  const runtime = (event.req as { runtime?: { cloudflare?: { env?: { ASSETS?: Assets } } } }).runtime
  const assets = runtime?.cloudflare?.env?.ASSETS
  if (!assets) return

  const url = new URL(event.req.url)
  // The Worker's own routes
  if (url.pathname.startsWith('/api/') || url.pathname === '/contact.vcf') return

  const page = await assets.fetch(event.req)
  // No such file: carry on to the Worker's own 404 page, as before
  if (page.status === 404) return
  if (event.req.method !== 'GET' || !wantsSmallCard(url)) return page
  if (!page.ok || !page.headers.get('content-type')?.startsWith('text/html')) return page
  const headers = new Headers(page.headers)
  headers.delete('content-length')
  headers.delete('etag')
  return new Response(withSmallCard(await page.text()), { status: page.status, headers })
})
