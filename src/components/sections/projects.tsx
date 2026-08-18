import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/site-content";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-5xl scroll-mt-16 px-6 py-20"
    >
      <h2
        id="projects-heading"
        className="font-mono text-sm font-semibold tracking-wide text-primary uppercase"
      >
        Projects
      </h2>
      <p className="mt-3 max-w-2xl text-2xl font-medium text-balance text-foreground">
        A few things I&apos;ve designed, built, and shipped end-to-end.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
