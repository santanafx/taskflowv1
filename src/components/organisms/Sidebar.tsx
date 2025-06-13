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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  selectedView?: "kanban" | "timeline" | "list";
  onViewChange?: (view: "kanban" | "timeline" | "list") => void;
  onCreateProject: () => void;
}

export function Sidebar({
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
  const projects = [
    {
      id: "projeto-alpha",
      name: "Alpha Project",
      tasks: 12,
      color: "bg-blue-500",
    },
    {
      id: "redesign-app",
      name: "Redesign App",
      tasks: 8,
      color: "bg-green-500",
    },
    {
      id: "marketing-q4",
      name: "Marketing Q4",
      tasks: 15,
      color: "bg-purple-500",
    },
    {
      id: "integracao-api",
      name: "API Integration",
      tasks: 7,
      color: "bg-orange-500",
    },
    {
      id: "novo-website",
      name: "New Website",
      tasks: 10,
      color: "bg-red-500",
    },
    { id: "app-mobile", name: "Mobile App", tasks: 14, color: "bg-yellow-500" },
  ];

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
      className={`bg-white border-r border-gray-200 min-h-screen transition-[width] ease-in-out duration-200 ${
        collapsed ? "w-20" : "w-64"
      } flex flex-col sticky top-0 left-0 will-change-[width]`}
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
                className={`w-full justify-center ${
                  collapsed ? "px-0 h-12" : "justify-start"
                } ${
                  isActive
                    ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                    : "hover:bg-gray-100"
                }`}
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
                  className={`w-full justify-center ${
                    collapsed ? "px-0 h-12" : "justify-start"
                  } ${
                    selectedView === view.id
                      ? "bg-brand-accent text-white hover:bg-brand-accent/90"
                      : "hover:bg-gray-100"
                  }`}
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
              className={`w-full justify-center ${
                collapsed ? "px-0 h-12" : "justify-start"
              } hover:bg-gray-100`}
              onClick={() => setSelectedProject(project.id)}
            >
              <div
                className={`${collapsed ? "w-4 h-4" : "w-3 h-3"} rounded-full ${
                  project.color
                } flex-shrink-0`}
              />
              {!collapsed && (
                <>
                  <span className="ml-3 flex-1 text-left truncate">
                    {project.name}
                  </span>
                  <Badge variant="secondary" className="ml-2 flex-shrink-0">
                    {project.tasks}
                  </Badge>
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
