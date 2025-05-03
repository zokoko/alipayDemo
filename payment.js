// payment.js

import client from './config.js';

function formatDate(date) {
  const pad = (num) => (num < 10 ? '0' + num : num);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export async function createAlipayOrder(orderId, amount, subject, body) {
  try {
    const bizContent = {
      out_trade_no: orderId,
      total_amount: amount,
      subject: subject,
      body: body,
      product_code: 'FAST_INSTANT_TRADE_PAY'
    };

    const formData = {
      app_id: client.config.appId,
      method: 'alipay.trade.page.pay',
      charset: 'utf-8',
      version: '1.0',
      sign_type: 'RSA2',
      timestamp: formatDate(new Date()),
      notify_url: client.config.notifyUrl,
      return_url: client.config.returnUrl,
      biz_content: JSON.stringify(bizContent)
    };

    // 生成签名并构造表单
    const form = `
      <form id="alipaySubmit" name="alipaySubmit" action="${client.config.gateway}" method="POST">
        ${Object.entries(formData).map(([key, value]) => 
          `<input type="hidden" name="${key}" value="${value}"/>`
        ).join('\n')}
        <script>document.forms["alipaySubmit"].submit();</script>
      </form>
    `;

    return form;
  } catch (error) {
    console.error('创建支付宝订单失败:', error);
    throw error;
  }
}
