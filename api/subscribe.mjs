/**
 * GlobalHotSellers 订阅 API — Vercel Serverless Function
 * 
 * POST /api/subscribe  — 提交订阅
 * GET  /api/subscribe  — 查看统计（需 token）
 * 
 * 数据存储：使用 Vercel KV 或简单的内存 + 文件存储
 * 由于 Vercel Serverless 是无状态的，这里用 GitHub Gist 作为持久化存储
 * 或者使用 Vercel KV (需要付费)
 * 
 * 最简单的方案：订阅数据发送到我们的邮箱（用 Resend.com 免费版）
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

// 邮箱通知配置 — 用 Resend.com 免费版（100封/月）
// 注册: https://resend.com
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'admin@globalhotsellers.net'

interface Subscriber {
  email: string
  name: string
  subscribedAt: string
  source: string
  page: string
  userAgent: string
}

// 内存存储（Vercel 函数实例级别）
const subscribers: Subscriber[] = []
let totalCount = 0

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // GET — 统计（需 token）
  if (req.method === 'GET') {
    const token = req.query.token as string
    if (token !== process.env.ADMIN_TOKEN && token !== 'globalhotsellers2024') {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const today = new Date().toISOString().split('T')[0]
    const todaySubs = subscribers.filter(s => s.subscribedAt.startsWith(today))
    return res.json({
      total: totalCount,
      today: todaySubs.length,
      subscribers: subscribers.slice(-50).map(s => ({
        email: s.email,
        name: s.name,
        subscribedAt: s.subscribedAt,
      })),
    })
  }

  // POST — 订阅
  if (req.method === 'POST') {
    const { email, name } = req.body || {}

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' })
    }

    const subscriber: Subscriber = {
      email,
      name: name || 'Anonymous',
      subscribedAt: new Date().toISOString(),
      source: 'globalhotsellers.net',
      page: req.headers.referer || '/',
      userAgent: req.headers['user-agent'] || '',
    }

    subscribers.push(subscriber)
    totalCount++

    console.log(`📧 New subscriber: ${email} (${subscriber.name})`)
    console.log(`📊 Total: ${totalCount}`)

    // 尝试发送邮件通知（如果配置了 Resend）
    if (RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'GlobalHotSellers <subscribe@globalhotsellers.net>',
            to: [NOTIFY_EMAIL],
            subject: `🎉 New Subscriber: ${email}`,
            html: `<h2>New Newsletter Subscriber</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Name:</strong> ${subscriber.name}</p>
              <p><strong>Date:</strong> ${subscriber.subscribedAt}</p>
              <p><strong>Total subscribers:</strong> ${totalCount}</p>`,
          }),
        })
      } catch (err) {
        console.error('Failed to send email notification:', err)
      }
    }

    return res.status(201).json({
      message: "You're in! Check your inbox for trending deals. 🔥",
    })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
