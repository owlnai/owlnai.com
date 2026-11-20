# Workspaces, Sources, and access

Use this when an Agent or application needs files, repository content, external resources, lazy materialization, scoped selection, or write-back.

## Select current pages

Start with [Workspaces and Sources](https://vitehub.dev/raw/docs/workspace/concepts.md). Open [Workspace context](https://vitehub.dev/raw/docs/agents/workspace-context.md) for Agent materialization, or [Access Capability](https://vitehub.dev/raw/docs/agents/capabilities/access.md) when an Agent selects or narrows Sources.

## Compose the boundary

Definitions describe the Workspace; Sources resolve content; access rules select what an invocation may receive; Workspace rules and mode decide whether changes can write back. Mounted data is context, not automatically Agent authority.

Prefer colocated Workspace files for static Agent-owned context. Use the
`@vite-hub/source` owner package for `file`, `glob`, `markdown`, `github`, MCP,
or custom Sources when content has a different lifecycle. Fetch-backed and
Workspace-specific sources come from the Workspace APIs; check the installed
exports before choosing one. Keep dynamic shaping in Source resolution and
authorization in access/Workspace rules.

## Inspectability

Before invoking, name the expected Workspace paths, Source identities, selection scope, read/write mode, and ignored write-back paths. Inspect the resolved Workspace or generated source descriptors rather than assuming a Source mounted correctly.

## Proof

Read a selected file through the actual Workspace path. For write mode, modify one allowed path and verify the configured write-back while proving disallowed paths stay unchanged.
