import { defineEventHandler } from 'nuxt/server'
import { defineCachedFunction } from 'vite-hub/cache'
import { fetchJson, githubHeaders } from '../utils/fetch-json'

interface Repo {
  name: string
  fork: boolean
  html_url: string
  pushed_at: string
  stargazers_count: number
}

// Cached in Workers KV for 30 minutes. If GitHub fails after that, the last answer is served for up to a week.
const getLatest = defineCachedFunction(
  async () => {
    const repos = await fetchJson<Repo[]>('https://api.github.com/users/owlnai/repos?per_page=100&sort=pushed', {
      timeout: 4000,
      headers: githubHeaders,
    })
    const own = repos.filter((repo) => !repo.fork)
    const latest = own[0]
    return {
      stars: own.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      latest: latest ? { name: latest.name, url: latest.html_url, pushedAt: latest.pushed_at } : null,
    }
  },
  { maxAge: 60 * 30, swr: true, staleIfError: 60 * 60 * 24 * 7, name: 'github-latest', getKey: () => 'owlnai' },
)

export default defineEventHandler(async () => {
  try {
    return await getLatest()
  } catch {
    return { stars: null, latest: null }
  }
})
