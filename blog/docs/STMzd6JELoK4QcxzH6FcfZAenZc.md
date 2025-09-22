---
cover: /assets/OP0pbp4cWoPQOdxDVQncQTkYnff.jpeg
create_time: 1758245809
edit_time: 1758421601
title: 2025-9-19 给webcloner做了一个宣传页
categories:
  - other_platform
---


# 1. 
最近给我的WebCloner做了个新门户，也算是给它安了个家。 以后就可以通过网站发布新版本。顺便也体验一下软件发布流程。

# 2. 先找一个开源的漂亮的网站模板

作为一个程序，我是没有艺术细胞的，只能在网上找现成的。

一开始，我在网上搜寻现成的网站模板，希望能找到一个既美观又实用的。 结果还真让我找到了一个基于Next.js的开源模板（[https://github.com/jiweiyeah/nextjs-saas-template](https://github.com/jiweiyeah/nextjs-saas-template)）， 它的作者用这个模板来宣传自己的浏览器插件，不得不说，是真的厉害！ 

<img src="/assets/Zj1MbjU3zobgkLxEoaQcgdgdnQh.png" src-width="2552" class="markdown-img m-auto" src-height="962" align="center"/>

# 3. 调整一下代码

我把代码checkout下来，跑起来一看，效果确实惊艳。 但也发现了一些可以改进的地方。 于是，我就动手对代码进行了一番改造。

改造后的代码地址在这里：[https://github.com/ftyszyx/webcloner_site](https://github.com/ftyszyx/webcloner_site)

## 3.1 修改一下多语言的实现

首先，我对多语言的实现方式进行了优化。 原来的代码是将语言变量层层传递，感觉有点冗余。 于是，我改用hook，让组件可以直接获取语言变量。 这样一来，代码就简洁多了。

修改前的多语言实现

<img src="/assets/FiyYbS1GiouULMxZ80ocLRwfn4E.png" src-width="607" class="markdown-img m-auto" src-height="446" align="center"/>

修改后的多语言实现

<img src="/assets/D5H0bvBavo4DDkx5blSc3Hzynld.png" src-width="1358" class="markdown-img m-auto" src-height="287" align="center"/>

组件内直接使用hook函数

<img src="/assets/DK6cbXUGaoCOhGx0eolcTPChnbh.png" src-width="1157" class="markdown-img m-auto" src-height="869" align="center"/>

## 3.2 增加一个多语言提取的工具

为了方便提取多语言文本，我还用AI写了一个小工具。 只需要一个命令，就能把代码中所有的语言包提取出来，简直不要太方便！

<img src="/assets/RIuabgqLAoGwElxnt1Icl2EKnVh.png" src-width="1506" class="markdown-img m-auto" src-height="642" align="center"/>

之前我也写过一个类似的工具，是用正则匹配来提取，但准确性不够高。 这次让AI帮我改写了一个使用语法树来提取的版本，准确性大大提升。 果然，AI才是程序员的第一生产力！

## 3.3 界面调整

原模板的界面非常漂亮，但我只需要其中的一部分功能。 于是，我对界面进行了一番调整。 至于调整后的效果嘛... 可能稍微有点“丑”了，哈哈。

地址：https://webcloner.bytefuse.cn/

界面如下：

<img src="/assets/EeQVbRQujo3gyUxDNJLcNCm2nFb.png" src-width="1510" class="markdown-img m-auto" src-height="800" align="center"/>

我只保留了首页，主要分为三个部分：下载链接、目前支持的社交平台（测试过的），以及软件的主要功能介绍。

# 4. docker部署

为了方便部署，我还增加了一个Docker镜像的生成功能。 并且通过GitHub Actions，自动将镜像提交到Docker Hub上。 这也是让AI帮忙写的，省了不少事。

<img src="/assets/SlE2boWcHo1Q3cx22CSc8YWLnAG.png" src-width="1119" class="markdown-img m-auto" src-height="444" align="center"/>

# 5. 网站配置

有了Docker镜像，接下来就是配置网站了。 自从装了1Panel之后，配置网站简直不要太简单！

花了不到十分钟，就把网站配置好了，而且还是带HTTPS的。 感觉已经离不开这个工具了！

<img src="/assets/IhknbQk9rocRauxNYJEczm9UnRx.png" src-width="1844" class="markdown-img m-auto" src-height="177" align="center"/>

 

# 6. 结尾

如果你对这个项目感兴趣，可以看看源码：[https://github.com/ftyszyx/webcloner_site](https://github.com/ftyszyx/webcloner_site)

也欢迎访问我的网站：[https://webcloner.bytefuse.cn/](https://webcloner.bytefuse.cn/)

