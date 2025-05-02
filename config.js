import AlipaySdk from 'alipay-sdk';

const alipayClient = new AlipaySdk({
  appId: 'YOUR_APP_ID',
  privateKey: 'YOUR_PRIVATE_KEY',
  alipayPublicKey: 'ALIPAY_PUBLIC_KEY',
  notifyUrl: 'YOUR_NOTIFY_URL',
  returnUrl: 'YOUR_RETURN_URL',
  signType: 'RSA2'
});

export default alipayClient;