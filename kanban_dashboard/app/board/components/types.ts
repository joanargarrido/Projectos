export enum JobApplicationStatus {
  WISHLIST = "Wishlist",
  APPLIED = "Applied",
  INTERVIEWING = "Interviewing",
  REJECTED = "Rejected",
  OFFER = "Offer"
}

export const jobApplicationStatuses = [
  JobApplicationStatus.WISHLIST,
  JobApplicationStatus.APPLIED,
  JobApplicationStatus.INTERVIEWING,
  JobApplicationStatus.REJECTED,
  JobApplicationStatus.OFFER,
];

export interface JobApplication {
  companyName: string;
  role: string;
  salary: number;
  dateApplied: string;
  notes: string;
  status: JobApplicationStatus;
}

export interface BoardApplication {
  id: number;
  application: JobApplication;
}