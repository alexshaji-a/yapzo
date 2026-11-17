# YAPZO — One-deployment integrated beta (V6)

A premium-styled anonymous text chat prototype with random and interest matching, online count, typing indicators, reporting and blocking, optional account and friendship APIs, translation integration, and a Plus preview.

## Deploy to your existing Render Web Service

1. Upload **the contents of this folder** to the root of your existing GitHub repository (not the ZIP file itself). Preserve the `public/` directory structure and replace existing files.
2. Ensure `package.json`, `server.js`, `public/index.html`, `public/style.css`, and `public/app.js` are all committed together. GitHub's browser uploader may not overwrite files; use GitHub Desktop or Git to commit replacements if needed.
3. Render: Node 20+, build `npm install`, start `npm start`. Leave Root Directory blank. Keep **one web service instance** for this in-memory chat matchmaking implementation.
4. Commit once and verify the Render deploy succeeds. Test two browsers before sharing the link.

## Optional integrations and limitations

- **Anonymous chat** works immediately without credentials. Interest matching, live connection count, typing indicators, report/block and rate limiting are included.
- **Accounts and friend requests** require a PostgreSQL connection set as `DATABASE_URL` in Render's environment settings. Tables are initialized on startup. Without it, the chat works but account endpoints return an explicit configuration error. Database plans may cost money; check your provider's limits and retention.
- **Translation** is on-demand via a compatible LibreTranslate-style endpoint. Set `TRANSLATE_URL` and optionally `TRANSLATE_API_KEY`. This is **not** automatic translation of every message and could incur charges. Translation requires login.
- **YAPZO Plus** is a preview only. Payments are intentionally disabled until subscription webhooks, cancellations, refunds, entitlement checks and terms are properly implemented. No paid features are being sold.
- **Sessions are stored in process memory** and are lost on restart. Production accounts need durable session storage and session invalidation; passwords are bcrypt-hashed in PostgreSQL.
- **Friend requests** are username-based, not linked to anonymous matches, to avoid exposing the other person's identity without consent. A friend chat/inbox is **not** implemented.
- **Reports** persist only if `DATABASE_URL` is configured. They are not actively reviewed. The 18+ checkbox is self-attestation, **not age verification**.
- The online count represents active WebSocket connections, not unique humans. No user history is retained for anonymous conversations other than short report excerpts.
- This is a **controlled beta, not a public-ready anonymous social platform**. Before public release: independent age assurance, dedicated moderation operations, report review dashboard, abuse escalation, stronger bot prevention, privacy/terms, deletion and retention processes, proper audit logs, security review, database migrations, and multi-instance matchmaking infrastructure.

## Local test

`npm install && npm start` then open `http://localhost:3000` in two browsers. Run `npm run check` for syntax checks.

## Deploy configuration

- Required: `PORT` is supplied by Render; no other variables required for anonymous chat.
- Optional: `DATABASE_URL`, `TRANSLATE_URL`, `TRANSLATE_API_KEY`.
- Set `NODE_ENV=production` for secure cookies over HTTPS.

Do not commit credentials to GitHub. Configure secrets only in Render's Environment settings.
