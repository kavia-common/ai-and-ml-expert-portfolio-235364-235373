export type Project = {
  title: string;
  description: string;
  tags: string[];
  imageAlt?: string;
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    title: "RAG Knowledge Assistant",
    description:
      "Retrieval-augmented generation system with evaluation harness, citation grounding, and safety filters for enterprise search.",
    tags: ["LLM", "RAG", "Vector DB", "TypeScript", "FastAPI"],
    demoUrl: "#",
    githubUrl: "#",
    imageAlt: "Abstract gradient preview for RAG assistant project",
  },
  {
    title: "Real-time Anomaly Detection",
    description:
      "Streaming detection for operational metrics with adaptive thresholds, feature pipelines, and alert routing.",
    tags: ["Python", "Kafka", "Time Series", "MLOps", "Monitoring"],
    demoUrl: "#",
    githubUrl: "#",
    imageAlt: "Dashboard-style preview for anomaly detection project",
  },
  {
    title: "Vision Quality Inspection",
    description:
      "Computer vision pipeline for defect detection with active learning and automated data curation.",
    tags: ["Computer Vision", "PyTorch", "ONNX", "Edge", "Labeling"],
    demoUrl: "#",
    githubUrl: "#",
    imageAlt: "Camera/inspection themed preview for vision project",
  },
  {
    title: "Model Serving Platform",
    description:
      "Kubernetes-native model serving with canary rollout, autoscaling, and structured logging for compliance.",
    tags: ["Kubernetes", "Inference", "CI/CD", "Observability", "AWS/GCP"],
    demoUrl: "#",
    githubUrl: "#",
    imageAlt: "Infrastructure themed preview for model serving platform",
  },
];
