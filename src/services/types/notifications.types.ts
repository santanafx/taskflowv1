export type Notification = {
  id: string;
  title: string;
  time: string;
  unread: boolean;
};

export type NotificationError = {
  message: string;
  code: string;
};
