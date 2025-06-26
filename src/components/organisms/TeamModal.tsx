"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Team } from "@/services/types/team.types";
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

interface TeamModalProps {
  createTeam: UseMutationResult<Team, Error, Team, unknown>;
  isOpen: boolean;
  onClose: () => void;
}

const teamModalSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
});

export function TeamModal({ createTeam, isOpen, onClose }: TeamModalProps) {
  const form = useForm<z.infer<typeof teamModalSchema>>({
    resolver: zodResolver(teamModalSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
    },
  });

  const onSubmit = (values: z.infer<typeof teamModalSchema>) => {
    createTeam.mutate(
      {
        id: crypto.randomUUID(),
        name: values.name,
        email: values.email,
        position: values.position,
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
                New Member
              </DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter member name..."
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter member email..."
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
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                    Position
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter member position..."
                      {...field}
                      className="mb-4"
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
                Create member
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
