# owlnai.com

The personal site of Unai Mengual: writing, notes, places and the tools he uses.

Built with a Nuxt 5 nightly and Vue 3. Every page is prerendered, and the site is deployed as a
Cloudflare Worker through [ViteHub](https://vitehub.dev). Content is Markdown in `content/`.

## Setup

You need Node 24 and pnpm 12. Other package managers do not read `pnpm-workspace.yaml`, which pins the
Nuxt nightly, so they install the wrong versions.

```bash
pnpm install
```

```bash
pnpm dev
```

The dev server runs on `http://localhost:3000`. To show the "now playing" card locally, copy
`.env.example` to `.env` and fill in the Last.fm values.

## Checking a change

```bash
pnpm check
```

This runs the type check, the tests and a production build. The build fails if any page cannot be
prerendered, including when a content file has invalid frontmatter.

To try the built Worker locally, build first and then preview:

```bash
pnpm build
```

```bash
pnpm preview
```

## Deploying

Cloudflare Workers Builds builds with `pnpm build` and deploys with `pnpm exec nitro deploy --prebuilt`.
The Last.fm user for the "now playing" card is set in `wrangler.jsonc`; the API key is a Worker secret
(`npx wrangler secret put NUXT_LASTFM_API_KEY --name owlnai-com`).

How the project is put together, and how to add content, is in [AGENTS.md](AGENTS.md).
