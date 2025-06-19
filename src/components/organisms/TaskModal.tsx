"use client";

import { useEffect, useState } from "react";
import {
  Flag,
  User,
  MessageCircle,
  Paperclip,
  Plus,
  X,
  CalendarIcon,
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getInitials } from "@/utils/getInitials";
import { Comment, Task } from "@/services/types/task.types";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface TaskModalProps {
  createTask: UseMutationResult<Task, Error, Task, unknown>;
  updateTask: UseMutationResult<Task, Error, Task, unknown>;
  deleteTask: UseMutationResult<void, Error, string, unknown>;
  isOpen: boolean;
  onClose: () => void;
  selectedTask?: Task;
}

const taskModalSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  tags: z.array(z.string()).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  assignee: z.string().min(1, {
    message: "Assignee is required.",
  }),
  deadline: z.date({
    message: "Deadline is required.",
  }),
  file: z.any().optional(),
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
];

const AVAILABLE_PRIORITIES = ["low", "medium", "high"];

export function TaskModal({
  createTask,
  updateTask,
  deleteTask,
  isOpen,
  onClose,
  selectedTask,
}: TaskModalProps) {
  const userName = useSelector((state: RootState) => state.user.userName);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const form = useForm<z.infer<typeof taskModalSchema>>({
    resolver: zodResolver(taskModalSchema),
    defaultValues: {
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      tags: selectedTask?.tags || [],
      priority: selectedTask?.priority || "medium",
      assignee: selectedTask?.assignee?.name || "",
      deadline: selectedTask?.deadline
        ? new Date(selectedTask.deadline)
        : undefined,
    },
  });

  const isTaskIdUndefined =
    selectedTask?.id === undefined || selectedTask?.id === "";

  const handleAddComment = () => {
    setComments((prevComments) => [
      ...prevComments,
      {
        id: crypto.randomUUID(),
        author: userName,
        avatar: getInitials(userName),
        content: newComment,
        time: new Date().toLocaleString(),
      },
    ]);
    setNewComment("");
  };

  const onSubmit = (values: z.infer<typeof taskModalSchema>) => {
    if (selectedTask?.id !== undefined && selectedTask?.id !== "") {
      updateTask.mutate(
        {
          id: selectedTask.id,
          title: values.title,
          description: values.description,
          assignee: {
            name: values.assignee,
            avatar: getInitials(values.assignee),
          },
          deadline: values.deadline.toISOString(),
          priority: values.priority || "medium",
          comments: comments,
          attachments: [],
          tags: values.tags || [],
          columnId:
            selectedTask?.columnId && selectedTask.columnId.length > 0
              ? selectedTask.columnId
              : "backlog",
        },
        {
          onSuccess: () => {
            setComments([]);
            onClose();
            form.reset();
          },
          onError: (error) => {
            console.error("Error creating/updating task:", error);
          },
        }
      );
    } else {
      createTask.mutate(
        {
          id: crypto.randomUUID(),
          title: values.title,
          description: values.description,
          assignee: {
            name: values.assignee,
            avatar: getInitials(values.assignee),
          },
          deadline: values.deadline.toISOString(),
          priority: values.priority || "medium",
          comments: comments,
          attachments: [],
          tags: values.tags || [],
          columnId:
            selectedTask?.columnId && selectedTask.columnId.length > 0
              ? selectedTask.columnId
              : "backlog",
        },
        {
          onSuccess: () => {
            setComments([]);
            onClose();
            form.reset();
          },
          onError: (error) => {
            console.error("Error creating/updating task:", error);
          },
        }
      );
    }
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

  const handleDeleteTask = () => {
    if (selectedTask?.id) {
      deleteTask.mutate(selectedTask.id, {
        onSuccess: () => {
          setComments([]);
          onClose();
          form.reset();
        },
        onError: (error) => {
          console.error("Error deleting task:", error);
        },
      });
    }
  };

  useEffect(() => {
    if (!selectedTask) {
      setComments([]);
    } else if (selectedTask.comments && selectedTask.comments.length > 0) {
      setComments(selectedTask.comments);
    }
  }, [selectedTask]);

  useEffect(() => {
    if (selectedTask) {
      form.reset({
        title: selectedTask.title || "",
        description: selectedTask.description || "",
        tags: selectedTask.tags || [],
        priority: selectedTask.priority || "medium",
        assignee: selectedTask.assignee?.name || "",
        deadline: selectedTask.deadline
          ? new Date(selectedTask.deadline)
          : undefined,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        tags: [],
        priority: "medium",
        assignee: "",
        deadline: undefined,
      });
    }
  }, [selectedTask, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:min-w-[32rem] lg:min-w-4xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-brand-primary">
                {!isTaskIdUndefined ? "Edit Task" : "New Task"}
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

                    <FormField
                      control={form.control}
                      name="tags"
                      render={() => (
                        <FormItem>
                          <DropdownMenu>
                            <FormControl>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add
                                </Button>
                              </DropdownMenuTrigger>
                            </FormControl>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                        {getInitials(userName)}
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
                      <Button
                        type="button"
                        onClick={handleAddComment}
                        size="sm"
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Priority */}
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Flag className="w-4 h-4 mr-2" />
                        Priority
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {AVAILABLE_PRIORITIES.map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              {priority.charAt(0).toUpperCase() +
                                priority.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Assignee */}
                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Assignee
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select person" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ana Silva">Ana Silva</SelectItem>
                          <SelectItem value="João Santos">
                            João Santos
                          </SelectItem>
                          <SelectItem value="Carlos Lima">
                            Carlos Lima
                          </SelectItem>
                          <SelectItem value="Maria Costa">
                            Maria Costa
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Deadline */}
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        {" "}
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Deadline
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Attachments */}
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attachments
                      </FormLabel>
                      <FormControl>
                        <Input type="file" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <div className="pt-4 space-y-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-brand-accent hover:bg-brand-hover w-full"
                  >
                    {!isTaskIdUndefined ? "Save Changes" : "Create Task"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                  {!isTaskIdUndefined && (
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleDeleteTask}
                    >
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
