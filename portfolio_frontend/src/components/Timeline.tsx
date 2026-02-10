import * as React from "react";
import type { ExperienceItem } from "@/data/experience";

export type TimelineProps = {
  items: ExperienceItem[];
};

// PUBLIC_INTERFACE
export function Timeline({ items }: TimelineProps) {
  /** Vertical timeline for experience items with dots/connectors. */
  return (
    <ol className="relative ml-3 border-l border-black/10 pl-6">
      {items.map((item, idx) => (
        <li key={`${item.company}-${item.role}-${idx}`} className="pb-10">
          <div className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-surface)]" />
          <div className="surface p-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-extrabold text-black">
                  {item.role}
                </h3>
                <p className="text-sm font-semibold text-black/70">
                  {item.company}
                  {item.location ? (
                    <span className="text-black/50"> • {item.location}</span>
                  ) : null}
                </p>
              </div>
              <p className="text-sm font-semibold text-black/60">
                {item.start} — {item.end}
              </p>
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/80">
              {item.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
