"use client";

import { useState } from "react";
import { User, Palette, Sun, Moon, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { AccentColor } from "@/lib/types";
import { Avatar } from "./ui";

const ACCENTS: { key: AccentColor; label: string; swatch: string }[] = [
  { key: "amber", label: "Amber", swatch: "#d97706" },
  { key: "blue", label: "Blue", swatch: "#6d5bd0" },
  { key: "pink", label: "Pink", swatch: "#d6499a" },
  { key: "rose", label: "Rose", swatch: "#e0345c" },
  { key: "emerald", label: "Emerald", swatch: "#12946a" },
  { key: "black", label: "Black", swatch: "#171718" },
];

type Tab = "profile" | "theme" | "color";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const user = useAppStore((s) => s.user);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const accent = useAppStore((s) => s.accent);
  const setAccent = useAppStore((s) => s.setAccent);

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "profile", label: "Profile", icon: User },
    { key: "theme", label: "Theme", icon: Sun },
    { key: "color", label: "Color", icon: Palette },
  ];

  return (
    <div className="flex h-full gap-8">
      <div className="w-48 shrink-0">
        <h1 className="mb-4 text-lg font-semibold text-text">Settings</h1>
        <nav className="flex flex-col gap-0.5">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  tab === t.key ? "bg-accent-soft text-accent" : "text-text-muted hover:bg-surface-2"
                }`}
              >
                <Icon size={15} />
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-lg flex-1"
      >
        {tab === "profile" && user && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Profile picture</span>
              <Avatar name={user.fullName} size={40} />
            </div>
            <Field label="Email" value={user.email} readOnly />
            <Field
              label="Full name"
              value={user.fullName}
              onChange={(v) => updateProfile({ fullName: v })}
            />
            <Field
              label="Title"
              hint="Your job title or role"
              value={user.title}
              onChange={(v) => updateProfile({ title: v })}
            />
            <Field
              label="Username"
              hint="One word, like a nickname or first name"
              value={user.username}
              onChange={(v) => updateProfile({ username: v })}
            />
          </div>
        )}

        {tab === "theme" && (
          <div className="grid grid-cols-2 gap-4">
            {(["light", "dark"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={`relative overflow-hidden rounded-xl border-2 p-4 text-left transition-colors ${
                  theme === mode ? "border-accent" : "border-border"
                }`}
              >
                <div
                  className={`mb-3 flex h-20 items-center justify-center rounded-lg ${
                    mode === "light" ? "bg-white border border-border" : "bg-[#0e0e10]"
                  }`}
                >
                  {mode === "light" ? (
                    <Sun size={20} className="text-text-faint" />
                  ) : (
                    <Moon size={20} className="text-white/60" />
                  )}
                </div>
                <p className="text-sm font-medium capitalize text-text">{mode}</p>
                {theme === mode && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Check size={12} />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {tab === "color" && (
          <div className="flex flex-col gap-1">
            {ACCENTS.map((a) => (
              <button
                key={a.key}
                onClick={() => setAccent(a.key)}
                className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm hover:bg-surface-2"
              >
                <span className="flex items-center gap-2.5 text-text">
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ background: a.swatch }}
                  />
                  {a.label}
                </span>
                {accent === a.key && <Check size={14} className="text-accent" />}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  readOnly,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  readOnly?: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-text">{label}</p>
        {hint && <p className="text-xs text-text-faint">{hint}</p>}
      </div>
      <input
        defaultValue={value}
        readOnly={readOnly}
        onBlur={(e) => onChange?.(e.target.value)}
        className={`w-48 rounded-md border border-border bg-bg px-2.5 py-1.5 text-sm outline-none focus:border-accent ${
          readOnly ? "text-text-faint" : "text-text"
        }`}
      />
    </div>
  );
}
