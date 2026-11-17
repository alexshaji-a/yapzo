## Version 2 changes

Premium purple UI, online WebSocket connection counter, real-time typing indicator, and improved status presentation. Online count reflects active socket connections, not verified unique people. Typing indicators are ephemeral.

# YAPZO — worldwide anonymous text chat (MVP)

A functioning Node.js + WebSocket random text chat prototype with a modern mobile-friendly interface.

## Run

Requires Node.js 18+. Run `npm install` then `npm start` and visit http://localhost:3000 in two separate browsers. Press Find a stranger on both to test real-time matching.

## Implemented

- Anonymous random 1:1 real-time text matching, next, end, report
- Basic link blocking, message rate limiting and message length cap
- Mobile-friendly interface, 18+ self-attestation gate and safety tips

## NOT implemented yet

Accounts, friends, interest filters, translation, subscriptions, payments, ads, and persistent reporting/moderation are **future phases**. The landing page marks them as planned.

## Important before public launch

The current 18+ checkbox is **not age verification**. Reporting is only held in process memory and is not reviewed by moderators. Build a durable abuse-report pipeline, human moderation, user blocking, robust age assurance, privacy/terms policies, data retention rules, anti-bot protection, secure deployment (HTTPS/WSS), and monitoring before inviting strangers. Avoid claiming this prototype is safe for public use.

## Premium visual edition
The `public/style.css` file includes a premium responsive redesign. The WebSocket protocol, matching logic, and server behavior are unchanged from V2. Replace existing repository files (especially `public/style.css`) to deploy this look. This remains a test prototype, not a public-safe moderated platform.


## Version 4: Atelier luxury redesign
Update public/index.html and public/style.css together; app.js and server.js unchanged. No new server dependencies. The existing 18+ gate is self-attestation only and is not adequate for a public launch.
