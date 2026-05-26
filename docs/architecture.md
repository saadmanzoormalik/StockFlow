# Stock Pick Check Architecture

## Decision

Which stock should this retail investor review today?

## Decision Inputs

- Risk appetite from onboarding
- Preferred strategy: Conservative, Balanced, Aggressive
- Connected holdings and concentration
- Stock ranking signals
- Sector rotation signals
- Earnings/revenue momentum
- Valuation vs growth
- Historical user actions

## System Flow

Browser/mobile UI -> Next.js API routes -> SQL database -> scoring model -> personalization layer -> agent rationale -> top stock pick -> user action -> learning event -> evaluation -> candidate model update.

## Daily Engagement Loop

Today feed -> top pick -> rationale -> portfolio insight -> news consensus -> risk check -> user save/dismiss/watch action -> learning event.

The goal is a 5-15 minute daily session that blends action and knowledge without becoming a complex trading terminal.

## Agentic Roles

- Risk Appetite Agent: infers risk comfort from onboarding answers.
- Portfolio Agent: compares recommendations against holdings and concentration.
- Strategy Agent: maps picks to Conservative, Balanced, or Aggressive.
- Stock Ranking Agent: ranks the stock universe using scoring factors.
- Decision Agent: creates the final personalized top pick.
- Evaluation Agent: checks accuracy, risk fit, grounding, and usefulness.
- Learning Agent: converts user behavior into candidate ranking updates.
- Governance Agent: blocks unvalidated model updates from production deployment.

## Current State

The repo has deterministic prototypes for ranking, personalization, and agent rationale. It does not yet run real LangGraph, Dify, LangSmith, market data, portfolio sync, or production ML.
