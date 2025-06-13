import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Project {
  name: string;
  progress: number;
  color: string;
}

interface ProjectProgressProps {
  projects: Project[];
}

export function ProjectProgress({ projects }: ProjectProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-brand-primary">
          Project Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
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
  );
}
