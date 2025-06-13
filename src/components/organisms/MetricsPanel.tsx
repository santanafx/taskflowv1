"use client";

import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import { Metrics } from "@/components/molecules/Metrics";
import { ProjectProgress } from "@/components/molecules/ProjectProgress";

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

  const projectProgress = [
    { name: "Alpha Project", progress: 75, color: "bg-blue-500" },
    { name: "Redesign App", progress: 45, color: "bg-green-500" },
    { name: "Marketing Q4", progress: 90, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <Metrics metrics={metrics} />
      <ProjectProgress projects={projectProgress} />
    </div>
  );
}
