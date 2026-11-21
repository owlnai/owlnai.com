import { type ContentBody, type ContentNode, type Entry, type EntryWithBody, schemas, type SourceName, type TocLink } from '#shared/content'
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

function toBody(doc: Document): ContentBody {
  return { nodes: doc.nodes ?? [], toc: doc.meta.toc?.links ?? [] }
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
      return Object.assign({}, entry, { body: toBody(doc) })
    }),
  )
}

/** One document with its body, or null when the path is not in that folder. */
export async function getEntry<S extends SourceName>(source: S, path: string): Promise<EntryWithBody<S> | null> {
  const doc = (await content.get(path)) as Document | null
  if (!doc || doc.meta.source !== source) return null
  return Object.assign(toEntry(source, doc), { body: toBody(doc) })
}
