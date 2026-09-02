#!/usr/bin/env python3
"""恢复 5 个被爬虫转义 bug 损坏的商品字段（v2: 按行安全替换，不跨行）。"""
import re

CLEAN = {
    'B0DY2VVZWZ': {
        'description': "24/7 fitness & health wearable with sleep, strain & recovery tracking. Includes certified pre-owned WHOOP 5.0 device, 14+ day battery, personalized coaching, VO2 Max, heart rate zones, and women's hormonal insights. HSA/FSA eligible.",
        'source': 'Amazon — WHOOP + 12-Month Membership Bundle',
    },
    'B0GH3474YH': {
        'source': "Amazon's Choice — Galaxy S26 512GB",
    },
    'B071JYV6LN': {
        'source': "Amazon Best Sellers #1 in Men's Sweatshirts",
    },
    'B0B3HTQ4YT': {
        'source': "Amazon Best Sellers in Women's Leggings",
    },
    'B0922GS6FD': {
        'description': "Non-slip open-toe grip socks for yoga, barre, dance & reformer pilates. Silicone grips on sole, moisture-wicking fabric. Women's sizes.",
    },
}

def ts_literal(s):
    return s.replace('\\', '\\\\').replace("'", "\\'")

lines = open('data/products.ts').readlines()
changed = 0
for asin, fields in CLEAN.items():
    # 找商品 id 行号
    id_ln = None
    for i, line in enumerate(lines):
        if f"id: '{asin}'" in line:
            id_ln = i
            break
    if id_ln is None:
        print(f"⚠️ {asin}: 未找到"); continue
    # 找对象结束（下一个 '  },' 行）
    end_ln = None
    for i in range(id_ln, min(id_ln + 30, len(lines))):
        if lines[i].strip() == '},':
            end_ln = i
            break
    if end_ln is None:
        print(f"⚠️ {asin}: 对象边界异常"); continue
    # 在对象区间内按字段行替换
    for field, val in fields.items():
        for i in range(id_ln, end_ln):
            line = lines[i]
            m = re.match(rf"^(\s*{field}:\s*')((?:[^'\\]|\\.)*)(',\s*)$", line)
            if m:
                lines[i] = m.group(1) + ts_literal(val) + m.group(3) + '\n'
                print(f"✅ {asin} {field} 已恢复 ({len(val)} 字符)")
                changed += 1
                break
        else:
            print(f"⚠️ {asin} {field}: 行未找到")

open('data/products.ts', 'w').writelines(lines)
print(f"完成: {changed} 个字段已恢复")
