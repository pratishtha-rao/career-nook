"use client";

import { useState } from "react";

export default function CareerCounselor() {
  const [question, setQuestion] = useState("");
  const [resume, setResume] = useState("");
  const [targetJob, setTargetJob] = useState("");
  const [experience, setExperience] = useState("College Student");

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (question.trim() === "") return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/copilot/career-counselor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          resume,
          targetJob,
          experience,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.error ?? "Something went wrong.");
      } else {
        setResponse(data.answer);
      }
    } catch {
      setResponse("Unable to contact Nook Copilot.");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Ask Career Counselor
        </h2>

        <p className="mt-3 text-slate-600">
          Get personalized career advice, resume feedback, interview guidance,
          learning roadmaps, and answers to any career-related question.
        </p>

        <div className="mt-6 rounded-xl bg-slate-50 p-5">
          <p className="font-semibold text-slate-800">
            Example Questions
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            <li>How do I become a Software Engineer at Google?</li>
            <li>Review my resume for Amazon internships.</li>
            <li>Create a 6-month roadmap to become a Backend Engineer.</li>
            <li>Should I learn Docker or Kubernetes first?</li>
            <li>How competitive am I for Microsoft internships?</li>
            <li>What projects should I build for machine learning roles?</li>
          </ul>
        </div>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask any career-related question..."
          className="mt-6 h-36 w-full rounded-lg border border-slate-300 p-4 outline-none transition focus:border-blue-500"
        />

        <input
          value={targetJob}
          onChange={(e) => setTargetJob(e.target.value)}
          placeholder="Target Job (Optional)"
          className="mt-5 w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-500"
        />

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="mt-5 w-full rounded-lg border border-slate-300 p-3 outline-none transition focus:border-blue-500"
        >
          <option>High School</option>
          <option>College Student</option>
          <option>New Graduate</option>
          <option>Professional</option>
          <option>Career Changer</option>
        </select>

        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Paste your resume here (Optional)"
          className="mt-5 h-56 w-full rounded-lg border border-slate-300 p-4 outline-none transition focus:border-blue-500"
        />

        <button
          onClick={ask}
          disabled={loading}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Ask Nook Copilot"}
        </button>
      </div>

      {response && (
        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Nook Copilot Response
          </h2>

          <div className="mt-6 whitespace-pre-wrap leading-8 text-slate-700">
            {response}
          </div>
        </div>
      )}
    </div>
  );
}

