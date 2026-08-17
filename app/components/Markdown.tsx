import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

/** 站内 Markdown 渲染：README / 博客文章共用，走浅色 Jane Street 风格 */
const components: Components = {
  h1: (props) => (
    <h1 className="mt-10 mb-4 border-b border-line pb-2 text-2xl font-semibold" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-3 text-xl font-semibold" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-2 text-lg font-semibold" {...props} />
  ),
  p: (props) => <p className="my-4 leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="text-blue underline underline-offset-4 hover:text-accent"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  ul: (props) => <ul className="my-4 list-disc space-y-1 pl-6" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-1 pl-6" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  code: ({ node, className, ...props }) => {
    const isBlock = typeof className === "string" && /language-/.test(className);
    return (
      <code
        className={
          isBlock
            ? "font-mono text-[0.9em]"
            : "rounded bg-panel px-1.5 py-0.5 font-mono text-[0.9em]"
        }
        {...props}
      />
    );
  },
  pre: (props) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg bg-panel p-4 font-mono text-sm leading-relaxed"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote className="my-4 border-l-4 border-accent pl-4 text-muted" {...props} />
  ),
  table: (props) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border border-line px-3 py-2 text-left font-semibold" {...props} />
  ),
  td: (props) => <td className="border border-line px-3 py-2" {...props} />,
  hr: (props) => <hr className="my-8 border-line" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
};

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
