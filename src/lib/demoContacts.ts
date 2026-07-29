import type { Contact } from "@/types/Contact";

export const demoContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Google",
    role: "Software Engineer",
    email: "sarah@example.com",
    phone: "(555) 123-4567",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    location: "Mountain View, CA",
    notes: "Met at Grace Hopper Conference. Follow up in August.",
    type: "Recruiter",

    favorite: true,
    order: 0,
    archived: false,

    folderContacts: [],
  },

  {
    id: 2,
    name: "Michael Chen",
    company: "Microsoft",
    role: "Senior SWE",
    email: "michael@example.com",
    phone: "(555) 987-6543",
    linkedin: "https://linkedin.com/in/michaelchen",
    location: "Seattle, WA",
    notes: "University alumni. Open to referrals.",
    type: "Mentor",

    favorite: false,
    order: 1,
    archived: false,

    folderContacts: [],
  },
];