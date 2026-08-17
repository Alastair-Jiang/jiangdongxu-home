"use client";

import { useEffect, useState } from "react";

/** 顶部阅读进度条（Jane Street 橙色） */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? el.scrollTop / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-0.5">
      <div
        className="h-full bg-accent"
        style={{ width: `${Math.min(100, progress * 100)}%` }}
      />
    </div>
  );
}
