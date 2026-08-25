"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { IoChevronBackOutline, IoChevronForwardOutline, IoCloseOutline } from "react-icons/io5";

/** Tracks which image within a gallery (if any) is currently blown up in
 * the lightbox, so prev/next can step through the rest of that gallery. */
export function useLightbox() {
  const [state, setState] = useState<{ images: string[]; index: number } | null>(null);

  return {
    lightboxImages: state?.images ?? null,
    lightboxIndex: state?.index ?? 0,
    openLightbox: (images: string[], index: number) => setState({ images, index }),
    closeLightbox: () => setState(null),
    showNext: () =>
      setState((current) =>
        current ? { ...current, index: (current.index + 1) % current.images.length } : current
      ),
    showPrev: () =>
      setState((current) =>
        current
          ? { ...current, index: (current.index - 1 + current.images.length) % current.images.length }
          : current
      ),
  };
}

/**
 * Fullscreen overlay showing one image from a gallery at a larger size, with
 * prev/next controls when there's more than one. Closes on backdrop click,
 * the close button, or Escape; arrow keys step through the gallery.
 *
 * Rendered via a portal into `document.body` rather than in place: the
 * gallery grids live inside scroll-reveal list items that apply a
 * `translate-y` transform, and any ancestor with a transform becomes the
 * containing block for `position: fixed` descendants — without the portal
 * the overlay would center on that card instead of the viewport.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[] | null;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    if (!images) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, onClose, onNext, onPrev]);

  if (!images || typeof document === "undefined") return null;

  const src = images[index];
  const hasMultiple = images.length > 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 duration-150 motion-reduce:animate-none"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <IoCloseOutline color="currentColor" size="24px" />
      </button>

      {hasMultiple && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute top-1/2 left-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <IoChevronBackOutline color="currentColor" size="22px" />
        </button>
      )}

      <div
        onClick={(event) => event.stopPropagation()}
        className="relative h-full max-h-[85vh] w-full max-w-4xl"
      >
        <Image src={src} alt="" fill sizes="90vw" className="object-contain" />
      </div>

      {hasMultiple && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute top-1/2 right-4 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <IoChevronForwardOutline color="currentColor" size="22px" />
        </button>
      )}
    </div>,
    document.body
  );
}
