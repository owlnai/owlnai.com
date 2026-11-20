# Server Primitives

Use this for application-owned storage, scheduling, environment, messaging, execution, or infrastructure behavior that does not need model judgment.

## Choose the primitive

When the primitive is known, open only its raw docs page, such as `https://vitehub.dev/raw/docs/kv.md`. Use the [Server Primitives index](https://vitehub.dev/raw/docs/getting-started/server-primitives.md) only when choosing between primitives. Confirm the selected primitive's Vite Integration, optional Definition, Runtime Helper, local driver, and host support.

Common composition:

```text
vite.config.ts           provider and integration
server/<definitions>/    named discovered configuration when required
application server code stable Runtime Helper calls
.vitehub/                generated registry and diagnostics
provider output          deployment artifact when applicable
```

With the current facade, register `vitehub()` from `vite-hub` and import application APIs from feature subpaths such as `vite-hub/kv`, `vite-hub/blob`, or `vite-hub/rate-limit`. Validate those paths against installed exports before coding.

For Database runtime access, import `useDatabase` from `vite-hub/database` and call it with the discovered database name. Use `useDatabase("default")` for a Default Database. Query through the returned `db` and `schema`. Do not import a Database Definition into application code. In explicit imports, prefer `useDatabase()` over the direct `db` and `schema` exports. In Nuxt server code with `database` enabled and Nitro auto-imports on, the module auto-imports `db` and `schema` for the Default Database; that code can use them without an import. Use `useDatabase(name)` for a Named Database. `useDatabase()` without a name returns the Default Database or the only Named Database, and throws `DATABASE_NAME_REQUIRED` when there are several. An unknown name throws `DATABASE_NOT_FOUND` with the discovered names.

## Authority

Runtime Helpers called by application code keep authority in the application. If an Agent needs the same behavior, grant the narrow Capability documented for that feature; do not make every application primitive an Agent tool.

## Provider boundary

Keep provider selection in Vite config or the source-local handle's static policy. Application code should keep consuming the same handle when moving from a local driver to a hosted provider.

Rate Limit is an atomic consume primitive, not generic KV sugar. Use a Rate Limit Driver with matching guarantees, keep identity derivation in the caller or Agent Capability, and treat the memory driver as local or single-process only. Cloudflare native enforcement is best-effort and supports only the periods documented by the installed package. There is no generic KV adapter; do not model `get()` followed by `set()` as atomic enforcement.

Automatic Rate Limit memory selection belongs to Vite development and serve commands. For a production build, require inferred Cloudflare hosting or select the production provider explicitly; never let an unknown host silently become per-instance memory.

Before deploying Rate Limits, inspect `.vitehub/rate-limit/manifest.json` for the sorted stable IDs, resolved provider, enforcement level, counter scope, rejected-attempt behavior, and supported windows. Treat the manifest as generated inspection state, not an application import.

## Proof

Register the integration, execute the Runtime Helper, and observe the expected provider effect. For persistence, restart the process and read the value again. For a hosted target, also inspect the documented Provider Output.
