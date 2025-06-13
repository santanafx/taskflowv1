"use client";
import { Header } from "@/components/organisms/Header";
import { MetricsPanel } from "@/components/organisms/MetricsPanel";
import { ProjectModal } from "@/components/organisms/ProjectModal";
import { Sidebar } from "@/components/organisms/Sidebar";
import { TaskModal } from "@/components/organisms/TaskModal";
import { useGetNotifications } from "@/services/hooks/useGetNotifications";
import { useState } from "react";

export default function Home() {
  const notifications = useGetNotifications();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null); //TODO fix type
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
      />
      <div className="flex w-full">
        <Sidebar
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
          </div>
        </main>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}
