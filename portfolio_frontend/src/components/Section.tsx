import * as React from "react";

export type SectionProps = {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

// PUBLIC_INTERFACE
export function Section({
  id,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  /** Semantic section wrapper used for anchored single-page navigation. */
  return (
    <section id={id} className={`section scroll-mt-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <header>
          <h2 className="section-title">{title}</h2>
          {description ? <p className="section-desc">{description}</p> : null}
        </header>

        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
