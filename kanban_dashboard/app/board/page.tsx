import { PageHeader } from "@/components/page-header";
import { JobApplicationBoard } from "@/features/job-applications/components/job-application-board";
import { mockJobApplications } from "@/features/job-applications/data/mock-job-applications";

export default function BoardPage() {
  return (
    <div>
      <PageHeader
        title="Board"
        description="Track job applications as they move from wishlist to offer."
      />
      <JobApplicationBoard applications={mockJobApplications} />
    </div>
  );
}
