"use client";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

const data = [
  { name: "1 Jan", created: 12, completed: 8 },
  { name: "5 Jan", created: 15, completed: 12 },
  { name: "10 Jan", created: 8, completed: 10 },
  { name: "15 Jan", created: 18, completed: 15 },
  { name: "20 Jan", created: 22, completed: 18 },
  { name: "25 Jan", created: 16, completed: 20 },
  { name: "30 Jan", created: 14, completed: 16 },
  { name: "5 Feb", created: 20, completed: 14 },
  { name: "10 Feb", created: 25, completed: 22 },
  { name: "15 Feb", created: 18, completed: 24 },
  { name: "20 Feb", created: 16, completed: 18 },
  { name: "25 Feb", created: 19, completed: 16 },
];

export function PerformanceChart() {
  return (
    <ChartContainer
      config={{
        created: {
          label: "Created Tasks",
          color: "hsl(var(--chart-1))",
        },
        completed: {
          label: "Completed Tasks",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="created"
            stroke="#1A365D"
            strokeWidth={2}
            dot={{ fill: "#1A365D" }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#4FD1C5"
            strokeWidth={2}
            dot={{ fill: "#4FD1C5" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
