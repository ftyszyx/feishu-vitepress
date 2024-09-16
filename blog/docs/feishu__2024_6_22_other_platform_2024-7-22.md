---
title: 用飞书写个人博客
keywords:
  - feishu
  - vitepress
  - github
cover: /assets/HID1bMqdkoFUYTxZbxjclV74nLc.png
create_time: 1721614219
categories:
  - other_platform
---


#  **前言：**

每个程序员都想在互联网上有一个自己的博客，写写自己的技术分享，发发牢骚。但是这个有一定的门槛：

1、你得有个域名，如果在国内你还要备案

2、你得有服务器，阿里云最便宜的服务器是99一年

3、你的博客最好有个好的写文章的后台，要像用word一样方便。

我是怎么解决这些问题的呢？

#  **我的方案：**

##  **用github解决域名和服务器问题**

github是微软的，主要功能是提供代码托管服务。

但我觉得github最强大的功能是自动化的github action。github action可以根据你的命令，自动执行一系列的任务，这些任务是在github自己的服务器上执行的。这相当于你白嫖了github的服务器资源，他的服务器可比你在阿里云花大几千买的服务器强了不知多少倍。作为一个程序员,如果不好好利用github action,那真是太可惜了。

当然，因为国内网络的原因，github访问不是很快，但对于聪明的你，这些肯定不是问题。在网上就可以搜索到方法。

Github 还有pages功能(相当于项目的介绍页面，可以托管静态页面资源）

你首先要做的就是在Github创建一个项目，然后，在setting-》pages中去开启相关的功能即可。

至此：你就有了一个博客域名：类似这种：https://{账号名}.github.io/{项目名}

详细的方法，因为不是本文的重点，后续再写文章介绍，网上也有一大堆相关的文章介绍。可以自行搜索

## 用飞书文档写博客

解决了服务器问题，现在是要解决内容问题。

静态博客系统我们使用目前流行的Vitepress。它主要是用markdown来写内容。

markdown虽然可读性比较好，但有以下几个疼点：

1、文章中贴图片有点麻烦，需要先保存图片到asset目录下，然后在markdown中写图片地址。

2、语法虽然简单，但有时还是记不住（年纪大了，记忆力下降）

3、不能方便的插入图表，流程图之类的。

4、换行很讨厌，如果不强制换行，所有的东西全挤在一行里。

有没有什么方法解决这些疼点，有，就是飞书：

平时工作主要用飞书写文档，觉得很方便，我特别喜欢的飞书的一个设计是：

1、格式化工具条始终在你输入文字的那一行，不用移到鼠标到顶部去找格式化命令

<img src="/assets/JL3WbhVrDoFbr7xM5IFch6SRnph.png" src-width="1070" class="markdown-img m-auto" src-height="475" align="center"/>

2、格式化命令相关的快捷键，很方便

3、画图、图表等功能应有尽有。

所以就想能不能在飞书写文档，然后自动将飞书的文档导出成博客的文章。

飞书个人版本是免费的，不用白不用。

我写了一个项目，实现了如下功能：

### 主要功能介绍

1. 将飞书文档导出成markdown文件（集成到了github action，自动）
2. 生成导出的文章的静态博客系统(使用vitepress实现，集成到了github action，自动)
3. 自动翻译中文文档为英文(目前不是自动，因为机器翻译的文章经常会把一些空格或者符号搞乱，导致编译不过，需要手动修改，所以暂时先手动)
4. 集成了umami访问统计（修改了一部分源码）
5. 集成了artalk评论系统 （功能可用，但后台管理页面丑陋，后面找到合适的系统，再换掉）

### 具体效果：

[工程地址](https://github.com/ftyszyx/feishu-vitepress)

[Github 地址](https://ftyszyx.github.io/feishu-vitepress/)

### 效果图：

首页

<img src="/assets/VNQ5bJ3qRoqo3gxUrF1c1t9Enlh.png" src-width="1256" class="markdown-img m-auto" src-height="493" align="center"/>

内容页：

<img src="/assets/RbgjbpOUjojmoGxtjWXcpdt8nld.png" src-width="1290" class="markdown-img m-auto" src-height="519" align="center"/>

还行吧？ 

