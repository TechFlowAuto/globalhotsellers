#!/usr/bin/env python3
"""v2: 通用修复 products.ts 异常膨胀行（字段值后跟海量反斜杠，爬虫转义 bug）。
规则: 取首个反斜杠之前的内容（正常值）；超长再截断 + 标记。"""
import sys, os, re

path = sys.argv[1] if len(sys.argv) > 1 else 'data/products.ts'
LIMIT = 50000
KEEP = 5000
MARK = ' ... [truncated: crawler duplication fix]'

with open(path) as f:
    lines = f.readlines()

changed = 0
for i, line in enumerate(lines):
    if len(line) <= LIMIT:
        continue
    body = line.rstrip('\n')
    m = re.match(r"^(\s+[a-zA-Z]+:\s*')(.*)(',\s*)$", body, re.S)
    if not m:
        print(f"  ⚠️ 行 {i+1}: 无法解析，跳过（{len(line)} 字符）")
        continue
    prefix, content, suffix = m.group(1), m.group(2), m.group(3)
    # bug 特征: 内容 = 正常值 + 海量反斜杠 → 取首个反斜杠前文本
    bs = content.find('\\')
    if bs != -1:
        clean = content[:bs].rstrip()
    else:
        clean = content
    # 若清理后为空则保留原前段截断
    if not clean:
        clean = content[:KEEP]
    if len(clean) > KEEP:
        clean = clean[:KEEP] + MARK
    lines[i] = prefix + clean + suffix + '\n'
    changed += 1
    print(f"  ✅ 行 {i+1} ({m.group(1).strip()}): {len(line)/1024/1024:.1f}MB → {len(lines[i])} 字符")

with open(path, 'w') as f:
    f.writelines(lines)

print(f"完成: {changed} 行已修复")
print(f"新文件大小: {os.path.getsize(path)/1024:.1f} KB")
