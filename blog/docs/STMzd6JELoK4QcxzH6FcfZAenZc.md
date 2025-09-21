---
create_time: 1758245809
edit_time: 1758419696
title: 2025-9-19 给webcloner做了一个宣传页，有可能
categories:
  - other_platform
---


想给webcloner做个门户,于是上网找下，看有没有现成的

找到一个开源的next.js模版，样式非常的美观

https://github.com/jiweiyeah/nextjs-saas-template 

<img src="/assets/Zj1MbjU3zobgkLxEoaQcgdgdnQh.png" src-width="2552" class="markdown-img m-auto" src-height="962" align="center"/>

作者是用来宣传他的浏览器插件的。很厉害。

把代码checkout下来，完美运行。但也有不足。

首先是多语言的实现上，代码是将语言变量层层传递，感觉没啥必要，完全可以通过hook，在组件内获取

<img src="/assets/FiyYbS1GiouULMxZ80ocLRwfn4E.png" src-width="607" class="markdown-img m-auto" src-height="446" align="center"/>

然后就是加了一个多语言广本的提取

