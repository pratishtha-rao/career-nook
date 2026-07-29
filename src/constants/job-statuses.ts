export const JOB_STATUSES = [
  "Interested",
  "Saved",
  "Not Started",
  "Preparing Resume",
  "Preparing Cover Letter",
  "Ready to Apply",
  "Applied",
  "OA",
  "Phone Screen",
  "Recruiter Call",
  "Technical Interview",
  "Behavioral Interview",
  "Interview",
  "Final Interview",
  "Reference Check",
  "Offer",
  "Negotiating",
  "Accepted",
  "Rejected",
  "Ghosted",
  "Withdrawn",
] as const;

export type JobStatus =
  (typeof JOB_STATUSES)[number];


  {/* PREVIOUS OPTIONS (LIMITED BUT EASIER TO NAVIGATE):
    
      "Applied",
  "OA",
  "Interview",
  "Final Interview",
  "Offer",
  "Rejected",
  "Ghosted",

    
    */}