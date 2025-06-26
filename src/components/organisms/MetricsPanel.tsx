"use client";

import { Metrics } from "@/components/molecules/Metrics";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectProgressTypes } from "@/services/types/projectProgress.types";
import { UseQueryResult } from "@tanstack/react-query";
import { CheckCircle, Clock, TrendingUp, Users } from "lucide-react";
import { ProjectProgress } from "../molecules/ProjectProgress";

interface MetricsPanelProps {
  projectProgress: UseQueryResult<ProjectProgressTypes[]>;
}

export function MetricsPanel({ projectProgress }: MetricsPanelProps) {
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

  if (projectProgress.isLoading) {
    return (
      <div className="space-y-6">
        <Metrics metrics={metrics} />
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-8" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (projectProgress.error) {
    return (
      <div className="space-y-6">
        <Metrics metrics={metrics} />
        <div className="text-center text-gray-500">
          Error loading project progress
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Metrics metrics={metrics} />
      <ProjectProgress projectProgress={projectProgress.data || []} />
    </div>
  );
}
