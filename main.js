import express from 'express';
import { createAlipayOrder } from './payment.js';
import { handleAlipayNotify } from './notify.js';
import client from './config.js';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();

// 确保 public 目录存在
const publicDir = './public';
if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// 添加首页路由
app.get('/', (req, res) => {
  try {
    res.sendFile('index.html', { 
      root: path.join(process.cwd(), 'public'),
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

app.post('/create-order', async (req, res) => {
  const { orderId, amount, subject, body } = req.body;
  try {
    const result = await createAlipayOrder(orderId, amount, subject, body);
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/alipay-notify', handleAlipayNotify);

// 添加同步回调路由
app.get('/return', async (req, res) => {
  try {
    // 简化处理逻辑，暂时不验证签名
    const trade_no = req.query.trade_no;
    const out_trade_no = req.query.out_trade_no;
    res.send(`支付完成！订单号: ${out_trade_no}, 支付宝交易号: ${trade_no}`);
  } catch(error) {
    res.status(500).send('处理回调失败: ' + error.message);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

async function test() {
  try {
    console.log('支付宝客户端配置:', client.config);
  } catch (error) {
    console.error('错误:', error);
  }
}

test();