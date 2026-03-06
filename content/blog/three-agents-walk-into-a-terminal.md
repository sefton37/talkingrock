---
title: "Three Agents Walk Into a Terminal"
description: "CAIRN is born as an attention minder. RIVA tackles code verification. ReOS stays in the shell. And the project gets its name."
date: 2026-01-11
lastmod: 2026-01-11
---

The second week of January, the project went from one tool doing three things to three agents with distinct missions. And it got the name it would keep.

## RIVA: if you can't verify it, decompose it

January 6th and 7th were about code. I built a diff preview UI, a repository map for semantic code understanding, LSP integration for real-time code intelligence, and test-first contracts for TDD by default. Then on January 7th, all of it consolidated into RIVA — the Recursive Intention-Verification Architecture.

RIVA's premise: LLM-generated code is unreliable in direct proportion to its complexity. A one-line fix is usually right. A 50-line function is a coin flip. A multi-file refactor is a prayer.

The solution: decompose until each piece is independently verifiable. An `Intention` is the atomic unit — a goal, acceptance criteria, and a trace of every attempt. When an intention fails verification, it doesn't retry blindly. It decomposes into smaller child intentions, each worked recursively. Results bubble up and integrate at the parent level.

Five verification layers: syntax (is the code valid?), semantic (does it make logical sense?), behavioral (does it execute correctly?), safety (is it dangerous?), and intent (does it match what you asked for?). Early layers are fast and cheap. Later layers spend model tokens for confidence. The key insight: when inference is local and tokens are free, you can verify everything. Cloud-based code generation skips verification to save money. RIVA verifies because it can.

## CAIRN: the attention minder

January 8th. The commit message: "Implement CAIRN - The Attention Minder."

CAIRN was the missing piece. ReOS controlled your Linux system. RIVA verified your code. But nobody was watching the bigger picture — your calendar, your commitments, whether your daily actions aligned with your stated priorities.

CAIRN reads your calendar and email through Thunderbird — Mozilla's open-source client. No Google API, no Microsoft Graph, no cloud intermediary. Thunderbird stores data locally in standard formats. CAIRN reads those local databases to understand your schedule, your contacts, your communication patterns.

The coherence kernel followed the next day: a model of your identity — your stated values, goals, and relationships — extracted from The Play. When CAIRN makes a suggestion, the kernel checks whether it aligns with who you've said you are. It surfaces tensions ("you said Health is a priority, but you haven't scheduled anything for it this week") without guilt-tripping. Your stated values are ground truth. The system reflects; it never judges.

## Talking Rock

The same day CAIRN was born, the project got its name. The commit: "Rebrand to Talking Rock with multi-agent UI."

A talking rock doesn't move. It doesn't follow you. It sits where you put it, and when you ask, it speaks — clearly, honestly, without agenda. It's grounded.

The three agents became a family:
- **CAIRN** — your default conversational partner, the attention minder
- **ReOS** — activates when you have a system problem
- **RIVA** — activates when you have a coding task

CAIRN is the front door. It routes to the others when appropriate. "What's using all my memory?" goes to ReOS. "Fix the bug in login.py" goes to RIVA. "What's on my calendar tomorrow?" stays with CAIRN.

## The Parse Gate

January 9th solved a specific problem: how does the shell integration know whether you typed a command or a question?

The Parse Gate sits between your input and the shell. If you type `ls -la`, it runs `ls -la`. If you type "what's eating my RAM," it routes to the agent. No mode switching. No special prefix. The system just figures it out.

This sounds simple and is surprisingly hard. `docker ps` is a command. "docker ps" with a question mark might be a question about Docker. The Parse Gate uses a classification layer — is this a valid shell command? — and only routes to the AI when the input isn't something the shell can handle directly.

## The RPC decomposition

Also on January 9th: a seven-phase decomposition of the RPC (Remote Procedure Call) layer. The backend had accumulated all its handlers in a single monolithic file. Over the course of six commits, I extracted them into focused modules: conversation handlers, approval handlers, system handlers, provider handlers, play handlers, safety handlers, CAIRN handlers.

This was maintenance work, not user-facing. But it mattered because the monolith was becoming unreadable. Each handler module now owns its concerns. The dispatcher routes requests. The handlers execute them. Clean separation.

## RIVA optimization week

January 11th was entirely RIVA. Trust budgets — successful verifications earn trust, allowing lighter verification for reliable patterns. Pattern success tracking — empirical data on which code patterns succeed and fail, used to calibrate verification depth. A verification batcher to reduce redundant LLM calls. A repository analyzer that understands your codebase's conventions before proposing code.

The underlying philosophy: don't verify everything equally. A simple import statement doesn't need five layers of verification. A multi-file refactor does. The system should learn which patterns are reliable and adjust accordingly.

By the end of the week, RIVA had a full optimization stack. Then I froze it. Small local models (1-3B parameters at the time) couldn't reliably generate complex code. The verification pipeline was solid. The generation wasn't. RIVA would wait until the models caught up.

---

*Next: The Play grows up, the Thunderbird bridge, and why three tiers of hierarchy became two.*
