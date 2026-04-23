'use client'

import { useState, FormEvent } from 'react'
import { Mail, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'

// 用 GitHub Gist API 存储订阅数据
// 你的 GitHub token 和 Gist ID（会在你创建后更新）
const GIST_ID = '' // 稍后填入
const GITHUB_TOKEN = '' // 稍后填入

export default function EmailSubscribe({
  variant = 'inline',
  title = 'Get Hot Deals First',
  subtitle = 'Subscribe to receive trending products directly in your inbox.',
}: {
  variant?: 'inline' | 'hero' | 'modal'
  title?: string
  subtitle?: string
}) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setMessage('')

    try {
      // 方案1: 尝试连接到本地后端（Mac Mini/本机服务）
      // 如果有 Cloudflare Tunnel 或 ngrok，用真实域名
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ba0b0734b112aa.lhr.life'

      const res = await fetch(`${BACKEND_URL}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          name: name || 'Anonymous',
          source: 'globalhotsellers.net',
          subscribedAt: new Date().toISOString(),
          page: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setStatus('success')
        setMessage(data.alreadySubscribed
          ? 'You\'re already subscribed! 🎉'
          : "You're in! Check your inbox for trending deals. 🔥"
        )
        setEmail('')
        setName('')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  // Compact inline form
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        {status === 'success' ? (
          <div className="flex items-center space-x-3 bg-green-50 text-green-700 px-4 py-3 rounded-lg">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{message}</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={status === 'sending'}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary flex items-center justify-center space-x-2 px-6 py-3 whitespace-nowrap disabled:opacity-50"
            >
              {status === 'sending' ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>Subscribe</span>
            </button>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center space-x-2 mt-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}
      </form>
    )
  }

  // Full hero variant
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80 mb-6 text-sm">{subtitle}</p>

      {status === 'success' ? (
        <div className="flex items-center space-x-3 bg-green-500/20 text-green-200 px-4 py-4 rounded-lg">
          <CheckCircle className="w-6 h-6 flex-shrink-0" />
          <span className="font-medium">{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={status === 'sending'}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={status === 'sending'}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-white text-primary font-semibold py-3 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {status === 'sending' ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>Get Hot Deals</span>
          </button>
        </form>
      )}

      {status === 'error' && (
        <div className="flex items-center space-x-2 mt-3 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <p className="text-white/50 text-xs mt-4 text-center">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}
