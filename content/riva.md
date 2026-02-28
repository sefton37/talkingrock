---
title: "RIVA"
description: "Recursive Intention-Verification Architecture. Code generation that optimizes for correctness, not speed."
---

## What is RIVA?

RIVA is a code generation and verification engine built on a simple premise: **if you can't verify it, decompose it.** It breaks complex coding tasks into independently verifiable pieces, validates each one through a multi-layer pipeline, and uses [NOLang](/nolang) as its canonical intermediate representation to eliminate the ambiguity that plagues LLM-generated code.

Traditional code generation optimizes for speed because tokens cost money. RIVA optimizes for **correctness** because tokens are free — it runs on local inference. We'll spend 3 seconds verifying a 1-second change rather than risk a bug that takes 3 hours to debug.

---

## The work loop

At RIVA's core is a recursive algorithm:

1. **Can I verify this intention directly?** If yes, proceed. If no, decompose.
2. **Try action cycles** — thought, action, result, judgment, reflection.
3. **If cycles fail, decompose** into smaller sub-intentions.
4. **Work each child recursively**, then integrate and verify at the parent level.
5. **Bubble results up** through the tree.

Every intention is an atomic unit with three properties: *what* (the goal in natural language), *acceptance* (verifiable success criteria), and *trace* (every attempt made at this level). Nothing is opaque.

---

## Multi-layer verification

Four progressive layers, each building on the last:

| Layer | What it checks | How |
|-------|---------------|-----|
| **Syntax** | Is the code valid? | Tree-sitter AST parsing |
| **Semantic** | Does it make logical sense? | Undefined name detection, import validation |
| **Behavioral** | Does it execute correctly? | Test execution with timeouts |
| **Intent** | Does it match what was requested? | LLM-based alignment verification |

Verification strategy adapts to risk. Low-risk changes get syntax checks. High-risk changes get the full pipeline. Always.

---

## NOLang: the plan language

Before RIVA writes code in your target language, it builds a plan in [NOLang](/nolang) — a programming language designed for LLM generation, not human authorship.

The flow:

1. **You describe what you want** in natural language
2. **RIVA generates a NOLang program** — fixed-width binary instructions with no naming ambiguity
3. **The verifier checks it statically** — types, stack balance, exhaustiveness, hash integrity, contracts
4. **Only after verification** does RIVA translate the plan into your target language

NOLang eliminates the coin-flip problem. When an LLM writes Python, every variable name, every style choice is a probability distribution. In NOLang, there's exactly one way to express any computation. Same intent, same instructions, every time.

Programs that fail verification get rejected and regenerated — not shipped with hidden bugs.

---

## Trust budget

RIVA tracks trust across a session. Successful verifications earn trust. Skipped verifications spend it. High-risk actions are always verified regardless of budget.

The result: RIVA learns which patterns are reliable and adjusts its diligence accordingly — paranoid when it should be, efficient when it can be.

---

## Under development

RIVA is in active development. The verification pipeline and NOLang backend are built and tested. End-to-end LLM generation is next.

Follow progress on [GitHub](https://github.com/sefton37/talkingrock).
