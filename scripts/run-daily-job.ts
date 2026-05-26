import { mockPicks, performance } from "../data/mock-picks";
import { rankPicks } from "../lib/scoring";

const ranked = rankPicks(mockPicks);

console.log(JSON.stringify({
  job: "daily-scoring",
  status: "completed",
  modelVersion: "mock-rotation-v0.1",
  topPick: ranked[0].ticker,
  topScore: ranked[0].finalScore,
  rankedTickers: ranked.map((pick) => pick.ticker),
  latestPerformance: performance.at(-1),
  disclaimer: "This is educational information, not financial advice. Investing involves risk. Past performance does not guarantee future results."
}, null, 2));
