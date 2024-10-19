---
title: vpn
tags:
  - develop
keywords:
  - vpn
  - clash_windows
create_time: 1717592186
edit_time: 1717593548
categories:
  - skill
---


# clash_windows

https://docs.gtk.pw/

## 自定义配置

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

## 
