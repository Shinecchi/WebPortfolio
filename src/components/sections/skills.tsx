import { Badge } from "@/components/ui/badge";
import { skills } from "@/content/site-content";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-border bg-secondary/40"
    >
      <div className="mx-auto max-w-5xl scroll-mt-16 px-6 py-20">
        <h2
          id="skills-heading"
          className="font-mono text-sm font-semibold tracking-wide text-primary uppercase"
        >
          Skills
        </h2>
        <p className="mt-3 max-w-2xl text-2xl font-medium text-balance text-foreground">
          Technologies and tools I use to ship products end-to-end.
        </p>

        <dl className="mt-10 grid gap-8 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <dt className="text-sm font-semibold text-foreground">
                {group.category}
              </dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item} variant="outline" className="px-2.5 py-1">
                    {item}
                  </Badge>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
