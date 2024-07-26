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

<img src="/assets/JBBabFfzZohIlExlWBocGOrpnIg.png" src-width="1704" class="markdown-img m-auto" src-height="1424" align="center"/>

### 1password原理

参考：https://skyfly.xyz/2019/07/26/Casual/onePasswordTheory/

首先1password会有两个密码：

1. 主密码（master password)  用户输入的（用户记住）

2、密钥  secret key  （软件生成的）（存在用户的电脑上，不会外传，一个随机生成的字符串）

白皮书：

<img src="/assets/At63bOjRSoIUEBxvtAccTZgknke.png" src-width="7199" class="markdown-img m-auto" src-height="3141" align="center"/>

 master_key和secert key

<img src="/assets/G7DXbB2uuo5caFxIu6kc5Dcentd.png" src-width="856" class="markdown-img m-auto" src-height="240" align="center"/>

这里用到一个叫dh算法的概念：

这里有个视频讲的好：https://www.bilibili.com/video/BV1sY4y1p78s/?spm_id_from=333.788&vd_source=1cfe4f7c9bf04285f79b848e60f55aea

<img src="/assets/I6yUb3XtLoTviQxgZQycnejwnEe.png" src-width="828" class="markdown-img m-auto" src-height="355" align="center"/>

 流程如下：

1、通过主密码（master password) 和密钥  secret key   拼起来生成一个A

2、通过A进行hash运算（MD5或者 SHA）算出一个B

3、把B发送服务器

4、通过dh算法，客户端通过 A算出一个C。服务器根据B也算出一个C（两边相同的加密密钥）

5、客户端每次给服务器发数据，都要用C加密。服务器也用C解密，

这个步骤得到共同的c是干啥的，好像没啥用啊

我们的目的是啥：

把我们保存的数据进行加密，存储到网盘里方便同步到你自己的其它设备里。

那我们就用aes对称加密算法就行了。我们不需要复杂的分享之类的功能。我们的功能只需要简单的保存，自己用

流程如下：
1、进入app,用户输入一个主密码（用户记住）。同时为用户生成一个密钥（存本地）。拼起来生成一个A

2、通过A进行hash运算（MD5或者 SHA）算出一个B

3、用户存的所有数据，都用B通过aes进行加密后存入本地数据库

4、用户获取数据时，通过B对数据库的数据解密后展示给用户。

同步到其它设备时，只用把加密后的数据发到那个设备上。同时把密钥发给那个设备（可以通过二维码发送）

即可。用户就可以在那个设备上通过输入主密码来解密数据库的文件。

# 2024-6-27

## 初始化密码功能

软件启动时检查本地有没有生成scert.key,如果没有，弹出对话框,让用户输入初始密码，

用户点确定后生成Key：一个随机数,保存本地

将用户的密码和key拼起来，做hash,生成一个B，

将用户名和B存到数据库中（本地数据库）

# 2024-7-4、2024-7-5、2024-7-14

# 保险库功能

图标：

<img src="/assets/DLDWbaGn9oy3v3xiwknciUBYnVb.jpeg" src-width="580" class="markdown-img m-auto" src-height="580" align="center"/>

新建一个user表用于存储用户信息，和加密后的key_hash

建一个保险库表：vault

保险库中存对应的密码信息：vault_item

1、home主页：

保险库列表：

展示如右：

<img src="/assets/WBi6bR2SZouWc0xZbNycC57Gnlf.png" src-width="821" class="markdown-img m-auto" src-height="242" align="center"/>

可以，修改，设置和删除

**这个功能算完成**

增删改搞定

<img src="/assets/CTlUbkakPosg2IxOKmpcK5s8nRe.gif" src-width="918" class="markdown-img m-auto" src-height="614" align="center"/>

# 待处理

密码功能：

点进入，可以进入账号列表

类似这样：上方可以直接切换密码库：

<img src="/assets/EfR0b1Gq7oANjPxpnppc1J1VnOf.png" src-width="1185" class="markdown-img m-auto" src-height="512" align="center"/>

新增账号

<img src="/assets/D4NkbFTCroGftZxfwflcotUFnXe.png" src-width="591" class="markdown-img m-auto" src-height="690" align="center"/>

账号

<img src="/assets/JbN1bTYg2oeboKxcuJ0cfoElnFC.png" src-width="591" class="markdown-img m-auto" src-height="709" align="center"/>

银行账号

<img src="/assets/BfcYb0tktoKS68x0aOEcZiWfnVg.png" src-width="586" class="markdown-img m-auto" src-height="711" align="center"/>

信用卡

<img src="/assets/Bc3rbk9wdoSx50xV3D1cTVdVnhf.png" src-width="590" class="markdown-img m-auto" src-height="707" align="center"/>

文档

<img src="/assets/IW5ZbB720obVg4x2t6jcMQeNnIb.png" src-width="586" class="markdown-img m-auto" src-height="694" align="center"/>

<img src="/assets/YBLpbuNvto9BJ2x8WLlcbNQnndb.png" src-width="589" class="markdown-img m-auto" src-height="716" align="center"/>

<img src="/assets/D73WbWtHKoZUElxYu5ZcV2Vgnvz.png" src-width="578" class="markdown-img m-auto" src-height="490" align="center"/>

