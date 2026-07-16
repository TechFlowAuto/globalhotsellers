#!/bin/bash

# 部署脚本：将 GlobalHotSellers 推送到 GitHub 并触发 GitHub Actions

set -e

echo "🚀 开始部署 GlobalHotSellers 到 GitHub..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在 GlobalHotSellers 项目根目录运行此脚本"
    exit 1
fi

# 检查 git 状态
echo "📊 检查 git 状态..."
git status

# 添加所有更改
echo "📝 添加所有更改..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')" || echo "没有更改需要提交"

# 尝试推送
echo "📤 推送到 GitHub..."
if git push origin main; then
    echo "✅ 推送成功！"
else
    echo "⚠️  推送失败，尝试使用 HTTPS 方式..."
    
    # 切换到 HTTPS URL
    git remote set-url origin https://github.com/TechFlowAuto/globalhotsellers.git
    
    # 提示用户手动推送
    echo ""
    echo "📋 请手动执行以下步骤："
    echo "1. 访问 https://github.com/TechFlowAuto/globalhotsellers"
    echo "2. 确保 .github/workflows/deploy.yml 文件存在"
    echo "3. 手动上传更改或使用 GitHub Desktop"
    echo ""
    echo "或者，您可以："
    echo "1. 创建 GitHub 个人访问令牌 (PAT)"
    echo "2. 运行: git push https://<TOKEN>@github.com/TechFlowAuto/globalhotsellers.git main"
    echo ""
    echo "当前工作流文件内容："
    cat .github/workflows/deploy.yml
fi

echo ""
echo "🔗 GitHub Actions 地址："
echo "https://github.com/TechFlowAuto/globalhotsellers/actions"
echo ""
echo "🌐 GitHub Pages 地址（部署成功后）："
echo "https://techflowauto.github.io/globalhotsellers/"
echo ""
echo "📋 部署检查清单："
echo "✅ 1. 项目代码已准备"
echo "✅ 2. GitHub Actions 工作流已配置"
echo "⏳ 3. 等待代码推送到 GitHub"
echo "⏳ 4. 等待 GitHub Actions 自动运行"
echo "⏳ 5. 访问 GitHub Pages 查看结果"