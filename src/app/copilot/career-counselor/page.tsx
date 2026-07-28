"use client";

import CareerCounselor from "@/components/copilot/CareerCounselor";

export default function CareerCounselorPage() {
  return (
    <main className="min-h-screen bg-[#f5f9ff]">
      <div className="mx-auto max-w-6xl px-8 py-12">

        <h1 className="mt-2 text-5xl font-bold text-slate-950">
          Career Counselor
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Ask any career-related question and receive personalized guidance
          based on your goals, resume, applications, contacts, tasks,
          and application materials.
        </p>

        <div className="mt-10">
          <CareerCounselor />
        </div>

      </div>
    </main>
  );
}