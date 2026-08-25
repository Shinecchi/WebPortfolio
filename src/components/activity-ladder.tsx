"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { IoChevronDownOutline, IoImagesOutline, IoTrophyOutline } from "react-icons/io5";
import { gradientAngleFor } from "@/lib/gradient-angle";
import { GalleryGrid } from "@/components/gallery-grid";
import { cn } from "@/lib/utils";
import { usePanelHideSignal, useRevealOnScroll } from "@/hooks/use-scroll-reveal";
import type { ActivityEntry } from "@/content/site-content";

function ActivityPoster({ entry }: { entry: ActivityEntry }) {
  if (entry.poster) {
    return (
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={entry.poster}
          alt={`${entry.title} poster`}
          fill
          className="object-cover"
          style={{ objectPosition: entry.posterPosition ?? "center" }}
        />
      </div>
    );
  }

  const angle = gradientAngleFor(entry.title);
  return (
    <div
      className="relative flex aspect-video w-full items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(${angle}deg, color-mix(in oklch, var(--primary), transparent 25%), color-mix(in oklch, var(--accent), transparent 10%))`,
      }}
    >
      <IoTrophyOutline
        aria-hidden="true"
        color="currentColor"
        size="56px"
        className="text-primary-foreground/25"
      />
    </div>
  );
}

function ActivityCard({
  entry,
  isOpen,
  onToggle,
}: {
  entry: ActivityEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const gallery = entry.gallery ?? [];
  const panelId = useId();

  return (
    <div
      className={cn(
        "group overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        isOpen && "border-primary/40"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full cursor-pointer text-left"
      >
        <ActivityPoster entry={entry} />
        <div className="flex items-start justify-between gap-3 p-4">
          <div>
            <p className="font-mono text-xs font-medium tracking-wide text-primary">
              {entry.year}
            </p>
            <h4 className="mt-1 text-base leading-snug font-semibold text-foreground">
              {entry.title}
            </h4>
            <p className="text-sm font-medium text-muted-foreground">
              {entry.role}
            </p>
          </div>
          <IoChevronDownOutline
            aria-hidden="true"
            color="currentColor"
            size="18px"
            className={cn(
              "mt-1 shrink-0 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          className="animate-in fade-in slide-in-from-top-1 border-t border-border p-4 duration-300 ease-out motion-reduce:animate-none"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            {entry.description}
          </p>

          <div className="mt-4">
            <h5 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground uppercase">
              <IoImagesOutline aria-hidden="true" color="currentColor" size="14px" />
              Gallery
            </h5>
            {gallery.length > 0 ? (
              <GalleryGrid images={gallery} />
            ) : (
              <p className="mt-1.5 text-sm text-muted-foreground italic">
                Photos from this event haven&apos;t been added yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// grow-24 for the side holding the card when this row is open, grow-0 for
// the empty side when open, and an even grow-1/grow-1 split when closed.
function slotGrowClass(hasCard: boolean, isOpen: boolean) {
  if (!isOpen) return "md:grow-1";
  return hasCard ? "md:grow-[24]" : "md:grow-0";
}

function ActivityListItem({
  entry,
  isLeft,
  isOpen,
  someOpen,
  onToggle,
}: {
  entry: ActivityEntry;
  isLeft: boolean;
  isOpen: boolean;
  someOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, visible } = useRevealOnScroll<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={cn(
        "relative pl-10 transition-all duration-700 ease-out md:flex md:items-start md:gap-8 md:pl-0 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-6 left-3 size-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary transition-[left,opacity] duration-300 ease-out md:left-1/2 md:top-6",
          someOpen && !isOpen && "md:opacity-0",
          isOpen && (isLeft ? "md:left-full" : "md:left-0")
        )}
      />
      {/* Left/right slots: whichever side holds the card grows to fill the
          row when open (grow-24 vs the other side's grow-0); when closed,
          both sides split evenly (grow-1 each), matching the alternating
          half-width look. flex-grow (not width/grid-column) drives the
          resize so the browser can smoothly animate it instead of snapping. */}
      <div
        className={cn(
          "md:basis-0 md:transition-[flex-grow] md:duration-300 md:ease-in-out",
          slotGrowClass(isLeft, isOpen)
        )}
      >
        {isLeft && <ActivityCard entry={entry} isOpen={isOpen} onToggle={onToggle} />}
      </div>
      <div
        className={cn(
          "md:basis-0 md:transition-[flex-grow] md:duration-300 md:ease-in-out",
          slotGrowClass(!isLeft, isOpen)
        )}
      >
        {!isLeft && <ActivityCard entry={entry} isOpen={isOpen} onToggle={onToggle} />}
      </div>
    </li>
  );
}

function ActivityTimelineBody({ entries }: { entries: ActivityEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openIsLeft = openIndex !== null && openIndex % 2 === 0;

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-0 left-3 w-px bg-border transition-[left] duration-300 ease-out",
          openIndex === null && "md:left-1/2",
          openIndex !== null && (openIsLeft ? "md:left-[calc(100%-0.75rem)]" : "md:left-3")
        )}
      />
      <ol className="relative flex flex-col-reverse gap-10">
        {entries.map((entry, index) => (
          <ActivityListItem
            key={`${entry.title}-${index}`}
            entry={entry}
            isLeft={index % 2 === 0}
            isOpen={openIndex === index}
            someOpen={openIndex !== null}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          />
        ))}
      </ol>
    </>
  );
}

/**
 * Two-sided vertical timeline for hackathons/competitions: a rail runs down
 * the middle (left-aligned on small screens), entries alternate left/right
 * of it, and each entry is an exclusively-expanding disclosure — only one
 * can be open at a time. On desktop, opening a card grows it to the row's
 * full width and slides the center line over to the opposite edge (other
 * dots fade out while it's shifted); closing returns everything to center.
 * Rendered bottom-to-top (`flex-col-reverse`) so the earliest entry sits at
 * the bottom and the most recent climbs to the top. Each entry fades/slides
 * into place the first time it scrolls into view, and the whole reveal (plus
 * any open card) resets each time you come back to this tab — `hideSignal`
 * is used as a remount key rather than an effect-driven reset.
 */
export function ActivityLadder({ entries }: { entries: ActivityEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hideSignal = usePanelHideSignal(containerRef);

  return (
    <div className="relative md:px-3" ref={containerRef}>
      <ActivityTimelineBody key={hideSignal} entries={entries} />
    </div>
  );
}
