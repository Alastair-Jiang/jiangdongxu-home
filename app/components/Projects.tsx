import Link from "next/link";
import { categoryOrder } from "@/lib/projects";
import type { Project } from "@/lib/github";
import SectionTitle from "./SectionTitle";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
  });
}

function ProjectCard({ project }: { project: Project }) {
  const d = project.data;
  const desc = project.description || d?.description || "暂无描述";
  const github = d?.html_url ?? `https://github.com/${project.owner}/${project.repo}`;

  return (
    <div className="hairline group flex flex-col justify-between gap-6 rounded-lg bg-panel p-6 transition-colors hover:border-accent">
      <div>
        <div className="flex items-start justify-between">
          <Link
            href={`/projects/${project.repo}`}
            className="text-xl font-semibold text-fg transition-colors hover:text-accent"
          >
            {project.name}
          </Link>
          {d && (
            <span className="font-mono text-xs text-muted">★ {d.stargazers_count}</span>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          {d?.language && <span className="text-accent">{d.language}</span>}
          {d && <span>更新于 {formatDate(d.pushed_at)}</span>}
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <Link
            href={`/projects/${project.repo}`}
            className="text-blue hover:text-accent"
          >
            详情 →
          </Link>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20">
      <SectionTitle index="02" title="项目" />
      {categoryOrder.map((cat) => {
        const items = projects
          .filter((p) => p.category === cat)
          .sort((a, b) => a.order - b.order);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="mt-10">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              {cat}
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {items.map((p) => (
                <ProjectCard key={`${p.owner}/${p.repo}`} project={p} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
