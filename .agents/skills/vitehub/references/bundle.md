# Bundle size and startup cost

Use this when a task asks how big the app is, why the server starts slowly or hits a host size limit, why a page loads too much JavaScript, or why a package is in the output.

## Measure

1. Set `bundle: true` in `vitehub()` (`vite.config.ts`) or in `vitehub` (`nuxt.config.ts`). It is off by default.
2. Run a production build: `vite build` or `nuxt build`. Development builds are not measured.
3. Run `vitehub bundle`. It reads `.vitehub/bundle/` and needs no dev server.

`vitehub bundle` shows the client and the server separately. For each, it shows the JavaScript bytes, the gzip bytes, the startup code, and the largest groups. A group is a ViteHub package (`@vite-hub/agent`, `vite-hub/console`), a framework package, a dependency, an app folder (`server/api`), or generated code (`.vitehub`, `.nuxt`, `#nitro/virtual`). In Nuxt 5, the server part already contains the SSR build. Do not read Vite environments one by one.

- **Server startup** is the code that loads before the first request: the entry and every file that it imports statically. It decides cold start time and Worker startup limits.
- **Client startup** combines the startup code of all page entries, counting shared files once. A single page in a multi-page app can load less.

## Explain

`vitehub bundle why <package|file|group>` prints the bytes on each side, whether the target loads at startup, and the shortest import chain from the entry. Read the chain from the end: the first step that is app code or a ViteHub feature is usually the one to change. For example, change a static import to `import()` or turn the feature off.

## Routes

Static aliases load the same files as their canonical route. Lookup follows Nuxt's case and trailing-slash settings. When a custom `app/router.options.ts` file is present (also from a layer or module), route estimates are unavailable because that file can change routes at runtime. Page redirects also make route estimates unavailable because the destination can change before rendering. The CLI explains this and JSON includes `client.routesUnavailable`; bundle totals and module explanations still work.

In a Nuxt app, `vitehub bundle` also lists the largest page routes. For each route it gives the JavaScript of a first visit and the part of it that only page files add. `vitehub bundle why /docs/kv` takes a URL path, finds the route that renders it, such as `/docs/:slug()`, and prints:

- the files that the browser loads on a first visit: the startup files, and the files of the layout and the pages with every file that they import statically,
- the CSS of those files,
- the largest modules in the page files. These are what the route adds. Run `vitehub bundle why <module>` on one to get its import chain.

Code that the page loads later with `import()` does not count. The layout comes from a static `layout` in `definePageMeta`, or is `default`, and counts only when the startup or page files load `NuxtLayout`. If Nuxt does not expose that component's file, layouts are omitted. A layout set at runtime, conditional rendering of `NuxtLayout`, route middleware, and prefetching are not counted: Nuxt's `<link rel="prefetch">` files and the pages of visible `<NuxtLink>`s load at low priority after the page. Nuxt can inline some CSS in the HTML, so `cssBytes` is an upper bound for the CSS files the browser fetches. `--json` gives the routes in `client.routes`.

Use `--json` on both commands when you compare numbers or write them into a report.

## Act on findings

`vitehub bundle` ends with its checks. `--json` gives them in `findings`. Each finding has `code`, `severity`, `why`, `fix`, `docs`, `bytes`, and `chain`, the import chain from the server entry. The checks report only what the build proves: a feature declares from its resolved configuration what the server never runs, and a host limit comes from the host's documentation.

- `BUNDLE_STARTUP_UNUSED` (warning): a package loads at server startup, and a feature of this build never runs it there. Example: `@libsql/client` on a Cloudflare app where every Database is D1. Read `chain` from the end and update the ViteHub package that imports it. Independent imports from app code or other packages suppress the finding, because the feature cannot prove what those consumers need.
- `BUNDLE_HOST_SIZE_LIMIT` (error): the server JavaScript is over the host limit, so the deployment fails. Cloudflare accepts a Worker up to 64 MiB before compression. Start with the largest groups.

An error makes `vitehub bundle` exit with 1, so CI can run `vite build && vitehub bundle`. A warning keeps exit code 0. After a fix, build again and check that the finding is gone.

## Prove a change

Save the report before you change the code, then compare after the next build:

```sh
nuxt build                                            # or vite build, with bundle: true
vitehub bundle --json > .vitehub/bundle-before.json
# change the code
nuxt build
vitehub bundle --against .vitehub/bundle-before.json
```

`--against` prints, for the client and the server, the bytes and gzip bytes before and after, the same for the startup code, and each group that grew, shrank, was added, or was removed, with its total and startup delta. Groups that did not change are not shown. Add `--json` to get the same data. `--against` also reads a copy of `.vitehub/bundle/` or the project root of another checkout that has one.

If the output says that both reports are from the same build, you did not build again after the change. Report the side and startup deltas and the groups that changed. When you removed a package, also give the import chain from `vitehub bundle why <package>` on the old build.
