export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Alex consistently delivers production-ready ML systems with rigorous evaluation and clear communication. A rare blend of strategy and hands-on execution.",
    name: "Jordan Lee",
    role: "Director of Data",
  },
  {
    quote:
      "From model performance to operational excellence, Alex raised our bar for reliability and responsible AI practices across the org.",
    name: "Samira Patel",
    role: "VP Engineering",
  },
  {
    quote:
      "Alex’s work on LLM tooling and MLOps unlocked faster iteration cycles and improved outcomes across multiple product teams.",
    name: "Chris Nguyen",
    role: "Product Lead",
  },
];
