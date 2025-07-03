"use client";

import { AppLayout } from "@/components/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState } from "@/hooks/useAppState";
import { useGetTeam } from "@/services/hooks/useGetTeam";
import { Plus, Search, UserPlus } from "lucide-react";
import { useState } from "react";

export default function Team() {
  const {
    createProject,
    getProjects,
    notifications,
    createTeam,
    team,
    createTask,
    updateTask,
    deleteTask,
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
  } = useAppState();

  const { data: teamData, isLoading, error } = useGetTeam();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers =
    teamData?.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const teamStats = {
    totalMembers: teamData?.length || 0,
    activeProjects: 6,
    tasksCompleted: 0,
    averagePerformance: 0,
  };

  if (isLoading) {
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
        <main className="flex-1 pt-16">
          <div className="p-6">
            <div className="text-center">Loading team data...</div>
          </div>
        </main>
      </AppLayout>
    );
  }

  if (error) {
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
        <main className="flex-1 pt-16">
          <div className="p-6">
            <div className="text-center text-red-500">
              Error loading team data
            </div>
          </div>
        </main>
      </AppLayout>
    );
  }

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-primary">Team</h1>
            <p className="text-gray-500"> Manage and track your team members</p>
          </div>

          <Button
            onClick={handleProjectModalOpen}
            className="bg-brand-hover hover:bg-brand-accent text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add member
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamStats.totalMembers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamStats.activeProjects}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Completed Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamStats.tasksCompleted}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Average Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamStats.averagePerformance}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search members..."
              className="pl-10 bg-gray-50 border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="todos" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="todos">All</TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="offline">Offline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="pt-6 px-6 pb-4">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#1A365D] text-white flex items-center justify-center font-semibold mr-3">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500">{member.position}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
