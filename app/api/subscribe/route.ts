import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || !email.includes('@')) {
      return Response.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const subscribers = await kv.get<any[]>('subscribers') || [];
    const exists = subscribers.find(
      (s: any) => s.email?.toLowerCase() === email.toLowerCase()
    );

    if (exists) {
      return Response.json({
        message: 'Already subscribed! 🎉',
        alreadySubscribed: true,
      });
    }

    // Add new subscriber
    const subscriber = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      email,
      name: name || 'Anonymous',
      source: 'globalhotsellers.net',
      page: request.headers.get('referer') || '/',
      subscribedAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || '',
    };

    subscribers.push(subscriber);
    await kv.set('subscribers', subscribers);

    return Response.json(
      {
        message: "You're in! Check your inbox for trending deals. 🔥",
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          name: subscriber.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
