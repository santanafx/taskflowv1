export type Comment = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
};

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
  comments: Comment[];
  attachments: File[];
  tags: string[];
  projectId: string;
  columnId: string;
};
