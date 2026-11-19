interface Repo {
  name: string
  fork: boolean
  html_url: string
  pushed_at: string
  stargazers_count: number
}

export default defineCachedEventHandler(
  async () => {
    try {
      const repos = await $fetch<Repo[]>('https://api.github.com/users/owlnai/repos?per_page=100&sort=pushed', {
        headers: { 'user-agent': 'owlnai.com', accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(4000),
      })
      const own = repos.filter((repo) => !repo.fork)
      const latest = own[0]
      return {
        stars: own.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        latest: latest ? { name: latest.name, url: latest.html_url, pushedAt: latest.pushed_at } : null,
      }
    } catch {
      return { stars: null, latest: null }
    }
  },
  { maxAge: 60 * 30, swr: true, name: 'github-latest' },
)
