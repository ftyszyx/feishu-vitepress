---
title: 青龙自动化工具(自动运维）
tags:
  - develop
create_time: 1714123555
edit_time: 1715004562
categories:
  - skill
---


# 说明：

自动化运维工具有：

青龙：https://github.com/whyour/qinglong 

我是想让他做一些自动任务的管理，因为有ui，应该会效率高点

# 安装

参考官方文档

# 使用

参考这个https://github.com/6dylan6/jdpro

基本就知道大概流程了

就是先添加 一个github订阅，里面是所有的js脚本

订阅完后，任务列表就有很多任务了，

https://cloud.tencent.com/developer/article/2087378

# 研究

以这个项目为例：

https://sitoi.github.io/dailycheckin/

我参考这个，写一个自动获取博客的更新zip

github的api,获取当前项目的最新release

https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-the-latest-release

这个api需要一个token

有三种方式，选最后一种吧 **Personal access tokens**

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token

## 我的第一个脚本

### 脚本地址：

https://github.com/ftyszyx/qinglong

### 拉取代码

增加订阅：

<img src="/assets/Lp2Rb5ZNUo2qrAxSu3ocL6cmnrc.png" src-width="493" class="markdown-img m-auto" src-height="348" align="center"/>

自动添加任务全关掉

<img src="/assets/OAL5b8O7uoczr7xLFF3cPHfWnEf.png" src-width="475" class="markdown-img m-auto" src-height="104" align="center"/>

### 添加配置

<img src="/assets/ZKt4bRl0uoE6XRxHDMhcuRCxnGd.png" src-width="1023" class="markdown-img m-auto" src-height="355" align="center"/>

新建一个config.json,内容参考config.bak

<img src="/assets/GnsybkeHqoTIy6x2AUQcGNDOnIe.png" src-width="507" class="markdown-img m-auto" src-height="311" align="center"/>

### 添加任务

<img src="/assets/QdPNbzKCsovRQsxCVP0cNqXSnZf.png" src-width="1001" class="markdown-img m-auto" src-height="235" align="center"/>

<img src="/assets/C46obAfrwoGr76xYfD1cupENnOb.png" src-width="462" class="markdown-img m-auto" src-height="390" align="center"/>

### 添加依赖

<img src="/assets/H48YbieXro4gtnx9uJ7cHafJn2e.png" src-width="905" class="markdown-img m-auto" src-height="320" align="center"/>

# 问题

生成的文件，只能在docker映射的目录下

无法被其它用户访问，需要加一个目录映射

<img src="/assets/ILYqbFjQToCbikx2G5Xc0paxnih.png" src-width="346" class="markdown-img m-auto" src-height="73" align="center"/>

# 总结

qinglong类似于一个简化版本的jenkins.

主要功能就是管理定时任务,

定时执行外部的脚本

