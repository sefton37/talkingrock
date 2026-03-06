---
title: "Privacy"
description: "What's collected, what isn't, and why. Plain language, no legalese."
---

This is the privacy policy for talkingrock.ai. It's written in plain language because you shouldn't need a law degree to understand how your data is handled.

---

## What's collected

A lightweight analytics system called **Pulse** collects only what's needed to keep the site healthy:

| Signal | Purpose |
|---|---|
| Page path | Know which pages are visited |
| Referrer domain (not full URL) | Know where traffic comes from |
| Timestamp | Know when traffic arrives |
| Viewport width (bucketed: mobile/tablet/desktop) | Responsive design decisions |
| Country (from Cloudflare header, not IP) | Localization and CDN optimization |
| Page load time | Performance monitoring |
| Demo funnel events | Know if the demo works |

## What's NOT collected

- IP addresses — never logged, never stored
- Cookies or persistent identifiers of any kind
- Browser fingerprints (no canvas, no WebGL, no font enumeration)
- User agent strings
- Scroll depth or mouse movement
- Full referrer URLs
- Any cross-session identification
- Any data sold, shared, or provided to third parties, ever

## Authentication

If you try the demo, you'll be asked for your email to receive a magic link. Here's exactly what's stored:

- Your email address
- Timestamp of signup
- Number of demo sessions

Nothing else. No pre-checked newsletter boxes. No "may share with partners." Your email is used to authenticate you. That's it.

## The demo

The Cairn demo runs on Talking Rock infrastructure. No demo data is stored after your session ends. The production Cairn product runs entirely on your machine. No cloud. No intermediary.

## Cookies

This site uses **zero cookies** for browsing. The only cookie that ever exists is a session cookie if you log in to try the demo — and it's HttpOnly, Secure, SameSite=Strict, with a 24-hour expiry.

No cookie banner exists because no cookie banner is needed. The absence of the banner is the message.

## Third parties

See the [Transparency](/transparency) page for a complete list of every third-party dependency, what data it sees, and why it's there.

## Data retention

Pulse analytics events are retained for 90 days, then aggregated to daily summaries and purged. Aggregates are retained for 1 year.

## Verification

This site is open source. You can read the Pulse analytics source code, the authentication implementation, and every other line. [View the repository.](https://github.com/sefton37/talkingrock)

## Contact

Questions about privacy? Email privacy at talkingrock dot ai.
