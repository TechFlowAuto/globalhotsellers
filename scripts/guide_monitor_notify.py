#!/usr/bin/env python3
"""Run the guide monitor and emit a message only on meaningful change.

Exit 0 with empty stdout when nothing actionable changed, so the scheduled
command stays quiet during normal weeks.
"""
from __future__ import annotations

import datetime as dt
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MONITOR = ROOT / 'scripts' / 'guide_monitor.py'
REPORT = ROOT / 'data' / '.guide-monitor.json'
STATE = ROOT / 'data' / '.guide-monitor-notified.json'


def load(path: Path, default):
    try:
        return json.loads(path.read_text())
    except Exception:
        return default


def index_coverage(report):
    return {
        page['path']: page.get('index_status', {}).get('coverage_state', 'Unknown')
        for page in report.get('pages', [])
    }


def totals(report):
    return {
        'impressions': sum(int(p.get('indexed_or_impressions', 0)) for p in report.get('pages', [])),
        'google_clicks': sum(int(p.get('google_clicks', 0)) for p in report.get('pages', [])),
        'amazon_clicks': int(report.get('guide_click_events', {}).get('total', 0)),
    }


def main():
    result = subprocess.run(
        [sys.executable, str(MONITOR)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        timeout=240,
    )
    if result.returncode != 0:
        print('【GHS 指南监测异常】\n\n' + (result.stderr or result.stdout)[-2500:])
        return 0

    start = result.stdout.find('{')
    report = json.loads(result.stdout[start:]) if start >= 0 else {}
    current = totals(report)
    coverage = index_coverage(report)
    previous = load(STATE, {})
    prev_totals = previous.get('totals', {})
    prev_coverage = previous.get('coverage', {})
    first_seen = previous.get('first_seen', report.get('generated_at', dt.datetime.now().astimezone().isoformat()))

    alerts = []
    if current['impressions'] > 0 and prev_totals.get('impressions', 0) == 0:
        alerts.append(f"Google 首次产生搜索展示：{current['impressions']} 次")
    if current['google_clicks'] > 0 and prev_totals.get('google_clicks', 0) == 0:
        alerts.append(f"Google 首次产生自然搜索点击：{current['google_clicks']} 次")
    if current['amazon_clicks'] > 0 and prev_totals.get('amazon_clicks', 0) == 0:
        alerts.append(f"指南首次产生 Amazon 出站点击：{current['amazon_clicks']} 次")

    changed_index = [
        (path, prev_coverage.get(path, 'Unknown'), state)
        for path, state in coverage.items()
        if prev_coverage.get(path, 'Unknown') != state
    ]
    for path, old, new in changed_index:
        alerts.append(f"{path} 收录状态：{old} → {new}")

    try:
        first_dt = dt.datetime.fromisoformat(first_seen)
        elapsed_days = (dt.datetime.now().astimezone() - first_dt).days
    except Exception:
        elapsed_days = 0
    no_progress = not any(current.values())
    if no_progress and elapsed_days >= 28 and not previous.get('four_week_alerted'):
        alerts.append('指南已观察满 4 周，仍无搜索展示、自然点击或 Amazon 出站点击。')
        previous['four_week_alerted'] = True

    state = {
        'first_seen': first_seen,
        'last_run': report.get('generated_at'),
        'totals': current,
        'coverage': coverage,
        'four_week_alerted': previous.get('four_week_alerted', False),
    }
    STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2) + '\n')

    if not alerts:
        return 0

    lines = ['【GHS 指南增长监测】', '']
    lines.extend(f'• {item}' for item in alerts)
    lines.append('')
    click_by_path = report.get('guide_click_events', {}).get('by_path', {})
    for page in report.get('pages', []):
        lines.append(
            f"{page['path']}：展示 {page['indexed_or_impressions']}｜自然点击 {page['google_clicks']}｜Amazon 出站点击 {click_by_path.get(page['path'], 0)}"
        )
    lines += ['', '完整快照：data/.guide-monitor.json']
    print('\n'.join(lines))
    return 0


if __name__ == '__main__':
    sys.exit(main())
