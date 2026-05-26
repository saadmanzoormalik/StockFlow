import { readFileSync } from "node:fs";

const fixture = JSON.parse(readFileSync(new URL("../evals/local-eval-fixtures.json", import.meta.url), "utf8"));
const { benchmarkTargets, demoRun } = fixture;

const checks = [
  {
    metric: "topPickHasRationale",
    actual: demoRun.personalizationReasons.length > 0 ? 1 : 0,
    target: benchmarkTargets.topPickHasRationale,
    insight: "Top pick should always include clear personalization reasons."
  },
  {
    metric: "disclaimerPresent",
    actual: demoRun.disclaimer.includes("not financial advice") ? 1 : 0,
    target: benchmarkTargets.disclaimerPresent,
    insight: "Compliance disclaimer must stay attached to recommendation surfaces."
  },
  {
    metric: "personalizedScoreMinimum",
    actual: demoRun.personalizedScore,
    target: benchmarkTargets.personalizedScoreMinimum,
    insight: "Demo top pick should clear the minimum confidence threshold."
  },
  {
    metric: "agentRationaleCount",
    actual: Object.keys(demoRun.agentRationale).length,
    target: benchmarkTargets.agentRationaleCount,
    insight: "Strategy, risk, portfolio, and learning rationales should all be present."
  },
  {
    metric: "portfolioContextUsed",
    actual: demoRun.agentRationale.portfolioAgent.toLowerCase().includes("portfolio") ? 1 : 0,
    target: benchmarkTargets.portfolioContextUsed,
    insight: "Recommendation should explain how connected holdings changed the pick."
  },
  {
    metric: "riskFitExplained",
    actual: demoRun.agentRationale.riskAgent.toLowerCase().includes("risk") ? 1 : 0,
    target: benchmarkTargets.riskFitExplained,
    insight: "Risk fit must be explicitly explained for retail users."
  }
];

const results = checks.map((check) => ({
  ...check,
  pass: check.actual >= check.target
}));

const summary = {
  passed: results.filter((result) => result.pass).length,
  total: results.length,
  passRate: Math.round((results.filter((result) => result.pass).length / results.length) * 100),
  results
};

console.log(JSON.stringify(summary, null, 2));

if (summary.passed !== summary.total) {
  process.exitCode = 1;
}
