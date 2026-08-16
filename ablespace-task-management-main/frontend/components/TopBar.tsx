"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Search, SlidersHorizontal, Plus, LayoutGrid, List, Filter } from "lucide-react";
import { Fields } from "./TaskListView";

export default function TopBar({
  title,
  query,
  onQuery,
  view,
  onViewChange,
  fields,
  onFieldsChange,
  onAddTask,
}: {
  title: string;
  query: string;
  onQuery: (v: string) => void;
  view: "board" | "list";
  onViewChange: (v: "board" | "list") => void;
  fields: Fields;
  onFieldsChange: (f: Fields) => void;
  onAddTask: () => void;
}) {
  const [fieldsOpen, setFieldsOpen] = useState(false);

  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-text">{title}</h1>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5">
          <Search size={14} className="text-text-faint" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search..."
            className="w-32 bg-transparent text-sm outline-none placeholder:text-text-faint"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setFieldsOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-text hover:bg-surface-2"
          >
            <SlidersHorizontal size={14} /> Fields
          </button>
          <AnimatePresence>
            {fieldsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute right-0 top-10 z-20 w-40 rounded-lg border border-border bg-surface p-1 shadow-[var(--shadow-pop)]"
              >
                {(
                  [
                    ["status", "Status"],
                    ["priority", "Priority"],
                    ["members", "Members"],
                    ["dueDate", "Due Date"],
                    ["labels", "Labels"],
                    ["reporter", "Reporter"],
                  ] as [keyof Fields, string][]
                ).map(([key, label]) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 text-sm hover:bg-surface-2"
                  >
                    {label}
                    <input
                      type="checkbox"
                      checked={fields[key]}
                      onChange={(e) => onFieldsChange({ ...fields, [key]: e.target.checked })}
                      className="accent-[var(--accent)]"
                    />
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-text hover:bg-surface-2">
          <Filter size={14} />
        </button>

        <div className="flex items-center rounded-lg border border-border bg-surface p-0.5">
          <button
            onClick={() => onViewChange("board")}
            className={`rounded-md p-1.5 ${view === "board" ? "bg-accent-soft text-accent" : "text-text-faint"}`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`rounded-md p-1.5 ${view === "list" ? "bg-accent-soft text-accent" : "text-text-faint"}`}
          >
            <List size={14} />
          </button>
        </div>

        <button
          onClick={onAddTask}
          className="flex items-center gap-1.5 rounded-lg bg-[#171718] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={14} /> Add Task
        </button>
      </div>
    </div>
  );
}
