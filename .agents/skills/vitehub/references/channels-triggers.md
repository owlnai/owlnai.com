# Channels and Triggers

Use this for Agent Channels and Triggers: GitHub, Gmail, Teams, Telegram,
Discord, web chat, custom webhooks, message history, admission, concurrency,
or Agent delivery effects. Every Channel is one file in `server/channels` with
`defineChannel()` from [`vite-hub/channels`](primitives/channels.md), for both
directions; an Agent lists it by name with `defineAgent({ channels: ['name'] })`.

## Select one current page

Open [Channels](https://vitehub.dev/raw/docs/agents/channels.md) for conversation adapters, [Gmail Channel](https://vitehub.dev/raw/docs/agents/gmail.md) for Gmail push, labels, and replay, [Triggers](https://vitehub.dev/raw/docs/agents/triggers.md) for other inbound events, or [Chat history and sessions](https://vitehub.dev/raw/docs/agents/chat-history-sessions.md) for identity and persistence. Open another page only when the first explicitly crosses that boundary.

## Composition

A Channel adapts an external conversation surface; a Trigger admits an external event into an Agent Invocation. Keep webhook verification, invoker/admission rules, history/session identity, concurrency, input commands, and delivery behavior explicit.

Use official Channel helpers when the installed contract provides them. Create a custom Trigger only when the external event is not a conversation adapter or the official boundary cannot represent the source.

Treat webhook secrets and installation tokens as server-only Env. Built-in Agent Channels declare their Env under `env.server.<channel>` when an Agent file calls the factory; check `describeServerEnv()` or the generated types before adding a declaration, and declare a field only to change its host variable name. Keep generated routes inspectable and document the exact local or deployed URL used for proof.

For initial setup of a built-in Telegram Channel, discover the installed contract with `pnpm vitehub channels sync --help` after the application stage is deployed. Run `pnpm vitehub channels sync --stage <stage> --url <https-origin> --json` first; it is read-only, loads the stage-specific Vite environment, and verifies the deployed webhook route before inspecting Telegram.

Apply a reviewed registration only when the task explicitly authorizes provider mutation, using `--apply --confirm-origin <the-same-https-origin>`. Never infer the stage or origin, pass provider credentials as arguments, or expose Env values in output. A planned deletion also needs explicit intent and `--allow-delete`; switching Telegram to polling or `webhooks: false` can produce that plan. Keep custom adapter registration and product policy application-owned.

## Proof

Exercise the generated or custom webhook with a verified event, observe the Agent Invocation, and confirm the expected external delivery or persisted message. A route existing in Provider Output is not proof that admission and delivery work.
