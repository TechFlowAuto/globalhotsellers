#!/usr/bin/env python3
"""Weekly monitoring for the GHS editorial guide launch.

Reads Google Search Console and Vercel Web Analytics. Sends a concise report to
stdout; callers decide whether to announce it. No external writes.
"""
from __future__ import annotations

import datetime as dt
import json
import os
import subprocess
import sys
from collections import Counter
from pathlib import Path

import requests
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
STATE_PATH = ROOT / 'data' / '.guide-monitor.json'
GSC_SCRIPT = ROOT / 'scripts' / 'gsc_report.py'
SITE = 'sc-domain:globalhotsellers.net'
GUIDES = [
    '/guides',
    '/guides/best-wireless-earbuds-for-iphone',
    '/guides/robot-vacuum-for-pet-hair-small-apartment',
    '/guides/small-home-office-power-strip-setup',
]


def load_gsc_helpers():
    # Import the existing zero-dependency GSC helper without duplicating auth.
    sys.path.insert(0, str(ROOT / 'scripts'))
    import gsc_report  # type: ignore
    return gsc_report


def gsc_rows(days: int = 28):
    g = load_gsc_helpers()
    token = g.get_token(g.CRED)
    encoded_site = quote(SITE, safe='')
    end = dt.date.today()
    start = end - dt.timedelta(days=days)
    url = (
        'https://searchconsole.googleapis.com/webmasters/v3/sites/'
        f'{encoded_site}/searchAnalytics/query'
    )
    response = requests.post(
        url,
        json={
            'startDate': start.isoformat(),
            'endDate': end.isoformat(),
            'dimensions': ['page'],
            'rowLimit': 500,
        },
        headers={'Authorization': f'Bearer {token}'},
        timeout=60,
    )
    response.raise_for_status()
    rows = response.json().get('rows', [])
    return rows, start.isoformat(), end.isoformat()


def vercel_rows(days: int = 28):
    cmd = [
        'vercel', 'metrics', 'vercel.analytics_pageview.count',
        '--prod', '--since', f'{days}d', '--group-by', 'request_path',
        '--limit', '100', '-F', 'json',
    ]
    result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    # CLI may print a progress line before the JSON document.
    text = result.stdout
    start = text.find('{')
    if start < 0:
        raise RuntimeError('Vercel analytics returned no JSON')
    data = json.loads(text[start:])
    return data.get('summary', [])


def click_summary():
    token = os.environ.get('ANALYTICS_TOKEN', '')
    if not token:
        return {'configured': False, 'total': 0, 'by_path': {}, 'by_product': {}}
    try:
        response = requests.get(
            'https://globalhotsellers.net/api/guide-click',
            params={'token': token},
            timeout=60,
        )
        response.raise_for_status()
        events = response.json().get('events', [])
        return {
            'configured': True,
            'total': len(events),
            'by_path': dict(Counter(event.get('path', '') for event in events)),
            'by_product': dict(Counter(event.get('productId', '') for event in events)),
        }
    except Exception as exc:
        return {'configured': True, 'error': str(exc), 'total': 0, 'by_path': {}, 'by_product': {}}


def main():
    errors = []
    try:
        gsc, start, end = gsc_rows()
    except Exception as exc:
        gsc, start, end = [], '', ''
        errors.append(f'GSC: {exc}')
    try:
        analytics = vercel_rows()
    except Exception as exc:
        analytics = []
        errors.append(f'Vercel Analytics: {exc}')

    gsc_by_page = {r.get('keys', [''])[0]: r for r in gsc}
    pages = []
    for path in GUIDES:
        url = 'https://globalhotsellers.net' + path
        row = gsc_by_page.get(url, {})
        pageviews = next((x for x in analytics if x.get('request_path') == path), {})
        pages.append({
            'path': path,
            'indexed_or_impressions': int(row.get('impressions', 0)),
            'google_clicks': int(row.get('clicks', 0)),
            'google_position': round(float(row.get('position', 0)), 1),
            'pageviews': int(pageviews.get('vercel_analytics_pageview_count_sum', 0)),
        })

    clicks = click_summary()
    if clicks.get('error'):
        errors.append(f"Guide clicks: {clicks['error']}")
    report = {
        'generated_at': dt.datetime.now().astimezone().isoformat(timespec='seconds'),
        'gsc_window': {'start': start, 'end': end},
        'guide_click_events': clicks,
        'pages': pages,
        'errors': errors,
    }
    STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
