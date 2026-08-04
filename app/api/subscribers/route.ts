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
