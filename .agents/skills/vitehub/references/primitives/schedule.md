# Schedule

<!-- Generated from docs/content/docs/schedule/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/schedule.md

Use Schedule for recurring wakeups or static cron declarations. When users pick the time, such as reminders, define the Schedule without `cron` and call `startSchedule(name, { at | cron, timeZone, payload })` from `vite-hub/schedule`. A scheduled run should hand off to idempotent application or Agent work.

Keep the schedule definition separate from the work it starts. Use a stable key and record the last completed run when the action must not repeat.

Prove one manual run, one scheduled wake, retry or overlap behavior, and the terminal state. Inspect generated cron or provider output.
