import type { Response as ApiResponse } from '#build/server-routes'

// `$fetch` is not typed by route on this Nuxt version (only `useFetch` is), so the response type is named here
const fetchLatest = () =>
  $fetch<ApiResponse<'/api/lastfm'>>('/api/lastfm', { cache: 'no-cache' })
    .then((response) => response.track)
    .catch(() => undefined)

export type NowPlaying = NonNullable<Awaited<ReturnType<typeof fetchLatest>>>

// Matches the server's cache, so a poll rarely comes back unchanged for long
const INTERVAL = 30_000

// One poller for the whole app, however many components are listening
let listeners = 0
let timer: ReturnType<typeof setInterval> | undefined

/**
 * My latest Last.fm scrobble, kept fresh while the page is open. The header island and the home page
 * share it, so they always agree. Polling pauses while the tab is in the background and catches up
 * the moment it's visible again. Nothing is fetched on the server: pages are prerendered.
 */
export function useNowPlaying() {
  const track = useState<NowPlaying | null>('now-playing', () => null)
  const loaded = useState('now-playing-loaded', () => false)

  async function refresh() {
    const latest = await fetchLatest()
    // A dropped request keeps what we had rather than flickering the island away
    if (latest !== undefined) track.value = latest
    loaded.value = true
  }

  function onVisibility() {
    if (!document.hidden) refresh()
  }

  function start() {
    refresh()
    timer = setInterval(() => !document.hidden && refresh(), INTERVAL)
    document.addEventListener('visibilitychange', onVisibility)
  }

  function stop() {
    clearInterval(timer)
    document.removeEventListener('visibilitychange', onVisibility)
  }

  onMounted(() => {
    if (listeners++ === 0) start()
  })

  onBeforeUnmount(() => {
    if (--listeners === 0) stop()
  })

  return { track, loaded, playing: computed(() => track.value?.nowPlaying === true) }
}
