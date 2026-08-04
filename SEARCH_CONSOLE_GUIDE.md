# Search Console + GA4 操作手册（老板专用 🦞）

> 2026-08-04 · 目标：让 Google 收录 GlobalHotSellers.net，搞清流量来源
> 域名 DNS 托管在 Vercel，网站部署在 Vercel（代码推 GitHub 自动部署）

---

## 第一步：Google Search Console（让 Google 收录）

### 1. 打开并登录
- 访问 https://search.google.com/search-console
- 用你的 Google 账号登录（没有就注册一个，5 分钟）

### 2. 添加资源（选「网址前缀」）
- 点「添加资源」→ 选 **「网址前缀」**
- 输入：`https://globalhotsellers.net`
- 点「继续」

### 3. 验证方式（选 HTML 文件，最省事）
- 页面会显示 4 种验证方式，选 **「HTML 文件」**
- 下载它给你的 `googleXXXX.html` 文件（内容是一串 Google 生成的代码）
- **把文件发给我**（微信/这里都行）
- 我放到网站根目录 → 推代码 → Vercel 自动部署（约 1-2 分钟）
- 然后你回到 Search Console 点 **「验证」** → 绿勾 ✅ 完成

> 备选：如果嫌麻烦，也可以选「DNS 记录」方式，我给你 TXT 记录内容，
> 你去 Vercel 域名面板（vercel.com → 你的项目 → Domains → DNS Records）加一条 TXT。

### 4. 提交 sitemap（验证通过后）
- 左侧菜单 → 「Sitemap」
- 输入：`sitemap.xml`
- 点提交 ✅

### 5. 主动要求收录（可选，加速）
- 左侧「网址检查」→ 输入 `https://globalhotsellers.net` → 点「请求编入索引」
- 商品页也可以逐个请求（如 /product/9）

### 效果时间线
- 提交后 3-7 天：Google 开始爬取
- 2-4 周：商品页陆续出现在搜索结果
- 1-2 个月：有自然搜索流量进来

---

## 第二步：Google Analytics 4（看流量来源）

### 1. 创建 GA4 账号
- 访问 https://analytics.google.com
- 点「开始衡量」→ 填账号名（如 GlobalHotSellers）
- 填资源名（GlobalHotSellers）→ 选时区、币种
- 点「创建」

### 2. 拿 Measurement ID
- 创建后进入「管理」→「数据流」→ 选你的 Web 数据流
- 复制 **Measurement ID**（格式 `G-XXXXXXXXXX`）
- **发给我**，我填进 Vercel 环境变量 `NEXT_PUBLIC_GA_ID`，代码会自动加载
- 或者你自己改：vercel.com → 项目 → Settings → Environment Variables → 改 `NEXT_PUBLIC_GA_ID`

### 3. 验证生效
- 部署后访问网站，打开浏览器开发者工具 → Network → 搜 `gtag`
- 能看到请求就说明 GA4 在记录

---

## 需要发给我的东西（两个）

1. ✅ Search Console 的 `googleXXXX.html` 验证文件
2. ✅ GA4 的 Measurement ID（G- 开头）

收到后我 5 分钟搞定部署。
