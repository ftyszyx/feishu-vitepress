---
cover: /assets/U3VgbfEdwoMT6JxnjtaceD2qnBb.jpeg
create_time: 1729475605
edit_time: 1729590290
title: '2024-10-21'
categories:
  - other_platform
---


写文章最烦心的事就是选封面图片。

当然你也可以不选，但是没有封面图片，这个文章在博客里面的看起来就不够美。

你也可以随机配一个，但是肯定不怎么匹配文章的意思。

所以如果你都打算配一个好的封面图片，那肯定就选一个匹配的。

从哪找匹配你文章的封面呢？这就是问题所在。

我一般是在google和百度里搜索，但是都不满意。要是ai能帮我直接画出来就好了。

有这种ai吗？目前没找到。

找到一个开源的，手动拼接的

coverview:

https://github.com/rutikwankhade/CoverView

另外也有一个商业的软件

https://www.gaoding.com/templates/gongzhonghaofengmiantuzidongshengcheng

今天做个事，把coverview部署到服务器上。

先将coverview项目fork到你的github下

https://github.com/rutikwankhade/CoverView

很简单，只要你有一个cloudflare账号，然后在里面买一个域名即可

 步骤如下：

打开cloudflare官网：

https://dash.cloudflare.com/

移过workers和pages

<img src="/assets/WZSnb9XIzoD8H2xXqqMcU8a9n6K.png" src-width="322" class="markdown-img m-auto" src-height="318" align="center"/>

# 创建一个worker

<img src="/assets/NArpbDUWNoisyoxAD6gcXdMoncc.png" src-width="848" class="markdown-img m-auto" src-height="165" align="center"/>

选择pages

<img src="/assets/UTKHbyuoUoO7GyxdbFEcscvBnzf.png" src-width="1203" class="markdown-img m-auto" src-height="367" align="center"/>

配置项目构建命令

<img src="/assets/W0fobZcOsoaEuAxxJq6cY5d3nP4.png" src-width="729" class="markdown-img m-auto" src-height="388" align="center"/>

点构建，即可自动编译出静态网站

构建成功后，clouder会为你分配一个临时的域名，并且可以直接访问了

<img src="/assets/RhsCb0WfpoI53JxBY5ccbkrDnUb.png" src-width="1247" class="markdown-img m-auto" src-height="152" align="center"/>

