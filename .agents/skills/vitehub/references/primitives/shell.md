# Shell

<!-- Generated from docs/content/docs/shell/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/shell.md

Use Shell to run bounded Unix-like commands with explicit filesystem, process, network, timeout, and policy access.

Treat command text, working directory, environment, and network access as authority. Prefer an allowlist and a small working directory. Resource bounds and cancellation are part of the run contract.

Prove a permitted command, a rejected command, timeout, cancellation, output limit, and cleanup.
