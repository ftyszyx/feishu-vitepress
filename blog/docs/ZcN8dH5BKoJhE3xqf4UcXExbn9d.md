---
title: vpn
tags:
  - develop
keywords:
  - vpn
  - clash_windows
create_time: 1717592186
edit_time: 1752979997
categories:
  - skill
---


# 1. clash_windows

https://docs.gtk.pw/

## 1.1 自定义配置

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

## 1.2 tun模式

https://cloud.tencent.com/developer/article/2480049

开启tun后，git无法使用，因为 git使用22端口，但中转节点默认屏蔽了22

可以将ssh连接改成443

https://docs.github.com/zh/authentication/troubleshooting-ssh/using-ssh-over-the-https-port

<img src="/assets/RqtKbL2QXoOFPFxHaVscGGJcn6f.png" src-width="1356" class="markdown-img m-auto" src-height="436" align="center"/>

