"use client";

import type React from "react";
import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskCard } from "./TaskCard";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { Column } from "@/services/hooks/useGetColumns";
import { Task } from "@/services/types/task.types";
import { Skeleton } from "../ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface KanbanBoardProps {
  tasks: UseQueryResult<Task[]>;
  columns: UseQueryResult<Column[]>;
  updateTask: UseMutationResult<Task, Error, Task, unknown>;
  onTaskClick: (task: Task) => void;
  onCreateTask: () => void;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
}

export function KanbanBoard({
  tasks,
  columns,
  updateTask,
  onTaskClick,
  onCreateTask,
  setSelectedTask,
}: KanbanBoardProps) {
  const selectedProjectId = useSelector(
    (state: RootState) => state.project.selectedProject?.id
  );
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);
  const tasksFromSelectedProject = tasks.data?.filter(
    (task) => task.projectId === selectedProjectId
  );

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();

    if (!draggedTask || !draggedFrom || draggedFrom === targetColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }

    updateTask.mutate({
      ...draggedTask,
      columnId: targetColumnId,
    });

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const handleAddTask = (columnId: string) => {
    setSelectedTask({
      id: "",
      title: "",
      description: "",
      assignee: {
        name: "",
        avatar: "",
      },
      deadline: "",
      priority: "low",
      comments: [],
      attachments: [],
      tags: [],
      projectId: "",
      columnId: columnId,
    });
    onCreateTask();
  };

  if (tasks.isLoading || columns.isLoading) {
    return (
      <div className="flex">
        <div className="flex flex-col p-6">
          <Skeleton className="h-[56px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[190px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[56px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[190px] w-[320px] mb-[16px]" />
        </div>
        <div className="flex flex-col p-6">
          <Skeleton className="h-[56px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[190px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[56px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[190px] w-[320px] mb-[16px]" />
        </div>
        <div className="flex flex-col p-6">
          <Skeleton className="h-[56px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[190px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[56px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[190px] w-[320px] mb-[16px]" />
        </div>
        <div className="flex flex-col p-6">
          <Skeleton className="h-[56px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[190px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[56px] w-[320px] mb-[16px]" />
          <Skeleton className="h-[190px] w-[320px] mb-[16px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Alpha Project</h2>
        <div className="flex items-center space-x-2">
          {/* TODO implement filter */}
          <Button variant="outline" size="sm">
            Filter
          </Button>
          {/* TODO implement sort */}
          <Button variant="outline" size="sm">
            Sort
          </Button>
        </div>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4">
        {columns.data?.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className={`rounded-lg p-4 ${column.color} mb-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-800">
                    {column.title}
                  </h3>
                  <span className="bg-white px-2 py-1 rounded-full text-xs font-medium">
                    {
                      tasksFromSelectedProject?.filter(
                        (task) => task.columnId === column.id
                      ).length
                    }
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleAddTask(column.id)}>
                      Add task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {tasksFromSelectedProject
                ?.filter((task) => task.columnId === column.id)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                    onDragStart={() => handleDragStart(task, column.id)}
                  />
                ))}

              <Button
                variant="ghost"
                className="w-full border-2 border-dashed border-gray-300 h-12 text-gray-500 hover:border-gray-400 hover:text-gray-600"
                onClick={() => handleAddTask(column.id)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add task
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
