import { useQuery } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Task } from "../types/task.types";

export function useGetTasks() {
  return useQuery<Task[]>({
    queryKey: [QueryKeys.TASKS],
    queryFn: () => apiService.get<Task[]>("/tasks"),
  });
}
