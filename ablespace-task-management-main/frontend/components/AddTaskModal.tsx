"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { Status } from "@/lib/types";
import { useAppStore } from "@/lib/store";

export default function AddTaskModal({
  status,
  onClose,
}: {
  status: Status | null;
  onClose: () => void;
}) {
  const addTask = useAppStore((s) => s.addTask);
  const projects = useAppStore((s) => s.projects);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "p1");

  return (
    <AnimatePresence>
      {status && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-5 shadow-[var(--shadow-pop)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">New Task</h3>
              <button onClick={onClose} className="rounded p-1 hover:bg-surface-2">
                <X size={15} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!title.trim() || !status) return;
                addTask({ title: title.trim(), status, projectId });
                setTitle("");
                onClose();
              }}
              className="flex flex-col gap-3"
            >
              <input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title..."
                className="rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="rounded-lg border border-border bg-bg px-3 py-2 text-sm outline-none focus:border-accent"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="mt-1 rounded-lg bg-accent py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
              >
                Add Task
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
