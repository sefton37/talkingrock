---
title: "Assembly Is the Architecture"
description: "Zero-trust hardening, the Helm mobile UI, and why a decentralized stack of open-source tools isn't friction — it's the security model."
date: 2026-03-06
lastmod: 2026-03-06
---

The first week of March was about closing every door I'd left open — and opening a new one from your phone.

## Zero-trust hardening

On March 1st, I ran a zero-trust audit across Cairn. The question: if a compromised LLM response tried to execute arbitrary commands, what would stop it?

The answer was uncomfortable. Cairn had residual shell execution paths from its early days as a system control tool. ReOS needs shell access — it's a terminal agent. Cairn doesn't. But after the extraction, some of those paths were still wired up.

Three commits in one day:

**Quick wins:** Seven hardening fixes — removing shell execution from non-ReOS code paths, tightening LLM safety to fail-closed (a safety check failure blocks the operation, no fallback to "allow"), adding explicit guards where implicit trust had crept in.

**Architectural hardening:** The crypto singleton pattern — Cairn's encryption key management was using a context-variable pattern that could theoretically be accessed from the wrong context. Replaced it with a singleton that initializes once and locks. RPC session enforcement with explicitly exempt methods (only the auth endpoints skip session checks, everything else requires a valid session).

**Bypass closure:** The final pass. Every remaining path where an unauthenticated or unverified request could reach a sensitive operation. Public HTTP endpoints stay auth-free (they serve the UI), but every RPC handler requires a valid session. No exceptions I hadn't explicitly decided on.

After these three commits, Cairn had 2,033 tests passing and zero known bypass paths. The test count matters — it means the hardening didn't break existing functionality.

## The verification pipeline in cairn-demo

The demo needed its own hardening. When you put a chat interface on the public internet, people will try to make it say things it shouldn't.

I added a verification pipeline to the demo: a `quick_judge` function that classifies each user message before it reaches the model. Three separate judge calls — safety, relevance, and intent — each with its own prompt and threshold. The safety judge was the trickiest: it needed explicit examples of safe messages (calendar questions, email queries) so it wouldn't false-positive on normal Cairn usage.

A key decision here: the demo uses **fail-open** for the quick judge. If the judge itself fails (model timeout, parsing error), the message goes through. This is the opposite of Cairn's production stance (fail-closed). The reasoning: a demo that blocks legitimate users is worse than a demo that occasionally lets an edge case through. Production Cairn, handling your real data, makes the opposite tradeoff.

These patterns — the judge pipeline, the verification directive, the fail-open/fail-closed distinction — haven't been backported to core Cairn yet. That's a documented dissemination gap. The demo became an innovation lab, which wasn't the original plan but turned out to be useful.

## talkingrock-core: shared infrastructure

On March 4th, I formalized the shared infrastructure as `talkingrock-core` — a proper installable Python package containing the 39 files that Cairn, ReOS, and RIVA all need. Providers, atomic operations, database utilities, encryption, config, security, error handling, and now also `quick_judge` and `verification_directive` from the demo innovations.

ReOS and RIVA were scaffolded as standalone projects the same day. ReOS got its package structure, import rewrites, and a conftest.py (forgetting conftest.py during extraction is a documented antipattern I've hit before — AP-003 in my failure log). RIVA got its scaffolding with key architectural decisions: the `Act` concept from Cairn's Play system becomes a `Project` dataclass, it gets its own 5-table database schema, and the Tauri polling pattern is replaced with Textual Workers.

## Helm: your phone as a command post

March 5th. I wanted to manage Claude Code agents from my phone. Not SSH into a terminal and squint at a monospace font — actually manage them. Start sessions, read streaming output, edit project files.

Helm started as "Claude Code Mobile" and got renamed within hours. Express + WebSocket, two production dependencies. Each message spawns `claude --print` with `stream-json` output. Multiple named agents with independent sessions via `--resume` IDs.

The security architecture is where it gets interesting. Helm authenticates through Cairn's PAM system — your operating system decides who you are. TLS encrypts the transport. Tailscale provides the network boundary. Session tokens are signed server-side. Audit logging records every action.

Each of those is a different piece of software from a different maintainer with a different trust model. And that's the point.

## Why decentralization is the security model

Traditional SaaS bundles authentication, encryption, network security, and session management behind one company. You trust that company's security team, their infrastructure, their intentions, their future decisions. One compromise and everything falls.

Helm distributes trust:

- **Tailscale** for the network boundary — WireGuard encryption, no open ports. If Tailscale disappeared, any WireGuard implementation replaces it.
- **Self-signed TLS** for transport — your certificate, your machine, not a CA you hope is honest.
- **PAM** for authentication — your OS decides identity. Patched through your normal update cycle.
- **Express** for the web server — one of the most audited Node.js packages in existence.
- **Claude Code** for the agents — Anthropic's official CLI, running locally.

No single vendor. No single point of compromise. Each piece is independently auditable, independently replaceable, independently trustworthy on its own merits.

This looks like friction if you're used to clicking "Sign in with Google." It's the security model if you're used to thinking about what happens when Google changes its mind.

Assembly isn't friction. It IS the architecture.

## The convergence roadmap

Helm's ROADMAP describes four phases of convergence with Cairn:

1. **Security hardening** — done. TLS, PAM auth, session isolation, audit logging.
2. **Claude Code as a Cairn service** — Cairn manages session lifecycle. Helm becomes a thin client.
3. **Streaming bridge** — real-time agent output through Cairn's infrastructure.
4. **Memory integration** — Cairn watches agent sessions, extracts project insights, surfaces them for approval. The PM and Scrum Master roles — observing, never commanding.

The end state: Cairn orchestrates your attention across both life and work. Your calendar, your email, your development agents, your project patterns — all observed by a local model that learns what matters to you and surfaces it when it's relevant.

But Cairn proposes. You decide. That hasn't changed since day one, and it won't.

---

*This is the first set of development logs for Talking Rock. More to come as the ecosystem evolves. Everything described here is open source — [verify it yourself](https://github.com/sefton37/talkingrock).*
