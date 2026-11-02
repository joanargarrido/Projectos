export type JobApplicationStatus =
  | "Wishlist"
  | "Applied"
  | "Interviewing"
  | "Rejected"
  | "Offer";

export interface JobApplication {
  companyName: string;
  role: string;
  salary: number;
  dateApplied: string;
  notes: string;
  status: JobApplicationStatus;
}

export const jobApplicationStatuses = [
  "Wishlist",
  "Applied",
  "Interviewing",
  "Rejected",
  "Offer",
] as const satisfies readonly JobApplicationStatus[];
