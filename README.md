# 支付宝支付服务
由于找了很久的资料，官方没有提供比较方便的demo例子和文档，所以自己写了一个demo，希望对大家有所帮助。
一个基于 Node.js 的支付宝支付集成方案。

## 快速开始

1. 复制配置模板
```bash
cp config/env.template.js config/env.js
```

2. 配置支付宝参数
修改 `config/env.js` 文件，填入您的支付宝配置:

https://open.alipay.com/develop/sandbox/app
- 开发环境(沙箱)配置 - development
  - ALIPAY_APP_ID: 支付宝沙箱应用ID
  - ALIPAY_PRIVATE_KEY: 应用私钥
  - ALIPAY_PUBLIC_KEY: 支付宝公钥
  - ALIPAY_NOTIFY_URL: 异步通知地址
  - ALIPAY_RETURN_URL: 同步返回地址


https://open.alipay.com/develop/manage
- 生产环境配置 - production  
  - 同上，替换为正式环境参数

3. 安装依赖
```bash
yarn install
```

4. 运行服务
```bash
# 开发环境
yarn dev

# 生产环境
yarn start
```

## 目录结构
```
├── config/           # 配置文件
│   ├── env.js       # 环境配置
│   └── env.template.js  # 配置模板
├── public/          # 静态文件
├── payment.js       # 支付相关代码
├── notify.js        # 回调通知处理
├── loadConfig.js    # 配置加载
└── main.js         # 主程序入口
```

## 注意事项

1. 确保 `config/env.js` 已添加到 `.gitignore`
2. 生产环境必须使用 HTTPS
3. 密钥要安全保管，不要提交到代码仓库
4. 接口调用建议添加签名验证
