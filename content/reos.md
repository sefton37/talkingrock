---
title: "ReOS"
description: "A local-first AI framework for Linux that verifies before it acts. Your machine, your rules."
---

## What is ReOS?

ReOS is a Linux desktop AI assistant framework built on three principles: **local-first**, **verification-first**, and **permission-required**. It runs small language models on your hardware and provides system-level AI capabilities without cloud dependencies, subscriptions, or data extraction.

ReOS is the foundation that powers [Cairn](/cairn).

---

## Verification pipeline

Before any action touches your system, it passes through five verification layers:

1. **Syntax** — is the command structurally valid?
2. **Semantic** — does the request make logical sense?
3. **Behavioral** — does it align with your established patterns?
4. **Safety** — could this damage your system or access unauthorized resources?
5. **Intent** — did you actually mean what the AI thinks you meant?

Because inference is local, verification is free. So we verify everything.

---

## Atomic operations

Every request is classified across three dimensions — where output goes (stream, file, or process), who consumes it (human or machine), and what action is taken (read, interpret, or execute). This taxonomy enables fine-grained safety controls and tuned model behavior for each type of operation.

Read operations get precision. Interpretive operations get creativity. Execution gets reliability.

---

## The Play

ReOS organizes personal context through a theatrical metaphor with exactly two levels:

- **Acts** — months to years. Life narratives like Career, Health, Family, Projects.
- **Scenes** — days to weeks. Calendar events or tasks within an Act.

Two levels is deliberate. More than two lets you hide from responsibility in complexity. Two forces clarity: *what narrative does this belong to?* and *when am I doing this?*

---

## Self-knowledge

ReOS includes a three-tier system for AI self-understanding across large codebases:

- **Architecture blueprint** — a compressed overview that fits in context, always available
- **RAG retrieval** — keyword-based code indexing, no vector database required
- **Full source** — targeted file reading when specific code is needed

This means the AI understands its own codebase without consuming enormous context windows or requiring external infrastructure.

---

## Under development

ReOS is in active development. Follow progress on [GitHub](https://github.com/sefton37/talkingrock).
