/**
 * 支付宝配置模板
 * 使用说明:
 * 1. 复制此文件并重命名为 env.js
 * 2. 填入您的支付宝配置信息
 * 3. 注意保护好密钥信息，不要提交到代码仓库
 */

export const development = {
  ALIPAY_GATEWAY: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do',
  ALIPAY_APP_ID: '你的沙箱环境APPID',
  ALIPAY_PRIVATE_KEY: `-----BEGIN RSA PRIVATE KEY-----
你的沙箱环境私钥
-----END RSA PRIVATE KEY-----`,
  ALIPAY_PUBLIC_KEY: `-----BEGIN PUBLIC KEY-----
你的沙箱环境公钥
-----END PUBLIC KEY-----`,
  ALIPAY_NOTIFY_URL: 'http://localhost:3000/alipay-notify',
  ALIPAY_RETURN_URL: 'http://localhost:3000/return'
};

export const production = {
  ALIPAY_GATEWAY: 'https://openapi.alipay.com/gateway.do',
  ALIPAY_APP_ID: '你的正式环境APPID',
  ALIPAY_PRIVATE_KEY: `-----BEGIN RSA PRIVATE KEY-----
你的正式环境私钥
-----END RSA PRIVATE KEY-----`,
  ALIPAY_PUBLIC_KEY: `-----BEGIN PUBLIC KEY-----
你的正式环境公钥
-----END PUBLIC KEY-----`,
  ALIPAY_NOTIFY_URL: 'https://你的域名/alipay-notify',
  ALIPAY_RETURN_URL: 'https://你的域名/return'
};

export const common = {
  SIGN_TYPE: 'RSA2',
  CHARSET: 'utf-8',
  VERSION: '1.0',
  API_VERSION: '1.0'
};
