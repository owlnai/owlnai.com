# Workflows

<!-- Generated from docs/content/docs/workflows/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/workflows.md

Use Workflows for provider-tracked work that can outlive a request and needs durable state, retries, or steps. A run id is the handle for inspection.

Make each step idempotent and define terminal failure behavior. Keep request handlers small: start the run, return its id, and inspect the run separately.

Prove start, retry or resume, cancellation, and a terminal result. Inspect provider state instead of assuming the request process owns the run.
