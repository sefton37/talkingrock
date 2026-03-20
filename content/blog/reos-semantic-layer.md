---
title: "ReOS: Teaching a Terminal to Understand You"
description: "Building a semantic layer for Linux commands, benchmarking 17 models across 28,000 evaluations, and discovering that the problem was never the model."
date: 2026-03-20
lastmod: 2026-03-20
---

ReOS is a natural language shell. You type what you want in English, it proposes a Linux command. The thesis is simple: a local model running on your machine should be able to turn "what's eating all my RAM" into `ps --sort -rss`.

For the past week, I've been stress-testing that thesis. The results surprised me — not because the models were bad, but because I was measuring the wrong thing.

## The semantic layer

The first problem is obvious: a 3B parameter model doesn't reliably know Linux command syntax. It knows *about* commands the way a student who crammed for an exam knows material — approximately, with gaps, and with a tendency to confuse similar things.

So I built a semantic layer. 17,631 lines of structured YAML across 16 domains, mapping human intent to command patterns:

```yaml
- intent: "show what's using all the memory"
  alternate_phrasings:
    - "what is eating all my RAM"
    - "something is hogging resources, show me everything"
    - "sort by memory usage"
    - "my system is sluggish, which process is the memory hog"
  pattern: "ps --sort -rss"
  safety: safe
```

267 commands, 1,198 intents, 6,142 total searchable phrasings. Each entry carries safety metadata (safe/moderate/dangerous/blocked), undo paths, and flag documentation. The phrasings were written to cover how real humans actually talk — terse, verbose, frustrated, clinical, problem-oriented. A sysadmin at 2 AM doesn't say "display processes sorted by resident set size." They say "what is eating all my RAM."

The corpus was built from tldr-pages, community cheatsheets, man pages, and the Arch Wiki. The phrasing layer on top was the creative work — making each intent sound like a different human said it.

## RAG, not fine-tuning

The semantic layer sits in ChromaDB, embedded via nomic-embed-text through Ollama. At query time, the user's intent is embedded and the top matches are retrieved and injected into the LLM prompt. The model doesn't need to recall `ps --sort -rss` from its weights — the pattern is handed to it, and it just needs to fill in parameters.

I chose RAG over fine-tuning for a practical reason: when I add a command or fix a phrasing, I re-embed one YAML file. I don't retrain a model. The semantic layer is version-controlled, human-readable, and editable by anyone who knows Linux.

## The hybrid tiers

v1 of the RAG integration had a problem: it helped small models and hurt large ones. Injecting patterns into the prompt confused models that already knew the commands. A 7B model that would have correctly generated `df -h` instead got distracted by five retrieved patterns and produced something worse.

v2 introduced three tiers:

**Tier 1 — Deterministic.** When the semantic match is extremely high confidence (cosine distance < 0.12), skip the LLM entirely and return the pattern directly. "Show disk space" maps to `df -h` with near-zero distance. No model needed. Zero latency. 61% exact match accuracy on these cases.

**Tier 2 — Slot fill.** For good matches with placeholder parameters, give the LLM a constrained task: "Here's the pattern `tar czf {archive} {directory}`, the user said 'compress the docs folder,' fill in the blanks." This is a simpler task than open-ended command generation.

**Tier 3 — Free generation.** For queries that don't match any semantic pattern, fall back to the original pipeline. The model generates freely, same as before.

## The benchmark

415 test cases across 15 categories — file operations, process management, networking, services, package management, text processing, scheduling, dangerous commands, edge cases, natural language variants. Each case has an expected command and alternatives.

17 models: 16 local models via Ollama spanning 0.5B to 16B parameters, plus Claude Sonnet 4 via the Anthropic API as a ceiling reference. Each model ran through 4 pipeline configurations (reactive, reactive with RAG, conversational, conversational with RAG). Two full passes — v1 and v2 of the architecture.

56,000+ total evaluations.

## What "wrong" actually looks like

The first v1 results were discouraging. The best local model (qwen2.5:7b) scored 27% exact match. Even Claude only hit 38%. Seven times out of ten, the model generated the wrong command.

But "wrong" needed a closer look. I broke down the 73% failure rate:

- **40% were the right command with generic placeholders.** The model produced `cp /path/to/source /path/to/destination` when the test expected `cp file.txt /destination/`. It knew the right command. It just didn't guess the specific filenames from vague input.
- **19% were the right command with wrong flags.** Close but not exact.
- **2% were sudo mismatches.** `blkid` vs `sudo blkid` — both correct.
- **11% used a different but valid approach.** `pgrep nginx` instead of `ps aux | grep nginx`. Both work.
- **Only 11% were genuinely wrong commands.**

So I built extended scoring. Structural match (right base command regardless of arguments), sudo-normalized match, command equivalence (recognizes `pgrep` and `ps | grep` as equivalent), placeholder-normalized match. Under these measures, qwen2.5:7b was functionally correct 78% of the time. Claude hit 87.5%.

The models were much better than the numbers suggested. The scoring was too strict for the actual user experience — if ReOS suggests `cp /path/to/source /path/to/destination` and you know you want to copy `config.yaml` to `/etc/`, that's a useful suggestion even if it's not the exact string the test expected.

## v1 vs v2

The hybrid tiers changed the game for models that v1 RAG had hurt:

| Model | v1 RAG | v2 Hybrid | Delta |
|---|---|---|---|
| llama3.2:1b | 8.2% | 18.1% | +9.9% |
| codellama:13b | 17.1% | 26.7% | +9.6% |
| deepseek-coder-v2:16b | 17.3% | 26.5% | +9.2% |
| qwen2.5:7b | 24.3% | 28.2% | +3.9% |

llama3.2:1b more than doubled. It went from being *hurt* by RAG in v1 (-3.6%) to being the biggest winner in v2 (+9.9%). The tier system prevents bad grounding from confusing models that can't handle complex prompt injection — Tier 1 bypasses the model entirely for high-confidence matches.

13 of 16 models improved or held steady from v1 to v2.

## The leaderboard

Final v2 results, reactive pipeline with RAG:

| Model | Size | Exact | Best Match | Latency | Cost |
|---|---|---|---|---|---|
| Claude Sonnet 4 | API | 36.6% | 85.8% | 2,789ms | ~$0.01/query |
| qwen2.5:7b | 7B | 28.2% | 78.3% | 607ms | Free |
| gemma2:9b | 9B | 28.2% | 77.8% | 865ms | Free |
| qwen2.5:14b | 14B | 27.2% | 80.7% | 959ms | Free |
| deepseek-coder-v2 | 16B | 26.5% | 79.5% | 486ms | Free |

qwen2.5:7b is the sweet spot for ReOS. 78% functionally correct at 607ms, running entirely on your machine, no API key, no cloud dependency. It's 8 points behind Claude on best-match, but it's instant and free.

## What I learned

**The problem was never the model.** A 7B local model picks the right Linux command 74% of the time. The problem was asking it to do everything — recall the command, remember the flags, guess the arguments, format the output correctly. The hybrid tier system decomposes that into tasks each component handles well: the semantic layer does recall, the tier system routes by confidence, and the model handles only what it's good at.

**Scoring matters as much as generation.** If I'd stopped at 27% exact match, I would have concluded that local models can't do this. The extended scoring revealed they were already 78% useful. The gap between "exact string match" and "useful suggestion" is enormous, and most benchmarks don't measure it.

**Deterministic beats probabilistic when you can get away with it.** Tier 1 at 61% exact match and zero latency is the single highest-value path in the system. Every time I can map a user's intent to a known pattern without involving an LLM, accuracy goes up and latency goes to zero. The LLM is the fallback, not the primary path.
