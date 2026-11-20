# Sandboxes and hosts

Use this for trusted-host commands, isolated execution, credentials projected into Home, required binaries, host links, deployment targets, or Provider Output.

## Select current pages

Open [Sandboxes](https://vitehub.dev/raw/docs/agents/sandboxes.md) for execution environments, the selected page under [Frameworks and hosts](https://vitehub.dev/raw/docs/frameworks-hosts.md) for a deployment target, or [Provider Output](https://vitehub.dev/raw/docs/reference/provider-output.md) for artifact ownership. Open only the pages matching the task.

## State the runtime boundary

Name the Sandbox provider or trusted host, isolation guarantee, persistence lifetime, network policy, required commands, projected credentials, cost, and production-readiness. A local tempdir or host process is convenience, not isolation.

Keep host-specific setup behind the Sandbox or provider boundary. Agent Instructions may explain available commands, but configuration must make the commands and credentials actually available.

## Link and deploy

- Run `vitehub link` to connect the project to its host project. It writes `.vitehub/link.json` and adds `.vitehub` to an existing `.gitignore`. If no `.gitignore` exists, it warns without creating one: create it with a `.vitehub` rule. Confirm the rule before committing, because the link belongs to one machine and must not follow forks or templates. `vitehub unlink` removes the link file and leaves the host project as it is. See [Link a project to its host](https://vitehub.dev/raw/docs/cli/project.md#link-a-project-to-its-host).
- Host credentials come from environment variables, then from the host CLI login, such as `wrangler login`. Never write a token into a project `.env` or the link file. When `link` exits with `2`, run the login command or set the variable that its `fix` names.
- Deploy with `vitehub deploy --yes`. It builds the app, then runs the deploy command that the build wrote for the host. It runs on the developer's machine with the host credentials above. It never adds a CI workflow; add a GitHub CI deploy only when the developer asks for one. See [Deploy from your machine](https://vitehub.dev/raw/docs/cli/project.md#deploy-from-your-machine).
- When no credentials resolve, `deploy` exits with `2` (`SETUP_DEPLOY_CREDENTIALS_MISSING`). Ask the developer to log in, or, on Cloudflare and Vercel, offer `--temporary`: a deploy with no account that prints a claim link. A temporary Cloudflare Worker must be claimed within 60 minutes. Treat the claim link as private.
- The Console link: with `console: true`, the developer links the deployed app in console.vitehub.dev, which shows a `VITEHUB_CONSOLE_KEY_<NAME>=<public key>` line. Set it as a host secret, deploy again, and ask the developer to select **Check connection**. For the CLI, `vitehub secret console-key <name>` prints the public key line for the app and a `VITEHUB_CONSOLE_PRIVATE_KEY_<NAME>` line. Never write the private key into the project. See [Sign Console requests](https://vitehub.dev/raw/docs/console/signed-requests.md).
- Inspect what is deployed with `vitehub deployments --json`: each deployment with its state, target, commit, and `live` flag. `vitehub status --json` has a `live` field with the live commit and how many commits it is behind HEAD. When `live` is `null`, `liveReason` tells why, such as `not-linked` or `no-credentials`. Pass `--offline` to skip the host request. See [List deployments](https://vitehub.dev/raw/docs/cli/project.md#list-deployments).

## Proof

Inspect the resolved Sandbox requirements, execute one required command, prove credential access without exposing the credential, and confirm cleanup or persistence. For deployment, build and inspect the documented Provider Output before a live target check.
