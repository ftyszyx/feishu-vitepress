---
title: 博客自动同步到阿里云
keywords:
  - feishu
  - vitepress
  - 个人博客
  - 阿里云
  - qinglong
  - 国内自动部署
create_time: 1715004884
edit_time: 1715046546
categories:
  - product
---


# 1. 背景

博客原本是在[github_pages](https://ftyszyx.github.io/feishu-vitepress/)上，但在没有翻墙的情况下，有时候访问会很慢。

所以我想在国内也部署一套，正好阿里云有优惠服务器，99元一年。

顺便买了一个域名，并备了案：bytefuse.cn

于是问题来了，我想阿里云上部署了博客后能自动的去拉取github的更新。

# 2. 方案

1. 新建一个github_action，定时生成一个release,将博客打包
2. 在阿里云服务器上写个脚本，定时去拉取最新的release,交解压到/var/www目录下
3. 在阿里云上部署nginx服务，指向博客目录

# 3. 实现

## 3.1  生成release

这个简单，参考[我的实现](https://github.com/ftyszyx/feishu-vitepress/blob/main/.github/workflows/release.yml)

## 3.2 定时拉取release

Github 有接口：[地址](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-the-latest-release)

我写了一个脚本：[地址](https://github.com/ftyszyx/qinglong)

本来想手写crontab定时任务，之前我也是这么干的。最近我发现有一个qinglong的系统，做了一套gui来管理系统的crontab。

所以我就尝试用qinglong做这个事。

具体参考项目https://github.com/ftyszyx/qinglong

## 3.3 ngnix服务

为了方便管理，我也找到了一个nginx的系统

[nginx-ui](https://github.com/0xJacky/nginx-ui)

