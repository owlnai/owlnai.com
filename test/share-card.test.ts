import assert from 'node:assert/strict'
import { test } from 'node:test'
import { wantsSmallCard, withSmallCard } from '../server/utils/share-card.ts'

const page = '<meta property="og:image" content="/_og/a.png"><meta name="twitter:card" content="summary_large_image">'

test('swaps the large share card for the small one', () => {
  assert.equal(
    withSmallCard(page),
    '<meta property="og:image" content="/_og/a.png"><meta name="twitter:card" content="summary">',
  )
})

test('only ?card=small asks for the small card', () => {
  assert.equal(wantsSmallCard(new URL('https://owlnai.com/places?card=small')), true)
  assert.equal(wantsSmallCard(new URL('https://owlnai.com/places')), false)
  assert.equal(wantsSmallCard(new URL('https://owlnai.com/places?card=large')), false)
})
