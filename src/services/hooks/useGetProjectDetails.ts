import { useQuery } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Project, ProjectDetails } from "../types/project.types";
import { Task } from "../types/task.types";

export function useGetProjectDetails() {
  return useQuery<ProjectDetails[]>({
    queryKey: [QueryKeys.PROJECTS, "details"],
    queryFn: async () => {
      const [projects, tasks] = await Promise.all([
        apiService.get<Project[]>("/projects"),
        apiService.get<Task[]>("/tasks"),
      ]);

      const projectDetails = projects.map((project) => {
        const projectTasks = tasks.filter(
          (task) => task.projectId === project.id
        );

        const totalTasks = projectTasks.length;
        const completedTasks = projectTasks.filter(
          (task) => task.columnId === "done"
        ).length;
        const progress =
          totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        const taskDeadlines = projectTasks
          .filter((task) => task.deadline)
          .map((task) => new Date(task.deadline))
          .sort((a, b) => a.getTime() - b.getTime());

        const deadline =
          taskDeadlines.length > 0
            ? taskDeadlines[0].toISOString().split("T")[0]
            : "2024-12-31";

        let status = "in-progress";
        if (progress === 100) status = "completed";
        else if (progress === 0) status = "not-started";

        const uniqueMembers = new Set(
          projectTasks
            .filter((task) => task.assignee && task.assignee.name)
            .map((task) => task.assignee.name)
        );
        const membersArray = Array.from(uniqueMembers);

        return {
          id: project.id,
          name: project.name,
          description: project.description || "No description",
          progress,
          members: membersArray,
          tasks: { total: totalTasks, completed: completedTasks },
          deadline,
          status,
          color: project.color,
        };
      });

      return projectDetails;
    },
  });
}
