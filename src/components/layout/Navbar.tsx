import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          Career Nook
        </Link>

        <div className="flex gap-8">

          <Link href="/">Home</Link>

          <Link href="/jobs">
            Jobs
          </Link>

          <Link href="/contacts">
            Contacts
          </Link>

          <Link href="/tasks">
            Tasks
          </Link>

          <Link href="/materials">
            Materials
          </Link>

        </div>

      </div>
    </nav>
  );
}