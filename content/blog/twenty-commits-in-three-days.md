---
title: "Twenty Commits in Three Days"
description: "Conversation persistence, LLM-first intent parsing, a security layer, and the day I threw away the regex engine."
date: 2026-01-05
lastmod: 2026-01-05
---

January 3rd through 5th was the densest stretch of development in the project's history. Over twenty commits in three days. The system went from "prototype that sometimes works" to "something I could actually use."

## The death of regex intent parsing

When you type something to an AI assistant, it needs to figure out what you want. The first version of ReOS used regex patterns: if the message matches `install.*package`, route to the package manager. If it matches `what.*memory`, check RAM usage.

This breaks immediately. "Can you install that thing I mentioned?" matches no pattern. "My memory of yesterday's meeting" false-matches on "memory." The regex approach requires you to anticipate every way a human might phrase every possible request. You can't.

On January 4th, I replaced it with LLM-first intent parsing. Every message goes to the language model first. The model classifies the intent, identifies the action, and proposes a plan. Regex becomes a fast-path fallback for unambiguous commands, not the primary router.

This was the right architectural decision, but getting there took multiple attempts in a single day. The commit history tells the story: "Replace regex intent parsing with LLM-based planning" → "fix: Handle LLM plan dict wrapping and action format mismatch" → "Hybrid approach - LLM intent parsing + code step generation" → "Intercept ALL input for natural language classification."

Four iterations. Each one was wrong in a way that revealed something about the problem. The final version intercepts everything, classifies it, and only falls back to direct execution if the input is clearly a shell command. The model decides what's a question and what's a command — not a regex.

## Conversation persistence

Before January 4th, every time you opened the shell integration, ReOS started fresh. No memory of what you'd just asked. No context from five minutes ago.

Adding conversation persistence — storing the chat history in SQLite and loading it when you reconnect — sounds trivial. It changes everything about how the tool feels. Suddenly you can say "do the same thing but for nginx" and it knows what "the same thing" was. Context persistence is the difference between a tool and a conversation.

## The security layer

Also on January 4th: a comprehensive security layer. The commits are sequential — "Add system state and certainty layers for anti-hallucination" → "Implement comprehensive security layer" → "Add comprehensive security design document."

The anti-hallucination piece matters most. When an LLM proposes a command, how do you know the command will do what the model says? You don't, unless you verify. The certainty layer checks whether the model's proposed action matches the system's actual state. If the model says "restart nginx" but nginx isn't running, that's a hallucination. Catch it before execution, not after.

## PAM, then Polkit, then PAM again

January 5th brought authentication. The system needs to know who's using it — especially before running commands that require elevated privileges.

The first implementation used PAM (Pluggable Authentication Modules) — the standard Linux authentication framework. You type your password, PAM verifies it, the session gets an encrypted token. AES-256-GCM encryption, scrypt key derivation, 15-minute idle timeout.

The same day, I switched to Polkit. Polkit shows the native system authentication dialog — the same one you see when you install a package or change system settings. It supports passwords, fingerprints, smart cards. It's what Linux users expect.

Months later, for the web-based PWA, I'd switch back to PAM. Polkit requires a desktop session — it can't authenticate a web request. The decision ping-ponged because the right answer depends on the interface. Desktop: Polkit. Web: PAM. Both are correct in their context.

## The Play gets real

The Play UI became a full overlay on January 5th — a standalone window showing your Acts and Scenes in a hierarchical view. You could create Acts, add Scenes, track stages (`planning`, `in_progress`, `awaiting_data`, `complete`). The consciousness stream started showing what Cairn was paying attention to. Settings gained tabs for LLM provider selection and agent personas.

By the end of January 5th, the system had: persistent conversations, LLM-based intent classification, a security layer with anti-hallucination, system authentication, a life organization framework, and a settings panel. And circuit breakers to keep it all from running away.

Three days. Twenty commits. The project found its shape.

---

*Next: the birth of three agents and the day the project got its name.*
