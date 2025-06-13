import { useQuery } from "@tanstack/react-query";
import { apiService } from "../api/config";
import { QueryKeys } from "../api/queryKeys";
import { Notification, NotificationError } from "../types/notifications.types";

export function useGetNotifications() {
  return useQuery<Notification[], NotificationError>({
    queryKey: [QueryKeys.NOTIFICATIONS],
    queryFn: async () => {
      return await apiService.get<Notification[]>("/notifications");
    },
  });
}
