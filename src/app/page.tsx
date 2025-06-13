"use client";
import { Header } from "@/components/organisms/header";
import { useGetNotifications } from "@/services/hooks/useGetNotifications";
import { useState } from "react";

export default function Home() {
  const notifications = useGetNotifications();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Header
        notifications={notifications}
        onCreateTask={() => setIsTaskModalOpen(true)}
        onCreateProject={() => setIsProjectModalOpen(true)}
      />
    </div>
  );
}
