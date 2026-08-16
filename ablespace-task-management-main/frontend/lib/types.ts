export type Priority = "no-priority" | "urgent" | "high" | "medium" | "low";

export type Status = "todo" | "doing" | "completed" | "on-hold";

export const STATUS_META: Record<Status, { label: string }> = {
  todo: { label: "To Do" },
  doing: { label: "In Progress" },
  completed: { label: "Done" },
  "on-hold": { label: "Backlog" },
};

export interface Subtask {
  id: string;
  title: string;
  priority: Priority;
  member?: string;
  dueDate?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  labels: string[];
  startDate?: string;
  dueDate?: string;
  member?: string;
  team?: string;
  reporter?: string;
  projectId: string;
  subtasks: Subtask[];
  comments: Comment[];
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  priority: Priority;
  lead?: string;
  dueDate?: string;
}

export type ThemeMode = "light" | "dark";
export type AccentColor = "amber" | "blue" | "pink" | "rose" | "emerald" | "black";

export interface GuestUser {
  fullName: string;
  title: string;
  username: string;
  email: string;
  isGuest: true;
}
