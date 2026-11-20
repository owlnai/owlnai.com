# Proof and recovery

Use this when code compiles but behavior is unproven, or when imports, discovery, runtime bindings, host output, or deployment fail.

## Select the failing boundary

Use [Verification](https://vitehub.dev/raw/docs/development/verification.md) to choose the proof, [Generated files](https://vitehub.dev/raw/docs/development/generated-files.md) for discovery/binding state, [Errors and diagnostics](https://vitehub.dev/raw/docs/reference/errors-diagnostics.md) for a surfaced ViteHub error, or [Troubleshooting](https://vitehub.dev/raw/docs/development/troubleshooting.md) when the failure does not yet have a boundary. Open one first.

## Recovery loop

1. Reproduce the narrow failing command or request.
2. Inspect installed exports/types for import or option failures.
3. Inspect `.vitehub` registries, generated declarations, and diagnostics for discovery or binding failures.
4. Inspect Provider Output for host failures.
5. Correct the source boundary and rerun the same proof.

For app tests, use `setupViteHubTest()` from `vite-hub/test` ([Testing](https://vitehub.dev/raw/docs/development/testing.md)) instead of `vi.mock()` or `mock.module()` on `vite-hub/*` modules or `_internal` imports. It gives KV, Blob, Database, Queue, Email, Rate Limit, and Auth local backends, `setEnv()` for Server Env, `signIn()` for a signed-in request, and `deliverChannel()` for Agent Channel webhooks. With Node's test runner, run `node --import vite-hub/test/register --test`.

Do not add compatibility glue until the installed contract and current docs prove the missing seam is application-owned. Report upstream gaps with the exact package version, docs URL, generated state, and failing observation.

## Proof matrix

| Lane | Required observation |
| --- | --- |
| Server Primitive | Vite Integration registered, Runtime Helper executed, provider effect observed |
| Agent | Driver prerequisites met, Agent Invocation executed, output and authority inspected |
| Channel or Trigger | verified event admitted, invocation observed, delivery or persisted message observed |
| Schedule or Workflow | due/run identity observed, steps executed, retry/terminal state verified |
| Host | build emitted documented Provider Output and live limitation or behavior was checked |

Completion requires every requested behavior to have an observation or a source-backed unsupported boundary.
