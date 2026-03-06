---
title: "Flattening The Play"
description: "Why a three-tier life organization system became two tiers, and what happened when I connected the calendar."
date: 2026-01-18
lastmod: 2026-01-18
---

The third week of January was about The Play — the organizational backbone of Cairn. It started the week as a three-tier hierarchy and ended as something simpler and more honest.

## Three tiers hid responsibility

The Play originally had three levels: **Acts** (the big arcs), **Scenes** (the medium-term work), and **Beats** (the daily tasks). It sounded logical. Career is an Act. "Ship the feature" is a Scene. "Write the tests" is a Beat.

In practice, three levels created hiding places. You could file a vague intention under a Scene and feel productive without committing to anything concrete. The Beat layer became a to-do list — and to-do lists are where intentions go to die. They grow without bound, they don't enforce prioritization, and checking off items feels like progress even when the items don't serve the Act.

On January 17th, I flattened it. Acts and Scenes. Two tiers. The database migration renamed the `beats` table to `scenes` and eliminated the old Scenes layer entirely.

Two levels answer two questions. Acts ask: **"What narrative am I in?"** Scenes ask: **"When am I doing this?"** Career, Health, Family — those are Acts. They last months to years. A doctor's appointment, a sprint deadline, a family dinner — those are Scenes. Each Scene tracks a stage: `planning`, `in_progress`, `awaiting_data`, or `complete`.

No third level means no hiding. If a Scene is too vague to have a stage, it's not concrete enough to be a Scene. If it's too small to matter, it shouldn't be tracked. Two tiers is enough structure to stay oriented without enough to become a bureaucracy.

## The Kanban redesign

The same day, The Play got a new visual design: a standalone 1080p window with a Kanban board. Scenes arranged in columns by stage. Drag to reorder. Color-coded by Act.

This was more than cosmetic. The previous UI showed Acts and Scenes in a tree view — a hierarchical list. The Kanban board shows them by *status*. "What's in progress?" becomes a single glance instead of a mental scan through nested items. The bias shifts from "what exists" (tree) to "what's happening" (board).

I added sorting (by priority, by date) and holiday deduplication (recurring calendar events like "MLK Day" shouldn't show up as 52 separate Scenes). Dark theme styling for dropdowns that had been rendering as invisible-on-dark since the Tauri migration.

## The Thunderbird bridge

Cairn reads your calendar and email through Thunderbird. This week I built the actual bridge — the code that connects to Thunderbird's local databases, extracts calendar events and email metadata, and makes them available as context for CAIRN.

Thunderbird uses standard formats. Calendar data is in ICS-compatible SQLite tables. Email is in mbox files with SQLite indexes. Cairn reads from these databases without modifying them. It's a read-only bridge.

The tricky part was compatibility. Thunderbird 115+ changed its internal database schema. The bridge needed to handle both old and new formats, detect which version was installed, and fail gracefully if it couldn't find the databases. I bundled a Thunderbird bridge extension for easier setup.

Calendar sync fed back into The Play. A calendar event could automatically create or update a Scene. A doctor's appointment in your calendar becomes a Scene under the Health Act, with the date and time pre-populated. The bridge turned The Play from a manually maintained structure into something that partially updates itself from your actual schedule.

## Undo and confirmation

Two features from January 16th that deserve attention:

**Undo capability.** When CAIRN takes an action — creates a Scene, updates a stage, archives a conversation — it records the state before the change. If you say "undo that," it reverts. This sounds basic, but most AI tools don't have it. They execute actions and move on. CAIRN's undo gives you a safety net: try things, see what happens, reverse if it's wrong.

**Confirmation guardrails.** Irreversible actions — deleting an Act, archiving a conversation — require explicit confirmation. CAIRN asks before it acts. Not a generic "are you sure?" but a specific description of what will happen: "This will archive the conversation and extract 3 memories for review. Proceed?"

Both features serve the same principle: the system proposes, you decide. Undo means the decision is soft. Confirmation means the decision is informed. Together they create a tool you can trust to experiment with.

## Adaptive attention polling

Also this week: adaptive polling for the attention engine. Instead of checking your context on a fixed timer, Cairn adjusts its polling frequency based on your activity. Active conversation? Check every few seconds. Idle for 20 minutes? Check every few minutes. This matters for battery life (Cairn runs as a desktop app) and for not wasting CPU cycles on an empty room.

The beat location sync connected your current Scene to a physical context — if you're working from a coffee shop versus your home office, that's a different attention context. This feature used the calendar's location field, not GPS tracking. Local-first means local-first.

---

*Next: the maze of mirrors, and why every system eventually needs a single source of truth.*
