"use client";

import { useMemo, useState } from "react";
import { Status, Task } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import TopBar from "./TopBar";
import TaskBoard from "./TaskBoard";
import TaskListView, { Fields } from "./TaskListView";
import TaskDetailPanel from "./TaskDetailPanel";
import AddTaskModal from "./AddTaskModal";

export default function TasksPage() {
  const tasks = useAppStore((s) => s.tasks);
  const [view, setView] = useState<"board" | "list">("board");
  const [query, setQuery] = useState("");
  const [fields, setFields] = useState<Fields>({
    priority: true,
    members: true,
    dueDate: true,
    labels: false,
    status: false,
    reporter: false,
  });
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [addStatus, setAddStatus] = useState<Status | null>(null);

  const filtered = useMemo(
    () => tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())),
    [tasks, query]
  );

  // keep the open panel's task fresh as the store updates
  const liveOpenTask = openTask ? filtered.find((t) => t.id === openTask.id) ?? openTask : null;

  return (
    <div className="flex h-full flex-col">
      <TopBar
        title="Tasks"
        query={query}
        onQuery={setQuery}
        view={view}
        onViewChange={setView}
        fields={fields}
        onFieldsChange={setFields}
        onAddTask={() => setAddStatus("todo")}
      />

      <div className="flex-1 overflow-auto">
        {view === "board" ? (
          <TaskBoard tasks={filtered} onOpenTask={setOpenTask} onAddTask={setAddStatus} />
        ) : (
          <TaskListView
            tasks={filtered}
            fields={fields}
            onOpenTask={setOpenTask}
            onAddTask={setAddStatus}
          />
        )}
      </div>

      <TaskDetailPanel task={liveOpenTask} onClose={() => setOpenTask(null)} />
      <AddTaskModal status={addStatus} onClose={() => setAddStatus(null)} />
    </div>
  );
}
