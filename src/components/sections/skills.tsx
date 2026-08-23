import {
  IoCodeSlashOutline,
  IoConstructOutline,
  IoGlobeOutline,
  IoLanguageOutline,
  IoLayersOutline,
} from "react-icons/io5";
import type { IconType } from "react-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconBox } from "@/components/icon-box";
import { ProficiencyDots } from "@/components/proficiency-dots";
import { coreSkills, skills } from "@/content/site-content";

// One icon per category header (not per skill) - enough visual variety to
// break up the flat badge grid without packing an icon onto all ~32 items.
const categoryIcons: Record<string, IconType> = {
  "Programming Languages": IoCodeSlashOutline,
  "Web Technologies": IoGlobeOutline,
  "Frameworks & Libraries": IoLayersOutline,
  "Tools & Software": IoConstructOutline,
  "Spoken Languages": IoLanguageOutline,
};

// Skills presentation for the Resume tab. Deliberately not the reference
// site's horizontal progress-bar treatment - grouped badge cards instead,
// consistent with the rest of the site's card/badge language. A small
// curated "Core Skills" row above the cards carries the only proficiency
// indicator (a dot rating), so the full ~32-item list can stay plain badges
// instead of every item needing a rating.
export function Skills() {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        Skills
      </h3>

      <div className="mt-4 flex flex-wrap gap-3">
        {coreSkills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2"
          >
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
            <ProficiencyDots level={skill.level} />
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {skills.map((group) => {
          const Icon = categoryIcons[group.category];
          return (
            <Card key={group.category} className="gap-3 py-5">
              <CardHeader className="flex flex-row items-center gap-3 px-5">
                {Icon && (
                  <IconBox className="size-8 sm:size-8">
                    <Icon color="currentColor" size="16px" />
                  </IconBox>
                )}
                <h4 className="text-sm leading-none font-semibold text-foreground">
                  {group.category}
                </h4>
              </CardHeader>
              <CardContent className="px-5">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge variant="outline" className="px-2.5 py-1">
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
