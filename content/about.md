---
title: "About"
description: "The philosophy behind Talking Rock AI."
lastmod: 2026-03-06
---

> **Mission:** Center your data around you, not in a data center, so that your attention is centered on what you value.

> **Vision:** AI that partners with you and your values, not to automate you. Intent always verified, permission always requested, all learning available to be audited and edited by you.

---

## The problem

Big tech wants AI to be a subscription you pay forever. They collect your data, train on your conversations, and can change the rules anytime. They optimize for engagement, not for you.

This isn't a technical limitation. It's a business model. Your data is the product, and your attention is the yield.

## A mirror, not a manager

Every productivity tool asks: *"How can we capture what this person does?"*

Talking Rock asks: *"How can this person see themselves clearly?"*

The only report goes to the only stakeholder that matters: you.

The right response to "trust me" is "show me." Small, focused models tuned to your context will outperform massive general-purpose models for the tasks that actually matter in your day — because they're *yours*. If I can't build AI that respects autonomy, I shouldn't build AI at all.

## The name

A talking rock doesn't move. It doesn't follow you. It sits where you put it, and when you ask, it speaks — clearly, honestly, without agenda. It's grounded.

That's what I'm building. AI that's grounded in your values, your data, your terms. Not a system that watches you from the cloud and whispers suggestions optimized for engagement.

A rock that talks when spoken to. And only says what it can show you.

---

## This isn't a privacy policy. It's architecture.

There's no data center involved. The AI runs on your machine. Your data never leaves. There is no server to send it to, no company that sees your priorities, your goals, or your struggles.

Every request passes through a five-layer verification pipeline before anything happens. Because inference is local, verification is free — so everything gets verified. Every lesson learned enters a review queue. You approve, reject, or edit before it joins the knowledge base. Nothing is learned behind your back.

These aren't features. They're the architecture.

Every component — Tailscale, Thunderbird, Ollama, PAM — is independently trusted, open source, and user-controlled. No single vendor, no single point of compromise. Traditional SaaS bundles trust behind one company; Talking Rock distributes it across independent systems you can audit and replace. Assembly isn't friction — it's the security model.

## Smart models, outsized impact

True democratization means running on hardware people actually have — not the
hardware they wish they had. Using cheap local LLM calls is our superpower:
binary confidence, structured prompts, and multi-layer verification make
modest models outperform large models used naively.

The target: 8B parameter models, with 3B as a stretch goal. These run on 16GB
RAM — the kind of laptop most people already own. Larger models have their
place, but Talking Rock's bet is that smart architecture multiplies capability.
We'd rather verify every decision with an 8B model than skip verification to
save tokens on a 70B one.

---

## What I'm building

Four tools, one philosophy. All local-first, all open source, all running on hardware you already own.

### [Cairn](/cairn/) — personal attention minder and development orchestrator

Cairn manages your attention, not your tasks. It reads your calendar and email through Thunderbird, organizes your life through a two-tier structure called The Play, and learns only what you explicitly approve. Two levels, deliberately — enough structure to stay oriented, not enough to hide behind. A five-layer verification pipeline checks every operation before it executes. A coherence kernel filters suggestions against your stated values and goals — sovereignty-preserving, never guilt-tripping. When a conversation closes, a four-stage compression pipeline extracts meaning into persistent, auditable memory. Cairn is expanding into work management — observing Claude Code agent sessions as a PM and Scrum Master, surfacing project insights for your approval, never commanding.

### [Helm](/helm/) — the mobile command for Cairn

Helm puts Cairn in your pocket. Full feature parity — orchestrate your knowledge base, calendar, email, personal CRM, and every agent in the Talking Rock ecosystem from your phone. Cairn acts as PM and Scrum Master for all agents: security-hardened boundaries, circuit breakers, every action tracked and reviewed. TLS encryption, PAM authentication, fail-closed design, audit logging. Two production dependencies. Converging into Cairn as its native mobile interface.

### [ReOS](/reos/) — natural language Linux

ReOS lives in your terminal. Ask something in plain English and it figures out the right command. Type a normal shell command and it stays out of the way entirely. The core principle: enhance, don't replace. A parse gate decides how to handle each input — no mode switching, no special prefix. System context gathering ensures it proposes commands that match your distribution, package manager, and shell. Hard blocks catch catastrophic commands outright. Nothing runs without your approval.

### [RIVA](/riva/) — code verification engine

RIVA breaks complex coding tasks into independently verifiable pieces. The core premise: if you can't verify it, decompose it. Five verification layers — from 1ms syntax checks to LLM-judged intent alignment — catch errors before they ship. NOLang, a purpose-built plan language, eliminates the ambiguity that plagues LLM-generated code. Traditional code generation optimizes for speed because tokens cost money. RIVA optimizes for correctness because tokens are free on local inference.

---

## Who I am

I'm one person focused on a big bet: that the future of AI is local, transparent, and human-directed.

This isn't done yet. But it's being built in the open, and you can watch — or help.

*Build the best personal AI assistant in the world. Then give it away.*
