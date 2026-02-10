"use client";

import * as React from "react";
import type { Project } from "@/data/projects";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/Button";

export type ProjectCardProps = {
  project: Project;
};

// PUBLIC_INTERFACE
export function ProjectCard({ project }: ProjectCardProps) {
  /** Card for displaying a project in the projects grid. */
  return (
    <article className="surface group overflow-hidden transition-all hover:-translate-y-[2px] hover:shadow-[var(--shadow-md)]">
      <div className="h-36 w-full bg-gradient-to-br from-blue-900/10 to-amber-600/10 p-4">
        <div className="h-full w-full rounded-xl border border-black/10 bg-white/70" />
        <span className="sr-only">{project.imageAlt ?? project.title}</span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-extrabold text-black">{project.title}</h3>
        <p className="mt-2 text-sm text-black/75">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.demoUrl ? (
            <a
              className="focus-ring rounded-xl"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary" size="sm" type="button">
                Demo
              </Button>
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              className="focus-ring rounded-xl"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" size="sm" type="button">
                GitHub
              </Button>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
