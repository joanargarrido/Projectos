import { PageHeader } from "@/components/page-header";
import { jobApplicationStatuses } from "@/app/board/components/types";
import { mockJobApplications } from "@/lib/data/mock-job-applications";

export default function Home() {
  const stats = jobApplicationStatuses.map((status) => ({
    label: status,
    value: String(
      mockJobApplications.filter((application) => application.status === status)
        .length,
    ),
  }));

  return (
    <div>
      <PageHeader
        title="Overview"
        description="A snapshot of your current job search pipeline."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">
              {stat.value}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
