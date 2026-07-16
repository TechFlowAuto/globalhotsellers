# 代码推送指南
## 明天早上执行的步骤

## 🚀 推送代码到GitHub

### 步骤1：打开终端
1. 打开终端应用
2. 进入项目目录：
   ```bash
   cd /Users/mac/.openclaw/workspace/GlobalHotSellers
   ```

### 步骤2：配置Git（如果尚未配置）
```bash
# 设置用户信息（使用你的信息）
git config user.email "13991218199@163.com"
git config user.name "TechFlowAuto"
```

### 步骤3：推送代码
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: GlobalHotSellers v1.0"

# 设置远程仓库
git remote add origin https://github.com/TechFlowAuto/globalhotsellers.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤4：输入GitHub凭据
推送时会要求输入：
- **用户名**：TechFlowAuto
- **密码**：你的GitHub密码（或Personal Access Token）

## 🔧 备选方案

### 如果密码验证失败：
1. **创建Personal Access Token**：
   - 访问：https://github.com/settings/tokens
   - 点击 "Generate new token"
   - 选择权限：repo（全选）
   - 生成并复制token

2. **使用token推送**：
   ```bash
   # 使用token作为密码
   git push -u origin main
   # 用户名：TechFlowAuto
   # 密码：粘贴你的token
   ```

### 如果仍然失败：
1. **使用SSH方式**：
   ```bash
   # 更改远程URL为SSH
   git remote set-url origin git@github.com:TechFlowAuto/globalhotsellers.git
   git push -u origin main
   ```

## 🚀 部署到Vercel

### 代码推送后，立即部署：
1. **访问**：https://vercel.com
2. **点击**："New Project"
3. **导入**：GitHub仓库 TechFlowAuto/globalhotsellers
4. **配置**：
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
5. **环境变量**（在Vercel项目设置中添加）：
   ```
   NEXT_PUBLIC_SITE_URL=https://globalhotsellers.net
   NEXT_PUBLIC_SITE_NAME=GlobalHotSellers
   NEXT_PUBLIC_SITE_DESCRIPTION=Discover What's Hot Worldwide
   ```
6. **点击**："Deploy"

## 📊 验证部署

### 部署成功后：
1. **访问网站**：https://globalhotsellers.net
2. **检查功能**：
   - 首页加载正常
   - 导航菜单工作
   - 响应式设计正常
   - 无控制台错误

### 如果遇到问题：
1. **检查Vercel部署日志**
2. **验证环境变量**
3. **检查域名DNS设置**

## 📝 Amazon申请准备

### 网站上线后，立即申请：
1. **访问**：https://affiliate-program.amazon.com/
2. **使用**：13991218199@163.com
3. **网站**：https://globalhotsellers.net
4. **描述**：
   ```
   GlobalHotSellers is a global hot products discovery platform that tracks trending items from Amazon, eBay, AliExpress, Walmart and more. We help users find the hottest selling products worldwide.
   ```

## ⏰ 明天时间安排

### 建议时间表：
- **09:00** - 推送代码到GitHub
- **09:15** - 部署到Vercel
- **09:30** - 验证网站功能
- **10:00** - 开始Amazon申请
- **11:00** - 开始网站优化

## 🆘 故障排除

### 常见问题：

1. **Git推送失败**：
   ```bash
   # 先拉取（如果是空仓库，跳过）
   git pull origin main --allow-unrelated-histories
   # 再推送
   git push -u origin main
   ```

2. **Vercel部署失败**：
   - 检查 package.json 中的脚本
   - 确保有 next.config.js
   - 检查环境变量格式

3. **网站访问失败**：
   - 检查Vercel部署状态
   - 验证域名DNS设置
   - 清除浏览器缓存

## 🎯 成功标准

### 今天完成：
- ✅ 域名注册：globalhotsellers.net
- ✅ 项目开发：完整代码
- ✅ GitHub仓库：创建完成
- 🔄 代码推送：等待执行
- 🔄 网站部署：等待执行
- 🔄 Amazon申请：等待执行

### 明天目标：
- 网站正式上线
- Amazon申请提交
- 开始基础SEO
- 准备内容创作

## 💰 投资回报跟踪

### 已投入：
- **现金**：¥85（域名）
- **时间**：约4小时

### 预期里程碑：
- **上线后1周**：第一个用户访问
- **上线后1月**：第一笔联盟收入
- **上线后3月**：稳定被动收入

---

**明天早上见！网站即将上线！** 🚀