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

// Newest first for dated folders; notes keep their file order, like the old `order('stem', 'ASC')`
const order: Record<SourceName, (a: Entry<SourceName>, b: Entry<SourceName>) => number> = {
  pages: (a, b) => a.path.localeCompare(b.path),
  blog: (a, b) => String((b as Entry<'blog'>).date).localeCompare(String((a as Entry<'blog'>).date)),
  notes: (a, b) => a.path.localeCompare(b.path),
  places: (a, b) => String((b as Entry<'places'>).date).localeCompare(String((a as Entry<'places'>).date)),
}

export function isSource(name: string): name is SourceName {
  return Object.hasOwn(schemas, name)
}

/** Every document of one folder, sorted. `list()` leaves bodies out, so `withBody` reads each one. */
export async function listEntries<S extends SourceName>(source: S, { withBody = false } = {}) {
  const docs = (await content.list([source])) as Document[]
  const entries = docs.map((doc) => toEntry(source, doc)).sort(order[source]) as Entry<S>[]
  if (!withBody) return entries
  return Promise.all(
    entries.map(async (entry) => {
      const doc = (await content.get(entry.path)) as Document | null
      return { ...entry, body: toBody(doc ?? { ...entry, data: {}, meta: {} }) } as EntryWithBody<S>
    }),
  )
}

/** One document with its body, or null when the path is not in that folder. */
export async function getEntry<S extends SourceName>(source: S, path: string): Promise<EntryWithBody<S> | null> {
  const doc = (await content.get(path)) as Document | null
  if (!doc || doc.meta.source !== source) return null
  return { ...toEntry(source, doc), body: toBody(doc) }
}
