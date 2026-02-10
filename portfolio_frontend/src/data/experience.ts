export type ExperienceItem = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  achievements: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Lead AI/ML Engineer",
    company: "Blue Current Labs",
    location: "Remote",
    start: "2021",
    end: "Present",
    achievements: [
      "Designed and shipped an LLM-powered support assistant (RAG + evaluation harness), reducing resolution time by 28%.",
      "Standardized MLOps tooling (CI/CD for models, automated monitoring, drift checks), improving deployment cadence from monthly to weekly.",
      "Optimized real-time inference with batching and quantization, cutting p95 latency by 41%.",
    ],
  },
  {
    role: "Senior Machine Learning Engineer",
    company: "Harbor Analytics",
    location: "New York, NY",
    start: "2017",
    end: "2021",
    achievements: [
      "Built end-to-end feature store pipelines and training workflows for forecasting and anomaly detection.",
      "Led migration from notebooks to reproducible pipelines with experiment tracking and model registry.",
      "Partnered with stakeholders to define success metrics and deliver measurable KPI improvements.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    company: "Seaspray Technologies",
    location: "Boston, MA",
    start: "2013",
    end: "2017",
    achievements: [
      "Developed computer vision models for inspection automation with robust augmentation and active learning loops.",
      "Introduced model interpretability practices and responsible AI reviews for production releases.",
    ],
  },
];
