import { ProjectTimeline } from "@/components/project-timeline";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/site-content";

// Project tab panel.
//
// NOTE for content-writer: the reference vCard template's portfolio section
// has an "All / Web design / Applications / Web development" category
// filter bar (filter-list / filter-select-box in its markup). Our `Project`
// type in site-content.ts has no category/tag field, so that filter UI is
// intentionally NOT implemented here — fabricating filter categories isn't
// this agent's call. If real project categories get added to `Project`,
// wire a filter bar here matching the reference's filter-list pattern.
export function Projects() {
  return (
    <div>
      <SectionHeading>Projects</SectionHeading>

      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        A few things I&apos;ve designed, built, and shipped end-to-end.
      </p>

      <div className="mt-8">
        <ProjectTimeline projects={projects} />
      </div>
    </div>
  );
}
