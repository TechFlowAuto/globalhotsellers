#!/usr/bin/env python3
"""
pinterest_post.py — 从 pins/queue.json 自动发布 Pin 到 Pinterest

前置条件（老板操作一次，~15 分钟）:
  1. 注册 Pinterest 业务账号: https://www.pinterest.com/business/
  2. 创建开发者应用: https://developers.pinterest.com/ → My apps → Create app
  3. 获取 Access Token: OAuth 流程后得到 "pina_..." 格式 token
  4. 创建 Board（如 "Best Dog Products"），用 --boards 列出 board ID
  5. 配置 token: 写入环境变量 PINTEREST_TOKEN 或本目录 config/pinterest.json

用法:
  python3 scripts/pinterest_post.py . --boards        # 列出 boards
  python3 scripts/pinterest_post.py . --board <ID>    # 发布 1 个
  python3 scripts/pinterest_post.py . --board <ID> --count 3
  python3 scripts/pinterest_post.py . --board <ID> --dry-run  # 只读队列
"""
import argparse
import base64
import json
import os
import sys
import time
import urllib.request

API = "https://api.pinterest.com/v5"


def read_file(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def get_token(site_dir):
    token = os.environ.get("PINTEREST_TOKEN")
    if token:
        return token
    cfg_path = os.path.join(site_dir, "config", "pinterest.json")
    if os.path.exists(cfg_path):
        cfg = json.loads(read_file(cfg_path))
        return cfg.get("access_token")
    return None


def api_request(method, path, token, data=None, binary=None):
    url = API + path
    headers = {"Authorization": f"Bearer {token}"}
    body = None
    if binary is not None:
        headers["Content-Type"] = "application/octet-stream"
        body = binary
    elif data is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        err = e.read().decode("utf-8", errors="replace")[:500]
        print(f"  [API 错误 {e.code}] {err}")
        if e.code == 429:
            print("  ⏳ 限流，建议降低发布频率")
        return None


def list_boards(token):
    """列出 board ID 供选择"""
    resp = api_request("GET", "/boards?page_size=25", token)
    if not resp:
        return []
    boards = []
    for b in resp.get("items", []):
        boards.append({"id": b["id"], "name": b["name"]})
    return boards


def post_pin(token, board_id, pin):
    """发布单个 Pin (image_base64 方式)"""
    with open(pin["image"], "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    data = {
        "board_id": board_id,
        "media_source": {
            "source_type": "image_base64",
            "content_type": "image/jpeg",
            "data": b64,
        },
        "title": pin["title"][:100],
        "description": pin["description"][:490],
        "link": pin["link"],
    }
    resp = api_request("POST", "/pins", token, data=data)
    return resp


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("site", nargs="?", default=".")
    ap.add_argument("--board", default=None)
    ap.add_argument("--boards", action="store_true")
    ap.add_argument("--count", type=int, default=1)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    site_dir = os.path.abspath(args.site)
    q_path = os.path.join(site_dir, "pins", "queue.json")

    token = get_token(site_dir)
    if not token:
        print("❌ 未配置 PINTEREST_TOKEN")
        print("   请先完成前置条件: 注册 Pinterest 开发者应用 → 获取 token")
        print("   写入: export PINTEREST_TOKEN=pina_xxx  或  config/pinterest.json")
        sys.exit(1)

    if args.boards:
        boards = list_boards(token)
        if not boards:
            print("⚠️ 无法获取 boards（检查 token 权限 / 先在 Pinterest 创建 board）")
        for b in boards:
            print(f"  {b['id']}  {b['name']}")
        return

    if not args.board:
        print("❌ 需要 --board <ID>（用 --boards 查看）")
        sys.exit(1)

    if not os.path.exists(q_path):
        print("❌ 队列为空，先运行 generate_pins.py")
        sys.exit(1)

    queue = json.loads(read_file(q_path))
    if not queue:
        print("📋 队列已空")
        return

    todo = queue[:args.count]
    print(f"📤 准备发布 {len(todo)} 个 Pin → board {args.board}")

    posted = []
    for pin in todo:
        if args.dry_run:
            print(f"  [dry-run] {pin['title'][:60]} → {pin['link']}")
            posted.append(pin)
            continue
        resp = post_pin(token, args.board, pin)
        if resp and resp.get("id"):
            print(f"  ✅ 已发布: {pin['title'][:60]} (pin id: {resp['id']})")
            posted.append(pin)
        else:
            print(f"  ❌ 发布失败: {pin['title'][:60]}（保留在队列）")
            break
        time.sleep(3)  # 防限流

    if posted and not args.dry_run:
        queue = queue[len(posted):]
        with open(q_path, "w", encoding="utf-8") as f:
            json.dump(queue, f, ensure_ascii=False, indent=2)
        print(f"📋 队列剩余 {len(queue)} 个")


if __name__ == "__main__":
    main()
