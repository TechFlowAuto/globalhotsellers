'use client'
import { useEffect, useRef } from 'react'

// MailerLite 订阅表单（Sellers - 7 Formulas）
// 表单 ID: mlb2-47090712 | 账号: 2709098
export default function NewsletterSignup() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 确保 MailerLite 的 webforms 脚本已加载
    const SRC = 'https://groot.mailerlite.com/js/w/webforms.min.js?v83147fa8ce2d95cb73ece7f28b469519'
    if (!document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement('script')
      s.src = SRC
      s.async = true
      document.body.appendChild(s)
    }
  }, [])

  return (
    <div className="my-12 rounded-xl border border-gray-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center">
      <h3 className="text-2xl font-bold text-white">Get the 7 seller formulas free</h3>
      <p className="mt-2 text-sm text-slate-300">Pricing, ads and inventory maths — plus a one-page cheat-sheet. No spam, unsubscribe anytime.</p>
      <form
        className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center"
        action="https://assets.mailerlite.com/jsonp/2709098/forms/201223883198564013/subscribe"
        method="post"
        target="_blank"
      >
        <input
          type="email"
          name="fields[email]"
          required
          placeholder="your@email.com"
          className="w-full rounded-lg border border-slate-600 bg-white px-4 py-3 text-sm text-slate-900 sm:w-72"
        />
        <input type="hidden" name="ml-submit" value="1" />
        <input type="hidden" name="anticsrf" value="true" />
        <button
          type="submit"
          className="rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-yellow-300"
        >
          Send me the cheat-sheet
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-400">You can unsubscribe anytime. Review our <a href="/privacy-policy" className="underline">Privacy Policy</a>.</p>
    </div>
  )
}