import { z } from 'zod'

// 'YYYY-MM-DD', or 'YYYY-MM' for a month-only date. Anything else would sort and format wrongly.
const isRealDate = (value: string) => {
  const time = Date.parse(`${value.length === 7 ? `${value}-01` : value}T00:00:00Z`)
  return !Number.isNaN(time) && new Date(time).toISOString().startsWith(value)
}
const date = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/, 'Use YYYY-MM-DD or YYYY-MM, in quotes')
  .refine(isRealDate, 'Not a real calendar date')

// Frontmatter of each folder in content/. The server checks every document against these, and each page
// that lists content fails when its fetch does (assertLoaded in app/utils/content.ts), so a typo in a date
// or a missing title fails the prerender instead of reaching a page.
export const schemas = {
  // about.md and headline.md
  pages: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
  blog: z.object({
    title: z.string(),
    description: z.string().optional(),
    date,
    canonical: z.string().optional(),
  }),
  // Short snippets: a thought, a quote worth keeping, or a piece of code
  notes: z.object({
    kind: z.enum(['note', 'quote', 'code']).default('note'),
    caption: z.string().optional(),
    author: z.string().optional(),
    url: z.string().optional(),
    date: date.optional(),
  }),
  // Travel posts. Photos live in public/places/<slug>/
  places: z.object({
    title: z.string(),
    description: z.string().optional(),
    date,
    country: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    // [latitude, longitude], used to pin the place on the map
    coords: z.tuple([z.number(), z.number()]).optional(),
  }),
}

export type SourceName = keyof typeof schemas

// A Comark node: text, or [tag, attributes, ...children]
export type ContentNode = string | [string | null, Record<string, unknown>, ...ContentNode[]]

export interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

export interface ContentBody {
  nodes: ContentNode[]
  // The h2 and h3 headings, for a post's "On this page"
  toc: TocLink[]
}

export type Entry<S extends SourceName> = z.output<(typeof schemas)[S]> & { path: string }
export type EntryWithBody<S extends SourceName> = Entry<S> & { body: ContentBody }

export type BlogPost = Entry<'blog'>
export type Note = EntryWithBody<'notes'>
export type Place = Entry<'places'>
