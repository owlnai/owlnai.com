# Capabilities and authority

Use this whenever an Agent receives a tool, secret-backed operation, browser,
storage, shell, repository, rate-limit, telemetry, or custom action. A
Capability is the named permission that exposes one operation and its checks to
an Agent.

## Select current pages

Open [Official Capabilities](https://vitehub.dev/raw/docs/agents/capabilities/official.md) plus the chosen Capability page. Use [Capabilities overview](https://vitehub.dev/raw/docs/agents/capabilities.md) for lifecycle or authority questions, and [Custom Capabilities](https://vitehub.dev/raw/docs/agents/capabilities/custom.md) only when no official Capability fits.

## Authority pass

Every Capability changes what an Agent may observe or do. For each one, name:

- operations exposed to the model;
- data and secret sources;
- Invoker, scope, rate, and policy checks;
- persistence or external side effects;
- artifacts or traces available for inspection.

Use official factories before writing a custom Capability. Use `defineCapability()` when the application needs a stable domain-specific boundary, not as a wrapper around an already suitable official tool.

Keep secrets server-side and unseal them only at the documented execution boundary. A Workspace Source does not grant an operation; a Capability should not silently mount unrelated data.

For `rateLimit()`, pass a direct `RateLimiter` with `limiter`. Keep Agent Invoker, Run, or trusted-IP identity in the Capability; keep atomic consumption and provider guarantees in `@vite-hub/rate-limit`. Do not recreate the removed inline `limit`, `window`, `store`, or generic KV model.

## Proof

Run one allowed operation and one relevant denied or out-of-scope case. Inspect the tool surface, result, trace/artifact, and external effect.
