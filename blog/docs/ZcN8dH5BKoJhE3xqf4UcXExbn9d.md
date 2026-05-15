---
title: vpn
tags:
  - develop
keywords:
  - vpn
  - clash_windows
create_time: 1717592186
edit_time: 1778766474
categories:
  - skill
---


Rprx: vless-reality协议 v2ray

# 1. clouadflare

Worker:

https://github.com/yonggekkk/Cloudflare-vless-trojan

https://www.youtube.com/watch?v=uQFI6aNbJ1w

## 1.1 新建 worker,粘贴代码

主要代码在https://github.com/yonggekkk/Cloudflare-vless-trojan/tree/main/Vless_workers_pages

<img src="/assets/GUFKbvZeaot65qxEAYAcA8G4nJh.png" src-width="1312" class="markdown-img m-auto" src-height="711" align="center"/>

使用

<img src="/assets/WSWmbZjfQoIYvtxskahc3id5nld.png" src-width="963" class="markdown-img m-auto" src-height="481" align="center"/>

## 1.2 修改userid

定义 一个环境变量

<img src="/assets/NsClbVAcXoagv6xgS69czTwsnSM.png" src-width="1752" class="markdown-img m-auto" src-height="720" align="center"/>

生成一个uuid

https://www.kinde.com/tools/online-uuid-generator/

<img src="/assets/SkwDbiKZAoABzOx8WWCcQ2iMn0e.png" src-width="1138" class="markdown-img m-auto" src-height="669" align="center"/>

<img src="/assets/Uau7b5qq8o9ezfxuhN2c9uuvnKg.png" src-width="1316" class="markdown-img m-auto" src-height="171" align="center"/>

## 1.3 添加自定义域名

<img src="/assets/A0jHbEmMJoNq49xkk27cTj8kn2c.png" src-width="1377" class="markdown-img m-auto" src-height="381" align="center"/>

## 1.4 访问

域名/uuid

# 2. clash_windows

https://docs.gtk.pw/

## 2.1 自定义配置

比如我要将bugly.qq.com加到代理中

因为profiles中的配置是服务商给的，定时会更新，如果在里面修改，会被覆盖

所以要开启mixin

<img src="/assets/S5BIbtMHqoqBikx3qbEcjo6XnSJ.png" src-width="780" class="markdown-img m-auto" src-height="464" align="center"/>

然后在设置中mixin中增加配置

<img src="/assets/DHgAbIMSFo3jM8xbqgKch2cQnub.png" src-width="899" class="markdown-img m-auto" src-height="472" align="center"/>

```ts
mixin: # 注意下面缩进
  rules:
    - "DOMAIN-SUFFIX,bugly.qq.com,节点选择"
```

## 2.2 tun模式

https://cloud.tencent.com/developer/article/2480049

开启tun后，git无法使用，因为 git使用22端口，但中转节点默认屏蔽了22

可以将ssh连接改成443

https://docs.github.com/zh/authentication/troubleshooting-ssh/using-ssh-over-the-https-port

<img src="/assets/RqtKbL2QXoOFPFxHaVscGGJcn6f.png" src-width="1356" class="markdown-img m-auto" src-height="436" align="center"/>

# 3. Clash linux

https://github.com/nelvko/clash-for-linux-install

