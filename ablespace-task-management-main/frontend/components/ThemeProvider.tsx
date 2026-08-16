"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((s) => s.theme);
  const accent = useAppStore((s) => s.accent);
  const hydrateTasks = useAppStore((s) => s.hydrateTasks);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.setAttribute("data-accent", accent);
  }, [theme, accent]);

  useEffect(() => {
    hydrateTasks();
  }, [hydrateTasks]);

  return <>{children}</>;
}
