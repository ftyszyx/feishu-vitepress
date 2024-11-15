---
cover: /assets/XapSbRYEmoyxCkxqmJYczrT2nBX.png
create_time: 1731319619
edit_time: 1731551635
title: 2024-11-11 免费开源的服务器远程连接工具electerm试用
categories:
  - other_platform
---


远程连接服务器，我之前使用的是winterm

https://github.com/kingToolbox/WindTerm

最近不知道什么情况，每次输入命令都卡得要死。

<img src="/assets/E3LXbG7p8orW6zxng9QcbUXZnme.gif" src-width="1082" class="markdown-img m-auto" src-height="492" align="center"/>

看到了吗，在输入ls后，半天才有反应。我很想知道是什么原因导致的。

于是我就上项目的github上看了下，看能不能从源码上解决这个问题。

结果发现这个项目只是部分开源。所以你想自己查问题是不可能的了。

<img src="/assets/RNWnbd9iuoue9wxzWoBccD5YnLH.png" src-width="785" class="markdown-img m-auto" src-height="194" align="center"/>

既然这样，那只能换工具了。我的需求是：完全开源，并且是国人开发。

功夫不负有心人，我终于找到了electerm：https://github.com/electerm/electerm

<img src="/assets/BFXubBiYwoYx5Dxl8uJckpgNn3c.png" src-width="997" class="markdown-img m-auto" src-height="274" align="center"/>

国人开发，并且完全开源。

简单试用了一下，感觉还行，基本功能都有。

还发现里面有个自动同步的功能，让我挺感兴趣，我想知道他是怎么实现配置的免费同步，我的密码软件能不能用此方案。

<img src="/assets/Ck7WbGugqodTLcxr781cWa33nlh.png" src-width="1057" class="markdown-img m-auto" src-height="580" align="center"/>

研究了一下，作者是利用github的gist功能来做免费的配置同步。

作者写了使用说明：

https://github.com/electerm/electerm/wiki/Create-personal-access-token

这里的gist是什么东西呢？gist是是用来存放代码片段的。

https://gist.github.com/

而且上传的东西默认就是私有的，可以用来保存自己的隐私信息。

<img src="/assets/RCXibPpx2ofFXuxDJSLciZOfnQh.png" src-width="1079" class="markdown-img m-auto" src-height="711" align="center"/>

但有点遗憾的是gist只能存文本，所以还不能用于我的密码工具。

