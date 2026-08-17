import { projects, type ProjectMeta } from "./projects";

/** GitHub API 返回的仓库字段（只用需要的子集） */
export interface RepoData {
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  html_url: string;
  homepage: string | null;
  topics: string[];
}

export interface Project extends ProjectMeta {
  /** null = 拉取失败（构建时无网络 / 限流），渲染层据此回退 */
  data: RepoData | null;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchRepo(meta: ProjectMeta): Promise<Project> {
  const url = `https://api.github.com/repos/${meta.owner}/${meta.repo}`;
  try {
    const res = await fetch(url, {
      headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
      // ISR：最多每小时向 GitHub 拉一次，避免每次请求都打 API（无 token 限 60 次/时）
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { ...meta, data: null };
    const data: RepoData = await res.json();
    return { ...meta, data };
  } catch {
    // 构建时无网络也不让整个站挂掉，卡片走站内 description 回退
    return { ...meta, data: null };
  }
}

/** 并发拉取全部仓库的实时元数据 */
export async function getAllProjects(): Promise<Project[]> {
  return Promise.all(projects.map(fetchRepo));
}
