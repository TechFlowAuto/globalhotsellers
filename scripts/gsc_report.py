#!/usr/bin/env python3
"""GSC 效果数据拉取脚本（零依赖：openssl 签名 JWT + requests）
用法: python3 gsc_report.py [--site pethotsellers|globalhotsellers] [--days 28]
"""
import json, time, base64, subprocess, sys, os, argparse
import requests

CRED = os.environ.get("GSC_CRED_PATH") or os.path.expanduser("~/.openclaw/workspace/credentials/gsc-service-account.json")
SITES = {
    "pethotsellers": "sc-domain:pethotsellers.com",
    "globalhotsellers": "sc-domain:globalhotsellers.net",
}

def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()

def get_token(cred_path: str) -> str:
    with open(cred_path) as f:
        cred = json.load(f)
    pem_path = "/tmp/gsc_key.pem"
    with open(pem_path, "w") as f:
        f.write(cred["private_key"])
    os.chmod(pem_path, 0o600)

    header = b64url(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    now = int(time.time())
    claims = {
        "iss": cred["client_email"],
        "scope": "https://www.googleapis.com/auth/webmasters.readonly",
        "aud": "https://oauth2.googleapis.com/token",
        "iat": now,
        "exp": now + 3600,
    }
    payload = b64url(json.dumps(claims).encode())
    signing_input = f"{header}.{payload}".encode()
    sig = subprocess.run(
        ["openssl", "dgst", "-sha256", "-sign", pem_path],
        input=signing_input, capture_output=True, check=True,
    ).stdout
    jwt = f"{header}.{payload}.{b64url(sig)}"
    resp = requests.post("https://oauth2.googleapis.com/token", data={
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": jwt,
    }, timeout=60)
    resp.raise_for_status()
    return resp.json()["access_token"]

def query_gsc(token: str, site: str, start: str, end: str, dimensions, row_limit):
    url = f"https://searchconsole.googleapis.com/webmasters/v3/sites/{site}/searchAnalytics/query"
    body = {"startDate": start, "endDate": end, "dimensions": dimensions, "rowLimit": row_limit}
    r = requests.post(url, json=body, headers={"Authorization": f"Bearer {token}"}, timeout=60)
    if r.status_code == 403:
        sys.exit(f"❌ 403 未授权: 服务账号未被添加为 {site} 的 GSC 用户（需老板在 GSC 设置→用户和权限→添加用户）")
    r.raise_for_status()
    return r.json().get("rows", [])

def fmt_row(r):
    keys = r.get("keys", [])
    return f"  {keys[0] if keys else '(总计)':<55} 展示 {r.get('impressions',0):>6}  点击 {r.get('clicks',0):>4}  点击率 {r.get('ctr',0)*100:>5.1f}%  排名 {r.get('position',0):>5.1f}"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--site", default="all", choices=["pethotsellers", "globalhotsellers", "all"])
    ap.add_argument("--days", type=int, default=28)
    args = ap.parse_args()

    end = time.strftime("%Y-%m-%d")
    start = time.strftime("%Y-%m-%d", time.localtime(time.time() - args.days * 86400))
    token = get_token(CRED)

    sites = list(SITES.items()) if args.site == "all" else [(args.site, SITES[args.site])]
    for name, site in sites:
        print(f"\n{'='*70}\n📊 {name} ({site})  范围 {start} ~ {end}\n{'='*70}")
        try:
            total = query_gsc(token, site, start, end, [], 1)
            if total:
                t = total[0]
                print(f"📈 总计: 展示 {t['impressions']} | 点击 {t['clicks']} | 点击率 {t['ctr']*100:.1f}% | 平均排名 {t['position']:.1f}")
            else:
                print("📈 总计: 无数据")
            print("\n🔍 热门查询:")
            for r in query_gsc(token, site, start, end, ["query"], 12):
                print(fmt_row(r))
            print("\n📄 热门网页:")
            for r in query_gsc(token, site, start, end, ["page"], 10):
                print(fmt_row(r))
        except SystemExit as e:
            print(e)
        except Exception as e:
            print(f"❌ 错误: {e}")

if __name__ == "__main__":
    main()
