import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = { title: "Blog · Alastair" };

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <header className="mt-4">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-3 text-lg text-muted">关于量化、AI 系统与独立开发的记录。</p>
        </header>

        <section className="mt-12">
          {posts.length === 0 ? (
            <p className="text-muted">还没有文章。</p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <article>
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-2xl font-semibold transition-colors group-hover:text-accent">
                        {post.title}
                      </h2>
                      <time className="shrink-0 font-mono text-sm text-muted">
                        {formatDate(post.date)}
                      </time>
                    </div>
                    {post.description && (
                      <p className="mt-2 leading-relaxed text-muted">{post.description}</p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-panel px-2 py-0.5 font-mono text-xs text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
