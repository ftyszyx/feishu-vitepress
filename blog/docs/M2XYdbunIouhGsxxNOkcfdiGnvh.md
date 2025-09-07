---
cover: /assets/DRHobKiKCoC3B0xisznccfhBnaf.png
create_time: 1756908120
edit_time: 1757145097
title: 介绍
categories:
  - product
---


# 1. 为什么做这个

不知道大家有没有经历过，曾经风靡一时的社交平台突然关闭，那些记录着我们青春的文字、照片，瞬间消失不见。我的校内网账号就是这样，关停后，所有的日志、照片都成了永远的遗憾。

## 1.1 以前爆火的新浪博客

<img src="/assets/QWudbj8i8o8yDCxfHF3cFZptnqc.png" src-width="961" class="markdown-img" src-height="445"/>

## 1.2 大学生的青春，校内网：

<img src="/assets/LxWjb7R10oVnwLxjPRZc8VEonmd.png" src-width="977" class="markdown-img m-auto" src-height="658" align="center"/>

这件事让我意识到，在这个快速变化的时代，任何东西都可能转瞬即逝。QQ空间、微信公众号、各种内容平台，谁能保证它们永远存在呢？与其被动等待，不如主动出击！

于是，我决定自己做一个工具，把那些我想留住的文字、图片，统统备份到本地！

我的需求很简单：

-  **平台不靠谱，为自己的青春做个备份**
-  **备份那些精彩的文章**：比如雪球上释老毛的文章，每次读都受益匪浅，必须保存下来！
-  **突破订阅制平台的限制**：花钱买了会员，却没时间看完所有内容？没关系，我把它们全部保存下来，慢慢享用！

# 2. 技术方案：

功能主要是把文章保存在本地，怎么保存呢？

 **保存源码(html+js+css+图片 )？**

很多网页都是动态的，保存下来也无法正常打开

 **保存成markdown？**

样式无法保证一致性

 最终，我选择了最简单粗暴的方式： **直接保存成图片！** 相当于给网页拍了个快照，完美保留所有内容和样式！

# 3. 技术选型

技术选型方面，我选择了Flutter作为UI框架，跨平台，美观又实用。抓取网页则使用了Puppeteer，模拟用户真实行为，基本不会被屏蔽。最有趣的是，UI全部由AI生成，我只负责写逻辑，简直不要太爽！

# 4. 目前实现的功能

-  **爬取网页**：抓取指定网站的所有链接地址。
-  **保存网页快照**：将网页内容保存成图片到本地。
-  **支持用户登陆**：自动提交登陆信息，免去手动登陆的烦恼。
-  **生成内容目录**：方便查看和管理备份的内容。

# 5. 试用地址

https://github.com/ftyszyx/WebCloner/releases

如果你也想备份那些对你来说重要的内容，不妨关注我的项目，一起完善它！

<img src="/assets/HG3hbFY8WoVu3BxWPrAcTDSDnDd.png" src-width="1920" class="markdown-img m-auto" src-height="1009" align="center"/>

演示效果

[9月6日.mp4](/assets/GglNbPjEXohIJ8xf2Jnc4Dz5nc1.mp4)

