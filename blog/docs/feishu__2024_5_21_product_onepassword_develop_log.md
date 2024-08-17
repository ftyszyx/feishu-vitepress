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

## 初始化密码功能(完成）

软件启动时检查本地有没有生成scert.key,如果没有，弹出对话框,让用户输入初始密码，

用户点确定后生成Key：一个随机数,保存本地

将用户的密码和key拼起来，做hash,生成一个B，

将用户名和B存到数据库中（本地数据库）

# 2024-7-29

不知道改了啥，一启动就崩

<img src="/assets/Ye7AbkgV2oPMmXx4S5Mc0Xvzn1y.gif" src-width="1420" class="markdown-img m-auto" src-height="874" align="center"/>

本来想使用electron捕捉的crash文件来分析，但发现有点麻烦，没有一个开箱即用的工具。

还好现在代码比较简单，直接加日志跟进。发现是因为调用node.js的密码解密时崩溃

<img src="/assets/IRvrbpjHcoo8K8x8NK7cKBYfn2c.png" src-width="1289" class="markdown-img m-auto" src-height="196" align="center"/>

decode时没有判断空

<img src="/assets/XFpEbwTo8o1CxnxDDGLc7RbRntz.png" src-width="556" class="markdown-img m-auto" src-height="265" align="center"/>

## 定时自动锁定功能(完成)

## 关闭默认缩小到托盘（完成）

# 保险库功能（完成）

图标：

<img src="/assets/DLDWbaGn9oy3v3xiwknciUBYnVb.jpeg" src-width="580" class="markdown-img m-auto" src-height="580" align="center"/>

<img src="/assets/CTlUbkakPosg2IxOKmpcK5s8nRe.gif" src-width="918" class="markdown-img m-auto" src-height="614" align="center"/>

## 新增保密信息（完成）

<img src="/assets/WbyrbyGbvozOSwxzaw6cobZMnfh.gif" src-width="874" class="markdown-img m-auto" src-height="654" align="center"/>

## 保密信息预览（完成）

<img src="/assets/Nh66bJQJuo1F57xAefxcwtbMnAc.gif" src-width="974" class="markdown-img m-auto" src-height="728" align="center"/>

## 保密信息编辑（完成）

<img src="/assets/UMy1bhJ9KojpUaxa5JVciPs4nEd.gif" src-width="878" class="markdown-img m-auto" src-height="652" align="center"/>

# 用户设置功能（完成）

<img src="/assets/VC5cb3xESoWfwIxRQiFcpuM4njf.gif" src-width="872" class="markdown-img m-auto" src-height="612" align="center"/>

# 
# 密码生成（完成）

<img src="/assets/U7Q0baB1Hodz1Cx9k4gc55isnId.gif" src-width="1028" class="markdown-img m-auto" src-height="656" align="center"/>

# tray托盘(完成）

<img src="/assets/ByzobEyFao4Av1xZP6zcHOZDnch.png" src-width="244" class="markdown-img m-auto" src-height="140" align="center"/>

#  been externalized for browser compatibility异常错误（解决）

Module "path" has been externalized for browser compatibility. Cannot access "path.join" in client code

今天改代码，不知道改了什么地方，搞出这个报错，render启动不起来了。

看意思好像是render代码引用 了node.js的一些库。

但我找了半天也没找到具体是哪个代码引入的。从堆栈看不出来

<img src="/assets/TazTbeMzIo0pWexXXxncSQkgnYd.png" src-width="1291" class="markdown-img m-auto" src-height="234" align="center"/>

## 找到问题

通过一句句代码的排查，终于找到了，自动导入太坑人了

<img src="/assets/Wty7bfCFMojk7KxR1Abc7GaWned.png" src-width="740" class="markdown-img m-auto" src-height="428" align="center"/>

# robotjs库的导入问题（解决）

需要使用robotjs

启动时报错，提示版本不对：

<img src="/assets/PP2gbAIHjok939xMfbbcuDwFnMf.png" src-width="516" class="markdown-img m-auto" src-height="292" align="center"/>

需要重新编译，有说明文档

https://github.com/octalmage/robotjs/wiki/Electron

意思是说两边用的node.js编译版本不一样，electron用的是119

robotjs用的是115

这里可以看node.js对应的版本号：

https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json

可以看到115对应node.js  20.15.0

<img src="/assets/A97PbXmfBoneBPxCgFwcphmtn5g.png" src-width="502" class="markdown-img m-auto" src-height="119" align="center"/>

## 解决方法：

安装elctron rebuild

```sql
npm install @electron/rebuild -S
```

在package.json中加入编译命令：这里要注意只能编译robotjs。因为默认会把node_module下所有的c++库全重新编译一遍，会出问题。（我这里用到了duckdb，是官方编译好的，自己编译会报错）

```sql
"rebuild": "electron-rebuild -f -o robotjs"
```

编译完后就Ok了。

## 自动输入（完成）

自动输入有点慢，需要改进

<img src="/assets/RERwbwRs6o6fz4xbpiVcPjPUn9f.gif" src-width="864" class="markdown-img m-auto" src-height="436" align="center"/>

# 数据备份时duckdb无法关掉 （换sqlite了）

数据备份时需要将duckdb生成的数据库复制出来，我先调用duckdb的close。

```js
public async CloseDb() {
    if (this.db == null) return
    return new Promise<void>((resolve, reject) => {
      this.db.close!((error) => {
        if (error) {
          Log.error('close db err', error)
          reject(error)
          return
        }
        this.db = null
        Log.info('close db ok')
        resolve()
      })
    })
  }
```

Opendb的代码

```js
public async OpenDb() {
    if (this.db) return
    return new Promise<void>((resolve, reject) => {
      const dbpath = this.getDbPath()
      this.db = new duckdb.Database(
        dbpath,
        {
          access_mode: 'READ_WRITE',
          max_memory: '512MB'
        },
        (err) => {
          if (err) {
            Log.error('open db err', err)
            this.db = null
            reject(err)
            return
          }
          Log.info('open db ok')
          resolve()
        }
      )
    })
  }
```

但是发现还是会提示文件被占用

```js
Error: EBUSY: resource busy or locked, copyfile
```

在官方没找到解决方案，感觉duckdb有bug,应该是有东西没释放

## 解决方案

目前已经给官方提了bug

https://github.com/duckdb/duckdb-node/issues/111

目前还没人处理，

同时也考虑到duckdb的库太大了：25M,还是先换到sqlite这个成熟的本地数据库吧.(而且有人反馈duckdb有内存泄露，请求越多，内存占用一直在升高。）

<img src="/assets/WyYDbaGReofporxgHPyc4ePlnBe.png" src-width="708" class="markdown-img m-auto" src-height="458" align="center"/>

sqlite只有1.8M

<img src="/assets/Twglb001doGctRx1QDjcNhDpnGe.png" src-width="686" class="markdown-img m-auto" src-height="139" align="center"/>

#  数据备份和恢复（完成）

方案就是：

备份：将duckdb数据和key及set.json全打包压缩成zip

还原：将数据解压，放到程序目录下

<img src="" src-width="782" class="markdown-img m-auto" src-height="428" align="center"/>

# robot.js自动输入过慢的问题(解决）

查了一下github上的issue,发现这个问题很多个问https://github.com/octalmage/robotjs/issues/530

有人已经知道怎么修复了，但是官方的npm包还没有修复 。

没办法 ，我就把robot.js直接放在包里了， 

<img src="/assets/P88mbljDGo1b0IxAHy8csOYinof.png" src-width="221" class="markdown-img m-auto" src-height="198" align="center"/>

安装本地库

```sql
npm install ./third_lib/robotjs
```

编译

```sql
npm run build
```

使用了最新的robotjs后，发现问题更严重了，输入是变快了，但是两个输入会互相穿插，比如下面代码

```sql
robot.typeString("sss")
robot.typeString("dddd")
```

当时我就好奇，为什么robot这个库提供的接口没有回调函数。

原来是他代码中加了时间延时。但如果把这个延时去掉，就有问题，除非要改接口。

看了一下这个开源项目，从2020年后就没有人维护了。开源免费的项目，维护人的动力的确是不足，不是很靠谱。

# todo

## 导入：

云存储：https://x-file-storage.xuyanwu.cn/#/

java写的，不太好，需要一个客户端node.js版本

不找了，先直接使用百度云吧

<img src="/assets/AE97bcGHuolw4MxMZ5Jcxo3xnVd.png" src-width="383" class="markdown-img m-auto" src-height="717" align="center"/>

<img src="/assets/QA4cbE3PmooTPmxCnISc3EEynNh.png" src-width="393" class="markdown-img m-auto" src-height="593" align="center"/>

## 导出

<img src="/assets/RQYSbPggmopyNrxDlrkcUU6qnGc.png" src-width="414" class="markdown-img m-auto" src-height="189" align="center"/>

## 关于

<img src="/assets/PV7HbHWv0oAMDYxXfeYcP0uinsc.png" src-width="732" class="markdown-img m-auto" src-height="577" align="center"/>

## 多账号支持

账号信息

<img src="/assets/ILinblXTOou4tfxXs4KcoIdunjd.png" src-width="703" class="markdown-img m-auto" src-height="518" align="center"/>

## 软件更新

数据库更新

软件更新

## 密钥生成流程优化

<img src="/assets/EJLKbxFWbonNFwx3aVbchY9Mnme.png" src-width="528" class="markdown-img m-auto" src-height="278" align="center"/>

<img src="/assets/Bxeab3ihVoQ2v8xeCiZcRuqnnmd.png" src-width="394" class="markdown-img m-auto" src-height="341" align="center"/>

## 修改密码

## 修改密钥

## 同步阿里网盘

## 同步百度网盘

## 其它设备上如何登陆

<img src="/assets/EH5IbCktvoxMgHxiEV2cbtown3e.png" src-width="421" class="markdown-img m-auto" src-height="543" align="center"/>

## github自动打包

参考：

https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web

https://github.com/lyswhut/lx-music-desktop

