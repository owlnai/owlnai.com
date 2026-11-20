import { openSource } from '../../app/data/site'

// Star counts for the open source items that link to a single repository (github.com/owner/repo).
// Items that link to a whole organisation have no single count and are left out.
const repoSlug = (href: string) => /^https:\/\/github\.com\/([^/]+\/[^/]+)\/?$/.exec(href)?.[1] ?? null

export default defineCachedEventHandler(
  async () => {
    const entries = await Promise.all(
      openSource.map(async (item) => {
        const slug = repoSlug(item.href)
        if (!slug) return null
        try {
          const repo = await $fetch<{ stargazers_count: number }>(`https://api.github.com/repos/${slug}`, {
            headers: { 'user-agent': 'owlnai.com', accept: 'application/vnd.github+json' },
            signal: AbortSignal.timeout(4000),
          })
          return [item.id, repo.stargazers_count] as const
        } catch {
          return null
        }
      }),
    )
    return Object.fromEntries(entries.filter((entry) => entry !== null)) as Record<string, number>
  },
  { maxAge: 60 * 60, swr: true, name: 'github-stars' },
)
