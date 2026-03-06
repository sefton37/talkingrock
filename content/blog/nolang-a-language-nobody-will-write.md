---
title: "NOLang: A Language Nobody Will Write"
description: "Why I built a programming language designed for machines, and what happened when I gave it I/O."
date: 2026-02-16
lastmod: 2026-02-16
---

Every programming language ever built was designed for humans to write. Variable names, syntactic sugar, multiple ways to express the same logic — all of it optimizes for readability. But when an LLM generates code, every naming decision is a coin flip. Every style choice is a probability distribution. These decisions burn token probability that should be spent on getting the logic right.

So I built a language where there's exactly one way to express any computation.

## The problem NOLang solves

Ask an LLM to write a function that adds two numbers. It might call the variable `result`, `output`, `ret`, `sum`, or `value`. It might use a ternary or an if/else. It might add type hints or not. Each variation is a different token sequence, and each one consumes probability mass that could have gone toward correctness.

NOLang collapses all equivalent expressions into one canonical form. Fixed-width 64-bit instructions. De Bruijn indices instead of variable names — `BIND; REF 0` means "bind a value, reference the most recent binding." No naming decisions means no naming variance.

## Nine phases in two weeks

I started NOLang on February 14th and had all nine phases complete by February 24th. The build order was deliberate:

**Phase 1: Common crate.** Types, opcodes, 17 type tags. Every instruction is exactly 8 bytes, no exceptions. This is the foundation everything else compiles against.

**Phase 2: VM.** A stack-based virtual machine that executes NOLang binary. Sandboxed execution with configurable resource limits.

**Phase 3: Verifier.** Four verification layers — mechanical (type safety, stack balance), contractual (preconditions/postconditions), empirical (witness test cases), and reflective (LLM describes what the program does, human confirms). If the verifier says a program is valid, the VM will never encounter a type mismatch or stack underflow. That's a guarantee, not an aspiration.

**Phase 4: Assembler.** Text assembly format that maps 1:1 to binary. The LLM generates assembly; the assembler produces instructions.

**Phase 5: CLI.** A `nolang` command that ties everything together — assemble, verify, run, disassemble.

**Phase 6: Semantic layers.** Contracts as structural elements (not comments), 220 generated catalog programs across 14 categories, 1,338-entry training corpus for fine-tuning.

**Phase 7: LoRA fine-tuning.** Two models: intent-to-assembly (generate programs from descriptions) and assembly-to-description (explain what a program does). This closes the reflective verification loop — the model generates code, then a separate model describes what the code does, and a human checks if the description matches the intent.

**Phase 8: Feedback loop.** Failed verifications feed back into the training data. The model learns from its mistakes empirically, not heuristically.

**Phase 9: I/O extension.** This was the big one — 18 new opcodes for strings, files, paths, and processes. A RIVA bridge so the code verification engine can use NOLang as its intermediate representation. A sandbox mode that restricts which I/O operations are allowed.

591 Rust tests passing across the workspace when I was done. The language works.

## Why this matters for RIVA

[RIVA](/riva/) is the code verification engine. Its premise: if you can't verify it, decompose it. But verify against *what*? If the LLM generates Python, you're verifying against a language with infinite surface area — naming, style, idioms, implicit behaviors.

If the LLM generates NOLang first, you verify against a language with exactly one way to express any computation. Then, only after verification passes, you translate to the target language. The verification happens in the space where it's tractable.

Traditional code generation optimizes for speed because tokens cost money. RIVA optimizes for correctness because tokens are free on local inference. Spend 3 seconds verifying a 1-second change rather than risk a bug that takes 3 hours to debug.

## The SEO week

While NOLang was taking shape, I also did an SEO push across the portfolio. Rogue Routine got domain pages, a topic taxonomy, keyword-optimized titles, and a crawlable reader. The portfolio site got a proper sitemap, Search Console verification, and the Sieve and Rogue Routine projects added to the showcase. I switched from Umami (third-party analytics) to a self-hosted beacon — the same Pulse system that now runs on talkingrock.ai.

Everything pointing in the same direction: own the stack, trust nothing you can't inspect.

---

*Next week: breaking Cairn into three independent projects, building a public website, and launching a demo.*
