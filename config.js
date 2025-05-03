import AlipaySdk from 'alipay-sdk';

const formatKey = (key) => {
  const lines = key.split('\n');
  return lines.map(line => line.trim()).join('\n');
};

const privateKey = formatKey(`-----BEGIN RSA PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVZyCH2PIIgx+ALYvtiusYETr7uQoFjkQa+EX5uw7bZhPcqwLzJZeRcLBGTgm7f+Oyaamg+n12V9tUOCIbKZ29LyM012SNU+GjxgwVnJ0j7/7HJ2pSYDiWJ/Jc2GmMyXvc3Fe09pfYk/wog/5C250Fv30kUZZq4nfQBI3S7aSdOILpVDPSnm3e1gHdIAloRzkfovc1hjKgwnmlcClkxzoCJ8TWCWLfh+87Bzri/Ao5m/ILmImOaD90xPEZlpLB6eiscS7Y4hnFYi4ceBkTRGS8I2bGBq8tjz8J1J4lFPYOsjeBg0tIEwAq8RyKhv87uJ9mZCUeTBlXAnUFmIx278uDAgMBAAECggEASWKqbCztpoG47nI7QVfZWrBqMTBDwv9WalPgdG2gQVCMGgFxBT5zLd+rrrGdZS4oli0B2UrqpCy4TvDywZaBGRLBr6U2fedPm+s6MqBl5XrdiY0DYgqWywQ3szf0rCaJgrz/KEr4ktDpEOG7KTCugdCE711jNaRlgVJflx6D0lCAzFiLpH8jA3hiSaKL2JzA5LL5JpyMblju/elh3RMTmD1p4N+1n2VevqqAtqV87WFOOkqVPPs9JAjhmHqciT9yHOIUsQrnhKcJrDjeKtJ/2TT7tNcEaB5Maxt/9VUdELm6VFxfJY0FSDO4SssAqx50Sn7ocGddllAaWBUpYPTAIQKBgQDy6KFwgE2hc0mdJFBFwVZEdoLhKQQohoHCGG+3D1VIJERUFf0Ffcy/Jo0GZg8WCIgDGYo5cRwDMmHGuz1nKG/K3SghxoUmA+5WBsqDcUo3b2Mmq+e8+4jgtNQUGt82R29mTec4hypj6RLnFduFlGsNt78EegbyJc9onJMxcvuBEQKBgQDg52i2kJa1PZuSa1sUASvNK9jsTxNg7sQalMdKSaqYq+iHKI6C/ZP/UKHgx/Yl8jD12FdP1d3KG8/GJ4y3vQIr78r7M9Ti8wGFvVf0h7gDkd99KMEpnWrJxeyAQvh2V/eHSXTj1Hp8XqnNvcj1S8I2A81LRNJkaPb5Xsq/qsXDUwKBgAsDBsaN2ncWPeEU01rGL/38jWRdsqWPq3Q8HVxkIo6ZrktNj+He2RhVTBFdMRPjoR7a2oxOF2IBt7MFq/vwNlkw+2/Eiya1COn3dtjMmvu2Xf1Tz7aehI8DQ5YBvdq9FEzD/VZvsjlDSKsXL5N3rf66NLukOIpjsmpgpr+YIdSxAoGAbfc37+wKhFu3MYRkaAeajxsdWY3gf8i/AfA08VHLpBKKA2wFIm8yaefW/r1G0Y71+X7qUhLT+vpWQSEdYMl9wlXg/ap+MOl4mRfXZazmgHhWui+vItXhXP71gFE+gz7HvNJh4PQHX8A5bmuZUrbUIu0A+AiShp38BDohEE5DnBkCgYEA3VM8Xq/e6pzbsT58/LFJY0d2RAv1peO51/dUFE9M2esqqbemIsbh59a2u/0C+oAkPaO1k8DQabrO0R3ENuVVCd4HjjkgSRcV+9JU1gmBgJ9mD/CmLNFg2RrBzZH2NbnD9XKwwF4b83mtOq5NF290FakJ0jn+nMJ4KDhOck7YB6E=
-----END RSA PRIVATE KEY-----`);

const publicKey = formatKey(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Wcgh9jyCIMfgC2L7YrrGBE6+7kKBY5EGvhF+bsO22YT3KsC8yWXkXCwRk4Ju3/jsmmpoPp9dlfbVDgiGymdvS8jNNdkjVPho8YMFZydI+/+xydqUmA4lifyXNhpjMl73NxXtPaX2JP8KIP+QtudBb99JFGWauJ30ASN0u2knTiC6VQz0p5t3tYB3SAJaEc5H6L3NYYyoMJ5pXApZMc6AifE1gli34fvOwc64vwKOZvyC5iJjmg/dMTxGZaSwenorHEu2OIZxWIuHHgZE0RkvCNmxgavLY8/CdSeJRT2DrI3gYNLSBMAKvEciob/O7ifZmQlHkwZVwJ1BZiMdu/LgwIDAQAB
-----END PUBLIC KEY-----`);

const alipayClient = new AlipaySdk({
  gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do',
  appId: '2021000148645238',
  privateKey,
  alipayPublicKey: publicKey,
  notifyUrl: 'http://localhost:3000/alipay-notify',
  returnUrl: 'http://localhost:3000/return',
  signType: 'RSA2',
  charset: 'utf-8',
  version: '1.0',
  keyType: 'PKCS1', // 改用PKCS1格式
  timeout: 5000
});

export default alipayClient;