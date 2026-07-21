import Link from "next/link";

const links = [
    {
    name: "Dashboard",
    href: "/dashboard",
  },

  {
    name: "Jobs",
    href: "/jobs",
  },
  {
    name: "Contacts",
    href: "/contacts",
  },
  {
    name: "Tasks",
    href: "/tasks",
  },
  {
    name: "Materials",
    href: "/materials",
  },
  {
    name:"Sign Up",
    href:"/signup"
  },
  {
    name:"Login",
    href:"/login"
  },
];

export default function Navbar() {
  return (
    <nav className="border-b bg-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          Career Nook
        </Link>


        <div className="flex gap-8 text-sm font-medium">

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 transition hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}

        </div>

      </div>

    </nav>
  );
}
