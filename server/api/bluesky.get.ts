interface FeedItem {
  reason?: unknown
  post: { uri: string; record: { text?: string; createdAt?: string } }
}

const handle = 'owlnai.com'

export default defineCachedEventHandler(
  async () => {
    try {
      const { feed } = await $fetch<{ feed: FeedItem[] }>(
        'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed',
        { query: { actor: handle, limit: 10, filter: 'posts_no_replies' }, signal: AbortSignal.timeout(8000) },
      )
      const own = feed.find((item) => !item.reason && item.post.record.text)
      if (!own) return { post: null }
      return {
        post: {
          text: own.post.record.text ?? '',
          createdAt: own.post.record.createdAt ?? null,
          url: `https://bsky.app/profile/${handle}/post/${own.post.uri.split('/').pop()}`,
        },
      }
    } catch {
      return { post: null }
    }
  },
  { maxAge: 60 * 15, swr: true, name: 'bluesky-latest' },
)
