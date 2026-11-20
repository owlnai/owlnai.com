# Rate Limit

<!-- Generated from docs/content/docs/rate-limit/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/rate-limit.md

Use Rate Limit to guard an action with an atomic counter and a defined window. Put identity derivation in the caller or Agent Capability.

Choose a driver whose guarantees match the action. Memory is local to one process. On Node, the `kv` driver shares counts when KV uses Redis or Postgres; read the boot line that names the driver. Inspect `.vitehub/rate-limit/manifest.json` before a production deploy. Do not replace a Rate Limit with a KV read followed by a write.

Prove allowed, rejected, reset, and provider failure behavior. Check the resolved window and enforcement mode in generated inspection state.
