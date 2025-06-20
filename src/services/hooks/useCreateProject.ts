import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Project } from "../types/project.type";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: Project) =>
      apiService.post<Project>(`/projects`, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PROJECTS] });
    },
  });
}
