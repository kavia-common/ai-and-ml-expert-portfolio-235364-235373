"use client";

import * as React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

// PUBLIC_INTERFACE
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  /** Reusable button component with consistent Ocean Professional styling. */
  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const sizing = size === "sm" ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm";
  const styles: Record<Variant, string> = {
    primary:
      "bg-[var(--color-primary)] text-white shadow-sm hover:shadow-md hover:-translate-y-[1px]",
    secondary:
      "bg-[var(--color-secondary)] text-black shadow-sm hover:shadow-md hover:-translate-y-[1px]",
    ghost:
      "bg-transparent text-[var(--color-text)] border border-black/10 hover:bg-black/5",
  };

  return (
    <button
      {...props}
      className={`${base} ${sizing} ${styles[variant]} ${className}`}
    />
  );
}
