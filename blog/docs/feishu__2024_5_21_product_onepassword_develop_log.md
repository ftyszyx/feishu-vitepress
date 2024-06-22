---
title: 密码管理器
tags:
  - develop
create_time: 1718958726
categories:
  - product
---


# 2024-6-21

## 安全流程探索

### 先回顾一下正常的登录流程

用户注册：

密码在服务器端被加密

```csharp
this.password = bcrypt.hashSync(this.password, 10);
```

难密码是否正确

```csharp
if (!bcrypt.compareSync(login_req.password, user.password)) {
      throw new HttpException('密码错误', Net_Retcode.ERR);
    }
```

主要是用bcrypt这个库：https://github.com/kelektiv/node.bcrypt.js

bcrypt的原理 ：

https://www.cnblogs.com/flydean/p/15292400.html

当验证了玩家的登陆后，返回一个token给玩家，同时把token存在redis中方便验证

```csharp
const payload: TokenPayload = { user_name: user.user_name, id: user.id };
const access_token = this.jwtService.sign(payload);
const http_config = this.config.get<AppHttpConfig>('http');
await this.redis.set(getTokenRedisKey(user.id), access_token, http_config.token_expire_in);
```

jwt加密数据需要设置密码

jwt用到的是签名算法：https://www.cnblogs.com/kirito-c/p/12402066.html

```csharp
JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (configservice: ConfigService) => {
        const httpconfig = configservice.get<AppHttpConfig>('http');
        return {
          secretOrPrivateKey: httpconfig.token_secret_key,
          signOptions: {
            // expiresIn: httpconfig.token_expire_time
          },
        };
      },
    }),
```

### 再回顾一下https的安全机制

主要是用非对称加密：

服务器会生成：公钥和私钥

公钥能用来解密，私钥能用来加密

证书验证时用非对称加密。或者key

传输数据时用key进行对称加密

 参考：https://segmentfault.com/a/1190000021494676

<img src="/assets/JBBabFfzZohIlExlWBocGOrpnIg.png" src-width="1704" class="m-auto" src-height="1424" align="center"/>

### 1password原理

参考：https://skyfly.xyz/2019/07/26/Casual/onePasswordTheory/

首先1password会有两个密码：

1. 主密码（master password)  用户输入的（用户记住）

2、密钥  secret key  （软件生成的）（存在用户的电脑上，不会外传）

白皮书：

<img src="/assets/At63bOjRSoIUEBxvtAccTZgknke.png" src-width="7199" class="m-auto" src-height="3141" align="center"/>

pbkdf2

