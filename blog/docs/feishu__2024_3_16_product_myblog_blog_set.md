---
title: 飞书博客-博客配置说明
keywords:
  - feishu
  - vitepress
  - blog
create_time: 1713255839
categories:
  - product
---


# 工程简介：

框架使用vitepress ：https://vitepress.dev/

增加了以下功能：

umami数据统计：https://umami.is/

artalk用户评论：https://artalk.js.org/

# 如何启动

在检出工程后：

```ts
git clone https://github.com/ftyszyx/feishu-vitepress.git
```

 进入blog目录,执行下面命令即可

```ts
npm install
npm run dev
```

# 工程基本结构

## 文档目录

<img src="/assets/Vu8Eb0WYaoJYDBxZm5HcLlPlnCf.png" src-width="280" class="m-auto" src-height="395" align="center"/>

截图中为中文文档，其中md后缀

1. md文档：为你写的文章
2. lan.json是多语言文本
3. sider.json是博客目录

如果你还有英语，可以在建一个en文件夹。放放上述英文版本文件即可。

## 配置

博客的配置在docs/.vitepress/config下，支持多语言

shared.ts是共享的配置

还有一个配置在docs/.vitepress/theme/site_config.ts下（主要是一些博客个人定制信息）

首页分类,altalk配置，umami配置，

<img src="/assets/VpfcbJL9Gozw57xVKHkcfkI1n0b.png" src-width="512" class="m-auto" src-height="412" align="center"/>

