// payment.js

import alipayClient from './config.js';

export async function createAlipayOrder(orderId, amount, subject, body) {
  try {
    // 使用SDK提供的方法直接创建
    const result = await alipayClient.exec('alipay.trade.page.pay', {
      method: 'POST',
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

    // 构造自动提交的表单
    return `
      <form id="alipaySubmit" name="alipaySubmit" action="${alipayClient.config.gateway}" method="POST">
        <input type="hidden" name="biz_content" value='${result.toString()}'>
        <script>document.forms['alipaySubmit'].submit();</script>
      </form>
    `;
  } catch (error) {
    console.error('创建支付宝订单失败:', error);
    throw error;
  }
}
