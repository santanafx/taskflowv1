import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Task } from "../types/task.types";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => apiService.post<Task>(`/tasks`, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TASKS] });
    },
  });
}
