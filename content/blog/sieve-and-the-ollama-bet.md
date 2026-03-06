---
title: "Sieve and the Ollama Bet"
description: "Building a news intelligence engine on local models, and why I removed the Anthropic provider from Cairn."
date: 2026-02-07
lastmod: 2026-02-07
---

The first week of February was a bet on two ideas: that local models can score news articles better than I can, and that Cairn should never depend on a cloud LLM provider. Both bets paid off.

## Sieve: news intelligence on your machine

I built [Sieve](/about/) in a weekend. The premise: I read too much news and most of it doesn't matter. What if a local model could score every article against dimensions I actually care about, and surface only the ones worth reading?

Sieve runs an 8-stage pipeline, all locally via Ollama:

1. **Ingest** — pulls articles from configured feeds into JSONL, deduplicating as it goes
2. **Compress** — further deduplication across sources
3. **Summarize** — generates summaries with related-article context (so the model knows what's already been covered)
4. **Embed** — vector embeddings via nomic-embed-text (768 dimensions)
5. **Score** — the heart of it: a 7-dimension rubric I call the "No One Rubric," rating each article on convergence, emotional manipulation, source quality, and four other axes
6. **Entities** — extracts people, organizations, locations, concepts, and events
7. **Topics** — classifies into a 17-topic taxonomy
8. **Threads** — groups related articles by embedding similarity and entity overlap

The UI is Flask + HTMX + Pico CSS. No build step. The scoring dashboard lets me browse articles sorted by relevance, see why each one scored the way it did, and adjust my rubric over time.

Within a week, I added score-aware daily digests — Sieve picks the most important stories, generates a narrative summary, and outputs it as markdown. I added a review-and-revise loop where the model checks its own digest for hallucinations against the source articles. That matters when you're publishing these.

## Publishing through Rogue Routine

[Rogue Routine](https://rogueroutine.substack.com) is a Hugo static site that publishes Sieve's daily digests. The pipeline: Sieve scores and summarizes → export script generates markdown → Hugo builds the static site → rsync deploys to the VPS.

A human stays in the loop. Sieve generates; I review; then it publishes. Private intelligence becomes public communication only through human judgment. That's deliberate.

## The Ollama-only decision

The same week, I made a decision in Cairn that I'd been circling for a while: **remove the Anthropic provider entirely.** Cairn had supported both Ollama and Anthropic as LLM backends. I cut Anthropic.

The reasoning: if the tool can't run without a cloud subscription, it's not really local-first. It's local-sometimes. Every cloud dependency is a vector — for data exfiltration, for price changes, for API deprecation, for terms-of-service shifts that arrive without your consent.

Ollama runs models you download. You own the weights. Nothing phones home. If Ollama shut down tomorrow, the models still work — they're standard GGUF files.

The counterargument is capability. Cloud models are better at complex reasoning. That's true today. But Cairn isn't trying to be a general-purpose AI. It's managing your calendar, your attention, your personal context. An 8B model fine-tuned to *your* patterns outperforms a 70B model that knows nothing about you. And it does it without sending your schedule to anyone.

## Cairn's code quality week

Alongside Sieve, I ran a series of code quality audits on Cairn. Four pull requests in a single day:

- Security fixes: command injection guards, path traversal protection, shell guards on rollback, bounded config values
- Error handling: consolidated duplicate error classes, added a `Result` type and `handle_errors` decorator, fixed RPC error handling
- Logging: replaced every `print()` and silent `except: pass` with structured logging
- Architecture: extracted constants, added the `@rpc_handler` decorator, simplified the CAIRN processing pipeline

The common thread: Cairn had grown fast and accumulated shortcuts. Silent exception handlers are the worst — the system looks healthy while errors accumulate invisibly. I replaced every one with a logged handler. If something fails at 2 AM, the logs should tell you what happened.

---

*Next week: building a programming language that nobody will ever write.*
