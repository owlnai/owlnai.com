# Content

<!-- Generated from docs/content/docs/content/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/content.md

Use Content to parse, query, search, and serve Markdown or other Source content through Comark. It is for application content, not arbitrary code execution.

Use the [Content CLI](https://vitehub.dev/raw/docs/content/cli.md) (`vitehub content list|show|status|diff|edit|publish|schedule --json`) to read, edit, publish, and schedule documents in a running dev server. `edit` honours edit leases unless `--override-lease`.

Keep content definitions and Source access explicit. Validate front matter and route parameters before using a result in a response.

Prove one local content query, one filtered or paginated query, and one served response. Include missing and malformed content cases.
