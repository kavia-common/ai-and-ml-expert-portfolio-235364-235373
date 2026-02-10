export const profile = {
  name: "Alex Ocean",
  title: "AI/ML Engineer",
  badge: "10+ Years",
  location: "Remote / Global",
  bio: "Seasoned AI/ML engineer with 10+ years building production ML systems—from data pipelines and model training to scalable inference, MLOps, and LLM-powered applications. I focus on measurable business outcomes, reliability, and responsible AI.",
  resumeUrl: "#",
  email: "alex.ocean@example.com",
  links: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  },
  highlights: [
    "MLOps & Model Serving",
    "LLMs, RAG, Agents",
    "Computer Vision & NLP",
    "Cloud (AWS/GCP), Kubernetes",
  ],
} as const;

export type Profile = typeof profile;
