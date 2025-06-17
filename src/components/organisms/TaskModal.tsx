"use client";

import { useState } from "react";
import {
  Calendar,
  Flag,
  User,
  MessageCircle,
  Paperclip,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseMutationResult } from "@tanstack/react-query";
import { Task } from "@/services/hooks/useCreateTask";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TaskModalProps {
  createTask: UseMutationResult<Task, Error, Task, unknown>;
  isOpen: boolean;
  onClose: () => void;
  task?: any; //TODO fix type
}

const taskModalSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  tags: z.array(z.string()).optional(),
});

const AVAILABLE_TAGS = [
  "Backend",
  "Frontend",
  "DevOps",
  "Security",
  "Testing",
  "UI/UX",
  "Database",
  "Mobile",
  "API",
  "Infrastructure",
] as const;

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [assignee, setAssignee] = useState(task?.assignee?.name || "");
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [newComment, setNewComment] = useState("");

  const form = useForm<z.infer<typeof taskModalSchema>>({
    resolver: zodResolver(taskModalSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      tags: task?.tags || [],
    },
  });

  //TODO implement comments
  const comments = [
    {
      id: 1,
      author: "Ana Silva",
      avatar: "AS",
      content: "Precisamos revisar os requisitos antes de prosseguir.",
      time: "2 hours ago",
    },
    {
      id: 2,
      author: "João Santos",
      avatar: "JS",
      content: "Concordo. Vou agendar uma reunião para amanhã.",
      time: "1 hour ago",
    },
  ];

  const handleAddComment = () => {
    if (newComment.trim()) {
      //TODO implement comment saving logic
      setNewComment("");
    }
  };

  const onSubmit = (values: z.infer<typeof taskModalSchema>) => {
    console.log(values);
  };

  const handleTagSelect = (tagName: string) => {
    const currentTags = form.getValues("tags") || [];
    if (currentTags.includes(tagName)) {
      form.setValue(
        "tags",
        currentTags.filter((tag) => tag !== tagName)
      );
    } else {
      form.setValue("tags", [...currentTags, tagName]);
    }
  };

  const handleTagRemove = (tagName: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagName)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:min-w-[32rem] lg:min-w-4xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-brand-primary">
                {task ? "Edit Task" : "New Task"}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe task details..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.watch("tags")?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6">
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {AVAILABLE_TAGS.map((tag) => (
                          <DropdownMenuItem
                            key={tag}
                            onSelect={() => handleTagSelect(tag)}
                          >
                            {tag}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Comments ({comments.length})
                  </h3>

                  <div className="space-y-3 mb-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-brand-primary text-white">
                            {comment.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium">
                                {comment.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {comment.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs bg-brand-primary text-white">
                        JS
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex space-x-2">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAddComment()
                        }
                      />
                      <Button onClick={handleAddComment} size="sm">
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Priority */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                    <Flag className="w-4 h-4 mr-2" />
                    Priority
                  </label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Assignee */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Assignee
                  </label>
                  <Select value={assignee} onValueChange={setAssignee}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select person" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ana Silva">Ana Silva</SelectItem>
                      <SelectItem value="João Santos">João Santos</SelectItem>
                      <SelectItem value="Carlos Lima">Carlos Lima</SelectItem>
                      <SelectItem value="Maria Costa">Maria Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Deadline */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Deadline
                  </label>
                  <Input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>

                {/* Attachments */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attachments
                  </label>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add file
                  </Button>
                </div>

                {/* Actions */}
                <div className="pt-4 space-y-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-brand-accent hover:bg-brand-hover w-full"
                  >
                    {task ? "Save Changes" : "Create Task"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                  {task && (
                    <Button variant="destructive" className="w-full">
                      Delete Task
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
