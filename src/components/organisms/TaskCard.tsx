"use client";

import { Calendar, MessageCircle, Paperclip, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Task } from "@/services/types/task.types";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDragStart: () => void;
}

export function TaskCard({ task, onClick, onDragStart }: TaskCardProps) {
  const priorityColors = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
  };

  const priorityLabels = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const isOverdue = new Date(task.deadline) < new Date();

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={onClick}
      draggable
      onDragStart={onDragStart}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Priority */}
      <div className="flex items-center mb-3">
        <Flag className={`w-4 h-4 mr-1 ${priorityColors[task.priority]}`} />
        <span
          className={`text-sm font-medium ${priorityColors[task.priority]}`}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Assignee */}
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="text-xs bg-[#1A365D] text-white">
              {task.assignee.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600 hidden sm:block">
            {task.assignee.name.split(" ")[0]}
          </span>
        </div>

        {/* Meta info */}
        <div className="flex items-center space-x-3 text-gray-500">
          {task.comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span className="text-xs">{task.comments}</span>
            </div>
          )}

          {task.attachments.length > 0 && (
            <div className="flex items-center space-x-1">
              <Paperclip className="w-3 h-3" />
              <span className="text-xs">{task.attachments.length}</span>
            </div>
          )}

          <div
            className={`flex items-center space-x-1 ${
              isOverdue ? "text-red-500" : ""
            }`}
          >
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{formatDate(task.deadline)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
