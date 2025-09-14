---
create_time: 1757645822
edit_time: 1757754169
title: 卡密
categories:
  - product
---


开源的：

https://github.com/assimon/dujiaoka

 折腾了一下，官方推荐使用宝塔：https://www.bt.cn/new/index.html

说实话，我之前对php开发一直有偏见，感觉这个语言有点奇怪，通过类似html的标记语言来写服务器程序，感觉总是那么的历类。

但是PhP网站在早几年的确很火。我也用php写过一个简单的erp系统。

宝塔工具我之前也听说过，但没用过，今天借着部署卡密系统使用了一下。

感觉是真的强大啊。能把一个服务器工具做到这么易用，难怪这么成功。

之前我部署博客时最大的麻烦就是，怎么配nginx,怎么配置https.

用宝塔，这些都不叫事，全给你集成好了，一个按钮就能帮你搞定。交互方式简直是太人性化了。

<img src="/assets/Pj6jbrsxPofev4x53wPcjyx6ndc.png" src-width="874" class="markdown-img m-auto" src-height="417" align="center"/>

nginx的配置基本不用你动手，你建一个网站时，宝塔就已经为你配好了。

<img src="/assets/N5AnbC3s0ow9vnxQjImco3gVnSg.png" src-width="792" class="markdown-img m-auto" src-height="487" align="center"/>

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

还好又找到一个开源项目

https://github.com/xiaoxiaoguai-yyds/xxgkamiexe

这个项目可以支持

密钥的时间属性和次数

<img src="/assets/LtAIbv0K2o1XQOxxmuEcaIBbn8f.png" src-width="1386" class="markdown-img m-auto" src-height="365" align="center"/>

还支持api，可以让软件判断密钥是否过期

<img src="/assets/VXN2bjBPnoeE2kxvVjCcfNhdnRc.png" src-width="1603" class="markdown-img m-auto" src-height="403" align="center"/>

