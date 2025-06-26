"use client";

import { Header } from "@/components/organisms/Header";
import { Sidebar } from "@/components/organisms/Sidebar";
import { TaskModal } from "@/components/organisms/TaskModal";
import { ProjectModal } from "@/components/organisms/ProjectModal";
import { TeamModal } from "@/components/organisms/TeamModal";
import { Task } from "@/services/types/task.types";
import { Project } from "@/services/types/project.types";
import { Team } from "@/services/types/team.types";
import {
  Notification,
  NotificationError,
} from "@/services/types/notifications.types";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

interface AppLayoutProps {
  children: React.ReactNode;
  selectedView?: "kanban" | "timeline" | "list";
  onViewChange?: (view: "kanban" | "timeline" | "list") => void;
  sidebarCollapsed: boolean;
  onSidebarToggle: () => void;
  isTaskModalOpen: boolean;
  isProjectModalOpen: boolean;
  isTeamModalOpen: boolean;
  selectedTask?: Task;
  onTaskModalOpen: () => void;
  onTaskModalClose: () => void;
  onProjectModalOpen: () => void;
  onProjectModalClose: () => void;
  onTeamModalOpen: () => void;
  onTeamModalClose: () => void;
  notifications: UseQueryResult<Notification[], NotificationError>;
  projects: UseQueryResult<Project[], Error>;
  team: UseQueryResult<Team[], Error>;
  createProject: UseMutationResult<Project, Error, Project, unknown>;
  createTeam: UseMutationResult<Team, Error, Team, unknown>;
  createTask: UseMutationResult<Task, Error, Task, unknown>;
  updateTask: UseMutationResult<Task, Error, Task, unknown>;
  deleteTask: UseMutationResult<void, Error, string, unknown>;
}

export function AppLayout({
  children,
  selectedView = "kanban",
  onViewChange,
  sidebarCollapsed,
  onSidebarToggle,
  isTaskModalOpen,
  isProjectModalOpen,
  isTeamModalOpen,
  selectedTask,
  onTaskModalOpen,
  onTaskModalClose,
  onProjectModalOpen,
  onProjectModalClose,
  onTeamModalOpen,
  onTeamModalClose,
  notifications,
  projects,
  team,
  createProject,
  createTeam,
  createTask,
  updateTask,
  deleteTask,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Header
        notifications={notifications}
        onCreateTask={onTaskModalOpen}
        onCreateProject={onProjectModalOpen}
        onCreateTeam={onTeamModalOpen}
      />

      <div className="flex w-full">
        <Sidebar
          getProjects={projects}
          collapsed={sidebarCollapsed}
          onToggle={onSidebarToggle}
          selectedView={selectedView}
          onViewChange={onViewChange}
          onCreateProject={onProjectModalOpen}
        />

        <main className={`flex-1 transition-all duration-300 pt-16`}>
          {children}
        </main>
      </div>

      <TaskModal
        team={team}
        createTask={createTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        isOpen={isTaskModalOpen}
        onClose={onTaskModalClose}
        selectedTask={selectedTask}
      />

      <ProjectModal
        createProject={createProject}
        isOpen={isProjectModalOpen}
        onClose={onProjectModalClose}
      />

      <TeamModal
        createTeam={createTeam}
        isOpen={isTeamModalOpen}
        onClose={onTeamModalClose}
      />
    </div>
  );
}
