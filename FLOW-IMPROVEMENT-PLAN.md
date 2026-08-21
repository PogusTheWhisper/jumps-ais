# THAItern — Flow Improvement Plan

**Source of truth:** the SMEs brief (user journey) + `THAItern-Learning-Architecture-EN.md` + voice-memo requirements.
**Goal:** grow the current 5-page demo into the full journey the brief describes, precisely following every stage and step.
**Legend:** 🟠 = redesign existing · 🟢 = build new · 🤖 = AI touchpoint · ⚠️ = legal/safety gate · 🆘 = open item needing a decision (the brief's `***HELP***`).

---

## 1. Current state vs. brief

| Brief stage | Exists today? | Route today |
|---|---|---|
| Personal Info intake | ❌ none | — |
| Category scoping (SME type) | ❌ none | — |
| Suggest SMEs by preference | 🟠 partial (static `/select` grid, no scoping) | `/select` |
| Learning (textbook + quiz + session) | 🟠 partial (`/learn` tabs, no quiz, no AI) | `/learn` |
| Case booklet release (password + 14-day) | ❌ none | — |
| Mentoring (SME 1× + Mentor 1×) | ❌ none | — |
| Answering (Gform + slides + pitch vid) | ❌ none | — |
| Judges checking (AI pre-check + SME feedback + interview) | 🟠 partial (`/decision` is a single node only) | `/decision` |
| Certificate | ❌ none | — |
| Decision Trace record | ✅ exists (keep) | `/trace/[id]` |

**Takeaway:** the demo covers "select → 1 decision → trace." The brief is an 8-stage program. ~70% is new build. The 4-dot `Steps` component must grow to the full stage set.

---

## 2. Target journey (precise map of every brief step)

### Stage 0 — Personal Info intake 🟢
New multi-step form. One question per screen (Duolingo cadence). Objective: collect data + funnel user to what they aim for.

1. **Team size** — `individual / duo / group (max 4)`. → sets how many verifications are required.
2. **Student card verification** ⚠️🤖 — upload student card; **all members** must verify (duo = 2, group = up to 4). Objective: protect confidential SME/ชุมชน data.
   - 🤖 AI: OCR + card-authenticity check on the uploaded card (name/uni/validity). Human review fallback.
   - ⚠️ PDPA: majority age in Thailand = 20. Compute `is_minor` from birth year; branch consent path before storing card image. Store minimal fields, not raw image long-term.
3. **Demographics** — age, university, major, "why join." (age also feeds `is_minor`.)
4. **Track choice** — `SME` or `ชุมชน` (Community).
5. **SME category scoping** (only if SME) — nested pick, objective = scope the main problem:
   - Q1 top level: `Food & Beverage` / `Non-Food Products` / `Non-Food Services`
   - Q2 sub-category, branched on Q1:
     - Food & Beverage → Processed Food & Snacks · Beverages & Ingredients · F&B Outlets & Catering
     - Non-Food Products → Fashion & Lifestyle · Beauty & Personal Care · Industrial & Construction Goods
     - Non-Food Services → Wellness & Lifestyle · Tourism & Hospitality · Maintenance & Repair · Professional Services
   - Q3 confirmation screen: "Got it — you prefer …" (echo back).

> Architecture note: keep `DecisionNode.ask_type` closed-enum (P-E3). All of the above are enumerated choices — no free text into a system prompt. "Why join" free text is stored only, never fed to a model prompt.

### Stage 1 — Suggest SMEs 🟠🤖
Redesign `/select`. Show a shortlist matched to the scoped preference.
- Header copy: "Congratulations! All of these SMEs match your style and are waiting for you to help!"
- Each card: **logo + description only** — problem stays hidden (matches current "ยังไม่บอกปัญหา").
- 🤖 AI: rank/match SMEs to the Stage-0 category + demographics.
- User picks **exactly 1** SME to help.

### Stage 2 — Learning in-progress 🟠🤖⚠️
Redesign `/learn`. Three components, all gated before case access.
- (a) **Business-school textbook** 🤖 — AI-generated lessons.
- (b) **Quiz** 🤖🆘 — new; quizzes on the lesson content. `🆘 needs นอง2` to build the AI textbook + quiz generator.
- (c) **Special Session** — recorded/live video from **real humans, not AI**. ⚠️ Facebook/Meta legal constraints apply to sourcing this video.
- ⚠️ **Copyright rules for the AI textbook/quiz** (must be enforced in the content pipeline, not the UI):
  - Books: copyright protects *expression*, not *idea/theory*. Usable = academic theory, formulas, statistics, facts. **Not usable** = author's phrasing, their problem sets, their TOC/chapter ordering. → AI must **extract only the core theory/formula and fully re-author** prose + quiz items in the AI's own words.
  - YouTube clips: usable = the *process/method/steps* (a "process/method/system" per Copyright Act §6 ¶2, unprotected). **Not usable** = the narration script, graphics, slides, on-screen illustrations. → AI takes the concept/business-model core and **re-writes explanation + redraws graphics** from scratch.
  - Articles/news/public data: per Copyright Act §7, daily news, plain facts, constitution, laws/regulations/announcements, court judgments and official reports are **not** copyrighted. But analytical columns, opinion pieces, deep research **are**. → AI may summarize raw data / statistics / legal text directly; for opinion articles it may pull **only raw data** and re-write.
- Scoring alignment (from architecture): Stages 1,3,5,6 rule-based; Stages 2,4 rule + AI band on justification; Stage 7 full AI band. Reuse this — do not invent a score field (P-A4). Bands only.

### Stage 3 — Case booklet release 🟢⚠️🤖
New. Reveals the actual SME problem — the crack-the-case content.
- Content built from SME's **100% consent**; a contract with the SME covers the legal side.
- **Access = password gate**: we issue a password (UX modeled on "checking a Chula letter grade"). User enters it to unlock the booklet.
- ⚠️ **14-day rule**: once the user requests/receives the password, they must submit within **14 days** (countdown starts on password-issue day). Show a live countdown; lock on expiry.
- 🤖🆘 AI for safety / reminders? Email reminders as deadline nears. `🆘 decide: what the AI-safety layer here actually does.`

### Stage 4 — Mentoring 🟢
New. Guidance sessions.
- **With the SME** — 1 time.
- **With a Special Mentor (influencer)** — 1 time.
- Booking/scheduling UI + session record. No scores written from these (evidence/events only, per System B).

### Stage 5 — Answering / submission 🟢
New. User produces deliverables:
- **Google Form** — questions specific to the chosen SME.
- **Slides**.
- **Pitch video**.
- Upload/link collection screen with a per-item checklist.

### Stage 6 — Judges checking 🟠🤖🆘
Redesign/extend `/decision` into the review stage.
- 🤖 **AI pre-check** (before submitting to SME): "check your work before you send it." `🆘 AI trained on the business-school textbook` — same content pipeline as Stage 2.
- **SME feedback** 🆘 — SME must give feedback **regardless of like/dislike**. `🆘 decide channel: SME gives it directly, or a facilitator relays.`
- **Private interview** (offer) — user can have a private talk with the SME to explain what they did (interview-style). Optional, offered not forced.
- Keep the existing Trace record (`/trace/[id]`) as the immutable output. System B stays read-isolated from bands (P-A1). Reflection stays learner-authored (P-C3).

### Stage 7 — Certificate 🟢🤖
New. 🤖 AI auto-generates the certificate on program completion. Gate on completion criteria (architecture: 2 consecutive solo passes at band ≥ MEETS across ≥2 industries) — confirm whether the brief's cert requires that bar or just program completion. `🆘 confirm gate.`

---

## 3. Proposed route architecture

```
/                     🟠 landing (keep, add "start" → intake)
/intake               🟢 Stage 0 — multi-step form (team, verify, demо, track, category)
/select               🟠 Stage 1 — suggested SMEs, pick 1
/learn                🟠 Stage 2 — textbook + quiz + special session (gate)
/case                 🟢 Stage 3 — password unlock + 14-day countdown + booklet
/mentoring            🟢 Stage 4 — SME + special mentor booking/records
/submit               🟢 Stage 5 — Gform + slides + pitch upload
/review               🟠 Stage 6 — AI pre-check + SME feedback + interview offer
/trace/[id]           ✅ keep — immutable decision record
/certificate/[id]     🟢 Stage 7 — AI-generated cert
```

`Steps.tsx` 🟠 — expand from 4 dots to the full stage set (or a compact "Stage n of N" bar to avoid clutter on mobile).

---

## 4. Data model additions (sketch — align to architecture entities)

- `Applicant` / `TeamMember` — team size, per-member verification status, `is_minor`, consent path.
- `Preference` — track + category enums from Stage 0.
- `QuizAttempt` 🤖 — quiz items + result (rule-based band, no aggregate score — P-A4).
- `CaseAccess` — `password_hash`, `issued_at`, `expires_at = issued_at + 14d`, `unlocked_at`, `submitted_at`.
- `MentorSession` — type (`sme` | `special`), status, scheduled_at.
- `Submission` — gform_url, slides_url, pitch_video_url.
- `Review` — ai_precheck result, sme_feedback (required), interview_offered/held.
- `Certificate` — generated_at, artifact_url.
- Keep `cohort_id` + `mode` on **every** event (unrecoverable if omitted at launch).

Do not add: aggregate score (P-A4), reward/badge/streak entity (P-C4), any model write to `reflection_written` (P-C3). `evidence_quote` + `anchor_id` stay NOT NULL on RubricScore (P-D3).

---

## 5. AI touchpoints summary (the brief's "Pls add more AI")

| Stage | AI job | Status |
|---|---|---|
| 0 verify | OCR + student-card authenticity check | 🟢 new |
| 1 suggest | Match/rank SMEs to scoped preference + demographics | 🟢 new |
| 2 textbook | Copyright-safe extract-and-re-author lessons | 🆘 นอง2 |
| 2 quiz | Generate quiz items from re-authored theory | 🆘 นอง2 |
| 3 case | Deadline safety / email reminders | 🆘 define |
| 6 pre-check | Grade-your-own-work vs textbook before SME submit | 🆘 define/train |
| 7 cert | Auto-generate certificate | 🟢 new |

All model-facing text uses closed enums where it drives progression (P-E3). AI scoring only activates when Ring 0 (instrument health) passes for that dimension.

---

## 6. Legal & safety gates (must resolve before real users)

1. ⚠️ **Copyright pipeline** — the extract-and-re-author rules in Stage 2 are a content-generation contract, not UI. Build them into the textbook/quiz generator and document provenance.
2. ⚠️ **Special Session video** — Facebook/Meta sourcing constraints; must be real-human video, licensed/consented.
3. ⚠️ **SME consent + contract** — case booklet requires 100% SME consent and a signed contract (law part).
4. ⚠️ **PDPA** — student-card image = sensitive personal data; minors (under 20) need the consent branch first. Counsel review before first real user (open item in architecture doc).
5. ⚠️ **14-day enforcement** — server-side expiry, not client countdown alone.

---

## 7. Build sequencing (phases)

**Phase 1 — Skeleton & spine (no AI).**
`/intake` multi-step form (enums + team + verify placeholder) → redesigned `/select` scoping → expand `Steps`. Wire routing spine end-to-end with stub screens for `/case /mentoring /submit /review /certificate`. Verify: a user can click through all 8 stages with mock data.

**Phase 2 — Gates & records.**
Case password + server-side 14-day expiry, submission uploads, mentoring booking records, data model persisted. Verify: expiry locks correctly; all events carry `cohort_id` + `mode`.

**Phase 3 — AI layers.**
Student-card verify, SME matching, textbook+quiz generator (🆘 นอง2, copyright pipeline), AI pre-check, cert generation. Verify: Ring 0 health check gates each AI dimension; no band leaks to System B.

**Phase 4 — Polish.**
Feedback loops (SME feedback required, interview offer), email reminders, accessibility (`prefers-reduced-motion`), Noto Sans Thai, design-system compliance (`design-system/thaitern/MASTER.md`).

---

## 8. Open items to decide before building (🆘 / 🔖)

- 🆘 นอง2 ownership of the AI textbook + quiz engine — scope, timeline, model.
- 🆘 Case-stage "AI for safety" — exact function (reminders only? fraud check? plagiarism?).
- 🆘 SME feedback channel — direct vs facilitator-relayed; required-feedback enforcement.
- 🆘 AI pre-check training source + rubric mapping to bands.
- 🆘 Certificate gate — program-complete vs the architecture's 2-consecutive-solo-≥MEETS bar.
- 🔖 Community (ชุมชน) track parity — brief only detailed the SME category tree; Community scoping (by district/province) is in voice memos but not the architecture doc. Resolve the gap.
- 🔖 Authoring time (~22h/case) — time one real case before planning content volume.
```
