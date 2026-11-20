import { defineEventHandler } from 'nuxt/server'
import { listEntries } from '../utils/site-content'

// GET /rss.xml, prerendered. Registered in nuxt.config.ts for dev and prerender only.
const site = 'https://owlnai.com'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export default defineEventHandler(async () => {
  // Newest first
  const posts = await listEntries('blog')

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site}${post.path}</link>
      <guid>${site}${post.path}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description ?? '')}</description>
    </item>`,
    )
    .join('\n')

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Unai Mengual</title>
    <link>${site}/blog</link>
    <description>Writing by Unai Mengual.</description>
    <language>en</language>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
  return new Response(body, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } })
})
