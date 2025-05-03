// payment.js

import client from './config.js';

function formatDate(date) {
  const pad = (num) => (num < 10 ? '0' + num : num);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export async function createAlipayOrder(orderId, amount, subject, body) {
  try {
    // 改用标准的支付参数结构
    const params = {
      bizContent: {
        out_trade_no: orderId,
        total_amount: amount.toString(),
        subject: subject,
        body: body,
        product_code: 'FAST_INSTANT_TRADE_PAY'
      },
      returnUrl: client.config.returnUrl,
      notifyUrl: client.config.notifyUrl
    };

    console.log('请求参数:', params);

    // 使用 pageExec 方法专门处理页面支付
    const result = await client.pageExec('alipay.trade.page.pay', {
      ...params,
      method: 'GET'
    });

    console.log('支付宝返回结果:', result);

    // 直接返回支付链接
    return `
      <script>window.location.href = "${result}";</script>
    `;
  } catch (error) {
    console.error('创建订单失败:', error);
    throw error;
  }
}
