import Image from "next/image";
import { aboutMe, personal } from "@/content/site-content";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl scroll-mt-16 px-6 py-20"
    >
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_18rem] md:items-start">
        <div>
          <h2
            id="about-heading"
            className="font-mono text-sm font-semibold tracking-wide text-primary uppercase"
          >
            About
          </h2>
          <p className="mt-4 max-w-2xl text-2xl leading-snug font-medium text-balance text-foreground">
            {aboutMe}
          </p>
        </div>

        <div className="relative order-first mx-auto aspect-square w-40 overflow-hidden rounded-2xl border border-border bg-muted md:order-last md:w-full">
          <Image
            src="/placeholder-avatar.svg"
            alt={`Placeholder avatar for ${personal.name} — replace with a professional headshot`}
            fill
            sizes="(min-width: 768px) 18rem, 10rem"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
