// Share cards are large by default. Adding `?card=small` to any page's link asks for the small one instead:
// Discord, Slack and X then show the image as a thumbnail beside the text rather than full width. There is no
// size in between. Pages are prerendered, so the Worker swaps the tags on the way out (server/middleware/share-card.ts).
//
// The large card's image has its text drawn on it, unreadable at thumbnail size, so the small card shows the image
// the page names in its `small-card-image` meta tag (app.vue sets my photo, a place page its cover).

export const wantsSmallCard = (url: URL) => url.searchParams.get('card') === 'small'

export const withSmallCard = (html: string) => {
  const small = html.replace(/(<meta name="twitter:card" content=")summary_large_image(")/, '$1summary$2')
  const image = /<meta name="small-card-image" content="([^"]+)"/.exec(html)?.[1]
  if (!image) return small
  return (
    small
      .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*(")/g, `$1${image}$2`)
      // The large image's size and type no longer apply
      .replace(/<meta property="og:image:(?:width|height|type)" content="[^"]*">/g, '')
  )
}
