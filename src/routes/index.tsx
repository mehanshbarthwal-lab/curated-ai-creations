import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MagnifyingGlass, ShieldCheck, GitFork, ArrowUpRight } from "@phosphor-icons/react";
import {
  countByCategory,
  countByKind,
  countByProvenance,
  entries,
  kinds,
  categories,
  KIND_LABEL,
  type Category,
  type EntryKind,
  type Provenance,
} from "@/data/collection";
import { EntryList } from "@/components/entry-list";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const TITLE = "Universal Agent Skills: Production AI Skills and Tools by Mehansh Barthwal";
const DESCRIPTION =
  "An open source library of battle tested agent skills and tool protocols across Claude Code, Cursor, Antigravity, and Local LLMs.";

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

type KindFilter = "all" | EntryKind;
type CategoryFilter = "all" | Category;
type ProvenanceFilter = "all" | "original" | "adapted_or_inspired";

function Index() {
  const [kindFilter, setKindFilter] = useState<KindFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [provenanceFilter, setProvenanceFilter] = useState<ProvenanceFilter>("all");
  const [query, setQuery] = useState("");

  const originalCount = countByProvenance("original");
  const communityCount =
    countByProvenance("adapted") + countByProvenance("inspired") + countByProvenance("external");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesKind = kindFilter === "all" || e.kind === kindFilter;
      const matchesCategory = categoryFilter === "all" || e.category === categoryFilter;

      let matchesProvenance = true;
      if (provenanceFilter === "original") {
        matchesProvenance = e.provenance === "original";
      } else if (provenanceFilter === "adapted_or_inspired") {
        matchesProvenance = e.provenance !== "original" && e.provenance !== "internal";
      }

      const searchCorpus = [
        e.name,
        e.tagline,
        e.what,
        e.why,
        e.author,
        e.category,
        ...(e.whenToUse || []),
        ...e.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = q.length === 0 || searchCorpus.includes(q);

      return matchesKind && matchesCategory && matchesProvenance && matchesQuery;
    });
  }, [kindFilter, categoryFilter, provenanceFilter, query]);

  return (
    <div className="min-h-[100dvh] bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1180px] px-6 md:px-10">
        {/* Masthead */}
        <section className="grid gap-x-16 gap-y-12 pt-16 md:grid-cols-[minmax(0,1fr)_16rem] md:pt-28">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-rule px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">
                <ShieldCheck size={13} weight="bold" />
                Verified Open Source Collection
              </span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-faint">
                {entries.length} entries cataloged
              </span>
            </div>

            <h1 className="mt-6 text-[2.4rem] leading-[1.04] tracking-tight text-foreground md:text-[4.2rem]">
              Universal Agent Skills
            </h1>
            <p className="mt-4 text-xl font-medium text-foreground/90 md:text-2xl">
              Production AI skills and tool protocols across major agent runtimes
            </p>

            <p className="measure mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Hardened instruction sets that eliminate hallucinations, enforce senior engineering
              discipline, scrape verified datasets, and run seamlessly across Claude Code, Cursor,
              Google Antigravity, ChatGPT, and Local LLMs.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/mehanshbarthwal-lab/universal-agent-skills"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-background transition-opacity hover:opacity-90"
              >
                <GitFork size={15} weight="bold" />
                Clone on GitHub
              </a>
              <Link
                to="/attribution"
                className="inline-flex items-center gap-2 rounded-lg border border-rule px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Attribution Matrix
                <ArrowUpRight size={13} weight="bold" />
              </Link>
            </div>
          </div>

          <aside className="md:pt-4">
            <dl className="space-y-4 border-t border-rule pt-6 font-mono text-[0.74rem] tracking-wide">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="uppercase tracking-[0.16em] text-ink-faint">Original Works</dt>
                <dd className="tabular-nums font-semibold text-accent">
                  {String(originalCount).padStart(2, "0")}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="uppercase tracking-[0.16em] text-ink-faint">Community Upstream</dt>
                <dd className="tabular-nums text-foreground">
                  {String(communityCount).padStart(2, "0")}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="uppercase tracking-[0.16em] text-ink-faint">Total Suites</dt>
                <dd className="tabular-nums font-semibold text-foreground">
                  {String(entries.length).padStart(2, "0")}
                </dd>
              </div>
              <div className="pt-3 border-t border-rule text-xs normal-case text-muted-foreground leading-snug">
                100 percent verified attribution. Original engineering distinguished from credited
                upstream repositories.
              </div>
            </dl>
          </aside>
        </section>

        {/* Filter and Search Bar */}
        <section className="mt-20 md:mt-28">
          <div className="border-b border-rule pb-5 space-y-5">
            {/* Row 1: Kind Filters + Search */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.16em]">
                <FilterButton active={kindFilter === "all"} onClick={() => setKindFilter("all")}>
                  All ({entries.length})
                </FilterButton>
                {kinds.map((k) => (
                  <FilterButton key={k} active={kindFilter === k} onClick={() => setKindFilter(k)}>
                    {KIND_LABEL[k]}s ({countByKind(k)})
                  </FilterButton>
                ))}
              </div>

              <label className="flex items-center gap-2 border-b border-rule pb-1 md:w-64">
                <MagnifyingGlass size={14} weight="bold" className="text-ink-faint" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search skills, triggers, tags..."
                  aria-label="Search the collection"
                  className="w-full bg-transparent font-mono text-[0.78rem] text-foreground placeholder:text-ink-faint focus:outline-none"
                />
              </label>
            </div>

            {/* Row 2: Category and Provenance Filters */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink-faint">
              <span className="text-foreground font-semibold">Provenance:</span>
              <button
                type="button"
                onClick={() => setProvenanceFilter("all")}
                className={`transition-colors ${
                  provenanceFilter === "all" ? "text-accent font-semibold" : "hover:text-foreground"
                }`}
              >
                All Sources
              </button>
              <button
                type="button"
                onClick={() => setProvenanceFilter("original")}
                className={`transition-colors ${
                  provenanceFilter === "original"
                    ? "text-accent font-semibold"
                    : "hover:text-foreground"
                }`}
              >
                Original by Mehansh ({originalCount})
              </button>
              <button
                type="button"
                onClick={() => setProvenanceFilter("adapted_or_inspired")}
                className={`transition-colors ${
                  provenanceFilter === "adapted_or_inspired"
                    ? "text-accent font-semibold"
                    : "hover:text-foreground"
                }`}
              >
                Community Upstreams ({communityCount})
              </button>

              <span className="hidden sm:inline text-rule">|</span>

              <span className="text-foreground font-semibold">Category:</span>
              <button
                type="button"
                onClick={() => setCategoryFilter("all")}
                className={`transition-colors ${
                  categoryFilter === "all" ? "text-accent font-semibold" : "hover:text-foreground"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategoryFilter(c)}
                  className={`transition-colors ${
                    categoryFilter === c ? "text-accent font-semibold" : "hover:text-foreground"
                  }`}
                >
                  {c} ({countByCategory(c)})
                </button>
              ))}
            </div>
          </div>

          {/* List of Entries */}
          <div className="mt-4">
            <EntryList entries={visible} />
          </div>

          <div className="mt-6 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
            <span>{String(visible.length).padStart(2, "0")} entries shown</span>
            {(kindFilter !== "all" ||
              categoryFilter !== "all" ||
              provenanceFilter !== "all" ||
              query) && (
              <button
                type="button"
                onClick={() => {
                  setKindFilter("all");
                  setCategoryFilter("all");
                  setProvenanceFilter("all");
                  setQuery("");
                }}
                className="text-accent underline-offset-4 hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </section>

        {/* Closing Architecture Note */}
        <section className="mt-28 grid gap-x-16 gap-y-8 border-t border-rule pt-12 md:mt-36 md:grid-cols-[16rem_minmax(0,1fr)] md:pb-28">
          <div>
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
              Ecosystem Architecture
            </h2>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Designed for cross runtime reliability without vendor lock in.
            </p>
          </div>

          <div className="measure space-y-5 text-base leading-relaxed text-foreground md:text-lg">
            <p>
              Each skill in this repository is built as a self contained specification declaring
              trigger conditions, negative constraints, and output verification rubrics. This
              ensures predictable execution even when models confront tasks outside their initial
              training distribution.
            </p>
            <p>
              External tools and upstream inspirations are credited openly in the attribution
              matrix. Items marked internal represent private runbooks and personal configurations.
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
          ? "border-b border-accent text-accent font-semibold"
          : "border-b border-transparent text-ink-faint hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
