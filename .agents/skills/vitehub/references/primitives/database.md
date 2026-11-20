# Database

<!-- Generated from docs/content/docs/database/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/database.md

Use Database for relational data with Drizzle. Define tables in a Database Definition and query through the generated `useDatabase()` handle.

Import `useDatabase` from `vite-hub/database` and select the discovered database by name. Do not import generated database definitions or provider bindings into application code. Keep migrations and transaction boundaries with the Database owner.

For Postgres, set `dialect: 'postgresql'`. ViteHub connects with postgres.js, or with `pg` when the Definition sets `driver: 'node-postgres'`. Put read replica URLs in `connection.replicas` and read from them with `db.$replica`; writes and reads of your own writes use `db`. On D1, use `readReplication: true` instead.

For starting rows, write `server/databases/<name>/seed.ts` and run `vitehub seed database`. Inspect data with `vitehub database sql "<query>"`. `vitehub database drop` and `vitehub database reset` delete every table; they ask first, and need `--yes` without a terminal. Each command touches only the local database unless you pass `--remote`.

Prove a migration, a typed read, a write, and a restart or remote-host read. Inspect generated schema and provisioning output before deployment.
