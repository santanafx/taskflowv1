"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Plus, Search } from "lucide-react";
import { ProjectCard } from "@/components/organisms/ProjectCard";
import { AppLayout } from "@/components/layouts/AppLayout";
import { useCreateProject } from "@/services/hooks/useCreateProject";
import { useGetProjects } from "@/services/hooks/useGetProjects";
import { useGetProjectDetails } from "@/services/hooks/useGetProjectDetails";
import { useGetNotifications } from "@/services/hooks/useGetNotifications";
import { useCreateTeam } from "@/services/hooks/useCreateTeam";
import { useGetTeam } from "@/services/hooks/useGetTeam";
import { useCreateTask } from "@/services/hooks/useCreateTask";
import { useUpdateTask } from "@/services/hooks/useUpdateTask";
import { useDeleteTask } from "@/services/hooks/useDeleteTask";
import { Task } from "@/services/types/task.types";
import { cn } from "@/lib/utils";

export default function ProjectPage() {
  const createProject = useCreateProject();
  const getProjects = useGetProjects();
  const projectDetails = useGetProjectDetails();
  const notifications = useGetNotifications();
  const createTeam = useCreateTeam();
  const team = useGetTeam();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
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

  const projects = projectDetails.data || [];

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout
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
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-primary">Projects</h1>
            <p className="text-gray-500">Manage and track all your projects</p>
          </div>

          <Button
            onClick={handleProjectModalOpen}
            className="bg-brand-hover hover:bg-brand-accent text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New project
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search project..."
              className="pl-10 bg-gray-50 border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {projectDetails.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500">
                  <p className="text-lg font-medium mb-2">No projects found</p>
                  <p className="text-sm">
                    Create your first project to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {filteredProjects.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 hidden md:table-cell">
                      Progress
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 hidden md:table-cell">
                      Members
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 hidden lg:table-cell">
                      Tasks
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 hidden lg:table-cell">
                      Deadline
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "w-3 h-3 rounded-full mr-3",
                              `bg-[${project.color}]`
                            )}
                          ></div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {project.name}
                            </div>
                            <div className="text-sm text-gray-500 hidden md:block">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              backgroundColor: project.color,
                              width: `${project.progress}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {project.progress}%
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {project.members.length}
                          </span>
                          {project.members.length > 0 && (
                            <div className="text-xs text-gray-500 truncate max-w-32">
                              {project.members.slice(0, 2).join(", ")}
                              {project.members.length > 2 &&
                                ` +${project.members.length - 2}`}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        {project.tasks.completed}/{project.tasks.total}
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        {new Date(project.deadline).toLocaleDateString("en-US")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            project.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : project.status === "not-started"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {project.status === "completed"
                            ? "Completed"
                            : project.status === "not-started"
                            ? "Not Started"
                            : "In Progress"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <p className="text-lg font-medium mb-2">No projects found</p>
                  <p className="text-sm">
                    Create your first project to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
