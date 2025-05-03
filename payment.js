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
      total_amount: amount.toString(),
      subject: subject,
      body: body,
      product_code: 'FAST_INSTANT_TRADE_PAY'
    };

    console.log('原始 bizContent:', bizContent);
    const encodedBizContent = encodeURIComponent(JSON.stringify(bizContent));
    console.log('编码后的 bizContent:', encodedBizContent);

    const formData = {
      app_id: client.config.appId,
      method: 'alipay.trade.page.pay',
      charset: 'utf-8',
      version: '1.0',
      sign_type: 'RSA2',
      timestamp: formatDate(new Date()),
      notify_url: client.config.notifyUrl,
      return_url: client.config.returnUrl,
      biz_content: encodedBizContent
    };

    // 验证参数完整性
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`检查参数 ${key}:`, value);
      if (!value) {
        throw new Error(`参数 ${key} 不能为空`);
      }
    });

    // 生成表单
    const form = `
      <form id="alipaySubmit" name="alipaySubmit" action="${client.config.gateway}" method="POST">
        ${Object.entries(formData).map(([key, value]) => 
          `<input type="hidden" name="${key}" value="${decodeURIComponent(value)}"/>`
        ).join('\n')}
        <script>
          console.log('表单数据:', ${JSON.stringify(formData)});
          document.forms["alipaySubmit"].submit();
        </script>
      </form>
    `;

    return form;
  } catch (error) {
    console.error('创建订单失败:', error);
    throw error;
  }
}
