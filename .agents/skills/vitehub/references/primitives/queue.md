# Queue

<!-- Generated from docs/content/docs/queue/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/queue.md

Use Queue to send work to a consumer that can run after the request ends. Queue Definitions own consumer code, retries, and concurrency.

Treat enqueue as a handoff. Make the job idempotent, keep payloads bounded, and choose retry behavior for the side effect. Queue configuration does not make a job exactly once.

Use a Queue for independent background work, a Schedule for when work starts,
and a Workflow when several durable steps must be inspected together.

Prove enqueue, consumer execution, retry, and a poison or invalid payload. Inspect the Nitro output for the target host.
