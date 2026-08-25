"use client";

import Image from "next/image";
import { Lightbox, useLightbox } from "@/components/image-lightbox";

const VISIBLE_COUNT = 3;

/**
 * Caps a photo gallery to the first 3 thumbnails so an expanded card never
 * grows past a predictable height, no matter how many photos exist. When
 * there are more, the last visible thumbnail gets a "+N" overlay for the
 * rest — clicking it (or any thumbnail) opens the full set in the lightbox,
 * where prev/next steps through everything, seen and unseen alike.
 */
export function GalleryGrid({ images }: { images: string[] }) {
  const { lightboxImages, lightboxIndex, openLightbox, closeLightbox, showNext, showPrev } =
    useLightbox();

  if (images.length === 0) return null;

  const visible = images.slice(0, VISIBLE_COUNT);
  const hiddenCount = images.length - visible.length;

  return (
    <>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {visible.map((src, index) => {
          const showOverlay = index === visible.length - 1 && hiddenCount > 0;
          return (
            <button
              key={src}
              type="button"
              onClick={() => openLightbox(images, index)}
              aria-label={showOverlay ? `View all ${images.length} photos` : "View larger image"}
              className="relative aspect-square cursor-zoom-in overflow-hidden rounded-md transition-opacity hover:opacity-90"
            >
              <Image src={src} alt="" fill className="object-cover" />
              {showOverlay && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-black/60 text-lg font-semibold text-white"
                >
                  +{hiddenCount}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <Lightbox
        images={lightboxImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNext={showNext}
        onPrev={showPrev}
      />
    </>
  );
}
