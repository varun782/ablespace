"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Settings2, Plus, Calendar, Users, UserCircle2 } from "lucide-react";
import { Status, Task, STATUS_META } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { Avatar, PriorityBadge, PriorityMenuItems, formatDate } from "./ui";

const STATUS_ORDER: Status[] = ["on-hold", "todo", "doing", "completed"];

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="flex items-center gap-1.5 text-xs text-text-faint">
        <Icon size={13} />
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export default function TaskDetailsCard({ task }: { task: Task }) {
  const updateTask = useAppStore((s) => s.updateTask);
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);

  return (
    <div className="w-64 shrink-0 rounded-xl border border-border bg-surface-2/40 p-3.5">
      <div className="mb-1 flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-text-faint">Details</h4>
        <div className="flex items-center gap-1 text-text-faint">
          <button className="rounded p-1 hover:bg-surface-2 hover:text-text" title="Configure fields">
            <Settings2 size={13} />
          </button>
          <button className="rounded p-1 hover:bg-surface-2 hover:text-text" title="Add a field">
            <Plus size={13} />
          </button>
        </div>
      </div>

      <Row icon={Users} label="Status">
        <div className="relative">
          <button
            onClick={() => setStatusOpen((v) => !v)}
            className="rounded-md px-1.5 py-0.5 font-medium text-text hover:bg-surface-2"
          >
            {STATUS_META[task.status].label}
          </button>
          <AnimatePresence>
            {statusOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute right-0 top-8 z-10 w-36 rounded-lg border border-border bg-surface p-1 shadow-[var(--shadow-pop)]"
              >
                {STATUS_ORDER.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      updateTask(task.id, { status: s });
                      setStatusOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-surface-2 ${
                      task.status === s ? "font-medium text-accent" : "text-text"
                    }`}
                  >
                    {STATUS_META[s].label}
                    {task.status === s && <span>✓</span>}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Row>

      <Row icon={UserCircle2} label="Priority">
        <div className="relative">
          <button onClick={() => setPriorityOpen((v) => !v)} className="rounded-md px-1.5 py-0.5 hover:bg-surface-2">
            <PriorityBadge priority={task.priority} />
          </button>
          <AnimatePresence>
            {priorityOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute right-0 top-8 z-10 w-40 rounded-lg border border-border bg-surface shadow-[var(--shadow-pop)]"
              >
                <PriorityMenuItems
                  value={task.priority}
                  onChange={(p) => {
                    updateTask(task.id, { priority: p });
                    setPriorityOpen(false);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Row>

      <Row icon={Users} label="Members">
        {task.member ? (
          <Avatar name={task.member} size={20} />
        ) : (
          <button className="text-xs text-text-faint hover:text-accent">Add members</button>
        )}
      </Row>

      <Row icon={Calendar} label="Dates">
        <span className="text-text-muted">
          {formatDate(task.startDate) || "Start"} → {formatDate(task.dueDate) || "End"}
        </span>
      </Row>

      <Row icon={Users} label="Team">
        {task.team ? (
          <span className="text-text">{task.team}</span>
        ) : (
          <button className="text-xs text-text-faint hover:text-accent">Add team</button>
        )}
      </Row>

      <Row icon={UserCircle2} label="Reporter">
        {task.reporter ? (
          <span className="flex items-center gap-1.5 text-text">
            <Avatar name={task.reporter} size={18} /> {task.reporter}
          </span>
        ) : (
          <button className="text-xs text-text-faint hover:text-accent">Set reporter</button>
        )}
      </Row>
    </div>
  );
}
