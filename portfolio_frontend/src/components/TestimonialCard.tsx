import * as React from "react";
import type { Testimonial } from "@/data/testimonials";

export type TestimonialCardProps = {
  testimonial: Testimonial;
};

// PUBLIC_INTERFACE
export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  /** Card for a single testimonial. */
  const initials = testimonial.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <figure className="surface p-6">
      <blockquote className="text-sm text-black/80">
        <span className="text-lg font-extrabold text-[var(--color-secondary)]">
          “
        </span>
        {testimonial.quote}
        <span className="text-lg font-extrabold text-[var(--color-secondary)]">
          ”
        </span>
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900/10 text-sm font-extrabold text-[var(--color-primary)]">
          {initials}
        </div>
        <div>
          <div className="text-sm font-extrabold text-black">
            {testimonial.name}
          </div>
          <div className="text-xs font-semibold text-black/60">
            {testimonial.role}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
