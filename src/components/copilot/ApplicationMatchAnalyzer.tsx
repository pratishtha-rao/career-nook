"use client";

import { useState } from "react";

type Analysis = {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
};

export default function ApplicationMatchAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function analyzeMatch() {
    setLoading(true);
    setError("");
    setAnalysis(null);

    const response = await fetch("/api/copilot/application-match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobDescription,
        resume,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    setAnalysis(data);

    setLoading(false);
  }

  return (
    <div className="bg-white rounded-xl shadow p-8 space-y-6">
      <h2 className="text-2xl font-bold">
        Nook Copilot Application Match Analyzer
      </h2>

      <p className="text-slate-600">
        Paste a job description and your resume to see how closely you match.
      </p>

      <div>
        <label className="font-semibold">
          Job Description *
        </label>

        <textarea
          className="border rounded-lg p-3 w-full h-52 mt-2"
          placeholder="Paste the full job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="font-semibold">
          Resume / Credentials *
        </label>

        <textarea
          className="border rounded-lg p-3 w-full h-64 mt-2"
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>

      <button
        onClick={analyzeMatch}
        disabled={loading}
        className="bg-blue-600 text-white rounded-lg px-5 py-3 hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {analysis && (
        <div className="space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <p className="text-lg font-semibold">
              Match Score
            </p>

            <p className="text-6xl font-bold text-blue-600 mt-2">
              {analysis.score}%
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              Why this score?
            </h3>

            <p className="mt-2 text-slate-700">
              {analysis.summary}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-700">
              Strengths
            </h3>

            <ul className="list-disc ml-6 mt-3 space-y-2">
              {analysis.strengths.map((strength, index) => (
                <li key={index}>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-yellow-700">
              Areas to Improve
            </h3>

            <ul className="list-disc ml-6 mt-3 space-y-2">
              {analysis.weaknesses.map((weakness, index) => (
                <li key={index}>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-purple-700">
              Recommendations
            </h3>

            <ul className="list-disc ml-6 mt-3 space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index}>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}