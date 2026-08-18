import { personal } from "@/content/site-content";

// Fixed at build time rather than computed per-request: this site is
// statically prerendered, so `new Date().getFullYear()` would freeze at
// whatever year the last build ran anyway. Bump annually.
const COPYRIGHT_YEAR = 2026;

// Compact footer for the tabbed layout - identity, contact, and social
// links already live in the persistent sidebar, so this just closes out
// the content column with attribution.
export function Footer() {
  return (
    <footer className="border-t border-border">
      <p className="px-6 py-8 text-center text-xs text-muted-foreground lg:text-left">
        &copy; {COPYRIGHT_YEAR} {personal.name}. Built with Next.js &amp; Tailwind CSS.
      </p>
    </footer>
  );
}
