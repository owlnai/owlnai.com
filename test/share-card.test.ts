import assert from 'node:assert/strict'
import { test } from 'node:test'
import { wantsSmallCard, withSmallCard } from '../server/utils/share-card.ts'

const head = (extra = '') =>
  '<meta name="twitter:image" content="https://owlnai.com/_og/a.jpeg">' +
  '<meta property="og:image" content="https://owlnai.com/_og/a.jpeg">' +
  '<meta property="og:image:type" content="image/jpeg">' +
  '<meta property="og:image:width" content="1200">' +
  '<meta property="og:image:height" content="600">' +
  '<meta name="twitter:card" content="summary_large_image">' +
  extra

test('swaps in the small card and the image the page names for it', () => {
  const small = withSmallCard(head('<meta name="small-card-image" content="https://owlnai.com/icon.png">'))
  assert.match(small, /<meta name="twitter:card" content="summary">/)
  assert.match(small, /<meta property="og:image" content="https:\/\/owlnai.com\/icon.png">/)
  assert.match(small, /<meta name="twitter:image" content="https:\/\/owlnai.com\/icon.png">/)
  assert.doesNotMatch(small, /og:image:(width|height|type)/)
})

test('keeps the large image when the page names no small one', () => {
  const small = withSmallCard(head())
  assert.match(small, /<meta name="twitter:card" content="summary">/)
  assert.match(small, /<meta property="og:image" content="https:\/\/owlnai.com\/_og\/a.jpeg">/)
})

test('only ?card=small asks for the small card', () => {
  assert.equal(wantsSmallCard(new URL('https://owlnai.com/places?card=small')), true)
  assert.equal(wantsSmallCard(new URL('https://owlnai.com/places')), false)
  assert.equal(wantsSmallCard(new URL('https://owlnai.com/places?card=large')), false)
})
