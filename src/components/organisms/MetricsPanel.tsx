"use client";

import { Metrics } from "@/components/molecules/Metrics";
import { CheckCircle, Clock, TrendingUp, Users } from "lucide-react";

export function MetricsPanel() {
  //TODO remove mocks
  const metrics = [
    {
      title: "Completed Tasks",
      value: "24",
      change: "+12%",
      trend: "up" as const,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Team Productivity",
      value: "87%",
      change: "+5%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Active Members",
      value: "8",
      change: "0%",
      trend: "neutral" as const,
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Average Time",
      value: "2.3d",
      change: "-8%",
      trend: "down" as const,
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <Metrics metrics={metrics} />
    </div>
  );
}
