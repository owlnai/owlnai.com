# Env

<!-- Generated from docs/content/docs/env/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/env.md

Use Env to declare public, build-time, server runtime, and secret values with typed accessors. Keep secret values out of source and client bundles.

Import `useServerEnv()` and `usePublicEnv()` from `vite-hub/env` in server code, and `usePublicEnv()` from `#vitehub/env/public` in browser code. Provider-backed Env values are read through the declared provider and do not become public automatically.

For a token that the client carries but must not read or change, such as an upload ticket, a signed link, or OAuth state, use `seal()` and `unseal()` from `vite-hub/env`. Do not write your own AES-GCM or HMAC code.

Prove missing, valid, and invalid values in the same host mode you will deploy. Inspect declaration metadata, never secret contents.
