import { put, get } from '@vercel/blob'

const BLOB_PATH = 'guide-clicks.json'
const MAX_EVENTS = 5000

type ClickEvent = {
  id: string
  ts: string
  path: string
  productId: string
  source: string
  referrer: string
}

async function readEvents(): Promise<ClickEvent[]> {
  try {
    const result = await get(BLOB_PATH, { access: 'private', useCache: false })
    if (!result) return []
    const text = await new Response(result.stream).text()
    return text ? JSON.parse(text) : []
  } catch {
    return []
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const path = typeof body.path === 'string' ? body.path.slice(0, 500) : ''
    const productId = typeof body.productId === 'string' ? body.productId.slice(0, 100) : 'unknown'
    const source = typeof body.source === 'string' ? body.source.slice(0, 200) : 'unknown'
    const referrer = typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : ''

    if (!path.startsWith('/guides')) {
      return Response.json({ ok: true, ignored: true })
    }

    const events = await readEvents()
    events.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ts: new Date().toISOString(),
      path,
      productId,
      source,
      referrer,
    })
    await put(BLOB_PATH, JSON.stringify(events.slice(-MAX_EVENTS)), {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'application/json',
      allowOverwrite: true,
    })
    return Response.json({ ok: true })
  } catch (error) {
    console.error('Guide click tracking error:', error)
    return Response.json({ ok: false }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token || token !== process.env.ANALYTICS_TOKEN) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const events = await readEvents()
  return Response.json({
    total: events.length,
    events: events.slice(-500).reverse(),
  })
}
