---
create_time: 1729688759
edit_time: 1729691070
title: 2024-10-23 零成本部署一个工具网站
categories:
  - other_platform
---


今天做个事，把coverview部署到服务器上。

先将coverview项目fork到你的github下

https://github.com/rutikwankhade/CoverView

很简单，只要你有一个cloudflare账号，然后在里面买一个域名即可

 步骤如下：

打开cloudflare官网：

https://dash.cloudflare.com/

移过workers和pages

<img src="/assets/XYALbdtrJo9nLqxcbcpcBXwTnfh.png" src-width="322" class="markdown-img m-auto" src-height="318" align="center"/>

# 创建一个worker

<img src="/assets/OYrQbzb2JoCXMkxhID2clILcnMg.png" src-width="848" class="markdown-img m-auto" src-height="165" align="center"/>

选择pages

<img src="/assets/WdbRb4Dt3oKBtkxThkdcP1ejnJd.png" src-width="1203" class="markdown-img m-auto" src-height="367" align="center"/>

配置项目构建命令

<img src="/assets/PgvLbILBCoXCCaxSwuPckJGznOc.png" src-width="729" class="markdown-img m-auto" src-height="388" align="center"/>

点构建，即可自动编译出静态网站

构建成功后，clouder会为你分配一个临时的域名，并且可以直接访问了

<img src="/assets/BvbDbWy2soG2wtxDkpmcTYXAnuc.png" src-width="1247" class="markdown-img m-auto" src-height="152" align="center"/>

自定义域名

如果你有买域名（我在cloudflare有一个1postpro.com的域名）

<img src="/assets/QYkjbxntXofdclxrQqrcYmgFnTf.png" src-width="1061" class="markdown-img m-auto" src-height="496" align="center"/>

点继续，即可。

现在就可以访问了

https://makecover.1postpro.com/

基本是一键操作。

而且最好的一点是，当你修改了代码，提交到github上后，cloudflare会自动检查到更新，并重新构建网站。

比如我现在把网站的标题改一下，之前是英文的

<img src="/assets/IC6TbzAPfocpucxdX37cQdZrnJh.png" src-width="750" class="markdown-img m-auto" src-height="303" align="center"/>

刚提交，cloude 就自动构建了

<img src="/assets/BSd3bdsQTo3XJrxomJMcJWwVnVg.png" src-width="1282" class="markdown-img m-auto" src-height="509" align="center"/>

等个几分钟，刷新一下网站，已经生效。

<img src="/assets/DE6HbRVo5oTXOpx1Zz4cgZKdnrh.png" src-width="281" class="markdown-img m-auto" src-height="94" align="center"/>

好了，从此，在网上搭个网站，不需要服务器，零成本，而且全自动。

