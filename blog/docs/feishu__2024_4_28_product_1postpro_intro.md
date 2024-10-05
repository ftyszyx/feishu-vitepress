---
title: 1postpro
keywords:
  - feishu
create_time: 1716892437
categories:
  - product
---


# 需求介绍

## 目标群体：

个人自媒体用户，写的文章可以一次编辑处处发布

## 主要功能：

1. 快捷方便的编辑文章，类似飞书一样的优先编辑体验
2. 一键发布文章到各大知识平台：抖音，微信公众号，csdn,知乎,小红书,简书，twitter,facebook等等
3. 管理已发布的文章 

#  方案设想

主要两大部分功能

1. 文章的编辑
2. 文章的多平台一键发布
3. 评论管理和回复
4. 多平台数据综合分析

## 文章的编辑

目前市面上流行的有notion,飞书文档，obsidian,云雀。

这些工具的目的都是想优化你文章的编辑体验，谁的体验好，谁的用户就多。

看来在编辑这个功能上，水比较深，如果自己也做一套，应该需要消耗特别大的精力。

好在，大部分文档工具都是有api的。比如：notion和飞书。

有一些比较成功的插件可以通过api获取文章（ **noteforms**)

所以可以直接使用api获取文章，不需要开发

## 文章发布

不同的平台需要不同的适配

## 软件形式

需要跨平台，最好的方式就是网站，不需要安装客户端。

用户在网站上关联自己的notion或飞书文档授权。然后选择要发布的文章，发布到不同平台。

网站不用存任何数据。

# 相关产品

商业软件有：

蚁小二

融媒宝

https://tuitool.cn/

开源的有
https://github.com/wechatsync/Wechatsync（只是一个浏览器扩展）

也有一些格式转换的工具

 **Markdown.com.cn**

https://openwrite.cn/

https://www.kuaixieya.com/

# 测试

如果做一个网站，

用户通过网站登录飞书文档账号

# 体验一下设cursor做这个软件

1. 设计一款electron工具，可以将飞书和notion的文章导出到微信公众号并发表

<img src="/assets/HBWybpMy6oxNE7xV7mUcVI8unMc.png" src-width="514" class="markdown-img m-auto" src-height="136" align="center"/>

哈哈，看来还是要人把大体框架做好，让ai帮实现细节

文档账号信息

<img src="/assets/MsywbntnPoPW01xUeZwcGBLvnah.png" src-width="1247" class="markdown-img m-auto" src-height="543" align="center"/>

发布平台

<img src="/assets/KNIHbddZAoNwkbxk8yEcOuj5nQc.png" src-width="486" class="markdown-img m-auto" src-height="421" align="center"/>

# 
