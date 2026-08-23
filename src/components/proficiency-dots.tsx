import { cn } from "@/lib/utils";
import type { ProficiencyLevel } from "@/content/site-content";

const FILLED_DOTS: Record<ProficiencyLevel, number> = {
  intermediate: 3,
  proficient: 4,
  advanced: 5,
};

/**
 * A 5-dot proficiency rating — a compact, graphical stand-in for a text
 * label like "Intermediate", without resorting to the horizontal
 * progress-bar treatment this site's Skills section otherwise avoids.
 */
export function ProficiencyDots({ level }: { level: ProficiencyLevel }) {
  const filled = FILLED_DOTS[level];

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${level} proficiency`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn("size-1.5 rounded-full", i < filled ? "bg-primary" : "bg-border")}
        />
      ))}
    </div>
  );
}
