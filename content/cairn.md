---
title: "Cairn"
description: "A local-first personal attention minder and development orchestrator. Small models, your hardware, your data, your rules."
lastmod: 2026-03-06
schema_type: "SoftwareApplication"
schema_category: "ProductivityApplication"
---

## What is Cairn?

Cairn is a local-first AI assistant that manages your attention, not your tasks. It runs entirely on your machine using local language models (8B parameters) through [Ollama](https://ollama.com) — no cloud, no subscription, no data leaving your hardware. A laptop with 16 GB of RAM is enough.

Cairn proposes. You decide. Every lesson it learns is reviewable, editable, and reversible. Nothing persists without your explicit consent.

---

## How it works

### The Play: two-tier life organization

Cairn organizes your life through **The Play** — a two-tier structure built on a theatrical metaphor.

- **Acts** are the big arcs (career, health, family, a project). They last months to years.
- **Scenes** are concrete things happening within an Act (a meeting, a deadline, a task). Each Scene tracks its stage: `planning`, `in_progress`, `awaiting_data`, or `complete`.

Two levels, deliberately. Enough structure to stay oriented, not enough to hide behind. Acts answer "What narrative?" Scenes answer "When am I doing this?"

### Atomic operations: the 3x2x3 taxonomy

Every request you make is classified across three independent dimensions:

| Dimension | Values |
|-----------|--------|
| **Destination** | `stream` (chat), `file` (disk), `process` (system) |
| **Consumer** | `human` (you read it) or `machine` (code reads it) |
| **Execution** | `read` (retrieve), `interpret` (analyze), `execute` (act) |

"What's on my calendar?" is `(stream, human, interpret)`. "Save this to notes.txt" is `(file, human, execute)`. This classification determines how much verification each request gets — a question gets fast-tracked; a file write gets the full pipeline.

### The intent engine: four stages

When you send a message, Cairn's intent engine processes it in four stages:

1. **Extract** — pattern matching identifies category (calendar, contacts, play, knowledge, tasks) and action (view, search, create, update, delete)
2. **Verify** — checks tool availability, builds arguments, confirms the extracted intent is actionable
3. **Execute** — calls the appropriate tool with validated arguments
4. **Respond** — generates a response strictly from tool results, not hallucination

### Five-layer verification pipeline

Before any operation executes, it passes through up to five verification layers:

| Layer | What it checks | Speed |
|-------|---------------|-------|
| **Syntax** | Is the request well-formed? | ~1ms |
| **Semantic** | Does it make sense in context? | ~10ms |
| **Behavioral** | What will this actually do? | ~100ms |
| **Safety** | Is this dangerous? (always blocking) | ~1ms |
| **Intent** | Does this match what you asked for? | ~500ms (LLM) |

Verification mode adapts to risk: `FAST` (syntax + safety only) for simple reads, `STANDARD` for most operations, `FULL` with LLM-judged intent verification for anything that modifies data.

### Health pulse

Nine checks monitor data freshness, system health, and calibration across three severity levels (`healthy`, `warning`, `critical`). Results are cached for 5 minutes and surfaced through chat — ask "how are you doing?" and Cairn tells you what's healthy and what needs attention.

### Coherence kernel

Cairn maintains a model of your identity — your stated values, goals, and relationships — extracted from The Play. The coherence kernel verifies that suggestions align with who you've said you are. It's sovereignty-preserving: it surfaces tensions, never guilt-trips. Your stated values are ground truth.

---

## How it learns

### One conversation at a time

Cairn maintains one active conversation — not threads, not tabs. One continuous dialogue with a deliberate lifecycle:

```
active → ready_to_close → compressing → archived
```

This forces depth. When the conversation closes, a four-stage compression pipeline runs entirely on your machine:

1. **Entity extraction** — pulls out people, tasks, decisions, waiting-ons, open questions, resolved questions, cleared blockers, and insights
2. **Narrative compression** — synthesizes a 2-4 sentence memory that captures meaning, not transcript
3. **State delta detection** — identifies what changed: new priorities, resolved threads, shifted commitments
4. **Embedding generation** — creates a vector for semantic retrieval so the memory can be found later

Every extracted memory enters a review queue. You approve, reject, or edit before it joins the knowledge base.

### Per-turn assessment

After each response, a background thread runs the turn delta assessor — a lightweight LLM call that decides if new knowledge emerged. It's conservative: questions, casual chat, and restatements get `NO_CHANGE`. Only clear decisions, commitments, preferences, and new facts trigger `CREATE`. Zero latency impact on the conversation.

### State briefings

When you start a new conversation, Cairn generates a situational awareness briefing — a sub-300-token document covering your active Acts, upcoming Scenes, and recent context. This is injected into the first turn so Cairn doesn't start cold. Briefings are cached for 24 hours.

### Memory reinforcement

When the same pattern comes up again — you reaffirm a decision, a preference appears a second time — the existing memory gets strengthened rather than duplicated. Frequently confirmed memories carry more weight in future reasoning.

---

## Calendar and email through Thunderbird

Cairn reads your calendar and email through [Thunderbird](https://www.thunderbird.net/) — Mozilla's open-source client. No Google, no Microsoft, no cloud APIs. Thunderbird stores your data locally in standard formats; Cairn reads from those local databases to understand your schedule, contacts, and communication patterns.

This is a deliberate architectural choice. By bridging through Thunderbird, Cairn inherits the trust of an open-source project maintained by a nonprofit without ever touching a cloud API.

---

## Work management through Claude Code

Cairn is expanding from life management to work management — applying the same principles to development workflows. Observe, surface, never command.

### The PM and Scrum Master roles

Cairn watches [Claude Code](https://docs.anthropic.com/en/docs/claude-code) agent sessions and extracts project-level insights: what's being worked on, what's blocked, what decisions were made, what patterns keep recurring.

The key constraint: Cairn and Claude Code are peers, not a hierarchy. Both report to you. Neither commands the other.

```
        You
       /   \
    Cairn   Claude Code
  (observes) (executes)
```

Cairn observes agent activity. It surfaces what it finds. Everything it proposes enters a review queue — the same approval workflow used for memory extraction. Nothing is acted on without your explicit consent.

### What Cairn surfaces

- **Play amendments** — an agent session reveals a new project or shifts priorities; Cairn proposes updating your Acts and Scenes
- **Memory candidates** — decisions made during coding sessions that should persist as organizational knowledge
- **Project tracking** — which projects are active, which are stalled, which need attention
- **Lessons learned** — recurring patterns across agent sessions that might inform future work

### Helm: your mobile command

[Helm](/helm/) puts Cairn in your pocket. Full feature parity — your knowledge base, The Play, calendar and email, personal CRM, and every agent in the ecosystem, all accessible from your phone. Authenticated through Cairn's PAM system, encrypted with TLS, audit-logged, with the same security boundaries that keep agents from running amok on the desktop.

Helm is converging into Cairn as its native mobile interface.

### Development orchestration roadmap

- **Phase 1:** Security hardening (Helm) — COMPLETE
- **Phase 2:** Claude Code as a Cairn service — PLANNED
- **Phase 3:** Streaming bridge for real-time observation — PLANNED
- **Phase 4:** Memory integration and project observation — PLANNED

See the full convergence roadmap on the [Helm page](/helm/).

---

## Security through decentralization

Each component in Cairn's stack is independently trusted, independently auditable, and independently replaceable:

- **Thunderbird** — calendar and email, maintained by Mozilla
- **Ollama** — local LLM inference, open source
- **Tailscale** — network security via WireGuard, open source core
- **PAM** — authentication through your operating system

No single vendor. No single point of compromise. If any component fails or disappears, you replace it — the others keep working.

Traditional SaaS bundles everything behind one company. Compromise that company and you compromise everything. Cairn distributes trust across independent open-source systems that you control.

Assembly isn't friction. It IS the security model.

---

## Why small models?

Large language models require cloud infrastructure, which means your data travels. Cairn uses models that run entirely on your hardware — including hardware most people already own. No GPU required. No subscription.

Small models fine-tuned to your context outperform general-purpose giants for personal workflows. And they do it without sending your calendar to a data center.

You pick the model through Ollama. You own the weights. Nothing phones home. If Cairn doesn't work for you anymore, your data is still yours in standard formats on your own machine.

---

## Try the demo

Chat with Cairn, explore a simulated calendar and email environment, and see how the atomic operations pipeline, verification layers, and memory extraction work in practice — all in your browser.

{{< demo-embed >}}

> *This demo runs on Talking Rock infrastructure so you can try Cairn without local setup. The production product runs entirely on your machine.*
