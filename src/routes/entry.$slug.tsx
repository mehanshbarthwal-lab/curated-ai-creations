import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  DownloadSimple,
  GitFork,
  LockSimple,
  ShieldCheck,
} from "@phosphor-icons/react";
import {
  entries,
  getEntry,
  KIND_LABEL,
  PROVENANCE_LABEL,
  getSkillInstallation,
  getSkillMdContent,
  type Entry,
} from "@/data/collection";
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
  const [activeTab, setActiveTab] = useState<"spec" | "install" | "cli" | "triggers">("spec");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const installation = getSkillInstallation(entry);
  const skillMd = getSkillMdContent(entry);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadSkillMd = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const siblings = entries
    .filter(
      (e) => (e.category === entry.category || e.kind === entry.kind) && e.slug !== entry.slug,
    )
    .slice(0, 4);

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

            {/* Multi Runtime Specification & Setup */}
            <section className="mt-12 border-t border-rule pt-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-faint">
                    Skill Specification and Runtime Setup
                  </h2>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-2 border-b border-rule pb-2 font-mono text-xs overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab("spec")}
                    className={`rounded px-3 py-1.5 transition-all ${
                      activeTab === "spec"
                        ? "bg-accent text-background font-semibold"
                        : "text-ink-faint hover:text-foreground"
                    }`}
                  >
                    SKILL.md Specification
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("install")}
                    className={`rounded px-3 py-1.5 transition-all ${
                      activeTab === "install"
                        ? "bg-accent text-background font-semibold"
                        : "text-ink-faint hover:text-foreground"
                    }`}
                  >
                    AI Agent Setup
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("cli")}
                    className={`rounded px-3 py-1.5 transition-all ${
                      activeTab === "cli"
                        ? "bg-accent text-background font-semibold"
                        : "text-ink-faint hover:text-foreground"
                    }`}
                  >
                    CLI and Download
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("triggers")}
                    className={`rounded px-3 py-1.5 transition-all ${
                      activeTab === "triggers"
                        ? "bg-accent text-background font-semibold"
                        : "text-ink-faint hover:text-foreground"
                    }`}
                  >
                    Prompts and Triggers
                  </button>
                </div>

                {/* Tab 1: SKILL.md Spec */}
                {activeTab === "spec" && (
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                          Full Instruction Specification
                        </span>
                        <span className="ml-2 rounded bg-card/60 px-2 py-0.5 font-mono text-[10px] text-ink-faint border border-rule">
                          {(entry.files || 1) > 1 ? `${entry.files} files in suite` : "Single file protocol"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => downloadSkillMd(`${entry.slug}.SKILL.md`, skillMd)}
                          className="inline-flex items-center gap-1.5 rounded border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent hover:bg-accent hover:text-background transition-all"
                        >
                          <DownloadSimple size={13} weight="bold" /> Download SKILL.md
                        </button>
                        <button
                          type="button"
                          onClick={() => copyText("spec", skillMd)}
                          className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline"
                        >
                          {copiedKey === "spec" ? (
                            <>
                              <Check size={13} weight="bold" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={13} weight="bold" /> Copy SKILL.md
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <pre className="overflow-x-auto rounded-lg border border-rule bg-card/60 p-5 font-mono text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                      <code>{skillMd}</code>
                    </pre>
                  </div>
                )}

                {/* Tab 2: AI Agent Setup */}
                {activeTab === "install" && (
                  <div className="space-y-4 pt-2">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Install this skill across your preferred AI agent environment:
                    </p>

                    <div className="space-y-3">
                      <div className="rounded-lg border border-rule bg-card/40 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                            Google Antigravity
                          </span>
                          <button
                            type="button"
                            onClick={() => copyText("anti", installation.antigravity || "")}
                            className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1"
                          >
                            {copiedKey === "anti" ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
                            Copy Path
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-xs text-ink-faint">
                          {installation.antigravity}
                        </p>
                      </div>

                      <div className="rounded-lg border border-rule bg-card/40 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                            Claude Code CLI
                          </span>
                          <button
                            type="button"
                            onClick={() => copyText("claude", installation.claudeCode || "")}
                            className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1"
                          >
                            {copiedKey === "claude" ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
                            Copy Command
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-xs text-ink-faint">
                          {installation.claudeCode}
                        </p>
                      </div>

                      <div className="rounded-lg border border-rule bg-card/40 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                            Cursor Rules (.cursorrules)
                          </span>
                          <button
                            type="button"
                            onClick={() => copyText("cursor", installation.cursor || "")}
                            className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1"
                          >
                            {copiedKey === "cursor" ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
                            Copy
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-xs text-ink-faint">
                          {installation.cursor}
                        </p>
                      </div>

                      <div className="rounded-lg border border-rule bg-card/40 p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                            ChatGPT / Custom GPT Instructions
                          </span>
                          <button
                            type="button"
                            onClick={() => copyText("gpt", skillMd)}
                            className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1"
                          >
                            {copiedKey === "gpt" ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
                            Copy Prompt
                          </button>
                        </div>
                        <p className="mt-1 font-mono text-xs text-ink-faint">
                          {installation.chatgpt}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: CLI and Download */}
                {activeTab === "cli" && (
                  <div className="space-y-4 pt-2">
                    {(entry.files || 1) > 1 ? (
                      <div className="rounded-lg border border-accent/40 bg-accent/5 p-5 space-y-3">
                        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                          Multi File Suite ({(entry.files || 1)} Total Files)
                        </div>
                        <p className="text-xs leading-relaxed text-foreground">
                          This skill suite contains {(entry.files || 1)} modular components including sub agents, Python modules, templates, or schemas. While downloading SKILL.md supplies the primary orchestrator instructions, running the complete pipeline requires the entire suite directory.
                        </p>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={() => downloadSkillMd(`${entry.slug}.SKILL.md`, skillMd)}
                            className="inline-flex items-center gap-1.5 rounded bg-accent px-3 py-1.5 font-mono text-xs font-medium text-background hover:opacity-90 transition-opacity"
                          >
                            <DownloadSimple size={13} weight="bold" /> Download SKILL.md
                          </button>
                          <a
                            href="https://github.com/mehanshbarthwal-lab/universal-agent-skills/archive/refs/heads/main.zip"
                            className="inline-flex items-center gap-1.5 rounded border border-accent/40 bg-card/60 px-3 py-1.5 font-mono text-xs text-foreground hover:border-accent transition-colors"
                          >
                            <DownloadSimple size={13} weight="bold" /> Download Full Repository ZIP
                          </a>
                          <a
                            href={`https://github.com/mehanshbarthwal-lab/universal-agent-skills/tree/main/skills/${entry.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded border border-rule bg-card/40 px-3 py-1.5 font-mono text-xs text-ink-faint hover:text-foreground transition-colors"
                          >
                            View Suite on GitHub <ArrowUpRight size={12} weight="bold" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-rule bg-card/40 p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                            Single File Protocol
                          </span>
                          <span className="rounded bg-card/60 px-2 py-0.5 font-mono text-[10px] text-ink-faint border border-rule">
                            Self Contained
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          This skill is completely self contained within a single specification file. Downloading this file or copying the instructions provides complete functionality with zero external dependencies.
                        </p>
                        <div>
                          <button
                            type="button"
                            onClick={() => downloadSkillMd(`${entry.slug}.SKILL.md`, skillMd)}
                            className="inline-flex items-center gap-1.5 rounded bg-accent px-3 py-1.5 font-mono text-xs font-medium text-background hover:opacity-90 transition-opacity"
                          >
                            <DownloadSimple size={13} weight="bold" /> Download SKILL.md
                          </button>
                        </div>
                      </div>
                    )}

                    {(entry.files || 1) > 1 && (
                      <div className="rounded-lg border border-rule bg-card/40 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                            Clone Suite via Git Sparse Checkout
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              copyText(
                                "sparse",
                                `git clone --depth 1 --filter=blob:none --sparse https://github.com/mehanshbarthwal-lab/universal-agent-skills.git\ncd universal-agent-skills\ngit sparse-checkout set skills/${entry.slug}`,
                              )
                            }
                            className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1"
                          >
                            {copiedKey === "sparse" ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
                            Copy Commands
                          </button>
                        </div>
                        <pre className="overflow-x-auto rounded bg-background/80 p-3 font-mono text-xs text-foreground">
                          <code>{`git clone --depth 1 --filter=blob:none --sparse https://github.com/mehanshbarthwal-lab/universal-agent-skills.git
cd universal-agent-skills
git sparse-checkout set skills/${entry.slug}`}</code>
                        </pre>
                      </div>
                    )}

                    <div className="rounded-lg border border-rule bg-card/40 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                          Download via cURL
                        </span>
                        <button
                          type="button"
                          onClick={() => copyText("curl", installation.curlCommand || "")}
                          className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1"
                        >
                          {copiedKey === "curl" ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
                          Copy cURL
                        </button>
                      </div>
                      <pre className="overflow-x-auto rounded bg-background/80 p-3 font-mono text-xs text-foreground">
                        <code>{installation.curlCommand}</code>
                      </pre>
                    </div>

                    <div className="rounded-lg border border-rule bg-card/40 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                          Clone Entire Repository
                        </span>
                        <button
                          type="button"
                          onClick={() => copyText("clone", "git clone https://github.com/mehanshbarthwal-lab/universal-agent-skills.git")}
                          className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1"
                        >
                          {copiedKey === "clone" ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
                          Copy Clone
                        </button>
                      </div>
                      <pre className="overflow-x-auto rounded bg-background/80 p-3 font-mono text-xs text-foreground">
                        <code>git clone https://github.com/mehanshbarthwal-lab/universal-agent-skills.git</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Tab 4: Prompts and Triggers */}
                {activeTab === "triggers" && (
                  <div className="space-y-4 pt-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                      Example Activation Prompts
                    </span>
                    <div className="space-y-2.5">
                      {[
                        `Load and apply ${entry.name} to this task`,
                        `Execute following the ${entry.name} protocol`,
                        `Audit this work against ${entry.name} rubrics`,
                      ].map((prompt, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border border-rule bg-card/40 p-3.5"
                        >
                          <span className="font-mono text-xs text-foreground">{prompt}</span>
                          <button
                            type="button"
                            onClick={() => copyText(`prompt-${i}`, prompt)}
                            className="font-mono text-xs text-accent hover:underline inline-flex items-center gap-1 shrink-0 ml-3"
                          >
                            {copiedKey === `prompt-${i}` ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
                            Copy
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
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
