#!/usr/bin/env python3
"""
关键词研究引擎 — 基于 Bing autosuggest 递归扩展, 构建购买意图长尾词库

用法: python3 scripts/keyword_research.py [站点目录] [递归轮数=2]
输出: data/keywords.json — 按意图分数排序的关键词池
零外部依赖, 只调 Bing 免费联想接口
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

SITE = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ROUNDS = int(sys.argv[2]) if len(sys.argv) > 2 else 2
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

def intent_score(kw):
    """购买意图评分: best/top/for/cheap/amazon/reviews 词更高分"""
    s = 0
    if re.search(r'\b(best|top|greatest|popular)\b', kw): s += 3
    if re.search(r'\b(for|with|under|vs|versus)\b', kw): s += 2
    if re.search(r'\b(cheap|affordable|budget|deals?|sale|discount)\b', kw): s += 2
    if re.search(r'\b(amazon|buy|reviews?|ratings?|price)\b', kw): s += 2
    if re.search(r'\b(2026|2025)\b', kw): s += 1
    if re.search(r'\b(how to|recipes?|ideas?|guide|tips)\b', kw): s += 1
    return s

def clean(kw):
    kw = kw.strip().lower()
    if len(kw) < 8 or len(kw) > 60:
        return None
    if not re.search(r'[a-z]{4}', kw):
        return None
    if any(b in kw for b in STOP):
        return None
    if re.search(r'[\u4e00-\u9fff]', kw):
        return None
    return kw

def main():
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

    ranked = sorted(pool.items(), key=lambda x: -x[1])
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump([{'kw': k, 'score': s} for k, s in ranked], f, ensure_ascii=False, indent=1)

    print(f"\n✅ 关键词库已保存: {OUT} ({len(ranked)} 词)")
    print("TOP 20 (按购买意图):")
    for k, s in ranked[:20]:
        print(f"  [{s}] {k}")

if __name__ == '__main__':
    main()
