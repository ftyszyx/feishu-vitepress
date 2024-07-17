---
title: 密码通
tags:
  - develop
create_time: 1716970246
categories:
  - product
---


# 说明

现在互联网上平台过多，每个平台都需要账号和密码。

根本记录不过来

所以需要做一个软件记录账号和密码

功能：

1. 软件需要密码才能登陆，（可以用2fa进行二次解锁）
2. 软件里存的信息主要是：平台名，平台地址，账号名，密码。邮箱，手机，

其中密码需要加密存储

1. 有搜索功能，可以通过搜索快速匹配到平台或者账号
2. 有密码生成功能（帮生成密码）
3. 数据可以存储到本地，也可以同步到网盘（百度，阿里，github)
4. 5分钟没操作就会锁
5. 定时清除粘贴板内容，可以调整清除时间间隔
6. 加密本地文件。

这类型的软件，

1、东西最好存本地（不需要和服务器交互）

2、最好开源（受大家监督）

3、通过同步用户资料收费

# 现有的软件

##  Bitwarden 

https://bitwarden.com/

开源网站：

https://github.com/bitwarden

厉害从前端到后端，完全开源。

##  proton pass

官网：https://proton.me/pass

部分开源：

https://github.com/protonpass

## KeePass 

## 1password

https://1password.com/zh-cn ：

收费，找到一个说明：https://yishi.io/1password-complete-tutorial/

### 网页流程说明

第一步：生成一个私钥匙

<img src="/assets/EEWnbXLz9oXaqJx9iJtcDJnHnjc.png" src-width="702" class="markdown-img m-auto" src-height="291" align="center"/>

让你保存

<img src="/assets/DQA4bJnoKovk6ox2q0ZcFb8onve.png" src-width="402" class="markdown-img m-auto" src-height="375" align="center"/>

会生成一个pdf给你

<img src="/assets/KWj6bIh9nop0Q7x1Eq9ctGNnnOg.png" src-width="860" class="markdown-img m-auto" src-height="396" align="center"/>

<img src="/assets/AMjPbf8X8oxNEGxZko4cFdNZnWf.png" src-width="786" class="markdown-img m-auto" src-height="281" align="center"/>

下一步

<img src="/assets/Xc5WbqmqRo2ZTAxjBMzcJNh9nXb.png" src-width="528" class="markdown-img m-auto" src-height="339" align="center"/>

主页面

<img src="/assets/IQVIbZhRSo1gPIxtX9scJuWInbg.png" src-width="1503" class="markdown-img m-auto" src-height="464" align="center"/>

新建一个保险库

<img src="/assets/NRjpb9h9ZorQSFxopJ8cxhlqnqd.png" src-width="591" class="markdown-img m-auto" src-height="571" align="center"/>

这里就列出来了

<img src="/assets/FHz4bEAYVoTuxAxuvRLcmTSKnmQ.png" src-width="1283" class="markdown-img m-auto" src-height="483" align="center"/>

保险库页面

<img src="/assets/XSkWbViYUo5MZdxdiZXcMEtBnph.png" src-width="1789" class="markdown-img m-auto" src-height="603" align="center"/>

新一个账号login

<img src="/assets/RFrMbWoSvo4BfXxIhF2ch5LEntd.png" src-width="336" class="markdown-img m-auto" src-height="568" align="center"/>

项目：

<img src="/assets/TMfTbWJV6oTn8hxOVsOc3KbynuX.png" src-width="939" class="markdown-img m-auto" src-height="494" align="center"/>

还可以导入密码

<img src="/assets/BZeJbY10voEopBxesm8cj8SfnBh.png" src-width="310" class="markdown-img m-auto" src-height="199" align="center"/>

选chrome

<img src="/assets/LuSIbTs2joz23Gx8J9Ncf167nie.png" src-width="1377" class="markdown-img m-auto" src-height="687" align="center"/>

选择chrome

<img src="/assets/UsdAb7dRDohNOhxRv45cA1DPn4c.png" src-width="1492" class="markdown-img m-auto" src-height="633" align="center"/>

在你导出密码文件 后

<img src="/assets/Wid2b4nPPo4laLxY9FhcOPXanTd.png" src-width="1505" class="markdown-img m-auto" src-height="440" align="center"/>

上传文件 

<img src="/assets/WsyWbdTDZoGAldx68fJcImbFnVg.png" src-width="1498" class="markdown-img m-auto" src-height="644" align="center"/>

<img src="/assets/WrwBbminBohyHyxELBFcUvb9nDb.png" src-width="1466" class="markdown-img m-auto" src-height="666" align="center"/>

重新设置 label

<img src="/assets/LyvHbxOIvo4EYUxwTjQcwdLTnbb.png" src-width="1450" class="markdown-img m-auto" src-height="497" align="center"/>

10分钟不操作就会锁

<img src="/assets/FZ9Ibcd4lo3yBGxkeyIcjlPWnMc.png" src-width="967" class="markdown-img m-auto" src-height="451" align="center"/>

### 新建密码

<img src="/assets/GuHnbdIjLogZo0xNQO7c7wtinIe.png" src-width="969" class="markdown-img m-auto" src-height="669" align="center"/>

<img src="/assets/XNwtbcXyCowmFkxzkeZcBrFsn4c.png" src-width="562" class="markdown-img m-auto" src-height="311" align="center"/>

<img src="/assets/TwqEbEjM0oh8RCxuuT3cmMC1nfh.png" src-width="357" class="markdown-img m-auto" src-height="303" align="center"/>

<img src="/assets/DIRKbLTzroIFI9xNmwacSGBanFh.png" src-width="780" class="markdown-img m-auto" src-height="316" align="center"/>

<img src="/assets/Vz5CbB4GmoMdRAxdT8EcNWxWnmg.png" src-width="607" class="markdown-img m-auto" src-height="185" align="center"/>

<img src="/assets/ZV82bZdQzoIrZMx6sLXcLVlZnJg.png" src-width="575" class="markdown-img m-auto" src-height="528" align="center"/>

### 修改密码

<img src="/assets/Amh4bTzQmowoGuxkPyLcw75knBK.png" src-width="1158" class="markdown-img m-auto" src-height="554" align="center"/>

<img src="/assets/GLBZbdwjnohFn5x08cBcA0DEnHe.png" src-width="835" class="markdown-img m-auto" src-height="566" align="center"/>

### 首页：

<img src="/assets/BJH9bCwkRoUjt1xWQo3c4IAjnFe.png" src-width="1344" class="markdown-img m-auto" src-height="575" align="center"/>

### 安全机制

1Password 并非开源，但它遵循公开规范（[安全模型的白皮书](https://1password.com/files/1Password-White-Paper.pdf)），任何开发者都可以对其进行黑箱测试。

David Schuetz 在他的[博客](https://darthnull.org/security/2018/11/09/1pass-misc/)对 1Password 的工作机制进行了极为详尽的探索，下图便是他总结的核心：

所谓 2SKD（two-secret key derivation）机制，指的是1Password 同时使用你自己设定的主密码（Master password）和私钥（Secret key）来加密你的信息，以及在与服务器通信的过程中验证你的身份。

**主密码（Master password）不会被 1Password 存储，它只有在被运行的时候短暂存在于机器的内存中。**

**Secret key（即图中的 Account key）在且仅在本地生成，不会上传到服务器。**

<img src="/assets/W4pGb4wuFoozEzx0waccjPVZnTb.png" src-width="694" class="markdown-img m-auto" src-height="479" align="center"/>

## 客户端流程

登陆

<img src="/assets/RP51bHALboVVdPxYck0cKBvMnGn.png" src-width="978" class="markdown-img m-auto" src-height="705" align="center"/>

<img src="/assets/U9Azb3YntoAtgXxFHSuc327onuf.png" src-width="593" class="markdown-img m-auto" src-height="200" align="center"/>

<img src="/assets/Pb9IbZEI8oH0bBxjtH7ceFvVnWf.png" src-width="959" class="markdown-img m-auto" src-height="776" align="center"/>

<img src="/assets/QB1tboT2LojVAixcA20czgBgnAg.png" src-width="995" class="markdown-img m-auto" src-height="774" align="center"/>

<img src="/assets/Fy0Ab1K9boXXm1xuQ5cc5i7bnBg.png" src-width="993" class="markdown-img m-auto" src-height="798" align="center"/>

<img src="/assets/RrlhbOU6votu2dxjlFacowXQnDf.png" src-width="682" class="markdown-img m-auto" src-height="814" align="center"/>

## flowerpassword

https://flowerpassword.com/：只是帮生成 密码

