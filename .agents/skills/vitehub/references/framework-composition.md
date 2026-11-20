# Framework composition

Use this for Vite, Nitro, Nuxt, integration ordering, generated types, or deployment configuration.

## Select one current page

Start with [Vite Integrations and Provider Output](https://vitehub.dev/raw/docs/development/integrations-and-output.md). Open [Config options](https://vitehub.dev/raw/docs/reference/config-options.md) only for an option mismatch, or the selected page under [Frameworks and hosts](https://vitehub.dev/raw/docs/frameworks-hosts.md) only for a named framework or deployment target.

## Current application contract

Fresh apps install `vite-hub`, register `vitehub()` from the root, and use feature subpaths for runtime APIs. Turn features on and set provider options with `vitehub add <feature> --option key=value`, because it checks the host and edits object-literal options in a `vitehub({...})` call, a Nuxt `vite-hub/nuxt` module tuple, or the top-level Nuxt `vitehub` key. Edit the config by hand when `add` exits with `3` and prints a `snippet`, or when the options are an expression that `vitehub status` reports as `manual`. Direct `hubX()` integrations belong to an installed owner-package contract or deliberate advanced composition.

For Vite plus Nitro, keep ordering explicit:

```text
client/framework plugins
vitehub(...)
nitro(...)
```

For Nuxt, register `vite-hub/nuxt` and turn features on under the `vitehub` key, for example `vitehub: { database: true, kv: true }`. A Definition file turns its feature on without a key, such as `server/auth.ts` or a file in `server/schedules/`; set the key to `false` to keep it off. It is the only Nuxt module for ViteHub primitives. Owner-package Nuxt entries such as `@vite-hub/auth/nuxt` are internal; do not add them to `modules`. Do not reproduce app-local aliases or output rewrites from project examples without a source-backed need.

## Generated state

Include `.vitehub/types/**/*.d.ts` when generated names or `#vitehub/*` imports require it. Inspect `.vitehub` during development, but author source Definitions and stable imports rather than generated files.

## Proof

Run prepare/typecheck, build the selected framework, inspect `.vitehub`, and inspect the target's Provider Output. Ordering is proven by generated bindings and a live Runtime Helper or Agent Invocation, not by config shape alone.
