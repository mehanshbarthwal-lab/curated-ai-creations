import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  countByKind,
  entries,
  kinds,
  KIND_BLURB,
  KIND_LABEL,
  type EntryKind,
} from "@/data/collection";
import { EntryList } from "@/components/entry-list";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const TITLE = "AI Skills, Agentic Tools & Writeups — Mehansh Barthwal";
const DESCRIPTION =
  "A working collection of agent skills, coded tools and notes: what each one does, why it exists, and where the source lives.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Filter = "all" | EntryKind;

function Index() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesKind = filter === "all" || e.kind === filter;
      const matchesQuery =
        q.length === 0 ||
        [e.name, e.tagline, e.what, e.why, ...e.tags].join(" ").toLowerCase().includes(q);
      return matchesKind && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="min-h-[100dvh] bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
        {/* Masthead */}
        <section className="grid gap-x-16 gap-y-12 pt-20 md:grid-cols-[minmax(0,1fr)_15rem] md:pt-32">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-accent">
              Collection · {entries.length} entries
            </p>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] tracking-tight text-foreground md:text-[4.4rem]">
              Skills, tools and notes
              <br />
              from building with agents
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-muted-foreground">
              Everything here started as something I needed twice. Some are single instruction files
              that change how a model behaves on one kind of task. Some are full projects with code
              behind them. A few are just writeups about why a build went the way it did.
            </p>
            <p className="measure mt-5 text-lg leading-relaxed text-muted-foreground">
              They share one format, so the same file works in Claude Code, Cursor, Antigravity, a
              custom GPT, or a local model.
            </p>
          </div>

          <aside className="md:pt-3">
            <dl className="space-y-5 border-t border-rule pt-6 font-mono text-[0.75rem] tracking-wide">
              {kinds.map((k) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt className="uppercase tracking-[0.16em] text-ink-faint">{KIND_LABEL[k]}s</dt>
                  <dd className="tabular-nums text-foreground">
                    {String(countByKind(k)).padStart(2, "0")}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        {/* Filter bar */}
        <section className="mt-24 md:mt-36">
          <div className="flex flex-col gap-6 border-b border-rule pb-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
              <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                All ({entries.length})
              </FilterButton>
              {kinds.map((k) => (
                <FilterButton key={k} active={filter === k} onClick={() => setFilter(k)}>
                  {KIND_LABEL[k]}s ({countByKind(k)})
                </FilterButton>
              ))}
            </div>

            <label className="flex items-center gap-2 border-b border-rule pb-1 md:w-64">
              <MagnifyingGlass size={14} weight="bold" className="text-ink-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                aria-label="Search the collection"
                className="w-full bg-transparent font-mono text-[0.78rem] text-foreground placeholder:text-ink-faint focus:outline-none"
              />
            </label>
          </div>

          {filter !== "all" && (
            <p className="measure py-8 text-[0.95rem] leading-relaxed text-muted-foreground">
              {KIND_BLURB[filter]}
            </p>
          )}

          <div className={filter === "all" ? "mt-2" : ""}>
            <EntryList entries={visible} />
          </div>

          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
            {String(visible.length).padStart(2, "0")} shown
          </p>
        </section>

        {/* Closing note */}
        <section className="mt-32 grid gap-x-16 gap-y-8 border-t border-rule pt-12 md:mt-44 md:grid-cols-[15rem_minmax(0,1fr)] md:pb-32">
          <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
            How this is used
          </h2>
          <div className="measure space-y-5 text-[1.05rem] leading-[1.75] text-foreground">
            <p>
              Each entry is a plain file with a declared trigger, a set of constraints, and an
              example of what a correct output looks like. That last part is what makes them hold up
              on tasks they weren&rsquo;t written for.
            </p>
            <p>
              Items marked internal are either tied to my own accounts and data or not cleaned up
              enough to publish yet. The rest link straight to source.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "pb-1 transition-colors duration-200 " +
        (active
          ? "border-b border-accent text-accent"
          : "border-b border-transparent text-ink-faint hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
