"use client";

import { Task } from "@/lib/types";
import { Avatar, LabelChip, PriorityBadge, formatDate } from "./ui";

export default function TaskCard({
  task,
  onOpen,
  onDragStart,
}: {
  task: Task;
  onOpen: () => void;
  onDragStart: (e: React.DragEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      draggable
      onDragStart={onDragStart}
      onClick={onOpen}
      className="w-full cursor-grab rounded-xl border border-border bg-surface p-3 text-left shadow-[var(--shadow-card)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-pop)] active:scale-[0.99] active:cursor-grabbing"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-[13px] font-medium leading-snug text-text">{task.title}</p>
      </div>
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Avatar name={task.member} size={20} />
        </div>
        {task.dueDate && (
          <span className="rounded bg-danger-soft px-1.5 py-0.5 text-[11px] font-medium text-danger">
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {task.labels.slice(0, 2).map((l, i) => (
          <LabelChip key={i} label={l} />
        ))}
      </div>
      <div className="mt-2">
        <PriorityBadge priority={task.priority} />
      </div>
    </button>
  );
}
