import type { TimelineEntry } from "@/content/site-content";

/**
 * Resume-style vertical timeline: a rail with a dot per entry, each entry
 * carrying a title, organization, period, and short description. Used for
 * both the experience and education lists on the Resume tab.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative flex flex-col gap-8 border-l border-border pl-6">
      {entries.map((entry, index) => (
        <li key={`${entry.title}-${index}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[1.6rem] size-2.5 rounded-full border-2 border-background bg-primary"
          />
          <p className="font-mono text-xs font-medium tracking-wide text-primary">
            {entry.period}
          </p>
          <h4 className="mt-1 text-base font-semibold text-foreground">
            {entry.title}
          </h4>
          <p className="text-sm font-medium text-muted-foreground">
            {entry.organization}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {entry.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
