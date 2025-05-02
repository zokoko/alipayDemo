// payment.js

import alipayClient from './config.js';

export async function createAlipayOrder(orderId, amount, subject, body) {
  const bizContent = {
    out_trade_no: orderId,
    total_amount: amount,
    subject: subject,
    body: body,
    product_code: 'FAST_INSTANT_TRADE_PAY'
  };

  try {
    const result = await alipayClient.pagePay({
      bizContent: bizContent
    });
    return result;
  } catch (error) {
    console.error('创建支付宝订单失败:', error);
    throw error;
  }
}
