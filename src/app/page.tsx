"use client";
import { ProjectProgress } from "@/components/molecules/ProjectProgress";
import { Header } from "@/components/organisms/Header";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { MetricsPanel } from "@/components/organisms/MetricsPanel";
import { ProjectModal } from "@/components/organisms/ProjectModal";
import { Sidebar } from "@/components/organisms/Sidebar";
import { TaskModal } from "@/components/organisms/TaskModal";
import { TeamModal } from "@/components/organisms/TeamModal";
import { useCreateProject } from "@/services/hooks/useCreateProject";

import { useCreateTask } from "@/services/hooks/useCreateTask";
import { useCreateTeam } from "@/services/hooks/useCreateTeam";
import { useDeleteTask } from "@/services/hooks/useDeleteTask";
import { useGetColumns } from "@/services/hooks/useGetColumns";
import { useGetNotifications } from "@/services/hooks/useGetNotifications";
import { useGetProjectProgress } from "@/services/hooks/useGetProjectProgress";
import { useGetProjects } from "@/services/hooks/useGetProjects";
import { useGetTasks } from "@/services/hooks/useGetTasks";
import { useGetTeam } from "@/services/hooks/useGetTeam";
import { useUpdateTask } from "@/services/hooks/useUpdateTask";
import { Task } from "@/services/types/task.types";
import { useState } from "react";

export default function Home() {
  const notifications = useGetNotifications();
  const createTask = useCreateTask();
  const tasks = useGetTasks();
  const columns = useGetColumns();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const createProject = useCreateProject();
  const getProjects = useGetProjects();
  const projectProgress = useGetProjectProgress();
  const createTeam = useCreateTeam();
  const team = useGetTeam();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedView, setSelectedView] = useState<
    "kanban" | "timeline" | "list"
  >("kanban");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Header
        notifications={notifications}
        onCreateTask={() => setIsTaskModalOpen(true)}
        onCreateProject={() => setIsProjectModalOpen(true)}
        onCreateTeam={() => setIsTeamModalOpen(true)}
      />
      <div className="flex w-full">
        <Sidebar
          getProjects={getProjects}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          selectedView={selectedView}
          onViewChange={setSelectedView}
          onCreateProject={() => setIsProjectModalOpen(true)}
        />

        <main className={`flex-1 transition-all duration-300 pt-16`}>
          <div className="p-6 space-y-6">
            {/* Metrics Panel */}
            <MetricsPanel />

            <ProjectProgress projectProgress={projectProgress} />

            {/* Main Content Area */}
            <div className="bg-white rounded-lg shadow-sm border">
              {selectedView === "kanban" && (
                <KanbanBoard
                  tasks={tasks}
                  columns={columns}
                  updateTask={updateTask}
                  onTaskClick={(task) => {
                    setSelectedTask(task);
                    setIsTaskModalOpen(true);
                  }}
                  onCreateTask={() => {
                    setSelectedTask(undefined);
                    setIsTaskModalOpen(true);
                  }}
                  setSelectedTask={setSelectedTask}
                />
              )}
              {selectedView === "timeline" && (
                <div className="p-8 text-center text-gray-500">
                  <h3 className="text-lg font-medium mb-2">Timeline View</h3>
                  <p>Timeline visualization coming soon...</p>
                </div>
              )}
              {selectedView === "list" && (
                <div className="p-8 text-center text-gray-500">
                  <h3 className="text-lg font-medium mb-2">List View</h3>
                  <p>List view coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <TaskModal
        team={team}
        createTask={createTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(undefined);
        }}
        selectedTask={selectedTask}
      />

      <ProjectModal
        createProject={createProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />

      <TeamModal
        createTeam={createTeam}
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
      />
    </div>
  );
}
