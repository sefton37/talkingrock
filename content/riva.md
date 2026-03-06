---
title: "RIVA"
description: "Recursive Intention-Verification Architecture. Code generation that optimizes for correctness, not speed."
lastmod: 2026-03-06
schema_type: "SoftwareApplication"
schema_category: "DeveloperApplication"
---

## What is RIVA?

RIVA is a code generation and verification engine built on a simple premise: **if you can't verify it, decompose it.** It breaks complex coding tasks into independently verifiable pieces, validates each one through a multi-layer pipeline, and uses [NOLang](/nolang) as its canonical intermediate representation to eliminate the ambiguity that plagues LLM-generated code.

Traditional code generation optimizes for speed because tokens cost money. RIVA optimizes for **correctness** because tokens are free — it runs on local inference through [Ollama](https://ollama.com). Spend 3 seconds verifying a 1-second change rather than risk a bug that takes 3 hours to debug.

---

## The executor: seven phases

RIVA's executor drives a principled loop through seven phases:

| Phase | Name | What happens |
|-------|------|-------------|
| 1 | **Intent** | Discover what the user truly wants |
| 2 | **Contract** | Define explicit, testable success criteria |
| 3 | **Decompose** | Break into atomic steps |
| 4 | **Build** | Execute the most concrete step |
| 5 | **Verify** | Test that the step fulfills its contract |
| 6 | **Integrate** | Merge verified code into the codebase |
| 7 | **Gap** | Check what remains, loop until complete |

Phases 5.5 (**Debug** — analyzing failures) and 5.6 (**Explore** — trying alternative approaches) activate when verification fails, before the executor decides whether to retry or decompose further.

The executor tracks wall-clock time and will timeout rather than spin indefinitely. Every iteration records its phase reached, steps completed, criteria fulfilled, and remaining gap.

### Intentions: the recursive unit

At RIVA's core is the `Intention` — an atomic unit with three properties:

- **What** — the goal in natural language
- **Acceptance** — verifiable success criteria
- **Trace** — every attempt made at this level

Each attempt is a `Cycle`: thought, action, result, judgment, reflection. Actions have types (`COMMAND`, `EDIT`, `CREATE`, `DELETE`, `QUERY`) and can carry NOLang assembly. Judgments are explicit: `SUCCESS`, `FAILURE`, `PARTIAL`, or `UNCLEAR`.

When cycles fail at one level, the intention decomposes into smaller child intentions. Each child is worked recursively, then results bubble up and integrate at the parent level. Nothing is opaque — the full trace is available for inspection.

### Contract-driven development

Before building anything, the executor defines a `Contract` — explicit success criteria mapped to acceptance tests. Contracts prevent the common LLM failure mode of generating code that "looks right" but doesn't satisfy the actual requirement. Every iteration checks progress against the contract, not against a vague description.

---

## Five-layer verification

Five progressive layers, each building on the last:

| Layer | What it checks | Speed | How |
|-------|---------------|-------|-----|
| **NOL Structural** | Is the plan valid? | ~1ms | NOLang assembly + verification |
| **Syntax** | Is the code valid? | ~1ms | Tree-sitter AST parsing, `ast.parse` |
| **Semantic** | Does it make logical sense? | ~10ms | Undefined name detection, import validation, type checking |
| **Behavioral** | Does it execute correctly? | ~100ms-1s | Test execution with timeouts, output validation |
| **Intent** | Does it match what was requested? | ~500ms-2s | LLM-based alignment verification |

Verification strategy adapts to risk through four modes:

- **MINIMAL** — syntax only (low-risk, high-confidence patterns)
- **STANDARD** — syntax + semantic
- **THOROUGH** — syntax + semantic + behavioral
- **MAXIMUM** — all five layers including NOL structural and LLM intent

Early layers fail fast to save tokens on obvious errors. Later layers spend tokens for confidence. Safety failures are always blocking.

---

## NOLang: the plan language

Before RIVA writes code in your target language, it builds a plan in [NOLang](/nolang) — a programming language designed for LLM generation, not human authorship.

1. **You describe what you want** in natural language
2. **RIVA generates a NOLang program** — fixed-width binary instructions with no naming ambiguity
3. **The NOL Structural verifier checks it statically** — types, stack balance, exhaustiveness, hash integrity, contracts
4. **Only after verification** does RIVA translate the plan into your target language

NOLang eliminates the coin-flip problem. When an LLM writes Python, every variable name and style choice is a probability distribution. In NOLang, there's exactly one way to express any computation. Same intent, same instructions, every time.

Programs that fail verification get rejected and regenerated — not shipped with hidden bugs.

---

## Optimization and learning

### Trust budget

RIVA tracks a trust budget across a session. Successful verifications earn trust. Skipped verifications spend it. High-risk actions are always verified regardless of budget. The result: RIVA learns which patterns are reliable and adjusts its verification depth accordingly.

### Pattern success tracking

The `PatternSuccessTracker` records which code patterns succeed and fail across sessions. Patterns with high success rates get lighter verification (faster). Patterns with low success rates get heavier verification (more careful). This is empirical, not heuristic — it's based on what actually worked in your codebase.

### Complexity assessment

Before choosing a verification strategy, RIVA assesses task complexity and action risk. Simple changes to well-understood patterns get fast-tracked. Novel patterns in critical paths get the full pipeline. The goal is to be paranoid when it matters and efficient when it can be.

---

## Under development

RIVA is in active development. The verification pipeline, intention system, contract framework, and NOLang backend are built and tested. End-to-end LLM generation is next.

Follow progress on [GitHub](https://github.com/sefton37/talkingrock).
