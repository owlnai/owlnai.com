import { defineEventHandler } from 'nuxt/server'
import { getOwnRepos } from '../utils/github'

// The repository I pushed to last and the stars across my own repositories
export default defineEventHandler(async (event) => {
  try {
    const repos = await getOwnRepos(event)
    const latest = repos[0]
    return {
      stars: repos.reduce((sum, repo) => sum + repo.stars, 0),
      latest: latest ? { name: latest.name, url: latest.url, pushedAt: latest.pushedAt } : null,
    }
  } catch {
    return { stars: null, latest: null }
  }
})
