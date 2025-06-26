import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Team } from "../types/team.types";

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (team: Team) => apiService.post<Team>(`/team`, team),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TEAM],
      });
    },
  });
}
