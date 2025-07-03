"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { name: "Backlog", value: 15, color: "#94A3B8" },
  { name: "To Do", value: 8, color: "#3B82F6" },
  { name: "In Progress", value: 12, color: "#F59E0B" },
  { name: "In Review", value: 6, color: "#8B5CF6" },
  { name: "Completed", value: 24, color: "#10B981" },
];

const COLORS = ["#94A3B8", "#3B82F6", "#F59E0B", "#8B5CF6", "#10B981"];

export function ProjectStatusChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Tasks",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${((percent || 0) * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
