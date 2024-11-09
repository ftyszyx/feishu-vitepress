---
cover: /assets/KAeTb1wCQoxCCnxglQdceZZmnmc.gif
create_time: 1729688759
edit_time: 1730463415
title: 2024-10-23 零成本部署一个工具网站
categories:
  - product
---


#  **前言**

以前要做个https网站，非常繁琐：要购买服务器、域名，还要配置 nginx 和 https 签名，这些流程就像重重关卡，令人头疼不已。现在cloudflare把这些都简化了，你只需要买个域名就行，甚至不买域名也可以，就能轻松创建网站。

今天我将详细介绍如何利用 GitHub 和 Cloudflare 部署一个名为 CoverView 的网站，这个网站主要用于生成封面图片。

#### 先睹为快：网站效果展示

在开始部署之旅前，你可以先看看我们要创建的网站的实际效果：[https://makecover.1postpro.com/](https://makecover.1postpro.com/)。

<img src="/assets/OiCBb1NhyoxzoIxOQlecJwFPnRh.png" src-width="1154" class="markdown-img m-auto" src-height="490" align="center"/>

# fork代码

先将coverview项目fork到你的github下

https://github.com/rutikwankhade/CoverView

<img src="/assets/EYQ4bpnyVonoGExOw6pcqiHlnjf.png" src-width="1243" class="markdown-img m-auto" src-height="206" align="center"/>

# 新建pages worker

打开cloudflare官网：

https://dash.cloudflare.com/

选workers和pages

<img src="/assets/NJdQb2MRto1tyRxyaf1czpi5nmc.png" src-width="733" class="markdown-img m-auto" src-height="707" align="center"/>

点创建

<img src="/assets/OYrQbzb2JoCXMkxhID2clILcnMg.png" src-width="848" class="markdown-img m-auto" src-height="165" align="center"/>

选择pages

<img src="/assets/JiDNbjssiojDayxMTtnc1h9rnxd.png" src-width="1203" class="markdown-img m-auto" src-height="367" align="center"/>

# 连接你的github项目

<img src="/assets/WdbRb4Dt3oKBtkxThkdcP1ejnJd.png" src-width="1203" class="markdown-img m-auto" src-height="367" align="center"/>

# 配置项目构建命令

<img src="/assets/PgvLbILBCoXCCaxSwuPckJGznOc.png" src-width="729" class="markdown-img m-auto" src-height="388" align="center"/>

# 构建成功后即可访问

点构建，即可自动编译出静态网站

构建成功后，clouder会为你分配一个临时的域名，并且可以直接访问了

<img src="/assets/WFwebc0T8obhFcxV5Spc6qCNnBb.png" src-width="1861" class="markdown-img m-auto" src-height="226" align="center"/>

# 自定义域名（推荐）

因为cloudflare分配的域名在国内有可能无法访问。所以最好用自定义域名。

<img src="/assets/QYkjbxntXofdclxrQqrcYmgFnTf.png" src-width="1061" class="markdown-img m-auto" src-height="496" align="center"/>

点继续，即可。

# 搞定

现在就可以访问了

https://makecover.1postpro.com/

试试吧。

基本是一键操作。

而且最好的一点是，当你修改了代码，提交到github上后，cloudflare会自动检查到更新，并重新构建网站。

比如我现在把网站的标题改一下（之前是英文的）

<img src="/assets/IC6TbzAPfocpucxdX37cQdZrnJh.png" src-width="750" class="markdown-img m-auto" src-height="303" align="center"/>

刚提交，cloude 就自动构建了

<img src="/assets/BSd3bdsQTo3XJrxomJMcJWwVnVg.png" src-width="1282" class="markdown-img m-auto" src-height="509" align="center"/>

等个几分钟，刷新一下网站，已经生效。

<img src="/assets/DE6HbRVo5oTXOpx1Zz4cgZKdnrh.png" src-width="281" class="markdown-img m-auto" src-height="94" align="center"/>

太方便了，国内的阿里云好好学学吧。

