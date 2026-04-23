# 订阅数据存储服务 — 用于 GlobalHotSellers

# 使用说明：
# 1. 在 Mac 上运行一次:    npm install
# 2. 启动服务:              node server.js
# 3. 服务运行在:            http://localhost:3001
# 4. 数据保存在:            data/subscribers.json
# 5. 浏览器查看订阅列表:    http://localhost:3001/admin

# 可选: 用 PM2 让服务开机自启
# npm install -g pm2
# pm2 start server.js --name globalhotsellers-sub
# pm2 save
# pm2 startup
