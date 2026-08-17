# jiangdongxu-home

Alastair 的个人网站。Jane Street 风格（浅色底 + 橙色强调 + 极简克制）。

- **首页**：Hero + About + Projects（自动拉取 GitHub 仓库元数据）
- **项目详情页** `/projects/[repo]`：渲染仓库 README + 提交时间线 + 侧边目录
- **博客** `/blog` + `/blog/[slug]`：Markdown 文章，带阅读进度条 + 目录导航

## 技术栈

- Next.js 16（App Router）+ TypeScript
- Tailwind CSS v4
- GitHub REST API 作为内容源（ISR，每小时同步一次）
- react-markdown + remark-gfm + gray-matter（Markdown 渲染 / 文章解析）

## ⚠️ 验证方式（重要）

**本项目禁止使用 `npm run dev`**（dev server + HMR 会吃满内存导致整机卡死）。

验证一律用：

```bash
npm install
npm run build
npm start
```

然后访问 http://localhost:3000。

## 目录结构

```
app/
├── layout.tsx              # 根布局（浅色底、元数据）
├── page.tsx                # 首页：Hero + About + Projects
├── globals.css             # Jane Street 设计 token（@theme）
├── not-found.tsx           # 自定义 404
├── icon.svg                # favicon
├── blog/
│   ├── page.tsx            # 博客列表
│   └── [slug]/page.tsx     # 博客详情
├── projects/
│   └── [repo]/page.tsx     # 项目详情（README + commits）
└── components/
    ├── Navbar.tsx / Hero.tsx / About.tsx / Projects.tsx / Footer.tsx
    ├── Markdown.tsx        # Markdown 渲染（标题加 id 供 TOC）
    ├── Toc.tsx             # 侧边目录（scroll spy）
    ├── ReadingProgress.tsx # 顶部阅读进度条
    └── BackToTop.tsx       # 回到顶部
lib/
├── projects.ts             # 仓库清单（owner/repo + 分类 + 中文描述）
├── github.ts               # GitHub API 数据层（仓库/README/commits，容错 + ISR）
└── posts.ts                # 博客文章解析（gray-matter）
content/
└── posts/                  # 博客文章（Markdown + frontmatter）
```

## 配置（可选）

`lib/github.ts` 读取环境变量 `GITHUB_TOKEN` 提升 API 速率上限（无 token 为 60 次/时）。
需要时建 `.env.local`：

```
GITHUB_TOKEN=ghp_xxx
```

## 如何加一个新仓库

在 `lib/projects.ts` 的 `projects` 数组里加一条：

```ts
{
  owner: "Alastair-Jiang",
  repo: "my-new-repo",
  name: "展示名",
  category: "量化", // 或 "AI 系统"
  description: "站内中文描述",
  order: 8,
}
```

网站构建时会自动拉取它的 stars / language / 更新时间，并生成详情页。

## 如何写一篇博客

在 `content/posts/` 下新建 `slug.md`：

```markdown
---
title: "文章标题"
date: "2026-08-17"
description: "一句话摘要"
tags: ["标签1", "标签2"]
---

正文（Markdown，支持 GFM 表格 / 代码块）
```

`npm run build` 后自动出现在 `/blog` 列表。
