---
cover: /assets/AKxsbhy2GoUxBpxZj8XcWWB1nJd.png
create_time: 1777898258
edit_time: 1777901078
title: Gemini
categories:
  - skill
---


闲鱼上有google api pro账号一年只卖36，不清楚他是怎么搞的，果断搞了一个。

<img src="/assets/DyXGb0d2Po0qd5xLWqocmIJcncd.png" src-width="2143" class="markdown-img m-auto" src-height="472" align="center"/>

其实他没付钱，我也不清楚是什么套路

<img src="/assets/P1N3bMtg7oSuJFxCawPc2HjMnDd.png" src-width="2123" class="markdown-img m-auto" src-height="564" align="center"/>

# 1. 接入subapi，报错1

Failed to exchange code: google One accounts require a project_id, failed to auto-detect: user is registered (tier: g1-ultra-tier) but no project_id available. Please provide Project ID manually in the authorization form, or create a project at https://console.cloud.google.com。

解决方案

我已经搞定了，谷歌内部管理真混乱，你还得去开一些配置。
1、先去google cloud创建一个项目：[创建 Google Cloud 项目  |  Google Workspace  |  Google for Developers](https://developers.google.com/workspace/guides/create-project?hl=zh-cn)
2、然后还需要去开通Gemini API权限：[https://console.cloud.google.com/apis/api/cloudaicompanion.googleapis.com/overview?project=](https://console.cloud.google.com/apis/api/cloudaicompanion.googleapis.com/overview?project=)

# 2. 报错2

<img src="/assets/HvgUbl7A5ocdI7xvmCdcXxcfnEc.png" src-width="490" class="markdown-img m-auto" src-height="295" align="center"/>

要在手机上认证

