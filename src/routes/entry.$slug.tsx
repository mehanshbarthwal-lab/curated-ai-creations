import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, LockSimple } from "@phosphor-icons/react";
import { entries, getEntry, KIND_LABEL } from "@/data/collection";
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
        meta: [{ title: "Not found — Skills Collection" }, { name: "robots", content: "noindex" }],
      };
    }
    const { entry } = loaderData;
    const title = `${entry.name} — ${KIND_LABEL[entry.kind]} — Mehansh Barthwal`;
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
  const siblings = entries.filter((e) => e.kind === entry.kind && e.slug !== entry.slug).slice(0, 4);

  return (
    <div className="min-h-[100dvh] bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-16 md:px-10 md:pb-32 md:pt-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-accent"
        >
          <ArrowLeft size={13} weight="bold" /> Index
        </Link>

        <div className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-[minmax(0,1fr)_15rem]">
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              {KIND_LABEL[entry.kind]}
            </p>
            <h1 className="mt-5 text-4xl leading-[1.02] tracking-tight text-foreground md:text-6xl">
              {entry.name}
            </h1>
            <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {entry.tagline}
            </p>

            <section className="mt-16 border-t border-rule pt-8">
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
                What it does
              </h2>
              <p className="measure mt-4 text-[1.05rem] leading-[1.75] text-foreground">
                {entry.what}
              </p>
            </section>

            <section className="mt-12 border-t border-rule pt-8">
              <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
                Why I built it
              </h2>
              <p className="measure mt-4 text-[1.05rem] leading-[1.75] text-foreground">
                {entry.why}
              </p>
            </section>
          </div>

          <aside className="md:sticky md:top-28 md:self-start">
            <dl className="space-y-6 border-t border-rule pt-6 font-mono text-[0.75rem] tracking-wide text-ink-faint md:border-t-0 md:pt-0">
              <div>
                <dt className="uppercase tracking-[0.16em]">Source</dt>
                <dd className="mt-2">
                  {entry.link ? (
                    <a
                      href={entry.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent underline-offset-4 hover:underline"
                    >
                      {entry.link.label}
                      <ArrowUpRight size={13} weight="bold" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                      <LockSimple size={13} weight="bold" /> Private / internal
                    </span>
                  )}
                </dd>
              </div>

              {entry.files ? (
                <div>
                  <dt className="uppercase tracking-[0.16em]">Bundle size</dt>
                  <dd className="mt-2 tabular-nums text-foreground">{entry.files} files</dd>
                </div>
              ) : null}

              <div>
                <dt className="uppercase tracking-[0.16em]">Tags</dt>
                <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-foreground">
                  {entry.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {siblings.length > 0 && (
          <section className="mt-28">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
              Nearby
            </h2>
            <ul className="mt-6 border-b border-rule">
              {siblings.map((s) => (
                <li key={s.slug} className="border-t border-rule">
                  <Link
                    to="/entry/$slug"
                    params={{ slug: s.slug }}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-5"
                  >
                    <span className="text-lg tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {s.name}
                    </span>
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
