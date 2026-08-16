"use client";

import { motion } from "framer-motion";
import { ChevronDown, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { Status, Task, STATUS_META } from "@/lib/types";
import { Avatar, LabelChip, PriorityBadge, formatDate } from "./ui";

const GROUPS: { key: Status; label: string }[] = [
  { key: "todo", label: "To Do" },
  { key: "doing", label: "Doing" },
  { key: "completed", label: "Completed" },
  { key: "on-hold", label: "On Hold" },
];

export interface Fields {
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  labels: boolean;
  status: boolean;
  reporter: boolean;
}

export default function TaskListView({
  tasks,
  fields,
  onOpenTask,
  onAddTask,
}: {
  tasks: Task[];
  fields: Fields;
  onOpenTask: (t: Task) => void;
  onAddTask: (status: Status) => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col gap-6">
      {GROUPS.map((group, gi) => {
        const groupTasks = tasks.filter((t) => t.status === group.key);
        const isCollapsed = collapsed[group.key];
        return (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: gi * 0.04 }}
          >
            <button
              onClick={() => setCollapsed((c) => ({ ...c, [group.key]: !c[group.key] }))}
              className="mb-1.5 flex items-center gap-1.5 px-1 text-[13px] font-semibold text-text"
            >
              <motion.span animate={{ rotate: isCollapsed ? -90 : 0 }} transition={{ duration: 0.15 }}>
                <ChevronDown size={14} />
              </motion.span>
              {group.label}
              <span className="text-[11px] font-normal text-text-faint">{groupTasks.length}</span>
            </button>

            {!isCollapsed && (
              <div className="overflow-hidden rounded-xl border border-border bg-surface">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-[11px] uppercase tracking-wide text-text-faint">
                      <th className="px-4 py-2 font-medium">Task</th>
                      {fields.status && <th className="px-4 py-2 font-medium">Status</th>}
                      {fields.priority && <th className="px-4 py-2 font-medium">Priority</th>}
                      {fields.members && <th className="px-4 py-2 font-medium">Members</th>}
                      {fields.dueDate && <th className="px-4 py-2 font-medium">Due Date</th>}
                      {fields.labels && <th className="px-4 py-2 font-medium">Labels</th>}
                      {fields.reporter && <th className="px-4 py-2 font-medium">Reporter</th>}
                      <th className="w-10 px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {groupTasks.map((task) => (
                      <tr
                        key={task.id}
                        onClick={() => onOpenTask(task)}
                        className="cursor-pointer border-b border-border last:border-b-0 hover:bg-surface-2"
                      >
                        <td className="px-4 py-2.5 font-medium text-text">{task.title}</td>
                        {fields.status && (
                          <td className="px-4 py-2.5 text-text-muted">{STATUS_META[task.status].label}</td>
                        )}
                        {fields.priority && (
                          <td className="px-4 py-2.5">
                            <PriorityBadge priority={task.priority} />
                          </td>
                        )}
                        {fields.members && (
                          <td className="px-4 py-2.5">
                            <Avatar name={task.member} size={20} />
                          </td>
                        )}
                        {fields.dueDate && (
                          <td className="px-4 py-2.5 text-text-muted">{formatDate(task.dueDate)}</td>
                        )}
                        {fields.labels && (
                          <td className="px-4 py-2.5">
                            <div className="flex flex-wrap gap-1">
                              {task.labels.slice(0, 2).map((l, i) => (
                                <LabelChip key={i} label={l} />
                              ))}
                            </div>
                          </td>
                        )}
                        {fields.reporter && (
                          <td className="px-4 py-2.5 text-text-muted">{task.reporter ?? "—"}</td>
                        )}
                        <td className="px-4 py-2.5 text-text-faint">
                          <MoreHorizontal size={15} />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={8} className="px-2 py-1.5">
                        <button
                          onClick={() => onAddTask(group.key)}
                          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-text-faint hover:bg-surface-2 hover:text-text"
                        >
                          <Plus size={12} /> Add Task
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
