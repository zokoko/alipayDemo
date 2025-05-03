// notify.js

import client from './config.js';

export async function handleAlipayNotify(req, res) {
  try {
    const verified = await client.checkNotifySign(req.body);
    if (verified) {
      res.send('success');
    } else {
      res.status(400).send('fail');
    }
  } catch (error) {
    console.error('处理支付宝回调失败:', error);
    res.status(500).send('fail');
  }
}
