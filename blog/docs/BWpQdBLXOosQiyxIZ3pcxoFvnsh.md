---
create_time: 1757640470
edit_time: 1757645460
title: 2025-9-12 开发webcloner的前因后果
categories:
  - other_platform
---


最近做了一个工具，名叫 WebCloner。说白了，就是用来备份各种网站论坛数据的，因为我个人有这方面的强烈需求。

事情是这样的，我发现一个论坛里有很多有价值的资料，但需要购买会员才能查看，而且还是订阅制，每月都要续费。这让我很不爽，总想着能不能把整个论坛都备份下来，然后慢慢研究。 

一开始，我尝试让 AI 帮忙，AI轻易的写出一大堆python代码。但是呢，AI默认给我保存的是HTML+JS+CSS 的格式，也就是直接把网站源码扒下来了。

这肯定不行啊！人家网站源码是需要连接服务器，甚至还有登录验证的。你保存在本地，肯定是用不了的。

我又让 AI 保存截图，但问题依旧存在。首先，我只想保存论坛里的文章，其他乱七八糟的东西我并不关心。其次，AI 写的程序，在论坛首页的用户头像信息里一直打转，半天都进不了文章页。最后，保存的文章截图，还经常出现显示不全的情况。

我想，还是自己写吧。

我决定做一个带 UI 界面的，交互友好的工具，而不是简单的命令行脚本。于是，我选择了 Flutter，然后继续让 AI 帮我写页面

我说出我的意图,AI马上开干。首页画得还挺高大上的:

<img src="/assets/CsTGbHcJ1owshMxcAt3cgFmynZa.png" src-width="1262" class="markdown-img m-auto" src-height="713" align="center"/>

但是呢在具体功能页面，就不太满意了。

<img src="/assets/TWgxbiSUBo70dSxnIF0cPGXNnzf.png" src-width="495" class="markdown-img m-auto" src-height="713" align="center"/>

这风格……对于习惯了 Ant Design 简洁风格的我来说，简直没法忍受！难道 Flutter 的 Material Design 就这效果？

我不信！我跟 AI 说，帮我美化一下这个 UI，实在太丑了！

AI 立马修改了，但是我运行起来一看，还是老样子，可能只是改了改颜色和圆角，依旧很丑。

我让 AI 继续改……

……

多轮对话后，我彻底放弃了。就这样吧，能用就行，别到时候把我的核心逻辑给改坏了。

估计 AI 在 Flutter 的 UI 设计方面涉猎不多吧。

最开始，我只是想做一个能用的工具，指定好要爬取的网址和截图的网页地址格式，程序能自动去爬取。

我把工具用在我想要备份的论坛上，效果非常棒！论坛的全部文章都被我保存下来了，后面可以慢慢欣赏。

搞完这一切后，我又想起了十几年前经常使用的新浪博客、QQ 空间、校内网，这些充满回忆的地方，能不能也备份下来？

还有之前在大学时喜欢的一个女神，她的校内网是不是也可以保存下来留个纪念？

可惜啊，我晚了一步。校内网已经倒闭了……

<img src="/assets/Ga4ebpl79oemOjxXtMPcyLBtnud.png" src-width="977" class="markdown-img m-auto" src-height="658" align="center"/>

TM 的，还写着要升级重新上车，骗鬼呢！

我的文章和青春的文字，就被这帮利益驱动的资本家给骗走了，好心疼！

这些数据又不是你们的，你们有什么理由说关就关！

新浪博客还好，虽然无法直接访问，但是自己登录进去还能看，但也应该很危险。

<img src="/assets/CyrMbH4tvoc8gZxSSUwccEiJnS8.png" src-width="961" class="markdown-img m-auto" src-height="445" align="center"/>

于是，我赶紧用我的工具备份了一下。备份过程中，遇到一些小问题，但还好，修改一下程序逻辑，基本都能搞定。

搞完新浪博客，我又想起 QQ 空间，也成功了！

接着我又想备份 QQ 说说，遇到了点麻烦。QQ 说说的内容是在一个分页目录里，不同分页的 URL 地址不变，我的工具最多只能保存一页，搞不全。

于是我新增了对分页的识别配置，设置项一下新增三条。不得不说 AI 生成的 UI 真的是丑……

<img src="/assets/Uaq1bywsroyrmSxwmPWcwSSindf.png" src-width="437" class="markdown-img m-auto" src-height="259" align="center"/>

有了这个分页配置，程序可以自动找到下一页按钮，自动翻页。于是 QQ 说说也搞定了！

接着，我又开始备份新浪微博。

新浪微博有点让人头疼，它的信息是存在一个动态列表里。即使你有几千条数据，但网页里只显示固定的几条，所以你截图时，会发现大片的空白。

于是我在想，怎么能让动态列表变成静态列表呢？我问 AI，AI 说有个叫 SingleFile 的浏览器插件可以保存动态列表。

我于是去看了这个项目，还真有，好家伙，有近 2 万个 Star，很成功的项目哦！

<img src="/assets/AXWybmVo0ogcEtx55frchbkDnFf.png" src-width="1500" class="markdown-img m-auto" src-height="162" align="center"/>

装上后，我试用了一个微博的保存，结果发现不行啊，保存的也是不完整。怎么回事？

我搜索了项目的 Issue，发现也有人在问关于 Twitter 保存不全的问题：

<img src="/assets/STocbyPcfo1ozzxHORWclNtsnWd.png" src-width="1108" class="markdown-img m-auto" src-height="140" align="center"/>

<img src="/assets/MC2pbCdxSoSFU5xO5hnc4QqTnyc.png" src-width="917" class="markdown-img m-auto" src-height="651" align="center"/>

作者回复说，他想到好方法可以解决这个问题：

<img src="/assets/UekDbZqVNoy2VzxFtb1cCSxsn3g.png" src-width="845" class="markdown-img m-auto" src-height="118" align="center"/>

方法就是将浏览器的显示区域缩到很小，这样动态列表就可以显示完整了，然后再保存。

作者说他已经把功能集成到插件里了，只用开启 `images > save deferred images` 就行。

于是我就试了一下：

<img src="/assets/SpcRbybIOoDXcfxEGHEc3bPvnwR.png" src-width="397" class="markdown-img m-auto" src-height="257" align="center"/>

发现并没卵用，一样是大片空白。

<img src="/assets/ZTjXbY9clo5bqcxtvA4c0rDunLe.png" src-width="789" class="markdown-img m-auto" src-height="735" align="center"/>

我也照着他说的方法试用了一下，也没啥用。

<img src="/assets/TlwTbKwxxofMwUxAP57cBPInn9f.png" src-width="1056" class="markdown-img m-auto" src-height="515" align="center"/>

缩小后，微博一样只显示一部分，而且还叠在了一起，位置错乱了。

有可能，作者的这个方法并不能用，至少在微博这个动态列表上不生效。

要搞定动态列表的保存，还有其他方法吗？ 

我看了一下网页的元素，发现动态列表结点的名字是 `vue-recycle-scroller`。这应该是一个 Vue 组件。我想会不会是一个开源的库？在网上搜索了一下，还真是！从开源库的文档里，我没找到禁用动态列表的方法或属性之类的。

只是看到有一个 `buffer` 的字段，用来控制缓存的节点数量。

于是我把 `buffer` 设置成一个超级大的值，当我滚动微博列表时，动态列表果然会不断增加列表的节点数。

看来这个方法有戏！不过呢，这种方法有点太特殊了，只能针对微博。

于是我又增加了一个字段，表示平台，用户要对微博多选择一个字段：

<img src="/assets/YkA2bzLgco6VDPxGxQWc88ChnHd.png" src-width="422" class="markdown-img m-auto" src-height="178" align="center"/>

接着，我又遇到一个问题，有的人的微博数量太多了，如果全保存成一个文件，软件会崩溃。

于是，我又又又增加了一个字段保存时间。我只保存这个时间内的微博，而且根据时间内微博的数量，自动再拆分更小的时间段。

<img src="/assets/TfQWbPuLgo1LNzxm9bOcrtG5nL3.png" src-width="419" class="markdown-img m-auto" src-height="97" align="center"/>

到此，这个软件的设置变得超级多了。

我想，如果不是开发者，根本搞不清楚要怎么开启一个保存任务了，哈哈！

就这样，经过几天的折腾，新浪微博也被我搞定了！

<img src="/assets/HFi8bqvtgoj9ltxLM9tcU1Ibnpb.png" src-width="1087" class="markdown-img m-auto" src-height="316" align="center"/>

保存的效果

<img src="/assets/B7NSb9ChFoI9jXxnxgMcwfsvngb.gif" src-width="1906" class="markdown-img m-auto" src-height="1026" align="center"/>

 **结尾：**

这个工具还有待完善，我感觉应该有不少人有我这种需求。

后面有时间的话我要简化一下这个工具的使用流程，让用户能用最简单的设置开启一个任务。

期待你的关注和反馈，有问题可以 QQ: 2246855973

或者公众号关注我：超级小朋友的日常

 **#WebCloner、#数据备份、#新浪微博、#QQ空间、#技术开发**

1. 我的数据我做主：WebCloner 的前世今生！
2. 从女神校内网倒闭说起：WebCloner 的数据备份之路！

