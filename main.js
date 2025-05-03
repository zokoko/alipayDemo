import express from 'express';
import bodyParser from 'body-parser';
import { createAlipayOrder } from './payment.js';
import { handleAlipayNotify } from './notify.js';
import alipayClient from './config.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

async function test() {
  try {
    console.log('支付宝客户端配置:', alipayClient.config);
  } catch (error) {
    console.error('错误:', error);
  }
}

test();