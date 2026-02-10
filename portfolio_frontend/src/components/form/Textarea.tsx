"use client";

import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

// PUBLIC_INTERFACE
export function Textarea({
  label,
  error,
  className = "",
  ...props
}: TextareaProps) {
  /** Labeled textarea with error message support. */
  return (
    <label className="block">
      <span className="text-sm font-semibold text-black/80">{label}</span>
      <textarea
        {...props}
        className={`focus-ring mt-2 w-full resize-y rounded-xl border bg-white px-3 py-2 text-sm text-black placeholder:text-black/40 ${
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
