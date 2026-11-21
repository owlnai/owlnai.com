import assert from 'node:assert/strict'
import { test } from 'node:test'
import { schemas } from '../shared/content.ts'

const blog = (date: unknown) => schemas.blog.safeParse({ title: 'A post', date }).success

test('accepts full and month-only ISO dates', () => {
  assert.equal(blog('2025-11-03'), true)
  assert.equal(blog('2025-11'), true)
})

test('rejects dates that would sort or format wrongly', () => {
  for (const bad of ['2025-11-3', '2025/11/03', 'Nov 3 2025', '2025-13-01', '2025-02-30', '2025-04-31', '', 20251103]) {
    assert.equal(blog(bad), false, `expected ${JSON.stringify(bad)} to be rejected`)
  }
})

test('places and notes use the same date rule', () => {
  assert.equal(schemas.places.safeParse({ title: 'A place', date: '2025-10' }).success, true)
  assert.equal(schemas.places.safeParse({ title: 'A place', date: '10/2025' }).success, false)
  assert.equal(schemas.notes.safeParse({}).success, true)
  assert.equal(schemas.notes.safeParse({ date: '2024-11-04' }).success, true)
  assert.equal(schemas.notes.safeParse({ date: 'yesterday' }).success, false)
})

test('a missing title is rejected', () => {
  assert.equal(schemas.blog.safeParse({ date: '2025-11-03' }).success, false)
  assert.equal(schemas.places.safeParse({ date: '2025-11-03' }).success, false)
})
