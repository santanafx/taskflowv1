"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { project: "Alpha Project", completed: 18, total: 24, progress: 75 },
  { project: "App Redesign", completed: 8, total: 18, progress: 45 },
  { project: "Q4 Marketing", completed: 13, total: 15, progress: 90 },
  { project: "API Integration", completed: 4, total: 12, progress: 30 },
  { project: "New Website", completed: 12, total: 20, progress: 60 },
  { project: "Mobile App", completed: 8, total: 30, progress: 25 },
];

export function TaskCompletionChart() {
  return (
    <ChartContainer
      config={{
        completed: {
          label: "Completed Tasks",
          color: "#4FD1C5",
        },
        pending: {
          label: "Pending Tasks",
          color: "#E2E8F0",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="project"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="completed"
            stackId="a"
            fill="#4FD1C5"
            name="Completed"
          />
          <Bar
            dataKey={(entry) => entry.total - entry.completed}
            stackId="a"
            fill="#E2E8F0"
            name="Pending"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
