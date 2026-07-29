"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StatCard from "@/components/dashboard/StatCard";

type DashboardData = {
  totalJobs: number;
  applied: number;
  interviews: number;
  offers: number;
  rejected: number;
  successRate: number;

  totalTasks: number;
  completedTasks: number;
  remainingTasks: number;

  totalMaterials: number;
  resumes: number;
  coverLetters: number;
  portfolios: number;

  recentJobs: {
    id: number;
    company: string;
    position: string;
    status: string;
    dateApplied: string;
    createdAt: string;
  }[];
};

export default function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await fetch(
          "/api/dashboard"
        );

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9ff]">
        <p className="text-slate-600">
          Loading dashboard...
        </p>
      </main>
    );
  }
    return (
    <main className="min-h-screen bg-[#f5f9ff]">
      <div className="mx-auto max-w-7xl px-8 py-12">
        {/* HEADER */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Your career search command center.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/jobs"
              className="bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Add Application
            </a>

            <a
              href="/copilot"
              className="border border-blue-200 bg-white px-5 py-3 font-semibold transition hover:text-blue-600"
            >
              Open Copilot
            </a>
          </div>
        </div>

        {/* MAIN STATS */}

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <StatCard
            title="Applications"
            value={stats?.totalJobs ?? 0}
          />

          <StatCard
            title="Interviews"
            value={stats?.interviews ?? 0}
          />

          <StatCard
            title="Offers"
            value={stats?.offers ?? 0}
          />

          <StatCard
            title="Offer Success Rate"
            value={`${stats?.successRate ?? 0}%`}
          />
        </div>

        {/* SECONDARY STATS */}

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <StatCard
            title="Tasks Remaining"
            value={stats?.remainingTasks ?? 0}
          />

          <StatCard
            title="Completed Tasks"
            value={stats?.completedTasks ?? 0}
          />

          <StatCard
            title="Career Materials"
            value={stats?.totalMaterials ?? 0}
          />
        </div>

        {/* RECENT APPLICATIONS */}

        <section className="mt-10 border border-blue-100 bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Recent Applications
            </h2>

            <a
              href="/jobs"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View All →
            </a>
          </div>

          <div className="mt-6 space-y-4">
            {(stats?.recentJobs ?? []).length === 0 ? (
              <div className="border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No applications yet. Start tracking your first
                opportunity.
              </div>
            ) : (
              stats?.recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between border border-slate-200 p-5 transition hover:border-blue-300"
                >
                  <div>
                    <h3 className="text-lg font-bold">
                      {job.company}
                    </h3>

                    <p className="text-slate-600">
                      {job.position}
                    </p>
                  </div>

                  <StatusBadge status={job.status} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
function StatusBadge({
  status,
}: {
  status: string;
}) {
  const colors: Record<string, string> = {
    Interested:
      "bg-slate-100 text-slate-700",

    Saved:
      "bg-slate-100 text-slate-700",

    "Not Started":
      "bg-slate-100 text-slate-700",

    "Preparing Resume":
      "bg-yellow-100 text-yellow-700",

    "Preparing Cover Letter":
      "bg-yellow-100 text-yellow-700",

    "Ready to Apply":
      "bg-indigo-100 text-indigo-700",

    Applied:
      "bg-blue-100 text-blue-700",

    OA:
      "bg-cyan-100 text-cyan-700",

    "Phone Screen":
      "bg-purple-100 text-purple-700",

    "Recruiter Call":
      "bg-purple-100 text-purple-700",

    "Technical Interview":
      "bg-purple-100 text-purple-700",

    "Behavioral Interview":
      "bg-purple-100 text-purple-700",

    Interview:
      "bg-purple-100 text-purple-700",

    "Final Interview":
      "bg-purple-100 text-purple-700",

    "Reference Check":
      "bg-violet-100 text-violet-700",

    Offer:
      "bg-green-100 text-green-700",

    Negotiating:
      "bg-emerald-100 text-emerald-700",

    Accepted:
      "bg-emerald-100 text-emerald-700",

    Rejected:
      "bg-red-100 text-red-700",

    Ghosted:
      "bg-gray-200 text-gray-700",

    Withdrawn:
      "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-sm
        font-semibold
        ${colors[status] ?? colors.Saved}
      `}
    >
      {status}
    </span>
  );
}