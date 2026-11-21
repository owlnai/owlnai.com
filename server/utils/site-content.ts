import { type ContentBody, type ContentNode, type Entry, type EntryWithBody, schemas, type SourceName, type TocLink } from '#shared/content'
import { readFile } from 'node:fs/promises'
import { imageMeta } from 'image-meta'
import content from '../content'

interface Document {
  path: string
  data: Record<string, unknown>
  meta: { source?: string; toc?: { links?: TocLink[] } }
  nodes?: ContentNode[]
}

function toEntry<S extends SourceName>(source: S, doc: Document): Entry<S> {
  const parsed = schemas[source].safeParse(doc.data)
  if (!parsed.success) throw new Error(`Invalid frontmatter in ${doc.path}: ${parsed.error.message}`)
  return { ...(parsed.data as Entry<S>), path: doc.path }
}

// The intrinsic size of a photo in public/, so the page can keep its space before it loads. This file runs
// only in dev and while prerendering (Node, from the project root), never in the Worker.
async function sizeOf(src: string) {
  const { width, height } = imageMeta(await readFile(`public${src}`))
  return { width, height }
}

async function withImageSizes(nodes: ContentNode[]): Promise<ContentNode[]> {
  return Promise.all(
    nodes.map(async (node): Promise<ContentNode> => {
      if (typeof node === 'string') return node
      const [tag, attrs, ...children] = node
      const src = attrs.src
      const sized = tag === 'img' && typeof src === 'string' && src.startsWith('/') ? { ...attrs, ...(await sizeOf(src)) } : attrs
      return [tag, sized, ...(await withImageSizes(children))]
    }),
  )
}

async function toBody(doc: Document): Promise<ContentBody> {
  return { nodes: await withImageSizes(doc.nodes ?? []), toc: doc.meta.toc?.links ?? [] }
}

// Newest first for dated folders; pages and notes keep their file order
const byPath = (a: { path: string }, b: { path: string }) => a.path.localeCompare(b.path)
const byDateDesc = (a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date)
const order: { [S in SourceName]: (a: Entry<S>, b: Entry<S>) => number } = {
  pages: byPath,
  blog: byDateDesc,
  notes: byPath,
  places: byDateDesc,
}

export function isSource(name: string): name is SourceName {
  return Object.hasOwn(schemas, name)
}

/** Every document of one folder, sorted. `list()` leaves bodies out, so `withBody` reads each one. */
export async function listEntries<S extends SourceName>(source: S, { withBody = false } = {}) {
  const docs = (await content.list([source])) as Document[]
  const entries = docs.map((doc) => toEntry(source, doc)).sort(order[source])
  if (!withBody) return entries
  return Promise.all(
    entries.map(async (entry) => {
      const doc = (await content.get(entry.path)) as Document | null
      if (!doc) throw new Error(`Missing body for ${entry.path}`)
      return Object.assign({}, entry, { body: await toBody(doc) })
    }),
  )
}

/** One document with its body, or null when the path is not in that folder. */
export async function getEntry<S extends SourceName>(source: S, path: string): Promise<EntryWithBody<S> | null> {
  const doc = (await content.get(path)) as Document | null
  if (!doc || doc.meta.source !== source) return null
  const entry = toEntry(source, doc)
  const cover = 'cover' in entry ? entry.cover : undefined
  const coverSize = cover?.startsWith('/') ? await sizeOf(cover) : undefined
  return Object.assign(entry, { body: await toBody(doc), coverSize })
}
