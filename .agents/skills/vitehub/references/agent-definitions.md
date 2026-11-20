# Agent Definitions and Drivers

Use this for Agent Definitions, model or provider Drivers, deterministic custom Drivers, instructions, structured output, hooks, or Evals.

## Select current pages

For a first deterministic custom Driver and direct invocation, open only [First Agent](https://vitehub.dev/raw/docs/getting-started/first-agent.md). Use [Agent Definitions](https://vitehub.dev/raw/docs/agents/agent-definitions.md) for advanced composition or discovery, [Agent Drivers](https://vitehub.dev/raw/docs/agents/agent-drivers.md) for model/provider details, and [Agent Invocations](https://vitehub.dev/raw/docs/agents/invocations.md) for advanced runtime context. Open [Instructions](https://vitehub.dev/raw/docs/agents/instructions.md) or [Evals](https://vitehub.dev/raw/docs/agents/evals.md) only when that behavior is requested. Do not read the whole set.

## Definition shape

Default-export one `defineAgent()` boundary from a documented Agent discovery
path, commonly `server/agents/<name>.ts` or `server/agents/<name>/agent.ts`.
Check [File conventions](https://vitehub.dev/raw/docs/reference/file-conventions.md)
when the project uses another supported suffix or location. Compose only the
facets the outcome needs:

```text
driver        how the Agent runs
instructions model-facing behavior
workspace     files and Sources available to the invocation
capabilities  granted tools and authority
channels      external conversation adapters
hooks/output  lifecycle and delivery behavior
```

Use a deterministic custom `driver.run` for the first offline proof. Add model credentials, provider executable prerequisites, and sandbox requirements only when the requested outcome needs them.

Keep repository-wide guidance in repository files, Agent behavior in Driver Instructions, and reusable runtime Skills in the documented Agent skill surface.

## Invocation boundary

Pass invocation input separately from trusted runtime context. Keep run identity, memoization, wait-until behavior, invoker/admission context, and runtime selection explicit where the chosen invocation helper requires them.

## Proof

Prove Driver prerequisites, run one real Agent Invocation, inspect granted authority, and assert the expected output. A typecheck without an invocation is incomplete.
