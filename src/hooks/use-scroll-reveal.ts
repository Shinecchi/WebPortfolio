"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Watches the closest ancestor Tabs panel and bumps a counter every time it
 * goes from visible to hidden (i.e. the user switches to another tab).
 * Callers fold this counter into each timeline item's React `key`, so
 * leaving and returning to the tab remounts the items — resetting their
 * reveal state — rather than replaying on every incidental scroll within a
 * single visit.
 */
export function usePanelHideSignal(containerRef: { current: HTMLElement | null }) {
  const [hideSignal, setHideSignal] = useState(0);

  useEffect(() => {
    const panel = containerRef.current?.closest<HTMLElement>('[data-slot="tabs-panel"]');
    if (!panel) return;

    const observer = new MutationObserver(() => {
      if (panel.hidden) {
        setHideSignal((count) => count + 1);
      }
    });
    observer.observe(panel, { attributes: true, attributeFilter: ["hidden"] });
    return () => observer.disconnect();
  }, [containerRef]);

  return hideSignal;
}

/**
 * Reveals an element once it scrolls into view, then stops watching it for
 * the lifetime of this mount (a one-time-per-mount entrance, not a toggle
 * that replays on every scroll pass). Respects prefers-reduced-motion by
 * skipping straight to visible. Starts hidden (matching server-rendered
 * markup, since matchMedia isn't available during SSR).
 */
export function useRevealOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
