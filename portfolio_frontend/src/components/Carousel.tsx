"use client";

import * as React from "react";
import { Button } from "@/components/Button";

export type CarouselProps = {
  ariaLabel: string;
  children: React.ReactNode[];
  /** Autoplay interval (ms). If undefined/0, autoplay disabled. */
  autoplayMs?: number;
  /** Pause autoplay on hover/focus. */
  pauseOnHover?: boolean;
};

// PUBLIC_INTERFACE
export function Carousel({
  ariaLabel,
  children,
  autoplayMs = 0,
  pauseOnHover = true,
}: CarouselProps) {
  /** Simple client-side carousel for horizontal items. */
  const items = React.Children.toArray(children);
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      : false;

  const canAutoPlay = autoplayMs > 0 && !prefersReduced;

  const go = React.useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => {
        const next = i + dir;
        if (next < 0) return items.length - 1;
        if (next >= items.length) return 0;
        return next;
      });
    },
    [items.length],
  );

  React.useEffect(() => {
    if (!canAutoPlay) return;
    if (paused) return;

    const t = window.setInterval(() => go(1), autoplayMs);
    return () => window.clearInterval(t);
  }, [autoplayMs, canAutoPlay, go, paused]);

  const onEnter = () => pauseOnHover && setPaused(true);
  const onLeave = () => pauseOnHover && setPaused(false);

  return (
    <div
      className="surface p-4"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocusCapture={onEnter}
      onBlurCapture={onLeave}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-black/70" aria-hidden="true">
          {index + 1} / {items.length}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
          >
            Prev
          </Button>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
          >
            Next
          </Button>
        </div>
      </div>

      <div className="mt-4" aria-label={ariaLabel} role="region">
        {items[index]}
      </div>
    </div>
  );
}
