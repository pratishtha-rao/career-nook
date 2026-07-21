import Link from "next/link";

export default function CopilotPage() {

  return (

    <main className="
    min-h-screen
    bg-slate-100
    ">

      <div className="
      max-w-7xl
      mx-auto
      px-8
      py-12
      ">

        <h1 className="
        text-4xl
        font-bold
        ">
          Nook Copilot
        </h1>

        <p className="
        mt-3
        text-slate-600
        ">
          AI-powered career tools designed to help you create stronger applications,
          optimize your resume, and evaluate how competitive you are for specific
          opportunities.
        </p>

        <div className="
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        mt-10
        ">

          {/* Cover Letter */}

          <Link

            href="/copilot/cover-letter"

            className="
            bg-white
            rounded-xl
            p-8
            shadow
            hover:shadow-lg
            transition
            "

          >

            <h2 className="
            text-2xl
            font-bold
            ">
              Cover Letter Generator
            </h2>

            <p className="
            mt-3
            text-slate-600
            ">
              Generate personalized cover letters tailored to a specific job
              description using your experience and an optional draft.
            </p>

          </Link>

          {/* Resume */}

          <Link

            href="/copilot/resume-optimizer"

            className="
            bg-white
            rounded-xl
            p-8
            shadow
            hover:shadow-lg
            transition
            "

          >

            <h2 className="
            text-2xl
            font-bold
            ">
              Resume Optimizer
            </h2>

            <p className="
            mt-3
            text-slate-600
            ">
              Improve your resume by comparing it against a job description and
              receiving an optimized version tailored to the position.
            </p>

          </Link>

          {/* Match Analyzer */}

          <Link

            href="/copilot/application-match"

            className="
            bg-white
            rounded-xl
            p-8
            shadow
            hover:shadow-lg
            transition
            "

          >

            <h2 className="
            text-2xl
            font-bold
            ">
              Application Match Analyzer
            </h2>

            <p className="
            mt-3
            text-slate-600
            ">
              Compare your resume against a job description to receive an AI-generated
              match score, identify your strengths, uncover skill gaps, and get
              actionable recommendations to improve your chances.
            </p>

          </Link>

        </div>

      </div>

    </main>

  );

}