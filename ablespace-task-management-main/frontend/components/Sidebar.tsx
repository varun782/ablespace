"use client";

import { LayoutGrid, ListTodo, FolderKanban, ChevronsUpDown, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { Avatar } from "./ui";

export type View = "tasks" | "projects" | "settings";

export default function Sidebar({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const [menuOpen, setMenuOpen] = useState(false);

  const items: { key: View; label: string; icon: React.ElementType }[] = [
    { key: "tasks", label: "Tasks", icon: ListTodo },
    { key: "projects", label: "Projects", icon: FolderKanban },
  ];

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-sidebar-bg px-3 py-4 text-sidebar-text">
      <div className="relative mb-1">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <LayoutGrid size={15} />
          </span>
          <span className="flex-1 text-left text-sm font-medium">{user?.fullName ?? "Dexter"}</span>
          <ChevronsUpDown size={14} className="text-sidebar-text/50" />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-11 z-20 overflow-hidden rounded-lg border border-border bg-surface p-1 text-text shadow-[var(--shadow-pop)]"
            >
              <button
                onClick={() => {
                  onChange("settings");
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm hover:bg-surface-2"
              >
                <Settings size={14} /> Settings
              </button>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-danger hover:bg-danger-soft"
              >
                <LogOut size={14} /> Leave workspace
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mb-1 mt-4 px-2 text-[11px] font-medium uppercase tracking-wide text-sidebar-text/40">
        Workspace
      </p>
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = view === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                active ? "bg-accent-soft text-accent" : "hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-white/5">
        <Avatar name={user?.fullName} size={26} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-sidebar-text">{user?.fullName}</p>
          <p className="truncate text-[11px] text-sidebar-text/50">{user?.email}</p>
        </div>
      </div>
    </aside>
  );
}
