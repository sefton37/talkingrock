---
title: "From Python to Rust, From Observer to Agent"
description: "A desktop UI rewrite, an explosion of Linux tools, and the accidental invention of a life organization system."
date: 2025-12-28
lastmod: 2025-12-28
---

A week after the first commit, I threw away the UI and rewrote it in a different language. This wasn't scope creep. It was a recognition that the tool I was building needed to feel like a native application, not a Python script with a window.

## The Tauri migration

The original desktop app used PySide6 — Python bindings for the Qt UI framework. It worked, but it felt like a web page pretending to be a desktop app. On December 24th, I migrated to Tauri: a Rust-based framework that wraps a native webview. The Python backend stays. The frontend becomes TypeScript and HTML. The result is a real desktop application — native window management, system tray integration, proper keyboard shortcuts — with the backend logic still in Python where it belongs.

This was a one-day rewrite. The old Qt widgets (Projects, Settings) got deleted. The new Tauri window went up. The communication layer between frontend and backend uses JSON-RPC — the same protocol, just a different UI consuming it.

## Linux tools and the scope question

Over the holiday break, ReOS grew from an attention observer into a Linux system control agent. I added comprehensive system tools: process management, service control, package management, Docker operations, file operations, network diagnostics. The reasoning engine gained extended thinking — multi-step planning for complex tasks. Circuit breakers went in to prevent runaway AI execution (if the model starts looping, the system stops it).

This was the first real scope question. The charter said "attention minder." The code was becoming "Linux assistant." Were these the same thing?

My answer at the time: yes. If the system understands your Linux environment, it can contextualize your attention. "You've been debugging this service for 40 minutes" means something different when the system knows the service is crashing in a loop. System awareness feeds attention awareness.

In hindsight, this was two tools sharing one codebase. But the merge was productive — it forced decisions about safety and verification that would matter later.

## The birth of The Play

Somewhere in early January, a life organization system appeared. I called it The Play — a theatrical metaphor for structuring your life.

**Acts** are the big arcs: your career, your health, a major project, a relationship you're investing in. They last months to years. **Scenes** are the concrete things happening within an Act: a meeting tomorrow, a deadline next week, a task you're tracking.

Two tiers. Deliberately. The first version actually had three — Acts, Scenes, and Beats — but the third level created places to hide work without doing it. Three levels of hierarchy is a to-do list. Two levels is a question: "What narrative am I in, and what's happening next?"

The Play started as a side feature and became the structural backbone of everything. Your attention needs context. The Play provides it. When Cairn later says "you've been in the Health act for 20 minutes," it's because The Play defines what Health means to you.

## Circuit breakers: the paperclip problem

One commit message from this period stands out: "docs: add Circuit Breakers section to README for paperclip problem marketing."

The paperclip problem is an AI safety thought experiment: a superintelligent AI told to make paperclips converts the entire earth into paperclips because nobody told it to stop. The version that actually happens in practice is more mundane: an LLM in a loop generating files, making API calls, or running commands without stopping because nobody told it when to quit.

Circuit breakers enforce stopping conditions. Maximum iterations per session. Token budget limits. Wall-clock timeouts. Rate limiting on system commands. These aren't theoretical safeguards — they're the difference between "the model tried 3 approaches and stopped" and "the model filled your disk with generated files at 3 AM."

Every AI tool that executes commands needs circuit breakers. Most don't have them. ReOS did, from the first week of January.

---

*Next: the fastest three days of development I've ever had, and why I stopped trusting regex for intent parsing.*
