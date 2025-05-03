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

    // 直接使用 JSON.stringify，不进行 URL 编码
    const bizContentStr = JSON.stringify(bizContent);
    console.log('序列化后的 bizContent:', bizContentStr);

    const formData = {
      app_id: client.config.appId,
      method: 'alipay.trade.page.pay',
      charset: 'utf-8',
      version: '1.0',
      sign_type: 'RSA2',
      timestamp: formatDate(new Date()),
      notify_url: client.config.notifyUrl,
      return_url: client.config.returnUrl,
      biz_content: bizContentStr // 直接使用 JSON 字符串
    };

    // 验证参数完整性
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`检查参数 ${key}:`, value);
      if (!value) {
        throw new Error(`参数 ${key} 不能为空`);
      }
    });

    // 在表单生成时不进行解码
    const form = `
      <form id="alipaySubmit" name="alipaySubmit" action="${client.config.gateway}" method="POST">
        ${Object.entries(formData).map(([key, value]) => {
          console.log(`生成表单字段 ${key}:`, value);
          return `<input type="hidden" name="${key}" value='${value}'/>`;
        }).join('\n')}
        <input type="submit" value="提交" style="display:none;">
      </form>
      <script>
        console.log('提交的表单数据:', ${JSON.stringify(formData)});
        document.getElementById('alipaySubmit').submit();
      </script>
    `;

    return form;
  } catch (error) {
    console.error('创建订单失败:', error);
    throw error;
  }
}
