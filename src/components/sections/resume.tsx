import { IoBookOutline, IoDownloadOutline } from "react-icons/io5";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/timeline";
import { IconBox } from "@/components/icon-box";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { education, experience } from "@/content/site-content";

const RESUME_PDF_URL = "/galleries/Resume/Resume_MuhammadZulhaziq.pdf";

// Resume tab panel: experience/education timelines plus the skills groups.
// The icon-box + title-wrapper pairing above each timeline mirrors the
// reference vCard template's `.timeline .title-wrapper` treatment (it uses
// the same book-outline glyph for both Education and Experience — kept
// identical here for a close 1:1 match rather than "fixing" it).
export function Resume() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading>Resume</SectionHeading>
        <a
          href={RESUME_PDF_URL}
          download
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "gap-2")}
        >
          <IoDownloadOutline color="currentColor" size="16px" />
          Download CV
        </a>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <IconBox>
            <IoBookOutline color="currentColor" size="20px" />
          </IconBox>
          <h3 className="text-lg font-semibold text-foreground">
            Experience
          </h3>
        </div>
        <div className="mt-6">
          <Timeline entries={experience} />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <IconBox>
            <IoBookOutline color="currentColor" size="20px" />
          </IconBox>
          <h3 className="text-lg font-semibold text-foreground">
            Education
          </h3>
        </div>
        <div className="mt-6">
          <Timeline entries={education} />
        </div>
      </div>

      <Skills />
    </div>
  );
}
