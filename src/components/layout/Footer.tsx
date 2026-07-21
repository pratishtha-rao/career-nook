export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-8 py-8 text-center text-sm text-slate-500">
        <p>
          © {new Date().getFullYear()} Career Nook
        </p>
      </div>
    </footer>
  );
}