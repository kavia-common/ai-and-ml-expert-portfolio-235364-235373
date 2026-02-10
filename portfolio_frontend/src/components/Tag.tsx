"use client";

import * as React from "react";

export type TagProps = {
  children: React.ReactNode;
  className?: string;
};

// PUBLIC_INTERFACE
export function Tag({ children, className = "" }: TagProps) {
  /** Small tag/chip for tech stacks and metadata. */
  return (
    <span
      className={`inline-flex items-center rounded-full border border-black/10 bg-white px-2.5 py-1 text-xs font-medium text-black/80 ${className}`}
    >
      {children}
    </span>
  );
}
