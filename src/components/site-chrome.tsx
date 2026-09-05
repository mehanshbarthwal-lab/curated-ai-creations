import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
        >
          Mehansh Barthwal
        </Link>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink-faint">
          Skills Collection
        </span>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-6 py-14 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint md:grid-cols-3 md:px-10">
        <span>Built and maintained by Mehansh Barthwal</span>
        <span className="md:text-center">Portable across Claude Code, Cursor, Antigravity, Ollama</span>
        <span className="md:text-right">Part of a personal portfolio</span>
      </div>
    </footer>
  );
}
