#!/bin/bash

# GlobalHotSellers.org 部署脚本
# 零成本全自动部署

set -e

echo "🚀 开始部署 GlobalHotSellers.org..."

# 检查环境
echo "🔍 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

# 显示项目信息
echo ""
echo "📋 项目信息："
echo "=============="
echo "网站名称：GlobalHotSellers"
echo "域名：globalhotsellers.org"
echo "技术栈：Next.js + TypeScript + Tailwind CSS"
echo "数据库：Supabase (免费)"
echo "托管：Vercel (免费)"
echo ""

# 创建必要的目录
echo "📁 创建目录结构..."
mkdir -p scripts/crawlers scripts/utils scripts/types
mkdir -p lib/db lib/crawlers lib/utils
mkdir -p public/images public/icons

# 检查 package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json 不存在"
    exit 1
fi

# 安装依赖（跳过权限问题）
echo "📦 跳过 npm install（权限问题）"
echo "💡 请手动运行：sudo chown -R 501:20 ~/.npm"
echo "💡 然后运行：npm install"

# 创建基础配置文件
echo "📝 创建配置文件..."

# 创建 robots.txt
cat > public/robots.txt << 'EOF'
User-agent: *
Allow: /
Sitemap: https://globalhotsellers.org/sitemap.xml

# Crawl delay to be respectful
Crawl-delay: 2
EOF

# 创建 sitemap 模板
cat > scripts/generate-sitemap.js << 'EOF'
// Sitemap generator for GlobalHotSellers.org
// Run with: node scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

const baseUrl = 'https://globalhotsellers.org';
const pages = [
  '',
  '/products',
  '/categories',
  '/tracker',
  '/blog',
  '/about',
  '/privacy',
  '/terms'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('✅ Sitemap generated: public/sitemap.xml');
EOF

# 创建 README
cat > README.md << 'EOF'
# GlobalHotSellers.org

全球热卖商品智能推荐平台 - 零成本、全自动、被动收入系统

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 9+

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 📁 项目结构

```
globalhotsellers/
├── app/                    # Next.js App Router
├── components/            # React 组件
├── lib/                   # 工具函数
├── scripts/               # 脚本文件
├── public/                # 静态资源
└── styles/                # 样式文件
```

## 🌍 功能特性

### 已实现
- ✅ 响应式设计
- ✅ 现代化UI
- ✅ 基础页面结构
- ✅ SEO优化配置

### 开发中
- 🔄 商品爬虫系统
- 🔄 价格追踪功能
- 🔄 用户认证系统
- 🔄 数据分析面板

## 🛠️ 技术栈

- **前端**: Next.js 14, React, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes, Supabase
- **数据库**: PostgreSQL (Supabase)
- **部署**: Vercel
- **监控**: Google Analytics, Vercel Analytics

## 📈 部署指南

### Vercel 部署（推荐）
1. 推送代码到 GitHub
2. 访问 https://vercel.com
3. 导入 GitHub 仓库
4. 配置环境变量
5. 点击部署

### 环境变量
```env
NEXT_PUBLIC_SITE_URL=https://globalhotsellers.org
NEXT_PUBLIC_AMAZON_TAG=your-tag-20
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 支持

- 问题反馈: GitHub Issues
- 文档: 项目 Wiki
- 讨论: GitHub Discussions

---

**开始你的零成本创业之旅！** 🚀
EOF

echo ""
echo "✅ 项目初始化完成！"
echo ""
echo "🎯 下一步行动："
echo ""
echo "1. 注册域名：globalhotsellers.org（已完成检查）"
echo "2. 创建 GitHub 仓库：TechFlowAuto/globalhotsellers"
echo "3. 申请 Amazon Associates 账号"
echo "4. 创建 Supabase 数据库（免费）"
echo "5. 部署到 Vercel（免费）"
echo ""
echo "🚀 今日目标："
echo "   - 完成域名注册"
echo "   - 网站基础框架上线"
echo "   - 开始爬虫开发"
echo ""
echo "💰 成本预算："
echo "   - 域名：¥85/年"
echo "   - 开发：$0（自己开发）"
echo "   - 运营：$0（免费服务）"
echo "   - 总成本：< ¥100"
echo ""
echo "📈 收入预测（6个月）："
echo "   - 月1-3：$10-50"
echo "   - 月4-6：$50-200"
echo "   - 月7-12：$200-1000"
echo ""
echo "🎉 开始你的零成本创业！"