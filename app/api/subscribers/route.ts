import { kv } from '@vercel/kv';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (token !== 'globalhotsellers2024') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subscribers = await kv.get<any[]>('subscribers') || [];

  return Response.json({
    total: subscribers.length,
    subscribers: subscribers.map((s: any) => ({
      email: s.email,
      name: s.name,
      subscribedAt: s.subscribedAt,
      source: s.source,
    })),
  });
}
