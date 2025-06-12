"use client";
import { Header } from "@/components/organisms/header";
import { useState } from "react";

export default function Home() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Header
        onCreateTask={() => setIsTaskModalOpen(true)}
        onCreateProject={() => setIsProjectModalOpen(true)}
      />
    </div>
  );
}
