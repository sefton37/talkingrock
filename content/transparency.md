---
title: "Transparency"
description: "Every third-party dependency on this site, what it does, and what data flows through it."
---

We believe you should know exactly who's involved when you visit a website. This page lists every external dependency on talkingrock.ai, what it does, and what data it can see.

---

## Third-party dependencies

| Dependency | What it does | What data it sees | Why we chose it |
|---|---|---|---|
| **Cloudflare** | CDN, DDoS protection, DNS, TLS, tunnel | IP addresses (for routing, not logged by us), request metadata | Industry-standard zero trust network. Tunnel means no open ports on origin. |
| **DigitalOcean** | VPS hosting (origin server) | Serves static files and API requests via tunnel | Self-managed infrastructure. Full control over the stack. |
| **HuggingFace** | Demo inference compute | Demo interaction data during active session | GPU compute for small model inference. Only used during demo. |
| **Transactional email provider** | Sends magic link emails | Email address | Required for passwordless authentication. No marketing use. |

## What's NOT on this list

- Google Analytics — not used
- Meta/Facebook Pixel — not used
- Any ad network — not used
- Any retargeting service — not used
- Any third-party JavaScript — not loaded
- Any CDN-hosted fonts — not used (system fonts only)
- Any social media embeds — not used
- Any A/B testing service — not used

## How to verify

This site is open source. Every claim on this page can be verified by reading the source:

1. Check the HTML — no external scripts, no tracking pixels
2. Check the CSS — no external font imports
3. Check the network tab — no requests to ad networks or analytics services
4. Read the Pulse analytics code — collection boundaries are explicit
5. [View the full repository](https://github.com/sefton37/talkingrock)

## Updates

When we add or remove a dependency, this page is updated in the same commit. The git history is the audit trail.
