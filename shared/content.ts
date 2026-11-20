import { z } from 'zod'

// Frontmatter of each folder in content/. The server checks every document against these,
// so a typo in a date or a missing title fails the prerender instead of reaching a page.
export const schemas = {
  // about.md and headline.md
  pages: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
  blog: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    canonical: z.string().optional(),
  }),
  // Short snippets: a thought, a quote worth keeping, or a piece of code
  notes: z.object({
    kind: z.enum(['note', 'quote', 'code']).default('note'),
    caption: z.string().optional(),
    author: z.string().optional(),
    url: z.string().optional(),
    date: z.string().optional(),
  }),
  // Travel posts. Photos live in public/places/<slug>/
  places: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
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
