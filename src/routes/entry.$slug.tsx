import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  GitFork,
  LockSimple,
  ShieldCheck,
} from "@phosphor-icons/react";
import { entries, getEntry, KIND_LABEL, PROVENANCE_LABEL, type Entry } from "@/data/collection";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/entry/$slug")({
  loader: ({ params }) => {
    const entry = getEntry(params.slug);
    if (!entry) throw notFound();
    return { entry };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Not found: Universal Agent Skills" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { entry } = loaderData;
    const title = `${entry.name}: ${KIND_LABEL[entry.kind]} by ${entry.author}`;
    return {
      meta: [
        { title },
        { name: "description", content: entry.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: entry.tagline },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: EntryPage,
});

function EntryPage() {
  const { entry } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);

  const siblings = entries
    .filter(
      (e) => (e.category === entry.category || e.kind === entry.kind) && e.slug !== entry.slug,
    )
    .slice(0, 4);

  const copyInstruction = () => {
    const textToCopy = `Load skill: ${entry.name}\nDescription: ${entry.tagline}\nSource: https://github.com/mehanshbarthwal-lab/universal-agent-skills/tree/main/skills/${entry.slug}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOriginal = entry.provenance === "original";

  return (
    <div className="min-h-[100dvh] bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-accent"
        >
          <ArrowLeft size={13} weight="bold" /> Back to Collection
        </Link>

        <div className="mt-10 grid gap-x-16 gap-y-12 md:grid-cols-[minmax(0,1fr)_18rem]">
          {/* Main Content Column */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent font-semibold">
                {KIND_LABEL[entry.kind]}
              </span>
              <span className="text-rule">/</span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
                {entry.category}
              </span>
              <span className="text-rule">/</span>
              <span
                className={`inline-flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-wider ${
                  isOriginal ? "text-accent font-semibold" : "text-ink-faint"
                }`}
              >
                {isOriginal && <ShieldCheck size={12} weight="bold" />}
                {PROVENANCE_LABEL[entry.provenance]}
              </span>
            </div>

            <h1 className="mt-5 text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
              {entry.name}
            </h1>
            <p className="measure mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {entry.tagline}
            </p>

            {/* What it does */}
            <section className="mt-12 border-t border-rule pt-8">
              <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
                What It Does
              </h2>
              <p className="measure mt-4 text-base leading-relaxed text-foreground md:text-lg">
                {entry.what}
              </p>
            </section>

            {/* Rationale / Provenance */}
            <section className="mt-10 border-t border-rule pt-8">
              <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
                {isOriginal ? "Architecture and Design Rationale" : "Origin and Adaptation Notes"}
              </h2>
              <p className="measure mt-4 text-base leading-relaxed text-foreground md:text-lg">
                {entry.why}
              </p>
              {entry.attributionNotes && (
                <div className="mt-4 rounded-lg border border-rule bg-card/40 p-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Attribution:</span>{" "}
                  {entry.attributionNotes}
                </div>
              )}
            </section>

            {/* When to use */}
            {entry.whenToUse && entry.whenToUse.length > 0 && (
              <section className="mt-10 border-t border-rule pt-8">
                <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
                  When to Activate
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-foreground md:text-base">
                  {entry.whenToUse.map((cond, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>{cond}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* When NOT to use */}
            {entry.whenNotToUse && entry.whenNotToUse.length > 0 && (
              <section className="mt-10 border-t border-rule pt-8">
                <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
                  When to Avoid
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {entry.whenNotToUse.map((nonCond, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-muted-foreground mt-1">•</span>
                      <span>{nonCond}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How to use */}
            {entry.howToUse && (
              <section className="mt-10 border-t border-rule pt-8">
                <div className="flex items-center justify-between">
                  <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
                    How to Invoke
                  </h2>
                  <button
                    type="button"
                    onClick={copyInstruction}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-colors hover:underline"
                  >
                    {copied ? (
                      <>
                        <Check size={13} weight="bold" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} weight="bold" /> Copy Command
                      </>
                    )}
                  </button>
                </div>
                <pre className="mt-4 overflow-x-auto rounded-lg border border-rule bg-card/60 p-4 font-mono text-xs text-foreground">
                  <code>{entry.howToUse}</code>
                </pre>
              </section>
            )}
          </div>

          {/* Sidebar Metadata Column */}
          <aside className="md:sticky md:top-28 md:self-start">
            <dl className="space-y-6 border-t border-rule pt-6 font-mono text-[0.75rem] tracking-wide text-ink-faint md:border-t-0 md:pt-0">
              <div>
                <dt className="uppercase tracking-[0.16em]">Author / Maintainer</dt>
                <dd className="mt-2 text-foreground font-semibold">{entry.author}</dd>
              </div>

              <div>
                <dt className="uppercase tracking-[0.16em]">Provenance</dt>
                <dd className="mt-2 text-foreground">{PROVENANCE_LABEL[entry.provenance]}</dd>
              </div>

              <div>
                <dt className="uppercase tracking-[0.16em]">License</dt>
                <dd className="mt-2 text-foreground">{entry.license}</dd>
              </div>

              <div>
                <dt className="uppercase tracking-[0.16em]">Source Code</dt>
                <dd className="mt-2">
                  {entry.link ? (
                    <a
                      href={entry.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent underline-offset-4 hover:underline"
                    >
                      <GitFork size={13} weight="bold" />
                      {entry.link.label}
                      <ArrowUpRight size={12} weight="bold" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                      <LockSimple size={13} weight="bold" /> Private / internal
                    </span>
                  )}
                </dd>
              </div>

              {entry.upstreamUrl && (
                <div>
                  <dt className="uppercase tracking-[0.16em]">Upstream Project</dt>
                  <dd className="mt-2">
                    <a
                      href={entry.upstreamUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline text-xs"
                    >
                      Upstream Repository
                      <ArrowUpRight size={11} weight="bold" />
                    </a>
                  </dd>
                </div>
              )}

              <div>
                <dt className="uppercase tracking-[0.16em]">Compatibility</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {entry.compatibility.map((platform) => (
                    <span
                      key={platform}
                      className="rounded border border-rule px-2 py-0.5 text-[0.68rem] text-foreground bg-card/50"
                    >
                      {platform}
                    </span>
                  ))}
                </dd>
              </div>

              {entry.files ? (
                <div>
                  <dt className="uppercase tracking-[0.16em]">Bundle Size</dt>
                  <dd className="mt-2 tabular-nums text-foreground">{entry.files} files</dd>
                </div>
              ) : null}

              <div>
                <dt className="uppercase tracking-[0.16em]">Tags</dt>
                <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-foreground">
                  {entry.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Nearby / Related Entries */}
        {siblings.length > 0 && (
          <section className="mt-28">
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
              Related Skills in {entry.category}
            </h2>
            <ul className="mt-6 border-b border-rule">
              {siblings.map((s) => (
                <li key={s.slug} className="border-t border-rule">
                  <Link
                    to="/entry/$slug"
                    params={{ slug: s.slug }}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-5"
                  >
                    <div>
                      <span className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                        {s.name}
                      </span>
                      <span className="ml-3 font-mono text-xs text-ink-faint">
                        {PROVENANCE_LABEL[s.provenance]}
                      </span>
                    </div>
                    <span className="measure text-sm text-muted-foreground">{s.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
