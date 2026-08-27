#!/usr/bin/env python3
"""
generate_pins.py — 从最新文章生成 Pinterest Pin 图 (1000x1500, 2:3)

用法:
  python3 scripts/generate_pins.py .            # 生成最新 1 篇的 Pin 图
  python3 scripts/generate_pins.py . --count 3  # 生成最新 3 篇
  python3 scripts/generate_pins.py . --slug XXX # 指定 slug

输出: pins/<slug>-<date>.jpg + pins/queue.json (待发布队列)
"""
import argparse
import json
import os
import re
import sys
import textwrap

from PIL import Image, ImageDraw, ImageFont

SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 1000, 1500

FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"
FONT_BOLD_PATH = "/System/Library/Fonts/ArialHB.ttc"

# 品牌色 (top, bottom)
BRAND_COLORS = {
    "pethotsellers": ((45, 106, 79), (6, 35, 24)),   # 深绿
    "globalhotsellers": ((29, 78, 216), (15, 23, 42)),  # 深蓝
}


def read_file(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def load_config():
    try:
        cfg = json.loads(read_file(os.path.join(SITE_DIR, "site.config.json")))
    except Exception:
        cfg = {"siteId": "pethotsellers", "name": "PetHotSellers", "domain": "https://pethotsellers.com"}
    return cfg


def parse_articles():
    """解析 data/articles.ts → 文章列表"""
    s = read_file(os.path.join(SITE_DIR, "data/articles.ts"))
    blocks = re.split(r"\n\s*slug:\s*", s)[1:]
    articles = []
    for b in blocks:
        slug = b.split(",")[0].strip().strip("'\"")
        title = re.search(r"title:\s*['\"]([^'\"]+)['\"]", b)
        desc = re.search(r"description:\s*['\"]([^'\"]+)['\"]", b)
        date = re.search(r"date:\s*['\"]([^'\"]+)['\"]", b)
        pids = re.findall(r"productIds:\s*\[([^\]]*)\]", b)
        ids = []
        for p in pids:
            ids += re.findall(r"['\"]([A-Z0-9]{5,})['\"]", p)
        articles.append({
            "slug": slug,
            "title": title.group(1) if title else slug,
            "description": desc.group(1) if desc else "",
            "date": date.group(1) if date else "",
            "productIds": ids,
        })
    return articles


def parse_products():
    """解析 data/products.ts → {id: {title, image, price, rating}}"""
    s = read_file(os.path.join(SITE_DIR, "data/products.ts"))
    products = {}
    for m in re.finditer(r"\{\s*id:\s*['\"]([A-Z0-9]{5,})['\"]", s):
        pid = m.group(1)
        block = s[m.start():m.start() + 1200]
        title = re.search(r"title:\s*['\"]([^'\"]+)['\"]", block)
        price = re.search(r"price:\s*([\d.]+)", block)
        rating = re.search(r"rating:\s*([\d.]+)", block)
        img_path = os.path.join(SITE_DIR, "public/images/products", pid.lower() + ".jpg")
        products[pid] = {
            "id": pid,
            "title": title.group(1) if title else pid,
            "price": float(price.group(1)) if price else None,
            "rating": float(rating.group(1)) if rating else None,
            "image": img_path if os.path.exists(img_path) else None,
        }
    return products


def gradient_bg(color_top, color_bottom):
    """垂直渐变背景"""
    base = Image.new("RGB", (W, H))
    top = Image.new("RGB", (1, H))
    for y in range(H):
        t = y / (H - 1)
        r = int(color_top[0] + (color_bottom[0] - color_top[0]) * t)
        g = int(color_top[1] + (color_bottom[1] - color_top[1]) * t)
        b = int(color_top[2] + (color_bottom[2] - color_top[2]) * t)
        top.putpixel((0, y), (r, g, b))
    base.paste(top.resize((W, H)))
    return base


def load_font(size, bold=False):
    path = FONT_BOLD_PATH if bold and os.path.exists(FONT_BOLD_PATH) else FONT_PATH
    return ImageFont.truetype(path, size)


def wrap_text(draw, text, font, max_width):
    """按像素宽度自动换行"""
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def rounded_card(img, radius=36):
    """圆角遮罩"""
    mask = Image.new("L", img.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, img.size[0] - 1, img.size[1] - 1], radius=radius, fill=255)
    out = Image.new("RGBA", img.size, (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


def make_pin(article, product, cfg):
    """生成单张 Pin 图 → PIL Image"""
    colors = BRAND_COLORS.get(cfg.get("siteId"), BRAND_COLORS["pethotsellers"])
    img = gradient_bg(*colors).convert("RGBA")
    draw = ImageDraw.Draw(img)

    # 顶部站点名
    f_site = load_font(44, bold=True)
    site_label = f"{cfg.get('logoEmoji', '')} {cfg['name']}".strip()
    draw.text((W // 2, 90), site_label, font=f_site, fill=(255, 255, 255, 235), anchor="ma")

    # 标题
    f_title = load_font(62, bold=True)
    max_w = W - 160
    lines = wrap_text(draw, article["title"], f_title, max_w)
    lines = lines[:5]
    title_h = 92 * len(lines)
    y_title = 260
    for i, line in enumerate(lines):
        draw.text((W // 2, y_title + i * 92), line, font=f_title, fill=(255, 255, 255, 255), anchor="ma")

    # 商品图卡片
    if product and product.get("image"):
        try:
            ph = Image.open(product["image"]).convert("RGB")
            ph = ph.resize((720, 720), Image.LANCZOS)
            ph = rounded_card(ph, 44)
            y_img = 260 + title_h + 70
            img.paste(ph, ((W - 720) // 2, y_img), ph)
            # 商品名 + 价格条
            y_bottom = y_img + 720 + 30
            f_prod = load_font(40)
            prod_title = product["title"]
            if len(prod_title) > 60:
                prod_title = prod_title[:57] + "..."
            draw.text((W // 2, y_bottom), prod_title, font=f_prod, fill=(255, 255, 255, 210), anchor="ma")
            if product.get("price"):
                f_price = load_font(48, bold=True)
                price_label = f"${product['price']:.2f}"
                if product.get("rating"):
                    price_label += f"  ★ {product['rating']:.1f}"
                draw.text((W // 2, y_bottom + 60), price_label, font=f_price, fill=(255, 215, 100, 255), anchor="ma")
        except Exception as e:
            print(f"  [warn] 商品图处理失败: {e}")

    # 底部域名
    f_domain = load_font(40)
    draw.text((W // 2, H - 80), cfg["domain"].replace("https://", ""), font=f_domain, fill=(255, 255, 255, 170), anchor="ma")

    return img.convert("RGB")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("site", nargs="?", default=".")
    ap.add_argument("--count", type=int, default=1)
    ap.add_argument("--slug", default=None)
    args = ap.parse_args()

    os.chdir(SITE_DIR)
    cfg = load_config()
    articles = parse_articles()
    products = parse_products()

    if args.slug:
        articles = [a for a in articles if a["slug"] == args.slug]
    else:
        articles = articles[-args.count:]

    if not articles:
        print("没有可用的文章")
        sys.exit(1)

    os.makedirs(os.path.join(SITE_DIR, "pins"), exist_ok=True)
    queue = []
    for a in articles:
        # 优先取有本地图的商品
        prod = None
        for pid in a["productIds"]:
            if pid in products and products[pid].get("image"):
                prod = products[pid]
                break
        if not prod and products:
            prod = next((p for p in products.values() if p.get("image")), None)

        out_name = f"{a['slug']}-{a['date']}.jpg"
        out_path = os.path.join(SITE_DIR, "pins", out_name)
        pin_img = make_pin(a, prod, cfg)
        pin_img.save(out_path, quality=90)
        print(f"✅ Pin 图生成: {out_name}")

        queue.append({
            "image": out_path,
            "title": a["title"][:100],
            "description": (a["description"] or a["title"])[:250],
            "link": f"{cfg['domain']}/blog/{a['slug']}",
            "slug": a["slug"],
            "date": a["date"],
        })

    # 合并入待发布队列
    q_path = os.path.join(SITE_DIR, "pins", "queue.json")
    q = []
    if os.path.exists(q_path):
        try:
            q = json.loads(read_file(q_path))
        except Exception:
            q = []
    q.extend(queue)
    with open(q_path, "w", encoding="utf-8") as f:
        json.dump(q, f, ensure_ascii=False, indent=2)
    print(f"📋 队列现有 {len(q)} 个 Pin 待发布")


if __name__ == "__main__":
    main()
