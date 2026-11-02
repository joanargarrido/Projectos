import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Workspace preferences for this dashboard."
      />
      <section className="max-w-xl rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Theme follows your system preference. Navigation stays available on
          desktop and collapses into a drawer on smaller screens.
        </p>
      </section>
    </div>
  );
}
