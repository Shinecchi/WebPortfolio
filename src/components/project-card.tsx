"use client";

import type { MouseEvent } from "react";
import { IoCodeSlashOutline, IoEyeOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/content/site-content";

// Accent motion moment (2 of 2 allowed): a cursor-following spotlight glow
// on hover, in the spirit of Aceternity's "card spotlight" pattern -
// implemented with plain CSS custom properties rather than a new
// dependency. The structural Card underneath is still shadcn's.
function handlePointerMove(event: MouseEvent<HTMLDivElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
}

// Deterministic per-project gradient angle so placeholder thumbnails aren't
// all identical, without needing real screenshot assets (see project-card
// discussion: reusing the reference repo's own project photos would
// misrepresent someone else's work as ours).
function gradientAngleFor(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  }
  return hash;
}

function ProjectThumbnail({ project }: { project: Project }) {
  const angle = gradientAngleFor(project.slug);
  return (
    <figure
      className="relative aspect-video w-full overflow-hidden border-b border-border"
      style={{
        background: `linear-gradient(${angle}deg, color-mix(in oklch, var(--primary), transparent 25%), color-mix(in oklch, var(--accent), transparent 10%))`,
      }}
    >
      <IoCodeSlashOutline
        aria-hidden="true"
        color="currentColor"
        size="72px"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground/25"
      />
      {/* Echoes the reference project card's eye-outline "view project"
          overlay: a dim scrim + centered icon over the thumbnail on hover. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/spotlight:bg-black/30 group-hover/spotlight:opacity-100"
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm">
          <IoEyeOutline color="currentColor" size="20px" />
        </div>
      </div>
    </figure>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      onMouseMove={handlePointerMove}
      className="group/spotlight relative h-full overflow-hidden gap-0 py-0 transition-colors hover:border-primary/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklch, var(--primary), transparent 88%), transparent 70%)",
        }}
      />
      <ProjectThumbnail project={project} />
      <CardHeader className="relative pt-6">
        <h3 className="text-xl leading-none font-semibold">{project.name}</h3>
        <CardDescription className="text-base text-foreground/80">
          {project.tagline}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative flex flex-col gap-5 pt-6 pb-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-foreground uppercase">
              Problem
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-foreground uppercase">
              My role
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {project.role}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wide text-foreground uppercase">
            Outcome
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {project.outcome}
          </p>
        </div>

        <Separator />

        <div>
          <h4 className="sr-only">Tech stack</h4>
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary" className="font-mono text-[0.7rem]">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
