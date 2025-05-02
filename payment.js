// payment.js

import alipayClient from './config.js';

export async function createAlipayOrder(orderId, amount, subject, body) {
  try {
    const result = await alipayClient.pageExec('alipay.trade.page.pay', {
      method: 'GET',
      notify_url: alipayClient.config.notifyUrl,
      return_url: alipayClient.config.returnUrl,
      bizContent: {
        out_trade_no: orderId,
        total_amount: amount,
        subject: subject,
        body: body,
        product_code: 'FAST_INSTANT_TRADE_PAY'
      }
    });

    // 直接返回支付链接
    return result;
  } catch (error) {
    console.error('创建支付宝订单失败:', error);
    throw error;
  }
}
