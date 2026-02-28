---
title: "Cairn"
description: "Contextual AI with Reviewable Negotiation. Local AI that learns with your permission, not behind your back."
---

## What is Cairn?

Cairn is a local-first AI assistant that prioritizes your autonomy over its own convenience. It runs on your machine, learns from your patterns only with explicit consent, and makes every lesson it distills reviewable, editable, and reversible.

**C**ontextual — understands your workflows, schedule, and priorities in context.
**A**I — small language models that run on consumer hardware.
**R**eviewable — every inference, every learned pattern is surfaced for your inspection.
**N**egotiation — Cairn proposes. You decide. Always.

---

## How it works

Cairn uses The Play — a two-tier knowledge base built on a theatrical metaphor — to develop the context and narrative of what you're working on. **Acts** are the big arcs of your life (career, health, family, a project). **Scenes** are the concrete things happening within them (a meeting, a deadline, a task). Two levels, deliberately. Enough structure to stay oriented, not enough to hide behind.

Cairn observes your digital environment — calendar, email, The Play — and surfaces what needs your attention. It builds context from your narrative, not a to-do list. And it never acts unilaterally.

Every suggestion follows the same cycle:

1. **Observe** — Cairn notices a pattern or context signal from your Acts and Scenes
2. **Distill** — it formulates a lesson or recommendation
3. **Propose** — it presents the lesson to you with full reasoning
4. **Negotiate** — you accept, reject, or modify the lesson
5. **Learn** — accepted lessons shape future behavior; rejected ones are discarded

No lesson persists without your consent. No action is taken without your approval. No data leaves your machine.

---

## How it learns

Cairn maintains one conversation at a time. Not threads. Not chat tabs. One continuous dialogue with deliberate closure. This forces depth — when you're talking to Cairn, it's focused on what you're focused on.

As you talk, Cairn listens for moments worth remembering — a decision you made, a preference you expressed, a commitment you stated. When it detects one, it runs a compression pipeline entirely on your machine:

1. **Extract** — pull out the people, decisions, open questions, and insights from the conversation
2. **Narrate** — synthesize a 2-4 sentence memory that reads like something a thoughtful colleague would remember
3. **Detect deltas** — what changed? New priorities, resolved threads, shifted waiting-ons
4. **Embed** — generate a vector for semantic search so this memory can be found later

Every memory enters a review queue. Cairn explains what it learned and why it thinks it matters. You approve, reject, or edit it. Nothing enters the knowledge base without your confirmation.

When the same pattern comes up again — you reaffirm a decision, a preference shows up a second time — the existing memory gets strengthened rather than duplicated. Frequently reinforced memories carry more weight in future reasoning. A fact remembered three times matters more than a fact remembered once.

The next time you open a conversation, Cairn retrieves relevant memories based on what you're discussing, weighted by both relevance and how many times you've confirmed them. Each conversation is richer than the last because the context compounds.

---

## Calendar and email through Thunderbird

Cairn doesn't connect to Google, Microsoft, or any cloud provider to read your calendar and email. Instead, it reads from Thunderbird — Mozilla's open-source email and calendar client.

Thunderbird has decades of track record from the Mozilla Foundation. It stores your data locally in standard formats. Cairn reads from Thunderbird's local databases to understand your schedule and contacts, observing calendar event ordering and email patterns to build context for what needs your attention.

This is a deliberate architectural choice. By relying on Thunderbird as the bridge, Cairn inherits the trust and transparency of an open-source project maintained by a nonprofit — without ever touching a cloud API directly.

---

## Why small models?

Large language models require cloud infrastructure, which means your data travels. Cairn uses small, efficient models (7B parameters and under) that run entirely on your hardware.

This isn't a compromise — it's a design choice. Small models fine-tuned to your context outperform general-purpose giants for personal workflows. And they do it without sending your calendar to a data center.

---

## Try the demo

The Cairn demo is coming soon. When it launches, you'll be able to:

- Explore a simulated calendar and email environment
- Watch Cairn observe, distill, and propose workflow optimizations
- Accept, reject, or modify every lesson Cairn learns
- See the full reasoning behind every suggestion

No account required to browse. A magic link login gates the interactive demo — we'll ask for your email, send you a one-time link, and that's it. [Read exactly what we store.](/privacy)

> *The demo will run on HuggingFace infrastructure so you can try Cairn without local setup. The production product runs entirely on your machine. We eat our own cooking — we're just not done cooking yet.*
