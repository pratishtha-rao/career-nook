export default function Home() {
  return (
    <main className="bg-slate-100">

      <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-8">

        <h1 className="text-6xl font-extrabold text-slate-900">
          Organize Your Entire Job Search
        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-slate-600">
          Career Nook keeps your applications,
          networking contacts,
          interview tasks,
          and application materials
          all in one place.
        </p>

        <div className="mt-10 flex gap-4">

          <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
            Start Tracking Jobs
          </button>

          <button className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold hover:bg-slate-50">
            Learn More
          </button>

        </div>

      </section>

<section className="mx-auto grid max-w-7xl gap-8 px-8 pb-20 md:grid-cols-2 lg:grid-cols-4">

  <div className="rounded-2xl bg-white p-8 shadow">

    <h2 className="mb-4 text-2xl font-bold">
      Jobs
    </h2>

    <p className="text-slate-600">
      Track every application,
      interview,
      salary,
      and status.
    </p>

  </div>

  <div className="rounded-2xl bg-white p-8 shadow">

    <h2 className="mb-4 text-2xl font-bold">
      Contacts
    </h2>

    <p className="text-slate-600">
      Store recruiters,
      hiring managers,
      mentors,
      and networking connections.
    </p>

  </div>

  <div className="rounded-2xl bg-white p-8 shadow">

    <h2 className="mb-4 text-2xl font-bold">
      Tasks
    </h2>

    <p className="text-slate-600">
      Never forget
      follow-ups,
      interviews,
      or deadlines.
    </p>

  </div>

  <div className="rounded-2xl bg-white p-8 shadow">

    <h2 className="mb-4 text-2xl font-bold">
      Application Materials
    </h2>

    <p className="text-slate-600">
      Organize resumes,
      cover letters,
      portfolios,
      and documents.
    </p>

  </div>

</section>

    </main>
  );
}