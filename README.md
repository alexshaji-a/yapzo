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
