import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-fg">
          Alastair<span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-6 font-mono text-sm text-muted">
          <Link href="/#about" className="transition-colors hover:text-accent">
            about
          </Link>
          <Link href="/#projects" className="transition-colors hover:text-accent">
            projects
          </Link>
          <Link href="/blog" className="transition-colors hover:text-accent">
            blog
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-accent">
            contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
