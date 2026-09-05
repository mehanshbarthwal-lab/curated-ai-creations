import { Link } from "@tanstack/react-router";
import { ArrowUpRight, GitFork } from "@phosphor-icons/react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-baseline gap-3">
          <Link
            to="/"
            className="font-mono text-[0.78rem] uppercase tracking-[0.2em] font-semibold text-foreground transition-colors hover:text-accent"
          >
            Universal Agent Skills
          </Link>
          <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint sm:inline">
            by Mehansh Barthwal
          </span>
        </div>

        <nav className="flex items-center gap-5 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
          <Link to="/" className="text-ink-faint transition-colors hover:text-foreground">
            Collection
          </Link>
          <Link
            to="/attribution"
            className="text-ink-faint transition-colors hover:text-foreground"
          >
            Attribution
          </Link>
          <a
            href="https://github.com/mehanshbarthwal-lab/universal-agent-skills"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-ink-faint transition-colors hover:text-accent"
          >
            <GitFork size={13} weight="bold" />
            GitHub
          </a>
          <a
            href="https://mehanshlabs.qzz.io/"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 text-ink-faint transition-colors hover:text-accent sm:inline-flex"
          >
            Portfolio
            <ArrowUpRight size={13} weight="bold" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-6 py-14 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-faint md:grid-cols-3 md:px-10">
        <div>
          <p className="text-foreground font-semibold">Universal Agent Skills</p>
          <p className="mt-1.5 text-xs text-ink-faint normal-case">
            Open source agent skills and tool protocols across major runtimes.
          </p>
        </div>
        <div className="space-y-1.5 md:text-center normal-case">
          <p className="uppercase tracking-[0.16em] text-foreground font-semibold text-[0.72rem]">
            Integrations
          </p>
          <p className="text-xs text-ink-faint">
            Claude Code, Cursor, Google Antigravity, ChatGPT, Ollama
          </p>
        </div>
        <div className="space-y-1.5 md:text-right">
          <Link
            to="/attribution"
            className="block text-accent transition-colors hover:underline text-xs"
          >
            Attribution and Upstream Credits
          </Link>
          <a
            href="https://mehanshlabs.qzz.io/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-ink-faint transition-colors hover:text-foreground text-xs"
          >
            Mehansh Barthwal Portfolio
            <ArrowUpRight size={12} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
