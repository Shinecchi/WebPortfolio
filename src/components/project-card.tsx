import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/content/site-content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="text-xl leading-none font-semibold">{project.name}</h3>
        <CardDescription className="text-base text-foreground/80">
          {project.tagline}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-foreground uppercase">
              Problem
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wide text-foreground uppercase">
              My role
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {project.role}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wide text-foreground uppercase">
            Outcome
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {project.outcome}
          </p>
        </div>

        <Separator />

        <div>
          <h4 className="sr-only">Tech stack</h4>
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li key={tech}>
                <Badge variant="secondary" className="font-mono text-[0.7rem]">
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
