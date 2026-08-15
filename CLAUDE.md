# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

**THAItern** — an AI-powered work-simulation learning system for Thai university students. Currently in architecture/design phase (Trust Gate G1 — internal only). No production code yet.

### Contents

| Path | Purpose |
|------|---------|
| `THAItern-Learning-Architecture-EN.md` | Canonical architecture spec (v1.2). The binding source of truth for all design decisions. Read this before touching anything. |
| `legacy_frontend/THAItern-app.html` | **Old frontend** — reference only, not the active codebase. Do not edit. |
| `legacy_frontend/team-board.html` | Old team board — reference only. |
| `voice_requirement/*.m4a` | Recorded voice memos describing requirements (Thai). Transcribed → `voice_requirement/transcripts.md`. |
| `voice_requirement/transcripts.md` | ASR output of all voice memos — read this for product requirements not yet in the architecture doc. |
| `Human-centricity_in_AI_governance_*.pdf` | Reference paper |

## Project Context (from voice memos — not yet in architecture doc)

THAItern is a **submission to AIS** (not a general product). The AIS submission form requires answers on: what innovation/social solution is proposed, which AIS technologies will be used, and identified risks/downsides.

The product has **two user tracks**, both sharing the same learning engine:
- **SME track** — student helps a real SME (shop, restaurant, etc.)
- **Community track** — student helps a local community (for arts/social science students), scoped by district/province

### Core User Flow (from voice memos)

1. **Select** — student picks one SME or one community to help. Shows logo + basic description only; problem is not revealed yet.
2. **Learn** — training via 3 components: (a) AI-powered Business School textbook content, (b) case studies, (c) Special Session = recorded video from real humans (not AI) — Facebook legal constraints apply here.
3. **Access** — after training, student gets a password/token to access the real SME's platform (Facebook page or equivalent). Time-limited: **14 days**.
4. **Work** — student diagnoses SME problem and tracks it within the platform.
5. **Review** — AI checks submitted work; SME gives feedback via Google Form (video preferred over audio); Case Review session.
6. **Close loop** — student iterates based on SME feedback.

> ⚠️ Community track and real-platform access (steps 3–4) are **not described in the architecture doc** — they are product requirements from voice memos only. Resolve the gap before implementation.

## Architecture in One Paragraph

THAItern uses a **two-system architecture**: System A (Learning Engine, internal) selects the next learning unit using scoring bands; System B (Evidence Record, external) records only events and the learner's own words — never scores. A 7-stage progression (Structure → Locate → Information Cost → Belief Revision → Quantified Commitment → Communication → Live) uses a sawtooth support model within each stage (watch → complete → solo). Stage advancement requires 2 consecutive solo passes at band ≥ MEETS across ≥2 distinct industries.

## Core Architectural Constraints (Do Not Violate)

These are structurally enforced by the architecture — violating them breaks the product's central claim:

- **P-A1** — System B has **no read access** to `RubricScore.band` or `LearnerState`. Separate service boundary.
- **P-A4** — No aggregate score field exists in the schema. Bands only (`BELOW | MEETS | EXCEEDS`).
- **P-C3** — No model call may write to `reflection_written`. Learner authors it.
- **P-C4** — No reward entity in the schema (no badges, streaks, completion counters).
- **P-D3** — `evidence_quote` and `anchor_id` are `NOT NULL` on `RubricScore`.
- **P-E3** — `DecisionNode.ask_type` admits closed enumerations only — no free-form user text reaching a system prompt.

## Key Data Entities

```
SmeProfile → Case → Stage → DecisionNode → NodeOption
                                            ↓
Attempt → AttemptEvent (19 types, single source for all Ring 1-3 metrics)
        → RubricScore (band + evidence_quote + anchor_id)
        → LearnerState
        → DecisionTrace (exported to external readers)
```

`cohort_id` and `mode` on every AttemptEvent are **unrecoverable if omitted at launch** — they separate institution-led vs organic use and practice vs assessment.

## Scoring Rules

| Stages | Scoring method |
|--------|---------------|
| 1, 3, 5, 6 | Rule-based only (no model call needed — can ship before scoring pipeline) |
| 2, 4 | Rule + AI band on justification text |
| 7 | Full AI band on transcript |

AI scoring only activates when Ring 0 (instrument health) passes for that dimension.

## Measurement Rings

Ring 0 (instrument health) **gates all other rings**. Dashboard greys Rings 1–3 while any Ring 0 check is failing. Ring 2 metrics have ceilings, not just floors (>90% completion = units too easy, not success).

North star metric: **Decision Traces read to completion by external readers, per month.**

## Open Items (🔖 — not resolved yet)

- All Ring 1–3 thresholds are reasoned defaults, not benchmarks — reset from first real cohort
- Authoring time (~22h per full case) is a structural estimate — must time one actual case before planning content
- PDPA lawful basis under institution-led onboarding — requires counsel before first real user
- `pass_rule = 2 consecutive` — tune from Attempts-per-Stage data

## Design System

Persisted at `design-system/thaitern/MASTER.md`. Read it before writing any UI. Page-specific overrides go in `design-system/thaitern/pages/<page>.md` — those override MASTER.

Key decisions:
- **Style**: Minimalism & Swiss Style (no decoration, grid-based)
- **Font**: Noto Sans Thai (Thai-first — do not substitute Latin-only fonts)
- **Colors**: Navy `#0F172A` primary, Blue `#0369A1` CTA, `#F8FAFC` background
- **Motion**: Stagger reveal on card grids, `prefers-reduced-motion` guard required
- **Icons**: SVG only (Heroicons/Lucide) — no emoji as icons

## Thai Legal Note

Thai majority age is **20** (not 18). Most year 1–2 undergraduates are minors under PDPA §20. `LearnerState.is_minor` is computed from `birth_year`; consent path branches before any non-essential data collection.
