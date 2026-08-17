import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import Markdown from "@/app/components/Markdown";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post ? `${post.title} · Alastair` : "文章 · Alastair" };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/blog" className="font-mono text-sm text-muted hover:text-accent">
          ← 返回博客
        </Link>

        <header className="mt-8">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-sm text-muted">
            <time>{formatDate(post.date)}</time>
            {post.tags.length > 0 && (
              <span className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded bg-panel px-2 py-0.5 text-xs">
                    {tag}
                  </span>
                ))}
              </span>
            )}
          </div>
        </header>

        <article className="mt-10">
          <Markdown>{post.content}</Markdown>
        </article>
      </main>
      <Footer />
    </>
  );
}
