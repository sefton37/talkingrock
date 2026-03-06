---
title: "Day Zero: A Charter, Not a Codebase"
description: "The first commit wasn't code. It was a philosophy about attention, labor, and what AI should actually do for you."
date: 2025-12-17
lastmod: 2025-12-17
---

The first commit to what would become Talking Rock wasn't code. It was a charter.

December 16, 2025. Two files: a `.gitignore` and `ReOS_charter.md`. The charter laid out a premise that hasn't changed since: **attention is labor.** Not a metaphor. Your attention is the primary input of every cognitive system you operate — your job, your relationships, your health, your sense of self. Every demand on your attention is a demand on your labor. And most of those demands are unexamined.

The project was called ReOS — as in, rethinking your operating system. Not Linux. Your personal operating system. The patterns of where your attention goes, and whether those patterns serve you.

## The bifocal vision

The second day, I built the first working prototype. The idea was "bifocal" — two lenses looking at the same thing. A VS Code extension would silently observe your work: which files you opened, how often you switched between them, what branches you were on, how long you stayed focused on one thing before jumping to another. It would write those observations to a SQLite database.

A separate desktop application — the ReOS window — would read that database and show you what you were actually doing. Not what you thought you were doing. What was happening.

The key metric was **fragmentation** — a 0-to-1 score measuring how often you switched between files. High fragmentation might mean you're exploring a new codebase (productive) or that you can't settle on anything (unproductive). ReOS wouldn't tell you which. It would ask: *"Fragmented attention. Intention check: exploration or distraction?"*

That question format was in the charter from day one. The system surfaces patterns. The human interprets. The language is never judgmental. Never prescriptive. Always a question.

I had a working prototype by the end of December 17th — VS Code tracking file switches and git state, an attention module calculating fragmentation scores, a desktop navigation pane showing it all in real time. The completion doc for that milestone called it "M1b: Bifocal System."

## The evening pivot

That same evening, I pivoted. Git activity was a richer signal than VS Code file switches. Commits carry intent — they have messages, they group changes, they mark decisions. File switches are just noise without interpretation.

So ReOS shifted from "VS Code observer" to "git-aware agent." The foundation stayed — SQLite, local-first, attention as the core concern — but the observation method changed on the first day. The charter survived. The architecture didn't.

That pattern would repeat.

---

*Next: migrating to Tauri, building Linux tools, and the accidental birth of The Play.*
