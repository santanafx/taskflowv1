import { useQuery } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Project } from "../types/project.types";
import { ProjectProgressTypes } from "../types/projectProgress.types";
import { Task } from "../types/task.types";

export function useGetProjectProgress() {
  return useQuery<ProjectProgressTypes[]>({
    queryKey: [QueryKeys.PROJECTSPROGRESS],
    queryFn: async () => {
      const [projects, tasks] = await Promise.all([
        apiService.get<Project[]>("/projects"),
        apiService.get<Task[]>("/tasks"),
      ]);

      const projectProgress = projects.map((project) => {
        const projectTasks = tasks.filter(
          (task) => task.projectId === project.id
        );

        if (projectTasks.length === 0) {
          return {
            name: project.name,
            progress: 0,
            color: `bg-[${project.color}]`,
          };
        }

        const totalTasks = projectTasks.length;
        const completedTasks = projectTasks.filter(
          (task) => task.columnId === "done"
        ).length;

        const progress = Math.round((completedTasks / totalTasks) * 100);

        return {
          name: project.name,
          progress,
          color: `bg-[${project.color}]`,
        };
      });

      return projectProgress;
    },
  });
}
