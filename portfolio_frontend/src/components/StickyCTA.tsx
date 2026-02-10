"use client";

import * as React from "react";
import { Button } from "@/components/Button";
import { scrollToHash } from "@/lib/scroll";

export type StickyCTAProps = {
  email: string;
};

// PUBLIC_INTERFACE
export function StickyCTA({ email }: StickyCTAProps) {
  /** Sticky CTA bar shown on large screens for quick contact actions. */
  return (
    <aside className="pointer-events-none fixed bottom-4 right-4 z-40 hidden lg:block">
      <div className="pointer-events-auto surface flex items-center gap-3 px-4 py-3">
        <div>
          <div className="text-xs font-semibold text-black/60">
            Let’s build something reliable.
          </div>
          <div className="text-sm font-extrabold text-black">{email}</div>
        </div>
        <Button
          variant="primary"
          size="sm"
          type="button"
          onClick={() => scrollToHash("#contact")}
        >
          Contact
        </Button>
      </div>
    </aside>
  );
}
