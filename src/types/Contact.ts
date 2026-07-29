import type { Folder } from "./Folder";

export type ContactType =
  | "Recruiter"
  | "Hiring Manager"
  | "Employee"
  | "Mentor"
  | "Other";

export interface ContactFolder {
  folderId: number;
  folder: Folder;
}

export type Contact = {
  id: number;

  name: string;
  company: string;
 role: string;
  type: ContactType;

  email?: string;
  phone?: string;
  linkedin?: string;
  location?: string;

  website?: string;
  twitter?: string;

  referredBy?: string;
  relationship?: string;

  lastContact?: string;
  nextFollowUp?: string;

  notes?: string;

  favorite: boolean;
  order: number;

    archived: boolean;

  folderContacts: ContactFolder[];
};

export type CreateContact = {
  name: string;
  company: string;
  role: string;
  type: ContactType;

  email?: string;
  phone?: string;
  linkedin?: string;
  location?: string;

  website?: string;
  twitter?: string;

  referredBy?: string;
  relationship?: string;

  lastContact?: string;
  nextFollowUp?: string;

  notes?: string;

  folderIds?: number[];
};