import { useQuery } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Project } from "../types/project.type";

export function useGetProjects() {
  return useQuery<Project[]>({
    queryKey: [QueryKeys.PROJECTS],
    queryFn: () => apiService.get<Project[]>("/projects"),
  });
}
