import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-3xl font-bold">页面不存在</h1>
      <p className="mt-3 text-muted">你访问的地址没有对应的内容。</p>
      <Link
        href="/"
        className="hairline mt-8 rounded px-4 py-2 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
      >
        返回首页
      </Link>
    </div>
  );
}
