# Auth

<!-- Generated from docs/content/docs/auth/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/auth.md

Use Auth when the application needs sign-in, sessions, route protection, or Better Auth server plugins. Auth owns identity and session state. It does not automatically protect Agent, Console, or primitive routes.

Keep route access explicit. Configure the Auth Definition and its `access` policy, then mount the route through the Vite or Nuxt integration. Keep application authorization in the route or Capability that uses the session.

Treat local session storage as development state unless the selected provider
gives it durable storage. A signed-in user is not automatically an Agent Invoker.

Prove the flow with a real sign-in or session lookup, then request a protected route and inspect the generated route or provider output for the selected host.
