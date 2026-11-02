"use client";

import { Suspense, useEffect, useId, useState } from "react";
import { SidebarNav } from "@/components/sidebar-nav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileNav = () => setMobileOpen(false);

  return (
    <div className="min-h-full overflow-x-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-zinc-950/40 md:hidden"
          onClick={closeMobileNav}
        />
      ) : null}

      <aside
        id="app-sidebar"
        aria-labelledby={titleId}
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-200 bg-white transition-transform duration-200 ease-out dark:border-zinc-800 dark:bg-zinc-900 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <p id={titleId} className="text-sm font-semibold tracking-tight">
            Kanban
          </p>
          <button
            type="button"
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 md:hidden dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            onClick={closeMobileNav}
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>
        <Suspense
          fallback={
            <div className="flex flex-1 flex-col gap-1 px-3">
              <div className="h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
          }
        >
          <SidebarNav onNavigate={closeMobileNav} />
        </Suspense>
        <div className="border-t border-zinc-200 px-5 py-4 pb-16 text-xs text-zinc-500 dark:border-zinc-800">
          Workspace
        </div>
      </aside>

      <div className="flex min-h-full flex-col md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur md:hidden dark:border-zinc-800 dark:bg-zinc-900/90">
          <button
            type="button"
            className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            onClick={() => setMobileOpen(true)}
            aria-controls="app-sidebar"
            aria-expanded={mobileOpen}
            aria-label="Open sidebar"
          >
            <MenuIcon />
          </button>
          <p className="text-sm font-semibold tracking-tight">Kanban</p>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
