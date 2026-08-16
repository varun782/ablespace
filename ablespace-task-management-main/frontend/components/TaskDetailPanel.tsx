"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X, Send } from "lucide-react";
import { Task } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { Avatar, LabelChip, PriorityBadge, formatDate } from "./ui";
import TaskDetailsCard from "./TaskDetailsCard";

export default function TaskDetailPanel({
  task,
  onClose,
}: {
  task: Task | null;
  onClose: () => void;
}) {
  const updateTask = useAppStore((s) => s.updateTask);
  const addComment = useAppStore((s) => s.addComment);
  const user = useAppStore((s) => s.user);
  const [comment, setComment] = useState("");

  return (
    <AnimatePresence>
      {task && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
          />
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-40 flex h-screen w-full max-w-2xl flex-col overflow-y-auto border-l border-border bg-surface shadow-[var(--shadow-pop)]"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-3">
              <div className="flex items-center gap-1.5 text-xs text-text-faint">
                <span>Tasks</span> / <span className="text-text">{task.title}</span>
              </div>
              <button onClick={onClose} className="rounded-md p-1.5 hover:bg-surface-2">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 px-6 py-5">
              <input
                defaultValue={task.title}
                onBlur={(e) => updateTask(task.id, { title: e.target.value })}
                className="w-full bg-transparent text-xl font-semibold text-text outline-none"
              />
              <textarea
                defaultValue={task.description}
                placeholder="Add a description..."
                onBlur={(e) => updateTask(task.id, { description: e.target.value })}
                rows={2}
                className="mt-1.5 w-full resize-none bg-transparent text-sm text-text-muted outline-none placeholder:text-text-faint"
              />

              <div className="mt-4 flex gap-6">
                <div className="flex-1">
                  <span className="text-xs text-text-faint">Labels</span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {task.labels.length > 0 ? (
                      task.labels.map((l, i) => <LabelChip key={i} label={l} />)
                    ) : (
                      <span className="text-xs text-text-faint">No labels</span>
                    )}
                  </div>
                </div>
                <TaskDetailsCard task={task} />
              </div>

              {task.subtasks.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-faint">
                    Subtasks
                  </h4>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-border text-[11px] uppercase text-text-faint">
                          <th className="px-3 py-1.5 font-medium">Task</th>
                          <th className="px-3 py-1.5 font-medium">Priority</th>
                          <th className="px-3 py-1.5 font-medium">Members</th>
                          <th className="px-3 py-1.5 font-medium">Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {task.subtasks.map((sub) => (
                          <tr key={sub.id} className="border-b border-border last:border-b-0">
                            <td className="px-3 py-2">{sub.title}</td>
                            <td className="px-3 py-2">
                              <PriorityBadge priority={sub.priority} />
                            </td>
                            <td className="px-3 py-2">
                              <Avatar name={sub.member} size={18} />
                            </td>
                            <td className="px-3 py-2 text-text-muted">{formatDate(sub.dueDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-faint">
                  Comments
                </h4>
                <div className="flex flex-col gap-3">
                  {task.comments.map((c) => (
                    <div key={c.id} className="flex gap-2.5">
                      <Avatar name={c.author} size={22} />
                      <div>
                        <p className="text-xs">
                          <span className="font-medium text-text">{c.author}</span>{" "}
                          <span className="text-text-faint">{c.createdAt}</span>
                        </p>
                        <p className="text-sm text-text-muted">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!comment.trim()) return;
                    addComment(task.id, user?.fullName ?? "Guest", comment.trim());
                    setComment("");
                  }}
                  className="mt-3 flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5"
                >
                  <Avatar name={user?.fullName} size={20} />
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a reply..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-faint"
                  />
                  <button type="submit" className="text-accent hover:opacity-70">
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
