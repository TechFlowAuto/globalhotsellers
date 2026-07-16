const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'subscribers.json');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

// 中间件
app.use(cors({ origin: ['https://globalhotsellers.net', 'http://localhost:3000', 'http://localhost:8080'] }));
app.use(express.json());

// ========== API ==========

// 订阅接口
app.post('/api/subscribe', (req, res) => {
  const { email, name } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  // 读取现有数据
  const subscribers = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  // 检查是否已存在
  const exists = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(200).json({ message: 'Already subscribed!', alreadySubscribed: true });
  }

  // 新增订阅者
  const subscriber = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    email,
    name: name || 'Anonymous',
    source: 'globalhotsellers.net',
    page: req.headers.referer || req.body.page || '/',
    subscribedAt: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.headers['user-agent'] || '',
  };

  subscribers.push(subscriber);
  fs.writeFileSync(DATA_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');

  console.log(`\n📧 New subscriber: ${email} (${subscriber.name})`);
  console.log(`📊 Total subscribers: ${subscribers.length}`);

  res.status(201).json({
    message: "You're in! Check your inbox for trending deals. 🔥",
    subscriber: { id: subscriber.id, email: subscriber.email, name: subscriber.name }
  });
});

// 获取订阅列表（简单权限校验）
app.get('/api/subscribers', (req, res) => {
  const token = req.query.token;
  if (token !== 'globalhotsellers2024') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const subscribers = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  res.json({
    total: subscribers.length,
    subscribers: subscribers.map(s => ({
      email: s.email,
      name: s.name,
      subscribedAt: s.subscribedAt,
      source: s.source,
    }))
  });
});

// 统计信息
app.get('/api/stats', (req, res) => {
  const token = req.query.token;
  if (token !== 'globalhotsellers2024') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const subscribers = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const today = new Date().toISOString().split('T')[0];
  const todaySubs = subscribers.filter(s => s.subscribedAt.startsWith(today));

  res.json({
    total: subscribers.length,
    today: todaySubs.length,
    lastSubscriber: subscribers.length > 0 ? subscribers[subscribers.length - 1] : null,
  });
});

// ========== 简单管理页面 ==========
app.get('/admin', (req, res) => {
  const token = req.query.token;
  if (token !== 'globalhotsellers2024') {
    return res.send(`
      <html><body style="font-family:sans-serif;padding:40px;">
        <h2>🔐 Subscriber Admin</h2>
        <form method="get">
          <input name="token" placeholder="Enter admin token" style="padding:8px;width:300px;"/>
          <button type="submit">Login</button>
        </form>
      </body></html>
    `);
  }

  const subscribers = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const rows = subscribers.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${s.email}</td>
      <td>${s.name}</td>
      <td>${new Date(s.subscribedAt).toLocaleString()}</td>
    </tr>
  `).join('');

  res.send(`
    <html><body style="font-family:sans-serif;padding:40px;">
      <h2>📬 Subscribers (${subscribers.length})</h2>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">
        <tr style="background:#f0f0f0;">
          <th>#</th><th>Email</th><th>Name</th><th>Date</th>
        </tr>
        ${rows}
      </table>
      <p style="margin-top:20px;color:#666;">
        <a href="/api/subscribers?token=globalhotsellers2024">JSON API</a>
      </p>
    </body></html>
  `);
});

// 首页
app.get('/', (req, res) => {
  res.json({
    service: 'GlobalHotSellers Subscriber API',
    version: '1.0.0',
    endpoints: {
      subscribe: 'POST /api/subscribe',
      list: 'GET /api/subscribers?token=xxx',
      stats: 'GET /api/stats?token=xxx',
      admin: 'GET /admin?token=xxx',
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════╗
║  🌐 GlobalHotSellers Subscriber API     ║
║  Running on http://localhost:${PORT}       ║
║                                          ║
║  📥 POST /api/subscribe  — 新订阅        ║
║  📊 GET  /api/subscribers  — 列表        ║
║  🔐 GET  /admin  — 管理面板              ║
╚══════════════════════════════════════════╝
  `);
});
