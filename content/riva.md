---
title: "RIVA"
description: "Recursive Intention-Verification Architecture. Code generation that optimizes for correctness, not speed."
---

## What is RIVA?

RIVA is a code generation and verification system built on a simple premise: **if you can't verify it, decompose it.** It uses recursive decomposition to break complex coding tasks into independently verifiable pieces, then validates each one through a multi-layer verification pipeline.

Traditional code generation optimizes for speed because tokens cost money. RIVA optimizes for **correctness** because tokens are free — it runs on local inference via Ollama. We'll spend 3 seconds verifying a 1-second change rather than risk a bug that takes 3 hours to debug.

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

Verification strategy adapts to risk. Low-risk changes (imports, config) get syntax checks. High-risk changes (security, destructive operations) get the full pipeline. Always.

---

## Trust budget

RIVA tracks trust across a session. You start with a budget. Successful verifications earn trust. Skipped verifications spend it. High-risk actions are always verified regardless of budget.

The result: RIVA learns which patterns are reliable and adjusts its diligence accordingly — paranoid when it should be, efficient when it can be.

---

## Risk-aware decisions

Every action is classified by risk:

- **High** — destructive operations, security-sensitive code, external dependencies. Always fully verified.
- **Medium** — normal code changes. Standard verification.
- **Low** — read-only operations, boilerplate, documentation. Minimal verification with high trust.

RIVA knows when to be careful and when to move fast. The distinction isn't manual — it's pattern-matched from the action itself.

---

## Fast paths

80% of coding requests are variations on 20% of patterns. RIVA detects common operations — adding imports, creating functions, fixing tests — and optimizes them with minimal overhead, falling back to full recursive decomposition only when needed.

---

## Under development

RIVA is in active development. Follow progress on [GitHub](https://github.com/sefton37/talkingrock).
