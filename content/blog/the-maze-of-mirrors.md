---
title: "The Maze of Mirrors"
description: "A single source of truth refactor, the conversation memory system, and the architecture that would carry the project forward."
date: 2026-01-28
lastmod: 2026-01-28
---

By the fourth week of January, Cairn had a problem I should have seen coming. The same data lived in multiple places, and the places disagreed.

## The maze

The Play — Cairn's life organization system — stored Act and Scene data in a SQLite database. Good. But it also stored derived state in a JSON file for the frontend. And the frontend computed some state locally in TypeScript. And the calendar sync wrote to its own tables that the Play code then read and reconciled.

Three copies of the truth. When they agreed, everything worked. When they didn't — after a crash, after a sync timing issue, after a bug in one reconciliation path — the UI showed one thing and the database knew another. I called it "the maze of mirrors" in the commit message. Every surface reflects something, but you can't tell which reflection is real.

On January 24th, I eliminated it. One commit, one principle: **`play.db` is the single source of truth.** Period.

The refactor had four phases:
1. Create a `play_computed.py` module that computes derived state from the database only
2. Migrate the schema (v5 → v6) to add calendar metadata columns directly to the Play tables
3. Consolidate calendar sync to write to `play.db` only — no separate tables
4. Delete approximately 600 lines of JSON fallback code from `play_fs.py`

The `effective_stage` of a Scene — whether it's active, upcoming, or complete based on both its manual stage and its calendar date — is now computed once, in Python, from the database. The frontend receives it. The frontend never computes it. If you want to know the truth, you ask the database.

## Conversation memory

The same day, I built the conversation memory system. When a conversation ends, Cairn doesn't just delete it. It runs an LLM-driven extraction pipeline that pulls out what mattered.

The archive service works like this: you finish a conversation. Cairn's model reads the full transcript and extracts knowledge — decisions you made, commitments you stated, preferences you revealed, facts you shared. Each piece of extracted knowledge gets linked to the relevant Act or Scene in The Play.

An "Archive" button appears in the UI. You click it, the extraction runs, and you get a review overlay showing exactly what Cairn learned. You approve, reject, or edit each item before it enters the knowledge base. Nothing is learned behind your back.

This is the first version of the memory system that would later evolve into the full conversation lifecycle (entity extraction → narrative compression → state delta detection → embedding generation). But the core principle was already there: learning requires consent.

## The RPC decomposition

Also on January 24th, I finished extracting the monolithic RPC handler into focused modules. Eight commits in sequence, each pulling out one category: Play handlers, provider handlers, archive handlers, safety handlers, persona handlers, context handlers, approval handlers, chat handlers.

This was debt repayment. The system had grown fast, and the single-file dispatcher had become unmanageable. After the extraction, each module owned its concerns, and the dispatcher was just a router. The kind of refactoring that's invisible to users but determines whether the codebase stays healthy or becomes a maze of its own.

## V2: The atomic operations architecture

January 26th was the architectural turning point. I implemented V2 — the atomic operations framework that would become Cairn's core processing model.

The idea: every request you make to Cairn can be classified across three dimensions.

**Destination:** Where does the result go? `stream` (back to you in chat), `file` (written to disk), or `process` (a system action).

**Consumer:** Who reads it? `human` (formatted for you) or `machine` (structured for code).

**Execution:** What kind of work? `read` (retrieve information), `interpret` (analyze and explain), or `execute` (take action).

"What's on my calendar?" is `(stream, human, interpret)`. "Save this to notes.txt" is `(file, human, execute)`. "Check if nginx is running" is `(stream, machine, read)`.

This 3x2x3 taxonomy — 18 possible classifications — determines how much verification each request gets. A read operation that streams to a human gets fast-tracked (low risk). A process execution that modifies the system gets the full five-layer verification pipeline (high risk). The classification happens automatically; you just talk to Cairn normally.

The five verification layers:
1. **Syntax** — is the request well-formed? (~1ms)
2. **Semantic** — does it make sense in context? (~10ms)
3. **Behavioral** — what will this actually do? (~100ms)
4. **Safety** — is this dangerous? (always blocking, ~1ms)
5. **Intent** — does this match what you asked for? (~500ms, LLM-judged)

Light operations skip the expensive layers. Heavy operations get all five. Safety is always checked regardless. This is the architecture that makes local inference practical: cheap verification on most requests, expensive verification only when it matters.

## The consciousness stream and RLHF

Also on January 26th: a real-time consciousness stream pane showing what Cairn is thinking about, and an RLHF (Reinforcement Learning from Human Feedback) system for rating Cairn's responses.

The consciousness stream is exactly what it sounds like — a live feed of Cairn's attention. What it noticed in your calendar. What it extracted from a conversation. What it's monitoring. It's the thinking-out-loud that makes the system inspectable. You can see what Cairn is paying attention to and whether it makes sense.

The RLHF system lets you rate responses on a 1-5 scale with optional feedback. Ratings flow into the memory system: patterns that get good ratings are reinforced, patterns that get bad ratings are flagged. The model learns from your feedback, empirically, about what's useful to you specifically.

## The block editor

The last piece of the week: a React-based block editor for The Play. Instead of a form with fields, you get a rich document where Acts and Scenes are editable blocks with nested content. Think Notion, but local, for your life organization.

The block editor had a persistence race condition on its first day — edits could be lost if you typed faster than the save cycle. A fix followed within hours. Another fix for markdown formatting in blocks. The kind of polish work that separates "it works in a demo" from "I can use this daily."

---

By the end of January, Cairn had: three agents (CAIRN, ReOS, RIVA), a two-tier life organization system, calendar and email integration through Thunderbird, conversation memory with consent-based learning, a 3x2x3 atomic operations framework with five-layer verification, a consciousness stream, and a block editor. All running locally on an 8B model through Ollama.

The next month would test whether this architecture could survive contact with real users and real security requirements.

---

*Next: [Sieve and the Ollama Bet](/blog/sieve-and-the-ollama-bet/) — building a news intelligence engine and removing the last cloud dependency.*
