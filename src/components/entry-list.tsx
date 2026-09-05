import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LockSimple } from "@phosphor-icons/react";
import { KIND_LABEL, type Entry } from "@/data/collection";

const pad = (n: number) => String(n).padStart(2, "0");

export function EntryRow({ entry, index }: { entry: Entry; index: number }) {
  return (
    <li className="group border-t border-rule">
      <Link
        to="/entry/$slug"
        params={{ slug: entry.slug }}
        className="grid grid-cols-1 items-baseline gap-x-8 gap-y-3 py-7 transition-colors duration-300 md:grid-cols-[3rem_minmax(0,1fr)_8rem_7rem] md:py-8"
      >
        <span className="font-mono text-xs tabular-nums text-ink-faint">{pad(index + 1)}</span>

        <div className="min-w-0">
          <h3 className="text-xl leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent md:text-[1.6rem]">
            {entry.name}
          </h3>
          <p className="measure mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">
            {entry.tagline}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint md:hidden">
            <span>{KIND_LABEL[entry.kind]}</span>
            {entry.files ? <span>{entry.files} files</span> : null}
          </div>
        </div>

        <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint md:block">
          {KIND_LABEL[entry.kind]}
        </span>

        <span className="hidden items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint md:flex">
          {entry.link ? (
            <>
              <ArrowUpRight size={13} weight="bold" />
              Public
            </>
          ) : (
            <>
              <LockSimple size={13} weight="bold" />
              Internal
            </>
          )}
        </span>
      </Link>
    </li>
  );
}

export function EntryList({ entries }: { entries: Entry[] }) {
  if (entries.length === 0) {
    return (
      <p className="border-t border-rule py-16 font-mono text-sm text-ink-faint">
        Nothing matches that.
      </p>
    );
  }
  return (
    <ul className="border-b border-rule">
      {entries.map((entry, i) => (
        <EntryRow key={entry.slug} entry={entry} index={i} />
      ))}
    </ul>
  );
}
