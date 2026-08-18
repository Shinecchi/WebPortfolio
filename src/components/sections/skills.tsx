import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { skills } from "@/content/site-content";

// Skills presentation for the Resume tab. Deliberately not the reference
// site's horizontal progress-bar treatment - grouped badge cards instead,
// consistent with the rest of the site's card/badge language.
export function Skills() {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        Skills
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <Card key={group.category} className="gap-3 py-5">
            <CardHeader className="px-5">
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
        ))}
      </div>
    </div>
  );
}
