export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-semibold text-fg">
          Alastair<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-6 font-mono text-sm text-muted">
          <a href="#about" className="transition-colors hover:text-accent">
            about
          </a>
          <a href="#projects" className="transition-colors hover:text-accent">
            projects
          </a>
          <a href="#contact" className="transition-colors hover:text-accent">
            contact
          </a>
        </div>
      </nav>
    </header>
  );
}
