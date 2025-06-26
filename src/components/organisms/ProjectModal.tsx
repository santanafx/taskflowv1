"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/services/types/project.types";
import { generateRandomColor } from "@/utils/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface ProjectModalProps {
  createProject: UseMutationResult<Project, Error, Project, unknown>;
  isOpen: boolean;
  onClose: () => void;
}

const projectModalSchema = z.object({
  projectName: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function ProjectModal({
  createProject,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const form = useForm<z.infer<typeof projectModalSchema>>({
    resolver: zodResolver(projectModalSchema),
    defaultValues: {
      projectName: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof projectModalSchema>) => {
    createProject.mutate(
      {
        id: crypto.randomUUID(),
        name: values.projectName,
        description: values.description,
        color: generateRandomColor(),
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
        onError: (error) => {
          console.error("Error creating project:", error);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-brand-primary">
                New Project
              </DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                    Project Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project name..."
                      {...field}
                      className="mb-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="Describe the project objective..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-2 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-brand-accent hover:bg-brand-hover"
              >
                Create Project
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
