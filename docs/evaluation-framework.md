# Evaluation Framework

## Evaluation Question

Is the app improving the user's stock-picking decision compared with a generic ranked list or market benchmark?

## MVP Metrics

| Metric | Target | Current |
|---|---:|---:|
| Top pick explanation completeness | 90% | Mock |
| Risk-fit accuracy | 85% | Mock |
| Personalization usefulness | 80% | Mock |
| Evidence coverage | 85% | Not connected |
| Portfolio overlap detection | 90% | Mock |
| User save/dismiss signal capture | 95% | API scaffold |
| App portfolio vs S&P 500 | Positive spread | Mock |
| Max drawdown visibility | 100% | Mock |

## LangSmith Plan

1. Create a `stock-pick-check` project.
2. Create datasets for onboarding profiles, stock universes, expected recommendations, and expected rationales.
3. Trace each agent step: risk, portfolio, strategy, ranking, decision, learning.
4. Add evaluators for:
   - recommendation fit
   - rationale groundedness
   - risk match
   - portfolio-context use
   - disclaimer presence
   - hallucination avoidance
5. Compare model/policy versions before deployment.

## External Dashboard Plan

The dashboard should show actual vs benchmark, gap to target, trend, and next action for each KPI.
