"use client";

import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

// PUBLIC_INTERFACE
export function Input({ label, error, className = "", ...props }: InputProps) {
  /** Labeled input with error message support. */
  return (
    <label className="block">
      <span className="text-sm font-semibold text-black/80">{label}</span>
      <input
        {...props}
        className={`focus-ring mt-2 w-full rounded-xl border bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 ${
          error ? "border-[var(--color-error)]" : "border-black/10"
        } ${className}`}
        aria-invalid={!!error}
      />
      {error ? (
        <span className="mt-2 block text-xs font-semibold text-[var(--color-error)]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
