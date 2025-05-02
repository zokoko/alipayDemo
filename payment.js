// payment.js

import alipayClient from './config.js';

export async function createAlipayOrder(orderId, amount, subject, body) {
  try {
    const result = await alipayClient.exec('alipay.trade.page.pay', {
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

    // 返回完整的支付表单HTML
    return {
      form: result
    };
  } catch (error) {
    console.error('创建支付宝订单失败:', error);
    throw error;
  }
}
