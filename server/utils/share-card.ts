// Share cards are large by default. Adding `?card=small` to any page's link asks for the small one instead:
// Discord, Slack and X then show the image as a thumbnail beside the text rather than full width. There is no
// size in between. Pages are prerendered, so the Worker swaps the tag on the way out (server/middleware/share-card.ts).

export const wantsSmallCard = (url: URL) => url.searchParams.get('card') === 'small'

export const withSmallCard = (html: string) =>
  html.replace(/(<meta name="twitter:card" content=")summary_large_image(")/, '$1summary$2')
