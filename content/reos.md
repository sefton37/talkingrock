---
title: "ReOS"
description: "Natural language Linux, right in your shell. It enhances the command line — it doesn't replace it."
---

## What is ReOS?

ReOS is a natural language interface for Linux that lives in your terminal. Ask it something in plain English and it figures out the right command. Type a normal shell command and it stays out of the way entirely.

The core principle: **enhance, don't replace.** Your terminal still works exactly like a terminal. ReOS only activates when it recognizes something that isn't a valid shell command.

---

## How it works

ReOS sits between you and your shell with a parse gate that decides whether to act:

1. **Valid shell command?** Execute it directly — full stdin/stdout/stderr, interactive prompts work normally.
2. **Natural language?** Analyze intent, check your system, propose the right command.

There's no mode switching. No special prefix. If you type `ls -la`, it runs `ls -la`. If you type "what's using all my memory," it finds the answer.

---

## The parse gate

When ReOS detects natural language, it runs through four steps:

1. **Intent analysis** — what are you trying to do? (run, install, find, monitor, etc.)
2. **System check** — what's available on your machine? (PATH, packages, services)
3. **Semantic search** — find programs by description, not just name ("picture editor" finds GIMP)
4. **Smart proposal** — suggest a command with context, explain what it does, ask before executing

Every proposed command is shown to you first. Nothing runs without your approval.

---

## What it can do

- **Process monitoring** — "what's eating my RAM?" → ranked memory consumers
- **Service management** — "restart nginx" → systemd service control
- **Package management** — "install ffmpeg" → finds and installs via your package manager
- **Container control** — Docker and Podman operations in plain language
- **File operations** — search, move, organize with safety checks
- **System diagnostics** — disk usage, network status, hardware info

All through small models (1-3B parameters) running locally. Shell commands are constrained and predictable — you don't need a massive model to get them right.

---

## Under development

ReOS is in active development. Follow progress on [GitHub](https://github.com/sefton37/talkingrock).
