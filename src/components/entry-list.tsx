import { Link } from "@tanstack/react-router";
import { ArrowUpRight, LockSimple, ShieldCheck } from "@phosphor-icons/react";
import { KIND_LABEL, PROVENANCE_LABEL, type Entry } from "@/data/collection";

const pad = (n: number) => String(n).padStart(2, "0");

export function EntryRow({ entry, index }: { entry: Entry; index: number }) {
  const isOriginal = entry.provenance === "original";

  return (
    <li className="group border-t border-rule">
      <Link
        to="/entry/$slug"
        params={{ slug: entry.slug }}
        className="grid grid-cols-1 items-baseline gap-x-8 gap-y-3 py-6 transition-colors duration-300 md:grid-cols-[3rem_minmax(0,1fr)_9rem_7rem] md:py-7"
      >
        <span className="font-mono text-xs tabular-nums text-ink-faint">{pad(index + 1)}</span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <h3 className="text-lg font-medium leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent md:text-[1.35rem]">
              {entry.name}
            </h3>
            <span className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-faint">
              {entry.category}
            </span>
            {isOriginal && (
              <span className="inline-flex items-center gap-1 rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-accent font-semibold">
                <ShieldCheck size={11} weight="bold" />
                Original
              </span>
            )}
          </div>

          <p className="measure mt-1.5 text-[0.92rem] leading-relaxed text-muted-foreground">
            {entry.tagline}
          </p>

          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.68rem] text-ink-faint">
            <span>By {entry.author}</span>
            <span>•</span>
            <span>{entry.license}</span>
            {entry.files ? (
              <>
                <span>•</span>
                <span>{entry.files} files</span>
              </>
            ) : null}
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
        Nothing matches the selected criteria.
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
