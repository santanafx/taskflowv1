import { useQuery } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Team } from "../types/team.types";

export function useGetTeam() {
  return useQuery<Team[]>({
    queryKey: [QueryKeys.TEAM],
    queryFn: () => apiService.get<Team[]>("/team"),
  });
}
