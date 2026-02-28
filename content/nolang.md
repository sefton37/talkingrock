---
title: "NOLang"
description: "A programming language designed for LLM generation, not human authorship. One computation, one representation."
---

## What is NOLang?

Every programming language ever built was designed for humans to write. Variable names, syntactic sugar, multiple ways to express the same logic — all of it optimizes for human readability. But when an LLM generates code, every naming decision is a coin flip. Every style choice is a probability distribution. Implicit behaviors become invisible context that consumes the attention window.

NOLang eliminates all of it.

NOLang is a canonical binary intermediate representation — fixed-width 64-bit instructions where the same computation always produces the same instructions. No variable names. No style variance. No ambiguity.

---

## Why it matters

When you ask an LLM to write a function, it might name a variable `result`, `output`, `ret`, or `value`. It might use a for loop or a list comprehension. It might put the guard clause first or last. These are all equivalent, but each is a different token sequence, and each burns probability mass that should be spent on *correctness*.

NOLang collapses all equivalent expressions into one canonical form. The LLM's entire token budget goes toward getting the logic right, not choosing between synonyms.

---

## How it works

```
Human intent → LLM → NOLang binary → Verifier → VM → Result
                         ↑                |
                         └── reject ──────┘
```

1. **You describe what you want** in natural language
2. **The LLM generates NOLang assembly** — a text format that maps 1:1 to binary
3. **The assembler converts it** to fixed-width 64-bit instructions
4. **The verifier checks everything statically** — before any code runs
5. **The VM executes it** in a sandboxed environment
6. **If verification fails**, the error feeds back for regeneration

---

## Design choices

**De Bruijn indices, not names.** Instead of `x = 5; return x`, NOLang uses `BIND; REF 0` — "bind a value, reference the most recent binding." Zero naming decisions means zero naming variance.

**Exhaustive pattern matching as the only control flow.** No if/else. No loops. Just recursion and match. This makes every code path explicit and verifiable.

**Contracts are structural, not comments.** Preconditions and postconditions are part of the instruction stream. They're checked by the verifier and enforced by the VM. You can't skip them.

**Hash integrity on every function.** Every function block carries a blake3 hash. If the instructions change, the hash breaks. Tamper-evident by construction.

---

## Four layers of verification

NOLang programs pass through four verification layers before execution:

1. **Mechanical** — type safety, stack balance, structural validity, exhaustive pattern coverage
2. **Contractual** — preconditions and postconditions express relational properties that must hold
3. **Empirical** — witness test cases (concrete inputs and expected outputs) that the program must satisfy
4. **Reflective** — the LLM describes what the program actually does; a human confirms it matches intent

If the verifier says the program is valid, the VM will never encounter a type mismatch, stack underflow, structural error, or unhandled case. That's a guarantee, not an aspiration.

---

## The instruction set

65 opcodes across 13 categories:

- **Binding and reference** — bind values, reference by index, drop
- **Constants** — literal values and extended constants
- **Arithmetic** — add, subtract, multiply, divide, modulo, negate
- **Comparison** — equality, ordering
- **Logic** — and, or, not, xor, shift, implication
- **Control flow** — match, case, exhaustion marker
- **Functions** — define, precondition, postcondition, return, call, recurse
- **Data construction** — variants, tuples, arrays, projection
- **Verification** — hash, assert, typeof, universal quantification
- **Strings** — constants, length, concatenation, slicing, splitting
- **File operations** — read, write, append, exists, delete, directory listing
- **Process operations** — spawn, check
- **Control** — halt, nop

17 type tags. Every instruction is exactly 8 bytes. No exceptions.

---

## Under development

NOLang's core infrastructure is built and tested — 591 passing tests across the assembler, verifier, VM, and CLI. The LLM fine-tuning pipeline (LoRA) is operational with 1,338 training pairs across 14 program categories.

Follow progress on [GitHub](https://github.com/sefton37/talkingrock).
