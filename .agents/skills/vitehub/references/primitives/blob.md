# Blob

<!-- Generated from docs/content/docs/blob/index.md. Edit the agent-only block there. -->

Source page: https://vitehub.dev/raw/docs/blob.md

Use Blob for binary objects such as uploads, generated files, images, and exports. Turn Blob on with `vitehub add blob`, and pass `--option blob.driver=<driver>` where the host needs an explicit driver. Use the same Blob handle in application code when moving between local and hosted storage.

Keep object keys and authorization in application code. `serve` needs `access: "public"`, which sends every object of the served store to anyone, or `authorize: true`, which requires an authenticated session. `put()` has no per-object `access`. Treat filesystem Blob storage as one-host storage.

Accept uploads with `blob.handleUpload(event, { ensure })` and authorize the request in the route first. For files larger than the host's request body limit, such as 4.5 MB on Vercel, pass `direct: true` to `handleUpload()` and to `useUpload()`, so the browser sends the file straight to storage. Direct uploads need `VITEHUB_SECRET`, and on R2, S3, GCS, or Azure a bucket CORS rule that allows `PUT` from the app origin; Netlify Blobs falls back to a form upload. Copy a file with `blob.copy(from, to)`; it returns `BLOB_CONFLICT` when `to` exists, unless you pass `{ overwrite: true }`. To move a file, delete the source after the copy.

Prove upload, read, list, and delete with the selected driver. For hosted output, inspect the generated binding and verify access rules with a real request.
