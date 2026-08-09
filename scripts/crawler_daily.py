#!/usr/bin/env python3
"""
GlobalHotSellers 每日热卖商品爬虫
- 每天早上抓取 Amazon Best Sellers 各品类 Top 商品
- 提取: ASIN / 标题 / 评分 / 评论数 / USD价格 / 真实主图(hiRes)
- 图片本地化(900px) → 合并更新 products.ts → git push 自动部署
用法: python3 scripts/crawler_daily.py [--dry-run] [--limit 5]
"""
import re
import json
import os
import sys
import time
import subprocess
import shutil
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = f'{ROOT}/public/images/products'
DATA_FILE = f'{ROOT}/data/products.ts'

# 读取站点配置 (支持多站点部署: 宠物站/健身站/美妆站共用一套代码)
with open(f'{ROOT}/site.config.json') as f:
    SITE_CFG = json.load(f)
TAG = SITE_CFG.get('amazonTag', 'globalhotsell-20')
BASE_URL = SITE_CFG.get('domain', 'https://globalhotsellers.net')
MAX_PRODUCTS = SITE_CFG.get('maxProducts', 60)   # 商品总量上限
PER_CATEGORY = 6           # 每品类抓取数量
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
COOKIE = 'i18n-prefs=USD;lc-main=en_US'

# 品类: 来自配置; 未配置时用默认全品类
# 支持子类目格式: 'parent-slug/nodeID:Display Name' 或 'slug:Display Name'
def _parse_categories(cats):
    parsed = []
    for c in cats:
        if ':' in c:
            key, name = c.split(':', 1)
        else:
            key = c
            name = ' '.join(w.capitalize() for w in c.split('/')[0].split('-'))
        parsed.append((key.strip(), name.strip()))
    return parsed

CATEGORIES = _parse_categories(SITE_CFG.get('amazonCategories', [
    'electronics', 'home-kitchen', 'beauty', 'sports-outdoors',
    'grocery', 'toys-games', 'pet-supplies', 'health-personal-care']))

DRY = '--dry-run' in sys.argv
if '--limit' in sys.argv:
    PER_CATEGORY = int(sys.argv[sys.argv.index('--limit') + 1])

# 汇率缓存 (USD/CNY)
FX_RATE = 6.8  # 兜底值

def get_fx_rate():
    """获取 USD->CNY 汇率, 失败用兜底"""
    global FX_RATE
    try:
        r = subprocess.run(
            ['curl', '-s', '--max-time', '10', 'https://open.er-api.com/v6/latest/USD'],
            capture_output=True, text=True)
        d = json.loads(r.stdout)
        if d.get('result') == 'success' and d['rates'].get('CNY'):
            FX_RATE = d['rates']['CNY']
            print(f'💱 汇率 USD/CNY = {FX_RATE:.4f}')
    except Exception as e:
        print(f'⚠️ 汇率获取失败, 用兜底 {FX_RATE}: {e}')
    return FX_RATE


def fetch(url, out_file):
    subprocess.run(
        ['curl', '-s', '--compressed', '-L', url,
         '-A', UA, '-H', 'Accept-Language: en-US,en;q=0.9',
         '-b', COOKIE, '--max-time', '25', '-o', out_file],
        check=False, capture_output=True)
    return os.path.exists(out_file) and os.path.getsize(out_file) > 20000


def parse_bestsellers(html):
    """从榜单页提取商品列表"""
    items = []
    # 按 data-asin 块切分
    blocks = re.split(r'(?=<div[^>]*data-asin="[A-Z0-9]{10}")', html)
    for blk in blocks:
        m = re.search(r'data-asin="([A-Z0-9]{10})"', blk)
        if not m:
            continue
        asin = m.group(1)
        title_m = re.search(r'alt="([^"]{10,200})"', blk)
        title = title_m.group(1) if title_m else ''
        price_m = re.search(r'class="p13n-sc-price">\$?([\d,]+\.?\d*)', blk)
        price = price_m.group(1).replace(',', '') if price_m else None
        rating_m = re.search(r'"a-icon-alt">([\d.]+) out of 5 stars', blk)
        rating = float(rating_m.group(1)) if rating_m else None
        reviews_m = re.search(r'class="a-size-small">([\d,]+)', blk)
        reviews = int(reviews_m.group(1).replace(',', '')) if reviews_m else 0
        slug_m = re.search(r'href="/[a-z0-9-]+/dp/' + asin, blk)
        slug = slug_m.group(0).split('/')[1] if slug_m else ''
        if title and price:
            items.append({
                'asin': asin, 'title': title, 'price': float(price),
                'rating': rating, 'reviews': reviews, 'slug': slug,
            })
    return items


def get_hires_image(asin):
    """访问商品详情页拿 hiRes 主图"""
    page = f'/tmp/amz_detail_{asin}.html'
    if not fetch(f'https://www.amazon.com/dp/{asin}', page):
        return None
    html = open(page, errors='ignore').read()
    m = re.search(r'"colorImages":(\{.*?\}),(?="[A-Za-z]+"|$)', html)
    if not m:
        m = re.search(r'"colorImages":(\{.*?\}),"', html)
    if m:
        try:
            ci = json.loads(m.group(1))
            for vl in ci.values():
                if isinstance(vl, list):
                    for item in vl:
                        if item.get('variant') == 'MAIN' and item.get('hiRes'):
                            return item['hiRes']
        except Exception:
            pass
    m2 = re.search(r'"hiRes":"(https://m\.media-amazon\.com/images/I/[^"]+)"', html)
    return m2.group(1) if m2 else None


def parse_ebay_deals(html):
    """从 eBay Daily Deals 页解析商品 (CNY价格)"""
    items = []
    blocks = re.split(r'(?=data-listing-id=\d+)', html)
    seen = set()
    for blk in blocks:
        m = re.search(r'data-listing-id=(\d+)', blk)
        if not m:
            continue
        lid = m.group(1)
        if lid in seen:
            continue
        seen.add(lid)
        title_m = re.search(r'itemprop=name class=ebayui-ellipsis-[23]>([^<]{5,160})<', blk)
        title = title_m.group(1).strip() if title_m else ''
        price_m = re.search(r'itemprop=price class=first>([\d.]+)元', blk)
        price = float(price_m.group(1)) if price_m else None
        orig_m = re.search(r'itemtile-price-strikethrough>([\d.]+)元', blk)
        orig = float(orig_m.group(1)) if orig_m else None
        img_m = re.search(r'<img src=(https://i\.ebayimg\.com/images/g/[A-Za-z0-9]+/s-l\d+[^"\s]*)', blk)
        img = img_m.group(1) if img_m else ''
        # 过滤非英文标题(含中文/德文等)和缺少图片/价格的
        if not title or not price or not img:
            continue
        if not re.match(r'^[\x00-\x7F ]+$', title):
            continue
        # 换大图
        img = re.sub(r'/s-l\d+', '/s-l1600', img)
        items.append({
            'id': lid, 'title': title, 'price_cny': price,
            'original_cny': orig, 'image': img,
        })
    return items


def fetch_ebay_deals():
    """抓取 eBay Daily Deals, 返回统一格式商品列表"""
    page = '/tmp/amz_ebay_deals.html'
    if not fetch('https://www.ebay.com/deals?_dmd=1', page):
        print('  ❌ eBay 抓取失败')
        return []
    raw = parse_ebay_deals(open(page, errors='ignore').read())[:PER_CATEGORY]
    fx = get_fx_rate()
    products = []
    for it in raw:
        usd = it['price_cny'] / fx
        orig_usd = (it['original_cny'] / fx) if it['original_cny'] else None
        img_path = download_image(it['image'], it['id'])
        if not img_path:
            print(f'  ⚠️ {it["id"]} 图片下载失败, 跳过')
            continue
        description = (f'{it["title"]} — eBay Daily Deal with discount pricing. '
                       f'Popular item trending on eBay right now.')
        products.append({
            'id': it['id'],
            'title': it['title'],
            'description': description,
            'price': f'${usd:.2f}',
            'originalPrice': f'${orig_usd:.2f}' if orig_usd else '',
            'currency': 'USD',
            'imageUrl': img_path,
            'platform': 'eBay',
            'category': 'Deals',
            'rating': 0,
            'reviewCount': 0,
            'badge': 'hot',
            'affiliateUrl': f'https://www.ebay.com/itm/{it["id"]}',
            'source': f'eBay Daily Deal ({datetime.now(timezone.utc).strftime("%Y-%m-%d")})',
        })
        print(f'  ✅ {it["id"]} ${usd:.2f} {it["title"][:45]}')
        time.sleep(1)
    return products


def download_image(url, asin):
    """下载并缩放图片到本地"""
    dl = f'/tmp/amz_dl_{asin}.jpg'
    subprocess.run(['curl', '-s', '-L', url, '-A', UA, '--max-time', '30', '-o', dl],
                   check=False, capture_output=True)
    if not os.path.exists(dl) or os.path.getsize(dl) < 5000:
        return None
    ftype = subprocess.run(['file', '-b', dl], capture_output=True, text=True).stdout
    if 'JPEG' not in ftype and 'PNG' not in ftype:
        return None
    resized = f'/tmp/amz_resize_{asin}.jpg'
    subprocess.run(['sips', '-Z', '900', '-s', 'format', 'jpeg', dl, '--out', resized],
                   check=False, capture_output=True)
    dest = f'{IMG_DIR}/{asin.lower()}.jpg'
    shutil.copy(resized if os.path.exists(resized) else dl, dest)
    return f'/images/products/{asin.lower()}.jpg'


def load_existing():
    """读取现有 products.ts 的商品"""
    if not os.path.exists(DATA_FILE):
        return []
    ts = open(DATA_FILE).read()
    m = re.search(r'export const featuredProducts: Product\[\] = \[(.*?)\];?\s*$', ts, re.S)
    if not m:
        return []
    arr = m.group(1)
    items = re.findall(
        r"\{\s*id: '([^']+)'.*?title: '([^']*)'.*?description: '([^']*)'.*?"
        r"price: '([^']*)'.*?(?:originalPrice: '([^']*)',)?.*?currency: '([^']*)'.*?"
        r"imageUrl: '([^']*)'.*?platform: '([^']*)'.*?category: '([^']*)'.*?"
        r"rating: ([\d.]+).*?reviewCount: (\d+).*?(?:badge: '(\w+)',)?.*?"
        r"affiliateUrl: '([^']*)'.*?source: '([^']*)'",
        arr, re.S)
    products = []
    for it in items:
        products.append({
            'id': it[0], 'title': it[1], 'description': it[2], 'price': it[3],
            'originalPrice': it[4] or '', 'currency': it[5], 'imageUrl': it[6],
            'platform': it[7], 'category': it[8], 'rating': float(it[9]),
            'reviewCount': int(it[10]), 'badge': it[11] or '', 'affiliateUrl': it[12],
            'source': it[13],
        })
    return products


def ts_literal(s):
    """转义 TS 单引号字符串"""
    return s.replace('\\', '\\\\').replace("'", "\\'")


def serialize(products):
    """把商品列表序列化为 products.ts 数组文本"""
    lines = []
    for p in products:
        lines.append('  {')
        lines.append(f"    id: '{p['id']}',")
        lines.append(f"    title: '{ts_literal(p['title'])}',")
        lines.append(f"    description: '{ts_literal(p['description'])}',")
        lines.append(f"    price: '{p['price']}',")
        if p.get('originalPrice'):
            lines.append(f"    originalPrice: '{p['originalPrice']}',")
        lines.append(f"    currency: '{p['currency']}',")
        lines.append(f"    imageUrl: '{p['imageUrl']}',")
        lines.append(f"    platform: '{p['platform']}',")
        lines.append(f"    category: '{p['category']}',")
        lines.append(f"    rating: {p['rating']},")
        lines.append(f"    reviewCount: {p['reviewCount']},")
        if p.get('badge'):
            lines.append(f"    badge: '{p['badge']}',")
        lines.append(f"    affiliateUrl: '{p['affiliateUrl']}',")
        lines.append(f"    source: '{ts_literal(p['source'])}',")
        lines.append('  },')
    return '\n'.join(lines)


def main():
    os.makedirs(IMG_DIR, exist_ok=True)
    existing = load_existing()
    existing_map = {p['id']: p for p in existing}
    print(f'现有商品: {len(existing)} 个')

    new_products = []
    updates = 0
    today = datetime.now(timezone.utc).strftime('%Y-%m-%d')

    # === eBay Daily Deals (按配置启用) ===
    if 'ebay' in SITE_CFG.get('platforms', ['amazon', 'ebay']):
        print('\n=== eBay Daily Deals ===')
        ebay_items = [p for p in fetch_ebay_deals() if p['id'] not in existing_map]
        if ebay_items:
            print(f'  eBay 新增 {len(ebay_items)} 个')
            new_products += ebay_items
        else:
            print('  eBay 无新增 (已存在或抓取失败)')

    # === Amazon Best Sellers ===
    for cat_key, cat_name in CATEGORIES:
        print(f'\n=== {cat_name} ===')
        safe_key = cat_key.replace('/', '_')  # 子类目含 /, 用于文件名
        page = f'/tmp/amz_bs_{safe_key}.html'
        if not fetch(f'https://www.amazon.com/gp/bestsellers/{cat_key}', page):
            print(f'  ❌ 抓取失败，跳过')
            continue
        items = parse_bestsellers(open(page, errors='ignore').read())[:PER_CATEGORY]
        print(f'  榜单解析到 {len(items)} 个商品')
        for it in items:
            asin = it['asin']
            if asin in existing_map:
                # 刷新已有商品的价格/评分（不重下图片，保留其他字段）
                old = existing_map[asin]
                new_price = f'${it["price"]:.2f}'
                new_rating = it['rating'] or 4.0
                if old['price'] != new_price or abs(old['rating'] - new_rating) > 0.01:
                    old['price'] = new_price
                    old['rating'] = new_rating
                    updates += 1
                    print(f'  🔄 {asin} 价格/评分已刷新: {new_price} ★{new_rating}')
                else:
                    print(f'  ⏭ {asin} 已存在且价格未变，跳过')
                continue
            print(f'  🔍 {asin} {it["title"][:45]}... ${it["price"]:.2f}')
            hires = get_hires_image(asin)
            if not hires:
                print(f'    ⚠️ 无主图，跳过')
                time.sleep(1)
                continue
            img_path = download_image(hires, asin)
            if not img_path:
                print(f'    ⚠️ 图片下载失败，跳过')
                time.sleep(1)
                continue
            description = (f'{it["title"]} — Amazon Best Seller in {cat_name}. '
                           f'Rated {it["rating"] or "N/A"} stars from {it["reviews"]:,} reviews. '
                           f'Hot product trending on Amazon right now.')
            new_products.append({
                'id': asin,
                'title': it['title'],
                'description': description,
                'price': f'${it["price"]:.2f}',
                'originalPrice': '',
                'currency': 'USD',
                'imageUrl': img_path,
                'platform': 'Amazon',
                'category': cat_name,
                'rating': it['rating'] or 4.0,
                'reviewCount': it['reviews'],
                'badge': 'trending',
                'affiliateUrl': f'https://amazon.com/dp/{asin}?tag={TAG}',
                'source': f'Amazon Best Seller — {cat_name} ({today})',
            })
            print(f'    ✅ 已收录')
            time.sleep(1.5)  # 限速防封

    if not new_products and updates == 0:
        print('\n无新增/无变化商品')
        return 0

    if new_products:
        print(f'\n📊 新增 {len(new_products)} 个商品; 刷新 {updates} 个; 总计 {len(existing) + len(new_products)} 个')
    else:
        print(f'\n📊 无新增; 刷新 {updates} 个商品')

    # 合并: 现有(WHOOP等固定商品) + 新增，上限 MAX_PRODUCTS
    merged = existing + new_products
    # 固定商品(有丰富详情的)优先保留; 超出上限时优先保留已有, 丢弃新增尾部
    fixed_ids = set(SITE_CFG.get('fixedProductIds', []))  # 主站: ['B0DY2VVZWZ']
    fixed = [p for p in merged if p['id'] in fixed_ids]
    rest = [p for p in merged if p['id'] not in fixed_ids]
    if len(rest) > MAX_PRODUCTS - len(fixed):
        rest = rest[:MAX_PRODUCTS - len(fixed)]
    final = fixed + rest

    # 更新 products.ts: 只替换 featuredProducts 数组, 保留 platforms/categories 等其他导出
    ts = open(DATA_FILE).read()
    # 用贪婪匹配到下一个 export const 或文件末尾 (数组内部不会出现 \nexport const)
    m = re.search(
        r'(export const featuredProducts: Product\[\] = \[).*(\])(?=\n\s*export const|\s*\Z)',
        ts, flags=re.S)
    if not m:
        print('⚠️ 未找到 featuredProducts 数组，中止写入')
        return 1
    new_ts = ts[:m.start()] + m.group(1) + '\n' + serialize(final) + '\n' + m.group(2) + ts[m.end():]
    if not DRY:
        open(DATA_FILE, 'w').write(new_ts)
    print(f'\n📊 本次新增 {len(new_products)} 个商品, 总计 {len(final)} 个')

    # git 提交 (配置 gitPush=true 时; 用 Vercel CLI 部署的站点跳过)
    if not DRY and SITE_CFG.get('gitPush', True):
        subprocess.run(['git', '-C', ROOT, 'add', '-A'], check=False)
        subprocess.run(['git', '-C', ROOT, 'commit', '-m',
                        f'每日热卖更新: +{len(new_products)} 商品 ({today})'],
                       check=False, capture_output=True)
        push = subprocess.run(['git', '-C', ROOT, 'push', 'origin', 'main'],
                              check=False, capture_output=True, text=True)
        if push.returncode == 0:
            print('🚀 已推送 GitHub, Vercel 自动部署中')
        else:
            print('⚠️ push 失败, 稍后重试:', push.stderr[-200:])
    return 0


if __name__ == '__main__':
    sys.exit(main())
