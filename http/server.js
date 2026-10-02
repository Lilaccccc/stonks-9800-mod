// 引入 Node.js 内置的 http 模块
const http = require('http');

const PORT = 3000;
const HOST = '127.0.0.1';

// 创建 HTTP 服务器实例
const server = http.createServer((req, res) => {

  // 只处理 POST 请求，且路径为 /api/report
  if (req.method === 'POST' && req.url === '/api/report') {
    let body = '';

    // 接收数据块并拼接
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // 数据接收完毕
    req.on('end', () => {
      console.log('----------------------------------------');
      console.log('✅ 收到游戏发来的数据！');
      console.log('原始数据:', body);

      try {
        // 尝试解析 JSON
        const jsonData = JSON.parse(body);
        console.log(`解析后的数据: 玩家金钱: ${jsonData.money}`);
      } catch (e) {
        console.error('⚠️ JSON 解析失败:', e.message);
      }
      console.log('----------------------------------------\n');

      // 向游戏回复响应 (虽然游戏脚本不接收，但 HTTP 协议要求有响应)
      // 添加 CORS 头，防止某些环境下被跨域策略拦截
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify({status: 'success', message: 'Data received by server'}));
    });

  } else {
    // 处理其他请求（比如浏览器直接访问）
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('STONKS-9800 游戏数据接收服务器正在运行...');
  }
});

// 启动服务器并监听端口
server.listen(PORT, HOST, () => {
  console.log(`🚀 服务器已启动！`);
  console.log(`正在监听: http://${HOST}:${PORT}`);
  console.log(`等待游戏发送数据...`);
});