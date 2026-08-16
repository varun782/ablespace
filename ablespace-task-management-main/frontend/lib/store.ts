"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AccentColor, GuestUser, Project, Status, ThemeMode, Task } from "./types";
import { seedProjects, seedTasks } from "./seed";
import { api } from "./api";

interface AppState {
  // session
  user: GuestUser | null;
  loginAsGuest: () => void;
  logout: () => void;
  updateProfile: (patch: Partial<GuestUser>) => void;

  // theme
  theme: ThemeMode;
  accent: AccentColor;
  setTheme: (t: ThemeMode) => void;
  setAccent: (a: AccentColor) => void;

  // data
  tasks: Task[];
  projects: Project[];
  usingBackend: boolean;
  hydrateTasks: () => Promise<void>;
  addTask: (partial: Partial<Task> & { title: string; status: Status; projectId: string }) => Promise<void>;
  moveTask: (id: string, status: Status) => Promise<void>;
  updateTask: (id: string, patch: Partial<Task>) => Promise<void>;
  addComment: (taskId: string, author: string, text: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      loginAsGuest: () =>
        set({
          user: {
            fullName: "Guest User",
            title: "Designer",
            username: "guest",
            email: "guest@dexter.app",
            isGuest: true,
          },
        }),
      logout: () => set({ user: null }),
      updateProfile: (patch) =>
        set((s) => ({ user: s.user ? { ...s.user, ...patch } : s.user })),

      theme: "light",
      accent: "blue",
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),

      tasks: seedTasks,
      projects: seedProjects,
      usingBackend: false,

      hydrateTasks: async () => {
        try {
          const tasks = await api.getTasks();
          if (Array.isArray(tasks) && tasks.length > 0) {
            set({ tasks, usingBackend: true });
          }
        } catch {
          // Backend not reachable yet — keep local seed data so the UI still works.
          set({ usingBackend: false });
        }
      },

      addTask: async (partial) => {
        const local: Task = {
          id: `local-${Date.now()}`,
          title: partial.title,
          status: partial.status,
          projectId: partial.projectId,
          priority: partial.priority ?? "no-priority",
          labels: partial.labels ?? [],
          subtasks: [],
          comments: [],
          dueDate: partial.dueDate,
          member: partial.member,
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ tasks: [...s.tasks, local] }));
        if (get().usingBackend) {
          try {
            const created = await api.createTask(local);
            set((s) => ({ tasks: s.tasks.map((t) => (t.id === local.id ? created : t)) }));
          } catch {
            /* keep optimistic local task */
          }
        }
      },

      moveTask: async (id, status) => {
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)) }));
        if (get().usingBackend) {
          api.updateTask(id, { status }).catch(() => {});
        }
      },

      updateTask: async (id, patch) => {
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
        if (get().usingBackend) {
          api.updateTask(id, patch).catch(() => {});
        }
      },

      addComment: (taskId, author, text) => {
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  comments: [
                    ...t.comments,
                    { id: `c-${Date.now()}`, author, text, createdAt: "just now" },
                  ],
                }
              : t
          ),
        }));
      },
    }),
    {
      name: "dexter-app-storage",
      partialize: (s) => ({
        user: s.user,
        theme: s.theme,
        accent: s.accent,
        tasks: s.tasks,
      }),
    }
  )
);
