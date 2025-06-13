import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Metric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  color: string;
}

interface MetricsProps {
  metrics: Metric[];
}

export function Metrics({ metrics }: MetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.title}
            </CardTitle>
            <metric.icon className={`w-4 h-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {metric.value}
            </div>
            <p
              className={`text-xs ${
                metric.trend === "up"
                  ? "text-green-600"
                  : metric.trend === "down"
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {metric.change} compared to last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
