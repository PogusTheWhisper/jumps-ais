# THAItern

**AI-powered work-simulation learning system for Thai university students**

Submitted to **AIS Jump Thailand 2026**. Students select a real SME or local community, study the case through AI-curated content, then make business decisions that are logged as a verifiable Decision Trace — not a score.

🌐 **Live demo**: [thaitern-jump.vercel.app](https://thaitern-jump.vercel.app)

---

## What it does

| Step | Action |
|------|--------|
| 1. Select | Pick an SME (shop, cafe, etc.) or a community |
| 2. Learn | 3-module curriculum: Textbook · Cases · Special Session |
| 3. Decide | Choose a strategic option and write a justification |
| 4. Trace | Get a shareable Decision Trace — evidence only, no score |

Two tracks:
- **SME Track** — help a small Thai business diagnose a real problem
- **Community Track** — support a local community in a province/district

---

## Architecture

```
THAItern
├── poc/              Single-file HTML prototype (Playwright-verified)
├── web/              Next.js 15 app (Turbopack + TypeScript + Tailwind v4)
│   ├── src/app/      App Router pages (/, /select, /learn, /decision, /trace/[id])
│   ├── src/lib/      data.ts · db.ts (Vercel Postgres + in-memory fallback)
│   └── src/components/  Topbar · Steps
├── design-system/    thaitern/MASTER.md — design tokens & style guide
├── voice_requirement/ Recorded product requirements (Thai) + ASR transcripts
└── THAItern-Learning-Architecture-EN.md  Canonical architecture spec v1.2
```

### Core constraints

| ID | Rule |
|----|------|
| P-A1 | System B has no read access to scores or learner state |
| P-A4 | No aggregate score — bands only (BELOW / MEETS / EXCEEDS) |
| P-C3 | No model writes to `reflection_written` — learner authors it |
| P-C4 | No reward entities (no badges, streaks, counters) |
| P-D3 | `evidence_quote` and `anchor_id` are NOT NULL on RubricScore |
| P-E3 | `DecisionNode.ask_type` admits closed enumerations only |

---

## Tech stack

- **Frontend**: Next.js 15 (App Router, Turbopack) · TypeScript · Tailwind CSS v4
- **Backend**: Next.js API Routes · Vercel Postgres (Neon)
- **Design**: Duolingo × Bauhaus × AIS Jump Green (`#73C23A`)
- **Font**: Noto Sans Thai

---

## Local development

```bash
cd web
pnpm install        # or npm install
pnpm dev            # http://localhost:3000
```

No database required — the app runs with an in-memory fallback when `POSTGRES_URL` is not set.

To enable persistence, set `POSTGRES_URL` in `web/.env.local`:

```
POSTGRES_URL=postgres://...
```

---

## Deployment

Deployed on Vercel. The `web/` directory is the project root.

```bash
cd web
vercel --prod
```

---

## Design system

See [`design-system/thaitern/MASTER.md`](design-system/thaitern/MASTER.md) for color tokens, typography, spacing, and component specs. Page-specific overrides live in `design-system/thaitern/pages/`.

---

## Thai legal note

Thai majority age is **20** (not 18). Most year 1–2 undergraduates are minors under PDPA §20. `LearnerState.is_minor` is computed from `birth_year`; consent branching is required before any non-essential data collection.

---

## License

MIT — see [LICENSE](LICENSE)
