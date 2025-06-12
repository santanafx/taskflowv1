"use client";

import { Bell, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { BrandLogo } from "@/components/atoms/BrandLogo";

interface HeaderProps {
  onCreateTask: () => void;
  onCreateProject: () => void;
}

export function Header({ onCreateTask, onCreateProject }: HeaderProps) {
  const notifications = [
    {
      id: 1,
      title: "Nova tarefa atribuída",
      time: "2 min atrás",
      unread: true,
    },
    {
      id: 2,
      title: "Deadline se aproximando",
      time: "1 hora atrás",
      unread: true,
    },
    {
      id: 3,
      title: "Comentário adicionado",
      time: "3 horas atrás",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BrandLogo />
            <h1 className="text-xl font-bold text-brand-primary">
              TaskFlow Pro
            </h1>
          </div>
        </div>

        {/* Actions */}
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
              <DropdownMenuItem onClick={onCreateTask}>
                New Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onCreateProject}>
                New Project
              </DropdownMenuItem>
              <DropdownMenuItem>Nova Equipe</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
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
                  {notifications.map((notification) => (
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

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <BrandLogo className="rounded-full" />
                <span className="hidden md:block">Users name</span>
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
