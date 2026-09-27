import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f7fd] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle grid pattern & soft blue gradient accents */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(#bfdbfe_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 h-80 w-[42rem] rounded-full bg-blue-200/50 blur-[90px] -z-10" />

        <div className="mx-auto max-w-5xl px-6 sm:px-8 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl sm:leading-[1.12]">
            Keep your job search organized,
            <br />
            from first application to final offer.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
            No messy spreadsheets or lost follow-ups. Career Nook gives you a focused workspace for roles, custom resumes, interview notes, and professional contacts.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
            >
              Start for Free
            </Link>

            {/* Copilot Exploration Button */}
            {/*
            <Link
              href="/copilot"
              className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition"
            >
              Explore Copilot
            </Link>
            */}
          </div>

          {/* Simple workspace preview card */}
          <div className="mt-14 rounded-xl border border-blue-200/80 bg-white/95 p-3 shadow-xl shadow-blue-900/5 ring-1 ring-slate-900/5 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 px-2 text-xs text-slate-400 font-mono">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="ml-2 text-slate-500">Pipeline Tracker &bull; Active Search</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 text-left">
              <div className="rounded-lg bg-blue-50/70 p-3.5 border border-blue-100">
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Saved</span>
                <p className="text-xl font-bold text-slate-900 mt-1">12</p>
                <span className="text-xs text-slate-500">Roles bookmarked</span>
              </div>
              <div className="rounded-lg bg-blue-50/70 p-3.5 border border-blue-100">
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Applied</span>
                <p className="text-xl font-bold text-slate-900 mt-1">18</p>
                <span className="text-xs text-slate-500">Waiting response</span>
              </div>
              <div className="rounded-lg bg-blue-50/70 p-3.5 border border-blue-100">
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Interviewing</span>
                <p className="text-xl font-bold text-slate-900 mt-1">4</p>
                <span className="text-xs text-slate-500">Rounds scheduled</span>
              </div>
              <div className="rounded-lg bg-blue-50/70 p-3.5 border border-blue-100">
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Offers</span>
                <p className="text-xl font-bold text-slate-900 mt-1">1</p>
                <span className="text-xs text-slate-500">Under review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-5xl px-6 py-16 sm:px-8 border-t border-blue-100">
        <div className="max-w-xl mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Built specifically for active job seekers
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Keep every thread, deadline, and file connected to the right opportunity.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FeatureCard
            title="Job Applications"
            text="Log positions with current stages, salary expectations, recruiter contacts, and scheduled interviews in one unified board."
          />

          <FeatureCard
            title="Tailored Materials"
            text="Store versioned resumes, targeted cover letters, and work samples linked directly to each application."
          />

          <FeatureCard
            title="Contact Log"
            text="Record recruiter emails, referrer notes, and coffee chat takeaways so you always know when to follow up."
          />

          <FeatureCard
            title="AI Writing Assistant"
            text="Draft application notes, align your experience with job descriptions, and write cleaner outreach messages."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-blue-100 bg-white py-14 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Ready to streamline your applications?
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-slate-600">
            Set up your workspace in under two minutes. No credit card required.
          </p>

          <div className="mt-6">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              Start for Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-blue-100/90 bg-white p-6 shadow-sm transition hover:border-blue-200">
      <h3 className="text-base font-semibold text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {text}
      </p>
    </div>
  );
}