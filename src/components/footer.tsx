import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { personal } from "@/content/site-content";

// Fixed at build time rather than computed per-request: this site is
// statically prerendered, so `new Date().getFullYear()` would freeze at
// whatever year the last build ran anyway. Bump annually.
const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          &copy; {COPYRIGHT_YEAR} {personal.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <Mail className="size-4" aria-hidden="true" />
              <span className="sr-only">Email</span>
            </a>
          </li>
          <li>
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </a>
          </li>
          <li>
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <LinkedinIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
