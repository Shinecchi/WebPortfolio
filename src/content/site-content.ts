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

export type ProficiencyLevel = "intermediate" | "proficient" | "advanced";

export interface CoreSkill {
  name: string;
  level: ProficiencyLevel;
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

export interface ActivityEntry {
  year: string;
  title: string;
  role: string;
  description: string;
  /** Poster/cover image path. Omit to fall back to a generated placeholder. */
  poster?: string;
  /** Photos from the event, shown in the expanded gallery. Omit or leave empty until real photos exist. */
  gallery?: string[];
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
  githubUrl: string;
  /** Cover image path. Omit to fall back to a generated placeholder. */
  poster?: string;
  /** Screenshots shown in the expanded gallery. Omit or leave empty until real photos exist. */
  gallery?: string[];
  /** YouTube URL for a demo video. Omit to skip the video section entirely. */
  videoUrl?: string;
}

export const personal: Personal = {
  name: "Muhammad Zulhaziq Noramin",
  title: "The Goat",
  role: "Computer Science Student — ML & Data Analytics",
  email: "zulhaziqnoramin@gmail.com",
  phone: "+60 11-2640 0207",
  location: "Bayan Lepas, Pulau Pinang, Malaysia",
  githubUrl: "https://github.com/Shinecchi",
  linkedinUrl: "https://www.linkedin.com/in/muhdzulhaziq/",
  avatarImage: "/placeholder-avatar.svg",
};

export const aboutMe: string = `I'm a Computer Science student (3.64 CGPA, Dean's List 2023-2025) who spends most of my time in the space between machine learning and data analytics — training models, wrangling messy datasets into something a pipeline can trust, and turning the output into dashboards someone actually reads. I care about the parts most people skip past: whether a model's mistakes are the safe kind, whether a dataset was sourced honestly, whether the preprocessing steps are documented well enough that someone else (often future me) can reproduce them. Outside of coursework, I've spent a fair number of weekends in hackathons building things end-to-end under a ticking clock.`;

export const bioSummary: string = `I specialize in machine learning, data science, and analytics — from designing and deploying deep learning and agentic AI systems, to building end-to-end data pipelines, to putting together BI dashboards that support real decision-making. I'm comfortable owning a project from raw data through a trained model to a stakeholder-facing report, and I default to documenting preprocessing and evaluation decisions clearly enough that the results hold up to scrutiny.`;

export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: ["Python", "SQL", "JavaScript", "PHP", "Java", "C++", "MATLAB"],
  },
  {
    category: "Web Technologies",
    items: ["HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "OpenCV",
      "YOLOv8",
      "Pandas",
      "Matplotlib",
      "NLTK",
      "Transformers (HuggingFace)",
      "Prophet",
    ],
  },
  {
    category: "Tools & Software",
    items: [
      "RapidMiner",
      "Tableau",
      "Power BI",
      "Excel (Macro/VBA)",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Oracle APEX",
      "Figma",
      "Git/GitHub",
    ],
  },
  {
    category: "Spoken Languages",
    items: ["Malay (Native)", "English (Proficient)"],
  },
];

// Draft proficiency self-assessment inferred from the projects/coursework
// above (e.g. "advanced" where a full project was shipped with it) — please
// confirm or adjust these before treating them as final, same as the other
// placeholder content in this file.
export const coreSkills: CoreSkill[] = [
  { name: "Python", level: "advanced" },
  { name: "SQL", level: "proficient" },
  { name: "TensorFlow / Keras", level: "advanced" },
  { name: "Power BI", level: "proficient" },
  { name: "Tableau", level: "intermediate" },
  { name: "JavaScript", level: "intermediate" },
];

export const services: Service[] = [
  {
    title: "Machine Learning & AI",
    description:
      "Building end-to-end ML pipelines from raw data through model training, evaluation, and iteration — including deep learning models for computer vision and behavioral biometrics.",
  },
  {
    title: "Data Analytics & Visualization",
    description:
      "Cleaning and analyzing large datasets using Python and SQL, and translating findings into interactive Power BI and Tableau dashboards that support real business decisions.",
  },
  {
    title: "Agentic AI & Automation",
    description:
      "Designing and building multi-agent AI systems that integrate live APIs and automate end-to-end workflows — turning manual, multi-step processes into autonomous pipelines.",
  },
  {
    title: "NLP & Transformer Models",
    description:
      "Applying transformer-based models like DistilBERT for large-scale text classification and sentiment analysis, with hands-on experience building preprocessing pipelines for unstructured data.",
  },
];

export const experience: TimelineEntry[] = [
  {
    title: "Kumon Instructor — Mathematics",
    organization: "Kumon Education Centre",
    period: "Jun 2024 — Sep 2024",
    description:
      "Communicated with students and parents to manage classroom activities and maintain a productive learning environment, and tracked student progress data to identify learning gaps and adjust teaching plans accordingly.",
  },
];

export const education: TimelineEntry[] = [
  {
    title: "Bachelor in Computer Science",
    organization: "Universiti Teknologi MARA, Cawangan Tapah",
    period: "Sep 2023 — Present",
    description:
      "CGPA 3.64, Dean's List 2023-2025. Relevant coursework: Software Engineering, Operating Systems, Artificial Intelligence, Database Engineering, Data Structures, Business and Data Analytics.",
  },
  {
    title: "Physical Module (Matriculation)",
    organization: "Kolej Matrikulasi Pulau Pinang",
    period: "Jul 2022 — May 2023",
    description:
      "CGPA 3.71, MUET Band 4.0. Group Leader for a peer-teaching program in Mathematics and Physics.",
  },
  {
    title: "Secondary Education",
    organization: "SMK Bukit Jambul",
    period: "Jan 2020 — Mar 2022",
    description:
      "2nd runner-up, National KenKen Puzzle Championship 2021. Participated in the STEM Creating Video Competition 2020.",
  },
];

// Reverse-chronological in the resume; stored oldest-first here so the
// Activities timeline (rendered bottom-to-top) reads chronologically from
// bottom to top without an extra sort step in the component.
export const activities: ActivityEntry[] = [
  {
    year: "2024",
    title: "Hack Blast 2024",
    role: "Participant",
    description:
      "Designed and implemented a relational database schema for a car rental management system, handling data modelling and query logic under hackathon time constraints.",
  },
  {
    year: "2025",
    title: "Prosolve National 2025",
    role: "Participant",
    description:
      "Competed in a national-level competitive programming competition, solving algorithms and technical coding challenges under time constraints.",
  },
  {
    year: "2026",
    title: "Autopilot Asia Hackathon 2026",
    role: "Participant",
    description:
      "Designed and built a multi-agent AI system (1 Orchestrator + 5 specialized Operator Agents) to automate lead qualification and outreach, reducing lead response time from days to seconds. Integrated 4 live systems (Supabase, HubSpot CRM, Slack, Microsoft Outlook) covering visitor identification, CRM enrichment, intent scoring, automated email outreach, and human-in-the-loop escalation.",
  },
];

// GitHub links below point at this profile as a placeholder — swap each
// `githubUrl` for the project's actual repo once it's public.
export const projects: Project[] = [
  {
    slug: "youtube-sentiment-analytics",
    name: "YouTube Audience Sentiment & Engagement Analytics",
    tagline: "What 5,000+ YouTube comments actually say about a video's audience.",
    description:
      "An NLP analytics project that scrapes and processes YouTube comments across a large sample of videos, then applies transformer-based sentiment labelling and engineered engagement features to quantify how an audience is really responding to content.",
    problem:
      "View counts and likes don't say much about how an audience actually feels about a video, and comment sections are too large and unstructured to read manually. The project needed a pipeline that could turn thousands of raw, noisy comments into a reliable, unbiased signal of sentiment and engagement.",
    role:
      "Data Scientist, in a team of 4-5. Scraped and processed 5,046 comments across 101 videos via the YouTube Data API using random sampling to eliminate recency bias, built the end-to-end NLP preprocessing pipeline, and helped build and compare predictive models in RapidMiner.",
    techStack: [
      "Python",
      "YouTube Data API",
      "DistilBERT (Transformers)",
      "RapidMiner",
      "Logistic Regression / Naive Bayes / SVR / Random Forest",
    ],
    outcome:
      "Applied a DistilBERT transformer for automated sentiment labelling, reaching 96.2% mean confidence across 3,849 training samples, and engineered 12 analytical features including a weighted engagement score to quantify content performance.",
    githubUrl: "https://github.com/Shinecchi",
  },
  {
    slug: "retail-sales-forecasting",
    name: "Retail Sales Performance Analysis & Forecasting",
    tagline: "Turning 9,994 rows of retail transactions into a stakeholder-ready dashboard.",
    description:
      "A solo data analytics project that cleans and explores a retail sales dataset to surface the real drivers of sales and profit, then packages the findings into an interactive, stakeholder-facing dashboard.",
    problem:
      "Raw retail transaction data doesn't tell a business where it's winning or losing money on its own — someone has to clean it, ask the right questions of it, and present the answers in a way a non-technical stakeholder can act on.",
    role:
      "Solo. Cleaned and analyzed the dataset with Python and Pandas, ran exploratory analysis through groupby aggregation and Matplotlib visualizations, and designed the final Power BI dashboard.",
    techStack: ["Python", "Pandas", "Matplotlib", "Power BI"],
    outcome:
      "Identified key sales and profit drivers across regions, categories, and sub-categories, and delivered an interactive Power BI dashboard combining KPI cards, a choropleth map of sales by state, and category-level profit breakdowns.",
    githubUrl: "https://github.com/Shinecchi",
  },
  {
    slug: "biotype",
    name: "BioType — Behavioral Biometrics Authentication",
    tagline: "Verifying identity from how someone types, not just what they type.",
    description:
      "BioType is a behavioral biometrics authentication system that uses a Siamese Neural Network to verify identity from keystroke dynamics — the rhythm and timing patterns unique to how a person types — rather than a single one-time credential.",
    problem:
      "Traditional authentication only checks identity once, at login. There's no continuous signal that the person at the keyboard is still the account owner, and building a model that's actually accurate enough to rely on requires sourcing and processing large-scale behavioral data, which is harder to get right than it sounds.",
    role:
      "Lead Developer. Designed and implemented a Siamese Neural Network with triplet loss for the authentication model, and built the full ML pipeline in Python covering data extraction from raw keystroke sources, image transformation, model training, and evaluation.",
    techStack: ["Python", "TensorFlow", "Keras", "Matplotlib"],
    outcome:
      "Reduced Equal Error Rate from ~40% to ~20% through iterative model improvement, sourced and processed large-scale training data from the Aalto University Desktop Dataset despite access challenges across multiple academic dataset sources, and documented the preprocessing and evaluation methodology for reproducibility.",
    githubUrl: "https://github.com/Shinecchi",
  },
  {
    slug: "baldness-detection",
    name: "Baldness Detection System",
    tagline: "A web-based diagnostic tool that classifies scalp condition severity from images.",
    description:
      "A web-based diagnostic tool that uses a computer vision object detection model to classify scalp conditions into severity levels, aimed at real-time diagnostic use.",
    problem:
      "Assessing scalp/hair-loss severity consistently usually requires a specialist's eye. The project explores whether an object detection model, trained on curated and annotated image data, can classify severity levels reliably enough to support a real-time diagnostic tool.",
    role:
      "ML Engineer. Trained and optimized a YOLOv8 medium object detection model, and managed the complete ML pipeline including dataset curation, annotation, preprocessing with OpenCV, model training, and validation.",
    techStack: ["Python", "YOLOv8", "OpenCV"],
    outcome:
      "Classified scalp conditions into three severity levels (Good, Mild, Severe) for real-time diagnostic use, and documented preprocessing decisions and validation outcomes to ensure transparency, accuracy, and reproducibility of results.",
    githubUrl: "https://github.com/Shinecchi",
  },
  {
    slug: "adsurevent",
    name: "AdsUrEvent",
    tagline: "The frontend for a university event management web application.",
    description:
      "AdsUrEvent is an event management web application covering event browsing, payment, and part-timer recruitment, built with a cross-functional university team.",
    problem:
      "Coordinating event browsing, ticket payment, and part-time staff recruitment into one coherent web app required aligning layouts and user flow across several distinct feature areas and a team with mixed design opinions.",
    role:
      "UI Designer. Collaborated with a cross-functional team to design and implement the full frontend, coordinating on layouts and user flow, and communicated regularly with teammates to align on design decisions and resolve conflicting priorities.",
    techStack: ["HTML", "CSS", "JavaScript", "Figma"],
    outcome:
      "Shipped a complete frontend covering event browsing, payment, and part-timer recruitment flows as part of a university team project.",
    githubUrl: "https://github.com/Shinecchi",
    videoUrl: "https://youtu.be/UP1bq6ANMF0",
  },
];
