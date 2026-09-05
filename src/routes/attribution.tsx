import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "@phosphor-icons/react";
import { entries, type Entry, PROVENANCE_LABEL } from "@/data/collection";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/attribution")({
  head: () => ({
    meta: [
      { title: "Attribution and Provenance Matrix: Universal Agent Skills" },
      {
        name: "description",
        content:
          "Transparent attribution matrix for all skills, tools, workflows, and upstream open source software.",
      },
      { property: "og:title", content: "Attribution Matrix: Universal Agent Skills" },
      {
        property: "og:description",
        content:
          "Transparent attribution matrix for all skills, tools, workflows, and upstream open source software.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AttributionPage,
});

function AttributionPage() {
  const original = entries.filter((e) => e.provenance === "original");
  const adapted = entries.filter((e) => e.provenance === "adapted");
  const inspired = entries.filter((e) => e.provenance === "inspired");
  const external = entries.filter(
    (e) => e.provenance === "external" || e.provenance === "internal",
  );

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

        <section className="pt-10">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-accent">
            Authorship and Credit Transparency
          </p>
          <h1 className="mt-4 text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
            Attribution and Provenance Matrix
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
            This ecosystem believes in complete technical honesty. Every skill, tool, and workflow
            clearly documents whether it is original engineering by Mehansh Barthwal, adapted from
            an upstream repository with full maintainer credit, or inspired by published
            methodology.
          </p>
        </section>

        {/* Section 1: Original Works */}
        <section className="mt-16 border-t border-rule pt-10">
          <div className="flex items-baseline gap-3">
            <ShieldCheck size={20} className="text-accent" weight="bold" />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Original Works by Mehansh Barthwal
            </h2>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Tools, skills, and architectures designed and authored originally by Mehansh Barthwal.
          </p>

          <div className="mt-8 divide-y divide-rule border-b border-t border-rule">
            {original.map((item) => (
              <AttributionRow key={item.slug} entry={item} />
            ))}
          </div>
        </section>

        {/* Section 2: Adapted Upstreams */}
        <section className="mt-20 border-t border-rule pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Adapted and Upstream Open Source
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Packages adapted or integrated from community creators and open source maintainers.
            Original licenses and credits are fully preserved.
          </p>

          <div className="mt-8 divide-y divide-rule border-b border-t border-rule">
            {adapted.map((item) => (
              <AttributionRow key={item.slug} entry={item} />
            ))}
          </div>
        </section>

        {/* Section 3: Methodology Inspired */}
        <section className="mt-20 border-t border-rule pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Methodology Inspired Works
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Skill protocols structured around conceptual frameworks, published essays, or
            engineering observations by domain leaders.
          </p>

          <div className="mt-8 divide-y divide-rule border-b border-t border-rule">
            {inspired.map((item) => (
              <AttributionRow key={item.slug} entry={item} />
            ))}
          </div>
        </section>

        {/* Section 4: External & Internal Reference */}
        <section className="mt-20 border-t border-rule pt-10">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            External and Reference Material
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Context skills for third party repositories and private runbooks.
          </p>

          <div className="mt-8 divide-y divide-rule border-b border-t border-rule">
            {external.map((item) => (
              <AttributionRow key={item.slug} entry={item} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

function AttributionRow({ entry }: { entry: Entry }) {
  return (
    <article className="grid gap-y-3 py-6 md:grid-cols-[14rem_minmax(0,1fr)_12rem] md:gap-x-8 md:items-baseline">
      <div>
        <Link
          to="/entry/$slug"
          params={{ slug: entry.slug }}
          className="text-lg font-medium text-foreground transition-colors hover:text-accent"
        >
          {entry.name}
        </Link>
        <span className="mt-1 block font-mono text-[0.7rem] uppercase tracking-wider text-ink-faint">
          {PROVENANCE_LABEL[entry.provenance]}
        </span>
      </div>

      <div className="space-y-1.5">
        <p className="text-sm text-foreground">{entry.attributionNotes || entry.what}</p>
        <p className="text-xs text-muted-foreground">{entry.tagline}</p>
      </div>

      <div className="space-y-1 font-mono text-xs text-ink-faint md:text-right">
        <div>
          <span className="uppercase tracking-wider">Author:</span>{" "}
          <span className="text-foreground">{entry.author}</span>
        </div>
        <div>
          <span className="uppercase tracking-wider">License:</span>{" "}
          <span className="text-foreground">{entry.license}</span>
        </div>
        {entry.upstreamUrl && (
          <div>
            <a
              href={entry.upstreamUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:underline text-[0.72rem]"
            >
              Upstream Source
              <ArrowUpRight size={11} weight="bold" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
