"use client";

import { AppLayout } from "@/components/layouts/AppLayout";
import { PerformanceChart } from "@/components/organisms/PerformanceChart";
import { ProjectStatusChart } from "@/components/organisms/ProjectStatusChart";
import { TaskCompletionChart } from "@/components/organisms/TaskCompletionChart";
import { TeamWorkloadChart } from "@/components/organisms/TeamWorkloadChart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppState } from "@/hooks/useAppState";
import { CalendarIcon, Download, Filter } from "lucide-react";
import { useState } from "react";

const Reports = () => {
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

  const [dateRange, setDateRange] = useState("30d");
  const [projectFilter, setProjectFilter] = useState("all");

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
            <h1 className="text-2xl font-bold text-brand-primary">Reports</h1>
            <p className="text-gray-500">
              Performance analysis and project metrics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All projects</SelectItem>
                <SelectItem value="projeto-alpha">Alpha Project</SelectItem>
                <SelectItem value="redesign-app">App Redesign</SelectItem>
                <SelectItem value="marketing-q4">Q4 Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="overview" className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Active Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-green-600">+2 since last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Completed Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">48</div>
                  <p className="text-xs text-green-600">+12 since last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Completion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-green-600">+5% since last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">
                    Average Completion Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3 days</div>
                  <p className="text-xs text-red-600">
                    +0.5 days since last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>
                    Completed vs. created tasks in the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <PerformanceChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Status</CardTitle>
                  <CardDescription>Task distribution by status</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ProjectStatusChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Team Workload</CardTitle>
                  <CardDescription>Tasks assigned per member</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <TeamWorkloadChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>
                  Overview of progress for all active projects
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <TaskCompletionChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>
                  Performance analysis by team member
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <TeamWorkloadChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Analysis</CardTitle>
                <CardDescription>
                  Task distribution and completion over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <PerformanceChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>{" "}
    </AppLayout>
  );
};

export default Reports;
