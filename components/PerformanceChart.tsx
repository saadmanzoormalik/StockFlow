"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { PerformancePoint } from "@/lib/types";

export function PerformanceChart({ data }: { data: PerformancePoint[] }) {
  return (
    <div className="h-[340px] w-full rounded-lg border border-line bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -20, right: 12, top: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D9E2EC" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line type="monotone" dataKey="appPortfolio" name="App portfolio" stroke="#147D64" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="sp500" name="S&P 500" stroke="#2B6CB0" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="nasdaq" name="Nasdaq" stroke="#805AD5" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="dow" name="Dow" stroke="#B7791F" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
