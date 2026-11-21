import { defineCachedFunction } from 'vite-hub/cache'
import { fetchJson, githubHeaders, type ServerEvent } from './fetch-json'

interface Repo {
  name: string
  full_name: string
  fork: boolean
  html_url: string
  pushed_at: string
  stargazers_count: number
}

// My own public repositories, most recently pushed first. One GitHub call feeds the "Pushed to" card, the total
// star count and the per-repository stars, so the unauthenticated rate limit is spent once per half hour.
// Cached in Workers KV for 30 minutes and served stale for up to a day while it refreshes in the background.
// If GitHub fails after that, the last answer is served for up to a week.
export const getOwnRepos = defineCachedFunction(
  async (_event: ServerEvent) => {
    const repos = await fetchJson<Repo[]>('https://api.github.com/users/owlnai/repos?per_page=100&sort=pushed', {
      timeout: 4000,
      headers: githubHeaders,
    })
    return repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        name: repo.name,
        slug: repo.full_name.toLowerCase(),
        url: repo.html_url,
        pushedAt: repo.pushed_at,
        stars: repo.stargazers_count,
      }))
  },
  {
    maxAge: 60 * 30,
    staleMaxAge: 60 * 60 * 24,
    swr: true,
    staleIfError: 60 * 60 * 24 * 7,
    name: 'github-repos',
    getKey: () => 'owlnai',
  },
)
