import { articles, type Article } from '@/data/articles'

/**
 * 识别「重复文章」——同一主关键词被多次生成的文章。
 *
 * 背景
 * ----
 * 2026-09-15 文章引擎迁到 GitHub Actions 后，状态文件 data/.last_article.json
 * 被 .gitignore 排除 → 云端拿不到「已用关键词」→ 每天从词库第一条重新开始
 * → 同一关键词被反复生成（GHS 56 篇 / PHS 57 篇，合计 113 篇）。
 *
 * 生成引擎已在 2026-09-29 修复（改用 articles.ts 反推已用词），不会再新增；
 * 但历史重复文章仍在线上。本模块用于：
 *   - 每组重复只保留**最早一篇**作为规范页（canonical）
 *   - 其余返回 noindex + canonical 指向规范页
 *   - 并从 sitemap 中剔除
 *
 * 判定依据 = keywords[0]（主关键词），与 scripts/generate_article.py 的写入一致。
 * 注意：articles.ts 每天由生成脚本重写，因此这里必须**动态计算**，不能写死列表。
 */

/** 主关键词（与生成脚本一致：keywords 数组第一项） */
function primaryKeyword(a: Article): string {
  return (a.keywords && a.keywords[0]) || ''
}

/** 每组重复里被选为规范页的 slug */
function buildCanonicalMap(): Map<string, string> {
  // 1) 每个主关键词选一篇「规范页」：日期最早者；同日期则取数组中靠前者
  const keepers = new Map<string, Article>()
  for (const a of articles) {
    const kw = primaryKeyword(a)
    if (!kw) continue
    const cur = keepers.get(kw)
    if (!cur || a.date < cur.date) keepers.set(kw, a)
  }

  // 2) 非规范页 → 映射到规范页 slug
  const map = new Map<string, string>()
  for (const a of articles) {
    const kw = primaryKeyword(a)
    if (!kw) continue
    const keeper = keepers.get(kw)
    if (keeper && keeper.slug !== a.slug) map.set(a.slug, keeper.slug)
  }
  return map
}

const canonicalMap = buildCanonicalMap()

/** 该文章是否为重复页（需要 noindex） */
export function isDuplicateArticle(slug: string): boolean {
  return canonicalMap.has(slug)
}

/** 该文章的规范页 slug；非重复页返回 null */
export function getCanonicalSlug(slug: string): string | null {
  return canonicalMap.get(slug) ?? null
}

/** 全部重复页的 slug 集合（供 sitemap 过滤） */
export const duplicateSlugs: ReadonlySet<string> = new Set(canonicalMap.keys())

/** 统计信息（便于构建时观察 / 调试） */
export function duplicateStats() {
  const groups = new Map<string, number>()
  for (const a of articles) {
    const kw = primaryKeyword(a)
    if (!kw) continue
    groups.set(kw, (groups.get(kw) ?? 0) + 1)
  }
  const dupGroups: Array<[string, number]> = []
  groups.forEach((n, kw) => {
    if (n > 1) dupGroups.push([kw, n])
  })
  return {
    total: articles.length,
    duplicateCount: canonicalMap.size,
    groups: dupGroups.length,
    largest: dupGroups.sort((a, b) => b[1] - a[1]).slice(0, 5),
  }
}
