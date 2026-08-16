"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, MoreHorizontal } from "lucide-react";
import { Status, Task } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import TaskCard from "./TaskCard";

const COLUMNS: { key: Status; label: string; dot: string }[] = [
  { key: "todo", label: "To Do", dot: "#a6a6ad" },
  { key: "doing", label: "Doing", dot: "#d6a419" },
  { key: "completed", label: "Completed", dot: "#2eb872" },
  { key: "on-hold", label: "On Hold", dot: "#e0345c" },
];

export default function TaskBoard({
  tasks,
  onOpenTask,
  onAddTask,
}: {
  tasks: Task[];
  onOpenTask: (t: Task) => void;
  onAddTask: (status: Status) => void;
}) {
  const moveTask = useAppStore((s) => s.moveTask);
  const [dragOverCol, setDragOverCol] = useState<Status | null>(null);

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-4">
      {COLUMNS.map((col, ci) => {
        const colTasks = tasks.filter((t) => t.status === col.key);
        return (
          <motion.div
            key={col.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: ci * 0.05 }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverCol(col.key);
            }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData("text/task-id");
              if (id) moveTask(id, col.key);
              setDragOverCol(null);
            }}
            className={`flex w-72 shrink-0 flex-col rounded-xl transition-colors ${
              dragOverCol === col.key ? "bg-accent-soft/50" : ""
            }`}
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: col.dot }} />
                <h3 className="text-[13px] font-semibold text-text">{col.label}</h3>
                <span className="text-[11px] text-text-faint">{colTasks.length}</span>
              </div>
              <div className="flex items-center gap-0.5 text-text-faint">
                <button
                  onClick={() => onAddTask(col.key)}
                  className="rounded p-1 hover:bg-surface-2 hover:text-text"
                >
                  <Plus size={14} />
                </button>
                <button className="rounded p-1 hover:bg-surface-2 hover:text-text">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              {colTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onOpen={() => onOpenTask(task)}
                  onDragStart={(e) => e.dataTransfer.setData("text/task-id", task.id)}
                />
              ))}
              {colTasks.length === 0 && (
                <div className="rounded-xl border border-dashed border-border px-3 py-6 text-center text-xs text-text-faint">
                  Drop a task here
                </div>
              )}
              <button
                onClick={() => onAddTask(col.key)}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-xs font-medium text-text-faint hover:bg-surface-2 hover:text-text"
              >
                <Plus size={13} /> Add Task
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
