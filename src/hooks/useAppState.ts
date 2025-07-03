"use client";

import { useState } from "react";
import { useGetColumns } from "../services/hooks/useGetColumns";
import { useGetProjectProgress } from "../services/hooks/useGetProjectProgress";
import { useGetTasks } from "../services/hooks/useGetTasks";
import { useUpdateTask } from "../services/hooks/useUpdateTask";
import { useCreateProject } from "../services/hooks/useCreateProject";
import { useGetProjects } from "../services/hooks/useGetProjects";
import { useGetNotifications } from "../services/hooks/useGetNotifications";
import { useCreateTeam } from "../services/hooks/useCreateTeam";
import { useGetTeam } from "../services/hooks/useGetTeam";
import { useCreateTask } from "../services/hooks/useCreateTask";
import { useDeleteTask } from "../services/hooks/useDeleteTask";
import { Task } from "../services/types/task.types";

export function useAppState() {
  const tasks = useGetTasks();
  const columns = useGetColumns();
  const projectProgress = useGetProjectProgress();
  const updateTask = useUpdateTask();
  const createProject = useCreateProject();
  const getProjects = useGetProjects();
  const notifications = useGetNotifications();
  const createTeam = useCreateTeam();
  const team = useGetTeam();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const [selectedView, setSelectedView] = useState<
    "kanban" | "timeline" | "list"
  >("kanban");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const handleTaskModalOpen = () => setIsTaskModalOpen(true);
  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(undefined);
  };
  const handleProjectModalOpen = () => setIsProjectModalOpen(true);
  const handleProjectModalClose = () => setIsProjectModalOpen(false);
  const handleTeamModalOpen = () => setIsTeamModalOpen(true);
  const handleTeamModalClose = () => setIsTeamModalOpen(false);
  const handleSidebarToggle = () => setSidebarCollapsed(!sidebarCollapsed);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCreateTask = () => {
    setSelectedTask(undefined);
    setIsTaskModalOpen(true);
  };

  return {
    tasks,
    columns,
    projectProgress,
    updateTask,
    createProject,
    getProjects,
    notifications,
    createTeam,
    team,
    createTask,
    deleteTask,
    selectedView,
    setSelectedView,
    sidebarCollapsed,
    isTaskModalOpen,
    isProjectModalOpen,
    isTeamModalOpen,
    selectedTask,
    handleTaskModalOpen,
    handleTaskModalClose,
    handleProjectModalOpen,
    handleProjectModalClose,
    handleTeamModalOpen,
    handleTeamModalClose,
    handleSidebarToggle,
    handleTaskClick,
    handleCreateTask,
    setSelectedTask,
  };
}
