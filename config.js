import AlipaySdk from 'alipay-sdk';

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA1Wcgh9jyCIMfgC2L7YrrGBE6+7kKBY5EGvhF+bsO22YT3KsC8yWXkXCwRk4Ju3/jsmmpoPp9dlfbVDgiGymdvS8jNNdkjVPho8YMFZydI+/+xydqUmA4lifyXNhpjMl73NxXtPaX2JP8KIP+QtudBb99JFGWauJ30ASN0u2knTiC6VQz0p5t3tYB3SAJaEc5H6L3NYYyoMJ5pXApZMc6AifE1gli34fvOwc64vwKOZvyC5iJjmg/dMTxGZaSwenorHEu2OIZxWIuHHgZE0RkvCNmxgavLY8/CdSeJRT2DrI3gYNLSBMAKvEciob/O7ifZmQlHkwZVwJ1BZiMdu/LgwIDAQABAoIBAEliqmws7aaBuO5yO0FX2VqwajEwQ8L/VmpT4HRtoEFQjBoBcQU+cy3fq66xnWUuKJYtAdlK6qQsuE7w8sGWgRkSwa+lNn3nT5vrOjKgZeV63YmNA2IKlssEN7M39KwmiYK8/yhK+JLQ6RDhuykwroHQhO9dYzWkZYFSX5ceg9JQgMxYi6R/IwN4Ykmii9icwOSy+SacjG5Y7v3pYd0TE5g9aeDftZ9lXr6qgLalfO1hTjpKlTz7PSQI4Zh6nIk/chziFLEK54SnCaw43irSf9k0+7TXBGgeTGsbf/VVHRC5ulRcXyWNBUgzuErLAKsedEp+6HBnXZZQGlgVKWD0wCECgYEA8uihcIBNoXNJnSRQRcFWRHaC4SkEKIaBwhhvtw9VSCREVBX9BX3MvyaNBmYPFgiIAxmKOXEcAzJhxrs9Zyhvyt0oIcaFJgPuVgbKg3FKN29jJqvnvPuI4LTUFBrfNkdvZk3nOIcqY+kS5xXbhZRrDbe/BHoG8iXPaJyTMXL7gRECgYEA4OdotpCWtT2bkmtbFAErzSvY7E8TYO7EGpTHSkmqmKvohyiOgv2T/1Ch4Mf2JfIw9dhXT9XdyhvPxieMt70CK+/K+zPU4vMBhb1X9Ie4A5HffSjBKZ1qycXsgEL4dlf3h0l049R6fF6pzb3I9UvCNgPNS0TSZGj2+V7Kv6rFw1MCgYALAwbGjdp3Fj3hFNNaxi/9/I1kXbKlj6t0PB1cZCKOma5LTY/h3tkYVUwRXTET46Ee2tqMThdiAbezBav78DZZMPtvxIsmtQjp93bYzJr7tl39U8+2noSPA0OWAb3avRRMw/1Wb7I5Q0irFy+Td63+ujS7pDiKY7JqYKa/mCHUsQKBgG33N+/sCoRbtzGEZGgHmo8bHVmN4H/IvwHwNPFRy6QSigNsBSJvMmnn1v69RtGO9fl+6lIS0/r6VkEhHWDJfcJV4P2qfjDpeJkX12Ws5oB4VrovryLV4Vz+9YBRPoM+x7zSYeD0B1/AOW5rmVK21CLtAPgIkoad/AQ6IRBOQ5wZAoGBAN1TPF6v3uqc27E+fPyxSWNHdkQL9aXjudf3VBRPTNnrKqm3piLG4efWtrv9AvqAJD2jtZPA0Gm6ztEdxDblVQneB445IEkXFfvSVNYJgYCfZg/wpizRYNkawc2R9jW5w/VysMBeG/N5rTquTRdvdBWpCdI5/pzCeCg4TnJO2Aeh
-----END RSA PRIVATE KEY-----`;

const alipayPublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1Wcgh9jyCIMfgC2L7YrrGBE6+7kKBY5EGvhF+bsO22YT3KsC8yWXkXCwRk4Ju3/jsmmpoPp9dlfbVDgiGymdvS8jNNdkjVPho8YMFZydI+/+xydqUmA4lifyXNhpjMl73NxXtPaX2JP8KIP+QtudBb99JFGWauJ30ASN0u2knTiC6VQz0p5t3tYB3SAJaEc5H6L3NYYyoMJ5pXApZMc6AifE1gli34fvOwc64vwKOZvyC5iJjmg/dMTxGZaSwenorHEu2OIZxWIuHHgZE0RkvCNmxgavLY8/CdSeJRT2DrI3gYNLSBMAKvEciob/O7ifZmQlHkwZVwJ1BZiMdu/LgwIDAQAB
-----END PUBLIC KEY-----`;

const alipayClient = new AlipaySdk({
  // 使用沙箱环境
  gateway: 'https://openapi.alipaydev.com/gateway.do',
  appId: '2021000148645238',
  privateKey: privateKey,
  alipayPublicKey: alipayPublicKey,
  notifyUrl: 'http://localhost:3008/api/payment/alipay/notify',
  returnUrl: 'http://localhost:3008/api/payment/alipay/return',
  signType: 'RSA2',
  charset: 'utf8',
  version: '1.0',
  timeout: 5000,
  camelcase: true,
  formatKey: true
});

export default alipayClient;