# Stock Pick Check

Retail-friendly stock-picking subscription MVP built with Next.js, Tailwind CSS, mock stock data, deterministic scoring, agentic personalization, and demo-ready dashboards.

## Decision Being Improved

Which stock should a retail investor review today, based on risk appetite, strategy preference, connected portfolio context, sector rotation, growth, earnings momentum, valuation, and risk?

## Architecture

Browser UI -> Next.js app/API routes -> mock SQL-ready data -> deterministic scoring rules -> personalization layer -> agentic rationale -> ranked recommendations -> portfolio connection -> learning events -> dashboard/performance views -> governed model updates.

## MVP Includes

- Landing page with trial/pricing CTA
- Outcome-led onboarding that presents a personalized top stock pick, measures risk appetite, and drives trial activation
- Dashboard with top picks and rotation alerts
- Agentic personalization layer that adapts top stock picks from risk appetite, strategy preference, and connected portfolio context
- Strategy filters: Conservative, Balanced, Aggressive
- Stock detail pages with thesis, cases, metrics, and risks
- Rotation timeline page
- Performance comparison page
- API routes for picks, alerts, scoring, and daily scoring job
- SQL schema for stocks, scores, recommendations, human feedback, evaluations, and model updates
- Mobile-first card feeds, bottom navigation, thumb-friendly controls, and PWA metadata
- Portfolio connection activation path with provider placeholders for Plaid, SnapTrade, Yodlee, and MX
- Recursive learning loop endpoints and tables for saves, dismissals, portfolio connects, risk updates, and candidate model updates
- Daily intelligence feed for 5-15 minute engagement: top pick, portfolio context, news consensus, risk checks, and learning signals
- Morning nudge/notification strategy that points users into the most important personalized decision
- Capacitor native app scaffold for future App Store and Play Store builds

## Personalization Logic

The product is a top stock pick app first. Rotation is one intelligence signal underneath the recommendation.

User inputs -> risk appetite inference -> strategy fit -> portfolio context -> personalized top picks -> user action -> learning event -> validated model update.

## Mobile Product Processes

The mobile app is organized around five distinct user processes instead of generic dashboard tabs:

- Discover: morning nudge, news consensus, and the one signal that matters today.
- Decide: top pick review, expected return range, timeline, confidence, and save/pass/compare actions.
- Protect: risk appetite, bear case, drawdown comfort, and alert guardrails.
- Connect: portfolio provider connection, concentration checks, overlap detection, and missing exposure.
- Improve: feedback capture, personalization weights, evaluation gates, and governed model update candidates.

For MVP testing, the mobile preview intentionally resets to onboarding on every fresh load. The expected demo path is:

Onboarding hook -> Apple/Google account placeholder -> three personalization questions -> AI-generated sample outcome -> 7-day trial CTA -> app processes.

In-app actions should stay deliberately minimal: short command labels, tiny signal badges, and only one supporting sentence per panel. The app should feel like a native decision assistant, not a compressed research report.

Primary mobile navigation should stay focused on three bottom actions: Discover, Decide, and Connect. Secondary surfaces such as profile, risk settings, learning, subscription, notifications, privacy, and account deletion live behind the side Menu tab.

Code entry points:

- `lib/personalization.ts` computes the demo investor profile, personalized scores, agent rationale, and learning-loop summary.
- `data/product-processes.ts` defines the five mobile product processes and their unique feature/action subsets.
- `app/api/personalized-picks/route.ts` returns personalized top picks from onboarding/profile inputs.
- `app/api/learning/route.ts` records learning events for recursive improvement.
- `app/api/agents/route.ts` describes the agent workflow roles and evaluation criteria.
- `app/api/evaluations/route.ts` returns local evaluation status for personalized recommendation quality.
- `data/schema.sql` includes profile, portfolio connection, personalized recommendation, learning event, and personalization model update tables.

## Data Layer

- `data/mock-picks.ts` powers the current UI and API demo.
- `data/schema.sql` defines the prototype SQL system of record.
- `data/seed.sql` adds starter records for stocks, evaluation runs, and model update history.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Daily Job Prototype

```bash
npm run daily-job
```

The current job uses mock data. The production path is to replace mock price/volume and fundamentals with Alpha Vantage, Financial Modeling Prep, Polygon, or another licensed market data provider.

## Local Evaluation

This can run with plain Node:

```bash
node scripts/local-evaluation.mjs
```

It checks recommendation rationale, disclaimer presence, personalization score, agent rationale coverage, portfolio-context use, and risk-fit explanation.

## External Integration Status

See:

- `integrations/status.md`
- `docs/access-needed.md`
- `docs/supabase-setup.md`
- `docs/deployment.md`
- `docs/evaluation-framework.md`
- `docs/app-store-roadmap.md`
- `docs/native-build.md`
- `docs/notification-strategy.md`

## Compliance

This is educational information, not financial advice. Investing involves risk. Past performance does not guarantee future results.
