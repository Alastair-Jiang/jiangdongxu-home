# jiangdongxu-home

Alastair 的个人网站。**Phase 1**：Hero + About + Projects（自动拉取 GitHub 仓库）。

风格：Jane Street —— 深色底 + 单一橙强调，细分割线，极简克制。

## 技术栈

- Next.js 16（App Router）+ TypeScript
- Tailwind CSS v4
- GitHub REST API 作为内容源（ISR，每小时同步一次）

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
├── layout.tsx            # 根布局（深色底、元数据）
├── page.tsx              # 首页：Hero + About + Projects
├── globals.css           # Jane Street 设计 token（@theme）
└── components/
    ├── SectionTitle.tsx  # 编号 + 标题 + 细线
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── About.tsx
    ├── Projects.tsx      # 项目卡片墙（按分类分组）
    └── Footer.tsx
lib/
├── projects.ts           # 仓库清单（owner/repo + 分类 + 中文描述）
└── github.ts             # GitHub API 数据层（容错 + ISR）
```

## 配置（可选）

`lib/github.ts` 读取环境变量 `GITHUB_TOKEN` 提升 API 速率上限（无 token 为 60 次/时，
7 个仓库 + ISR 缓存通常够用）。需要时建 `.env.local`：

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
  category: "量化", // 或 AI 系统 / 通信协作 / 作品
  description: "站内中文描述",
  order: 8,
}
```

网站构建时会自动拉取它的 stars / language / 更新时间。
