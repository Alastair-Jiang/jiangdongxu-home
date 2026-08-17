export default function Hero() {
  return (
    <section className="fade-up flex min-h-[60vh] flex-col justify-center py-24">
      <p className="font-mono text-sm text-accent">// Alastair</p>
      <h1 className="mt-6 text-5xl font-bold leading-tight text-fg md:text-6xl">
        金融工程 <span className="text-accent">×</span> 量化{" "}
        <span className="text-accent">×</span> AI
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">
        独立开发者，做量化系统、多专家路由与异步协作工具。
      </p>
      <div className="mt-10 flex gap-4">
        <a
          href="#projects"
          className="rounded bg-accent px-5 py-2.5 font-mono text-sm text-bg transition-colors hover:bg-accent-dim"
        >
          看我的项目
        </a>
        <a
          href="https://github.com/Alastair-Jiang"
          target="_blank"
          rel="noreferrer"
          className="hairline rounded px-5 py-2.5 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
