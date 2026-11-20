# Workspace

<!-- Generated from docs/content/docs/workspace/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/workspace.md

Use Workspace for persistent file-tree state, Sources, access rules, snapshots, diffs, and sessions. A Workspace is the boundary for file authority and write-back.

Set the root, store driver, mode, and write rules explicitly. Mount only the Sources an invocation needs. A mounted Source is context and does not imply write access.

Prove read, scoped write, diff, and restart or provider recovery. Inspect snapshots and generated Workspace state before relying on persistence.
