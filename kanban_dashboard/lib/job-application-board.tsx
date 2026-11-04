"use client";

import { useState } from "react";
import {
  BoardApplication,
  JobApplication,
  jobApplicationStatuses,
  type JobApplicationStatus,
} from "@/app/board/components/types";
import { formatDate, formatSalary } from "@/lib/utils";

export type JobApplicationBoardProps = {
  applications: JobApplication[];
}

export function JobApplicationBoard({
  applications,
}: JobApplicationBoardProps) {
  const [boardApplications, setBoardApplications] = useState<BoardApplication[]>(
    () =>
      applications.map((application, id) => ({
        id,
        application,
      })),
  );
  const [draggedApplicationId, setDraggedApplicationId] = useState<number | null>(
    null,
  );
  const [dropTargetStatus, setDropTargetStatus] =
    useState<JobApplicationStatus | null>(null);
  const [announcement, setAnnouncement] = useState("");

  function moveApplication(id: number, status: JobApplicationStatus) {
    const entry = boardApplications.find((item) => item.id === id);
    if (!entry || entry.application.status === status) {
      return;
    }

    setBoardApplications((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, application: { ...item.application, status } }
          : item,
      ),
    );
    setAnnouncement(
      `${entry.application.companyName} moved to ${status}.`,
    );
  }

  function handleDrop(
    event: React.DragEvent<HTMLElement>,
    status: JobApplicationStatus,
  ) {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData("text/plain");
    if (draggedId) {
      const id = Number(draggedId);
      if (Number.isInteger(id)) {
        moveApplication(id, status);
      }
    }
    setDraggedApplicationId(null);
    setDropTargetStatus(null);
  }

  return (
    <section
      aria-label="Job applications by status"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5"
    >
      {jobApplicationStatuses.map((status) => {
        const statusApplications = boardApplications.filter(
          (item) => item.application.status === status,
        );

        return (
          <article
            key={status}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              setDropTargetStatus(status);
            }}
            onDrop={(event) => handleDrop(event, status)}
            className={`rounded-xl border p-4 transition-colors ${
              dropTargetStatus === status
                ? "border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30"
                : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            }`}
          >
            <h2 className="mb-3 flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-zinc-500">
              <span>{status}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium normal-case tracking-normal text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {statusApplications.length}
              </span>
            </h2>
            <ul className="space-y-2">
              {statusApplications.map(({ id, application }) => (
                <li
                  key={id}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = "move";
                    event.dataTransfer.setData("text/plain", String(id));
                    setDraggedApplicationId(id);
                  }}
                  onDragEnd={() => {
                    setDraggedApplicationId(null);
                    setDropTargetStatus(null);
                  }}
                  className={`cursor-grab rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3 text-sm active:cursor-grabbing dark:border-zinc-700 dark:bg-zinc-800 ${
                    draggedApplicationId === id ? "opacity-50" : ""
                  }`}
                >
                  <p className="font-medium">{application.role}</p>
                  <p className="mt-0.5 text-zinc-600 dark:text-zinc-300">
                    {application.companyName}
                  </p>
                  <p className="mt-2 text-xs text-zinc-500">
                    {formatSalary(application.salary)} ·{" "}
                    {formatDate(application.dateApplied)}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                    {application.notes}
                  </p>
                  <label className="sr-only" htmlFor={`status-${id}`}>
                    Move {application.companyName} to another status
                  </label>
                  <select
                    id={`status-${id}`}
                    value={application.status}
                    onChange={(event) => {
                      const nextStatus = jobApplicationStatuses.find(
                        (candidate) => candidate === event.currentTarget.value,
                      );
                      if (nextStatus) {
                        moveApplication(id, nextStatus);
                      }
                    }}
                    className="mt-3 w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {jobApplicationStatuses.map((option) => (
                      <option key={option} value={option}>
                        {option === application.status
                          ? `Current: ${option}`
                          : `Move to ${option}`}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
          </article>
        );
      })}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
