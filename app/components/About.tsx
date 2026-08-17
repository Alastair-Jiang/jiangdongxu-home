import SectionTitle from "./SectionTitle";

const skills = ["Python", "TypeScript", "量化回测", "LLM 路由", "异步协作"];

export default function About() {
  return (
    <section id="about" className="py-20">
      <SectionTitle index="01" title="关于" />
      <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 text-base leading-relaxed text-muted">
          <p>
            做量化系统、多专家路由与异步协作工具，以 Nemco 的身份独立开发。
          </p>
          <p>
            关注的方向：中频量化交易、LLM 路由与硬化、多 agent 协作。下方项目区的数据
            直接来自我的 GitHub 仓库，实时同步。
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              Skills
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="hairline rounded px-3 py-1 font-mono text-xs text-fg"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              Workspace
            </h3>
            <ul className="mt-3 space-y-2 font-mono text-sm text-muted">
              <li>ThinkBook 14+</li>
              <li>Mac Mini M4</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
