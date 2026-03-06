---
title: "The Extraction: Breaking Cairn Into Three"
description: "How a personal attention minder became three independent tools, and why the split was inevitable."
date: 2026-02-28
lastmod: 2026-02-28
---

By late February, Cairn had a problem. It was three things wearing one coat: a personal attention minder, a Linux system control agent, and a code verification engine. They shared a database, a config system, and a security layer — but their missions were diverging. ReOS needed to understand package managers and systemd services. RIVA needed to decompose code into verifiable pieces. Cairn needed to manage your calendar and learn your patterns.

So I cut it apart.

## The conversation lifecycle came first

Before the extraction, I finished the conversation lifecycle — the system that gives Cairn its memory. The architecture:

One active conversation at a time. Not threads, not tabs. One continuous dialogue with a deliberate lifecycle: `active → ready_to_close → compressing → archived`.

When a conversation closes, a four-stage compression pipeline runs entirely on your machine:

1. **Entity extraction** — pulls out people, tasks, decisions, waiting-ons, open questions
2. **Narrative compression** — synthesizes a 2-4 sentence memory capturing meaning, not transcript
3. **State delta detection** — identifies what changed: new priorities, resolved threads, shifted commitments
4. **Embedding generation** — creates a vector for semantic retrieval

Every extracted memory enters a review queue. You approve, reject, or edit before it joins the knowledge base. Nothing persists without explicit consent.

I also built the continuous conversation architecture — temporal awareness, state briefings that inject context into new conversations so Cairn doesn't start cold, per-turn assessment that decides in the background whether new knowledge emerged from each exchange. The per-turn assessor is conservative: questions and casual chat get `NO_CHANGE`. Only clear decisions, commitments, and new facts trigger `CREATE`.

This had to be solid before the extraction. Memory is Cairn's core — the other tools could leave, but the learning system had to stay.

## The PWA and authentication

I added a progressive web app layer and HTTP RPC authentication the same week. The PWA lets you access Cairn from a phone browser over Tailscale. Authentication uses PAM — your operating system decides who you are. Bearer tokens stored in sessionStorage (not localStorage — tab-scoped, cleared on close). A deliberate choice: PAM over Polkit because PAM is simpler, more portable, and we're authenticating users, not authorizing fine-grained operations.

## Extraction day

On February 28th, I extracted ReOS and RIVA into separate archive directories and renamed the core package from `reos` to `cairn`. This was one commit that touched hundreds of files.

The extraction preserved backward compatibility where it mattered: the database file stays as `reos.db` (no forced migration), the data directory stays at `~/.reos-data/`, keyring service names unchanged. Users shouldn't notice the organizational change.

ReOS took the shell agent, the parse gate (natural language vs. shell command routing), system context gathering, safety enforcement (hard blocks and confirmation gates), and code mode routing. RIVA took the executor, intentions, contracts, the five-layer verification pipeline, and NOLang integration.

Both depend on `talkingrock-core` — a shared infrastructure package extracted at the same time, containing providers, atomic operations, database utilities, encryption, config, security, and error handling. 39 Python files that all three projects need.

After extraction, Cairn had 2,033 tests passing. ReOS had 316 passed with 7 failures (residual Cairn dependencies to clean up). RIVA had a plan but no standalone implementation yet — the extraction created the space for it.

## Building talkingrock.ai

The same day, I built the public website. Hugo, because a static site generator is all you need for a marketing site. No React, no build pipeline, no JavaScript framework. System fonts, Pico CSS patterns, responsive images in WebP.

The site went from zero to deployed in a single day: scaffold, hero image, pages for Cairn, ReOS, RIVA, and NOLang, an About page with the philosophy, Privacy and Transparency pages. Deployed via rsync to a DigitalOcean VPS behind a Cloudflare tunnel — no open inbound ports.

## The Cairn demo

March 1st and 2nd were the demo. I built a Gradio application that simulates Cairn's core experience — a chat interface backed by Ollama, with a simulated calendar, email environment, and knowledge base. It started on HuggingFace Spaces with ZeroGPU inference, but I migrated it to local within a day. Self-hosting meant I could use the exact model I wanted (llama3.1:8b-instruct-q5_K_M) and control the full stack.

The migration involved a comedy of Gradio issues: dict type hints crashing the API endpoint, consent overlay CSS fighting with Gradio's component system, JS initialization needing arrow function wrappers. Each fix is documented in the gotchas — the kind of platform-specific traps that waste hours if you don't write them down.

The demo runs at cairn.talkingrock.ai, served through the same Cloudflare tunnel as everything else. Opt-in session telemetry (never message text) reports to the analytics system I built the week before.

---

*Next week: zero-trust hardening, and why assembly is the security model.*
