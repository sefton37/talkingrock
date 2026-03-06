---
title: "Helm"
description: "The mobile command for Cairn. Orchestrate your knowledge base, calendar, email, personal CRM, and development agents — from your phone."
lastmod: 2026-03-06
schema_type: "SoftwareApplication"
schema_category: "DeveloperApplication"
---

## What is Helm?

Helm is the mobile command for [Cairn](/cairn/). Full feature parity — because you're running Cairn on your desktop through your phone.

From Helm, you orchestrate everything Cairn manages: your knowledge base, your personal CRM, your calendar and email through Thunderbird, The Play (your life organization system), and every agent in the Talking Rock ecosystem — [ReOS](/reos/), [RIVA](/riva/), and Claude Code sessions. Cairn acts as the PM and Scrum Master for all of them: security-hardened boundaries so agents can't be compromised or run amok, every action tracked and reviewed.

This isn't a dashboard. It's your desktop, in your pocket.

---

## How it works

### Full Cairn access from your phone

Helm connects to Cairn running on your machine over your private network. Anything you can do at your desk, you can do from your phone:

- **Knowledge base** — browse, search, and manage the memories Cairn has extracted from your conversations, with the same consent-based review queue
- **The Play** — view and update your Acts and Scenes, check what needs attention, adjust priorities on the go
- **Calendar and email** — see what Cairn sees through Thunderbird, review upcoming Scenes, respond to surfaced items
- **Personal CRM** — contacts, relationships, and communication patterns that Cairn tracks across your calendar and email

### Agent orchestration

Helm gives you a mobile command post for every agent in the ecosystem:

- **Claude Code agents** — start sessions, review streaming output, manage multiple named agents with independent contexts. Each message spawns `claude --print` with `stream-json` output over WebSocket.
- **ReOS** — natural language Linux from your phone. System monitoring, service management, diagnostics — all through Cairn's safety boundaries.
- **RIVA** — code verification sessions. Review contract-driven decompositions, approve or reject proposed changes.

Every agent session is observed by Cairn. Cairn extracts project insights, surfaces memory candidates, and proposes Play amendments — all presented for your approval. Agents execute. Cairn watches. You decide.

### Cairn as PM and Scrum Master

Cairn doesn't just relay agent output. It manages the agents:

- **Security boundaries** — agents operate within hardened constraints. Circuit breakers prevent runaway execution. Safety layers block dangerous operations. Process isolation ensures one agent can't affect another.
- **Session tracking** — every agent action is logged in an append-only audit trail. What was proposed, what was approved, what was executed, what the outcome was.
- **Project observation** — Cairn watches agent sessions and extracts patterns: which projects are active, which are stalled, what decisions were made, what recurring issues need attention.
- **Memory integration** — insights from agent sessions flow into Cairn's knowledge base through the same consent-based review pipeline as everything else. Nothing is learned without your explicit approval.

```
            You (phone)
             |
           Helm (mobile UI)
             |
           Cairn (orchestrator + PM)
          /   |   \
     Claude  ReOS  RIVA
     Code
```

### Built-in file editor

Browse and edit markdown files directly from the mobile interface. Path traversal protection is enforced at the server level — the editor is scoped to the project directory.

---

## Security: assembly is the architecture

Helm's security isn't a feature list. It's an architectural choice about where trust lives — and it has to be, because you're controlling your entire digital life from a phone.

### Defense layers

| Layer | Technology | Trust source |
|-------|-----------|--------------|
| Network boundary | Tailscale (WireGuard) | Open-source, peer-reviewed cryptography |
| Transport encryption | Self-signed TLS | Your certificate, your machine |
| Authentication | PAM via Cairn | Your operating system's auth |
| Calendar, email, contacts | Thunderbird (Mozilla) | Nonprofit-maintained, 20+ year track record |
| Session management | Signed tokens | Server-side validation |
| Agent isolation | Per-process + circuit breakers | OS-level boundaries + Cairn safety layers |
| Input validation | Path traversal guards | Deterministic server-side checks |
| Audit trail | Structured logging | Append-only, machine-readable |

### Why decentralization is the point

Traditional SaaS bundles authentication, encryption, network security, and session management behind one company. Compromise that company and you compromise everything.

Helm distributes trust across independent systems:

- **Tailscale** provides the network boundary — WireGuard encryption, no open ports, no cloud routing
- **Self-signed TLS** encrypts transport — your certificate on your machine, not a CA you hope is trustworthy
- **PAM** handles authentication through Cairn — your operating system decides who you are, not a third-party identity provider
- **Thunderbird** manages calendar, email, and contacts — Mozilla Foundation, nonprofit-maintained, open source for over 20 years. Your PIM data never touches a cloud API.
- **Cairn's safety layers** enforce agent boundaries — verification pipelines, circuit breakers, and consent gates that no agent can bypass
- **Each component is independently auditable, replaceable, and trustworthy on its own merits**

No single vendor. No single point of compromise. If Tailscale disappeared tomorrow, you'd replace it with another WireGuard implementation. If PAM had a vulnerability, you'd patch it through your OS — the same way you patch everything else.

Assembly isn't friction. It IS the security model.

---

## The convergence roadmap

Helm is converging with Cairn — evolving from a standalone tool into Cairn's native mobile interface.

### Phase 1: Security hardening — COMPLETE

TLS encryption, PAM authentication through Cairn, session isolation, audit logging, input validation. Helm is secure enough for production use on a private network.

### Phase 2: Claude Code as a Cairn service — PLANNED

Claude Code sessions become a Cairn-managed service. Cairn handles lifecycle, authentication, and session persistence. Shared sessions across Helm and the desktop Tauri app.

### Phase 3: Streaming bridge — PLANNED

Real-time agent output streams through Cairn's infrastructure. Cairn observes agent activity as it happens — the PM role becomes live, not post-hoc.

### Phase 4: Full ecosystem integration — PLANNED

All Talking Rock agents (ReOS, RIVA, Claude Code) managed through Cairn, accessible through Helm. Memory integration, project observation, and the complete PM/Scrum Master workflow — from your phone.

---

## Under development

Phase 1 security hardening is complete. Phases 2-4 are actively planned. Two production dependencies: `express` and `ws`.

Helm is open source. [View on GitHub](https://github.com/kelloggbrengel/helm)
