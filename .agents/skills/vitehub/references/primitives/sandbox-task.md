# Sandbox Tasks

<!-- Generated from docs/content/docs/sandbox/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/sandbox.md

Use a Sandbox Task to run a named project inside an isolated Cloudflare or Vercel Sandbox. A Sandbox Task run is an execution boundary, not a general-purpose local shell.

Keep images, mounts, network access, timeouts, and resource bounds explicit. Pass only the files and secrets the run needs.

Prove successful execution, cancellation, timeout, and cleanup on the selected provider. Verify result-size limits only when the provider documents them. Inspect generated bindings and provider output.
