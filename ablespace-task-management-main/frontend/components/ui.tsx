"use client";

import { Priority } from "@/lib/types";
import { SignalHigh, SignalMedium, SignalLow, Minus, TriangleAlert } from "lucide-react";
import clsx from "clsx";

const PRIORITY_META: Record<Priority, { label: string; color: string; icon: React.ElementType }> = {
  urgent: { label: "Urgent", color: "#e0345c", icon: TriangleAlert },
  high: { label: "High", color: "#e0821f", icon: SignalHigh },
  medium: { label: "Medium", color: "#d6a419", icon: SignalMedium },
  low: { label: "Low", color: "#8a8a92", icon: SignalLow },
  "no-priority": { label: "No Priority", color: "#a6a6ad", icon: Minus },
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const meta = PRIORITY_META[priority];
  const Icon = meta.icon;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium"
      style={{ color: meta.color }}
    >
      <Icon size={13} strokeWidth={2.5} />
      {meta.label}
    </span>
  );
}

export function PriorityMenuItems({
  value,
  onChange,
}: {
  value: Priority;
  onChange: (p: Priority) => void;
}) {
  return (
    <div className="py-1">
      {(Object.keys(PRIORITY_META) as Priority[]).map((p) => {
        const meta = PRIORITY_META[p];
        const Icon = meta.icon;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={clsx(
              "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm hover:bg-surface-2 transition-colors",
              value === p && "font-medium"
            )}
          >
            <span className="flex items-center gap-1.5" style={{ color: meta.color }}>
              <Icon size={13} strokeWidth={2.5} />
              <span className="text-text">{meta.label}</span>
            </span>
            {value === p && <span className="text-accent text-xs">✓</span>}
          </button>
        );
      })}
    </div>
  );
}

const AVATAR_COLORS = ["#6d5bd0", "#e0345c", "#12946a", "#d97706", "#2b8fd6", "#d6499a"];

function hashColor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function Avatar({ name, size = 22 }: { name?: string; size?: number }) {
  if (!name) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full border border-dashed border-border text-text-faint"
        style={{ width: size, height: size, fontSize: size * 0.5 }}
      >
        +
      </span>
    );
  }
  const initial = name.trim()[0]?.toUpperCase() ?? "?";
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-surface"
      style={{ width: size, height: size, fontSize: size * 0.48, background: hashColor(name) }}
      title={name}
    >
      {initial}
    </span>
  );
}

export function LabelChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-text-muted">
      {label}
    </span>
  );
}

export function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
}
