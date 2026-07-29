import type { JobStatus } from "@/constants/job-statuses";
import type { Contact } from "./Contact";
import type { Task } from "./Task";
import type { Material } from "./Material";

export type OfficeType =
  | "REMOTE"
  | "HYBRID"
  | "ONSITE";

export interface JobFolder {
  folderId: number;

  folder: {
    id: number;
    name: string;
  };
}

export interface Job {
  id: number;

  company: string;
  position: string;

  status: JobStatus;

  dateApplied: string;

  salary?: string;
  salaryNotes?: string;

  location?: string;

  officeType?: OfficeType;

  url?: string;

  description?: string;

  notes?: string;

  referredBy?: string;

  archived: boolean;

  createdAt?: string;
  updatedAt?: string;

  folders: JobFolder[];

  contacts: {
  contact: Contact;
}[];

tasks: {
  task: Task;
}[];

materials: {
  material: Material;
}[];
}

export type CreateJob = {
  company: string;
  position: string;

  status: JobStatus;

  dateApplied: string;

  salary?: string;
  salaryNotes?: string;

  location?: string;

  officeType?: OfficeType;

  url?: string;

  description?: string;

  notes?: string;

  referredBy?: string;

  folderIds?: number[];
};

export type UpdateJob = Omit<Job, "folders"> & {
  folderIds: number[];
};