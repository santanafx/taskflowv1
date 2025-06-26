import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectProgressTypes } from "@/services/types/projectProgress.types";
import { UseQueryResult } from "@tanstack/react-query";

interface ProjectProgressProps {
  projectProgress: UseQueryResult<ProjectProgressTypes[]>;
}

export function ProjectProgress({ projectProgress }: ProjectProgressProps) {
  if (projectProgress.isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="w-3 h-3 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!projectProgress.data || projectProgress.data.length === 0)
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex justify-center items-center h-[200px]">
          <h3 className="font-semibold text-gray-800">Select a project</h3>
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-brand-primary">
            Projects Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectProgress.data?.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${project.color}`} />
                    <span className="text-sm font-medium">{project.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
