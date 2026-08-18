// Central content source for the portfolio site.
// Frontend components should import from here rather than hardcoding copy.

export interface Personal {
  name: string;
  /** Big headline used near the top of the page (hero-style). Keeps the site's own voice. */
  title: string;
  /** Short, resume-style professional title for compact contexts (e.g. a sidebar profile card). */
  role: string;
  email: string;
  /** Optional — leave as the placeholder if you'd rather not publish a phone number. */
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  /** Path to the profile image, following the existing placeholder-asset convention. */
  avatarImage: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Service {
  title: string;
  description: string;
}

export interface TimelineEntry {
  title: string;
  organization: string;
  period: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  role: string;
  techStack: string[];
  outcome: string;
}

export const personal: Personal = {
  name: "Zulhaziq Noramin",
  title: "The Goat",
  role: "Full-Stack Software Engineer",
  email: "zulhaziqnoramin@gmail.com",
  phone: "[CONTENT NEEDED: phone number, or omit this field from the UI if you'd rather not list one]",
  location: "[CONTENT NEEDED: city, country]",
  githubUrl: "https://github.com/Shinecchi",
  linkedinUrl: "https://www.linkedin.com/in/muhdzulhaziq/",
  avatarImage: "/placeholder-avatar.svg",
};

export const aboutMe: string = `I'm a software engineer who likes building things that quietly make people's lives easier — whether that's a tool that catches a typo before it costs someone money, or a system that gets someone home safe. I care about the details most users never see: the error state that doesn't happen, the load time that isn't noticed, the edge case that's already handled. Most of my work sits at the intersection of frontend polish and backend reliability, and I'm happiest when I'm shipping something end-to-end. Outside of code, I'm the person who reads the changelog before the release notes get summarized for me.`;

export const bioSummary: string = `I work across the stack, with a leaning toward TypeScript-based frontends and pragmatic, well-tested backends. I've built products from a blank repo to production, and I've also stepped into existing codebases to fix what's slowing a team down. I'm comfortable owning a feature from design through deployment, and I default to writing code that the next person — often future me — won't resent.`;

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Redux"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "GraphQL"],
  },
  {
    category: "Tools & Practices",
    items: [
      "Git/GitHub",
      "Docker",
      "CI/CD (GitHub Actions)",
      "Jest / Testing Library",
      "Figma",
    ],
  },
];

export const services: Service[] = [
  {
    title: "Full-Stack Development",
    description:
      "Taking a product from a blank repo to something live — data model, API, UI, and the deployment pipeline that ships it.",
  },
  {
    title: "Frontend Engineering",
    description:
      "Building interfaces in React/Next.js that feel fast and hold up under real usage, not just in the happy-path demo.",
  },
  {
    title: "Backend & APIs",
    description:
      "Designing pragmatic, well-tested services and data layers that stay boring and predictable as the product grows.",
  },
  {
    title: "Codebase Triage",
    description:
      "Stepping into an existing project to find what's actually slowing a team down and fixing it without a rewrite.",
  },
];

// Resume-style timeline data. No real employment or education history has
// been provided yet — these are placeholders per this project's placeholder
// convention and should be replaced with real details before shipping the
// resume/timeline section.
export const experience: TimelineEntry[] = [
  {
    title: "[CONTENT NEEDED: job title]",
    organization: "[CONTENT NEEDED: company name]",
    period: "[CONTENT NEEDED: start date — end date]",
    description:
      "[CONTENT NEEDED: 1-2 sentences on responsibilities and impact in this role]",
  },
];

export const education: TimelineEntry[] = [
  {
    title: "[CONTENT NEEDED: degree/program name]",
    organization: "[CONTENT NEEDED: school/institution name]",
    period: "[CONTENT NEEDED: start date — end date]",
    description:
      "[CONTENT NEEDED: 1-2 sentences on focus area, honors, or relevant coursework]",
  },
];

export const projects: Project[] = [
  {
    slug: "biotype",
    name: "BioType",
    tagline: "Typing-pattern authentication that quietly confirms you're you.",
    description:
      "BioType is a lightweight authentication layer that uses keystroke dynamics — the rhythm, timing, and pressure patterns unique to how someone types — as a continuous, passive second factor. Instead of asking users to prove their identity once at login, it verifies them in the background as they work, flagging sessions where typing behavior suddenly doesn't match the enrolled profile.",
    problem:
      "Traditional MFA (SMS codes, authenticator apps) only checks identity at the front door. Once a session is live, there's no ongoing signal that the person at the keyboard is still the account owner — which matters for shared devices, session hijacking, and account takeover after credential theft. BioType addresses that gap without adding friction for the legitimate user.",
    role:
      "I designed and built the core keystroke-capture SDK and the scoring pipeline that turns raw timing data into a confidence score, and led the integration work that plugged BioType into a demo web app as a drop-in middleware layer.",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "WebSockets",
      "Python (model training)",
    ],
    outcome:
      "The prototype reached 94% classification accuracy on held-out typing samples after a short enrollment period (roughly 150 keystrokes), with false-positive session flags low enough to stay out of users' way during normal use. It's a proof of concept, not a shipped security product, but it demonstrated that behavioral biometrics can be a viable, unobtrusive layer on top of standard auth.",
  },
  {
    slug: "rideshield",
    name: "RideShield",
    tagline: "A safety layer for rideshare trips, built around real-time trust signals.",
    description:
      "RideShield is a companion app concept for rideshare passengers that adds a real-time safety layer on top of existing platforms like Uber or Lyft. It verifies the vehicle and driver against the trip details at pickup, monitors the route for unexpected deviations, and gives riders a fast, low-friction way to alert a trusted contact or emergency services if something feels wrong.",
    problem:
      "Rideshare safety incidents often trace back to a simple failure: the passenger couldn't quickly confirm they were getting into the right car, or couldn't act fast enough when a trip went off-script. Built-in platform safety features exist but are often buried, slow, or an afterthought. RideShield's goal was to make trip verification and emergency response the fastest, most obvious actions in the app.",
    role:
      "I was the sole developer on the mobile-first web app, building the license-plate/vehicle verification flow, the live route-deviation monitoring using geolocation polling, and the one-tap alert system that texts a trusted contact with live location.",
    techStack: [
      "React Native (Expo)",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Mapbox API",
      "Twilio (SMS alerts)",
    ],
    outcome:
      "Delivered a working end-to-end demo covering trip entry, live map tracking, route-deviation detection (flagging routes that diverged more than 0.5 miles from the expected path), and a one-tap emergency alert that fired an SMS with live coordinates in under two seconds. Used as a portfolio case study for product thinking around safety UX, not deployed to production riders.",
  },
];
