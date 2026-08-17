"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * README 侧边目录：从渲染后的 .project-readme 里提取 h2–h4，
 * 做滚动高亮（scroll spy）与平滑锚点跳转。桌面端（xl）固定左侧显示。
 */
export default function ProjectToc() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const container = document.querySelector(".project-readme");
    if (!container) return;
    const headings = Array.from(
      container.querySelectorAll("h2, h3, h4"),
    ) as HTMLElement[];

    const seen = new Set<string>();
    const toc: TocItem[] = [];
    for (const h of headings) {
      const text = (h.textContent || "").trim();
      if (!text || !h.id) continue;
      // 同标题去重，保证锚点唯一
      let unique = h.id;
      let n = 2;
      while (seen.has(unique)) unique = `${h.id}-${n++}`;
      seen.add(unique);
      h.id = unique;
      toc.push({ id: unique, text, level: Number(h.tagName[1]) });
    }
    setItems(toc);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const onScroll = () => {
      let current = "";
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) current = item.id;
      }
      if (current) setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="fixed left-6 top-32 z-30 hidden w-52 xl:block">
      <h4 className="font-mono text-xs uppercase tracking-wider text-muted">
        目录
      </h4>
      <ul className="mt-3 space-y-0.5">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block truncate py-1 text-sm leading-snug transition-colors ${
                  active
                    ? "font-medium text-accent"
                    : "text-muted hover:text-fg"
                }`}
                style={{ paddingLeft: `${(item.level - 2) * 12 + 8}px` }}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
