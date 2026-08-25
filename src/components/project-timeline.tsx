"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  IoChevronDownOutline,
  IoCodeSlashOutline,
  IoImagesOutline,
  IoLogoGithub,
  IoPlayOutline,
} from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { gradientAngleFor } from "@/lib/gradient-angle";
import { getYouTubeId } from "@/lib/youtube";
import { GalleryGrid } from "@/components/gallery-grid";
import { cn } from "@/lib/utils";
import { usePanelHideSignal, useRevealOnScroll } from "@/hooks/use-scroll-reveal";
import type { Project } from "@/content/site-content";

// Accent motion moment (2 of 2 allowed): a cursor-following spotlight glow
// on hover, in the spirit of Aceternity's "card spotlight" pattern -
// implemented with plain CSS custom properties rather than a new
// dependency.
function handlePointerMove(event: MouseEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
}

function ProjectPoster({ project }: { project: Project }) {
  if (project.poster) {
    return (
      <div className="relative aspect-video w-full overflow-hidden">
        <Image src={project.poster} alt={`${project.name} poster`} fill className="object-cover" />
      </div>
    );
  }

  const angle = gradientAngleFor(project.slug);
  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(${angle}deg, color-mix(in oklch, var(--primary), transparent 25%), color-mix(in oklch, var(--accent), transparent 10%))`,
      }}
    >
      <IoCodeSlashOutline
        aria-hidden="true"
        color="currentColor"
        size="56px"
        className="text-primary-foreground/25"
      />
    </div>
  );
}

function ProjectVideo({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const id = getYouTubeId(url);
  if (!id) return null;

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title="Project demo video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play project demo video"
      className="group/video relative aspect-video w-full overflow-hidden rounded-lg"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover/video:bg-black/40">
        <div className="flex size-14 items-center justify-center rounded-full bg-background/90 text-primary shadow-sm">
          <IoPlayOutline color="currentColor" size="24px" />
        </div>
      </div>
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const gallery = project.gallery ?? [];

  return (
    <details
      onMouseMove={handlePointerMove}
      className="group/spotlight relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-colors hover:border-primary/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklch, var(--primary), transparent 88%), transparent 70%)",
        }}
      />

      <summary className="relative cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <ProjectPoster project={project} />
        <div className="flex items-start justify-between gap-3 p-4">
          <div>
            <h3 className="text-base leading-snug font-semibold text-foreground">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              aria-label={`View ${project.name} on GitHub`}
              className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <IoLogoGithub color="currentColor" size="14px" />
              GitHub
            </a>
            <IoChevronDownOutline
              aria-hidden="true"
              color="currentColor"
              size="18px"
              className="text-muted-foreground transition-transform duration-200 group-open:rotate-180"
            />
          </div>
        </div>
      </summary>

      <div className="animate-in fade-in slide-in-from-top-1 relative flex flex-col gap-5 border-t border-border p-4 duration-200 motion-reduce:animate-none">
        <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>

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

        {project.videoUrl && (
          <div>
            <h5 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground uppercase">
              <IoPlayOutline aria-hidden="true" color="currentColor" size="14px" />
              Demo
            </h5>
            <div className="mt-2">
              <ProjectVideo url={project.videoUrl} />
            </div>
          </div>
        )}

        <div>
          <h5 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground uppercase">
            <IoImagesOutline aria-hidden="true" color="currentColor" size="14px" />
            Gallery
          </h5>
          {gallery.length > 0 ? (
            <GalleryGrid images={gallery} />
          ) : (
            <p className="mt-1.5 text-sm text-muted-foreground italic">
              Photos from this project haven&apos;t been added yet.
            </p>
          )}
        </div>
      </div>
    </details>
  );
}

function ProjectListItem({ project }: { project: Project }) {
  const { ref, visible } = useRevealOnScroll<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={cn(
        "relative pl-10 transition-all duration-700 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-6 left-3 size-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary"
      />
      <ProjectCard project={project} />
    </li>
  );
}

/**
 * Vertical timeline for projects, one full-width card per row: a rail runs
 * down the left, and each project is a native <details> disclosure — the
 * poster and title are always visible, clicking expands the full
 * description, tech stack, demo video, and photo gallery into the full
 * width of the row. Each entry fades/slides into place the first time it
 * scrolls into view, and the whole reveal replays each time you come back
 * to this tab. Clicking "GitHub" opens the repo directly without toggling
 * expand.
 */
export function ProjectTimeline({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hideSignal = usePanelHideSignal(containerRef);

  return (
    <div className="relative" ref={containerRef}>
      <div aria-hidden="true" className="absolute inset-y-0 left-3 w-px bg-border" />
      <ol className="relative flex flex-col gap-10">
        {projects.map((project) => (
          <ProjectListItem key={`${project.slug}-${hideSignal}`} project={project} />
        ))}
      </ol>
    </div>
  );
}
