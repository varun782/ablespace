"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import GuestLogin from "@/components/GuestLogin";
import Sidebar, { View } from "@/components/Sidebar";
import TasksPage from "@/components/TasksPage";
import ProjectsPage from "@/components/ProjectsPage";
import SettingsPage from "@/components/SettingsPage";

export default function Home() {
  const user = useAppStore((s) => s.user);
  const [view, setView] = useState<View>("tasks");

  if (!user) return <GuestLogin />;

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar view={view} onChange={setView} />
      <main className="flex-1 overflow-hidden px-6 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="h-full"
          >
            {view === "tasks" && <TasksPage />}
            {view === "projects" && <ProjectsPage />}
            {view === "settings" && <SettingsPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
