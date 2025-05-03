import pkg from 'alipay-sdk';
import * as envConfig from './config/env.js';

const { default: AlipaySdk } = pkg;
const ENV = process.env.NODE_ENV || 'development';
const currentEnv = envConfig[ENV];
const commonConfig = envConfig.common;

console.log(`当前环境: ${ENV}`);

const config = {
  gateway: currentEnv.ALIPAY_GATEWAY,
  appId: currentEnv.ALIPAY_APP_ID,
  privateKey: currentEnv.ALIPAY_PRIVATE_KEY,
  alipayPublicKey: currentEnv.ALIPAY_PUBLIC_KEY,
  notifyUrl: currentEnv.ALIPAY_NOTIFY_URL,
  returnUrl: currentEnv.ALIPAY_RETURN_URL,
  signType: commonConfig.SIGN_TYPE,
  charset: commonConfig.CHARSET,
  version: commonConfig.VERSION,
  apiVersion: commonConfig.API_VERSION
};

console.log('加载的配置:', {
  ...config,
  privateKey: '*** 已隐藏 ***',
  alipayPublicKey: '*** 已隐藏 ***'
});

const client = new AlipaySdk(config);
export default client;
