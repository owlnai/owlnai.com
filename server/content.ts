import css from '@shikijs/langs/css'
import html from '@shikijs/langs/html'
import javascript from '@shikijs/langs/javascript'
import githubDark from '@shikijs/themes/github-dark'
import githubLight from '@shikijs/themes/github-light'
import headingLinks from 'comark/plugins/heading-links'
import shiki from 'comark/plugins/shiki'
import toc from 'comark/plugins/toc'
import type { ShikiTransformer } from 'shiki'
import { defineContent } from 'vite-hub/content'
import { glob } from 'vite-hub/source'

// Shiki writes the light colour as an inline `color`, which would beat the stylesheet. As `--shiki-default`
// it pairs with `--shiki-dark`, and main.css picks one with light-dark() from the page's colour scheme.
const colorsAsVariables: ShikiTransformer = {
  name: 'owlnai:colors-as-variables',
  span(node) {
    const style = node.properties.style
    if (typeof style === 'string') node.properties.style = style.replace(/(^|;)color:/, '$1--shiki-default:')
  },
}

// The Markdown in content/, read by ViteHub Content and parsed by Comark.
// A server build bundles each glob() with its files, so a Worker reads them without a file system.
export default defineContent({
  sources: {
    // about.md and headline.md
    pages: glob({ cwd: 'content', include: '*.md' }),
    blog: glob({ cwd: 'content', include: 'blog/*.md' }),
    // Short snippets: a thought, a quote worth keeping, or a piece of code
    notes: glob({ cwd: 'content', include: 'notes/*.md' }),
    // Travel posts. Photos live in public/places/<slug>/
    places: glob({ cwd: 'content', include: 'places/*.md' }),
  },
  markdown: {
    // Only what the posts use, instead of the Comark UI preset and its charts, tabs and carousels
    preset: false,
    plugins: [
      shiki({
        // Only the languages the posts use, so the Worker does not carry Shiki's whole grammar set.
        // Add one here when a post starts using it.
        registerDefaultLanguages: false,
        registerDefaultThemes: false,
        languages: [html, css, javascript],
        themes: { light: githubLight, dark: githubDark },
        transformers: [colorsAsVariables],
      }),
      headingLinks({ tags: ['h2', 'h3'] }),
      toc({ depth: 3, searchDepth: 3 }),
    ],
  },
  // The pages read Content through server/content-routes/ (mounted at /api/site/), so the generic
  // /api/content/** reader stays off
  route: false,
})
