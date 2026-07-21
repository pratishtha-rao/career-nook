export type ContactType =
  | "Recruiter"
  | "Hiring Manager"
  | "Employee"
  | "Mentor"
  | "Other";


export type Contact = {
  id: number;
  name: string;
  company: string;
  role: string;
  type: ContactType;
  email?: string;
  notes?: string;
};

export type CreateContact = Omit<Contact, "id">;
