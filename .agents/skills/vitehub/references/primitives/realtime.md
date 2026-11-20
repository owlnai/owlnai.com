# Realtime collaboration

<!-- Generated from docs/content/docs/realtime/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/realtime.md

Use Realtime for collaborative state that changes while clients are connected. Realtime keeps the driver, document format, and durable checkpoints explicit.

The Configure page describes the driver of each host and persistence.

On Cloudflare, rooms use Durable Objects. On Node, the `auto` driver shares rooms across instances through Redis (`REDIS_URL`) or Postgres (the client of a Postgres Default Database, or `REALTIME_POSTGRES_URL`) when the server starts, else keeps them in one process. The `memory` driver is single-process. Vercel, Netlify, and Deno have no Realtime driver.

Rooms save through a document adapter: `document: { workspace }` writes Markdown files, or pass `{ load, save }` for your own storage and throw `RealtimeDocumentConflict` on a stale `ifDigest`. A presence-only definition sets `document: false` and clients join with `connectRealtimeRoom()`. The Yjs state is the source of truth while a room is open; an external write re-seeds the room and resets clients. Use `editor` for a custom schema and async Markdown codec, `fields` for structured values, `identify()` and `authorize()` for identity and access. Inspect definitions with `vitehub inspect definitions`.

Realtime is the collaboration layer for the supported document and editor
models. It does not replace Auth, Workspace persistence, or a general WebSocket
server.

Prove two clients joining, a concurrent edit, an idle save, reconnect, and a reset after an external write. Inspect the generated registry and handler for hosted output.
