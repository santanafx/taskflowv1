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
  { member: "John Silva", assigned: 8, completed: 5 },
  { member: "Ana Costa", assigned: 12, completed: 9 },
  { member: "Carlos Lima", assigned: 10, completed: 7 },
  { member: "Maria Santos", assigned: 7, completed: 6 },
  { member: "Pedro Oliveira", assigned: 9, completed: 8 },
  { member: "Luiza Ferreira", assigned: 6, completed: 4 },
  { member: "Rafael Souza", assigned: 11, completed: 8 },
  { member: "Juliana Alves", assigned: 8, completed: 7 },
];

export function TeamWorkloadChart() {
  return (
    <ChartContainer
      config={{
        assigned: {
          label: "Assigned Tasks",
          color: "#1A365D",
        },
        completed: {
          label: "Completed Tasks",
          color: "#4FD1C5",
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
            dataKey="member"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="assigned" fill="#1A365D" name="Assigned" />
          <Bar dataKey="completed" fill="#4FD1C5" name="Completed" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
