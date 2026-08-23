import { IoTrophyOutline } from "react-icons/io5";
import { ActivityLadder } from "@/components/activity-ladder";
import { IconBox } from "@/components/icon-box";
import { SectionHeading } from "@/components/section-heading";
import { activities } from "@/content/site-content";

// Activities tab panel: hackathons and competitions, read bottom-to-top
// (oldest at the bottom, most recent at the top) via ActivityLadder.
export function Activities() {
  return (
    <div>
      <SectionHeading>Activities</SectionHeading>

      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        Hackathons and competitions, oldest at the bottom — read it going up.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <IconBox>
          <IoTrophyOutline color="currentColor" size="20px" />
        </IconBox>
        <h3 className="text-lg font-semibold text-foreground">
          Hackathons &amp; Competitions
        </h3>
      </div>

      <div className="mt-6">
        <ActivityLadder entries={activities} />
      </div>
    </div>
  );
}
