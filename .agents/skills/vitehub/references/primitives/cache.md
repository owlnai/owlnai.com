# Cache

<!-- Generated from docs/content/docs/reference/config-options.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/reference/config-options.md

Use the ViteHub `cache` integration when Nitro cache storage should use a host-appropriate driver. Cache is for replaceable values. It is not the source of truth for durable application data.

Read the [configuration reference](https://vitehub.dev/raw/docs/reference/config-options.md#vite-integration-options) and the [host guide](https://vitehub.dev/raw/docs/frameworks-hosts.md). The integration selects Cloudflare KV, Vercel runtime cache, Deno KV, or local filesystem storage from the host and options.

Keep cache keys, expiry, and invalidation in application code. To clear related entries together, use `tags` and `invalidateTag()` from `vite-hub/cache`. To return the stored value when a cached third-party call fails, use `staleIfError` on `defineCachedFunction()` from `vite-hub/cache`. See [Cache server results](https://vitehub.dev/raw/docs/guides/cache-server-results.md). Inspect and clear entries with `vitehub cache list`, `get`, and `delete`. A `nitro.kv` (`nitro.storage` in Nuxt) cache mount takes precedence over the ViteHub cache option. Netlify requires an explicit supported arrangement.

Prove a miss, a hit, expiry or invalidation, and the selected host output. Never use cache as the only copy of data that must survive eviction.
