---
title: "ReOS"
description: "Natural language Linux, right in your shell. It enhances the command line — it doesn't replace it."
lastmod: 2026-03-06
schema_type: "SoftwareApplication"
schema_category: "DeveloperApplication"
---

## What is ReOS?

ReOS is a natural language interface for Linux that lives in your terminal. Ask it something in plain English and it figures out the right command. Type a normal shell command and it stays out of the way entirely.

The core principle: **enhance, don't replace.** Your terminal still works exactly like a terminal. ReOS only activates when it recognizes something that isn't a valid shell command.

---

## How it works

### The parse gate

ReOS sits between you and your shell with a parse gate that decides how to handle each input:

1. **Valid shell command?** Execute it directly — full stdin/stdout/stderr, interactive prompts, pipes, and redirects work normally.
2. **Natural language?** Route to the agent for intent analysis, system inspection, and command proposal.

No mode switching. No special prefix. If you type `ls -la`, it runs `ls -la`. If you type "what's using all my memory," it figures out the answer.

### System context gathering

When ReOS detects natural language, the `ReOSAgent` gathers your system context before proposing anything:

- **OS detection** — reads `/etc/os-release` to know your distribution
- **Kernel version** — determines available features
- **Package manager** — detects `apt`, `dnf`, `pacman`, `zypper`, or `nix`
- **Shell** — reads your `$SHELL` to match command syntax
- **Running services** — queries systemd for current state

This context shapes every suggestion. ReOS doesn't propose `apt install` on a Fedora system.

### Code mode routing

ReOS includes a routing layer that distinguishes system administration requests from code-related requests. Pattern matching across 70+ indicators classifies requests as `CODE`, `SYSADMIN`, or `AMBIGUOUS`:

- **Sysadmin** — services, packages, users, network, containers, logs, security
- **Code** — file editing, testing, debugging, building, version control, dependencies

When a request is code-related and an Act in The Play has a repository assigned, ReOS routes to [RIVA](/riva) for code-aware handling.

### Safety enforcement

Two layers of protection before any command executes:

**Hard blocks** — regex patterns that catch catastrophic commands outright:
- `rm -rf /`, fork bombs, `dd` to physical disks, `mkfs` on system partitions, `chmod -R 777 /`

**Confirmation gates** — patterns requiring explicit user approval:
- `rm -rf` (any path), disk utilities, `shutdown`, `reboot`, partition tools

Rate limiting prevents runaway sudo escalation, and every proposed command is shown to you first with an explanation of what it does. Nothing runs without your approval.

---

## What it can do

- **Process monitoring** — "what's eating my RAM?" — ranked memory consumers
- **Service management** — "restart nginx" — systemd service control with status
- **Package management** — "install ffmpeg" — finds and installs via your detected package manager
- **Container control** — Docker and Podman operations in plain language
- **File operations** — search, move, organize with safety checks
- **System diagnostics** — disk usage, network status, listening ports, hardware info
- **Log inspection** — journalctl queries in plain language
- **Firewall status** — UFW and firewalld state inspection

All through local models (3-8B parameters) running locally. Shell commands are constrained and predictable — you don't need a massive model to get them right.

---

## Under development

ReOS is in active development. Follow progress on [GitHub](https://github.com/sefton37/talkingrock).
