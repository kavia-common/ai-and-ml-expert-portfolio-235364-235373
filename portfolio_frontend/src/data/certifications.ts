export type Certification = {
  name: string;
  issuer: string;
  year: string;
  verifyUrl?: string;
};

export const certifications: Certification[] = [
  {
    name: "Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    year: "2023",
    verifyUrl: "#",
  },
  {
    name: "AWS Certified Machine Learning – Specialty",
    issuer: "Amazon Web Services",
    year: "2022",
    verifyUrl: "#",
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "TensorFlow",
    year: "2021",
    verifyUrl: "#",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    year: "2020",
    verifyUrl: "#",
  },
];
