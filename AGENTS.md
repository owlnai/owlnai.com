# owlnai.com

Personal site. Nuxt 5 nightly, Vue 3, Nitro 3, prerendered, deployed as a Cloudflare Worker through ViteHub.
Commit and pull-request rules are in the maintainer's global agent rules, not here.

## Commands

- pnpm 12 only. Settings and the Nuxt nightly overrides are in `pnpm-workspace.yaml`. Never share or symlink
  `node_modules` between checkouts: pnpm re-links the original folder. Each worktree runs its own `pnpm install`.
- `pnpm check` runs the type check, the tests and a production build. Run it before saying a change works.
- `pnpm build` then `pnpm preview` serves the built Worker locally. Preview shows the last build, so rebuild first.
- Tests are `test/*.test.ts` on plain Node (`pnpm test`); they can import only modules without Nuxt auto-imports.

## How it runs

- Every page is prerendered (`routeRules` in `nuxt.config.ts`). The Worker serves only `/api/lastfm`,
  `/api/github`, `/api/bluesky`, `/api/stars` and `/contact.vcf`, and pages fetch those in the browser.
- `/api/site/**` and `/rss.xml` (`server/content-routes/`) exist only in dev and while prerendering. A new page
  that reads them must be prerendered and must call `assertLoaded` on the fetch's `error`.
- Server code: import from `nuxt/server` (`nitro/h3` where a handler needs the `H3Event` type, as
  `server/api/lastfm.get.ts` does); there is no global `$fetch`, use `fetchJson`; return `new Response` to set
  headers. Upstream failures become a null-shaped answer on purpose.
- App code: the global `$fetch` is not typed by route on this nightly (`useFetch` is). Give it a type argument:
  `Entry`/`EntryWithBody` from `#shared/content`, or `Response<'/api/…'>` from `#build/server-routes`.
- Cached functions take the request event as their first argument and set `staleMaxAge`.
- Cache rules for files in `public/` are in `public/_headers`; a page's `_payload.json` must stay uncached.

## Content

- `content/blog`, `content/notes`, `content/places`, plus `content/about.md` and `content/headline.md`.
  Frontmatter is checked against `shared/content.ts`; a bad field fails the build.
- Dates are quoted: `'YYYY-MM-DD'`, or `'YYYY-MM'` for a month. Blog and places sort newest first; notes sort by
  file name.
- A place: photos go in `public/places/<slug>/`, resized to at most 2000 px with metadata removed; originals stay
  in the ignored `.originals/`. `coords` is `[latitude, longitude]`. `country` must be a key in
  `app/data/flags.ts`, or no flag shows.
- Code blocks are highlighted for html, css and javascript only; add a language in `server/content.ts`.
- Editing the uses page: bump `usesUpdated` in `app/data/uses.ts`.

## Do not clean these up

Each is a workaround with a comment in `nuxt.config.ts` explaining it:

- The `geistFaces` font block: the nightly's production build pointed each `@font-face` at the wrong file.
- The `yaml` alias under `$development`.
- The `nitro:init` hook that drops ViteHub's draft-preview plugin (it would add about 2 MB to the Worker).
- `vitehub.name` and `skewProtection: false`.

## Upgrading the Nuxt nightly or ViteHub

- The nightly version appears four times: `package.json` and three overrides in `pnpm-workspace.yaml`. Change all four.
- After the bump, run `pnpm check`, then check in the built CSS that `Geist Variable` still points at a
  `geist-latin` file, and that the Worker did not grow (`du -sh .output/server`, about 4 MB with source maps).
- `vite-hub` and `@vite-hub/content` move together. So do `comark` and `@comark/vue`.
- `typescript` stays pinned to 5.9.3: `vue-tsc` cannot load TypeScript 7.

## Deploy

Cloudflare Workers Builds: `pnpm build`, then `pnpm exec nitro deploy --prebuilt`. A deploy replaces the Worker's
plain variables with `vars` in `wrangler.jsonc`, so set variables there, not in the dashboard. The Last.fm API key
is a Worker secret. Never commit `.env`, `.dev.vars`, `content/.obsidian/` or `.originals/`.
