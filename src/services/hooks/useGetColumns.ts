import { useQuery } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";

export interface Column {
  id: string;
  title: string;
  color: string;
}

export function useGetColumns() {
  return useQuery<Column[]>({
    queryKey: [QueryKeys.COLUMNS],
    queryFn: () => apiService.get<Column[]>("/columns"),
  });
}
