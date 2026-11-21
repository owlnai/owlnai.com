import { defineEventHandler } from 'nuxt/server'
import { defineCachedFunction } from 'vite-hub/cache'
import { fetchJson, type ServerEvent } from '../utils/fetch-json'

interface FeedItem {
  reason?: unknown
  post: { uri: string; record: { text?: string; createdAt?: string } }
}

const handle = 'owlnai.com'

// Cached in Workers KV for 15 minutes and served stale for up to a day while it refreshes.
// If Bluesky fails after that, the last post is served for up to a week.
const getLatestPost = defineCachedFunction(
  async (_event: ServerEvent) => {
    const url = new URL('https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed')
    url.search = new URLSearchParams({ actor: handle, limit: '10', filter: 'posts_no_replies' }).toString()
    const { feed } = await fetchJson<{ feed: FeedItem[] }>(url, { timeout: 8000 })
    const own = feed.find((item) => !item.reason && item.post.record.text)
    if (!own) return { post: null }
    return {
      post: {
        text: own.post.record.text ?? '',
        createdAt: own.post.record.createdAt ?? null,
        url: `https://bsky.app/profile/${handle}/post/${own.post.uri.split('/').pop()}`,
      },
    }
  },
  {
    maxAge: 60 * 15,
    staleMaxAge: 60 * 60 * 24,
    swr: true,
    staleIfError: 60 * 60 * 24 * 7,
    name: 'bluesky-latest',
    getKey: () => handle,
  },
)

export default defineEventHandler(async (event) => {
  try {
    return await getLatestPost(event)
  } catch {
    return { post: null }
  }
})
