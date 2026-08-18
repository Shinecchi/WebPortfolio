import { IoBookOutline } from "react-icons/io5";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/timeline";
import { IconBox } from "@/components/icon-box";
import { SectionHeading } from "@/components/section-heading";
import { education, experience } from "@/content/site-content";

// Resume tab panel: experience/education timelines plus the skills groups.
// The icon-box + title-wrapper pairing above each timeline mirrors the
// reference vCard template's `.timeline .title-wrapper` treatment (it uses
// the same book-outline glyph for both Education and Experience — kept
// identical here for a close 1:1 match rather than "fixing" it).
export function Resume() {
  return (
    <div className="flex flex-col gap-10">
      <SectionHeading>Resume</SectionHeading>

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
