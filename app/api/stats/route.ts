import { kv } from '@vercel/kv';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (token !== 'globalhotsellers2024') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subscribers = await kv.get<any[]>('subscribers') || [];
  const today = new Date().toISOString().split('T')[0];
  const todaySubs = subscribers.filter(
    (s: any) => s.subscribedAt?.startsWith(today)
  );

  return Response.json({
    total: subscribers.length,
    today: todaySubs.length,
    lastSubscriber:
      subscribers.length > 0
        ? subscribers[subscribers.length - 1]
        : null,
  });
}
