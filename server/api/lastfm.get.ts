interface Image {
  size: 'small' | 'medium' | 'large' | 'extralarge'
  '#text': string
}

interface Track {
  name: string
  url: string
  artist: { '#text': string }
  album?: { '#text': string }
  image?: Image[]
  // Missing while the track is still playing
  date?: { uts: string }
  '@attr'?: { nowplaying?: string }
}

// Last.fm serves this grey star when it has no cover for a track, which reads worse than no cover at all
const PLACEHOLDER = '2a96cbd8b46e442fc41c2b86b821562f'

const cover = (images: Image[] | undefined, size: Image['size']) => {
  const url = images?.find((image) => image.size === size)?.['#text']
  return url && !url.includes(PLACEHOLDER) ? url : null
}

// The latest scrobble, polled by the header island and the home page every 30 seconds while a tab is open.
// Cached here so Last.fm sees at most a couple of requests a minute, however many people are reading.
export default defineCachedEventHandler(
  async (event) => {
    const { apiKey, user } = useRuntimeConfig(event).lastfm
    if (!apiKey || !user) return { track: null }

    try {
      const recent = await $fetch<{ recenttracks: { track: Track[] } }>('https://ws.audioscrobbler.com/2.0/', {
        query: { method: 'user.getrecenttracks', user, api_key: apiKey, format: 'json', limit: 1 },
        signal: AbortSignal.timeout(4000),
      })
      // While something plays, it comes first, ahead of the `limit` finished tracks
      const track = recent.recenttracks.track[0]
      if (!track) return { track: null }
      // 64px and 174px. Not 'extralarge': its 300x300 link fails for some covers, and 174px is plenty here.
      const small = cover(track.image, 'medium')
      const large = cover(track.image, 'large')
      return {
        track: {
          name: track.name,
          artist: track.artist['#text'],
          album: track.album?.['#text'] || null,
          url: track.url,
          cover: small && large ? { small, large } : null,
          nowPlaying: track['@attr']?.nowplaying === 'true',
          playedAt: track.date ? new Date(Number(track.date.uts) * 1000).toISOString() : null,
        },
      }
    } catch {
      return { track: null }
    }
  },
  { maxAge: 30, swr: true, name: 'lastfm-recent' },
)
