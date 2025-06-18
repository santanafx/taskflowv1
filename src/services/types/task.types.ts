export type Task = {
  id: string;
  title: string;
  description: string;
  assignee: {
    name: string;
    avatar: string;
  };
  deadline: string;
  priority: "low" | "medium" | "high";
  comments: number;
  attachments: File[];
  tags: string[];
  columnId: string;
};
