"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Folder,
  Calendar,
  Users,
  BarChart3,
  Filter,
  Plus,
  Kanban,
  List,
  TimerIcon as Timeline,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter, usePathname } from "next/navigation";
import { UseQueryResult } from "@tanstack/react-query";
import { Project } from "@/services/types/project.type";
import { cn } from "@/lib/utils";

interface SidebarProps {
  getProjects: UseQueryResult<Project[]>;
  collapsed: boolean;
  onToggle: () => void;
  selectedView?: "kanban" | "timeline" | "list";
  onViewChange?: (view: "kanban" | "timeline" | "list") => void;
  onCreateProject: () => void;
}

export function Sidebar({
  getProjects,
  collapsed,
  onToggle,
  selectedView = "kanban",
  onViewChange,
  onCreateProject,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedProject, setSelectedProject] = useState("projeto-alpha");
  //TODO remove mocks
  const projects = getProjects?.data ?? [];

  console.log(projects);

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: Home, path: "/" },
    { id: "projects", name: "Projects", icon: Folder, path: "/projects" },
    { id: "calendar", name: "Calendar", icon: Calendar, path: "/calendar" },
    { id: "team", name: "Team", icon: Users, path: "/team" },
    { id: "reports", name: "Reports", icon: BarChart3, path: "/reports" },
  ];

  const views = [
    { id: "kanban", name: "Kanban", icon: Kanban },
    { id: "timeline", name: "Timeline", icon: Timeline },
    { id: "list", name: "List", icon: List },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 min-h-screen transition-[width] ease-in-out duration-200 flex flex-col sticky top-0 left-0 will-change-[width]",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header spacer to account for fixed header */}
      <div className="h-16 flex-shrink-0"></div>

      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="w-full justify-center transition-transform duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 transition-transform" />
          ) : (
            <ChevronLeft className="w-4 h-4 transition-transform" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Navigation */}
        <div className="p-4 space-y-2">
          {!collapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 transition-opacity">
              Navigation
            </h3>
          )}
          {navigation.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-center",
                  collapsed ? "px-0 h-12" : "justify-start",
                  isActive
                    ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                    : "hover:bg-gray-100"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className={collapsed ? "w-5 h-5" : "w-4 h-4"} />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Button>
            );
          })}
        </div>

        <Separator />

        {pathname === "/" && onViewChange && (
          <>
            <div className="p-4 space-y-2">
              {!collapsed && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  View
                </h3>
              )}
              {views.map((view) => (
                <Button
                  key={view.id}
                  variant={selectedView === view.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-center",
                    collapsed ? "px-0 h-12" : "justify-start",
                    selectedView === view.id
                      ? "bg-brand-accent text-white hover:bg-brand-accent/90"
                      : "hover:bg-gray-100"
                  )}
                  onClick={() =>
                    onViewChange(view.id as "kanban" | "timeline" | "list")
                  }
                >
                  <view.icon className={collapsed ? "w-5 h-5" : "w-4 h-4"} />
                  {!collapsed && <span className="ml-3">{view.name}</span>}
                </Button>
              ))}
            </div>

            <Separator />
          </>
        )}

        {/* Projects */}
        <div className="p-4 space-y-2">
          {!collapsed && (
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Projects
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="w-4 h-4"
                onClick={onCreateProject}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          )}

          {projects.map((project) => (
            <Button
              key={project.id}
              variant={selectedProject === project.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-center hover:bg-gray-100",
                collapsed ? "px-0 h-12" : "justify-start"
              )}
              onClick={() => setSelectedProject(project.id)}
            >
              <div
                className={cn(
                  "rounded-full flex-shrink-0",
                  collapsed ? "w-4 h-4" : "w-3 h-3"
                )}
                style={{ backgroundColor: project.color }}
              />
              {!collapsed && (
                <>
                  <span className="ml-3 flex-1 text-left truncate">
                    {project.name}
                  </span>
                </>
              )}
            </Button>
          ))}
        </div>

        {/* TODO implement filters */}
        {/* Filters */}
        {!collapsed && (
          <>
            <Separator />
            <div className="p-4">
              <Button variant="outline" className="w-full justify-start">
                <Filter className="w-4 h-4 mr-3" />
                Quick Filters
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
