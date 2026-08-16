"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Avatar, PriorityBadge, formatDate } from "./ui";

export default function ProjectsPage() {
  const projects = useAppStore((s) => s.projects);
  const [query, setQuery] = useState("");
  const filtered = projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-text">Projects</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5">
            <Search size={14} className="text-text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-32 bg-transparent text-sm outline-none placeholder:text-text-faint"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-[#171718] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
            <Plus size={14} /> Add Project
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wide text-text-faint">
              <th className="px-4 py-2 font-medium">Projects</th>
              <th className="px-4 py-2 font-medium">Priority</th>
              <th className="px-4 py-2 font-medium">Lead</th>
              <th className="px-4 py-2 font-medium">Due Date</th>
              <th className="w-10 px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-b-0 hover:bg-surface-2">
                <td className="px-4 py-2.5 font-medium text-accent">{p.name}</td>
                <td className="px-4 py-2.5">
                  <PriorityBadge priority={p.priority} />
                </td>
                <td className="px-4 py-2.5">
                  <Avatar name={p.lead} size={20} />
                </td>
                <td className="px-4 py-2.5 text-text-muted">{formatDate(p.dueDate)}</td>
                <td className="px-4 py-2.5 text-text-faint">
                  <MoreHorizontal size={15} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
