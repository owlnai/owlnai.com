interface Track {
  name: string
  url: string
  artist: { '#text': string }
  '@attr'?: { nowplaying?: string }
}

export default defineCachedEventHandler(
  async (event) => {
    const { apiKey, user } = useRuntimeConfig(event).lastfm
    if (!apiKey || !user) return { track: null }

    try {
      const recent = await $fetch<{ recenttracks: { track: Track[] } }>('https://ws.audioscrobbler.com/2.0/', {
        query: { method: 'user.getrecenttracks', user, api_key: apiKey, format: 'json', limit: 1 },
        signal: AbortSignal.timeout(4000),
      })
      const track = recent.recenttracks.track[0]
      if (!track) return { track: null }
      return {
        track: {
          name: track.name,
          artist: track.artist['#text'],
          url: track.url,
          nowPlaying: track['@attr']?.nowplaying === 'true',
        },
      }
    } catch {
      return { track: null }
    }
  },
  { maxAge: 60, swr: true, name: 'lastfm-recent' },
)
