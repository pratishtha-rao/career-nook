import type { Material } from "@/types/Material";

export const demoMaterials: Material[] = [
  {
    id: 1,
    name: "Software Engineer Resume",
    type: "Resume",
    description: "Tailored for SWE internships.",
    link: "https://example.com",
    createdAt: new Date(),
    userId: "demo",
    archived: false,
  },
  {
    id: 2,
    name: "General Cover Letter",
    type: "Cover Letter",
    description: "Reusable cover letter template.",
    link: "https://example.com",
    createdAt: new Date(),
    userId: "demo",
    archived: false,
  },
];