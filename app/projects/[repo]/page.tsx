import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectByRepo } from "@/lib/projects";
import { getRepoReadme, getRepoCommits } from "@/lib/github";
import Markdown from "@/app/components/Markdown";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ReadingProgress from "@/app/components/ReadingProgress";
import BackToTop from "@/app/components/BackToTop";
import Toc from "@/app/components/Toc";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const { repo } = await params;
  const meta = getProjectByRepo(repo);
  return { title: meta ? `${meta.name} · Alastair` : "项目 · Alastair" };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BackLink() {
  return (
    <Link
      href="/#projects"
      className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
    >
      <span aria-hidden>←</span> 返回项目列表
    </Link>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ repo: string }>;
}) {
  const { repo } = await params;
  const meta = getProjectByRepo(repo);
  if (!meta) notFound();

  const [readme, commits] = await Promise.all([
    getRepoReadme(meta.owner, meta.repo),
    getRepoCommits(meta.owner, meta.repo),
  ]);

  const github = `https://github.com/${meta.owner}/${meta.repo}`;

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <Navbar />
      <main className="relative mx-auto max-w-3xl px-6 py-12">
        <Toc />

        <BackLink />

        <header className="mt-8">
          <h1 className="text-4xl font-bold">{meta.name}</h1>
          <p className="mt-3 text-lg text-muted">{meta.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-sm">
            <span className="text-accent">{meta.category}</span>
            <a
              href={github}
              className="text-blue underline underline-offset-4 hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              github.com/{meta.owner}/{meta.repo} ↗
            </a>
          </div>
        </header>

        <section className="mt-12">
          <h2 className="font-mono text-sm text-muted">README</h2>
          <div className="project-readme mt-2">
            {readme ? (
              <Markdown>{readme}</Markdown>
            ) : (
              <p className="text-muted">该仓库没有 README 或拉取失败。</p>
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-mono text-sm text-muted">最近提交</h2>
          {commits.length > 0 ? (
            <ol className="mt-4 border-l border-line">
              {commits.slice(0, 12).map((c) => (
                <li key={c.sha} className="relative pl-6 pb-5">
                  <span className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                  <a
                    href={c.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium hover:text-accent"
                  >
                    {c.commit.message.split("\n")[0]}
                  </a>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {c.commit.author?.date ? formatDate(c.commit.author.date) : ""}
                    <span className="mx-2">·</span>
                    {c.sha.slice(0, 7)}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-muted">拉取提交记录失败。</p>
          )}
        </section>

        <div className="mt-16">
          <BackLink />
        </div>
      </main>
      <Footer />
    </>
  );
}
