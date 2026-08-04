import { get } from '@vercel/blob';

const BLOB_URL =
  'https://lwmkx78togjax57b.private.blob.vercel-storage.com/subscribers.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (token !== 'globalhotsellers2024') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let subscribers: any[] = [];
  try {
    const g = await get(BLOB_URL, { access: 'private', useCache: false });
    if (g) {
      const text = await new Response(g.stream).text();
      subscribers = text ? JSON.parse(text) : [];
    }
  } catch {
    subscribers = [];
  }

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
