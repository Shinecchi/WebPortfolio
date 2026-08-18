/**
 * Article/section heading with a short gradient underline accent — matches
 * the reference vCard template's `.article-title` pattern (a small
 * primary-colored bar under each panel's h2), recolored to the blue theme.
 */
export function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="relative inline-block pb-2.5 text-2xl font-semibold tracking-tight text-foreground capitalize sm:text-3xl">
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] w-8 rounded-full bg-gradient-to-r from-primary to-primary/40 sm:h-1 sm:w-10"
      />
    </h2>
  );
}
