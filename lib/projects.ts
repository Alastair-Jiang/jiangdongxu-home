/**
 * 仓库清单（站内手动维护）
 *
 * 这里决定「哪些仓库进网站、按什么分类、以什么顺序」。
 * GitHub 的实时元数据（stars / language / pushed_at 等）由 lib/github.ts 拉取，
 * 两处合并后才渲染成项目卡片。
 *
 * description 是站内中文覆盖；留空则回退到 GitHub 仓库自带的 description。
 */
export type Category = "量化" | "AI 系统";

export interface ProjectMeta {
  owner: string;
  repo: string;
  name: string; // 站内显示名
  category: Category;
  description: string; // 站内中文描述（可为空串，走回退）
  featured?: boolean;
  order: number;
}

export const projects: ProjectMeta[] = [
  {
    owner: "Alastair-Jiang",
    repo: "quant-mft",
    name: "quant-mft",
    category: "量化",
    description:
      "中频 ML 量化交易系统：A 股 + 加密货币，LightGBM 预测回测，Telegram 信号推送",
    featured: true,
    order: 1,
  },
  {
    owner: "Alastair-Jiang",
    repo: "Dongxu-Jiang-daft",
    name: "DAFT",
    category: "AI 系统",
    description: "DAFT：维度感知金融交易 —— CDAP 三维互调 + 自适应硬化，灵感源自 Kimi K3",
    featured: true,
    order: 2,
  },
  {
    owner: "Alastair-Jiang",
    repo: "Citi-Plus",
    name: "Citi-Plus",
    category: "量化",
    description: "基于花旗杯项目的实记整理与二次开发",
    order: 3,
  },
  {
    owner: "Alastair-Jiang",
    repo: "group-daft2",
    name: "group-daft2",
    category: "AI 系统",
    description: "DAFT 测试与储备仓库",
    order: 4,
  },
];

/** 分类的展示顺序 */
export const categoryOrder: Category[] = ["量化", "AI 系统"];

/** 根据仓库名查找清单条目（用于详情页） */
export function getProjectByRepo(repo: string): ProjectMeta | undefined {
  return projects.find((p) => p.repo === repo);
}
