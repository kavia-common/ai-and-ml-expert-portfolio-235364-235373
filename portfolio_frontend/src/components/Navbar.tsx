"use client";

import Link from "next/link";
import * as React from "react";
import { scrollToHash, SectionId, useActiveSection } from "@/lib/scroll";

const navItems: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

// PUBLIC_INTERFACE
export function Navbar() {
  /** Sticky responsive navigation with active section indicator. */
  const active = useActiveSection(navItems.map((n) => n.id));

  function onNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) {
    e.preventDefault();
    scrollToHash(`#${id}`);
  }

  return (
    <div className="sticky top-0 z-50 border-b border-black/10 bg-[var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          onClick={(e) => onNavClick(e, "home")}
          className="focus-ring inline-flex items-center gap-2 rounded-xl px-2 py-1"
          aria-label="Go to Home section"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-secondary)]" />
          <span className="text-sm font800 font-extrabold text-[var(--color-primary)]">
            Ocean Portfolio
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => onNavClick(e, item.id)}
                    className={`focus-ring inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-900/10 text-[var(--color-primary)]"
                        : "text-black/70 hover:bg-black/5 hover:text-black"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile: horizontally scrollable top nav */}
          <ul className="flex max-w-[70vw] items-center gap-1 overflow-x-auto md:hidden">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="shrink-0">
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => onNavClick(e, item.id)}
                    className={`focus-ring inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-900/10 text-[var(--color-primary)]"
                        : "text-black/70 hover:bg-black/5 hover:text-black"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
