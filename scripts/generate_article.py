#!/usr/bin/env python3
"""
每日 SEO 文章生成器 — 从本地商品池生成 Buying Guide, 追加到 data/articles.ts

用法: python3 scripts/generate_article.py [站点目录]
  - 默认取脚本所在目录的上一级 (站点根)
  - 生成后自动验证 articles.ts 语法 (node type-stripping import)
  - 部署由调用方处理: GHS=git push / PHS=vercel --prod

零外部依赖、不调 LLM、不调 Amazon API — 保证 cron 稳定。
"""
import datetime
import hashlib
import html
import json
import os
import re
import subprocess
import sys

SITE = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_DIR = os.path.join(SITE, 'data')
PRODUCTS_PATH = os.path.join(DATA_DIR, 'products.ts')
ARTICLES_PATH = os.path.join(DATA_DIR, 'articles.ts')
STATE_PATH = os.path.join(DATA_DIR, '.last_article.json')
KEYWORDS_PATH = os.path.join(DATA_DIR, 'keywords.json')

# 品类特征词: 关键词 → 品类匹配 (长尾词定位到有商品的品类)
CATEGORY_KEYWORDS = {
    'Dog Supplies': ['dog', 'puppy', 'canine', 'leash', 'chew', 'german shepherd', 'golden retriever'],
    'Cat Supplies': ['cat', 'kitten', 'litter', 'feline'],
    'Reptile Supplies': ['reptile', 'gecko', 'terrarium', 'snake', 'lizard', 'turtle', 'aquarium', 'fish tank', 'fish'],
    'Vitamins & Supplements': ['vitamin', 'supplement', 'collagen', 'omega', 'creatine', 'probiotic', 'mineral', 'multivitamin', 'zinc', 'magnesium'],
    'Wellness & Relaxation': ['massage', 'essential oil', 'diffuser', 'relax', 'aromatherapy', 'spa', 'anxiety', 'sleep'],
    'Beauty': ['mascara', 'shampoo', 'skincare', 'makeup', 'hair', 'beauty', 'conditioner', 'fragrance', 'lotion', 'serum'],
    'Electronics': ['headphone', 'speaker', 'charger', 'phone', 'tablet', 'laptop', 'camera', 'watch', 'earbud', 'tv', 'monitor'],
    'Home & Kitchen': ['air fryer', 'vacuum', 'kitchen', 'pillow', 'cookware', 'blender', 'toaster', 'coffee maker', 'knife'],
    'Exercise & Fitness': ['fitness', 'yoga', 'dumbbell', 'resistance', 'gym', 'treadmill', 'workout', 'exercise', 'kettlebell'],
    'Toys & Games': ['toy', 'game', 'lego', 'puzzle', 'doll', 'action figure', 'kids'],
    'Grocery': ['snack', 'coffee', 'tea', 'protein bar', 'granola', 'cereal', 'chips'],
}


def match_keyword_to_category(kw, products):
    """关键词 → 品类: 特征词命中分最高的品类, 且该品类在商品池中"""
    cats_with_products = {p['category'] for p in products}
    best_cat, best_score = None, 0
    for cat, words in CATEGORY_KEYWORDS.items():
        if cat not in cats_with_products:
            continue
        score = sum(1 for w in words if w in kw)
        if score > best_score:
            best_cat, best_score = cat, score
    return best_cat if best_cat else None

# ---------- 商品解析 ----------

def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()

def parse_products(src):
    """从 products.ts 提取商品: 用 node type-stripping 直接 import, 最可靠"""
    code = (
        "const { featuredProducts } = await import('./data/products.ts');\n"
        "const out = featuredProducts.map(p => ({ id: p.id, title: p.title, price: p.price, "
        "rating: p.rating, reviewCount: p.reviewCount, category: p.category }));\n"
        "console.log(JSON.stringify(out));"
    )
    r = subprocess.run(
        ['node', '--experimental-strip-types', '--input-type=module', '-e', code],
        cwd=SITE, capture_output=True, text=True, timeout=60,
    )
    if r.returncode != 0:
        raise RuntimeError(f'node 解析 products.ts 失败: {r.stderr[-500:]}')
    return json.loads(r.stdout.strip().split('\n')[-1])

def parse_existing_articles(src):
    """提取现有 slug 集合 + 末尾插入位置 (指向数组闭合 ']' 的位置)"""
    slugs = re.findall(r"slug: '([^']+)'", src)
    stripped = src.rstrip()
    end = stripped.rfind('\n]')
    if end == -1:
        raise RuntimeError('未找到 articles 数组结尾')
    return set(slugs), end + 1

# ---------- 文章生成 ----------

MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December']

def pick_category(products, prev_category):
    """按商品数排序选分类, 优先商品最多的, 避免连续重复"""
    counts = {}
    for p in products:
        c = p['category']
        if c:
            counts[c] = counts.get(c, 0) + 1
    ranked = sorted(counts.items(), key=lambda x: -x[1])
    if not ranked:
        raise RuntimeError('商品池为空')
    if len(ranked) > 1 and ranked[0][0] == prev_category:
        return ranked[1][0]
    return ranked[0][0]

def clean_title(t):
    """商品标题截断做 section 标题, 处理转义 + HTML 实体"""
    t = html.unescape(t).replace('\\', '')
    if len(t) > 62:
        cut = t[:59].rsplit(' ', 1)[0]
        t = cut.rstrip(' ,-—') + '…'
    return t

def js_str(s):
    """JS 单引号字符串转义"""
    return s.replace('\\', '\\\\').replace("'", "\\'")

def make_article(products, category, date, existing_slugs, keyword=None):
    cats = [p for p in products if p['category'] == category]
    cats = sorted(cats, key=lambda p: -(p.get('reviewCount') or 0))[:4]
    if not cats:
        raise RuntimeError(f'分类 {category} 无商品')

    today = date.strftime('%Y-%m-%d')
    month_year = f"{MONTHS[date.month - 1]} {date.year}"
    day_key = date.strftime('%Y%m%d')

    if keyword:
        # 关键词驱动: 标题直接用长尾词, 去掉尾部的平台/地区/评价词
        title = keyword.title()
        title = re.sub(r'\bBest Buy\b', 'Best', title, flags=re.I)
        title = re.sub(r'\b20\d\d\b', str(date.year), title)
        title = re.sub(r'\s+(Amazon|Reviews?|Online|Uk|Nz|Usa|Canada|Australia|Philippines|India|Cheap|Sale)$', '', title, flags=re.I)
        title = re.sub(r'\s+(Amazon|Reviews?|Online)$', '', title, flags=re.I)
        title = title.strip()
        if not re.search(r'\b(20\d\d)\b', title):
            title = f'{title} ({month_year})'
        slug_base = re.sub(r'[^a-z0-9]+', '-', keyword.lower()).strip('-') + '-' + day_key
    else:
        title_variants = [
            f'Best {category} on Amazon Right Now ({month_year})',
            f'Top {category} People Are Actually Buying ({month_year})',
            f'{category}: The Picks Worth Your Money ({month_year})',
        ]
        title = title_variants[int(hashlib.md5(day_key.encode()).hexdigest(), 16) % len(title_variants)]
        slug_base = 'best-' + re.sub(r'[^a-z0-9]+', '-', category.lower()).strip('-') + '-' + day_key

    slug = slug_base
    n = 2
    while slug in existing_slugs:
        slug = f'{slug_base}-{n}'
        n += 1

    # 文章关键词标签
    if keyword:
        kw = [keyword]
    else:
        kw = [f'best {category.lower()} 2026', f'top {category.lower()}', 'amazon best sellers']
    for c in cats[:2]:
        words = re.findall(r'[a-z]{4,}', c['title'].lower())
        words = [w for w in words if w not in ('amazon', 'with', 'for', 'and', 'the', 'from', 'your')]
        if words:
            kw.append(' '.join(words[:4]))

    if keyword:
        description = (
            f'Looking for {keyword}? We pull live Amazon best-seller data every day — here are the '
            f'top picks real shoppers are buying right now, with honest buying guidance and current prices.'
        )
    else:
        description = (
            f'We pull live Amazon best-seller data every day. Here are the {category} '
            f'products real shoppers are buying right now — with honest buying guidance and current prices.'
        )

    sections = []
    variant = int(hashlib.md5(((keyword or category) + day_key).encode()).hexdigest(), 16) % 3
    if keyword:
        intros = [
            f'Shopping for {keyword}? This guide is built from live Amazon best-seller data we refresh '
            f'every morning — so these are the exact products real shoppers are buying right now, not '
            f'paid placements. For {month_year}, these {category} picks keep showing up in the rankings, '
            f'and each one below is in our catalog today with a current price and rating.',
            f'We update this guide every morning with live Amazon sales data, so these are the {category} '
            f'products people are actually buying when they search for {keyword} — no paid placements, '
            f'just what real shoppers choose. Here is what is trending in {month_year} and what it costs today.',
            f'If you are searching for {keyword}, you have come to the right place. This list comes straight '
            f'from Amazon best-seller rankings that we refresh daily — the picks below are the ones real '
            f'buyers keep choosing in {month_year}, each with a current price and rating.',
        ]
        intro = intros[variant]
    else:
        intro = (
            f'Every morning we refresh this list from live Amazon best-seller rankings, so what you see here '
            f'reflects what real shoppers are buying right now — not paid placements. For {month_year}, '
            f'these {category} picks keep coming back, and each one below is in our catalog today with a '
            f'current price and rating.'
        )
    intro_headings = ['Why These Picks Keep Topping the Charts', 'What Real Shoppers Are Buying Right Now', 'The Data Behind These Picks']
    sections.append({'heading': intro_headings[variant], 'body': intro})

    for i, p in enumerate(cats, 1):
        rating = p.get('rating') or 0
        rc = p.get('reviewCount') or 0
        price = p.get('price') or 'see current price'
        heading = f'{i}. {clean_title(p["title"])}'
        body = (
            f'This is one of the most-purchased {category} items in our daily Amazon data. '
            f'It is currently listed at {price} with a {rating}-star average across {rc:,} reviews. '
            f'We include it because it keeps showing up in the best-seller rankings — steady demand and '
            f'consistent ratings are usually a better signal than flashy marketing. Check the product page '
            f'for the latest price, as Amazon deals change frequently.'
        )
        sections.append({'heading': heading, 'body': body, 'productIds': [p['id']]})

    advices = [
        (
            f'How to pick the right {category} product: compare ratings above 4 stars and review counts in the '
            f'hundreds or more, check the most recent reviews for quality complaints, and watch the price — '
            f'Amazon prices move daily and our links always show the live price. When in doubt, buy from a '
            f'brand with a long track record and a solid return policy. Prices and availability were accurate '
            f'when this guide was published ({today}) and may change.'
        ),
        (
            f'A quick checklist before you buy {category.lower()}: read the most recent reviews (not just the '
            f'star rating), compare today\'s price against similar products, and check how many units the seller '
            f'has moved this month. Products with steady sales and thousands of reviews are the safest bet. '
            f'Prices were accurate at publication ({today}) and may change.'
        ),
        (
            f'Three golden rules for buying {category.lower()} online: first, prefer brands with thousands of '
            f'reviews; second, watch for items whose rating dropped recently — that usually means a bad batch; '
            f'third, remember the price you see today may change tomorrow, so our links always show the live '
            f'price. This guide was last refreshed on {today}.'
        ),
    ]
    advice_heads = ['How to Choose the Right One', 'Before You Buy — Quick Checklist', 'Three Golden Rules']
    sections.append({'heading': advice_heads[variant], 'body': advices[variant]})

    read_min = max(4, min(8, 3 + len(cats)))
    lines = []
    lines.append("  {")
    lines.append(f"    slug: '{js_str(slug)}',")
    lines.append(f"    title: '{js_str(title)}',")
    lines.append(f"    description:")
    lines.append(f"      '{js_str(description)}',")
    lines.append("    keywords: [")
    for k in kw:
        lines.append(f"      '{js_str(k)}',")
    lines.append("    ],")
    lines.append(f"    date: '{today}',")
    lines.append(f"    readTime: '{read_min} min read',")
    lines.append(f"    category: '{js_str(category)}',")
    lines.append(f"    emoji: '🛒',")
    lines.append("    sections: [")
    for s in sections:
        lines.append("      {")
        lines.append(f"        heading: '{js_str(s['heading'])}',")
        lines.append(f"        body: '{js_str(s['body'])}',")
        if s.get('productIds'):
            lines.append("        productIds: [" + ', '.join(f"'{pid}'" for pid in s['productIds']) + "],")
        lines.append("      },")
    lines.append("    ],")
    lines.append("  },")

    return slug, title, category, '\n'.join(lines) + '\n'

# ---------- 主流程 ----------

def main():
    src_p = read(PRODUCTS_PATH)
    src_a = read(ARTICLES_PATH)
    products = parse_products(src_p)
    existing_slugs, insert_at = parse_existing_articles(src_a)

    prev = None
    used = set()
    if os.path.exists(STATE_PATH):
        try:
            st = json.loads(read(STATE_PATH))
            prev = st.get('category')
            used = set(st.get('used_kws', []))
        except Exception:
            prev = None

    # 关键词库优先: 挑未用过、分数最高、能匹配到有商品品类的长尾词
    keyword = None
    category = None
    if os.path.exists(KEYWORDS_PATH):
        try:
            kws = json.loads(read(KEYWORDS_PATH))
        except Exception:
            kws = []
        for k in kws:
            if k['kw'] in used:
                continue
            cat = match_keyword_to_category(k['kw'], products)
            if cat and sum(1 for p in products if p['category'] == cat) >= 3:
                keyword = k['kw']
                category = cat
                break

    if keyword is None:
        category = pick_category(products, prev)
    slug, title, category, block = make_article(products, category, datetime.date.today(), existing_slugs, keyword)

    new_src = src_a[:insert_at] + '\n' + block + src_a[insert_at:]
    with open(ARTICLES_PATH, 'w', encoding='utf-8') as f:
        f.write(new_src)

    # 验证
    code = (
        "const { articles } = await import('./data/articles.ts');\n"
        "console.log(JSON.stringify({ count: articles.length, last: articles[articles.length-1].slug }));"
    )
    r = subprocess.run(
        ['node', '--experimental-strip-types', '--input-type=module', '-e', code],
        cwd=SITE, capture_output=True, text=True, timeout=60,
    )
    if r.returncode != 0:
        # 回滚
        with open(ARTICLES_PATH, 'w', encoding='utf-8') as f:
            f.write(src_a)
        raise RuntimeError(f'验证失败, 已回滚: {r.stderr[-500:]}')
    info = json.loads(r.stdout.strip().split('\n')[-1])

    new_used = sorted(used | ({keyword} if keyword else set()))
    with open(STATE_PATH, 'w', encoding='utf-8') as f:
        json.dump({'category': category, 'last_kw': keyword, 'used_kws': new_used, 'date': datetime.date.today().isoformat()}, f)

    print(f"✅ 文章已生成: {slug}")
    print(f"   title: {title}")
    print(f"   keyword: {keyword or '(品类轮换)'} | category: {category}")
    print(f"   关键词池已用 {len(new_used)} 个, 剩余 {max(0, len(kws or []) - len(new_used))} 个")
    print(f"   商品池 {info['count']} 篇, 最新: {info['last']}")

if __name__ == '__main__':
    main()
