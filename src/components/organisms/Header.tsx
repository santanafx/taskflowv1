"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Notification,
  NotificationError,
} from "@/services/types/notifications.types";
import { RootState } from "@/store";
import { getInitials } from "@/utils/getInitials";
import { UseQueryResult } from "@tanstack/react-query";
import { Bell, ChevronDown, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  notifications: UseQueryResult<Notification[], NotificationError>;
  onCreateTask: () => void;
  onCreateProject: () => void;
  onCreateTeam: () => void;
}

export function Header({
  notifications,
  onCreateTask,
  onCreateProject,
  onCreateTeam,
}: HeaderProps) {
  const selectedProject = useSelector(
    (state: RootState) => state.project.selectedProject
  );
  const userName = useSelector((state: RootState) => state.user.userName);
  const unreadCount = (notifications.data || []).filter((n) => n.unread).length;
  const isProjectSelected = selectedProject.name !== "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-primary">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <h1 className="text-xl font-bold text-brand-primary">
              TaskFlow Pro
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Create Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-white bg-brand-accent">
                <Plus className="w-4 h-4 mr-2" />
                Create
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isProjectSelected && (
                <DropdownMenuItem onClick={onCreateTask}>
                  New Task
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={onCreateProject}>
                New Project
              </DropdownMenuItem>
              {/* TODO implement new team modal */}
              <DropdownMenuItem onClick={onCreateTeam}>
                New Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Notifications */}
          {notifications.isLoading ? (
            <Skeleton className="w-10 h-10" />
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="space-y-2">
                    {notifications.data?.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          notification.unread
                            ? "bg-blue-50 border-blue-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-primary">
                  <span className="text-white font-bold text-sm">
                    {getInitials(userName)}
                  </span>
                </div>
                <span className="hidden md:block">{userName}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>Configurations</DropdownMenuItem>
              <DropdownMenuItem>Plan & Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Exit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
