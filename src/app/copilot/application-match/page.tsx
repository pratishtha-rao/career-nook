import ApplicationMatchAnalyzer from "@/components/copilot/ApplicationMatchAnalyzer";

export default function ApplicationMatchPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold">
          Application Match Analyzer
        </h1>

        <p className="mt-3 text-slate-600">
          Compare your resume against a job description to see how well you
          match and receive personalized improvement suggestions from Nook
          Copilot.
        </p>

        <div className="mt-8">
          <ApplicationMatchAnalyzer />
        </div>
      </div>
    </main>
  );
}