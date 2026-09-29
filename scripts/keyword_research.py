#!/usr/bin/env python3
"""
关键词研究引擎 — 基于 Bing autosuggest 递归扩展, 构建购买意图长尾词库

用法: python3 scripts/keyword_research.py [站点目录] [递归轮数=2]
输出: data/keywords.json — 按(意图分数, 词数)排序的关键词池

    --rescore : 不联网，用最新评分逻辑重算已有词库（改评分规则后跑这个）
零外部依赖, 只调 Bing 免费联想接口
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

_ARGS = [a for a in sys.argv[1:] if not a.startswith('--')]
RESCORE = '--rescore' in sys.argv
SITE = os.path.abspath(_ARGS[0] if len(_ARGS) > 0 else os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ROUNDS = int(_ARGS[1]) if len(_ARGS) > 1 else 2
OUT = os.path.join(SITE, 'data', 'keywords.json')

# 各站种子词（购买意图为主）
SITE_SEEDS = {
    'globalhotsellers': [
        'best vitamins', 'supplements', 'collagen', 'omega 3', 'creatine',
        'probiotics', 'massage gun', 'essential oil', 'diffuser',
        'robot vacuum', 'air fryer', 'mascara', 'shampoo', 'skincare',
        'fitness tracker', 'yoga mat', 'resistance bands', 'dumbbells',
        'toys for kids', 'board games', 'kitchen gadgets', 'pillow',
    ],
    'pethotsellers': [
        'best dog food', 'dog treats', 'dog toys', 'dog supplements',
        'cat food', 'cat toys', 'cat treats', 'cat litter',
        'dog grooming', 'dog beds', 'dog crate', 'leash',
        'reptile supplies', 'aquarium', 'fish tank', 'bird toys',
        'hamster cage', 'pet carrier', 'dog camera', 'pet fountain',
    ],
}

STOP = {
    'airfryer87', 'tv woman', '🔞', '免费', '视频', '直播', '成人',
    'porn', 'xxx', 'nude', 'onlyfans', 'best buy',
}

def bing_suggest(q):
    url = 'https://api.bing.com/osjson.aspx?query=' + urllib.parse.quote(q)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'})
        with urllib.request.urlopen(req, timeout=15) as r:
            data = json.loads(r.read().decode())
            return data[1] if len(data) > 1 else []
    except Exception:
        return []

# --- v2 新增：本地意图 / 分类信息网站 / 第三方零售商 ---
# 我们是内容+联盟站，不是本地商家也不是零售平台：
#   "near me" 类词要的是本地门店 → 不会转化
#   "walmart/ebay/temu" 类词要的是该平台商品 → 我们没有该平台库存，且存在商标风险
JUNK_PATTERNS = [
    r'\bnear me\b', r'\bnearby\b', r'\bin store\b',
    r'\bgumtree\b', r'\bcraigslist\b', r'\bfacebook marketplace\b',
    r'\bwalmart\b', r'\bebay\b', r'\btemu\b', r'\bargos\b',
    r'\btarget\b', r'\bwayfair\b', r'\blowes\b', r'\bhome depot\b',
    r'\betsy\b', r'\balibaba\b', r'\baliexpress\b', r'\bshopee\b',
    r'\blazada\b', r'\bwish\b',
    r'\bused\b', r'\bsecond hand\b', r'\bsecondhand\b', r'\brefurbished\b',
]


def is_junk(kw):
    """本地意图 / 平台词 / 二手交易词 —— 一律不选。"""
    return any(re.search(p, kw) for p in JUNK_PATTERNS)


def intent_score(kw):
    """购买意图 + 竞争度平衡评分

    v2 (2026-09-29): 加入竞争度惩罚。
    实测根因：v1 只算购买意图，导致 "best vitamins for men" 这类
    超高竞争头词得最高分 → 新站排 68-89 位 → 永远拿不到点击。
    新站必须打长尾。
    """
    s = 0
    # --- 购买意图（保留 v1 逻辑）---
    if re.search(r'\b(best|top|greatest|popular)\b', kw): s += 3
    if re.search(r'\b(for|with|under|vs|versus)\b', kw): s += 2
    if re.search(r'\b(cheap|affordable|budget|deals?|sale|discount)\b', kw): s += 2
    if re.search(r'\b(amazon|buy|reviews?|ratings?|price)\b', kw): s += 2
    if re.search(r'\b(2026|2025)\b', kw): s += 1
    if re.search(r'\b(how to|recipes?|ideas?|guide|tips)\b', kw): s += 1

    # --- 新增：竞争度惩罚（按词数判断长尾程度）---
    words = kw.split()
    if len(words) <= 3:
        s -= 4          # "best vitamins for men" 一类头词，新站必输
    elif len(words) <= 5:
        s -= 2
    else:
        s += 3          # 6 词以上长尾，新站机会所在

    # --- 新增：过期年份词直接淘汰 ---
    if re.search(r'\b(20(1[0-9]|2[0-4]))\b', kw):
        return -99

    return s


def rescore(path):
    """用新的 intent_score 重算已有词库，无需联网。

    读 data/keywords.json → 重算分数 → 淘汰 -99 → 按(分数, 词数)倒序写回。
    """
    with open(path, encoding='utf-8') as f:
        old = json.load(f)
    rescored = {}
    for item in old:
        kw = item['kw']
        if is_junk(kw):
            continue
        sc = intent_score(kw)
        if sc <= -99:
            continue
        rescored[kw] = sc
    ranked = sorted(rescored.items(), key=lambda x: (-x[1], -len(x[0].split())))
    with open(path, 'w', encoding='utf-8') as f:
        json.dump([{'kw': k, 'score': s} for k, s in ranked], f,
                  ensure_ascii=False, indent=1)
    longtail = [k for k, _ in ranked if len(k.split()) >= 6]
    print(f"✅ 已重算: {path}")
    print(f"   {len(old)} → {len(ranked)} 词 (淘汰 {len(old)-len(ranked)} 个过期词)")
    print(f"   其中 6 词以上长尾 {len(longtail)} 个")
    print("   TOP 10:")
    for k, s in ranked[:10]:
        print(f"     [{s:>3}] ({len(k.split())}词) {k}")
    return ranked

def clean(kw):
    kw = kw.strip().lower()
    if len(kw) < 8 or len(kw) > 60:
        return None
    if not re.search(r'[a-z]{4}', kw):
        return None
    if any(b in kw for b in STOP):
        return None
    if is_junk(kw):
        return None
    if re.search(r'[\u4e00-\u9fff]', kw):
        return None
    return kw

def main():
    if RESCORE:
        if not os.path.exists(OUT):
            sys.exit(f'❌ 词库不存在: {OUT}')
        rescore(OUT)
        return

    site_name = os.path.basename(SITE)
    seeds = SITE_SEEDS.get(site_name, SITE_SEEDS['globalhotsellers'])
    pool = {}
    frontier = seeds
    for rnd in range(1, ROUNDS + 1):
        new_words = []
        for q in frontier:
            for w in bing_suggest(q):
                c = clean(w)
                if c and c not in pool:
                    pool[c] = intent_score(c)
                    new_words.append(c)
            time.sleep(0.25)
        print(f"轮次 {rnd}: 种子 {len(frontier)} → 新增 {len(new_words)} 词 (累计 {len(pool)})")
        # 下一轮种子: 取购买意图高的长尾词 (含 for/best 的)
        frontier = [w for w in new_words if re.search(r'\b(for|best|top|with)\b', w)][:35]
        if not frontier:
            break

    ranked = sorted(pool.items(), key=lambda x: (-x[1], -len(x[0].split())))
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump([{'kw': k, 'score': s} for k, s in ranked], f, ensure_ascii=False, indent=1)

    print(f"\n✅ 关键词库已保存: {OUT} ({len(ranked)} 词)")
    print("TOP 20 (按购买意图):")
    for k, s in ranked[:20]:
        print(f"  [{s}] {k}")

if __name__ == '__main__':
    main()
