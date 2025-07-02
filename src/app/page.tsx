"use client";
import { ProjectProgress } from "@/components/molecules/ProjectProgress";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { MetricsPanel } from "@/components/organisms/MetricsPanel";
import { AppLayout } from "@/components/layouts/AppLayout";
import { useAppState } from "@/hooks/useAppState";

export default function Home() {
  const {
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
    setSelectedTask,
    handleTaskModalOpen,
    handleTaskModalClose,
    handleProjectModalOpen,
    handleProjectModalClose,
    handleTeamModalOpen,
    handleTeamModalClose,
    handleSidebarToggle,
    handleTaskClick,
    handleCreateTask,
  } = useAppState();

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
              onTaskClick={handleTaskClick}
              onCreateTask={handleCreateTask}
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
