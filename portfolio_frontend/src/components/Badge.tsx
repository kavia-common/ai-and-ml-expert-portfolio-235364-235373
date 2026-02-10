"use client";

import * as React from "react";

export type BadgeProps = {
  children: React.ReactNode;
  tone?: "primary" | "secondary" | "success";
  className?: string;
};

// PUBLIC_INTERFACE
export function Badge({ children, tone = "primary", className = "" }: BadgeProps) {
  /** Compact badge/pill component used for highlights. */
  const tones: Record<string, string> = {
    primary:
      "bg-blue-900/10 text-[var(--color-primary)] border border-blue-900/15",
    secondary:
      "bg-amber-600/10 text-amber-700 border border-amber-600/20",
    success:
      "bg-emerald-600/10 text-emerald-700 border border-emerald-600/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
