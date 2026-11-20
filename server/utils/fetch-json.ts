// Nitro 3 has no global $fetch on the server, so the API routes use fetch and this small wrapper.
// It throws on a timeout or a non-2xx answer, which lets staleIfError serve the last good value.
export async function fetchJson<T>(
  url: string | URL,
  { timeout, headers }: { timeout: number; headers?: Record<string, string> },
): Promise<T> {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(timeout) })
  if (!response.ok) throw new Error(`${new URL(url).host} answered ${response.status}`)
  return (await response.json()) as T
}

export const githubHeaders = { 'user-agent': 'owlnai.com', accept: 'application/vnd.github+json' }
