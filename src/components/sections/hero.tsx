import {
  IoHardwareChipOutline,
  IoBarChartOutline,
  IoGitNetworkOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconBox } from "@/components/icon-box";
import { services, type Service } from "@/content/site-content";

// Matches each service by title to an icon, mirroring the reference vCard
// template's per-service-item icon (it uses a static SVG asset per item;
// we use an icon component instead, consistent with the rest of the site's
// react-icons/io5 usage).
const serviceIcons: Record<string, React.ComponentType<{ color?: string; size?: string }>> = {
  "Machine Learning & AI": IoHardwareChipOutline,
  "Data Analytics & Visualization": IoBarChartOutline,
  "Agentic AI & Automation": IoGitNetworkOutline,
  "NLP & Transformer Models": IoChatbubblesOutline,
};

// "What I do" service blurbs - shown on the About tab. File kept at its
// original path (this used to be the full-viewport hero); the standalone
// hero concept doesn't fit the sidebar+tabs layout since identity already
// lives in the persistent sidebar.
export function Services() {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        What I do
      </h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {services.map((service: Service) => {
          const Icon = serviceIcons[service.title];
          return (
            <Card key={service.title} className="gap-2 py-5">
              <CardHeader className="flex flex-row items-center gap-3 px-5">
                {Icon && (
                  <IconBox>
                    <Icon color="currentColor" size="20px" />
                  </IconBox>
                )}
                <h4 className="text-base leading-none font-semibold text-foreground">
                  {service.title}
                </h4>
              </CardHeader>
              <CardContent className="px-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
