# THAItern Learning Architecture

**Principles · System Map · Stage-by-Stage Measurement**

Version 1.2 · 8 August 2026 · Trust Gate G1 (internal)

Supersedes the architectural sections of `THAItern-Learning-System-v1.0-SYNTHESIS.md` and `THAItern-Stage-System-v1.1.md`. Visual and interaction standards remain governed by `THAItern-Design-System-2026-08-07.md`. Evidence for every claim is traced in `THAItern-Verification-Theory-Base-2026-08-08.md`.

---

## Contents

1. [Governing Statement](#1-governing-statement)  
2. [System Map](#2-system-map)  
3. [Principle Catalogue](#3-principle-catalogue) — 29 principles in 6 groups  
4. [Stage Architecture](#4-stage-architecture)  
5. [Measurement by Stage](#5-measurement-by-stage)  
6. [Measurement Rings](#6-measurement-rings)  
7. [Data Architecture](#7-data-architecture)  
8. [Enforcement Matrix](#8-enforcement-matrix)  
9. [Evidence Base](#9-evidence-base)  
10. [Open Quantities](#10-open-quantities)

---

## 1\. Governing Statement

> **Stop trying to measure how good this person is. Record what they did, and teach through the recording.**

Twelve independent bodies of evidence — from clinical competence assessment, assessment-centre psychometrics, cognitive load theory, feedback research, motivation research, and personnel selection — converge on this single instruction. It is not a compromise reached when scoring proved difficult. It is the design that all available evidence independently supports.

The Decision Trace is the product. Scoring exists for exactly one purpose: to decide what to show next.

Everything in this document is derived from that statement.

---

## 2\. System Map

### 2.1 Whole-system view

┌────────────────────────────────────────────────────────────────────────────┐

│                            AUTHORING PIPELINE                              │

│                                                                            │

│   Full Case (7 node roles, authored once, \~22h)                            │

│        │                                                                   │

│        ├── internal-consistency test ──► BLOCKS PUBLISH ON FAILURE         │

│        ├── rubric anchors (3 bands × 2 exemplars × 5 dimensions)           │

│        └── stage configs ──► 7 playable units (\~3.1h each, amortised)      │

└───────────────────────────────┬────────────────────────────────────────────┘

                                │

                                ▼

┌────────────────────────────────────────────────────────────────────────────┐

│                             STAGE ENGINE                                   │

│                                                                            │

│  Stage 1 ─ Stage 2 ─ Stage 3 ─ Stage 4 ─ Stage 5 ─ Stage 6 ─ Stage 7       │

│    │        │         │         │         │         │         │            │

│    └─ sawtooth: \[1\] watch → \[2\] complete → \[3\] solo ──► gate ──┘            │

│                                                                            │

│  Gate \= 2 consecutive solo passes at band ≥ MEETS in ≥2 distinct industries│

└───────────────┬─────────────────────────────────────┬──────────────────────┘

                │                                     │

                ▼                                     ▼

┌──────────────────────────────────┐  ╔══════════════════════════════════════╗

│  SYSTEM A · LEARNING ENGINE      │  ║  SYSTEM B · EVIDENCE RECORD          ║

│  internal · never a verdict      │  ║  external · humans judge for         ║

│                                  │  ║  themselves                          ║

│  • per-dimension band \+ evidence │  ║                                      ║

│  • stage\_no, step\_in\_stage       │  ║  • situation encountered             ║

│  • hint history                  │  ║  • choice made                       ║

│  • predicted next-unit difficulty│  ║  • learner's own stated reasoning    ║

│                                  │  ║  • feedback received                 ║

│  Consumed by: next-unit selection│  ║  • what they said they'd change      ║

│  Visible to learner: bands only, │  ║                                      ║

│  and only past reportable\_when   │  ║  Contains no: score, rank, percentile│

└──────────────┬───────────────────┘  ╚═════════════════▲════════════════════╝

               │                                        │

               │        ┌───────────────────────┐       │

               └───────►│  THE ONLY GATE (P-A3) │───────┘

                        │  countable \+ value-   │

                        │  free \+ learner-      │

                        │  confirmed            │

                        └───────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐

│                         MEASUREMENT RINGS                                  │

│                                                                            │

│   Ring 0  INSTRUMENT HEALTH   ──► gates every ring outside it              │

│     Ring 1  LEARNING                                                       │

│       Ring 2  PRODUCT (ceilings, not floors)                               │

│         Ring 3  EXTERNAL OUTCOME ──► NORTH STAR                            │

└────────────────────────────────────────────────────────────────────────────┘

### 2.2 Time-scale nesting

Most learning designs specify one time scale and leave the rest to chance. Four are specified here.

SCALE 4 · One term (15 weeks)

   Stages 1→7 · mastery gating · cross-industry breadth · transfer checks

   │

   └── SCALE 3 · One week (≤30 min, ≤3 sessions)

          Day 1 case · Day 3 drills · Day 5 retrieval of a prior node

          Interleaved case types, never blocked

          │

          └── SCALE 2 · One unit (3–25 min, depending on stage)

                 2–7 live decision nodes \+ mandatory reflection screen

                 │

                 └── SCALE 1 · One decision (150 s)

                        Context 15% (≤80 words) │ Act 60% │ Consequence 25%

### 2.3 Control flow for a single unit

  enter unit

      │

      ▼

  ┌─────────────────┐   step 1 (watch)      → worked example, no scoring

  │ resolve step in │   step 2 (complete)   → new-layer nodes live only

  │ current stage   │   step 3 (solo)       → all stage nodes live, hints logged

  └────────┬────────┘

           ▼

  ┌─────────────────────────────────────────────────────┐

  │ for each live node:                                 │

  │   render context (≤80 words, ≤4 figures)            │

  │   capture decision (closed enum)                    │

  │   capture justification (≤200 chars, optional)      │

  │   emit consequence: business line │ expert line │   │

  │                     forward-action line             │

  └────────┬────────────────────────────────────────────┘

           ▼

  ┌─────────────────────────────────────────────────────┐

  │ SCORE  rule-based on enum  ── always                │

  │        AI band on free text ── only if Ring 0 passes│

  │        every band carries quote \+ anchor\_id         │

  └────────┬────────────────────────────────────────────┘

           ▼

  ┌─────────────────────────────────────────────────────┐

  │ REFLECT  learner writes ≤120 chars: "next time I…"  │

  │          shown again at the head of the next unit   │

  └────────┬────────────────────────────────────────────┘

           ▼

  ┌─────────────────────────────────────────────────────┐

  │ GATE CHECK                                          │

  │   pass  → advance step, or advance stage if step 3  │

  │           met twice consecutively across ≥2         │

  │           industries                                │

  │   fail  → return to step 2 with a new case          │

  │   stuck → after 4 attempts in one stage, notify     │

  │           the instructor (not the learner)          │

  └─────────────────────────────────────────────────────┘

---

## 3\. Principle Catalogue

Each principle carries four fields. **Statement** is binding. **Rationale** is the evidence that forces it. **Enforcement** names the mechanism that makes violation structurally difficult rather than merely discouraged. **Violation test** is how a reviewer detects breach without needing to argue about intent.

A principle without an enforcement point is a preference, not an architecture.

---

### Group A — Separation

The wall between the internal learning engine and the external evidence record. Breaching it invalidates the product's central claim.

---

**P-A1 · Separate the learning engine from the evidence record.**

- **Statement** — Two systems exist. System A computes internal state to select the next unit. System B records what happened for external readers. They share a database but never share semantics.  
- **Rationale** — Assessment-centre variance decomposition shows person × exercise interaction accounts for \~21.8% of rating variance while the dimension effect accounts for \~4.0%. Dimension scores drawn from a handful of exercises are not stable traits. Exporting them into hiring decisions imports construct-irrelevant variance into someone's career.  
- **Enforcement** — Separate service boundary. System B is materialised from `AttemptEvent` and learner-authored text only; it has no read access to `RubricScore.band` or `LearnerState`.  
- **Violation test** — Grep System B's rendered output for any numeral that is not a business figure from the case itself.

---

**P-A2 · The evidence record contains only events and the learner's own words.**

- **Statement** — Every line of a Decision Trace is either something that demonstrably occurred, or a sentence the learner wrote.  
- **Rationale** — Miller's pyramid places simulation at "shows how." A record of behaviour supports that claim exactly. A computed judgement claims "does," which simulation cannot support. Additionally, hiring managers in 2026 are in trust-but-verify mode toward AI-mediated credentials; a record they can audit survives that posture, a score does not.  
- **Enforcement** — Trace renderer accepts two source types only: `AttemptEvent` rows and `reflection_written` payloads.  
- **Violation test** — Every trace line must resolve to an event ID or a learner-authored string. Any line that cannot is a defect.

---

**P-A3 · Cross-boundary statements must be countable, value-free, and learner-confirmed.**

- **Statement** — System A may contribute a descriptive sentence to System B only if it (a) references events that can be counted, (b) contains no evaluative adjective, and (c) has been explicitly confirmed by the learner before publication.

| Admissible | Inadmissible |
| :---- | :---- |
| "Across 4 units, revised the conclusion 3 times after receiving evidence that contradicted the initial hypothesis." | "Demonstrates strong adaptability." |
| "Requested an average of 2.4 of 3 available data items; selected financial statements first every time." | "Judgement score: 78/100." |
| "Identified 3 of 5 instances where the assistant supplied incorrect information." | "Top 20% of cohort." |

- **Rationale** — The left column lets a reader form their own judgement, which is what the product sells. The right column asserts constructs the measurement cannot support.  
- **Enforcement** — Sentences are generated from templates with numeric slots. Free-form generation into System B is not implemented.  
- **Violation test** — Any System B sentence containing a comparative or evaluative term.

---

**P-A4 · Internal scores may never be rendered as a verdict.**

- **Statement** — The learner sees three-level bands with supporting evidence, never composite scores, percentiles, ranks, or stars.  
- **Rationale** — Current LLM rubric scoring achieves high rank-order correlation with trained raters but roughly 55% exact agreement, and is sensitive to prompt phrasing. Rank-ordering is sufficient for choosing the next unit; it is not sufficient to put a number on someone. Separately, composite scores are self-level feedback, the least effective of Hattie & Timperley's four levels.  
- **Enforcement** — `RubricScore` exposes `band` as an enum. No aggregate score field exists in the schema.  
- **Violation test** — Presence of any numeric aggregate of `band` values anywhere in the codebase.

---

### Group B — Task and Progression

---

**P-B1 · Every unit is a whole task, never a fragment.**

- **Statement** — Stage 1 is a small complete case with a question, a decision, an answer, and a consequence. It is not the first half of a large case.  
- **Rationale** — 4C/ID's central argument is that compartmentalisation and fragmentation are the dominant failure mode of traditional instructional design. Learners who practise only components never integrate them.  
- **Enforcement** — Stage config validation: every stage must terminate in a consequence node and produce a Decision Trace entry.  
- **Violation test** — A stage that ends without the learner having reached a conclusion.

---

**P-B2 · Stages accumulate; they never isolate.**

- **Statement** — Stage *n* contains every capability required by stages 1 through *n*−1, plus exactly one new layer.  
- **Rationale** — This is what distinguishes complexity-based sequencing (which works) from skill-based decomposition (which fragments). It is also the mechanism by which integration is practised continuously rather than deferred to a capstone.  
- **Enforcement** — `Stage.live_node_roles` must be a superset of the previous stage's.  
- **Violation test** — Any stage where a learner performs the new layer without performing prior layers.

---

**P-B3 · Complexity rises by task class; support resets at each class boundary.**

- **Statement** — Within a stage, support fades across three steps: watch → complete → solo. On entering the next stage, support returns to maximum. The support curve is a sawtooth, not a ramp.  
- **Rationale** — 4C/ID specifies exactly this: the first task in each class carries substantial guidance which fades to the last. When complexity increases, the learner is a novice again with respect to the new layer; withholding support at that moment produces overload, not challenge.  
- **Enforcement** — `step_in_stage` resets to 1 on stage advance. Not configurable.  
- **Violation test** — A learner entering a new stage at step 2 or 3\.

---

**P-B4 · Advance on demonstrated independence, not on completion.**

- **Statement** — Stage advancement requires two consecutive solo passes at band ≥ MEETS. Finishing a unit is not passing it.  
- **Rationale** — Mastery learning shows d ≈ 0.52 across 108 controlled evaluations, and its effects are larger for weaker learners — which is precisely the population this product exists to serve. Completion-based progression additionally converts progress into a completion-contingent reward, the second most corrosive reward type for intrinsic motivation.  
- **Enforcement** — `Stage.pass_rule` is evaluated server-side; there is no client path to advancement.  
- **Violation test** — Any learner whose `stage_no` incremented without two qualifying `RubricScore` rows.

---

**P-B5 · Mastery consumes weeks, not minutes per week.**

- **Statement** — Weekly ceiling: 30 minutes, 3 sessions. A learner who has not passed a stage this week simply continues next week, with no penalty and no expiring state.  
- **Rationale** — Mastery programmes are documented to increase time on task, which collides with the institutional constraint that instructors abandon tools that crowd out core coursework. Redistributing the additional time across weeks rather than within them also produces spacing, which independently improves retention. The constraint becomes an advantage.  
- **Enforcement** — Session cap enforced server-side. No streak, no expiry, no decay.  
- **Violation test** — Any mechanic that penalises elapsed time.

---

**P-B6 · Require competence across contexts, not repetition within one.**

- **Statement** — The two qualifying passes must occur in cases drawn from different industries.  
- **Rationale** — Direct mitigation of the exercise effect. Passing because you happened to draw a familiar industry is not passing.  
- **Enforcement** — `pass_rule.distinct_industries = 2`, checked against `SmeProfile.industry`.  
- **Violation test** — Any stage advancement where both qualifying attempts share an industry.

---

**P-B7 · Interleave task types; never block them.**

- **Statement** — Beyond four units, the scheduler must not serve three consecutive cases of the same case type.  
- **Rationale** — Blocked practice produces higher performance during acquisition and worse long-term retention. Interleaving feels harder and works better — a desirable difficulty.  
- **Enforcement** — Scheduler constraint on next-unit selection.  
- **Violation test** — Three consecutive units with identical `Case.type`.

---

### Group C — Feedback and Motivation

---

**P-C1 · All feedback points at the task, never at the person.**

- **Statement** — Feedback describes what the work did. It never describes what the learner is.  
- **Rationale** — The feedback meta-analysis (607 effect sizes, 23,663 observations) finds a mean improvement of d ≈ .41 but **more than one third of feedback interventions reduced performance**. The moderator is attentional locus: feedback directing attention to the task helps; feedback directing attention to the self harms. The target population — students already lacking confidence and mentorship — is more exposed to self-level feedback than most.  
- **Enforcement** — Authoring form rejects second-person evaluative constructions in feedback fields.  
- **Violation test** — Any feedback string containing praise, blame, or a trait attribution.

---

**P-C2 · Every feedback unit closes with a forward action.**

- **Statement** — Three lines, in order: business consequence · expert comparison · what to try differently next time. All three are mandatory.  
- **Rationale** — The third line is self-regulation-level feedback, the highest-effect level in Hattie & Timperley's model. It is also the line teams delete first under schedule pressure.  
- **Enforcement** — Publish blocked if any `NodeOption` lacks all three fields.  
- **Violation test** — Null in `feedback_next_time_th`.

---

**P-C3 · Reflection is authored by the learner, never by the model.**

- **Statement** — The end-of-unit sentence "next time I will…" is written by the learner. The model may not draft, complete, or rephrase it.  
- **Rationale** — Three reasons compound. It is articulation in the cognitive-apprenticeship sense, without which the reflection has no learning effect. It is the only System B content that is unambiguously the learner's own, satisfying P-A2. And a trace visibly written by an AI is the exact artefact hiring managers have learned to discount.  
- **Enforcement** — No model call is wired to this field.  
- **Violation test** — Any generation path writing to `reflection_written`.

---

**P-C4 · No reward is contingent on participation or completion.**

- **Statement** — No badges for finishing, no streaks, no confetti, no completion counters.  
- **Rationale** — Across 128 experiments, expected tangible rewards undermine intrinsic motivation: engagement-contingent d \= −.40, **completion-contingent d \= −.36**, performance-contingent d \= −.28. "Finish the case, earn a badge" is completion-contingent — the second most damaging structure, and the one nearly every learning app ships.  
- **Enforcement** — No reward entity exists in the schema.  
- **Violation test** — Introduction of any artefact awarded for an act rather than a demonstrated capability.

---

**P-C5 · Information is the reward.**

- **Statement** — Progress unlocks previously hidden figures about the business, harder branches, and contradictory evidence. It does not unlock decoration.  
- **Rationale** — Sustained curiosity in this domain comes from *"I thought the loss was in materials; the real figure says rent, and now I see why I missed it."* This is intrinsically task-focused and therefore compatible with P-C1 and P-C4 simultaneously.  
- **Enforcement** — Unlockables are limited to case content and stage access.  
- **Decision rule for anything not covered** — If a screen element answers *"what kind of person am I?"*, remove it. If it answers *"what is this work, and what should I do differently?"*, keep it.

---

### Group D — Measurement

---

**P-D1 · Instrument health gates all other measurement.**

- **Statement** — No metric in Rings 1–3 may inform any decision until Ring 0 passes. Ring 0 is checked first, weekly, per dimension.  
- **Rationale** — A measurement system that has not established that its ruler works is producing numbers, not information. This ordering is inverted in most products, which begin with engagement metrics.  
- **Enforcement** — Dashboard renders Rings 1–3 greyed with an explanatory banner while any Ring 0 check is failing.  
- **Violation test** — A decision citing a Ring 1–3 figure recorded during a Ring 0 failure window.

---

**P-D2 · Report bands, not scores.** — See P-A4. Restated here because it is simultaneously a separation constraint and a measurement constraint.

---

**P-D3 · Every band carries its evidence.**

- **Statement** — A band without `evidence_quote` and `anchor_id` is not written. If the scorer cannot produce both, no band is assigned.  
- **Rationale** — Makes the judgement auditable and contestable by the learner, supplies raw material for the Decision Trace, and forces the scoring prompt to ground itself rather than pattern-match.  
- **Enforcement** — `NOT NULL` on both columns.  
- **Violation test** — Schema permits a null.

---

**P-D4 · Engagement metrics have ceilings, not floors.**

- **Statement** — Every Ring 2 metric is specified as a band with an upper bound. Exceeding the ceiling triggers investigation, not celebration.  
- **Rationale** — Performance during learning is a poor proxy for learning. Conditions that produce smooth progress frequently produce worse retention. Completion above 90% is more likely to indicate that units are too easy than that design is good.  
- **Enforcement** — Alerting thresholds configured on both bounds.  
- **Violation test** — Any Ring 2 metric defined as "≥ X" with no upper bound.

---

**P-D5 · No construct claim without cross-context reliability.**

- **Statement** — Dimension-level claims (the Skill Radar) require generalizability coefficient ≥ 0.70 across ≥4 units spanning ≥3 industries. Below that, results are shown per unit with an explicit statement that they do not yet aggregate.  
- **Rationale** — The exercise effect again. Below this threshold the radar plots which cases were drawn, not what the learner can do.  
- **Enforcement** — `AssemblyBlueprint.reportable_when` is evaluated before the radar renders.  
- **Violation test** — Radar rendering with `reportable_when` false.

---

**P-D6 · Declare what is not measured.**

- **Statement** — The results surface states plainly that teamwork and leadership are not assessed in this track, and why.  
- **Rationale** — Claiming coverage you do not have is construct underrepresentation. A single-player system has no team to work in and no one to lead. Overclaiming is the fastest route to losing credibility with a reader who knows the field.  
- **Enforcement** — Static block on the results and trace templates.  
- **Violation test** — Any surface implying full coverage of the six-skill framework.

---

**P-D7 · One north star, ungameable from inside.**

- **Statement** — **Decision Traces read to completion by external readers, per month.**  
- **Rationale** — Moving this number requires five conditions to hold simultaneously: a learner arrives; engages far enough to have something to say; the record is good enough to share; they choose to share it; and a reader with no obligation to us finds it worth finishing. Making units easier produces shallow traces nobody finishes. Adding game mechanics does not touch condition five. It is also honest about the Miller ceiling: the claim is that the record is useful to a decision-maker, not that we predict job performance.  
- **Enforcement** — Single headline metric on the executive dashboard.  
- **Violation test** — Any roadmap decision justified by a Ring 2 metric alone.

---

### Group E — Content Economics

---

**P-E1 · Author once at full depth; derive stages by configuration.**

- **Statement** — A case is authored with all seven node roles regardless of the stage it is written for. Stages are configurations declaring which roles are live and which are pre-filled.  
- **Rationale** — Content is the critical path, not code. This converts one \~22-hour authoring effort into seven playable units at roughly 3.1 hours amortised, and permits shipping stages 1–2 to real classrooms weeks before the scoring pipeline is finished.  
- **Enforcement** — `Case.node_roles` completeness is a publish gate.  
- **Violation test** — A published case with fewer than seven authored roles.

---

**P-E2 · Internal consistency is a build-blocking test.**

- **Statement** — Every case ships with a calculation sheet. Revenue \= price × quantity; profit \= revenue − total cost; shares sum to 100%. Failure blocks publish. **This applies equally to examples appearing in design documents.**  
- **Rationale** — Figures that do not reconcile are the fastest way to lose a numerate learner, and this product's audience is selected for numeracy. The clause about design documents exists because exactly this error occurred in an earlier draft of the flagship example.  
- **Enforcement** — CI test over the calculation sheet.  
- **Violation test** — Any published figure not derivable from the sheet.

---

**P-E3 · Constrain the response space before improving the model.**

- **Statement** — Decisions are closed enumerations. Free text is bounded at 200 characters and supplements the score; it never determines it.  
- **Rationale** — Two constraints are satisfied by one mechanism. Closed enumerations are scored with perfect reliability and require no model call, which raises measurement quality without waiting for better models. They also eliminate the prompt-injection surface that free-text profile fields would otherwise open.  
- **Enforcement** — `DecisionNode.ask_type` admits no free-form variant.  
- **Violation test** — Any user-authored string reaching a system prompt.

---

### Group F — Legal and Ethical

---

**P-F1 · Age determines the consent path; ask for it directly.**

- **Statement** — Collect birth year explicitly. Under Thai law majority is reached at 20, so most first- and second-year undergraduates are minors — a primary segment, not an edge case. Under PDPA §20, minors over 10 require consent from both the minor and the guardian; minors of 10 or under require guardian consent only.  
- **Rationale** — Inferring age from year of study fails precisely at the legal boundary, since "year 1–2" straddles it.  
- **Enforcement** — `LearnerState.is_minor` computed from `birth_year`; consent path branches on it before any non-essential collection.  
- **Violation test** — Any data collection preceding consent resolution for a learner under 20\.  
- **Note** — Where the institution introduces the learner, the lawful basis may be contract or legitimate interest rather than consent, which is materially simpler to operate. 🔖 Requires confirmation by PDPA counsel before the first real user.

---

**P-F2 · Sharing is a separate, revocable act.**

- **Statement** — Trace share tokens expire by default for minors. Public exposure requires its own consent event, distinct from the consent to collect.  
- **Rationale** — Publishing a trace is disclosure to third parties, a different processing activity from recording it.  
- **Enforcement** — `share_token` carries an expiry; public flag requires a separate consent row.  
- **Violation test** — A non-expiring public token on a minor's record.

---

**P-F3 · Declare the ceiling of the claim.**

- **Statement** — Every Decision Trace carries, at the head, a plain statement of what it does and does not establish.

>   
> *"This record does not state that this person performs well at work. It states that when presented with these situations, they reasoned in these ways, decided these things, and adapted in these ways. Read it and judge for yourself."*  
> 

- **Rationale** — Miller's pyramid caps simulation at "shows how." Certificates implicitly claim "does" without evidence of "does," which is the wall that digital badges and prior job-simulation products failed at. Declaring the ceiling converts the limitation into a defensible position that cannot later be exposed as overclaim.  
- **Enforcement** — Static header on the trace template, not in terms of service.  
- **Violation test** — Any external-facing copy implying prediction of job performance.

---

## 4\. Stage Architecture

Seven task classes. Each is a complete case; each adds exactly one layer of complexity; each contains all prior layers.

| \# | Stage | Live nodes | Time | New layer | Data mode |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | **Structure it** | choose frame → compute | \~3 min | Mutually exclusive, collectively exhaustive decomposition | complete |
| 2 | **Locate the problem** | \+ diagnose | \~6 min | Diagnosis from complete data | complete |
| 3 | **Information isn't free** | \+ request 3 of 8 under an owner-time budget | \~9 min | Prioritisation under resource constraint | budgeted |
| 4 | **The numbers disagree with the owner** | \+ reconcile contradictory evidence | \~12 min | Belief revision under new evidence | budgeted \+ conflict |
| 5 | **Own your estimate** | \+ recommend with quantified impact | \~15 min | Committing to a number | budgeted \+ conflict |
| 6 | **Thirty seconds with the owner** | \+ order three sentences | \~17 min | Communicating upward to a non-analyst | budgeted \+ conflict |
| 7 | **Live** | all, no options offered, AI pushes back | \~20–25 min | Performance without scaffolding | budgeted \+ conflict |

**Sequencing is forced, not preferred.** You cannot request data intelligently (3) without knowing which cell of the structure it fills (1). You cannot revise a belief (4) without having formed a hypothesis (2). You cannot brief an owner (6) without a quantified recommendation to brief (5).

**Sawtooth within each stage**

| Step | Learner sees | Learner does | ICAP mode | Scored |
| :---- | :---- | :---- | :---- | :---- |
| 1 · watch | Fully worked case with reasoning exposed | 2 comprehension checks | Passive → Active | No |
| 2 · complete | Prior-layer nodes pre-filled | The new layer only | Active | Diagnostic only |
| 3 · solo | Nothing pre-filled; hints available and logged | All stage nodes | Constructive | Yes |

**Acknowledged ceiling** — ICAP's highest mode, Interactive, requires a partner who co-constructs knowledge. A scripted persona does not qualify. Stage 7 reaches Constructive, not Interactive. Crossing that ceiling requires two learners debating one case, which belongs to the soft-skill track, not to v1. Stating this openly is a P-F3 obligation.

---

## 5\. Measurement by Stage

This section answers: *at each step of learning, what is measured, how, to what standard, and what is permitted to leave.*

### 5.1 Per-stage specification

| Stage | Primary construct | Observable evidence | Scoring method | Gate criterion | Exportable to Trace |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **1** | Structural decomposition | Frame chosen; branch order; arithmetic chain | **Rule only** — no model call | 2 consecutive solo, band ≥ MEETS, ≥2 industries | "Selected a decomposition that reached the answer in *n* steps; expert path was *m*." |
| **2** | Diagnostic reasoning | Driver identified; ≤200-char justification | Rule \+ AI band (justification) | Same | "Identified the loss driver correctly in *k* of *n* units." |
| **3** | **Judgement under constraint** | Which 3 of 8 items requested; order; residual budget | **Rule only** | Same | "Requested an average of *x* of 3 available items; selected *y* first in *k* of *n* units." |
| **4** | **Adaptability** | Answer before vs after contradictory evidence; direction of change | **Rule** (delta) \+ AI band (justification) | Same | "Revised the conclusion *k* times after contradicting evidence; *j* of those revisions moved toward the expert answer." |
| **5** | Quantified commitment | Impact figure entered vs defensible range | **Rule only** | Same | "Attached a numeric impact estimate to every recommendation; *k* of *n* fell within the defensible range." |
| **6** | **Communication** | Ordering of three sentences; conclusion-first or not | **Rule only** | Same | "Led with the conclusion in *k* of *n* briefings." |
| **7** | Integrated performance | Full transcript; AI challenges and responses | AI band, full weight, all dimensions | Terminal | Full narrative trace |

**Design consequence worth naming.** Four of seven stages are scored by rule alone. Model-based scoring is required only at stages 2, 4 and 7\. This means **stages 1, 3, 5 and 6 can ship, be measured, and be trusted before the scoring pipeline exists** — and their measurement reliability is not contingent on Ring 0 at all. It also means the two constructs the product most wants to claim — judgement (stage 3\) and communication (stage 6\) — are the two measured with perfect scoring reliability.

### 5.2 What each stage contributes to reliability

The staged structure is not only cheaper. It measures better.

|  | Single 6-node case | Stage system |
| :---- | :---- | :---- |
| Measurements of Judgement per learner | 1 per full case | 2–4, in a context built to elicit it |
| Cross-industry breadth | Requires 4 full cases (\~60 min) | Enforced by the gate rule (\~18–36 min) |
| Noise from co-occurring nodes | High — measured alongside 5 other decisions | Low — early stages hold few variables |
| Probability of reaching g ≥ 0.70 | Low | Plausible |

P-D5 sets g ≥ 0.70 as the precondition for any dimension-level claim. Under the single-case design that threshold was unlikely ever to be met. Under the stage system it is reachable, which is what makes the Skill Radar potentially legitimate rather than decorative.

### 5.3 Stage-derived metrics

| Metric | Definition | Interpretation | Ring |
| :---- | :---- | :---- | :---- |
| **Stage Reached** | Highest stage passed (1–7) | Replaces scaffold level; legible to learners and instructors | 1 |
| **Attempts per Stage** | Units consumed before passing each stage | Identifies the true curricular bottleneck for a cohort | 1 |
| **Stage 3 Pass Rate** | Share of cohort passing "Information isn't free" | Most interpretable proxy for judgement | 1 |
| **Sawtooth Slope** | Time delta between step 1 and step 3 within a stage | Flat ⇒ support isn't supporting. Very steep ⇒ the complexity jump is too large | 0/1 |
| **Cross-Industry Consistency** | Band variance for one dimension across industries | Direct read on exercise effect for that learner | 0 |

⚠️ **Stage Reached must not leave System A as a credential.** Mastery-learning gains are documented to be larger on instructor-constructed assessments than on external standardised ones — a portion of any gain is gain *on our instrument*. The Trace may state "completed units containing contradictory evidence three times across three industries," which is a countable fact. It may not state "passed stage 4 of 7," which reads as a qualification.

### 5.4 Cross-cutting learning metrics

Measured continuously, not per stage.

| Metric | Definition | Target 🔖 | Failure signature |
| :---- | :---- | :---- | :---- |
| **Reflection Follow-Through** | Share of stated intentions that are enacted in the next unit | ≥ 40% | The single hardest metric in the system to fake — requires two events separated in time, cannot be produced by a model, and measures the thing employers actually want: does this person change behaviour after feedback |
| **Near-Transfer Score** | Score on a variant (new industry, same structure) ÷ score on the parent case | ≥ 80% | Rising completion with flat transfer ⇒ memorisation |
| **Hint Dependency** | Hints per unit over time | −30% from unit 1 to 5 | Rising bands with flat hints ⇒ the hints are the score |
| **AI-Skepticism Rate** | Share of planted incorrect hints detected | ≥30% early, ≥55% after unit 5 | Cohort-level only until ≥5 traps accumulate; single-item reliability is too low for individual reporting |
| **Drill Automaticity** | Mean time per item in part-task drills | Declining | Faster with lower accuracy ⇒ guessing, not fluency |

**Far transfer is not measured and cannot presently be claimed.** The only route is following learners into real CWIE placements and correlating in-system results with employer evaluations. That is a genuine criterion-validity study, deferred to phase 3, and it is the only evidence that establishes Kirkpatrick level 3\.

---

## 6\. Measurement Rings

Ring 0 · INSTRUMENT HEALTH        gates everything outside it

Ring 1 · LEARNING                 is capability increasing

Ring 2 · PRODUCT                  is it being used (ceilings, not floors)

Ring 3 · EXTERNAL OUTCOME         does it matter outside  ──► NORTH STAR

### Ring 0 — Instrument health

| Check | Threshold | Action on failure |
| :---- | :---- | :---- |
| QWK, human vs human | ≥ 0.60 | **Fix the rubric anchors, not the prompt.** Low human agreement means the criteria are underspecified |
| QWK, machine vs human | ≥ 0.70 **and** ≥ (human–human − 0.10) | Suppress bands for that dimension only |
| Generalizability coefficient | ≥ 0.70 across ≥4 units, ≥3 industries | Suppress the radar; show per-unit results |
| Case identity test | 100% pass | Block publish |
| Assembly coverage | `reportable_when` true | Results page states how many more units are required |

Sampling: 10% of AI-assigned bands weekly, double-scored blind, reported per dimension against `scoring_prompt_version`. Any prompt change invalidates the current calibration.

### Ring 1 — Learning

Stage-derived metrics (§5.3) plus cross-cutting metrics (§5.4).

### Ring 2 — Product

| Metric | Band | Ceiling rationale |
| :---- | :---- | :---- |
| Time to first feedback | p50 ≤ 60 s | — |
| Activation (first micro-unit completed in session 1\) | ≥ 55% | — |
| Unit completion | **60–80%** | \>90% signals units are too easy — check near-transfer immediately |
| D7 return, split by cohort code | with code ≥60% · **without code ≥20%** | Direct test of the institution-led hypothesis |
| Node drop-off | no node \>15% | — |
| Weekly time in system | **15–30 min** | \>45 min crowds out core coursework; instructors stop renewing |

⚠️ Ring 2 is Kirkpatrick level 1\. Meta-analytic correlation between affective reaction and immediate learning is approximately **r \= .02 to .08**. These numbers say whether the product is used. They say almost nothing about whether it works. They may not be used to argue product value.

### Ring 3 — External outcome

| Metric | Target 🔖 |
| :---- | :---- |
| Trace read-through by external readers | ≥ 50% |
| HR usefulness (of 5 HR readers, how many say it informs a decision) | ≥ 3 of 5 |
| Seat activation (purchased seats with ≥1 completed unit) | ≥ 70% |
| Instructor renewal into the following term | ≥ 60% |
| CWIE concordance (in-system results vs employer evaluation) — phase 3 | set after first dataset |

**North star — traces read to completion by external readers, per month.**

---

## 7\. Data Architecture

SmeProfile        sector · size · industry · revenue · headcount

                  data\_availability (derived from size — micro firms have no

                  ledgers; writing a micro case with three years of monthly

                  P\&L is a case that a reader who has worked with SMEs will

                  reject on sight)

                  characters\[\] with Thai seniority titles

Case              type · sme\_profile\_id · difficulty

                  node\_roles\[\]        ← all 7, always (P-E1)

                  conflict\_payload    ← used from stage 4

                  structure\_taught    ← keys variant/transfer pairing

                  parent\_case\_id · calc\_sheet\_url · qa\_passed\_at

Stage             no(1..7) · live\_node\_roles\[\] · prefilled\_node\_roles\[\]

                  data\_mode · has\_conflict · options\_shown · ai\_pushback

                  pass\_rule { consecutive: 2, min\_band: MEETS,

                              distinct\_industries: 2 }

DecisionNode      role · context\_th(≤80 words) · data\_card\[\](≤4 figures)

                  ask\_type(closed enums only) · justification\_limit(200)

                  is\_ai\_trap · rubric\_dimensions\[\]

NodeOption        label · is\_expert\_choice

                  state\_delta { owner\_time, trust, data\_quality }

                  feedback\_business · feedback\_expert · feedback\_next\_time

                                       ↑ all three NOT NULL (P-C2)

Attempt           learner\_id · case\_id · mode(practice|assessment)

                  stage\_no · step\_in\_stage(1|2|3)

AttemptEvent      the single source for every Ring 1–3 metric

                  19 event types (§7.1)

RubricScore       dimension · band(BELOW|MEETS|EXCEEDS)

                  evidence\_quote NOT NULL · anchor\_id NOT NULL   (P-D3)

                  scorer(rule|ai|human) · scoring\_prompt\_version

AssemblyBlueprint min\_cases\_per\_dimension · min\_industries

                  required\_dimension\_coverage\[\] · min\_generalizability

                  reportable\_when(expr)        ← the enforcement point for P-D5

DecisionTrace     entries\[\] { situation, chose, reasoning, feedback,

                              changed\_next\_time }

                  share\_token(expiring for minors) · read\_complete\_count

LearnerState      stage\_no · step\_in\_stage · per\_dimension\_band\_history\[\]

                  hints\_trend\[\] · near\_transfer\_scores\[\] · cohort\_id

                  birth\_year · is\_minor · consent\_self\_at · consent\_guardian\_at

### 7.1 Event vocabulary

landing · session\_start · onboarding\_completed

case\_started · node\_shown · option\_selected · justification\_submitted

hint\_requested · ai\_trap\_flagged · feedback\_shown · answer\_revised

reflection\_written · reflection\_shown

drill\_completed

node\_abandoned · case\_completed

trace\_exported · trace\_viewed · trace\_read\_complete      ← north star

Every event carries `learner_id · cohort_id · attempt_id · mode · stage_no · step_in_stage · ts`.

**`cohort_id` and `mode` are unrecoverable if omitted at launch.** Without them the institution hypothesis cannot be tested and practice cannot be separated from assessment — retroactively, for an entire term.

---

## 8\. Enforcement Matrix

Where each principle is made structurally difficult to violate.

| Layer | Principles enforced here |
| :---- | :---- |
| **Schema constraints** | P-A4 (no aggregate field) · P-C4 (no reward entity) · P-D3 (NOT NULL on evidence) · P-F2 (token expiry) |
| **Publish gate / CI** | P-C2 (three feedback lines) · P-E1 (seven roles) · P-E2 (identity test) · Scale-1 word and character limits |
| **Service boundary** | P-A1 (System B has no read access to scores) · P-A2 (two admissible source types) · P-C3 (no model path to reflection) |
| **Server-side rules** | P-B3 (step reset) · P-B4 (gate evaluation) · P-B5 (session cap) · P-B6 (industry distinctness) · P-B7 (interleaving) |
| **Render-time predicate** | P-D5 (`reportable_when`) · P-D1 (rings greyed on Ring 0 failure) |
| **Template-only generation** | P-A3 (numeric-slot templates) · P-D6 (static non-coverage block) · P-F3 (static ceiling header) |
| **Review checklist (not automatable)** | P-B1 (whole task) · P-B2 (accumulation) · P-C1 (attentional locus) · P-C5 (reward is information) |

The bottom row is the risk surface. Four principles depend on human review because no mechanical test exists for them. They should be the standing agenda of design review.

---

## 9\. Evidence Base

| Architectural decision | Source |
| :---- | :---- |
| Separate internal engine from external record | Assessment-centre variance decomposition: person × exercise ≈ 21.8% vs dimension ≈ 4.0% · Messick, consequential validity |
| Bands, not scores | LLM rubric scoring: high correlation, \~55% exact agreement, prompt-sensitive · AES standard QWK ≥ 0.70, machine–human within 0.10 of human–human |
| Task classes, simple to complex | van Merriënboer & Kirschner, 4C/ID |
| Sawtooth support within each class | 4C/ID: first task in a class carries substantial support, fading to the last |
| Advance on independence | 4C/ID advancement rule · Kulik, Kulik & Bangert-Drowns (1990): 108 evaluations, **d ≈ 0.52, larger effects for weaker learners** |
| Whole tasks, never fragments | 4C/ID whole-task principle; explicit warning on compartmentalisation |
| Ladder of engagement modes | Chi & Wylie (2014), ICAP: I \> C \> A \> P, \~8–10% per mode, 225-study meta-analysis |
| Six methods of guided practice | Collins, Brown & Newman (1989), cognitive apprenticeship |
| Part-task drills | 4C/ID fourth component |
| Reflection screens | Hattie & Timperley (2007): self-regulation level highest effect |
| Feedback at the task, not the person | Kluger & DeNisi (1996): 607 effect sizes, 23,663 observations, d ≈ .41 mean, **\>1/3 negative** |
| No completion rewards | Deci, Koestner & Ryan (1999): 128 experiments; engagement −.40, completion −.36, performance −.28 |
| Ceilings on engagement metrics | Bjork, desirable difficulties |
| Interleaving over blocking | Interleaving effect |
| Weekly retrieval of prior nodes | Retrieval practice · spacing effect |
| Ring 2 cannot argue product value | Alliger et al. (1997): r(reaction, learning) ≈ .02–.08 |
| Assembly model requirement | Mislevy, evidence-centred design (CRESST 800\) |
| Declare the ceiling | Miller (1990): simulation establishes "shows how," not "does" |
| Restraint in validity claims | SJT criterion validity r ≈ .26, incremental ΔR ≈ .03–.08 · Sackett et al. (2022, 2023): historical range-restriction corrections systematically overstated validity · Macnamara et al. (2014): deliberate practice explains \~4% of variance in education, \<1% in professions |
| Consent path by age | Thai Civil and Commercial Code §19–24 (majority at 20\) · PDPA §20 |
| Case mix by firm size | Ministerial Regulation on SME characteristics B.E. 2562 · OSMEP: micro firms ≈84% of Thai SMEs |

---

## 10\. Open Quantities

Marked 🔖 throughout. None may be used externally until measured.

| Quantity | Current status | How it gets resolved |
| :---- | :---- | :---- |
| \~22 h per full case; \~3.1 h per playable unit | Structural estimate | **Author one full case and time it. Before any code.** The entire content plan rests on this |
| Every Ring 1–3 threshold | Reasoned defaults, not benchmarks | Reset from the first real classroom cohort |
| 15/60/25 split; 150 s per node | Founder's original hypothesis, now merely enforceable | Node drop-off distribution decides |
| `pass_rule` \= 2 consecutive | Reasoned default | Tune from Attempts-per-Stage across a real cohort |
| Per-stage durations (3–25 min) | Estimates | Measure directly |
| 200-character justification limit | Untested for articulation sufficiency | A/B against 400 in phase 1 |
| Traps required for individual AI-skepticism reporting | Assumed ≥5 | Compute reliability once 5 traps accumulate |
| Lawful basis under institution-led onboarding | Unconfirmed | PDPA counsel, before the first real user |
| Inherited figures — TDRI 221,000 postings / 22% entry-level; CWIE 92,219 students / 13,858 employers / 97 institutions; OSMEP 3,255,957 enterprises | Secondary sources only | Open the primary reports before any external use |

---

*Trust Gate G1 — internal. Use with real students or release to any external party requires G3, which the founder authorises. Every 🔖 item requires a verified source before leaving the building.*  
