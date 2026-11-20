# Channels

<!-- Generated from docs/content/docs/channels/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/channels.md

A Channel is one connection to a platform, defined once in `server/channels/<name>.ts` with `defineChannel({ adapter, on })` from `vite-hub/channels`. Use it for both directions: inbound webhooks go to the `on` targets (a handler, a Queue or Workflow through a handler, or a `defineChannelTrigger()`), or to the Agent that lists the Channel in `defineAgent({ channels: ['name'] })`. Outbound messages go through `useChannel(name).send()` from any server code. `sendChannelTrigger(name, trigger, input)` starts a trigger from code, such as a Schedule, with the same delivery rules as a webhook.

Use `stripe()` or `webhook({ signature, secret })` from `vite-hub/channels` for HTTP senders, and `slack()`, `teams()`, `discord()`, `telegram()`, `github()`, or `gmail()` from `vite-hub/agent/channels` for chat, forge, and mail. Files in `server/channels/` turn Channels on. Install `@vite-hub/channels` and, for inbound Channels, `@vite-hub/agent`. An inbound Channel turns on its webhook route without `agent: true`. Keep secrets in Server Env: a string `secret` is the name of the server variable, such as `webhook({ signature: 'github', secret: 'PREFECT_WEBHOOK_SECRET' })`, and the signature names follow Webhooks. Never parse or verify a webhook by hand. To only check the signature in a plain route, without Agents, use `verifyWebhook(event, { provider: 'stripe', secret: 'STRIPE_WEBHOOK_SECRET' })` from `vite-hub/env`.

Prove one signed delivery reaching its target, one duplicate that does not run twice, and one outbound send with its receipt.
