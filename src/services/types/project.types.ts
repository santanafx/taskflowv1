export type Project = {
  id: string;
  name: string;
  description?: string;
  color: string;
};

export type ProjectDetails = {
  id: string;
  name: string;
  description: string;
  progress: number;
  members: string[];
  tasks: { total: number; completed: number };
  deadline: string;
  status: string;
  color: string;
};
