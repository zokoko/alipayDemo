// payment.js

import alipayClient from './config.js';

export async function createAlipayOrder(orderId, amount, subject, body) {
  try {
    // 直接构造请求参数
    const params = {
      method: 'alipay.trade.page.pay',
      bizContent: {
        out_trade_no: orderId,
        total_amount: amount,
        subject: subject,
        body: body,
        product_code: 'FAST_INSTANT_TRADE_PAY'
      },
      returnUrl: alipayClient.config.returnUrl,
      notifyUrl: alipayClient.config.notifyUrl
    };

    // 生成支付表单
    const form = `
      <form id='alipaysubmit' name='alipaysubmit' action='${alipayClient.config.gateway}' method='POST'>
        <input type='hidden' name='app_id' value='${alipayClient.config.appId}'/>
        <input type='hidden' name='method' value='${params.method}'/>
        <input type='hidden' name='format' value='JSON'/>
        <input type='hidden' name='charset' value='utf-8'/>
        <input type='hidden' name='sign_type' value='RSA2'/>
        <input type='hidden' name='timestamp' value='${new Date().toISOString().slice(0, 19).replace('T', ' ')}'/>
        <input type='hidden' name='version' value='1.0'/>
        <input type='hidden' name='notify_url' value='${params.notifyUrl}'/>
        <input type='hidden' name='return_url' value='${params.returnUrl}'/>
        <input type='hidden' name='biz_content' value='${JSON.stringify(params.bizContent)}'/>
      </form>
      <script>document.forms['alipaysubmit'].submit();</script>
    `;

    return form;
  } catch (error) {
    console.error('创建支付宝订单失败:', error);
    throw error;
  }
}
