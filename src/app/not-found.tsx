import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f9ff] px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl font-bold text-slate-900">
          Page Not Found
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          Sorry, the page you are looking for does not exist or may have been
          moved.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go Home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Dashboard
          </Link>

        </div>
      </div>
    </main>
  );
}