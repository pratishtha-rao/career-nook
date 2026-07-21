export type JobStatus =
  | "Saved"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";


export type Job = {
  id: number;
  company: string;
  position: string;
  status: JobStatus;
  dateApplied: string;
  url?: string;
  notes?: string;
};