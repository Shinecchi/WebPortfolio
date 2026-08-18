import { Services } from "@/components/sections/hero";
import { SectionHeading } from "@/components/section-heading";
import { aboutMe, bioSummary, personal } from "@/content/site-content";

// About tab panel: identity/avatar already lives in the persistent sidebar,
// so this leads with the headline + bio instead of repeating profile chrome.
export function About() {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeading>About Me</SectionHeading>

      <div>
        <p className="max-w-2xl text-lg font-medium text-balance text-foreground">
          {personal.title}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {bioSummary}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {aboutMe}
        </p>
      </div>

      <Services />
    </div>
  );
}
