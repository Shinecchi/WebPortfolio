import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bioSummary, personal } from "@/content/site-content";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col justify-center gap-8 px-6 py-20"
    >
      <p className="font-mono text-sm font-medium tracking-wide text-primary">
        Hi, I&apos;m {personal.name} —
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
        {personal.title}
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {bioSummary}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="h-11 px-6"
          render={
            <a href="#projects">
              View my work
              <ArrowRight aria-hidden="true" />
            </a>
          }
        />
        <Button
          size="lg"
          variant="outline"
          className="h-11 px-6"
          render={<a href="#contact">Get in touch</a>}
        />
      </div>
    </section>
  );
}
