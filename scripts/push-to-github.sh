#!/bin/bash

# GlobalHotSellers 代码推送到GitHub脚本
# 使用方法：./scripts/push-to-github.sh <github-url>

set -e

GITHUB_URL="$1"

if [ -z "$GITHUB_URL" ]; then
    echo "❌ 错误：请提供GitHub仓库URL"
    echo "使用方法：./scripts/push-to-github.sh https://github.com/TechFlowAuto/globalhotsellers.git"
    exit 1
fi

echo "🚀 开始推送代码到GitHub..."
echo "仓库URL: $GITHUB_URL"

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 初始化Git仓库（如果尚未初始化）
if [ ! -d ".git" ]; then
    echo "📁 初始化Git仓库..."
    git init
else
    echo "📁 Git仓库已存在"
fi

# 添加所有文件
echo "📝 添加文件到暂存区..."
git add .

# 提交更改
echo "💾 提交代码..."
git commit -m "Initial commit: GlobalHotSellers v1.0

- Complete Next.js project structure
- Responsive design with Tailwind CSS
- Core components: Navbar, HeroSection, etc.
- SEO optimization and metadata
- Deployment configuration for Vercel
- Affiliate integration ready
- Zero-cost architecture"

# 设置远程仓库
echo "🔗 设置远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "$GITHUB_URL"

# 推送到GitHub
echo "📤 推送到GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ 代码推送完成！"
echo ""
echo "🎯 下一步："
echo "1. 访问 https://vercel.com"
echo "2. 点击 'New Project'"
echo "3. 导入 GitHub 仓库: TechFlowAuto/globalhotsellers"
echo "4. 配置环境变量"
echo "5. 点击 'Deploy'"
echo ""
echo "🌐 网站将部署到：https://globalhotsellers.net"
echo ""
echo "📊 项目统计："
echo "   📁 文件数量: $(find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | wc -l)"
echo "   📄 代码行数: $(find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -exec cat {} \; | wc -l)"
echo "   🎨 组件数量: $(find ./components -type f -name "*.tsx" | wc -l)"
echo ""
echo "🚀 开始你的零成本创业之旅！"