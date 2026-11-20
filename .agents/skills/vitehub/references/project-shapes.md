# Project shapes

Use this when a task creates a project, spans more than one ViteHub feature, or leaves the file layout unclear.

## Inspect first

Read the installed manifest and exports, then open only the guide matching the primary lane. Use File conventions only when discovery layout is unclear:

- [Installation](https://vitehub.dev/raw/docs/getting-started/installation.md)
- [First Server Primitive](https://vitehub.dev/raw/docs/getting-started/first-server-primitive.md)
- [First Agent](https://vitehub.dev/raw/docs/getting-started/first-agent.md)
- [File conventions](https://vitehub.dev/raw/docs/reference/file-conventions.md)

## Create a new project with `vitehub init`

Create a new app in one command, with no install first:

```sh
pnpm dlx vite-hub init <dir> --host <preset> --features <id,id,...> [--option feature.key=value]... --yes --json
```

- `--host` is the host preset: `cloudflare`, `vercel`, `netlify`, `deno`, or `node`. `--features` takes the ids that `catalog` lists. Pass `--framework nuxt` for a Nuxt app.
- Pass every input as a flag. Without a terminal, a missing flag exits with `2`, and the error names the flag and its choices. Add the flag and run the `rerun` command.
- A feature that the host does not support exits with `3` before any file is written. Choose another host or another feature.
- A saved selection of host, features, and options is a _stack_. `init` writes the command that reproduces the stack into the `README.md` stack block, and `vitehub status --json` returns it as `stack.command`. Run that command to make the same project again.
- When the developer gives a `--console <pendingId>:sha256:<hex>` value from console.vitehub.dev, pass it to `init` unchanged. See [Link and deploy](sandboxes-hosts.md#link-and-deploy).

See [Create a project](https://vitehub.dev/raw/docs/cli/project.md#create-a-project).

## Create the files with `vitehub add`

Run `vitehub status --json`, then `vitehub add <feature> --dry-run` for each feature the shape needs, and apply with `--yes`. Pass `--name <name>` where the shape lists a Definition, so the starter file lands in the discovery path that the build reads. Write a file or config key by hand only when `add` prints a manual `snippet`, or for files that `add` does not create, such as application routes. See [Add a feature](https://vitehub.dev/raw/docs/cli/project.md#add-a-feature).

## Coherent shapes

### Server Primitive

```text
package.json          package, scripts, Node version
pnpm-lock.yaml        exact resolved contract
vite.config.ts        ViteHub integration and provider choice
src/server.ts         application HTTP boundary and Runtime Helper
```

Add a discovered Definition under a documented discovery path only when the
primitive's docs require discovery. Check [File conventions](https://vitehub.dev/raw/docs/reference/file-conventions.md)
for suffix-based paths such as `*.workflow.ts` or `*.sandbox-task.ts`. The proof
must call the Runtime Helper and observe provider-backed behavior.

### Agent application

```text
package.json
pnpm-lock.yaml
vite.config.ts
server/agents/<name>/agent.ts
src/server.ts or framework route
```

Use the folder form when the Agent owns instructions, a Workspace, or Skills. Add Sources, Capabilities, Channels, Sandboxes, Schedules, and Workflows only when the outcome needs them.

### Scheduled Agent

```text
server/agents/<name>/agent.ts
server/schedules/<name>.ts
```

The Schedule owns wake timing; orchestration invokes the Agent with explicit input, identity, retry/idempotency, and terminal-state behavior.

### Full-stack application

Keep client framework plugins first, ViteHub composition next, and the host integration last. Client code calls an application route; server code owns Runtime Helpers, Agent Invocations, secrets, and provider bindings.

## Boundary pass

For every shape, state whether persistence is ephemeral or durable, which external authority exists, which host runs the code, how failures retry, and what the user can observe. A local demo may answer “ephemeral, local, no external authority,” but it must answer.

## Proof

The shape is complete when every requested behavior has a source file and runtime path, the build succeeds, and one live request or invocation observes the intended state change.
