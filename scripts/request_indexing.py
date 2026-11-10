#!/usr/bin/env python3
"""Submit URL_UPDATED notifications to Google's Indexing API (zero dependencies).

This is a freshness signal, not proof of indexing. Ordinary editorial pages are
primarily discovered through the sitemap and internal links.
"""
from __future__ import annotations

import json
import sys

import requests

sys.path.insert(0, str(__import__('pathlib').Path(__file__).resolve().parent))
import gsc_report as g  # type: ignore

URLS = [
    'https://globalhotsellers.net/guides',
    'https://globalhotsellers.net/guides/best-wireless-earbuds-for-iphone',
    'https://globalhotsellers.net/guides/robot-vacuum-for-pet-hair-small-apartment',
    'https://globalhotsellers.net/guides/small-home-office-power-strip-setup',
]


def get_indexing_token() -> str:
    # Reuse the existing signed-JWT helper with the Indexing API scope.
    cred_path = g.CRED
    import base64, json as js, os, subprocess, time
    with open(cred_path) as handle:
        cred = js.load(handle)
    pem_path = '/tmp/gsc_indexing_key.pem'
    with open(pem_path, 'w') as handle:
        handle.write(cred['private_key'])
    os.chmod(pem_path, 0o600)

    def b64url(data: bytes) -> str:
        return base64.urlsafe_b64encode(data).rstrip(b'=').decode()

    now = int(time.time())
    header = b64url(js.dumps({'alg': 'RS256', 'typ': 'JWT'}).encode())
    payload = b64url(js.dumps({
        'iss': cred['client_email'],
        'scope': 'https://www.googleapis.com/auth/indexing',
        'aud': 'https://oauth2.googleapis.com/token',
        'iat': now,
        'exp': now + 3600,
    }).encode())
    signature = subprocess.run(
        ['openssl', 'dgst', '-sha256', '-sign', pem_path],
        input=f'{header}.{payload}'.encode(),
        capture_output=True,
        check=True,
    ).stdout
    jwt = f'{header}.{payload}.{b64url(signature)}'
    response = requests.post(
        'https://oauth2.googleapis.com/token',
        data={
            'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion': jwt,
        },
        timeout=60,
    )
    response.raise_for_status()
    return response.json()['access_token']


def main():
    token = get_indexing_token()
    results = []
    for url in URLS:
        response = requests.post(
            'https://indexing.googleapis.com/v3/urlNotifications:publish',
            json={'url': url, 'type': 'URL_UPDATED'},
            headers={'Authorization': f'Bearer {token}'},
            timeout=60,
        )
        results.append({
            'url': url,
            'status': response.status_code,
            'ok': response.ok,
            'response': response.json() if response.content else {},
        })
    print(json.dumps(results, ensure_ascii=False, indent=2))
    return 0 if all(item['ok'] for item in results) else 1


if __name__ == '__main__':
    sys.exit(main())
