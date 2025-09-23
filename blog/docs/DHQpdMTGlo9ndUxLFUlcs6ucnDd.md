---
create_time: 1757645822
edit_time: 1758507635
title: 卡密
categories:
  - product
---


开源的：

https://github.com/assimon/dujiaoka

 折腾了一下，官方推荐使用宝塔：https://www.bt.cn/new/index.html

说实话，我之前对php开发一直有偏见，感觉这个语言有点奇怪，通过类似html的标记语言来写服务器程序，感觉总是那么的历类。

有宝塔这么方便的工具，卡密系统很快部署好了

<img src="/assets/ZrItbTLKCoKx1Oxm4dQcUwR9nJb.png" src-width="1158" class="markdown-img m-auto" src-height="817" align="center"/>

<img src="/assets/FaeIbjOhWoFPGMx6GvMck6pnnBg.png" src-width="1463" class="markdown-img m-auto" src-height="559" align="center"/>

页面挺漂亮的，但是只有感觉只是一个卖虚拟商品的，

<img src="/assets/URuUbTSs6o8RgGx992acIyJCnpd.png" src-width="1300" class="markdown-img m-auto" src-height="463" align="center"/>

这个虚拟商品不能设置有效期， 不能绑定设备，感觉功能有点不合要求

支付通道真不少

<img src="/assets/CjC5bFxXJoY6txxGyblcsSGhnI7.png" src-width="1593" class="markdown-img m-auto" src-height="700" align="center"/>

但是呢，在国内支付是个敏感信息，需要公司和域名，我这个人注册的域名，只是因为部署了这个服务，第二天就收到了警告

<img src="/assets/VmljbWtTfofa61xXGJMcsc7yn7f.png" src-width="1750" class="markdown-img m-auto" src-height="613" align="center"/>

看来，作为个人，刚开始就不要想支持功能了。

还好又找到一个开源项目

https://github.com/xiaoxiaoguai-yyds/xxgkamiexe

这个项目可以支持

密钥的时间属性和次数

<img src="/assets/LtAIbv0K2o1XQOxxmuEcaIBbn8f.png" src-width="1386" class="markdown-img m-auto" src-height="365" align="center"/>

还支持api，可以让软件判断密钥是否过期

<img src="/assets/VXN2bjBPnoeE2kxvVjCcfNhdnRc.png" src-width="1603" class="markdown-img m-auto" src-height="403" align="center"/>

这个项目基本可用，但是呢，缺少一个软件试用期的功能。在试用期内，软件 可以不用提供注册码。

不过这个项目也给了我一些启发，把我原先没落地的想法清晰化了。

我想自己写一个吧，也不是很难。

