// notify.js

import alipayClient from './config.js';

export async function handleAlipayNotify(req, res) {
  const data = req.body;
  
  try {
    const verifyResult = await alipayClient.checkNotifySign(data);
    if (verifyResult) {
      // 验签成功
      if (data.trade_status === 'TRADE_SUCCESS') {
        // 支付成功，更新订单状态
        console.log('支付成功，订单号:', data.out_trade_no);
      }
      res.send('success');
    } else {
      res.status(400).send('验签失败');
    }
  } catch (error) {
    console.error('处理支付宝通知失败:', error);
    res.status(500).send('fail');
  }
}
