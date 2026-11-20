# KV

<!-- Generated from docs/content/docs/kv/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/kv.md

Use KV for small values addressed by a key, such as flags, cursors, short-lived state, or counters that do not require relational queries.

Turn KV on with `vitehub add kv`. Where the host needs an explicit driver, such as Upstash on Netlify, pass it with `--option kv.driver=<driver>`. Keep key names and serialization in application code. KV operations are not a substitute for atomic Rate Limit enforcement or relational transactions.

Read or write many keys with `kv.getMany(keys)` and `kv.setMany([{ key, value }])`, not a loop of `get()` or `set()`. `setMany()` is not atomic. To stop two servers from running the same job, use `kv.lock(key, { ttl }).run(fn)` and return when `acquired` is `false`. Only the `redis`, `database`, and `upstash` drivers support `lock()`; the others return `KV_UNSUPPORTED_OPERATION`. For work that must renew its hold, use a Database lease.

Prove put, get, list with a prefix, and delete. Restart local storage or query the hosted provider to confirm the durability you need.
