import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small rounded-square icon chip — a direct structural echo of the
 * reference vCard template's `.icon-box` (bordered square, centered icon,
 * subtle inset background) used next to contact rows and timeline section
 * titles. Recolored to the site's blue `--primary` token instead of the
 * reference's orange-yellow-crayola.
 */
export function IconBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/60 text-primary shadow-sm sm:size-11",
        className
      )}
    >
      {children}
    </div>
  );
}
