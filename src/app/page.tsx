"use client";
import { ProjectProgress } from "@/components/molecules/ProjectProgress";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { MetricsPanel } from "@/components/organisms/MetricsPanel";
import { AppLayout } from "@/components/layouts/AppLayout";
import { useGetColumns } from "@/services/hooks/useGetColumns";
import { useGetProjectProgress } from "@/services/hooks/useGetProjectProgress";
import { useGetTasks } from "@/services/hooks/useGetTasks";
import { useUpdateTask } from "@/services/hooks/useUpdateTask";
import { useCreateProject } from "@/services/hooks/useCreateProject";
import { useGetProjects } from "@/services/hooks/useGetProjects";
import { useGetNotifications } from "@/services/hooks/useGetNotifications";
import { useCreateTeam } from "@/services/hooks/useCreateTeam";
import { useGetTeam } from "@/services/hooks/useGetTeam";
import { useCreateTask } from "@/services/hooks/useCreateTask";
import { useDeleteTask } from "@/services/hooks/useDeleteTask";
import { Task } from "@/services/types/task.types";
import { useState } from "react";

export default function Home() {
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

  return (
    <AppLayout
      selectedView={selectedView}
      onViewChange={setSelectedView}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={handleSidebarToggle}
      isTaskModalOpen={isTaskModalOpen}
      isProjectModalOpen={isProjectModalOpen}
      isTeamModalOpen={isTeamModalOpen}
      selectedTask={selectedTask}
      onTaskModalOpen={handleTaskModalOpen}
      onTaskModalClose={handleTaskModalClose}
      onProjectModalOpen={handleProjectModalOpen}
      onProjectModalClose={handleProjectModalClose}
      onTeamModalOpen={handleTeamModalOpen}
      onTeamModalClose={handleTeamModalClose}
      notifications={notifications}
      projects={getProjects}
      team={team}
      createProject={createProject}
      createTeam={createTeam}
      createTask={createTask}
      updateTask={updateTask}
      deleteTask={deleteTask}
    >
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
    </AppLayout>
  );
}
