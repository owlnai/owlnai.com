# Schedules, Workflows, and Agent Invocations

Use this for wake timing, durable orchestration, Agent Invocation context, retries, idempotency, timeouts, or terminal-state persistence.

## Select one current page

Open [Schedule](https://vitehub.dev/raw/docs/schedule.md) for wake timing or [Workflows](https://vitehub.dev/raw/docs/workflows.md) for durable multi-step orchestration. Agent Invocation syntax belongs to [Agent Definitions and Drivers](agent-definitions.md); do not load this reference for a direct invocation alone.

## Ownership

Schedules own when work becomes due. Workflows own durable multi-step orchestration. Agent Definitions own agent behavior. Application routes or orchestration code own the explicit call between them.

Keep discovered files separate:

```text
server/agents/<name>/agent.ts
server/schedules/<name>.ts
server/workflows/<name>/index.ts
```

Pass stable run identity, invoker/context, input, wait-until behavior, timeouts, and persistence explicitly where the installed helper requires them. Design retries around idempotent steps or a durable completion fingerprint; never treat “started” as terminal success.

## Proof

For an Agent-backed path, invoke the Agent directly first. For a Schedule,
exercise one manual run and one scheduled wake. For a Workflow, observe step or
invocation identity, retry behavior, and terminal state. For provider-backed
wakeups or workflows, inspect the target Provider Output and one live execution.
