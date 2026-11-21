import { defineEventHandler } from 'nuxt/server'
import { defineCachedFunction } from 'vite-hub/cache'
import { openSource } from '~~/app/data/site'
import { fetchJson, githubHeaders, type ServerEvent } from '../utils/fetch-json'
import { getOwnRepos } from '../utils/github'

// Star counts for the open source items that link to a single repository (github.com/owner/repo).
// Items that link to a whole organisation have no single count and are left out.
const repoSlug = (href: string) => /^https:\/\/github\.com\/([^/]+\/[^/]+)\/?$/.exec(href)?.[1] ?? null

// One cached entry per repository, so one failing repository keeps its last count instead of vanishing.
const getStars = defineCachedFunction(
  async (_event: ServerEvent, slug: string) => {
    const repo = await fetchJson<{ stargazers_count: number }>(`https://api.github.com/repos/${slug}`, {
      timeout: 4000,
      headers: githubHeaders,
    })
    return repo.stargazers_count
  },
  {
    maxAge: 60 * 60,
    staleMaxAge: 60 * 60 * 24,
    swr: true,
    staleIfError: 60 * 60 * 24 * 7,
    name: 'github-stars',
    getKey: (_event: ServerEvent, slug: string) => slug,
  },
)

export default defineEventHandler(async (event) => {
  // My own repositories come from the list the "Pushed to" card already fetches; only the others need a call each
  const own = await getOwnRepos(event).catch(() => [])
  const entries = await Promise.all(
    openSource.map(async (item) => {
      const slug = repoSlug(item.href)
      if (!slug) return null
      const mine = own.find((repo) => repo.slug === slug.toLowerCase())
      if (mine) return [item.id, mine.stars] as const
      try {
        return [item.id, await getStars(event, slug)] as const
      } catch {
        return null
      }
    }),
  )
  return Object.fromEntries(entries.filter((entry) => entry !== null)) as Record<string, number>
})
