# GitHub 部署指南 - GlobalHotSellers

## 概述

本指南将帮助您将 GlobalHotSellers 项目部署到 GitHub Pages 并使用 GitHub Actions 自动化部署流程。

## 当前状态

✅ **已完成**：
1. 项目代码已准备就绪
2. GitHub Actions 工作流文件已创建 (`.github/workflows/deploy.yml`)
3. Next.js 已配置为静态导出
4. 项目已初始化为 Git 仓库

⏳ **待完成**：
1. 将代码推送到 GitHub 仓库
2. 触发 GitHub Actions 工作流
3. 配置 GitHub Pages
4. 验证部署结果

## 部署步骤

### 步骤 1：推送代码到 GitHub

如果您有 GitHub 访问权限，可以运行部署脚本：

```bash
./deploy_to_github.sh
```

或者手动执行：

```bash
cd GlobalHotSellers
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 步骤 2：验证 GitHub Actions 工作流

1. 访问 GitHub 仓库：https://github.com/TechFlowAuto/globalhotsellers
2. 点击 "Actions" 标签页
3. 确保 `deploy.yml` 工作流存在并已运行

### 步骤 3：配置 GitHub Pages

1. 在 GitHub 仓库中，进入 **Settings** → **Pages**
2. 在 "Source" 部分，选择 **GitHub Actions**
3. 保存设置

### 步骤 4：访问部署的网站

部署成功后，您的网站将可通过以下地址访问：
- **GitHub Pages**: https://techflowauto.github.io/globalhotsellers/
- **自定义域名**（如果配置）: https://globalhotsellers.net

## GitHub Actions 工作流详情

### 工作流文件：`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with Next.js
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://globalhotsellers.net
          NEXT_PUBLIC_SITE_NAME: GlobalHotSellers
          NEXT_PUBLIC_SITE_DESCRIPTION: Discover What's Hot Worldwide
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 工作流程说明

1. **触发条件**：
   - 推送到 `main` 分支
   - 手动触发（在 GitHub Actions 页面点击 "Run workflow"）

2. **构建过程**：
   - 使用 Node.js 18
   - 安装依赖
   - 构建 Next.js 应用（静态导出）
   - 上传构建产物

3. **部署过程**：
   - 部署到 GitHub Pages
   - 自动生成访问 URL

## 故障排除

### 问题 1：Git 推送失败
**解决方案**：
- 检查 GitHub 访问权限
- 使用 HTTPS 方式：`git remote set-url origin https://github.com/TechFlowAuto/globalhotsellers.git`
- 使用 GitHub 个人访问令牌（PAT）

### 问题 2：GitHub Actions 失败
**检查点**：
1. 确保 `.github/workflows/deploy.yml` 文件存在
2. 检查工作流日志中的错误信息
3. 验证 `package.json` 中的构建脚本
4. 确保 `next.config.js` 配置正确

### 问题 3：网站无法访问
**检查点**：
1. 等待部署完成（通常需要 1-2 分钟）
2. 检查 GitHub Pages 设置
3. 验证构建产物是否正确生成

## 手动部署备选方案

如果 GitHub Actions 无法正常工作，可以手动部署：

### 方案 A：使用 Vercel（推荐）
```bash
npm run deploy
```

### 方案 B：手动构建并上传
```bash
# 构建项目
npm run build

# 构建产物在 out/ 目录
# 可以将 out/ 目录的内容上传到任何静态主机
```

## 监控和维护

### 监控部署状态
- **GitHub Actions**: https://github.com/TechFlowAuto/globalhotsellers/actions
- **GitHub Pages**: https://github.com/TechFlowAuto/globalhotsellers/settings/pages

### 更新网站
1. 修改代码
2. 提交更改：`git add . && git commit -m "更新描述"`
3. 推送到 GitHub：`git push origin main`
4. GitHub Actions 将自动重新部署

## 联系方式

如有问题，请通过以下方式联系：
- GitHub Issues: https://github.com/TechFlowAuto/globalhotsellers/issues
- 项目维护者: TechFlowAuto

---
**最后更新**: 2026-04-19  
**部署状态**: 待推送 ⏳